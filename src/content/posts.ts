import type { ImageAsset } from "@/domain/design/media";
import { IMAGES } from "./images";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  source: string;
  cover: ImageAsset;
};

export const POSTS: readonly Post[] = [
  {
    slug: "usos-de-la-inteligencia-artificial-en-entretenimiento-salud-investigacion-y-transporte",
    title: "Usos de la inteligencia artificial en: entretenimiento, salud, investigación y transporte",
    excerpt: "La inteligencia artificial está cambiando la forma en que vivimos, consumimos contenido y entendemos el mundo. En este artículo exploramos cómo esta tecnología está transformando industrias clave como el entretenimiento y la salud, desde recomendaciones personalizadas hasta avances médicos que salvan vidas. También reflexionamos sobre cómo la IA influye en nuestras decisiones diarias, mostrando tanto sus beneficios como sus posibles riesgos. Una mirada clara y cercana a una tecnología que ya fo",
    category: "Inteligencia artificial",
    author: "Kteishe V. Patiño",
    date: "2026-04-06",
    source: "https://www.babaluum.com/post/usos-de-la-inteligencia-artificial-en-entretenimiento-salud-investigación-y-transporte",
    cover: IMAGES.desk,
  },
  {
    slug: "la-memoria-que-se-viste-la-herencia-indigena-detras-de-la-moda-latinoamericana",
    title: "La Memoria que se Viste: La Herencia Indígena Detrás de la Moda Latinoamericana",
    excerpt: "Cada prenda guarda una historia. En América Latina, la moda indígena ha sido memoria, territorio y resistencia mucho antes de que existiera el concepto de sostenibilidad. Este artículo recorre las raíces textiles de la región y cuestiona cómo la moda contemporánea puede aprender de una herencia que aún se teje.",
    category: "Sostenibilidad",
    author: "Julia Flores",
    date: "2026-04-06",
    source: "https://www.babaluum.com/post/la-memoria-que-se-viste-la-herencia-indígena-detrás-de-la-moda-latinoamericana",
    cover: IMAGES.windows,
  },
  {
    slug: "la-guia-del-perdon-como-sanar-lo-que-aun-duele",
    title: "La Guía del Perdón: Como Sanar lo que aún Duele",
    excerpt: "Si te cuesta soltar, perdonarte o dejar atrás lo que te hirió, esta guía es para ti. Sin fórmulas mágicas ni juicios, encontrarás pequeños pasos para entender tus emociones, sanar con cariño y avanzar a tu propio ritmo.",
    category: "Desarrollo personal",
    author: "Juan David Hernández",
    date: "2026-04-06",
    source: "https://www.babaluum.com/post/la-guía-del-perdón-como-sanar-lo-que-aún-duele",
    cover: IMAGES.pencils,
  },
  {
    slug: "el-arte-de-ayudar-sin-perderte-detras-del-cansancio-emocional",
    title: "El arte de ayudar sin perderte: Detrás del Cansancio Emocional",
    excerpt: "Hay personas que parecen tener una fuerza inagotable para sostener a los demás. Siempre están ahí, escuchan, acompañan y consuelan, pero muy pocas veces se detienen a mirar cuánto están sacrificando de sí mismos en ese intento constante por apoyar. En este artículo te hablaré de ese cansancio que no siempre se nota, pero pesa. De cómo, sin darnos cuenta, podemos perdernos en el deseo de estar para los demás y nos olvidamos de lo más importante, de nosotros mismos; de lo que pasa cuando al...",
    category: "Desarrollo personal",
    author: "Juan David Hernández",
    date: "2025-12-08",
    source: "https://www.babaluum.com/post/el-arte-de-ayudar-sin-perderte-detrás-del-cansancio-emocional",
    cover: IMAGES.posters,
  },
  {
    slug: "el-kit-anti-burnout-para-estudiantes",
    title: "El Kit Anti-burnout para Estudiantes",
    excerpt: "¿Agotada/o por el ritmo universitario? Este artículo te presenta 12 herramientas de IA para organizarte mejor, concentrarte sin estrés y evitar el burnout académico. Un kit práctico para estudiar con menos ansiedad y más equilibrio.",
    category: "Inteligencia artificial",
    author: "Kteishe V. Patiño",
    date: "2025-12-08",
    source: "https://www.babaluum.com/post/el-kit-anti-burnout-para-estudiantes",
    cover: IMAGES.wall,
  },
  {
    slug: "la-historia-no-contada-de-la-moda-sostenible",
    title: "La Historia No Contada de la Moda Sostenible",
    excerpt: "La moda sostenible no empezó en Instagram: empezó mucho antes, en manos que tejían para durar. Descubre cómo su historia revela fallas, aprendizajes y un futuro que podría transformar la industria para siempre.",
    category: "Sostenibilidad",
    author: "Julia Flores",
    date: "2025-12-08",
    source: "https://www.babaluum.com/post/la-historia-no-contada-de-la-moda-sostenible",
    cover: IMAGES.prototype,
  },
  {
    slug: "ia-innovacion-y-aprendizaje-como-sacarle-provecho",
    title: "+25 Herramientas de IA Transformando la Educación",
    excerpt: "La IA puede transformar la educación si sabemos usarla como aliada. Este artículo explora cómo potenciar el aprendizaje con herramientas inteligentes, personalización, accesibilidad y nuevas metodologías que preparan a los estudiantes para un futuro real, no para un sistema que se quedó atrás.",
    category: "Inteligencia artificial",
    author: "Kteishe V. Patiño",
    date: "2025-12-03",
    source: "https://www.babaluum.com/post/ia-innovación-y-aprendizaje-cómo-sacarle-provecho",
    cover: IMAGES.gallery,
  },
  {
    slug: "moda-sostenible-cuando-la-conciencia-se-volvio-solo-una-tendencia",
    title: "Moda Sostenible: Cuando la Conciencia se Volvió Solo una Tendencia",
    excerpt: "La moda sostenible pasó de ser un movimiento consciente a convertirse en una tendencia más. Este artículo revela cómo el greenwashing, el consumo impulsivo y la necesidad de “verse sostenible” distorsionaron su propósito original. Una reflexión directa sobre cómo recuperar la intención real detrás de lo que vestimos y dejar de consumir sostenibilidad como si fuera otra moda pasajera.",
    category: "Sostenibilidad",
    author: "Julia Flores",
    date: "2025-12-03",
    source: "https://www.babaluum.com/post/moda-sostenible-cuando-la-conciencia-se-volvió-solo-una-tendencia",
    cover: IMAGES.illustration,
  },
  {
    slug: "paciencia-y-validacion-los-desafios-invisibles-del-crecimiento-interior",
    title: "Paciencia y validación: los desafíos invisibles del crecimiento interior",
    excerpt: "Vivimos en una era donde todo tiene que verse, medirse y compartirse. Pero ¿qué pasa con esos logros que no se publican? Con esas batallas que nadie ve, pero nos transforman por dentro. Este artículo te recuerda que no estás estancado: estás creciendo, solo que a tu propio ritmo.",
    category: "Desarrollo personal",
    author: "Juan David Hernández",
    date: "2025-11-09",
    source: "https://www.babaluum.com/post/paciencia-y-validación-los-desafíos-invisibles-del-crecimiento-interior",
    cover: IMAGES.plants,
  },
  {
    slug: "el-mindfulness-el-arte-de-vivir-el-ahora",
    title: "El Mindfulness: El Arte de Vivir el Ahora",
    excerpt: "Vivir con la mente en otro lugar nos roba la calma y la alegría del presente. Este artículo explora cómo el mindfulness puede ayudarnos a pausar, observar y reconectar con nuestro día a día, reduciendo ansiedad y estrés. Pequeños hábitos conscientes, como respirar y detenernos unos segundos, pueden transformar nuestra relación con los pensamientos y devolvernos la tranquilidad que tanto necesitamos.",
    category: "Desarrollo personal",
    author: "Juan David Hernández",
    date: "2025-11-04",
    source: "https://www.babaluum.com/post/el-mindfulness-el-arte-de-vivir-el-ahora",
    cover: IMAGES.shelf,
  },
  {
    slug: "pensar-antes-de-vestir-el-cambio-que-necesita-la-moda-en-costa-rica",
    title: "Pensar Antes de Vestir: El Cambio que Necesita la Moda en Costa Rica",
    excerpt: "Tu ropa dice mucho más que tu estilo: refleja decisiones que afectan al planeta. Este artículo revela cómo la moda sostenible en Costa Rica combina ética, creatividad y responsabilidad, y cómo pequeñas elecciones pueden transformar tu closet y apoyar al talento local.",
    category: "Sostenibilidad",
    author: "Julia Flores",
    date: "2025-11-04",
    source: "https://www.babaluum.com/post/pensar-antes-de-vestir-el-cambio-que-necesita-la-moda-en-costa-rica",
    cover: IMAGES.sketchbook,
  },
  {
    slug: "inteligencia-artificial-el-gran-tema-controversial-del-siglo-xxi-amiga-o-enemiga",
    title: "Inteligencia Artificial, El Gran Tema Controversial del Siglo XXI, ¿Amiga o Enemiga?",
    excerpt: "La inteligencia artificial divide opiniones: para algunos es una amenaza, para otros una oportunidad. Este artículo explora su historia, tipos, aplicaciones y límites, aclarando mitos de ciencia ficción y mostrando por qué, a pesar de su poder, la IA nunca podrá reemplazar la esencia humana.",
    category: "Inteligencia artificial",
    author: "Kteishe V. Patiño",
    date: "2025-10-19",
    source: "https://www.babaluum.com/post/inteligencia-artificial-el-gran-tema-controversial-del-siglo-xxi-amiga-o-enemiga",
    cover: IMAGES.setup,
  },
];

export const findPost = (slug: string): Post | undefined => POSTS.find((item) => item.slug === slug);

export const formatPostDate = (iso: string): string =>
  new Intl.DateTimeFormat("es-CR", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${iso}T12:00:00`));

export const POST_SLIDES = POSTS.map((item) => ({ href: `/blog/${item.slug}`, title: item.title, summary: item.excerpt, cover: item.cover }));
