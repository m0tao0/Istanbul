const TRIP_DATA = {
  days: [
    {
      id: 0,
      label: "Day 0",
      title: "抵达 · 在 Taksim 落脚",
      area: "IST 机场 → Lokalist Istanbul",
      date: "OCT 30 · FRI",
      summary: "晚间抵达，只处理入境、接送与入住，把体力留给两个完整游览日。",
      image: "assets/images/bosphorus.jpg",
      color: "terracotta",
      items: [
        { time: "晚间", title: "抵达伊斯坦布尔 IST", meta: "入境、取行李与通信准备 · 预留约 60–90 分钟", type: "transfer" },
        { time: "落地 +90", title: "酒店预约接送", meta: "IST → Lokalist Istanbul，通常约 60–90 分钟", type: "transfer" },
        { time: "入住后", title: "办理入住 · Lokalist Istanbul", meta: "Taksim 附近连住三晚，不在短途旅行中搬酒店", type: "stay" },
        { time: "睡前", title: "确认次日票券与天气", meta: "托普卡帕、地下水宫、Hodjapasha 电子票离线保存", type: "note" }
      ]
    },
    {
      id: 1,
      label: "Day 1",
      title: "历史半岛 · 帝国的层叠",
      area: "Taksim → Sultanahmet → Sirkeci",
      date: "OCT 31 · SAT",
      summary: "从托普卡帕一路向西，再转向 Sirkeci；提前吃晚餐，19:00 安静观看旋转舞。",
      image: "assets/images/hagia-sophia.jpg",
      color: "blue",
      items: [
        { time: "09:00", title: "酒店出发前往老城", meta: "步行至 Taksim → F1 至 Kabataş → T1 至 Gülhane", type: "transfer" },
        { time: "09:45", title: "托普卡帕宫", attraction: "topkapi", meta: "09:45–12:00 · 后宫、珍宝馆、圣物馆、第四庭院" },
        { time: "12:10", title: "圣索菲亚大教堂", attraction: "hagia-sophia", meta: "12:10–13:00 · 游客参观层，重点看穹顶与回廊" },
        { time: "13:05", title: "Deraliye 一带午餐", meta: "13:05–13:45 · 控制为 40 分钟奥斯曼菜简餐", type: "food" },
        { time: "13:50", title: "蓝色清真寺", attraction: "blue-mosque", meta: "13:50–14:25 · 如遇礼拜暂停，与地下水宫对调" },
        { time: "14:35", title: "地下水宫", attraction: "basilica-cistern", meta: "14:35–15:20 · 柱林倒影、美杜莎头像与艺术装置" },
        { time: "15:20", title: "T1 前往 Beyazıt", meta: "Sultanahmet → Beyazıt · 比步行节省约 15–20 分钟", type: "transfer" },
        { time: "15:35", title: "大奖集市", attraction: "grand-bazaar", meta: "15:35–16:40 · 主街、Zincirli Han、地毯与陶瓷区" },
        { time: "16:40", title: "T1 前往 Sirkeci", meta: "Beyazıt → Sirkeci，再步行至餐厅", type: "transfer" },
        { time: "17:05", title: "Olden 1772 提前晚餐", meta: "17:05–18:20 · 订位注明 18:20 前结账", type: "food" },
        { time: "18:30", title: "Hodjapasha 展览与入场", attraction: "hodjapasha", meta: "提前 30 分钟签到，先看服饰、乐器与鲁米诗歌展" },
        { time: "19:00", title: "苏菲旋转舞仪式", attraction: "hodjapasha", meta: "19:00–20:00 · 保持安静，仪式中禁止拍照录像" },
        { time: "20:05", title: "返回 Lokalist Istanbul", meta: "T1 至 Kabataş → F1 至 Taksim → 步行，约 20:50 到店", type: "transfer" }
      ]
    },
    {
      id: 2,
      label: "Day 2",
      title: "现代伊斯坦布尔 · 海峡与艺术",
      area: "Dolmabahçe → Tophane → Eminönü → Pera",
      date: "NOV 01 · SUN",
      summary: "宫殿只看 90 分钟精华；从当代艺术走向海峡，再经 Karaköy 与独立大街步行回酒店。",
      image: "assets/images/karakoy.jpg",
      color: "gold",
      items: [
        { time: "09:00", title: "酒店出发前往宫殿", meta: "出租车直达多尔玛巴赫切宫 · 约 15 分钟", type: "transfer" },
        { time: "09:15", title: "多尔玛巴赫切宫", attraction: "dolmabahce", meta: "09:15–10:45 · 主宫、水晶楼梯、仪式大厅与海峡宫门" },
        { time: "10:45", title: "前往 Tophane", meta: "步行至 Kabataş，乘 T1 至 Tophane", type: "transfer" },
        { time: "11:10", title: "伊斯坦布尔现代艺术博物馆", attraction: "istanbul-modern", meta: "11:10–12:40 · 常设展、摄影展与顶层观景平台" },
        { time: "12:40", title: "Galataport 午餐", attraction: "karakoy-galataport", meta: "12:40–13:35 · 选择出餐快的海滨餐厅", type: "food" },
        { time: "13:35", title: "T1 前往 Eminönü 码头", meta: "Tophane → Eminönü；14:05 前找到 Şehir Hatları 官方售票处", type: "transfer" },
        { time: "14:05", title: "购票与候船", meta: "只认 Şehir Hatları 官方售票窗口，避开私人游船揽客", type: "note" },
        { time: "14:40", title: "博斯普鲁斯短线公共游船", attraction: "bosphorus-cruise", meta: "14:40–约 16:40 · 上层露天甲板靠船尾", type: "boat" },
        { time: "16:40", title: "加拉塔桥步行", attraction: "karakoy-galataport", meta: "16:40–17:05 · 把跨桥观景融入前往 Karaköy 的交通", type: "walk" },
        { time: "17:05", title: "Karaköy 咖啡休息", attraction: "karakoy-galataport", meta: "17:05–17:35 · 不登加拉塔塔，不额外绕路", type: "leisure" },
        { time: "17:35", title: "F2 地下缆车至 Tünel", meta: "避开陡坡，直接抵达独立大街南端", type: "transfer" },
        { time: "17:50", title: "独立大街文化步行", attraction: "istiklal", meta: "17:50–19:10 · 从 Tünel 持续向 Taksim 推进" },
        { time: "19:15", title: "Pera／独立大街晚餐", meta: "19:15–20:45 · 提前预约，可选屋顶景观餐厅", type: "food" },
        { time: "20:45", title: "独立大街夜景与 AKM 外观", attraction: "istiklal", meta: "步行返回 Taksim 附近酒店，约 21:15 收尾", type: "walk" }
      ]
    },
    {
      id: 3,
      label: "Day 3",
      title: "返程 · 13:30 飞往上海",
      area: "Lokalist Istanbul → IST",
      date: "NOV 02 · MON",
      summary: "不再新增景点，09:00 准时离店，为国际航班、安检和步行距离留足缓冲。",
      image: "assets/images/istiklal.jpg",
      color: "sage",
      items: [
        { time: "07:30", title: "起床与整理行李", meta: "确认航站楼、退税材料与机场接送车辆", type: "stay" },
        { time: "08:00", title: "酒店早餐", meta: "08:00–08:40 · 不再安排酒店范围外的散步", type: "food" },
        { time: "08:40", title: "办理退房", meta: "08:55 前完成人员与行李确认", type: "stay" },
        { time: "09:00", title: "专车前往 IST 机场", meta: "周一早高峰；若下雨或需要退税，可提前至 08:30", type: "transfer" },
        { time: "10:15", title: "抵达机场", meta: "预留入口安检、值机、出境及前往远端登机口时间", type: "note" },
        { time: "13:30", title: "起飞返回上海", meta: "国际航班至少提前 3 小时抵达机场", type: "transfer" }
      ]
    }
  ],
  attractions: {
    "blue-mosque": {
      name: "蓝色清真寺",
      localName: "Sultanahmet Camii",
      kicker: "THE RHYTHM OF PRAYER",
      district: "Sultanahmet · Fatih",
      image: "assets/images/blue-mosque.jpg",
      photoCredit: "Alex Azabache / Pexels",
      intro: "六座宣礼塔与层层下降的穹顶，让它成为奥斯曼古典建筑最有辨识度的轮廓。真正走进内部，蓝色伊兹尼克瓷砖、彩绘穹顶与透过两百多扇窗的光，才是名字背后的答案。",
      quote: "不要只寻找蓝色；先抬头，看光如何让穹顶悬浮。",
      fee: "免费入场，捐赠自愿",
      hours: "每日开放；通常 08:30–11:30、13:00–14:30、15:30–16:45。周五游客参观约 13:30 后开始。",
      duration: "30–45 分钟",
      bestTime: "08:30 第一时段",
      transit: "T1 电车至 Sultanahmet，步行约 3 分钟。",
      highlights: ["六座宣礼塔", "伊兹尼克瓷砖", "中央穹顶与彩窗", "面对圣索菲亚的庭院轴线"],
      photoSpots: [
        { title: "Sultanahmet 广场长椅", text: "站在两座建筑之间，以喷泉和花园做前景；清晨游客更少。" },
        { title: "清真寺西侧庭院", text: "用拱廊框住穹顶与宣礼塔，是最有层次的对称构图。" },
        { title: "竞技场南端", text: "稍微拉远，可拍下六座宣礼塔完整展开的城市天际线。" }
      ],
      tips: ["进入祈祷大厅前需脱鞋，入口会提供鞋袋。", "肩膀和膝盖需遮盖；女性需戴头巾，入口通常可借用。", "禁止闪光灯，不要拍摄正在祈祷的人。", "祷告时段每日变化，前一晚再次查看官网。"],
      official: "https://bluemosque.tr/visit/",
      map: "https://www.google.com/maps/search/?api=1&query=Blue+Mosque+Istanbul"
    },
    "hagia-sophia": {
      name: "圣索菲亚大教堂",
      localName: "Ayasofya-i Kebîr Câmi-i Şerîfi",
      kicker: "A DOME ACROSS EMPIRES",
      district: "Sultanahmet · Fatih",
      image: "assets/images/hagia-sophia.jpg",
      photoCredit: "Mihman / Pexels",
      intro: "公元 537 年落成后，这座巨构先后成为东罗马教堂、奥斯曼清真寺、博物馆，再回到清真寺。如今游客主要沿上层回廊参观，在拜占庭马赛克、巨型伊斯兰书法圆盘和穹顶之间，看见城市历史并置而非替换。",
      quote: "这里最动人的不是某一种文明，而是它们仍在同一空间里彼此凝视。",
      fee: "外国游客上层回廊约 €25；礼拜区域规则另计",
      feeEquivalent: "约 ¥194 / US$29",
      hours: "每日开放，游客时段会随季节与祷告调整；夏季通常延长至 19:00 左右。",
      duration: "60–75 分钟",
      bestTime: "开门后或傍晚",
      transit: "T1 电车至 Sultanahmet，穿过广场步行约 5 分钟。",
      highlights: ["直径约 31 米的中央穹顶", "上层回廊马赛克", "巨型书法圆盘", "拜占庭与奥斯曼构件并置"],
      photoSpots: [
        { title: "Sultanahmet 公园喷泉", text: "对称正面最经典，清晨顺光，蓝色时刻则适合拍灯光。" },
        { title: "上层回廊南侧", text: "从栏杆望向中殿，可同时纳入穹顶、吊灯与书法圆盘。" },
        { title: "西南侧小巷", text: "利用木屋和石墙做前景，画面比广场正面更有生活感。" }
      ],
      tips: ["仍是宗教场所，请穿着得体并保持安静。", "大型修复工程可能出现脚手架，部分视角会临时受限。", "安检和购票队伍分开，旺季预留至少 30 分钟排队。", "不要从非官方兜售者处购买所谓免排队票。"],
      official: "https://www.ayasofyacamii.gov.tr/",
      map: "https://www.google.com/maps/search/?api=1&query=Hagia+Sophia+Istanbul"
    },
    "basilica-cistern": {
      name: "地下水宫",
      localName: "Yerebatan Sarnıcı",
      kicker: "BENEATH THE CITY",
      district: "Sultanahmet · Fatih",
      image: "assets/images/cistern.jpg",
      photoCredit: "Hatice Baran / Pexels",
      intro: "六世纪的地下蓄水工程，由 336 根形态各异的石柱托起。修复后的步道、浅水反射和当代艺术装置，让它不只是遗迹，更像一段被精心编排的地下叙事。",
      quote: "城市在头顶喧闹，而这里的时间只沿着水面移动。",
      fee: "09:00–18:30 外国游客 1,950 TL；19:30–22:00 夜场 3,000 TL",
      feeEquivalent: "日场约 ¥280 / US$41；夜场约 ¥431 / US$64",
      hours: "每日 09:00–22:00；18:30–19:30 为场次切换。",
      duration: "45–60 分钟",
      bestTime: "09:00 开门即入场",
      transit: "T1 电车至 Sultanahmet，沿 Yerebatan Caddesi 步行约 2 分钟。",
      highlights: ["336 根石柱", "两座美杜莎头像柱础", "泪柱", "水面反射与艺术装置"],
      photoSpots: [
        { title: "入口后的首段长廊", text: "用连续柱列制造消失点，手机夜景模式即可，避免过度曝光灯光。" },
        { title: "美杜莎头像区域", text: "稍候人流间隙，低机位纳入水面倒影，画面更完整。" },
        { title: "泪柱前", text: "侧面光最能强调柱身纹理，适合拍局部而非全景。" }
      ],
      tips: ["仅接受银行卡或 İstanbulkart，现场不收现金。", "Museum Pass 不适用；这里由伊斯坦布尔市属机构运营。", "地面潮湿且光线低，穿防滑鞋并放慢脚步。", "三脚架通常不便使用，拍照时不要阻挡狭窄步道。"],
      official: "https://yerebatan.com/en/basilica-cistern/visit-info/",
      map: "https://www.google.com/maps/search/?api=1&query=Basilica+Cistern+Istanbul"
    },
    "topkapi": {
      name: "托普卡帕宫",
      localName: "Topkapı Sarayı",
      kicker: "THE IMPERIAL COURT",
      district: "Sarayburnu · Fatih",
      image: "assets/images/topkapi.jpg",
      photoCredit: "Zak H / Pexels",
      intro: "它不是一栋孤立的大宫殿，而是由四重庭院、议政空间、宝库、圣物室与后宫组成的皇城。路线从礼制严谨的前朝逐步走向私密生活，最后抵达俯瞰博斯普鲁斯的露台。",
      quote: "越往宫殿深处走，帝国越从仪式变成日常。",
      fee: "外国游客联票 2,750 TL，含主宫、后宫与圣伊莲娜教堂",
      feeEquivalent: "约 ¥395 / US$58",
      hours: "09:00–17:00 售票；周二闭馆。",
      duration: "本行程 2 小时 15 分",
      bestTime: "09:45 入场后优先后宫",
      transit: "T1 电车至 Gülhane 或 Sultanahmet，步行约 8–10 分钟。",
      highlights: ["帝国议事厅", "后宫瓷砖房间", "皇家宝库", "第四庭院海峡露台"],
      photoSpots: [
        { title: "幸福之门", text: "站在第二庭院中轴拍摄，屋檐、门洞和两侧树木形成天然对称。" },
        { title: "后宫瓷砖长廊", text: "用门框叠出纵深，注意室内通常禁止闪光。" },
        { title: "第四庭院 İftariye 凉亭", text: "金角湾与博斯普鲁斯同时入镜，是宫内最开阔的观景点。" }
      ],
      tips: ["本次安排在周六，闭馆日没有冲突。", "高效路线：第二庭院 → 后宫 → 珍宝馆 → 圣物馆 → 第四庭院。", "联票自购买日起仅 1 天有效，不适合拆成两天游览。", "12:00 必须离开前往圣索菲亚，普通瓷器展厅可略过。"],
      official: "https://www.millisaraylar.gov.tr/Lokasyon/2/topkapi-sarayi",
      map: "https://www.google.com/maps/search/?api=1&query=Topkapi+Palace+Istanbul"
    },
    "dolmabahce": {
      name: "多尔玛巴赫切宫",
      localName: "Dolmabahçe Sarayı",
      kicker: "THE LAST OTTOMAN PALACE",
      district: "Beşiktaş",
      image: "assets/images/dolmabahce.jpg",
      photoCredit: "M. Emin Bilir / Pexels",
      intro: "十九世纪的奥斯曼帝国在海峡边建起一座面向欧洲的宫殿。巴洛克、洛可可和新古典装饰与传统宫廷格局并存，水晶阶梯和典礼大厅把晚期帝国的雄心推到极致。",
      quote: "一边是欧洲宫廷的华丽，一边是博斯普鲁斯最克制的蓝。",
      fee: "外国游客联票 2,000 TL，含 Selamlık、后宫与绘画博物馆",
      feeEquivalent: "约 ¥288 / US$42",
      hours: "09:00–17:00 售票；周一闭馆。",
      duration: "本行程 90 分钟精华",
      bestTime: "09:15–10:45",
      transit: "T1 电车至 Kabataş 后沿海步行约 8 分钟。",
      highlights: ["水晶阶梯", "典礼大厅巨型吊灯", "海峡门", "阿塔图尔克纪念房间"],
      photoSpots: [
        { title: "宫殿海峡门", text: "庭院内向海拍，雕花石门会将水面和亚洲岸框成一幅画。" },
        { title: "钟楼广场", text: "从斜侧面拍钟楼与宫门，上午光线更干净。" },
        { title: "博斯普鲁斯轮渡上", text: "从水上才能看见宫殿沿海展开的完整立面。" }
      ],
      tips: ["本次安排在周日，周一闭馆不会影响行程。", "只走主宫、水晶楼梯、仪式大厅、阿塔图尔克房间与海峡宫门。", "跳过后宫大部分普通房间及绘画博物馆，10:45 准时离开。", "内部通常禁止摄影，按现场规定收起手机和相机。"],
      official: "https://www.millisaraylar.gov.tr/Lokasyon/3/Dolmabahce-Palace",
      map: "https://www.google.com/maps/search/?api=1&query=Dolmabahce+Palace+Istanbul"
    },
    "istiklal": {
      name: "独立大街",
      localName: "İstiklal Caddesi",
      kicker: "THE CITY'S LIVING ROOM",
      district: "Beyoğlu",
      image: "assets/images/istiklal.jpg",
      photoCredit: "_feyzzza_ / Pexels",
      intro: "从塔克西姆广场向南延伸约 1.4 公里，红色怀旧电车穿过书店、教堂、拱廊、电影院与甜品店。它不只是购物街，而是理解伊斯坦布尔现代城市生活最直接的一条剖面。",
      quote: "别急着走完一条街；真正的惊喜通常藏在拱廊和支路里。",
      fee: "街区免费；怀旧电车按公共交通票价",
      hours: "全天开放；商店多为 10:00–22:00。",
      duration: "本行程 1 小时 20 分",
      bestTime: "17:50 从 Tünel 出发",
      transit: "Karaköy 乘 F2 地下缆车至 Tünel，再从南向北步行回 Taksim。",
      highlights: ["怀旧红色电车", "圣安多尼教堂", "Çiçek Pasajı", "Salt Beyoğlu 与独立书店"],
      photoSpots: [
        { title: "电车转弯处", text: "在安全距离外用长焦压缩街景，红色电车和建筑立面会更集中。" },
        { title: "圣安多尼教堂前院", text: "从大街门洞向内拍，喧闹街道与安静红砖形成反差。" },
        { title: "Tünel 广场", text: "傍晚灯光亮起时，老电车、坡道和街角咖啡馆最有城市感。" }
      ],
      tips: ["周日晚人流密集，手机和钱包放在身体前侧。", "本次由 Tünel 向 Taksim 行进，终点就是酒店附近，不走回头路。", "19:15 前抵达 Pera／独立大街的预约餐厅。", "避开主动拉客且没有明码标价的酒吧。"],
      official: "https://visit.istanbul/istiklal-street",
      map: "https://www.google.com/maps/search/?api=1&query=Istiklal+Avenue+Istanbul"
    },
    "galata-tower": {
      name: "加拉塔塔",
      localName: "Galata Kulesi",
      kicker: "ABOVE THE GOLDEN HORN",
      district: "Galata · Beyoğlu",
      image: "assets/images/galata-skyline.jpg",
      photoCredit: "Zmutaqin / Pexels",
      intro: "十四世纪的热那亚人把它建成城墙瞭望塔。如今电梯把游客送到高处，再沿展层向下，在 360 度观景台辨认金角湾、历史半岛、博斯普鲁斯与亚洲岸。",
      quote: "日落时整座城会变成一张地图，而海峡是最亮的那条线。",
      fee: "外国游客约 €30；Museum Pass İstanbul 可用于日间",
      feeEquivalent: "约 ¥233 / US$34",
      hours: "日间 08:30–18:30；夜间博物馆 18:30–23:00，末次售票 22:00。",
      duration: "60–90 分钟",
      bestTime: "日落前 60 分钟",
      transit: "M2 至 Şişhane 后步行下坡 8 分钟；或从 Karaköy 步行上坡。",
      highlights: ["360° 环形观景台", "金角湾与历史半岛全景", "热那亚城墙历史", "逐层下行的城市展览"],
      photoSpots: [
        { title: "观景台南侧", text: "面向历史半岛，圣索菲亚与苏莱曼尼耶清真寺会在海面上展开。" },
        { title: "Büyük Hendek Caddesi", text: "沿北侧街道稍微拉远，用两侧建筑夹出塔身，清晨最好拍。" },
        { title: "Serdar-ı Ekrem 坡道", text: "石板路、旧公寓与塔顶共同入镜，适合街头感构图。" }
      ],
      tips: ["观景台狭窄且风大，帽子和轻物要收好。", "日落前常排长队，至少提前 45–60 分钟到达。", "Museum Pass 只适用于规定日间时段，夜场不适用。", "18 岁以下需由监护人陪同。"],
      official: "https://www.muze.gov.tr/muze-detay?DistId=MRK&SectionId=GLT04",
      map: "https://www.google.com/maps/search/?api=1&query=Galata+Tower+Istanbul"
    },
    "bosphorus-cruise": {
      name: "博斯普鲁斯海峡游船",
      localName: "Boğaz Turu",
      kicker: "BETWEEN TWO CONTINENTS",
      district: "Eminönü / Karaköy",
      image: "assets/images/bosphorus.jpg",
      photoCredit: "Umut Izgi / Pexels",
      intro: "伊斯坦布尔最好的城市视角在水上。短线游船会从历史半岛与加拉塔之间出发，经过多尔玛巴赫切宫、奥塔科伊、两座跨海大桥与亚洲岸木屋，在海鸥和渡轮声里理解这座城市的尺度。",
      quote: "这不是离开城市，而是终于看见城市的全貌。",
      fee: "Şehir Hatları 短线：外国游客 340 TL",
      feeEquivalent: "约 ¥49 / US$7",
      hours: "当前 Eminönü 官方短线每日 14:40 发船；冬季时刻需临近复核。",
      duration: "约 2 小时",
      bestTime: "14:05 到码头，14:40 开船",
      transit: "T1 至 Eminönü，或轮渡 / 电车至 Karaköy 后前往码头。",
      highlights: ["多尔玛巴赫切宫水岸立面", "奥塔科伊清真寺与大桥", "鲁梅利堡", "欧亚两岸木屋与天际线"],
      photoSpots: [
        { title: "船尾外侧甲板", text: "更少玻璃反光，也能拍下逐渐远去的历史半岛天际线。" },
        { title: "奥塔科伊段", text: "提前站在欧洲岸一侧，让清真寺与第一大桥在同一画面叠合。" },
        { title: "返航蓝色时刻", text: "提高快门保持船上清晰，利用城市灯光在水面的反射。" }
      ],
      tips: ["只在 Şehir Hatları 官方售票处购票，不接受私人游船揽客。", "11 月海上体感温度可能比陆地低约 5℃，准备防风外套。", "去程优先欧洲岸一侧，返程换另一侧或船尾。", "正式冬季时刻表可能调整，10 月中旬必须再确认一次。"],
      official: "https://sehirhatlari.istanbul/en/timetables/bosphorus-tours/short-bosphorus-tour-181",
      map: "https://www.google.com/maps/search/?api=1&query=Eminonu+Bosphorus+Cruise+Pier"
    },
    "grand-bazaar": {
      name: "大奖集市",
      localName: "Kapalıçarşı",
      kicker: "A CITY UNDER ONE ROOF",
      district: "Beyazıt · Fatih",
      image: "assets/images/grand-bazaar.jpg",
      photoCredit: "Beyzanur / Pexels",
      intro: "从十五世纪的核心商栈发展为覆盖数十条街巷的室内市场，拱顶下交织着珠宝、地毯、陶瓷、灯具与皮具店。这里最值得看的不仅是商品，还有仍在运转的商贸传统、院落和层层相接的街道结构。",
      quote: "把它当成一座有屋顶的城市，而不是一间巨大的纪念品商店。",
      fee: "免费进入，购物另计",
      hours: "通常周一至周六 09:00–19:00；周日关闭。",
      duration: "本行程 65 分钟",
      bestTime: "15:35–16:40",
      transit: "T1 电车至 Beyazıt；从 Beyazıt 或 Nuruosmaniye 一侧进入。",
      highlights: ["Kalpakçılar 珠宝主街", "Old Bedesten", "Zincirli Han 红色庭院", "地毯与伊兹尼克陶瓷区"],
      photoSpots: [
        { title: "Zincirli Han 庭院", text: "红色立面、绿植与石阶形成鲜明色块，午后光线柔和。" },
        { title: "珠宝主街拱顶中央", text: "站在不妨碍人流的位置，利用连续拱顶制造对称消失点。" },
        { title: "Old Bedesten 门洞", text: "用厚重石门框住内部摊位，能表现市场最古老的建筑层次。" }
      ],
      tips: ["本次必须周六游览，周日大量商户关闭。", "预设路线行进，不深入外围小巷，16:40 准时离开。", "高价商品要求发票与材质证明，不仓促购买地毯或珠宝。", "T1 和市场内人流密集，手机与钱包放在身体前侧。"],
      official: "https://visit.istanbul/grand-bazaar",
      map: "https://www.google.com/maps/search/?api=1&query=Grand+Bazaar+Istanbul"
    },
    "hodjapasha": {
      name: "苏菲旋转舞",
      localName: "Hodjapasha Sema Ceremony",
      kicker: "A RITUAL OF STILLNESS",
      district: "Sirkeci · Fatih",
      image: "assets/images/dervish.jpg",
      photoCredit: "Emin Bozyokuş / Pexels",
      intro: "Hodjapasha 位于一座十五世纪浴室改建的文化中心。这里的 Sema 更接近一场带有宗教象征的静默仪式：音乐、吟诵与旋转共同表现从自我走向精神完善的旅程。",
      quote: "真正的观看方式不是追随旋转，而是在旋转中感受安静。",
      fee: "官网当前 19:00 场约 US$42.22 起",
      feeEquivalent: "约 ¥286",
      hours: "每日 19:00；仪式约 60 分钟，建议提前 30 分钟签到。",
      duration: "展览 30 分钟 + 仪式 60 分钟",
      bestTime: "18:30 入场，19:00 开始",
      transit: "T1 至 Sirkeci，步行约 5 分钟；从 Olden 1772 一带步行约 5–8 分钟。",
      highlights: ["Mevlevi Sema 仪式", "现场传统音乐", "鲁米诗歌与苏菲文化展", "十五世纪浴室穹顶空间"],
      photoSpots: [
        { title: "入口历史石墙", text: "仪式开始前拍摄建筑外观，避开狭窄街巷的人流。" },
        { title: "前厅展览区", text: "服饰、乐器和雕塑是否可拍以现场标识为准。" },
        { title: "把相机收起来", text: "仪式期间禁止拍照录像；这一小时更适合专心观看。" }
      ],
      tips: ["18:30 前签到，迟到可能无法入场。", "仪式中禁止摄影、录像和交谈，手机全程静音。", "7 岁以下儿童不适合参加；场地对轮椅并不友好。", "座位通常按订票先后安排，建议提前购买。"],
      official: "https://hodjapasha.com/en/",
      map: "https://www.google.com/maps/search/?api=1&query=Hodjapasha+Culture+Center+Istanbul"
    },
    "istanbul-modern": {
      name: "伊斯坦布尔现代艺术博物馆",
      localName: "İstanbul Modern",
      kicker: "ART ON THE WATERFRONT",
      district: "Tophane · Beyoğlu",
      image: "assets/images/karakoy.jpg",
      photoCredit: "Yaşar Başkurt / Pexels",
      intro: "土耳其首座现代与当代艺术博物馆坐落在 Karaköy 海岸，由伦佐·皮亚诺设计。馆藏从 1945 年延伸至当代，建筑顶层的反射水池与观景平台又把博斯普鲁斯和历史半岛纳入参观体验。",
      quote: "从展厅走到屋顶，城市本身成为最后一件作品。",
      fee: "外国成人 900 TL；一张票可参观全部展览",
      feeEquivalent: "约 ¥129 / US$19",
      hours: "周日 10:00–18:00；周一闭馆，周五延长至 20:00。",
      duration: "本行程 90 分钟",
      bestTime: "11:10–12:40",
      transit: "T1 至 Tophane，步行约 3–5 分钟；入口位于 Galataport 内。",
      highlights: ["土耳其现代艺术常设展", "摄影展厅", "伦佐·皮亚诺建筑", "屋顶反射水池与 360° 观景台"],
      photoSpots: [
        { title: "屋顶反射水池", text: "利用水面拍历史半岛天际线倒影；大风时注意镜头水雾。" },
        { title: "海滨步道", text: "从 Galataport 水边回望，最容易拍到博物馆鳞片般的立面。" },
        { title: "透明首层", text: "室内外视线贯通，可把人群、港口和建筑结构同时纳入。" }
      ],
      tips: ["路线固定为常设展 → 临时展 → 摄影展 → 顶层平台。", "12:40 准时离馆去午餐，避免影响 14:40 游船。", "当天票不可退换，官网当日线上售票通常在 17:00 关闭。", "大型行李需寄存，展厅摄影规则以现场标识为准。"],
      official: "https://www.istanbulmodern.org/en/visit/museum",
      map: "https://www.google.com/maps/search/?api=1&query=Istanbul+Modern"
    },
    "karakoy-galataport": {
      name: "Karaköy 与 Galataport",
      localName: "Karaköy · Galataport",
      kicker: "THE WATERFRONT REIMAGINED",
      district: "Karaköy · Beyoğlu",
      image: "assets/images/karakoy.jpg",
      photoCredit: "Yaşar Başkurt / Pexels",
      intro: "旧港口、金融街、咖啡馆和全新的海滨公共空间在这里叠合。白天的 Galataport 适合沿海午餐，游船返程后则从加拉塔桥步行进入 Karaköy，在街区喝杯咖啡，再用 F2 缆车避开陡坡。",
      quote: "一座港口如何更新，可以从海边走进一条旧街慢慢看。",
      fee: "公共街区与海滨步道免费；餐饮另计",
      hours: "公共空间通常全天可达；商铺及餐厅各自营业。",
      duration: "午餐 55 分钟 + 傍晚 55 分钟",
      bestTime: "12:40 午餐 / 16:40 后街区散步",
      transit: "T1 至 Tophane 或 Karaköy；前往独立大街可乘 F2 Karaköy–Tünel。",
      highlights: ["Galataport 海滨", "伊斯坦布尔现代", "加拉塔桥", "Karaköy 咖啡馆与旧建筑"],
      photoSpots: [
        { title: "加拉塔桥中段", text: "朝南拍新清真寺与老城天际线，朝北拍加拉塔山坡。" },
        { title: "Tophane 钟楼广场", text: "把历史钟楼、现代港口建筑与行人放入同一画面。" },
        { title: "Karaköy 后街", text: "银行街、涂鸦、咖啡馆和坡道最能表现街区日常。" }
      ],
      tips: ["游船后直接步行过加拉塔桥，不返回 Eminönü 乘车。", "17:35 前抵达 F2 入口，避免步行爬坡消耗体力。", "海滨餐厅需选择出餐快的店，13:35 必须离开。", "邮轮靠港时 Galataport 安检与人流可能增加。"],
      official: "https://galataport.com/en/",
      map: "https://www.google.com/maps/search/?api=1&query=Galataport+Istanbul"
    }
  }
};

const commonsAssetName = (file) => {
  const stem = file
    .replace(/\.[^.]+$/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 54) || "image";

  let hash = 2166136261;
  for (let index = 0; index < file.length; index += 1) {
    hash ^= file.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return `${stem}-${(hash >>> 0).toString(36)}.jpg`;
};

const commonsPhoto = (file) => ({
  image: `assets/images/attractions/${commonsAssetName(file)}`,
  source: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`,
  credit: "Wikimedia Commons · 作者与许可"
});

const localPhoto = (image, credit) => ({ image, credit });

const richAttractionMedia = {
  "blue-mosque": {
    heroImages: {
      desktop: commonsPhoto("Courtyard of the Blue Mosque, Istanbul. (54505628417).jpg"),
      mobile: localPhoto("assets/images/blue-mosque.jpg", TRIP_DATA.attractions["blue-mosque"].photoCredit)
    },
    highlights: [
      {
        title: "六座宣礼塔",
        history: "苏丹艾哈迈德一世在 17 世纪初建造这座皇家清真寺，六座宣礼塔在当时极为罕见，也让它成为伊斯坦布尔天际线中最容易辨认的建筑之一。",
        lookFor: "退到庭院或竞技场一侧，看中央穹顶、层层半穹顶与六座宣礼塔如何组成向上收拢的轮廓。",
        ...commonsPhoto("Blue Mosque (The Sultan Ahmed Mosque) (8395592135).jpg")
      },
      {
        title: "伊兹尼克蓝瓷砖",
        history: "室内低处铺有大量 17 世纪伊兹尼克瓷砖，蓝、青与红色釉彩构成郁金香、康乃馨、石榴与柏树等奥斯曼纹样，“蓝色清真寺”的称呼正由此而来。",
        lookFor: "靠近墙面观察手绘纹样的细微差别，再抬头看瓷砖如何与彩绘穹顶连接；室内光线变化会让蓝色呈现不同层次。",
        ...commonsPhoto("Turkey-03259 - Interior of the Blue Mosque (11312815636).jpg")
      },
      {
        title: "中央穹顶",
        history: "巨大的中央穹顶由四根粗壮的“象腿柱”承托，周围半穹顶逐层分散重量，是奥斯曼皇家清真寺吸收并发展拜占庭穹顶技术的代表。",
        lookFor: "站在中央礼拜空间边缘，寻找穹顶脚下一圈窗户、彩绘书法与四根巨柱之间形成的垂直秩序。",
        ...commonsPhoto("Interior of Sultan Ahmed Mosque, Istanbul, Turkey (Ank Kumar) 03.jpg")
      },
      {
        title: "拱廊庭院",
        history: "清真寺庭院几乎与主礼拜殿等大，过去承担聚集、过渡与礼仪功能；中央六角形净礼亭和四周连续拱廊建立了严格的轴线与对称。",
        lookFor: "站在庭院中轴，观察拱券连续形成的节奏，以及门洞中被框出的穹顶和宣礼塔。",
        ...commonsPhoto("Blue Mosque Courtyard Dusk Wikimedia Commons.jpg")
      }
    ],
    photoSpots: [
      {
        title: "苏丹艾哈迈德公园",
        text: "从公园北侧用横构图收进六座宣礼塔与层叠穹顶；清晨人少，蓝调时刻轮廓最清楚。",
        ...commonsPhoto("Blue Mosque (The Sultan Ahmed Mosque) (8396648956) cropped.jpg")
      },
      {
        title: "庭院中轴",
        text: "站在入口与净礼亭之间，用连续拱廊做对称边框，等人物走到中线再按快门。",
        ...commonsPhoto("Courtyard of Sultan Ahmed I Mosque in blue (2024).jpg")
      },
      {
        title: "古竞技场一侧",
        text: "从土耳其与伊斯兰艺术博物馆附近回望，可把清真寺、广场与城市生活放进同一画面。",
        ...commonsPhoto("Blue Mosque from Turk ve Islam Museum in 2016 1443.jpg")
      }
    ]
  },
  "hagia-sophia": {
    heroImages: {
      desktop: commonsPhoto("Agya Sofia At Night (56990066).jpeg"),
      mobile: localPhoto("assets/images/hagia-sophia.jpg", TRIP_DATA.attractions["hagia-sophia"].photoCredit)
    },
    highlights: [
      {
        title: "悬浮般的中央穹顶",
        history: "现存主体在查士丁尼一世时期于 537 年落成。建筑师以帆拱把圆形穹顶过渡到方形大厅，改变了此后拜占庭和奥斯曼建筑的发展方向。",
        lookFor: "站在中殿抬头，留意穹顶脚下的窗带如何削弱实体感，让穹顶在光线中显得近乎悬浮。",
        ...commonsPhoto("Central nave - Hagia Sophia (8291196158).jpg")
      },
      {
        title: "上层廊道马赛克",
        history: "上层廊道保存着多组拜占庭时期金底马赛克，包括基督、圣母和皇室捐赠者形象，是理解建筑基督教时期最直接的遗存。",
        lookFor: "靠近观察细小镶嵌块如何塑造面部明暗，也留意修复边缘和缺失部分，它们记录了作品被覆盖与重新发现的过程。",
        ...commonsPhoto("Byzantine Mosaic of Christ - Upper Gallery of Aya Sofia Church-Mosque - Sultanahmet District - Istanbul - Turkey (5722520717).jpg")
      },
      {
        title: "巨型阿拉伯书法圆牌",
        history: "中殿悬挂的圆牌由 19 世纪书法家 Kazasker Mustafa İzzet Efendi 设计，书写真主、穆罕默德、四位哈里发及其后人的名字。",
        lookFor: "比较深色圆牌与金色马赛克、浅色大理石之间的尺度关系，这是建筑不同宗教时期并置最强烈的一幕。",
        ...commonsPhoto("Calligraphy Hagia Sophia.jpg")
      },
      {
        title: "拜占庭与奥斯曼的叠层",
        history: "1453 年后建筑改为清真寺，陆续加入米哈拉布、敏拜尔、宣礼塔与书法；今天这些元素与早期大理石、柱廊和马赛克共处。",
        lookFor: "在中殿东端寻找偏向麦加方向的米哈拉布，再回看原有建筑轴线，能直观看到两套空间秩序如何叠合。",
        ...commonsPhoto("Central nave - Hagia Sophia (8291196158).jpg")
      }
    ],
    photoSpots: [
      {
        title: "苏丹艾哈迈德公园喷泉旁",
        text: "用喷泉或草地做前景，横向拍完整主体与宣礼塔；入夜后的暖光更能突出体量。",
        ...commonsPhoto("Agya Sofia At Night (56990066).jpeg")
      },
      {
        title: "上层廊道拱门",
        text: "利用厚重门洞框住中殿与吊灯，人物只占画面很小比例，更容易表现建筑尺度。",
        ...commonsPhoto("Calligraphy Hagia Sophia.jpg")
      },
      {
        title: "西南侧街角",
        text: "稍微拉远，把扶壁、穹顶和宣礼塔叠在一起，能拍出建筑经历多次扩建的复杂轮廓。",
        ...commonsPhoto("Agia Sofia seen from Southwest 47-3.jpg")
      }
    ]
  },
  "basilica-cistern": {
    heroImages: {
      desktop: commonsPhoto("Medusa Head at Basilica Cistern, Istanbul, Turkey (Ank Kumar) 01.jpg"),
      mobile: localPhoto("assets/images/cistern.jpg", TRIP_DATA.attractions["basilica-cistern"].photoCredit)
    },
    highlights: [
      {
        title: "336 根地下石柱",
        history: "这座 6 世纪蓄水池为查士丁尼时期的大皇宫及周边建筑供水，336 根石柱排成 12 行，多数是从更早建筑中再利用的构件。",
        lookFor: "沿栈道回望最长轴线，比较科林斯式、爱奥尼亚式柱头以及石柱粗细差异，能看出“旧材再用”的痕迹。",
        ...commonsPhoto("The Basilica Cistern, with 336 columns laid out in 12 rows of 28, Built in the sixth century by the Byzantine emperor Justinian, Istanbul - 52441464286.jpg")
      },
      {
        title: "美杜莎头像柱础",
        history: "西北角两块罗马时期美杜莎石雕被当作柱础使用，一块侧置、一块倒置；它们来自何处、为何这样摆放至今没有定论。",
        lookFor: "观察蛇发、眼睛和面部雕刻，再比较石块与上方柱身并不完全匹配的尺寸，这正是再利用构件最醒目的证据。",
        ...commonsPhoto("Medusa Head at Basilica Cistern, Istanbul, Turkey (Ank Kumar) 06.jpg")
      },
      {
        title: "泪柱",
        history: "这根表面布满眼形与羽状纹样的石柱常年潮湿，因此被称为“泪柱”。它可能借用了狄奥多西广场一带的装饰形式。",
        lookFor: "近看重复纹样和水珠，再退后一步观察灯光如何强调凹凸表面；不要触摸石材。",
        ...commonsPhoto("Basilica cistern column 2.jpg")
      },
      {
        title: "水面倒影与高架步道",
        history: "修复后的步道让游客能在不同高度和方向观看蓄水池，浅水、石柱与低照度共同强化了地下空间的纵深感。",
        lookFor: "寻找水面最平静的位置，让柱身和倒影形成完整椭圆；慢慢移动，会看到柱列在不同角度不断重组。",
        ...commonsPhoto("Istanbul Basilica Cistern 2009.JPG")
      }
    ],
    photoSpots: [
      {
        title: "长轴柱廊",
        text: "把手机贴近栏杆稳定拍摄，让重复柱列落在画面中央；适当降低曝光可保留灯光颜色。",
        ...commonsPhoto("The Basilica Cistern, with 336 columns laid out in 12 rows of 28, Built in the sixth century by the Byzantine emperor Justinian, Istanbul - 52440955142.jpg")
      },
      {
        title: "美杜莎柱础转角",
        text: "从斜侧面同时收进头像、柱身与水面，画面比单拍石雕更能交代它的实际用途。",
        ...commonsPhoto("Medusa head in Basilica Cistern.jpg")
      },
      {
        title: "泪柱近景",
        text: "对焦在湿润纹样上，用一小段背景柱列说明环境；现场较暗，避免使用闪光灯。",
        ...commonsPhoto("Basilica cistern column.jpg")
      }
    ]
  },
  "topkapi": {
    heroImages: {
      desktop: commonsPhoto("The Gate of Felicity (Bâbüssaâde), Topkapi Palace, Istanbul, Turkey.jpg"),
      mobile: localPhoto("assets/images/topkapi.jpg", TRIP_DATA.attractions.topkapi.photoCredit)
    },
    highlights: [
      {
        title: "帝国议事厅",
        history: "帝国议事厅是大维齐尔与高级官员处理国政、接见使节和审理要务的地方。苏丹不必出席，也能从正义塔下方带格栅的窗口隐蔽旁听。",
        lookFor: "看墙边长榻、穹顶与议政座次，再寻找高处的金色格栅；它解释了权力如何“看不见却始终在场”。",
        ...commonsPhoto("Interior of the Imperial Council (Topkapı Palace)-2.jpg")
      },
      {
        title: "后宫瓷砖房间",
        history: "后宫既是皇室家庭的居所，也是由严格等级和礼仪维持的宫廷机构。房间围绕多重庭院展开，不同时期的瓷砖与木作记录了历代扩建。",
        lookFor: "留意伊兹尼克瓷砖上的花卉纹样、门框叠出的纵深和房间之间不断收紧的动线。",
        ...commonsPhoto("Imperial Harem, Topkapı Palace, Istanbul.jpg")
      },
      {
        title: "皇家宝库",
        history: "宝库收藏外交礼物、武器、珠宝和王权象征，既展示工艺，也反映奥斯曼宫廷与各地政治网络。部分明星展品可能因轮展而调整。",
        lookFor: "重点看宝石如何与金工、书法和兵器结合；若展出，可留意托普卡帕匕首与“制勺者钻石”。",
        ...commonsPhoto("Treasury - Topkapi Palace (8394861146).jpg")
      },
      {
        title: "第四庭院海峡露台",
        history: "第四庭院是苏丹休憩与观景的花园平台，亭阁面向金角湾和博斯普鲁斯，宫廷礼制在这里转向更私密的日常空间。",
        lookFor: "寻找 İftariye 凉亭的细柱金顶，并比较近处花园、亚洲岸和海峡船只形成的三层景深。",
        ...commonsPhoto("Bosphorus view Topkapi Istanbul 2007.jpg")
      }
    ],
    photoSpots: [
      {
        title: "幸福之门",
        text: "站在第二庭院中轴拍摄，屋檐、门洞和两侧树木形成天然对称；等入口人流短暂散开再拍。",
        ...commonsPhoto("Gate of Felicity (Topkapi Palace).jpg")
      },
      {
        title: "后宫长廊",
        text: "用连续门框和瓷砖墙叠出纵深，保留一位远处人物作为尺度；室内不使用闪光灯。",
        ...commonsPhoto("Imperial Harem, Topkapı Palace, Istanbul.jpg")
      },
      {
        title: "İftariye 凉亭",
        text: "从露台侧面收进细柱金顶与海峡，稍微压低机位，让远处天际线落在亭檐下方。",
        ...commonsPhoto("Istanbul.Topkapi048.jpg")
      }
    ]
  },
  "dolmabahce": {
    heroImages: {
      desktop: localPhoto("assets/images/dolmabahce.jpg", TRIP_DATA.attractions.dolmabahce.photoCredit),
      mobile: commonsPhoto("Turkey, Istanbul, Dolmabahçe Clock Tower.jpg")
    },
    highlights: [
      {
        title: "水晶阶梯",
        history: "这座双马蹄形楼梯连接宫殿的行政与礼仪空间，水晶栏杆、黄铜、桃花心木和穹顶采光把来访者的上楼过程变成一场权力仪式。",
        lookFor: "从下层仰看两侧楼梯汇合处，观察透明栏杆如何反射顶部光线，以及木材与金属的材质对比。",
        ...commonsPhoto("Dolmabahçe palace Crystal Staircase in 1993 016.jpg")
      },
      {
        title: "典礼大厅巨型吊灯",
        history: "典礼大厅用于国家庆典与重要接见，巨大的穹顶、柱廊和吊灯共同服务于晚期奥斯曼帝国的外交形象。",
        lookFor: "不要只看吊灯，先沿地毯中轴感受大厅尺度，再看穹顶彩绘、窗帘与海峡侧采光如何共同构成舞台感。",
        ...commonsPhoto("Ceremonial hall Dolmabahce March 2008 pano4.jpg")
      },
      {
        title: "海峡门",
        history: "面向博斯普鲁斯的宫门服务于从水上抵达的皇室与贵宾，把欧洲式石雕礼仪建筑直接连接到海峡交通。",
        lookFor: "站在庭院内侧看门洞中的蓝色水面，留意繁密石雕与远岸开阔景观形成的反差。",
        ...commonsPhoto("Gate of Dolmabahçe Palace, Istanbul, Turkey 001.jpg")
      },
      {
        title: "阿塔图尔克纪念房间",
        history: "土耳其共和国创立者穆斯塔法·凯末尔·阿塔图尔克晚年在宫中工作和居住，并于 1938 年 11 月 10 日在此去世。",
        lookFor: "房间陈设比典礼空间克制；留意床榻、私人物品与停在 09:05 的时钟所形成的纪念氛围。",
        ...commonsPhoto("Ataturks study Dolmabahce March 2008pano.jpg")
      }
    ],
    photoSpots: [
      {
        title: "宫殿海峡门",
        text: "从庭院内向海拍，让雕花门洞完整框住水面和亚洲岸；避免靠得太近切掉顶部装饰。",
        ...commonsPhoto("Bosphorus Gate in Dolmabahce Palace.jpg")
      },
      {
        title: "钟楼广场",
        text: "从斜侧面拍钟楼与宫门，竖构图最适合表现塔身比例；上午光线通常更干净。",
        ...commonsPhoto("Turkey, Istanbul, Dolmabahçe Clock Tower.jpg")
      },
      {
        title: "博斯普鲁斯轮渡上",
        text: "从水上用横构图才能看见宫殿沿岸展开的完整立面，快门速度稍快以抵消船体晃动。",
        ...commonsPhoto("Dolmabahçe Palace and Sultans gate april 19 2014.jpg")
      }
    ]
  },
  "istiklal": {
    heroImages: {
      desktop: commonsPhoto("Istiklal busy afternoon.JPG"),
      mobile: localPhoto("assets/images/istiklal.jpg", TRIP_DATA.attractions.istiklal.photoCredit)
    },
    highlights: [
      {
        title: "怀旧红色电车",
        history: "独立大街的历史电车在 20 世纪后期以怀旧线路恢复，如今连接 Taksim 与 Tünel，也成为这条步行街最鲜明的城市符号。",
        lookFor: "注意轨道、车铃和行人如何共享街道；拍照必须站在轨道外侧，绝不要为构图挡住车辆。",
        ...commonsPhoto("Istiklal busy afternoon.JPG")
      },
      {
        title: "圣安多尼教堂",
        history: "现存红砖新哥特式教堂于 1912 年落成，是伊斯坦布尔规模最大的罗马天主教堂之一，也见证了 Beyoğlu 多元社群的历史。",
        lookFor: "从大街入口穿过狭长前院，看双塔立面、玫瑰窗与彩色玻璃如何从喧闹街景中逐步显现。",
        ...commonsPhoto("Istanbul asv2021-11 img71 StAnthony of Padua Church.jpg")
      },
      {
        title: "Çiçek Pasajı",
        history: "这座 19 世纪拱廊最初名为 Cité de Péra，后来因俄国流亡者经营花摊而得名“花街”，如今以餐馆和酒馆为主。",
        lookFor: "抬头看玻璃顶、连续拱券和二层立面，入口处的狭窄视角最能表现它从街道向室内城市延伸的感觉。",
        ...commonsPhoto("Beyoglu 4802.jpg")
      },
      {
        title: "SALT Beyoğlu",
        history: "SALT 将展览、研究、公共活动与档案阅读引入独立大街，是理解当代伊斯坦布尔文化生产方式的一扇窗口。",
        lookFor: "先看当期展览，再观察老商业建筑如何被改造成开放的公共空间；临街橱窗也常是展览的一部分。",
        ...commonsPhoto("SALT Beyoğlu, İstanbul (12965606194).jpg")
      }
    ],
    photoSpots: [
      {
        title: "电车经过的街心",
        text: "站在安全区域用中长焦压缩街景，等红色电车与两侧立面重叠，画面会更集中。",
        ...commonsPhoto("İstiklal Caddesi İstanbul.jpg")
      },
      {
        title: "圣安多尼教堂前院",
        text: "从大街门洞向内拍，深色入口会自然形成边框，红砖教堂则成为明亮主体。",
        ...commonsPhoto("Istanbul asv2021-11 img71 StAnthony of Padua Church.jpg")
      },
      {
        title: "Tünel 广场",
        text: "傍晚灯光亮起时，用老电车和坡道做前景，街角建筑与咖啡馆最有城市生活感。",
        ...commonsPhoto("Tunel-Taksim Tram.jpg")
      }
    ]
  },
  "galata-tower": {
    heroImages: {
      desktop: localPhoto("assets/images/galata-skyline.jpg", TRIP_DATA.attractions["galata-tower"].photoCredit),
      mobile: commonsPhoto("Büyü Hendek Street from the Galata tower (December 2013).jpg")
    },
    highlights: [
      {
        title: "360° 环形观景台",
        history: "高处观景层让人一次辨认金角湾、历史半岛、博斯普鲁斯和亚洲岸，是理解伊斯坦布尔地形最直观的位置。",
        lookFor: "先用海峡和金角湾确定方向，再找苏莱曼尼耶、圣索菲亚、托普卡帕宫与两岸桥梁，城市会像地图一样展开。",
        ...commonsPhoto("Istanbul panorama from Galata tower - 1.jpg")
      },
      {
        title: "金角湾与历史半岛全景",
        history: "加拉塔山坡与历史半岛隔金角湾相望，拜占庭和奥斯曼时期的港口、城墙与清真寺共同塑造了这条城市界面。",
        lookFor: "让加拉塔桥成为画面中的横向标尺，观察清真寺穹顶如何沿山脊线层层升高。",
        ...commonsPhoto("20101106 Galata Tower Istanbul Turkey Panorama.jpg")
      },
      {
        title: "热那亚城塔遗存",
        history: "现塔由热那亚殖民者在 1348 年建成，曾名“基督塔”，后来又被奥斯曼人用作监狱、瞭望和火警塔。",
        lookFor: "在塔身近处观察厚重石墙、窄窗和锥形屋顶，再到周边街道寻找旧城防地形留下的坡度。",
        ...commonsPhoto("Galata Tower 3.jpg")
      },
      {
        title: "逐层下行的城市展览",
        history: "参观通常从高层向下经过展厅，内容把塔的建筑史、港口贸易与城市传说串联起来。",
        lookFor: "留意墙体厚度、楼层尺度与修复材料；这些实体细节比单独的文字更能说明塔如何反复改变用途。",
        ...commonsPhoto("Interior of the Galata Tower.jpg")
      }
    ],
    photoSpots: [
      {
        title: "观景台南侧",
        text: "面向历史半岛使用横构图，让金角湾成为前景，穹顶和宣礼塔沿远处山脊铺开。",
        ...commonsPhoto("Istanbul panorama from Galata tower - 1.jpg")
      },
      {
        title: "Büyük Hendek Caddesi",
        text: "沿北侧街道拉开距离，用两侧建筑夹出完整塔身；竖构图和清晨低人流最合适。",
        ...commonsPhoto("Büyü Hendek Street from the Galata tower (December 2013).jpg")
      },
      {
        title: "Serdar-ı Ekrem 坡道",
        text: "将石板坡道、旧公寓和塔顶放在同一条视线上，稍低机位能强化街道的上升感。",
        ...commonsPhoto("Galata Tower, Serdar-ı Ekrem Street.jpg")
      }
    ]
  },
  "bosphorus-cruise": {
    heroImages: {
      desktop: commonsPhoto("Sultanahmet ferry on the Bosphorus in Istanbul, Turkey 001.jpg"),
      mobile: localPhoto("assets/images/bosphorus.jpg", TRIP_DATA.attractions["bosphorus-cruise"].photoCredit)
    },
    highlights: [
      {
        title: "多尔玛巴赫切宫水岸立面",
        history: "宫殿沿欧洲岸横向展开，面向海峡的立面原本就是重要的礼仪入口；从水上才能看清建筑与海岸线的完整关系。",
        lookFor: "留意宫殿长立面、海峡门和后方山坡的层次，船靠近 Beşiktaş 前提前到外侧甲板。",
        ...commonsPhoto("Dolmabahçe Palace and Sultans gate april 19 2014.jpg")
      },
      {
        title: "奥塔科伊清真寺与大桥",
        history: "19 世纪的奥塔科伊清真寺贴近水边，身后是 20 世纪跨海大桥，两者在同一画面中浓缩了海峡岸线的时代跨度。",
        lookFor: "等待船行至清真寺斜前方，让宣礼塔避开桥塔重叠，能同时保留宗教建筑与桥梁轮廓。",
        ...commonsPhoto("Ortaköy Mosque and Bosphorus Bridge, March 2024 01.jpg")
      },
      {
        title: "鲁梅利堡",
        history: "苏丹穆罕默德二世在 1452 年迅速修建鲁梅利堡，以控制博斯普鲁斯最窄处，为次年攻取君士坦丁堡做准备。",
        lookFor: "从船上辨认依山势布置的三座主塔和连接城墙，堡垒随坡起伏的轮廓比单看一座塔更重要。",
        ...commonsPhoto("Fortress Rumeli hisarı as seen from a Bosphorus boat.jpg")
      },
      {
        title: "两岸木屋与水岸生活",
        history: "海峡沿岸的木构宅邸（yalı）曾是奥斯曼精英的季节性住宅，也塑造了以码头、花园和水路为中心的生活方式。",
        lookFor: "观察房屋与水面几乎齐平的入口、成排窗户和私人码头，比较修复宅邸与现代公寓的尺度差异。",
        ...commonsPhoto("Wooden building on the Bosphorus.jpg")
      }
    ],
    photoSpots: [
      {
        title: "船尾外侧甲板",
        text: "站在不挡通道的位置，利用尾流做引导线，拍下逐渐远去的历史半岛天际线。",
        ...commonsPhoto("Sultanahmet ferry on the Bosphorus in Istanbul, Turkey 001.jpg")
      },
      {
        title: "奥塔科伊航段",
        text: "提前切换横构图，在清真寺、桥塔和岸线形成错落关系时连拍，避免主体相互遮挡。",
        ...commonsPhoto("Ortaköy Mosque and Bosphorus Bridge, March 2024 03.jpg")
      },
      {
        title: "鲁梅利堡对岸",
        text: "用稍快快门抵消船体晃动，把三座主塔与整段山坡城墙一次收进画面。",
        ...commonsPhoto("PXL 20241210 122905199.MP Istanbul Cityscape from Bosphorus Strait Cruise Türkiye 25 Rumeli Hisarı (Rumelian Fortress or Boğazkesen Fortress).jpg")
      }
    ]
  },
  "grand-bazaar": {
    heroImages: {
      desktop: commonsPhoto("Istanbul - Grand Bazaar (55105990794).jpg"),
      mobile: localPhoto("assets/images/grand-bazaar.jpg", TRIP_DATA.attractions["grand-bazaar"].photoCredit)
    },
    highlights: [
      {
        title: "Kalpakçılar 主街",
        history: "这条东西向主街贯穿市场核心，传统上聚集珠宝和贵重商品。市场按行业分区的组织方式仍能从街名与店铺类型中看出。",
        lookFor: "抬头辨认拱顶、街名牌和连续店面，不要只看橱窗；建筑轴线能帮助你在复杂巷道中保持方向。",
        ...commonsPhoto("Kapali Carsi-Grand Bazar-Istanbul-Sep08.jpg")
      },
      {
        title: "Cevahir Bedesteni 核心区",
        history: "老 Bedesten 是大巴扎最早的 15 世纪核心之一，厚墙与封闭拱顶曾用于保管珠宝、织物和其他高价值商品。",
        lookFor: "观察比外围街巷更厚重的墙体、低矮拱顶和紧凑铺位，空间防御性会明显增强。",
        ...commonsPhoto("Turkey-03312 - Inside the Grand Bazaar (11313096656).jpg")
      },
      {
        title: "Zincirli Han",
        history: "这类 han 原本为商旅、仓储和手工作坊提供围合庭院。Zincirli Han 至今仍比市场主街安静，也保留了活跃工坊。",
        lookFor: "从拱门进入后先看两层廊道与中央庭院，再留意金属敲击声和仍在工作的匠人。",
        ...commonsPhoto("Istanbul - Zincirli Han (55102383966).jpg")
      },
      {
        title: "灯具与手工艺铺",
        history: "今天的大巴扎同时服务本地贸易与旅游消费，彩色玻璃灯、金属器和纺织品构成了最鲜明的当代市场视觉。",
        lookFor: "比较玻璃、金属与织物在不同灯光下的颜色；购买时询问产地、材质并索要清晰票据，不以陈列方式判断年代。",
        ...commonsPhoto("Grand Bazaar, Istanbul.jpg")
      }
    ],
    photoSpots: [
      {
        title: "Kalpakçılar 拱顶主轴",
        text: "把拱顶中心线放正，用稍低机位同时保留街名、灯具和连续店面，等待人流形成自然层次。",
        ...commonsPhoto("Kapali Carsi-Grand Bazar-Istanbul-Sep08.jpg")
      },
      {
        title: "Zincirli Han 庭院",
        text: "从入口拱门内拍向庭院，以暗处做前景边框，二层廊道和植物会成为明亮主体。",
        ...commonsPhoto("Zincirli Han 1.jpg")
      },
      {
        title: "Bedesten 内部",
        text: "用广角表现厚重拱顶与密集铺位，但避免把镜头贴近顾客和店主；拍摄前先示意。",
        ...commonsPhoto("Turkey-03312 - Inside the Grand Bazaar (11313096656).jpg")
      }
    ]
  },
  "hodjapasha": {
    heroImages: {
      desktop: commonsPhoto("Whirling Dervishes at Hodjapasha.jpg"),
      mobile: localPhoto("assets/images/dervish.jpg", TRIP_DATA.attractions.hodjapasha.photoCredit)
    },
    highlights: [
      {
        title: "Mevlevi Sema 仪式",
        history: "Sema 是梅夫莱维苏菲传统中的精神仪式，音乐、吟诵、鞠躬与旋转象征从自我走向爱与精神完善的旅程，并非普通舞台舞蹈。",
        lookFor: "留意旋转者先交叉双臂、随后展开手臂的动作，以及每段旋转之间重新鞠躬和归位的节奏。",
        ...commonsPhoto("Whirling Dervishes 2.JPG")
      },
      {
        title: "现场传统音乐",
        history: "仪式由 ney 芦笛、弦乐、鼓与人声共同引导。音乐不是背景，而是决定旋转段落、呼吸与情绪推进的核心结构。",
        lookFor: "开场先听芦笛独奏的音色，再观察乐师与旋转者之间并不依靠语言的节奏配合。",
        ...commonsPhoto("Whirling Dervish (224083915).jpeg")
      },
      {
        title: "鲁米诗歌与苏菲文化展",
        history: "Hodjapasha 的展览以服饰、乐器、书籍、个人用具、影像和互动诗歌介绍鲁米思想与梅夫莱维传统，为理解仪式符号提供背景。",
        lookFor: "重点看高帽、白色长袍和乐器各自的象征与用途；展签会帮助你在正式仪式中认出这些元素。",
        ...commonsPhoto("Istanbul, Turkey (November 2023) - 534.jpg")
      },
      {
        title: "历史浴室穹顶空间",
        history: "文化中心位于历史浴室建筑中，紧凑的圆形表演空间与砖石穹顶让声音和旋转更集中，也与大型剧院体验截然不同。",
        lookFor: "入座后先观察穹顶、石墙和圆形座席如何围住表演区；正式开始后把手机收起，专心感受声音回响。",
        ...commonsPhoto("Whirling Dervishes at Hodjapasha.jpg")
      }
    ],
    photoSpots: [
      {
        title: "历史建筑入口",
        text: "在签到前从街巷斜侧拍入口与石墙，保留周边建筑作为尺度；不要堵住狭窄通道。",
        ...commonsPhoto("Istanbul, Turkey (November 2023) - 537.jpg")
      },
      {
        title: "文化展览区",
        text: "只在现场允许时拍摄服饰、乐器和展签，用一件展品配一段说明，比拍满整面展柜更清楚。",
        ...commonsPhoto("Istanbul, Turkey (November 2023) - 534.jpg")
      }
    ]
  },
  "istanbul-modern": {
    heroImages: {
      desktop: commonsPhoto("Istanbul Museum of Modern Art Exterior in 2024 5624.jpg"),
      mobile: commonsPhoto("İstanbul Modern (10072023).jpg")
    },
    highlights: [
      {
        title: "土耳其现代艺术馆藏",
        history: "伊斯坦布尔现代的馆藏以 1945 年以来的土耳其现代与当代艺术为主，并通过轮换展陈把本地艺术放入更广泛的国际语境。",
        lookFor: "先看作品年代与媒介，再比较同一时期艺术家如何回应城市化、身份和社会变化；具体展品会随轮展调整。",
        ...commonsPhoto("Istanbul Modern Museum.jpg")
      },
      {
        title: "摄影与影像展厅",
        history: "博物馆设有专门的摄影空间，并持续收藏、研究和展示土耳其摄影及跨媒介影像，让城市记忆不只通过绘画被讲述。",
        lookFor: "留意作品的拍摄年代、系列顺序与展墙节奏；连续观看一组作品，通常比只挑一张“最好看”的更有意义。",
        ...commonsPhoto("Istanbul Modern Karakoy.jpg")
      },
      {
        title: "伦佐·皮亚诺新馆",
        history: "现馆由伦佐·皮亚诺建筑工作室设计，2023 年开放。金属立面回应海面反光，透明首层则尽量保持城市与港口之间的视觉联系。",
        lookFor: "从海滨退后观察水平体量和金属表皮，再穿过首层比较建筑如何框住水岸、行人和历史半岛。",
        ...commonsPhoto("Istanbul Museum of Modern Art Exterior in 2024 5619.jpg")
      },
      {
        title: "顶层观景露台",
        history: "建筑顶层以浅水反射面和开阔露台结束参观动线，把博斯普鲁斯、加拉塔港与历史半岛变成博物馆体验的一部分。",
        lookFor: "先找风较小、水面较平的位置，再沿露台辨认加拉塔塔、旧城穹顶与不断移动的渡轮。",
        ...commonsPhoto("Galataport from Istanbul Museum of Modern Art in 2024 5627.jpg")
      }
    ],
    photoSpots: [
      {
        title: "顶层观景露台",
        text: "用低机位让浅水反射面延伸到天际线；若风大水面不成镜，就改拍船只与旧城层次。",
        ...commonsPhoto("Galataport from Istanbul Museum of Modern Art in 2024 5627.jpg")
      },
      {
        title: "海滨步道",
        text: "从 Galataport 水边回望，以横构图表现博物馆金属立面和沿岸水平线。",
        ...commonsPhoto("Istanbul Museum of Modern Art Exterior in 2024 5624.jpg")
      },
      {
        title: "透明首层外侧",
        text: "站在建筑外侧拍玻璃后的行人与结构，让室内活动、港口和城市倒影同时出现。",
        ...commonsPhoto("İstanbul Modern (10072023).jpg")
      }
    ]
  },
  "karakoy-galataport": {
    heroImages: {
      desktop: commonsPhoto("Galataport from Istanbul Museum of Modern Art in 2024 5627.jpg"),
      mobile: localPhoto("assets/images/karakoy.jpg", TRIP_DATA.attractions["karakoy-galataport"].photoCredit)
    },
    highlights: [
      {
        title: "Galataport 海滨",
        history: "旧邮轮码头更新后把部分岸线转为公共步道，并以地下邮轮设施尽量释放地面空间，重新连接城市与博斯普鲁斯。",
        lookFor: "沿水边比较邮轮靠港与无船时的空间变化，也留意历史建筑、商业体量和公共广场如何衔接。",
        ...commonsPhoto("Galataport night.jpg")
      },
      {
        title: "伊斯坦布尔现代",
        history: "这座由伦佐·皮亚诺设计、2023 年开放的新馆是海滨更新的文化核心，透明首层与金属立面直接回应港口环境。",
        lookFor: "从海滨退后看建筑水平体量，再走近观察立面鳞片般的金属板如何随光线改变明暗。",
        ...commonsPhoto("Istanbul Museum of Modern Art Exterior in 2024 5624.jpg")
      },
      {
        title: "加拉塔桥",
        history: "连接历史半岛与 Galata/Karaköy 的桥梁长期承担交通、贸易和日常生活，今天上下层仍叠合着车辆、电车、钓鱼者与餐馆。",
        lookFor: "走到桥中段分别向南北回望：一边是新清真寺与旧城穹顶，一边是加拉塔山坡与高塔。",
        ...commonsPhoto("Panoramic view of Istanbul- Yeni Cami (The New Mosque), Galata Bridge. Turkey, Southeastern Europe.jpg")
      },
      {
        title: "Karaköy 后街",
        history: "Karaköy 曾是港口、银行和工匠聚集区，今天旧金融建筑、五金铺、咖啡馆与画廊仍在陡坡和窄街中并置。",
        lookFor: "离开海滨主路后观察 Bankalar Caddesi 一带的石建立面、招牌和街角高差，城市更新的反差最清楚。",
        ...commonsPhoto("Streets of Karaköy in İstanbul.jpg")
      }
    ],
    photoSpots: [
      {
        title: "加拉塔桥中段",
        text: "朝南用横构图拍新清真寺、渡轮与老城天际线；让桥栏或钓竿做近景会更有现场感。",
        ...commonsPhoto("Istanbul - Galata Bridge.jpg")
      },
      {
        title: "Tophane 钟楼广场",
        text: "把历史钟楼、Nusretiye 清真寺与现代港口放进同一画面，竖构图最能表现时代层次。",
        ...commonsPhoto("Istanbul's oldest clocktower has found new life as the centre of a square behind Galataport with the Nusretiye Mosque behind it.jpg")
      },
      {
        title: "Karaköy 后街",
        text: "在坡道转角拍旧立面、咖啡馆和行人，使用中等焦段可避免广角让建筑倾斜过度。",
        ...commonsPhoto("Streets of Karaköy in İstanbul.jpg")
      }
    ]
  }
};

Object.entries(richAttractionMedia).forEach(([id, media]) => {
  Object.assign(TRIP_DATA.attractions[id], media);
});
