/** 首頁各區塊內容 — 文字沿用現行官網，之後可整批替換或接 CMS。 */

export const resorts = [
  {
    slug: "teine",
    name: "手稻",
    nameEn: "Sapporo Teine",
    blurb:
      "長年在北海道排行前三名的優良雪質和充足雪量，雪場地形多變，初學者和進階者都能找到樂趣。",
    tag: "離札幌 30 分鐘",
  },
  {
    slug: "rusutsu",
    name: "留壽都",
    nameEn: "Rusutsu",
    blurb:
      "北海道規模最大的單一滑雪度假村，三座山頭與頂級乾粉雪，連續多年獲世界滑雪大獎肯定。",
    tag: "北海道最大",
  },
  {
    slug: "tomamu",
    name: "星野 TOMAMU",
    nameEn: "Hoshino Resorts Tomamu",
    blurb:
      "初次到來一天也滑不完。優質粉雪加上豪華設施，滑雪之外的雪上活動也很多選擇。",
    tag: "度假首選",
  },
  {
    slug: "sapporo-kokusai",
    name: "札幌國際",
    nameEn: "Sapporo Kokusai",
    blurb:
      "精心規劃過的場地，第一次接觸滑雪、親子同樂、甚至滑雪高手，都能盡情享受滑雪假期。",
    tag: "頂級粉雪",
  },
  {
    slug: "onze",
    name: "ONZE",
    nameEn: "Onze",
    blurb:
      "小樽朝里的面海雪場，邊滑雪邊看日本海絕景。當地人的小雪場，非常適合初學與平花。",
    tag: "面海雪道",
  },
  {
    slug: "sahoro",
    name: "佐幌",
    nameEn: "Sahoro",
    blurb:
      "十勝帶廣的寶藏雪場，超乾粉雪加上「十勝晴」好天氣。人少、雪好，空曠雪道幾乎零等待。",
    tag: "十勝晴",
  },
  {
    slug: "kamui",
    name: "神居",
    nameEn: "Kamui Ski Links",
    blurb:
      "旭川近郊、日本人眼中的老牌雪場，150 公尺超寬雪道是刻滑聖地，內行人的練功天堂。",
    tag: "刻滑聖地",
  },
] as const;

export const features = [
  {
    title: "多語言教學",
    body: "教練來自各地，中文、英文、日文完全不用擔心語言隔閡。",
    icon: "language",
  },
  {
    title: "客製化課程",
    body: "小班制讓教練因材施教，不同的學生就有不同的課綱。",
    icon: "custom",
  },
  {
    title: "影像記錄",
    body: "課程中教練為你拍攝滑行照片與影片，進步與回憶一次帶走。",
    icon: "camera",
  },
  {
    title: "親子、專項沒問題",
    body: "平花、樹林、親子、刻滑——所有程度的學生我們都有教練能安排。",
    icon: "family",
  },
] as const;

export const courses = [
  {
    title: "初學體驗課程",
    subtitle: "半日 3 小時／全日 6 小時",
    body: "第一次滑雪就上手。從穿裝備、站姿到第一個轉彎，中文教練全程陪伴。",
    image: "/images/beginner-grey.jpg",
    href: "/ski-resort",
  },
  {
    title: "私人訂製課程",
    subtitle: "Ski 雙板・Snowboard 單板",
    body: "團課跟不上、家人程度不一、想練特定技術——依你的程度與目標客製進度。",
    image: "/images/snowboard-blue.jpg",
    href: "/ski-resort",
  },
  {
    title: "進階專項課程",
    subtitle: "粉雪・樹林・刻滑・平花",
    body: "粉雪日的樹林線、刻滑的立刃角度、平花的旋轉軸——跟著專項教練深練。",
    image: "/images/powder-yellow.jpg",
    href: "/ski-resort",
  },
] as const;

export const testimonials = [
  {
    text: "這次帶家人去留壽都滑雪，從 7 歲到 70 歲，請了巧克力教練和 Jenny 教練，超級有耐心也會提供一些小撇步，讓家人快速上手。大家都玩得很開心，推薦他們的團隊。",
    author: "An",
    context: "留壽都・家庭課程",
  },
  {
    text: "這次指定 Yumi 教練帶我家 4 歲小孩，零經驗直接挑戰單板，教練很有耐心小孩學得很開心，回家時一直吵著要請假不要上學，要跟 Yumi 去滑雪 😅",
    author: "EASON",
    context: "親子單板課程",
  },
  {
    text: "感謝雅各教練，小男生（7 歲）很喜歡教練，很期待可以再相見。有體驗到一些舒適圈外的東西，也順利克服比較大的坡度，第二天是順利的 Ending。",
    author: "Chihmin C",
    context: "親子課程",
  },
  {
    text: "感謝阿德教練，我們可以順一點 S 下坡，也讓小朋友如願去嘗試比較陡的坡。說明轉彎髖部的動作與板子左右吃刃，也感謝分享一些札幌的美食。",
    author: "Chihmin C",
    context: "進階課程",
  },
] as const;

/** 4 大主力雪場課程（價格對齊 landing page，Razio 上線前按鈕先連 WooCommerce） */
export const products = [
  {
    label: "全日、半日課程",
    title: "手稻 Teine",
    stamp: "手",
    priceFull: "全日 ¥75,000",
    priceHalf: "半日 ¥55,000",
    body: "離札幌最近的一座大型滑雪場，日本人眼中的經典雪場，各種程度都適合。車程離市區真的不遠喔！",
    image: "/images/beginner-grey.jpg",
  },
  {
    label: "全日課程",
    title: "札幌國際 Kokusai",
    stamp: "國",
    priceFull: "¥80,000",
    priceHalf: null,
    body: "常年在北海道有排行前三名的優良雪質和充足雪量，雪場地形也多變，不管是初學者還是進階者都能找到樂趣。",
    image: "/images/snowboard-blue.jpg",
  },
  {
    label: "全日、半日課程",
    title: "星野 TOMAMU",
    stamp: "野",
    priceFull: "全日 ¥88,000",
    priceHalf: "半日 ¥70,000",
    body: "滑雪場佔地約 123 公頃，29 條雪道，最長滑行距離 4.2 公里。不論是第一次、想親子同樂、或滑雪高手，都可以盡情享受。",
    image: "/images/powder-yellow.jpg",
  },
  {
    label: "全日課程",
    title: "留壽都 Rusutsu",
    stamp: "壽",
    priceFull: "¥80,000",
    priceHalf: null,
    body: "北海道規模最大的單一滑雪度假村，擁有三座山頭與頂級乾粉雪，連續多年獲得世界滑雪大獎肯定。",
    image: "/images/lookout-blue.jpg",
  },
] as const;

export const stats = [
  { value: "18", label: "位專業教練" },
  { value: "7", label: "座北海道雪場" },
  { value: "3", label: "個雪季的信任" },
  { value: "ISIA", label: "國際認證" },
] as const;
