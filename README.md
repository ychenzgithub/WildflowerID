# Wildflower ID · 野花识别

[![Website](https://img.shields.io/badge/Website-ychenzgithub.github.io%2FWildflowerID-7b3f8f?style=for-the-badge)](https://ychenzgithub.github.io/WildflowerID/)

**🌐 <https://ychenzgithub.github.io/WildflowerID/>**

A photo guide for learning to identify wildflowers in California, garden and roadside flowers, and the Canadian Rockies. It opens in English, and a 中文 button switches the interface and flower names to Chinese.

一个野花识别图鉴网站：收录加州野花、园艺与外来花卉和加拿大落基山野花，每种花都有照片、识别要点和花期日历，并整理了易混花卉对比、花的结构、花序类型、常见科、赏花地点与工具，还有看图识花小测验。默认英文，可一键切换中文。

## What's inside

| Section | Content |
| :--- | :--- |
| Flowers · 花卉图鉴 | 61 flowers in three groups (33 California wildflowers, 15 garden and introduced flowers, 13 Canadian Rockies wildflowers) with 292 photos. Filter by region, colour, status (native, introduced, invasive, garden), family, or what is blooming this month. Each flower has a description, ID features, cautions for toxic plants, a bloom calendar and links. |
| Bloom calendar · 花期日历 | Month-by-month bloom chart for every flower, computed from iNaturalist observations annotated as flowering (California records, or the Banff, Jasper, Yoho, Kootenay and Waterton Lakes national parks for the Rockies). |
| Look-alikes · 易混花卉 | 8 pairs that are easy to confuse (for example poison hemlock vs yarrow), compared point by point. |
| Flower basics · 花的基础 | Diagrams of the parts of a flower, a daisy head, a pea flower and 8 inflorescence types, plus 12 plant families worth knowing. |
| Where & tools · 赏花与工具 | Wildflower places in California and the Canadian Rockies with typical peak seasons, wildflower etiquette, and ID apps and websites. |
| Quiz · 小测验 | Name the flower from a random photo. |

## Files

- `index.html`, `assets/css/style.css`, `assets/js/app.js`: the page (static; no build step).
- `assets/js/data.js`: flower data, bloom calendars and photo credits.
- `assets/js/content.js`: look-alike pairs, families, inflorescence types, places, etiquette and tools.
- `assets/img/p/` (photos) and `assets/img/t/` (card thumbnails), in WebP.

## Photo and data credits

Most photos are from [iNaturalist](https://www.inaturalist.org/) under Creative Commons licences; the photographer and licence are shown in the photo viewer. The other photos come from a personal study collection gathered from many websites, with the source shown in the viewer. Bloom calendars are computed from iNaturalist observations.
