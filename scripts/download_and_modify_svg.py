import urllib.request
import re

url = "https://upload.wikimedia.org/wikipedia/commons/4/46/Location_of_Dmitrov_Region_%28Moscow_Oblast%29.svg"
output_path = "public/dmitrov-map.svg"

req = urllib.request.Request(
    url, 
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
)

print("Downloading SVG from:", url)
try:
    with urllib.request.urlopen(req) as response:
        svg_content = response.read().decode('utf-8')
except Exception as e:
    print("Failed to download SVG:", e)
    svg_content = ""

if svg_content:
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print("SVG downloaded and saved to:", output_path)

    # Let's search for paths with colors
    fills = re.findall(r'fill="([^"]+)"', svg_content)
    styles = re.findall(r'style="([^"]+)"', svg_content)
    
    print("\nFills found:", set(fills))
    print("\nStyles found (first 10):", set(styles)[:10])
