import urllib.request
import re
from bs4 import BeautifulSoup
import json

urls = {
    "vk_wall_agriculture": "https://vk.com/wall-217122567_4534",
    "regions_dmitrov": "https://regions.ru/dmitrov/obschestvo/pantovaja-produktsija-i-lichnye-ekskursii-pochemu-blagorodnyj-sever-stanet-novym-trendom-podmoskovja",
    "invest_mosreg": "https://invest.mosreg.ru/press/news/6439",
    "mosreg_fawn": "https://mosreg.ru/sobytiya/novosti/news-submoscow/pervyi-olenenok-blagorodnogo-olenya-rodilsya-na-ferme-v-podmoskove",
    "vk_radio1_interview": "https://vk.com/wall-50051746_57748"
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

results = {}

for name, url in urls.items():
    print(f"Fetching {name} from: {url}")
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8', errors='ignore')
            
            # Simple BeautifulSoup parsing
            soup = BeautifulSoup(html, 'html.parser')
            
            # Extract meta tags (OpenGraph is extremely helpful!)
            og_title = soup.find('meta', property='og:title')
            og_desc = soup.find('meta', property='og:description')
            og_image = soup.find('meta', property='og:image')
            og_type = soup.find('meta', property='og:type')
            
            title = og_title['content'] if og_title else soup.title.string if soup.title else ""
            desc = og_desc['content'] if og_desc else ""
            image = og_image['content'] if og_image else ""
            
            # If VK, extract wall post details (sometimes VK renders different structure)
            vk_text = ""
            if "vk.com" in url:
                # VK post text is often inside a class like "wall_post_text" or "pi_text" or "wi_body"
                post_text_elem = soup.find(class_='wall_post_text') or soup.find(class_='pi_text')
                if post_text_elem:
                    vk_text = post_text_elem.get_text(separator='\n').strip()
            
            results[name] = {
                "url": url,
                "title": title.strip() if title else "",
                "description": desc.strip() if desc else "",
                "image": image.strip() if image else "",
                "vk_text": vk_text
            }
            print(f"  Success! Title: {title[:60]}")
    except Exception as e:
        print(f"  Failed to fetch {name}: {e}")
        results[name] = {
            "url": url,
            "error": str(e)
        }

with open("fetched_publications.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
print("Finished. Saved to fetched_publications.json.")
