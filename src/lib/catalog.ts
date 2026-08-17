import catCards from "@/assets/cat-cards.jpg";
import catTrick from "@/assets/cat-trick.jpg";
import catMicro from "@/assets/cat-micro.jpg";
import catStage from "@/assets/cat-stage.jpg";
import catGimmick from "@/assets/cat-gimmick.jpg";
import catAcc from "@/assets/cat-acc.jpg";
import catSouvenir from "@/assets/cat-souvenir.jpg";
import catCostume from "@/assets/cat-costume.jpg";

export type CategorySlug =
  | "cards"
  | "trick-cards"
  | "micromagic"
  | "stage"
  | "gimmicks"
  | "accessories"
  | "souvenirs"
  | "costumes";

export type Category = {
  slug: CategorySlug;
  title: string;
  description: string;
  image: string;
};

export type Product = {
  id: string;
  title: string;
  category: CategorySlug;
  price: number;
  oldPrice?: number;
  image: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  popularity: number;
  isNew: boolean;
  short: string;
  description: string;
  specs: { label: string; value: string }[];
};

export const categories: Category[] = [
  {
    slug: "cards",
    title: "Игральные карты",
    description: "Коллекционные и рабочие колоды для картовой магии и кардистри.",
    image: catCards,
  },
  {
    slug: "trick-cards",
    title: "Трюковые карты",
    description: "Готовые колоды и наборы с секретом для быстрых эффектов.",
    image: catTrick,
  },
  {
    slug: "micromagic",
    title: "Микромагия",
    description: "Монеты, губки, кольца и реквизит для работы вблизи.",
    image: catMicro,
  },
  {
    slug: "stage",
    title: "Сценический инвентарь",
    description: "Реквизит для выступлений на сцене и больших площадках.",
    image: catStage,
  },
  {
    slug: "gimmicks",
    title: "Гиммики",
    description: "Механизмы и скрытые устройства для сильных эффектов.",
    image: catGimmick,
  },
  {
    slug: "accessories",
    title: "Аксессуары",
    description: "Кейсы, зажимы, коврики и всё для ухода за реквизитом.",
    image: catAcc,
  },
  {
    slug: "souvenirs",
    title: "Сувениры",
    description: "Подарочные наборы и коллекционные мелочи для фокусников.",
    image: catSouvenir,
  },
  {
    slug: "costumes",
    title: "Костюмы",
    description: "Одежда и образ артиста: фраки, перчатки, детали стиля.",
    image: catCostume,
  },
];

export const categoryTitle = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)?.title ?? slug;

const NAMES: Record<CategorySlug, string[]> = {
  cards: [
    "Колода Classic Black",
    "Колода Gold Edition",
    "Колода Amethyst Deck",
    "Колода Marked Pro",
    "Колода Cardistry Flow",
    "Колода Vintage Series",
  ],
  "trick-cards": [
    "Трюковая колода Invisible",
    "Набор Svengali",
    "Колода Stripper Deck",
    "Набор Mental Cards",
    "Трюковая колода Rising Card",
    "Набор Card Prediction",
  ],
  micromagic: [
    "Набор монет Morgan Set",
    "Губчатые шары Classic",
    "Кольца Linking Rings Mini",
    "Набор Coin Magic Starter",
    "Магнитное кольцо PK",
    "Набор Close-up Kit",
  ],
  stage: [
    "Появляющаяся трость",
    "Цилиндр фокусника",
    "Шёлковые платки Stage Silk",
    "Появляющийся букет",
    "Ящик иллюзиониста",
    "Набор Stage Starter",
  ],
  gimmicks: [
    "Гиммик Invisible Thread",
    "Устройство Flash Paper Kit",
    "Гиммик Card Vanish",
    "Механизм Levitation Pro",
    "Гиммик Smoke Device",
    "Гиммик Coin Bender",
  ],
  accessories: [
    "Кейс для колод",
    "Коврик Close-up Pad",
    "Зажим Card Clip",
    "Card Guard Metal",
    "Сумка фокусника",
    "Держатель реквизита",
  ],
  souvenirs: [
    "Брелок Ace of Hearts",
    "Значок Magic Pin",
    "Подарочный набор Magic Box",
    "Постер Magic Poster",
    "Кружка Magician",
    "Открытка Magic Card",
  ],
  costumes: [
    "Фрак фокусника",
    "Белые перчатки артиста",
    "Бабочка Silk Bow",
    "Жилет Stage Vest",
    "Плащ иллюзиониста",
    "Шляпа-цилиндр Premium",
  ],
};

const IMAGES: Record<CategorySlug, string> = {
  cards: catCards,
  "trick-cards": catTrick,
  micromagic: catMicro,
  stage: catStage,
  gimmicks: catGimmick,
  accessories: catAcc,
  souvenirs: catSouvenir,
  costumes: catCostume,
};

const BASE_PRICE: Record<CategorySlug, number> = {
  cards: 5900,
  "trick-cards": 8900,
  micromagic: 11900,
  stage: 24900,
  gimmicks: 15900,
  accessories: 6900,
  souvenirs: 3900,
  costumes: 39900,
};

function buildProducts(): Product[] {
  const list: Product[] = [];
  categories.forEach((cat, ci) => {
    NAMES[cat.slug].forEach((name, i) => {
      const seed = ci * 7 + i * 3;
      const price = BASE_PRICE[cat.slug] + i * 1700 + (seed % 5) * 400;
      list.push({
        id: `${cat.slug}-${i + 1}`,
        title: name,
        category: cat.slug,
        price,
        ...(seed % 4 === 0 ? { oldPrice: price + 3500 } : {}),
        image: IMAGES[cat.slug],
        inStock: seed % 9 !== 0,
        rating: Number((4.2 + ((seed % 8) / 10) * 0.9).toFixed(1)),
        reviewsCount: 0,
        popularity: 100 - ((seed * 13) % 100),
        isNew: i < 2 && ci % 2 === 0,
        short: `Демонстрационная карточка товара категории «${cat.title}». Точное описание уточняйте у менеджера DoMagic.`,
        description:
          "Это демонстрационные данные каталога. Реальное описание, комплектация и уровень сложности будут загружены из каталога DoMagic после подключения бэкенда. Для подбора подходящего реквизита свяжитесь с нашим специалистом — он поможет выбрать товар под ваш уровень и формат выступлений.",
        specs: [
          { label: "Категория", value: cat.title },
          { label: "Уровень", value: "уточняется" },
          { label: "Производитель", value: "уточняется" },
          { label: "Комплектация", value: "уточняется" },
          { label: "Гарантия", value: "уточняется" },
        ],
      });
    });
  });
  return list;
}

export const products: Product[] = buildProducts();

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("ru-KZ", { maximumFractionDigits: 0 }).format(value) + " ₸";

export const popularProducts = [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 10);
