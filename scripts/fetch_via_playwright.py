import json
import time
from playwright.sync_api import sync_playwright

urls = {
    "vk_wall_agriculture": "https://vk.com/wall-217122567_4534",
    "regions_dmitrov": "https://regions.ru/dmitrov/obschestvo/pantovaja-produktsija-i-lichnye-ekskursii-pochemu-blagorodnyj-sever-stanet-novym-trendom-podmoskovja",
    "invest_mosreg": "https://invest.mosreg.ru/press/news/6439",
    "mosreg_fawn": "https://mosreg.ru/sobytiya/novosti/news-submoscow/pervyi-olenenok-blagorodnogo-olenya-rodilsya-na-ferme-v-podmoskove",
    "vk_radio1_interview": "https://vk.com/wall-50051746_57748"
}

results = {}

with sync_playwright() as p:
    # We can launch headed or headless, headless is fine
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        viewport={"width": 1280, "height": 800}
    )
    
    for name, url in urls.items():
        print(f"Fetching {name} from {url}...")
        page = context.new_page()
        try:
            # Using load or domcontentloaded is much faster than networkidle
            # Set a 10s timeout
            page.goto(url, wait_until="domcontentloaded", timeout=12000)
            time.sleep(2) # brief wait for rendering
            
            title = page.title()
            
            # Extract meta tags
            og_title = ""
            og_desc = ""
            og_image = ""
            
            try:
                og_title = page.locator("meta[property='og:title']").get_attribute("content", timeout=2000) or ""
            except: pass
            
            try:
                og_desc = page.locator("meta[property='og:description']").get_attribute("content", timeout=2000) or ""
            except: pass
            
            try:
                og_image = page.locator("meta[property='og:image']").get_attribute("content", timeout=2000) or ""
            except: pass
            
            # VK-specific selectors for post text
            vk_text = ""
            if "vk.com" in url:
                for selector in [".wall_post_text", ".pi_text", ".wi_body", ".PostText", ".wall_item"]:
                    try:
                        loc = page.locator(selector)
                        if loc.count() > 0:
                            vk_text = loc.first.inner_text(timeout=2000)
                            break
                    except: pass
            
            # Mosreg-specific content extraction
            mosreg_text = ""
            if "mosreg.ru" in url or "mosreg" in url:
                for selector in [".news-detail__content", ".article__text", ".content-block", "article", ".news-item"]:
                    try:
                        loc = page.locator(selector)
                        if loc.count() > 0:
                            mosreg_text = loc.first.inner_text(timeout=2000)
                            break
                    except: pass
            
            results[name] = {
                "url": url,
                "title": og_title or title,
                "description": og_desc,
                "image": og_image,
                "vk_text": vk_text,
                "mosreg_text": mosreg_text
            }
            print(f"  Successfully fetched! Title: {results[name]['title'][:50]}")
        except Exception as e:
            print(f"  Failed {name}: {e}")
            # Try to grab whatever title is currently loaded
            try:
                title = page.title()
            except:
                title = ""
            results[name] = {
                "url": url,
                "title": title or name,
                "error": str(e)
            }
        page.close()
        
    browser.close()

with open("fetched_publications_playwright.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("Scraping completed and saved.")
