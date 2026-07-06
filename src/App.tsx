import {

  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  Download,
  ExternalLink,

  Globe2,

  Layers3,
  Mail,

  Menu,
  MessageCircle,
  MonitorPlay,
  Phone,

  Send,
  Share2,

  Sparkles,
  UserPlus,

  WandSparkles,
  X,

  ShieldCheck,
} from "lucide-react";
import { VideoIcon, PosterIcon, PresentationIcon, InsuranceIcon, RealEstateIcon, EducationIcon, CommercialAdsIcon } from "./components/CustomIcons";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import GlassSurface from "./components/GlassSurface";
import RotatingText from "./components/RotatingText";

const BRAND = "尚方 AI Studio";
const CHAR_INTERVAL = 42;
const TYPE_START = 120;
const LIFT_AT = TYPE_START + BRAND.length * CHAR_INTERVAL + 280;

type Service = {
  icon: React.ComponentType<{ size?: number; className?: string; }>;
  title: string;
  eyebrow: string;
  description: string;
  points: string[];
};

type Industry = {
  icon: React.ComponentType<{ size?: number; className?: string; }>;
  title: string;
  label: string;
  description: string;
  deliverables: string[];
  cases?: IndustryCase[];
  accent: "coral" | "teal" | "amber" | "lilac";
};

type Work = {
  title: string;
  image: string;
  file?: string;
  note?: string;
  video?: string;
  cardUrl?: string;
};

type IndustryCase = {
  title: string;
  label: string;
  description: string;
  image: string;
  boardIndex: number;
};

type WorkBoard = {
  title: string;
  label: string;
  description: string;
  cover: string;
  count: string;
  images: Work[];
};

type CaseWork = {
  title: string;
  tag: string;
  description: string;
  image: string;
  boardIndex?: number;
};

type ProcessStep = {
  title: string;
  label: string;
  description: string;
};

const services: Service[] = [
  {
    icon: VideoIcon,
    eyebrow: "AI 视频 / Video",
    title: "AI 视频生成",
    description: "从脚本、分镜到短片成片，适合产品发布、社媒内容和品牌视觉实验。",
    points: ["交付：成片 MP4", "适配：横版 / 竖版", "包含：字幕与封面"],
  },
  {
    icon: PosterIcon,
    eyebrow: "AI 海报 / Poster",
    title: "AI 海报视觉",
    description: "快速产出活动主视觉、产品海报、社媒封面与系列化传播素材。",
    points: ["交付：主视觉海报", "适配：社媒 / 电商尺寸", "包含：版式精修"],
  },
  {
    icon: PresentationIcon,
    eyebrow: "AI 演示 / PPT",
    title: "AI PPT / 路演演示",
    description: "把复杂业务转成清晰、有记忆点的演示材料，覆盖融资、汇报和提案。",
    points: ["交付：PPT 源文件", "适配：路演 / 汇报", "包含：讲稿结构"],
  },
];

const industries: Industry[] = [
  {
    icon: InsuranceIcon,
    title: "保险业",
    label: "Insurance",
    description: "把复杂条款、产品价值和客户教育内容，转成更容易被理解和信任的视觉材料。",
    deliverables: ["产品说明视频", "代理人培训 PPT", "客户教育海报"],
    cases: [
      {
        title: "保险产品 PPT",
        label: "Deck",
        description: "产品结构、保障重点和销售话术梳理。",
        image: "/assets/insurance/insurance-ai-ref-deck.png",
        boardIndex: 6,
      },
      {
        title: "客户教育海报",
        label: "Poster",
        description: "把保障利益和风险场景做成可传播视觉。",
        image: "/assets/insurance/insurance-ai-ref-posters.png",
        boardIndex: 7,
      },
      {
        title: "电子名片",
        label: "Profile",
        description: "适合代理人获客、微信承接和服务介绍。",
        image: "/assets/insurance/insurance-ai-ref-card.png",
        boardIndex: 8,
      },
    ],
    accent: "coral",
  },
  {
    icon: RealEstateIcon,
    title: "房地产行业",
    label: "Real Estate",
    description: "围绕楼盘价值、空间氛围、区位卖点和汇报提案，形成统一的项目传播内容。",
    deliverables: ["楼盘宣传短片", "项目价值海报", "招商汇报 PPT"],
    accent: "teal",
  },
  {
    icon: EducationIcon,
    title: "教育行业",
    label: "Education",
    description: "适合课程推广、招生说明、知识可视化和教学课件，把信息做得更清楚。",
    deliverables: ["课程宣传视频", "招生海报", "教学课件 PPT"],
    accent: "amber",
  },
  {
    icon: CommercialAdsIcon,
    title: "商业广告",
    label: "Commercial Ads",
    description: "为产品上新、品牌 campaign 和活动传播，快速生成能投放、能提案、能延展的素材。",
    deliverables: ["产品广告片", "社媒海报", "活动传播视觉"],
    accent: "lilac",
  },
];

const workBoards: WorkBoard[] = [
  {
    title: "科技产品视觉",
    label: "产品视觉",
    description: "高端产品拆解、科技海报与品牌人物视觉，适合产品发布和装备类传播。",
    cover: "/assets/reference/tech-leica-camera.png",
    count: "6 张作品",
    images: [
      { title: "Xbox 手柄拆解", image: "/assets/reference/tech-xbox-controller.png" },
      { title: "ROG 键盘拆解", image: "/assets/reference/tech-rog-keyboard.png" },
      { title: "Leica 相机拆解", image: "/assets/reference/tech-leica-camera.png" },
      { title: "游戏手柄人物广告 01", image: "/assets/reference/tech-axis-controller-01.png" },
      { title: "游戏手柄人物广告 02", image: "/assets/reference/tech-axis-controller-02.png" },
      { title: "夜景人物品牌图", image: "/assets/reference/tech-axis-night.png" },
    ],
  },
  {
    title: "生活方式视觉",
    label: "生活方式",
    description: "食品饮品、旅行海报与艺术化主视觉，适合品牌氛围和社媒传播。",
    cover: "/assets/reference/lifestyle-peach-tea.png",
    count: "7 张作品",
    images: [
      { title: "白桃乌龙饮品广告", image: "/assets/reference/lifestyle-peach-tea.png" },
      { title: "一碗入魂拉面海报", image: "/assets/reference/lifestyle-ramen-poster.png" },
      { title: "端午活动主视觉", image: "/assets/reference/lifestyle-dragon-boat-festival.png" },
      { title: "龙形艺术视觉", image: "/assets/reference/lifestyle-dragon-art.png" },
      { title: "三文鱼餐饮海报", image: "/assets/reference/lifestyle-salmon-bowl.png" },
      { title: "乐事薯片创意广告", image: "/assets/reference/lifestyle-lays-poster.png" },
      { title: "Amalfi 旅行海报", image: "/assets/reference/lifestyle-amalfi-travel.png" },
    ],
  },
];

const caseWorks: CaseWork[] = [
  {
    title: "科技产品视觉",
    tag: "参考图库",
    description: "高端产品拆解、科技海报与品牌人物视觉。",
    image: "/assets/reference/tech-leica-camera.png",
    boardIndex: 0,
  },
  {
    title: "生活方式视觉",
    tag: "参考图库",
    description: "食品饮品、旅行海报与艺术化主视觉。",
    image: "/assets/reference/lifestyle-peach-tea.png",
    boardIndex: 1,
  },
  {
    title: "产品发布短片",
    tag: "AI 视频",
    description: "适合新品预热、发布会开场和社媒短视频。",
    image: "/assets/video/phone-closeup-cover.png",
    boardIndex: 2,
  },
  {
    title: "活动主视觉",
    tag: "AI 视频",
    description: "用人物特写和氛围镜头建立活动视觉记忆。",
    image: "/assets/video/racing-driver-cover.png",
    boardIndex: 3,
  },
  {
    title: "山地航拍情绪短片",
    tag: "AI 视频",
    description: "适合文旅宣传、活动开场和品牌情绪片的自然景观短片。",
    image: "/assets/video/shangfang-case-wechat-20260702-cover.jpg",
    boardIndex: 9,
  },
  {
    title: "策略演示 Deck",
    tag: "AI PPT",
    description: "咨询策略与 AI 科技方向的 PPT 样张。",
    image: "/assets/ppt/ai-tech-release-cover.png",
    boardIndex: 4,
  },
  {
    title: "品牌演示 Deck",
    tag: "AI PPT",
    description: "更有记忆点的品牌提案与活动演示。",
    image: "/assets/ppt/brand-memory-cover.png",
    boardIndex: 5,
  },
];

const galleryBoards: WorkBoard[] = [
  ...workBoards,
  {
    title: "产品发布短片",
    label: "AI 视频",
    description: "产品发布、社媒短片和品牌预热视频方向，包含可播放视频。",
    cover: "/assets/video/phone-closeup-cover.png",
    count: "1 条视频",
    images: [
      {
        title: "电话特写短片",
        image: "/assets/video/phone-closeup-cover.png",
        note: "AI 视频样张",
        video: "/assets/video/racing-driver.mp4",
      },
    ],
  },
  {
    title: "活动主视觉",
    label: "AI 视频",
    description: "活动主视觉、人物特写和气氛短片方向，包含可播放视频。",
    cover: "/assets/video/racing-driver-cover.png",
    count: "1 条视频",
    images: [
      {
        title: "赛车情绪短片",
        image: "/assets/video/racing-driver-cover.png",
        note: "AI 视频样张",
        video: "/assets/video/phone-closeup.mp4",
      },
    ],
  },
  {
    title: "策略演示 Deck",
    label: "AI 演示",
    description: "咨询策略、融资路演和科技汇报方向，包含可下载 PPT 源文件。",
    cover: "/assets/ppt/ai-tech-release-cover.png",
    count: "2 个 PPT",
    images: [
      {
        title: "暗色 AI 科技演示",
        image: "/assets/ppt/ai-tech-release-cover.png",
        file: "/assets/ppt/dark-ai-tech.pptx",
        note: "暗色 AI 科技演示样张",
      },
      {
        title: "高端咨询策略演示",
        image: "/assets/ppt/premium-consulting-swiss-cover.png",
        file: "/assets/ppt/premium-consulting-swiss.pptx",
        note: "高端咨询策略演示样张",
      },
    ],
  },
  {
    title: "品牌演示 Deck",
    label: "AI 演示",
    description: "品牌提案、活动介绍和视觉记忆点强化方向，包含可下载 PPT 源文件。",
    cover: "/assets/ppt/brand-memory-cover.png",
    count: "1 个 PPT",
    images: [
      {
        title: "孟菲斯品牌记忆演示",
        image: "/assets/ppt/brand-memory-cover.png",
        file: "/assets/ppt/memphis-brand-pop.pptx",
        note: "品牌活动演示样张",
      },
    ],
  },
  {
    title: "保险产品 PPT",
    label: "Insurance",
    description: "参考真实保险顾问演示与咨询型 pitch deck，生成的产品说明 PPT 样张。",
    cover: "/assets/insurance/insurance-ai-ref-deck.png",
    count: "4 张样张",
    images: [
      {
        title: "AI 生成参考板",
        image: "/assets/insurance/insurance-ai-ref-deck.png",
        note: "基于保险 pitch deck、咨询演示和顾问汇报场景生成的视觉参考。",
      },
      {
        title: "保险 PPT 封面",
        image: "/assets/insurance/insurance-deck-cover.png",
        note: "虚拟品牌样张：安澜保障顾问 / Anlan Advisory。",
      },
      {
        title: "产品结构页",
        image: "/assets/insurance/insurance-deck-structure.png",
        note: "把保障范围、缴费方式和权益说明拆成客户能理解的结构。",
      },
      {
        title: "客户 FAQ 页",
        image: "/assets/insurance/insurance-deck-faq.png",
        note: "把客户常问问题转成顾问可直接讲解的页面。",
      },
    ],
  },
  {
    title: "客户教育海报",
    label: "Insurance Poster",
    description: "参考真实保险社媒广告和客户教育海报，生成的保险科普视觉样张。",
    cover: "/assets/insurance/insurance-ai-ref-posters.png",
    count: "3 张样张",
    images: [
      {
        title: "AI 生成参考板",
        image: "/assets/insurance/insurance-ai-ref-posters.png",
        note: "基于保险客户教育、社媒投放和财务规划广告生成的视觉参考。",
      },
      {
        title: "客户教育海报",
        image: "/assets/insurance/insurance-education-poster.png",
        note: "适合客户教育、朋友圈传播和线下物料延展。",
      },
      {
        title: "朋友圈科普长图",
        image: "/assets/insurance/insurance-social-long.png",
        note: "用长图说明家庭保障顺序，适合社群和朋友圈触达。",
      },
    ],
  },
  {
    title: "保险顾问电子名片",
    label: "Advisor Profile",
    description: "参考真实保险顾问数字名片和个人主页，生成的获客入口样张。",
    cover: "/assets/insurance/insurance-ai-ref-card.png",
    count: "2 张样张",
    images: [
      {
        title: "AI 生成参考板",
        image: "/assets/insurance/insurance-ai-ref-card.png",
        note: "基于保险顾问电子名片、个人主页和联系入口生成的视觉参考。",
      },
      {
        title: "保险顾问电子名片",
        image: "/assets/insurance/insurance-advisor-card.png",
        note: "统一个人介绍、服务范围和微信咨询入口。",
        cardUrl: "/?card=anlan-advisor",
      },
    ],
  },
  {
    title: "山地航拍情绪短片",
    label: "AI 视频",
    description: "云海、山脊与自然光影组成的情绪短片，适合文旅、户外品牌和活动开场。",
    cover: "/assets/video/shangfang-case-wechat-20260702-cover.jpg",
    count: "1 条视频",
    images: [
      {
        title: "山地云海航拍",
        image: "/assets/video/shangfang-case-wechat-20260702-cover.jpg",
        note: "来自本次上传的视频案例，展示自然景观、云雾层次和电影感光影。",
        video: "/assets/video/shangfang-case-wechat-20260702.mp4",
      },
    ],
  },
];

const processSteps: ProcessStep[] = [
  {
    label: "01",
    title: "需求梳理",
    description: "明确目标、受众、参考风格、交付格式和时间节点。",
  },
  {
    label: "02",
    title: "概念方向",
    description: "产出方向板、脚本或页面结构，先确定作品的核心判断。",
  },
  {
    label: "03",
    title: "AI 生成",
    description: "用 AI 快速生成多版素材，筛选最接近商业目标的方向。",
  },
  {
    label: "04",
    title: "精修包装",
    description: "做剪辑、排版、字体、节奏、细节修复和品牌统一。",
  },
  {
    label: "05",
    title: "交付上线",
    description: "交付可直接使用的成片、海报源文件或演示文稿。",
  },
];

function Preloader() {
  const [typed, setTyped] = useState("");
  const [lifting, setLifting] = useState(false);
  const [done, setDone] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const timers: number[] = [];

    BRAND.split("").forEach((_, index) => {
      timers.push(
        window.setTimeout(() => {
          setTyped(BRAND.slice(0, index + 1));
        }, TYPE_START + index * CHAR_INTERVAL),
      );
    });

    timers.push(window.setTimeout(() => setCursorVisible(false), LIFT_AT - 150));
    timers.push(window.setTimeout(() => setLifting(true), LIFT_AT));
    timers.push(window.setTimeout(() => setDone(true), LIFT_AT + 1550));

    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <div
      className={`preloader fixed inset-0 z-[100] flex items-center justify-center bg-studio-teal text-studio-ink ${
        lifting ? "preloader-lift" : ""
      } ${done ? "pointer-events-none preloader-done" : ""}`}
      aria-hidden={done}
    >
      <div className="flex items-center font-display text-[2.45rem] font-semibold leading-none sm:text-[3.25rem]">
        <span>{typed}</span>
        {cursorVisible ? <span className="ml-2 h-[1.05em] w-[3px] rounded-full bg-studio-coral preloader-cursor" /> : null}
      </div>
    </div>
  );
}

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let frame = 0;
    const duration = 2000;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, started]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

function QrMark() {
  const cells = [
    1, 1, 0, 1, 1,
    1, 0, 1, 0, 1,
    0, 1, 0, 1, 0,
    1, 0, 1, 0, 1,
    1, 1, 0, 1, 1,
  ];

  return (
    <div className="grid grid-cols-5 gap-1 p-1.5" aria-hidden="true">
      {cells.map((cell, index) => (
        <span className={`h-2.5 w-2.5 rounded-[3px] ${cell ? "bg-studio-ink" : "bg-white"}`} key={index} />
      ))}
    </div>
  );
}

function AdvisorCardPage() {
  const [toast, setToast] = useState("");

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1900);
  }, []);

  const copyValue = useCallback(
    async (value: string, label: string) => {
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        const input = document.createElement("input");
        input.value = value;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      showToast(`已复制${label}`);
    },
    [showToast],
  );

  const downloadVCard = useCallback(() => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:林知远
ORG:安澜保障顾问 Anlan Advisory
TITLE:保险顾问
TEL;TYPE=CELL:+8613812345678
EMAIL:lin.zhiyuan@anlan.example
URL:${window.location.href}
NOTE:家庭保障 / 养老规划 / 医疗风险咨询
END:VCARD`;
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "林知远_安澜保障顾问.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("vCard 已下载");
  }, [showToast]);

  const shareCard = useCallback(async () => {
    const shareData = {
      title: "林知远 - 安澜保障顾问电子名片",
      text: "林知远｜保险顾问｜家庭保障、养老规划、医疗风险咨询",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        return;
      }
    }

    await copyValue(window.location.href, "名片链接");
  }, [copyValue]);

  return (
    <div className="min-h-screen bg-[#edf3f1] px-4 py-8 font-sans text-slate-800">
      <main className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-sm font-medium text-slate-600">NFC 电子名片 Demo</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-800">保险顾问电子名片</h1>
          <p className="mt-2 text-sm text-slate-500">手机触碰 NFC 卡片后打开的个人名片页样张</p>
        </div>

        <article className="business-card mx-auto max-w-[380px] overflow-hidden rounded-[28px] border border-slate-200 bg-white">
          <div className="h-1.5 bg-gradient-to-r from-emerald-700 to-studio-teal" />
          <section className="px-8 pb-6 pt-8">
            <div className="flex items-start gap-5">
              <div className="relative shrink-0">
                <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-2xl border-4 border-white bg-studio-ink text-4xl font-semibold text-white shadow-lg ring-1 ring-slate-200">
                  林
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 grid h-6 w-6 place-items-center rounded-full bg-white ring-2 ring-white">
                  <div className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500">
                    <Check className="h-2.5 w-2.5 text-white" />
                  </div>
                </div>
              </div>
              <div className="min-w-0 flex-1 pt-1">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-800">林知远</h2>
                <p className="mt-0.5 font-medium text-emerald-700">保险顾问 | 安澜保障顾问</p>
                <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  家庭保障 / 养老规划
                </div>
              </div>
            </div>
          </section>

          <div className="mx-8 h-px bg-slate-100" />

          <section className="space-y-1 px-8 py-6">
            <p className="px-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">联系方式</p>
            <button className="info-row group flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left" onClick={() => copyValue("+86 138 1234 5678", "手机")} type="button">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                <Phone className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-slate-500">手机</span>
                <span className="block font-medium text-slate-700 transition group-hover:text-emerald-700">+86 138 1234 5678</span>
              </span>
              <Copy className="h-4 w-4 text-slate-300 transition group-hover:text-emerald-500" />
            </button>

            <button className="info-row group flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left" onClick={() => copyValue("lin.zhiyuan@anlan.example", "邮箱")} type="button">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                <Mail className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-slate-500">邮箱</span>
                <span className="block truncate text-sm font-medium text-slate-700 transition group-hover:text-emerald-700">lin.zhiyuan@anlan.example</span>
              </span>
              <Copy className="h-4 w-4 text-slate-300 transition group-hover:text-emerald-500" />
            </button>

            <div className="flex gap-3 pt-1">
              <button className="info-row group flex flex-1 items-center gap-3 rounded-2xl px-3 py-3 text-left" onClick={() => copyValue("anlan-lin", "微信")} type="button">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-slate-500">微信</span>
                  <span className="block text-sm font-medium text-slate-700">anlan-lin</span>
                </span>
              </button>
              <button className="info-row group flex flex-1 items-center gap-3 rounded-2xl px-3 py-3 text-left" onClick={() => copyValue("家庭保障 · 养老规划", "服务范围")} type="button">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Globe2 className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-slate-500">服务</span>
                  <span className="block text-sm font-medium text-slate-700">保障规划</span>
                </span>
              </button>
            </div>
          </section>

          <div className="mx-8 h-px bg-slate-100" />

          <section className="bg-slate-50 px-8 py-7">
            <div className="flex items-center gap-5">
              <div className="shrink-0">
                <div className="qr-placeholder h-20 w-20 rounded-2xl border border-slate-200 p-2 shadow-inner">
                  <div className="grid h-full w-full place-items-center rounded-xl bg-white">
                    <QrMark />
                  </div>
                </div>
                <p className="mt-1.5 text-center text-[10px] font-medium text-slate-500">扫码添加微信</p>
              </div>
              <div className="flex-1 space-y-2.5">
                <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800" onClick={downloadVCard} type="button">
                  <UserPlus className="h-4 w-4" />
                  保存到通讯录
                </button>
                <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-white" onClick={shareCard} type="button">
                  <Share2 className="h-4 w-4" />
                  分享名片
                </button>
              </div>
            </div>
          </section>

          <footer className="flex items-center justify-between border-t border-slate-100 bg-white px-8 py-4 text-xs">
            <span className="text-slate-400">安澜保障顾问 · Anlan Advisory</span>
            <a className="flex items-center gap-1 font-medium text-emerald-700" href="/" aria-label="返回尚方 AI Studio">
              <Globe2 className="h-3 w-3" />
              Demo
            </a>
          </footer>
        </article>

        <p className="mx-auto mt-6 max-w-[380px] px-2 text-center text-xs text-slate-400">
          提示：点击联系方式可一键复制，NFC 卡片通常写入这个页面链接。
        </p>
      </main>

      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl bg-slate-800 px-4 py-2 text-xs text-white shadow-lg">
          <Check className="h-3.5 w-3.5 text-emerald-400" />
          {toast}
        </div>
      ) : null}
    </div>
  );
}

function App() {
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem("sf-intro-seen") === "1";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeBoardIndex, setActiveBoardIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [contactCopied, setContactCopied] = useState(false);
  const worksRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const activeBoard = activeBoardIndex === null ? null : galleryBoards[activeBoardIndex];
  const activeImage = activeBoard?.images[activeImageIndex];

  useEffect(() => {
    if (introDone) return;
    const timer = window.setTimeout(() => {
      setIntroDone(true);
      window.sessionStorage.setItem("sf-intro-seen", "1");
    }, LIFT_AT + 650);
    return () => window.clearTimeout(timer);
  }, [introDone]);

  // Hero line stagger reveal after intro
  useEffect(() => {
    if (!introDone) return;
    const lines = Array.from(document.querySelectorAll<HTMLElement>(".hero-line"));
    if (!lines.length) return;
    lines.forEach((line, i) => {
      const stagger = line.getAttribute("data-stagger") || String(i);
      const delay = Number(stagger) * 100;
      window.setTimeout(() => line.classList.add("is-visible"), delay);
    });
  }, [introDone]);

  const openBoard = useCallback((boardIndex: number) => {
    lastFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setActiveBoardIndex(boardIndex);
    setActiveImageIndex(0);
  }, []);

  const closeBoard = useCallback(() => {
    setActiveBoardIndex(null);
    setActiveImageIndex(0);
    window.setTimeout(() => lastFocusedRef.current?.focus(), 0);
  }, []);

  const copyWeChat = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("shangfang-ai");
    } catch {
      const input = document.createElement("input");
      input.value = "shangfang-ai";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setContactCopied(true);
    window.setTimeout(() => setContactCopied(false), 1800);
  }, []);

  const showNextImage = useCallback(() => {
    if (!activeBoard) return;
    setActiveImageIndex((index) => (index + 1) % activeBoard.images.length);
  }, [activeBoard]);

  const showPreviousImage = useCallback(() => {
    if (!activeBoard) return;
    setActiveImageIndex((index) => (index - 1 + activeBoard.images.length) % activeBoard.images.length);
  }, [activeBoard]);

  useEffect(() => {
    if (!activeBoard) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeBoard();
      if (event.key === "ArrowRight") showNextImage();
      if (event.key === "ArrowLeft") showPreviousImage();
      if (event.key === "Tab") {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.setTimeout(() => modalRef.current?.querySelector<HTMLElement>("button, a, video")?.focus(), 0);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeBoard, closeBoard, showNextImage, showPreviousImage]);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal-on-scroll"));
    if (!nodes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -80px", threshold: 0.14 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const navLinks = useMemo(
    () => [
      { label: "服务", href: "#services" },
      { label: "行业", href: "#industries" },
      { label: "作品", href: "#works" },
      { label: "流程", href: "#process" },
      { label: "联系", href: "#contact" },
    ],
    [],
  );

  const isAdvisorCardPage = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("card") === "anlan-advisor";

  if (isAdvisorCardPage) {
    return <AdvisorCardPage />;
  }

  return (
    <div className="site-shell min-h-screen overflow-x-clip bg-studio-paper font-sans text-studio-ink">
      {!introDone ? <Preloader /> : null}

      <header className="site-header fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <GlassSurface
          backgroundOpacity={0.14}
          borderRadius={8}
          brightness={36}
          className="site-nav-glass mx-auto max-w-7xl shadow-soft"
          displace={0.42}
          distortionScale={-150}
          height="auto"
          opacity={0.9}
          saturation={1.08}
          width="100%"
        >
          <nav className="flex w-full items-center justify-between px-4 py-3 text-studio-ink transition-colors duration-300 sm:px-6">
            <a className="font-display text-xl font-semibold" href="#top" onClick={() => setMenuOpen(false)}>
              尚方 AI Studio
            </a>

            <div className="hidden items-center gap-7 md:flex">
              {navLinks.map((link) => (
                <a className="text-sm font-medium transition-colors duration-200 hover:text-studio-coral/90 focus-visible:text-studio-coral focus-visible:underline focus-visible:underline-offset-4" href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <button
                className="shine-link inline-flex h-10 items-center gap-2 rounded-lg border border-studio-coral/35 bg-studio-coral px-4 text-sm font-semibold text-studio-ink transition hover:bg-studio-coral/85 active:bg-studio-coral/90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-studio-coral focus-visible:ring-offset-2 focus-visible:ring-offset-studio-paper"
                onClick={copyWeChat}
                type="button"
              >
                <MessageCircle className="h-4 w-4" />
                {contactCopied ? "已复制微信" : "复制微信"}
              </button>
            </div>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-current/15 md:hidden focus-visible:ring-2 focus-visible:ring-studio-coral focus-visible:ring-offset-2 focus-visible:ring-offset-studio-paper"
              type="button"
              aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>
        </GlassSurface>

        {menuOpen ? (
          <div id="mobile-menu">
          <GlassSurface
            backgroundOpacity={0.18}
            borderRadius={8}
            brightness={34}
            className="mx-auto mt-2 max-w-7xl shadow-soft md:hidden"
            displace={0.36}
            distortionScale={-135}
            height="auto"
            opacity={0.9}
            saturation={1.05}
            width="100%"
          >
            <div className="w-full p-4 text-studio-ink">
              {navLinks.map((link) => (
                <a
                  className="block rounded-lg px-3 py-3 text-xl font-medium transition-colors duration-150 hover:bg-studio-ink/[0.04] focus-visible:bg-studio-ink/[0.04]"
                  href={link.href}
                  key={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
                    </GlassSurface>
        </div>
        ) : null}
      </header>

      <main id="top">
        <section className="hero-section relative min-h-[100dvh] overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <div className="hero-media-field absolute inset-0">
            <video
              className="absolute inset-y-0 right-0 h-full w-full object-cover opacity-[0.8] saturate-[1.08] brightness-[1.05] contrast-[0.96] sm:opacity-[0.84] lg:w-[72%] lg:opacity-[0.9]"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/assets/hero-computer-poster.jpg"
              aria-hidden="true"
              src="/assets/hero-computer.mp4"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_34%,rgba(154,167,188,0.14),transparent_34%),linear-gradient(90deg,rgba(248,231,227,0.9)_0%,rgba(245,223,220,0.66)_34%,rgba(245,223,220,0.22)_72%,rgba(245,223,220,0.04)_100%)]" />
            <div className="absolute inset-y-0 right-0 hidden w-[72%] bg-[linear-gradient(90deg,rgba(245,223,220,0.48)_0%,rgba(245,223,220,0.14)_34%,rgba(245,223,220,0)_76%)] lg:block" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(116,69,57,0.08)_100%)]" />
            <div className="hero-color-bridge absolute right-0 top-0 hidden h-[20rem] w-[32rem] lg:block" />
            <div className="hero-bottom-feather absolute inset-x-0 bottom-0 h-[36rem]" />
          </div>

          <div
            className={`relative z-10 flex min-h-[calc(100vh-7rem)] items-center transition-all duration-[900ms] ease-custom ${
              introDone ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="max-w-[660px]">
              <div className="hero-line mb-4 inline-flex items-center gap-1.5 rounded-lg border border-studio-coral/25 bg-studio-coral/8 px-2.5 py-1.5 text-xs font-semibold text-studio-coral" data-stagger="0">
                <Sparkles className="h-4 w-4" />
                AI 视觉内容厂牌
              </div>
              <h1 className="hero-line max-w-[720px] font-display text-4xl font-semibold leading-[1.06] tracking-[-0.02em] sm:text-5xl md:text-[3.7rem] lg:text-[4.35rem] xl:text-[4.7rem]" data-stagger="1">
                <span className="block">把 AI 生成变成</span>
                <RotatingText
                  className="mt-2 text-studio-coral"
                  texts={["可投放视觉", "可提案作品", "可交付资产", "品牌内容"]}
                />
              </h1>
              <p className="hero-line mt-6 max-w-xl text-base leading-8 text-studio-muted sm:text-lg" data-stagger="2">
                为品牌、活动和销售团队制作 AI 视频、海报与演示资产，从方向判断到精修交付。
              </p>
              <div className="hero-line mt-9 flex flex-col gap-3 sm:flex-row" data-stagger="3">
                <button
                  className="shine-link inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-studio-coral px-7 text-base font-semibold text-studio-ink transition hover:bg-studio-coral/90"
                  onClick={copyWeChat}
                  type="button"
                >
                  <MessageCircle className="h-5 w-5" />
                  {contactCopied ? "已复制微信" : "复制微信"}
                </button>
                <a
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-studio-ink/14 bg-white/35 px-7 text-base font-semibold text-studio-ink transition hover:border-studio-coral/45 hover:bg-white/55"
                  href="#works"
                >
                  <MonitorPlay className="h-5 w-5" />
                  查看策展墙
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="continuity-band relative z-20 -mt-36 px-4 pb-10 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-3 text-sm text-studio-muted sm:grid-cols-3">
            {["最快 72h 首版", "视频 / 海报 / PPT", "微信沟通需求"].map((item, index) => (
              <div
                className="trust-pill flex items-center justify-center rounded-lg border border-studio-ink/8 bg-studio-surface/50 px-4 py-3 text-studio-ink/85 transition-colors duration-200 hover:bg-studio-surface/70"
                key={item}
                style={{ "--pill-delay": `${LIFT_AT + 1500 + index * 120}ms` } as CSSProperties}
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="section-wash relative px-4 pb-12 pt-16 sm:px-6 lg:px-8" id="services">
          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-[760px]">
              <p className="text-xs font-medium tracking-[0.06em] text-studio-muted">服务项目 / Services</p>
              <h2 className="mt-4 font-display text-[2rem] font-semibold leading-[1.36] sm:text-[2.35rem] lg:text-[2.5rem]">
                <span className="block">三条核心产线，</span>
                <span className="block">覆盖从概念到交付的 AI 内容制作</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-studio-muted">
                适合品牌方、创业团队、活动运营和个人 IP，用更短周期拿到高完成度视觉方案。
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article
                    className="reveal-on-scroll service-card group rounded-lg border border-studio-ink/10 bg-studio-surface/70 p-6 shadow-soft"
                    key={service.title}
                    style={{ "--reveal-delay": `${index * 110}ms` } as CSSProperties}
                  >
                    <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-studio-coral/12 p-2.5 text-studio-coral">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-[0.65rem] font-semibold tracking-[0.10em] uppercase text-studio-coral/80">{service.eyebrow}</p>
                    <h3 className="mt-2 text-xl font-semibold">{service.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-studio-muted">{service.description}</p>
                    <div className="mt-6 space-y-3">
                      {service.points.map((point) => (
                        <div className="flex items-center gap-2 text-sm font-medium" key={point}>
                          <CheckCircle2 className="h-4 w-4 text-studio-coral" />
                          {point}
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-wash relative overflow-hidden px-4 py-14 sm:px-6 lg:px-8" id="industries">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(200,117,96,0.12),transparent_26%),radial-gradient(circle_at_86%_66%,rgba(154,167,188,0.12),transparent_28%)]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-[760px]">
              <p className="text-xs font-medium tracking-[0.06em] text-studio-muted">对口行业 / Industries</p>
              <h2 className="mt-4 font-display text-[2rem] font-semibold leading-[1.36] sm:text-[2.35rem] lg:text-[2.5rem]">
                <span className="block">把 AI 内容制作，</span>
                <span className="block">落到真实业务场景里。</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-studio-muted">
                不同客户要解决的问题不同，我们会按行业场景组织脚本、画面、版式和交付格式。
              </p>
            </div>

            <div className="industry-grid mt-12">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <article
                    className={`industry-card industry-card-${industry.accent} reveal-on-scroll`}
                    key={industry.title}
                    style={{ "--reveal-delay": `${index * 95}ms` } as CSSProperties}
                  >
                    <div className="industry-card-glow" />
                    <div className="relative flex h-full flex-col justify-between">
                      <div>
                        <div className="mb-7 flex items-center justify-between gap-4">
                          <div className="industry-icon !bg-studio-coral/10 !text-studio-coral">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium text-studio-muted">{industry.label}</span>
                        </div>
                        <h3 className="font-display text-[1.85rem] font-semibold leading-tight">{industry.title}</h3>
                        <p className="mt-4 max-w-[38rem] text-sm leading-7 text-studio-muted">{industry.description}</p>
                      </div>

                      <div className="mt-9 flex flex-wrap gap-2">
                        {industry.deliverables.map((item) => (
                          <span className="industry-chip" key={item}>
                            {item}
                          </span>
                        ))}
                      </div>

                      {industry.cases ? (
                        <div className="industry-case-strip mt-7">
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-studio-ink">保险业务案例</p>
                            <button
                              className="text-sm font-semibold text-studio-coral transition hover:text-studio-ink"
                              onClick={() => openBoard(industry.cases![0].boardIndex)}
                              type="button"
                            >
                              查看案例
                            </button>
                          </div>
                          <div className="grid gap-2 sm:grid-cols-3">
                            {industry.cases.map((item) => (
                              <button
                                className="industry-case-card"
                                key={item.title}
                                onClick={() => openBoard(item.boardIndex)}
                                type="button"
                              >
                                <span className="industry-case-image">
                                  <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                                </span>
                                <span className="mt-3 block text-left text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-studio-coral">
                                  {item.label}
                                </span>
                                <span className="mt-1 block text-left text-sm font-semibold text-studio-ink">{item.title}</span>
                                <span className="mt-1 block text-left text-xs leading-5 text-studio-muted">{item.description}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <div className="section-wash method-wash relative px-4 py-6 sm:px-6 lg:px-8">
          <section className="method-panel relative mx-auto max-w-7xl overflow-hidden py-10 text-studio-ink">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(200,117,96,0.12),transparent_32%),radial-gradient(circle_at_88%_70%,rgba(154,167,188,0.12),transparent_26%)]" />
            <div className="relative grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-end">
              <div>
                <p className="text-xs font-medium tracking-[0.06em] text-studio-muted">制作方法 / Method</p>
                <h2 className="mt-4 max-w-[760px] font-display text-[2rem] font-semibold leading-[1.36] sm:text-[2.35rem] lg:text-[2.5rem]">
                  <span className="block">用制作思维，</span>
                  <span className="block">把粗糙想法变成可交付的 AI 视觉作品。</span>
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-studio-muted">
                  不是只“生成几张图”，而是从目标、叙事、视觉系统到最终交付，帮你把 AI 内容做成真正可用的商业素材。
                </p>
              </div>
              <div className="grid gap-0 overflow-hidden rounded-lg border border-studio-ink/10 bg-studio-surface/70 sm:grid-cols-3">
                <div className="metric-card reveal-on-scroll border-b border-studio-ink/10 p-5 sm:border-b-0 sm:border-r">
                  <p className="font-display text-[2.5rem] font-semibold text-studio-coral/85"><CountUp end={30} suffix="+" /></p>
                  <p className="mt-2 text-sm text-studio-muted">概念方向</p>
                </div>
                <div className="metric-card reveal-on-scroll border-b border-studio-ink/10 p-5 sm:border-b-0 sm:border-r" style={{ "--reveal-delay": "110ms" } as CSSProperties}>
                  <p className="font-display text-[2.5rem] font-semibold text-studio-coral/85"><CountUp end={72} suffix="h" /></p>
                  <p className="mt-2 text-sm text-studio-muted">首版交付</p>
                </div>
                <div className="metric-card reveal-on-scroll p-5" style={{ "--reveal-delay": "220ms" } as CSSProperties}>
                  <p className="font-display text-[2.5rem] font-semibold text-studio-coral/85"><CountUp end={3} /></p>
                  <p className="mt-2 text-sm text-studio-muted">核心服务</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="section-wash relative z-20 overflow-hidden px-4 py-20 text-studio-ink sm:px-6 lg:px-8" id="works" ref={worksRef}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(215,138,104,0.13),transparent_28%),linear-gradient(180deg,rgba(244,239,230,0.025),transparent_46%)]" />
          <div className="relative mx-auto max-w-7xl">
            <div className="mb-12 max-w-[720px]">
              <p className="text-xs font-medium tracking-[0.06em] text-studio-muted">作品策展 / Works</p>
              <h2 className="mt-4 font-display text-[2rem] font-semibold leading-[1.36] sm:text-[2.35rem] lg:text-[2.5rem]">
                <span className="block">按真实委托场景，</span>
                <span className="block">查看可交付的视觉资产</span>
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-studio-muted">
                每个入口都对应一种业务用途：产品发布、活动传播、路演提案、保险顾问获客。点击即可查看完整样张。
              </p>
            </div>

            <div className="work-board-grid reveal-on-scroll md:grid-cols-2 lg:grid-cols-3">
              {galleryBoards.map((board, index) => (
                <button
                  className={`curation-card ${index === 0 ? "curation-card-feature" : ""}`}
                  key={board.title}
                  onClick={() => openBoard(index)}
                  type="button"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-studio-teal">
                    <img src={board.cover} alt={board.title} loading="lazy" decoding="async" />
                  </div>
                  <div className="curation-meta p-5">
                    <div className="mb-4 flex items-center justify-between gap-3 text-sm text-studio-muted">
                      <span>{board.label}</span>
                      <span>{board.count}</span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.01em] text-studio-ink">{board.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-studio-muted">{board.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-studio-coral">
                      查看样张
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wash px-4 py-14 sm:px-6 lg:px-8" id="process">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-xs font-medium tracking-[0.06em] text-studio-muted">合作流程 / Process</p>
              <h2 className="mt-4 font-display text-[2rem] font-semibold leading-[1.36] sm:text-[2.35rem] lg:text-[2.5rem]">
                从一句需求到一套可交付内容
              </h2>
            </div>

            <div className="process-track reveal-on-scroll mt-12 grid gap-4 lg:grid-cols-5">
              {processSteps.map((step, index) => (
                <article
                  className="process-step reveal-on-scroll group rounded-lg border border-studio-ink/10 bg-studio-surface/70 p-5 shadow-soft transition-colors duration-200 hover:bg-studio-surface"
                  key={step.label}
                  style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
                >
                  <p className="process-number font-display text-3xl font-bold text-studio-coral/60">{step.label}</p>
                  <h3 className="mt-8 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-studio-muted">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wash px-4 pb-10 sm:px-6 lg:px-8" id="contact">
          <div className="contact-card reveal-on-scroll mx-auto max-w-7xl overflow-hidden rounded-lg bg-studio-surface shadow-lift">
            <div className="grid gap-0 lg:grid-cols-[1fr_380px]">
              <div className="p-6 sm:p-10 lg:p-14">
                <p className="text-xs font-medium tracking-[0.06em] text-studio-muted">联系咨询 / Contact</p>
                <h2 className="mt-4 max-w-[820px] font-display text-[2rem] font-semibold leading-[1.36] sm:text-[2.35rem] lg:text-[2.65rem]">
                  <span className="block">告诉我们你想做什么，</span>
                  <span className="block">我们先帮你判断制作方向。</span>
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-studio-muted sm:text-lg">
                  加微信发来项目目标、参考风格、交付时间和预算范围。我们会先判断适合的视频、海报或演示方案。
                </p>
                <div className="mt-9 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-studio-paper p-4 transition-colors duration-200 hover:bg-studio-surface/60">
                    <WandSparkles className="h-5 w-5 text-studio-coral" />
                    <p className="mt-3 text-sm font-semibold">服务范围</p>
                    <p className="mt-1 text-sm text-studio-muted">AI 视频 / 海报 / PPT</p>
                  </div>
                  <div className="rounded-lg bg-studio-paper p-4 transition-colors duration-200 hover:bg-studio-surface/60">
                    <Clock3 className="h-5 w-5 text-studio-coral" />
                    <p className="mt-3 text-sm font-semibold">交付周期</p>
                    <p className="mt-1 text-sm text-studio-muted">最快 72h 首版</p>
                  </div>
                  <div className="rounded-lg bg-studio-paper p-4 transition-colors duration-200 hover:bg-studio-surface/60">
                    <Layers3 className="h-5 w-5 text-studio-coral" />
                    <p className="mt-3 text-sm font-semibold">适合客户</p>
                    <p className="mt-1 text-sm text-studio-muted">品牌 / 创业 / 活动</p>
                  </div>
                </div>
                <button
                  className="shine-link contact-btn-press mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-studio-coral px-7 text-base font-semibold text-studio-ink transition hover:bg-studio-coral/90"
                  onClick={copyWeChat}
                  type="button"
                >
                  <Send className="h-5 w-5" />
                  {contactCopied ? "已复制微信" : "复制微信"}
                </button>
              </div>
              <aside className="flex flex-col justify-center bg-studio-teal p-8 text-studio-ink">
                <div className="rounded-lg border border-studio-ink/10 bg-white/35 p-4">
                    <img src="/assets/qr-placeholder.svg" alt="微信二维码占位图" loading="lazy" decoding="async" />
                </div>
                <p className="mt-5 text-sm leading-6 text-studio-muted">
                  扫码添加微信，发送项目目标、参考链接和期望交付时间，我们会先给你一个制作方向。
                </p>
              </aside>
            </div>
          </div>
        </section>

        {activeBoard && activeImage ? (
          <div className="gallery-modal fixed inset-0 z-[90] bg-[#ead0ca]/78 px-3 py-4 sm:px-6" role="dialog" aria-modal="true" aria-label={`${activeBoard.title}图片浏览`} ref={modalRef}>
            <button className="absolute inset-0 h-full w-full cursor-default" aria-label="关闭图片浏览" onClick={closeBoard} type="button" />
            <div className="relative mx-auto flex h-full max-w-7xl flex-col rounded-lg border border-studio-ink/12 bg-studio-surface/88 p-3 text-studio-ink shadow-lift sm:p-5">
              <div className="gallery-modal-chrome mb-3 flex items-center justify-between gap-3 rounded-lg px-3 py-2">
                <div>
                  <p className="text-xs text-studio-muted">{activeBoard.label}</p>
                  <h3 className="text-lg font-semibold">{activeImage.title}</h3>
                  {activeImage.note ? <p className="mt-1 text-xs text-studio-muted">{activeImage.note}</p> : null}
                </div>
                <div className="flex items-center gap-2">
                  {activeImage.video ? (
                    <a
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-studio-coral px-3 text-sm font-semibold text-studio-ink transition hover:bg-studio-coral/85 active:bg-studio-coral/90 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-studio-coral focus-visible:ring-offset-2 focus-visible:ring-offset-studio-paper"
                      href={activeImage.video}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MonitorPlay className="h-4 w-4" />
                      打开视频
                    </a>
                  ) : null}
                  {activeImage.file ? (
                    <a
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-white/55 px-3 text-sm font-semibold text-studio-ink transition hover:bg-white/70 active:bg-white/80 focus-visible:ring-2 focus-visible:ring-studio-coral focus-visible:ring-offset-2 focus-visible:ring-offset-studio-paper"
                      download
                      href={activeImage.file}
                    >
                      <Download className="h-4 w-4" />
                      下载 PPT
                    </a>
                  ) : null}
                  {activeImage.cardUrl ? (
                    <a
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-white/55 px-3 text-sm font-semibold text-studio-ink transition hover:bg-white/70 active:bg-white/80 focus-visible:ring-2 focus-visible:ring-studio-coral focus-visible:ring-offset-2 focus-visible:ring-offset-studio-paper"
                      href={activeImage.cardUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      打开名片 Demo
                    </a>
                  ) : null}
                  <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/55 text-studio-ink transition hover:bg-white/70 active:bg-white/80 focus-visible:ring-2 focus-visible:ring-studio-coral focus-visible:ring-offset-2 focus-visible:ring-offset-studio-paper" aria-label="关闭" onClick={closeBoard} type="button">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg bg-studio-teal/45">
                {activeImage.video ? (
                  <video
                    className="h-full w-full object-contain"
                    controls
                    playsInline
                    preload="metadata"
                    poster={activeImage.image}
                    src={activeImage.video}
                  />
                ) : (
                  <img className="h-full w-full object-contain" src={activeImage.image} alt={activeImage.title} decoding="async" />
                )}
                <button className="gallery-nav-button left-3" aria-label="上一张" onClick={showPreviousImage} type="button">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button className="gallery-nav-button right-3" aria-label="下一张" onClick={showNextImage} type="button">
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              <div className="gallery-modal-chrome mt-3 flex gap-2 overflow-x-auto rounded-lg p-2">
                {activeBoard.images.map((image, index) => (
                  <button
                    className={`gallery-thumb ${index === activeImageIndex ? "gallery-thumb-active" : ""}`}
                    key={image.image}
                    onClick={() => setActiveImageIndex(index)}
                    type="button"
                    aria-label={`查看${image.title}`}
                  >
                    <img className="h-full w-full object-cover" src={image.image} alt="" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </main>
      {contactCopied ? (
        <div className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-lg border border-studio-coral/30 bg-studio-teal/90 px-5 py-3 text-sm font-semibold text-studio-ink shadow-lift backdrop-blur-sm">
          已复制微信号：shangfang-ai
        </div>
      ) : null}
    </div>
  );
}

export default App;
