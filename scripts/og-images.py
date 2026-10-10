"""Génère les images de partage (1200x630) de chaque route dans public/og/.

Prérequis : pip install playwright && playwright install chromium
Usage : python3 scripts/og-images.py
Les routes et leurs textes viennent de scripts/routes.mjs (source unique).
"""
import asyncio
import html
import json
import pathlib
import re
import subprocess
import tempfile

from playwright.async_api import async_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public'
FONTS = ROOT / 'node_modules'
BLOB = re.search(r"'(M595\.3[^']*Z)'", (ROOT / 'src/components/HeroBlob.jsx').read_text()).group(1)

STYLE = f"""
@font-face {{ font-family: Jakarta; font-weight: 200 800;
  src: url('file://{FONTS}/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2'); }}
@font-face {{ font-family: Serif; font-style: italic;
  src: url('file://{FONTS}/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2'); }}
@font-face {{ font-family: Mono; font-weight: 100 800;
  src: url('file://{FONTS}/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2'); }}
* {{ margin: 0; padding: 0; box-sizing: border-box; }}
body {{ width: 1200px; height: 630px; overflow: hidden; background: #0d0d0d; color: #fff;
  font-family: Jakarta; position: relative; }}
.grid {{ position: absolute; inset: 0;
  background-image: linear-gradient(to right, rgb(255 255 255 / .05) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(255 255 255 / .05) 1px, transparent 1px);
  background-size: 70px 70px;
  mask-image: radial-gradient(ellipse 70% 90% at 30% 40%, #000 30%, transparent 100%); }}
.glow {{ position: absolute; border-radius: 50%; filter: blur(120px); }}
.left {{ position: absolute; left: 72px; top: 64px; bottom: 60px; width: 560px;
  display: flex; flex-direction: column; }}
.logo {{ display: flex; align-items: center; gap: 14px; font-size: 26px; font-weight: 800; letter-spacing: -.02em; }}
.mark {{ width: 44px; height: 44px; border-radius: 50%; background: #fe4619;
  display: flex; align-items: center; justify-content: center; }}
.kicker {{ margin-top: auto; font-family: Mono; font-size: 18px; letter-spacing: .14em;
  text-transform: uppercase; color: #fe4619; }}
h1 {{ margin-top: 18px; font-weight: 800; letter-spacing: -.05em; line-height: .95; }}
.sub {{ margin-top: 20px; font-family: Serif; font-style: italic; font-size: 32px; line-height: 1.15;
  color: #ff7a52; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }}
.url {{ margin-top: 28px; font-family: Mono; font-size: 16px; color: rgb(255 255 255 / .45); }}
.frame {{ position: absolute; right: 64px; top: 50%; transform: translateY(-50%) rotate(-2deg);
  width: 500px; border-radius: 20px; overflow: hidden; border: 1px solid rgb(255 255 255 / .14);
  background: #181817; box-shadow: 0 40px 80px -20px rgb(0 0 0 / .8); }}
.bar {{ display: flex; gap: 8px; padding: 13px 16px; border-bottom: 1px solid rgb(255 255 255 / .1); }}
.bar span {{ width: 11px; height: 11px; border-radius: 50%; }}
.frame img {{ display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; }}
"""

MARK = ('<span class="mark"><svg viewBox="0 0 24 24" width="22" height="22" fill="#fff">'
        '<path d="M12 2c1.25 4.7 3.55 7 8.25 8.25-4.7 1.25-7 3.55-8.25 8.25C10.75 13.8 8.45 11.5 '
        '3.75 10.25 8.45 9 10.75 6.7 12 2z"/></svg></span>')


def heading_size(text):
    if len(text) <= 14:
        return 92
    if len(text) <= 24:
        return 74
    if len(text) <= 40:
        return 58
    return 48


def render(route):
    heading = route.get('heading') or route['title']
    sub = route.get('subheading') or route['description']
    if route.get('cover'):
        visual = (f'<div class="glow" style="width:520px;height:520px;right:40px;top:60px;'
                  f'background:#fe4619;opacity:.22"></div>'
                  f'<div class="frame"><div class="bar"><span style="background:#ff5f57"></span>'
                  f'<span style="background:#febc2e"></span><span style="background:#28c840"></span></div>'
                  f'<img src="file://{PUBLIC}{route["cover"]}"/></div>')
    else:
        visual = (f'<svg viewBox="0 0 600 600" style="position:absolute;right:20px;top:100px;width:540px;height:540px">'
                  f'<defs><radialGradient id="g" cx="35%" cy="30%" r="75%"><stop offset="0%" stop-color="#ff7a4d"/>'
                  f'<stop offset="55%" stop-color="#fe4619"/><stop offset="100%" stop-color="#d9330c"/></radialGradient></defs>'
                  f'<path d="{BLOB}" fill="url(#g)"/></svg>'
                  f'<img src="file://{PUBLIC}/images/portrait.webp" style="position:absolute;right:30px;bottom:0;width:500px"/>')
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{STYLE}</style></head><body>
<div class="glow" style="width:700px;height:700px;left:-260px;top:-320px;background:#fe4619;opacity:.26"></div>
<div class="grid"></div>
{visual}
<div class="left">
  <div class="logo">{MARK}<span>Oktav<span style="color:#fe4619">.</span></span></div>
  <p class="kicker">{html.escape(route['kicker'])}</p>
  <h1 style="font-size:{heading_size(heading)}px">{html.escape(heading)}</h1>
  <p class="sub">{html.escape(sub)}</p>
  <p class="url">octave.excellenceteam.site{html.escape(route['path'])}</p>
</div>
</body></html>"""


async def main():
    routes = json.loads(subprocess.check_output(['node', 'scripts/routes.mjs', '--json'], cwd=ROOT))
    (PUBLIC / 'og').mkdir(exist_ok=True)
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch()
        page = await browser.new_page(viewport={'width': 1200, 'height': 630})
        # passer par un fichier local : une page about:blank ne peut pas charger d'images file://
        draft = pathlib.Path(tempfile.mkdtemp()) / 'og.html'
        for route in routes:
            draft.write_text(render(route), encoding='utf-8')
            await page.goto(draft.as_uri(), wait_until='load')
            await page.wait_for_timeout(250)
            await page.screenshot(path=str(PUBLIC / route['og'].lstrip('/')), type='jpeg', quality=86)
            print('ok', route['og'])
        await browser.close()


asyncio.run(main())
