import json
import time
from playwright.sync_api import sync_playwright

urls = {
    "vk_wall_agriculture": "https://m.vk.com/wall-217122567_4534",
    "regions_dmitrov": "https://regions.ru/dmitrov/obschestvo/pantovaja-produktsija-i-lichnye-ekskursii-pochemu-blagorodnyj-sever-stanet-novym-trendom-podmoskovja",
    "invest_mosreg": "https://invest.mosreg.ru/press/news/6439",
    "mosreg_fawn": "https://mosreg.ru/sobytiya/novosti/news-submoscow/pervyi-olenenok-blagorodnogo-olenya-rodilsya-na-ferme-v-podmoskove",
    "vk_radio1_interview": "https://m.vk.com/wall-50051746_57748"
}

results = {}

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    
    # We will use two different contexts for mobile VK and desktop news
    mobile_context = browser.new_context(
        user_agent="Mozilla/5.0 (Linux; Android 12; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36",
        viewport={"width": 450, "height": 800}
    )
    
    desktop_context = browser.new_context(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        viewport={"width": 1280, "height": 800}
    )
    
    for name, url in urls.items():
        print(f"Fetching {name}...")
        
        # Select context
        if "vk.com" in url:
            context = mobile_context
        else:
            context = desktop_context
            
        page = context.new_page()
        try:
            # Set a generous timeout
            page.goto(url, wait_until="domcontentloaded", timeout=15000)
            time.sleep(3) # Wait for JS execution
            
            title = page.title()
            
            # Fetch OpenGraph tags
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
            
            # Extract main texts
            post_text = ""
            if "vk.com" in url:
                # Selectors for mobile VK post body
                for selector in [".pi_text", ".pi_desc", ".wall_item_text", ".PostText", ".PostContent"]:
                    try:
                        loc = page.locator(selector)
                        if loc.count() > 0:
                            post_text = loc.first.inner_text(timeout=2000)
                            break
                    except: pass
                if not post_text:
                    try:
                        post_text = page.locator("body").inner_text(timeout=2000)
                    except: pass
            else:
                # News articles
                for selector in [".news-detail__content", ".article__text", ".content-block", "article", ".text", "main"]:
                    try:
                        loc = page.locator(selector)
                        if loc.count() > 0:
                            post_text = loc.first.inner_text(timeout=2000)
                            break
                    except: pass
            
            results[name] = {
                "url": url,
                "title": og_title or title,
                "description": og_desc,
                "image": og_image,
                "text": post_text
            }
            print(f"  Successfully fetched {name}")
        except Exception as e:
            print(f"  Failed {name}: {e}")
            results[name] = {
                "url": url,
                "error": str(e)
            }
        page.close()
        
    browser.close()

# Write output to UTF-8 file
with open("fetched_publications_playwright.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("Scraping finished. Saved to fetched_publications_playwright.json")
