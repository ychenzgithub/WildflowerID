/**
 * Hand-written content for the Wildflower ID site: filter labels, look-alike pairs, flower
 * families, inflorescence types, places to see wildflowers, etiquette and tools.
 * Flower data and photos live in data.js.
 */
window.WF_CONTENT = {
  colors: [
    { id: 'yellow', en: 'Yellow', zh: '黄', hex: '#f2c230' },
    { id: 'orange', en: 'Orange', zh: '橙', hex: '#f08a24' },
    { id: 'red', en: 'Red', zh: '红', hex: '#d6342c' },
    { id: 'pink', en: 'Pink', zh: '粉', hex: '#e66fa8' },
    { id: 'purple', en: 'Purple', zh: '紫', hex: '#8e5bd0' },
    { id: 'blue', en: 'Blue', zh: '蓝', hex: '#4d7fe0' },
    { id: 'white', en: 'White', zh: '白', hex: '#ffffff' },
    { id: 'green', en: 'Green', zh: '绿', hex: '#7fa34a' },
  ],
  status: {
    native: { en: 'Native', zh: '本土原生' },
    introduced: { en: 'Introduced', zh: '外来归化' },
    invasive: { en: 'Invasive', zh: '入侵物种' },
    garden: { en: 'Garden plant', zh: '园艺栽培' },
  },
  bloomSrc: {
    ca: { en: 'Share of iNaturalist observations in California recorded as flowering, by month.', zh: '按月统计的加州 iNaturalist 观察记录中处于开花状态的比例。' },
    rockies: { en: 'Share of iNaturalist observations by month in Banff, Jasper, Yoho, Kootenay and Waterton Lakes national parks.', zh: '按月统计的班夫、贾斯珀、幽鹤、库特尼和沃特顿湖国家公园 iNaturalist 观察记录比例。' },
    garden: { en: 'Typical bloom season in Southern California gardens (too few wild records for a data-based calendar).', zh: '南加州花园中的典型花期（野外记录太少，无法用数据统计）。' },
  },

  // Look-alike pairs: a and b are flower ids; rows compare them point by point.
  lookalikes: [
    {
      a: 'poison-hemlock', b: 'yarrow',
      en: 'White umbrella-shaped clusters', zh: '白色伞状花簇',
      tip: { en: 'This one matters: poison hemlock is deadly. Hemlock is tall with smooth, purple-blotched stems; yarrow is short, hairy and smells spicy.', zh: '这一组很重要：毒参剧毒。毒参高大，茎光滑带紫斑；欧蓍草矮小、有毛、有辛香味。' },
      rows: [
        { en: 'Height', zh: '株高', a: { en: '1.5–3 m', zh: '1.5–3 米' }, b: { en: 'Usually under 60 cm', zh: '通常不到 60 厘米' } },
        { en: 'Stem', zh: '茎', a: { en: 'Smooth, hollow, purple-blotched', zh: '光滑、中空、带紫斑' }, b: { en: 'Hairy, solid, no blotches', zh: '有毛、实心、无斑' } },
        { en: 'Flowers', zh: '花', a: { en: 'Compound umbels of 5-petalled flowers', zh: '复伞形花序，五瓣小花' }, b: { en: 'Flat-topped cluster of tiny daisy heads', zh: '平顶花簇，由许多小菊花组成' } },
        { en: 'Smell', zh: '气味', a: { en: 'Musty, unpleasant', zh: '霉臭' }, b: { en: 'Spicy, aromatic', zh: '辛香' } },
      ],
    },
    {
      a: 'common-storks-bill', b: 'broadleaf-filaree',
      en: 'Stork\'s-bills (filarees)', zh: '两种牻牛儿苗',
      tip: { en: 'Look at the leaves: fully divided into small leaflets (common stork\'s-bill) or broad and only lobed (broadleaf filaree).', zh: '看叶片：全裂成细小小叶的是芹叶牻牛儿苗；宽大、只浅裂的是阔叶牻牛儿苗。' },
      rows: [
        { en: 'Leaves', zh: '叶', a: { en: 'Divided into many fern-like leaflets', zh: '全裂，小叶细碎如蕨' }, b: { en: 'Broad, lobed and toothed, not divided', zh: '宽大，浅裂有齿，不分成小叶' } },
        { en: 'Flowers', zh: '花', a: { en: 'Small, about 1 cm', zh: '小，约 1 厘米' }, b: { en: 'Larger, up to about 2 cm', zh: '较大，可达约 2 厘米' } },
        { en: 'Beak', zh: '果喙', a: { en: '2–5 cm', zh: '2–5 厘米' }, b: { en: '6–12 cm', zh: '6–12 厘米' } },
      ],
    },
    {
      a: 'indian-paintbrush', b: 'owls-clover',
      en: 'Paintbrush or owl\'s clover?', zh: '火焰草还是猫头鹰草？',
      tip: { en: 'Both belong to Castilleja. Red bracts on a perennial mean paintbrush; magenta spikes with white "owl faces" mean owl\'s clover.', zh: '两者同属火焰草属。多年生、红色苞片的是火焰草；洋红色花穗上带白色“猫头鹰脸”的是猫头鹰草。' },
      rows: [
        { en: 'Colour', zh: '颜色', a: { en: 'Scarlet to orange bracts', zh: '猩红至橙色苞片' }, b: { en: 'Magenta-purple with white or yellow tips', zh: '洋红至紫色，带白或黄色尖' } },
        { en: 'Life span', zh: '寿命', a: { en: 'Perennial, among shrubs', zh: '多年生，生于灌丛中' }, b: { en: 'Annual, in open grassland', zh: '一年生，生于开阔草地' } },
        { en: 'Leaves', zh: '叶', a: { en: 'Narrow, the upper ones 3–5 lobed', zh: '狭窄，上部叶 3–5 裂' }, b: { en: 'Thread-like, finely divided', zh: '丝状细裂' } },
      ],
    },
    {
      a: 'fiddleneck', b: 'caterpillar-phacelia',
      en: 'Coiled, bristly flower clusters', zh: '卷曲多刺毛的花序',
      tip: { en: 'Both unroll like a fiddlehead and both have irritating bristles. The colour settles it: orange-yellow trumpets (fiddleneck) or cream bells with protruding stamens (phacelia).', zh: '两者花序都像琴头一样卷曲，都有刺激皮肤的刺毛。看颜色即可：橙黄色小喇叭是琴颈草；米白色、雄蕊伸出的小钟是毛毛虫穗花。' },
      rows: [
        { en: 'Flowers', zh: '花', a: { en: 'Orange-yellow, trumpet-shaped', zh: '橙黄色，喇叭状' }, b: { en: 'Cream to pale lavender bells; stamens stick out', zh: '米白至淡紫色钟形，雄蕊伸出' } },
        { en: 'Leaves', zh: '叶', a: { en: 'Narrow, undivided', zh: '狭长，不分裂' }, b: { en: 'Deeply divided', zh: '深裂' } },
      ],
    },
    {
      a: 'black-mustard', b: 'rat-tail-radish',
      en: 'Four-petalled roadside "mustards"', zh: '路边的四瓣“芥菜花”',
      tip: { en: 'Both have four petals in a cross. Bright yellow flowers and slim pods hugging the stem are mustard; white to purple veined petals and plump beaded pods are radish.', zh: '两者都是四瓣十字花。亮黄色花、细荚紧贴茎的是黑芥；白至紫色带脉纹的花瓣、饱满念珠状荚果的是萝卜。' },
      rows: [
        { en: 'Petals', zh: '花瓣', a: { en: 'Bright yellow', zh: '亮黄色' }, b: { en: 'White, pink or purple with dark veins', zh: '白、粉或紫色，带深色脉纹' } },
        { en: 'Pods', zh: '果荚', a: { en: 'Short, slim, pressed to the stem', zh: '短而细，紧贴茎秆' }, b: { en: 'Plump and beaded; very long in rat-tail radish', zh: '饱满念珠状；鼠尾萝卜的特别长' } },
        { en: 'Height', zh: '株高', a: { en: 'Up to 2–3 m', zh: '可达 2–3 米' }, b: { en: 'Usually under 1.2 m', zh: '通常不到 1.2 米' } },
      ],
    },
    {
      a: 'japanese-honeysuckle', b: 'cape-honeysuckle',
      en: 'Two "honeysuckles"', zh: '两种“金银花”',
      tip: { en: 'Only one is a real honeysuckle. Cape honeysuckle belongs to the trumpet-vine family: look for compound leaves and long seed pods.', zh: '只有一种是真正的忍冬。洋凌霄属于紫葳科：它有羽状复叶和长荚果。' },
      rows: [
        { en: 'Flowers', zh: '花', a: { en: 'White aging yellow, two-lipped, in pairs', zh: '白色变黄，二唇形，成对' }, b: { en: 'Orange-red curved trumpets in clusters', zh: '橙红色弯曲喇叭花，成簇' } },
        { en: 'Leaves', zh: '叶', a: { en: 'Simple, opposite, oval', zh: '单叶、对生、卵形' }, b: { en: 'Pinnately compound', zh: '羽状复叶' } },
        { en: 'Fruit', zh: '果实', a: { en: 'Black berries', zh: '黑色浆果' }, b: { en: 'Long flat pods', zh: '扁平长蒴果' } },
      ],
    },
    {
      a: 'california-goldfields', b: 'tidy-tips',
      en: 'Yellow spring daisies', zh: '春天的黄色小菊花',
      tip: { en: 'Check the tips of the rays: all yellow means goldfields; white tips mean tidy tips.', zh: '看舌状花的尖端：全黄的是金田菊；尖端白色的是宽舌莱氏菊（tidy tips）。' },
      rows: [
        { en: 'Rays', zh: '舌状花', a: { en: 'All yellow', zh: '全黄' }, b: { en: 'Yellow with crisp white tips', zh: '黄色，尖端白色' } },
        { en: 'Size', zh: '大小', a: { en: 'Heads about 1–2 cm; plant under 15 cm', zh: '花径约 1–2 厘米；株高不到 15 厘米' }, b: { en: 'Heads 2–4 cm; plant often 10–40 cm', zh: '花径 2–4 厘米；株高常 10–40 厘米' } },
        { en: 'Leaves', zh: '叶', a: { en: 'Narrow and opposite', zh: '狭长、对生' }, b: { en: 'Narrow, alternate, often lobed', zh: '狭长、互生，常有裂' } },
      ],
    },
    {
      a: 'fleabane', b: 'arctic-aster',
      en: 'Fleabane or aster?', zh: '飞蓬还是紫菀？',
      tip: { en: 'Count and compare the rays, and turn the flower over: fleabanes have many thread-thin rays and narrow bracts of nearly equal length; asters have fewer, wider rays and unequal bracts that overlap like shingles.', zh: '数一数、比一比舌状花，再把花翻过来看：飞蓬的舌状花多而极细，总苞片狭窄、近等长；紫菀的舌状花较少较宽，总苞片长短不一、像瓦片一样叠在一起。' },
      rows: [
        { en: 'Rays', zh: '舌状花', a: { en: 'Many (often 50+), very narrow', zh: '很多（常 50 枚以上），极细' }, b: { en: 'Fewer, wider', zh: '较少、较宽' } },
        { en: 'Bracts', zh: '总苞片', a: { en: 'Narrow, nearly equal in length', zh: '狭窄，近等长' }, b: { en: 'Unequal, overlapping like shingles', zh: '长短不一，像瓦片一样叠覆' } },
        { en: 'Season', zh: '花期', a: { en: 'Early to mid summer', zh: '初夏至盛夏' }, b: { en: 'Mid to late summer', zh: '盛夏至夏末' } },
      ],
    },
  ],

  // Families to know; members are filled in from the flower data.
  families: [
    { id: 'Asteraceae', en: 'Daisy family', zh: '菊科', tip: { en: 'Each "flower" is a head of many tiny florets: strap-shaped ray florets around the edge and tubular disc florets in the centre, held in a cup of bracts. Some heads have only rays (dandelions) or only discs (pineapple weed).', zh: '每朵“花”其实是由许多小花组成的头状花序：边缘是舌状花，中央是管状花，下面托着一圈总苞片。有的只有舌状花（如蒲公英），有的只有管状花（如菠萝草）。' } },
    { id: 'Fabaceae', en: 'Pea family', zh: '豆科', tip: { en: 'Pea flowers with a banner, two wings and a keel; leaves usually compound (palm-like in lupines, three leaflets in clovers); seeds in pods. Root nodules fix nitrogen.', zh: '蝶形花，由旗瓣、两枚翼瓣和龙骨瓣组成；叶多为复叶（羽扇豆为掌状，三叶草为三出）；种子生于荚果中。根瘤能固氮。' } },
    { id: 'Boraginaceae', en: 'Borage family', zh: '紫草科', tip: { en: 'Flowers open along coiled "fiddleneck" clusters that unroll as they bloom; five petals joined into a tube or bell; plants are often bristly. Includes the phacelias and baby blue eyes.', zh: '花沿卷曲的“琴头”状花序开放，边开边展开；五枚花瓣合生成管状或钟状；植株常有刺毛。钟穗花和粉蝶花也属于这一科。' } },
    { id: 'Orobanchaceae', en: 'Broomrape family', zh: '列当科', tip: { en: 'Paintbrushes and owl\'s clovers: colourful bracts, two-lipped tubular flowers, and roots that tap neighbouring plants (hemiparasites).', zh: '火焰草和猫头鹰草：彩色苞片，二唇形管状花，根部能连接邻近植物吸取养分（半寄生）。' } },
    { id: 'Brassicaceae', en: 'Mustard family', zh: '十字花科', tip: { en: 'Four petals in a cross, six stamens (four long, two short) and seed pods. Many are peppery: mustard, radish, cabbage.', zh: '四枚花瓣排成十字，六枚雄蕊（四长二短），结角果。很多有辛辣味：芥菜、萝卜、卷心菜。' } },
    { id: 'Geraniaceae', en: 'Geranium family', zh: '牻牛儿苗科', tip: { en: 'Five petals and a long, beak-like fruit that splits into five seeds with coiling tails.', zh: '五枚花瓣；果实有长喙，成熟后裂成五粒带螺旋尾的种子。' } },
    { id: 'Onagraceae', en: 'Evening primrose family', zh: '柳叶菜科', tip: { en: 'Parts in fours: four petals, four sepals and often a four-lobed, cross-shaped stigma; the ovary sits below the flower.', zh: '花部四数：四枚花瓣、四枚萼片，柱头常四裂成十字形；子房位于花的下方。' } },
    { id: 'Lamiaceae', en: 'Mint family', zh: '唇形科', tip: { en: 'Square stems, opposite leaves, two-lipped flowers and aromatic oils. Sages (Salvia) belong here.', zh: '方茎、叶对生、唇形花、富含芳香油。鼠尾草属（Salvia）就在这一科。' } },
    { id: 'Plantaginaceae', en: 'Plantain family', zh: '车前科', tip: { en: 'Includes the snapdragon relatives: two-lipped flowers, often with a spur or a closed "mouth" that bees push open.', zh: '包括金鱼草的亲戚：二唇形花，常有距或闭合的“嘴”，需要蜜蜂推开。' } },
    { id: 'Rosaceae', en: 'Rose family', zh: '蔷薇科', tip: { en: 'Five petals around a ring of many stamens; leaves often toothed or compound. Includes roses, hawthorns, apples and strawberries.', zh: '五枚花瓣，中央一圈多数雄蕊；叶常有齿或为复叶。包括蔷薇、山楂、苹果和草莓。' } },
    { id: 'Apiaceae', en: 'Carrot family', zh: '伞形科', tip: { en: 'Tiny five-petalled flowers in umbrella-like umbels, hollow stems, strong scents. It includes deadly poison hemlock, so never eat a wild umbel.', zh: '五瓣小花组成伞形花序，茎中空，气味浓烈。这一科有剧毒的毒参，所以千万不要采食野生的伞形科植物。' } },
    { id: 'monocots', fams: ['Asparagaceae', 'Amaryllidaceae'], en: 'Lily-like monocots', zh: '百合类单子叶植物', la: 'Asparagaceae · Amaryllidaceae', tip: { en: 'Flower parts in threes (often six tepals), parallel-veined, grass-like leaves, and bulbs or corms underground.', zh: '花部三数（常为六枚花被片），叶脉平行、叶片似草，地下有鳞茎或球茎。' } },
  ],

  // Inflorescence types for the "how flowers are arranged" figure.
  inflorescences: [
    { id: 'solitary', en: 'Solitary', zh: '单生花', ex: { en: 'poppy, wild rose', zh: '花菱草、野玫瑰' } },
    { id: 'spike', en: 'Spike', zh: '穗状花序', ex: { en: 'yerba mansa, owl\'s clover', zh: '耶尔巴·曼萨草、猫头鹰草' } },
    { id: 'raceme', en: 'Raceme', zh: '总状花序', ex: { en: 'lupine, fireweed', zh: '羽扇豆、柳兰' } },
    { id: 'panicle', en: 'Panicle', zh: '圆锥花序', ex: { en: 'red elderberry', zh: '总序接骨木' } },
    { id: 'umbel', en: 'Umbel', zh: '伞形花序', ex: { en: 'nodding onion', zh: '垂花葱' } },
    { id: 'compound', en: 'Compound umbel', zh: '复伞形花序', ex: { en: 'poison hemlock', zh: '毒参' } },
    { id: 'head', en: 'Head', zh: '头状花序', ex: { en: 'daisies, clover', zh: '菊花、车轴草' } },
    { id: 'coil', en: 'Coiled cyme', zh: '蝎尾状聚伞花序', ex: { en: 'fiddleneck, phacelia', zh: '琴颈草、钟穗花' } },
  ],

  places: [
    { region: 'ca', name: 'Antelope Valley California Poppy Reserve', nameZh: '羚羊谷加州罂粟保护区', url: 'https://www.parks.ca.gov/?page_id=627', when: { en: 'Mid-March to April', zh: '3 月中旬至 4 月' }, en: 'Hills of poppies, goldfields and lupines in the western Mojave, near Lancaster.', zh: '莫哈韦沙漠西缘、兰开斯特附近，花菱草、金田菊和羽扇豆铺满山丘。' },
    { region: 'ca', name: 'Anza-Borrego Desert State Park', nameZh: '安札-波列哥沙漠州立公园', url: 'https://www.parks.ca.gov/?page_id=638', when: { en: 'February to March', zh: '2–3 月' }, en: 'Desert wildflowers such as brittlebush, desert lily and sand verbena after a wet winter.', zh: '湿润冬季过后，脆枝灌木（沙漠毒菊）、沙漠百合、沙马鞭等沙漠野花盛开。' },
    { region: 'ca', name: 'Carrizo Plain National Monument', nameZh: '卡里索平原国家保护区', url: 'https://www.blm.gov/visit/carrizo-plain-national-monument', when: { en: 'March to April in wet years', zh: '多雨年份的 3–4 月' }, en: 'Famous "superblooms" of goldfields, tidy tips and phacelia across the Temblor Range.', zh: '以“超级花季”闻名，金田菊、宽舌莱氏菊和钟穗花染满滕布洛山。' },
    { region: 'ca', name: 'Chino Hills State Park', nameZh: '奇诺山州立公园', url: 'https://www.parks.ca.gov/?page_id=648', when: { en: 'February to May', zh: '2–5 月' }, en: 'Grassland and sage-scrub flowers close to Los Angeles and Orange County.', zh: '靠近洛杉矶和橙县，草地与海岸鼠尾草灌丛野花丰富。' },
    { region: 'ca', name: 'Irvine Ranch Natural Landmarks', nameZh: '尔湾牧场自然地标', url: 'https://letsgooutside.org/', when: { en: 'February to May', zh: '2–5 月' }, en: 'Coastal sage scrub of Orange County, open through guided hikes and access days.', zh: '橙县海岸鼠尾草灌丛，可通过导览徒步和开放日进入。' },
    { region: 'rockies', name: 'Banff National Park', nameZh: '班夫国家公园', url: 'https://parks.canada.ca/pn-np/ab/banff', when: { en: 'Mid-July to mid-August (alpine)', zh: '7 月中旬至 8 月中旬（高山带）' }, en: 'Sunshine Meadows, the trails above Lake Louise and Bow Summit are classic alpine meadow walks.', zh: '阳光草甸、路易斯湖上方的步道和弓峰是经典的高山草甸路线。' },
    { region: 'rockies', name: 'Jasper National Park', nameZh: '贾斯珀国家公园', url: 'https://parks.canada.ca/pn-np/ab/jasper', when: { en: 'July to August', zh: '7–8 月' }, en: 'Edith Cavell Meadows sits below a glacier and fills with paintbrush, fleabane and arnica.', zh: '伊迪丝·卡维尔草甸位于冰川脚下，开满火焰草、飞蓬和山金车。' },
    { region: 'rockies', name: 'Yoho National Park', nameZh: '幽鹤国家公园', url: 'https://parks.canada.ca/pn-np/bc/yoho', when: { en: 'July to August', zh: '7–8 月' }, en: 'Lake O\'Hara and Emerald Lake trails pass subalpine meadows and avalanche slopes.', zh: '奥哈拉湖和翡翠湖步道经过亚高山草甸和雪崩坡。' },
    { region: 'rockies', name: 'Waterton Lakes National Park', nameZh: '沃特顿湖国家公园', url: 'https://parks.canada.ca/pn-np/ab/waterton', when: { en: 'June to July', zh: '6–7 月' }, en: 'Where prairie meets mountains; known for its wildflower diversity and an early-summer peak.', zh: '草原与山地交汇处，以野花种类丰富著称，初夏最盛。' },
  ],

  etiquette: [
    { en: 'Stay on the trail. Trampled plants do not set seed, and new paths scar the hillside for years.', zh: '走在步道上。被踩倒的植物结不了种子，新踩出的小路会在山坡上留下多年的痕迹。' },
    { en: 'Leave the flowers. Picking or digging plants in parks, on public land or on someone else\'s property without permission is against the law in California, and the seeds are next year\'s bloom.', zh: '不要采花。在加州，未经许可在公园、公共土地或他人土地上采摘或挖掘植物是违法的；种子就是明年的花海。' },
    { en: 'Watch where you step and what you touch: rattlesnakes, ticks and poison oak are active in spring, and poison hemlock grows along creeks.', zh: '注意脚下和手边：春天响尾蛇、蜱虫和毒橡树都很活跃，溪边还有毒参。' },
    { en: 'Brush seeds off your shoes and clothes before moving to a new area so you do not spread weeds.', zh: '换地方之前清理鞋子和衣服上的种子，避免传播杂草。' },
    { en: 'Share what you see: an iNaturalist observation helps scientists track bloom times and invasive plants.', zh: '分享你的观察：在 iNaturalist 上传一条记录，就能帮助科学家追踪花期和入侵植物。' },
  ],

  tools: [
    { name: 'Calscape', url: 'https://calscape.org/', kind: { en: 'Native plants', zh: '原生植物' }, en: 'The California Native Plant Society\'s guide: find the native plants of any location.', zh: '加州原生植物协会的指南：查询任何地点的原生植物。' },
    { name: 'Calflora', url: 'https://www.calflora.org/search.html', kind: { en: 'Database', zh: '数据库' }, en: 'Search California plants and see where they have been recorded.', zh: '搜索加州植物，查看它们的分布记录。' },
    { name: 'Cal-IPC', url: 'https://www.cal-ipc.org/', kind: { en: 'Invasive plants', zh: '入侵植物' }, en: 'California Invasive Plant Council: profiles of invasive plants and how to manage them.', zh: '加州入侵植物委员会：入侵植物的介绍与防治。' },
    { name: 'Wildflowers of the Canadian Rockies', nameZh: '加拿大落基山野花列表', url: 'https://en.wikipedia.org/wiki/List_of_wildflowers_of_the_Canadian_Rocky_Mountains', kind: { en: 'Picture list', zh: '图片列表' }, en: 'A picture list of wildflowers of the Canadian Rocky Mountains.', zh: '加拿大落基山野花的图片列表（维基百科）。' },
    { name: 'iNaturalist', url: 'https://www.inaturalist.org/', kind: { en: 'App', zh: '应用' }, en: 'Record observations and get identifications from the community. Most extra photos and the bloom data on this site come from here.', zh: '记录观察并获得社区鉴定。本站大部分补充照片和花期数据都来自这里。' },
    { name: 'Seek by iNaturalist', url: 'https://www.inaturalist.org/pages/seek_app', kind: { en: 'App', zh: '应用' }, en: 'Point your phone camera at a plant for an instant identification; no account needed.', zh: '用手机镜头对准植物即可识别，无需注册。' },
    { name: 'Pl@ntNet', url: 'https://identify.plantnet.org/', kind: { en: 'App', zh: '应用' }, en: 'Identify plants from photos of their flowers, leaves or fruit.', zh: '通过花、叶或果实的照片识别植物。' },
    { name: 'Jepson eFlora', url: 'https://ucjeps.berkeley.edu/eflora/', kind: { en: 'Flora', zh: '植物志' }, en: 'The scientific flora of California, with keys and descriptions.', zh: '加州植物志，含检索表和形态描述。' },
    { name: 'CalPhotos', url: 'https://calphotos.berkeley.edu/', kind: { en: 'Photos', zh: '图库' }, en: 'UC Berkeley\'s large database of plant photographs.', zh: '加州大学伯克利分校的大型植物照片库。' },
    { name: 'E-Flora BC', url: 'https://linnet.geog.ubc.ca/Biodiversity/eflora/', kind: { en: 'Flora', zh: '植物志' }, en: 'Electronic atlas of the plants of British Columbia, including the Rockies.', zh: '不列颠哥伦比亚省（含落基山区）植物电子图志。' },
    { name: 'Wildflower Hotline', nameZh: '野花热线', url: 'https://theodorepayne.org/learn/wildflower-hotline/', kind: { en: 'Bloom report', zh: '花讯' }, en: 'Theodore Payne Foundation\'s weekly spring report on where wildflowers are blooming in Southern and Central California.', zh: 'Theodore Payne 基金会每周发布的春季花讯，介绍南加州和中加州哪里正在开花。' },
  ],
};
