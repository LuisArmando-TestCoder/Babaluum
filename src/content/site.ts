export type NavLink = { label: string; href: string };

export const SITE = {
  name: "Babaluum",
  tagline: "Aprende, Transforma y Comparte",
  description:
    "El hub para crear contenido y un impacto social real. Conectamos a estudiantes, profesionales y organizaciones en inteligencia artificial, conciencia ambiental y desarrollo profesional.",
  url: "https://babaluum.com",
  email: "hola@babaluum.com",
  phone: "+506 4000 0000",
  address: "San José, Costa Rica",
  blurb: "Contenido, comunidad e iniciativas para aprender, transformar y compartir.",
  copyright: "Copyright © 2025 Babaluum Studio. Todos los derechos reservados.",
} as const;

export const PRIMARY_NAV: readonly NavLink[] = [
  { label: "Descubre", href: "/nosotros" },
  { label: "Programas", href: "/programas" },
  { label: "¿Cómo lo hacen? Podcast", href: "/blog" },
  { label: "Studio", href: "/studio" },
  { label: "Contacto", href: "/contacto" },
];

export const HEADER_ACTIONS = {
  signIn: { label: "Iniciar sesión", href: "/contacto" },
  join: { label: "Unirme ahora", href: "/planes" },
} as const;

export const FOOTER_NAV: readonly NavLink[] = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Programas", href: "/programas" },
  { label: "Planes", href: "/planes" },
  { label: "Contacto", href: "/contacto" },
];

export const EXPLORE_NAV: readonly NavLink[] = [
  { label: "Equipo", href: "/equipo" },
  { label: "Cómo trabajamos", href: "/metodo" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Testimonios", href: "/testimonios" },
  { label: "Babaluum Studio", href: "/studio" },
];

export const LEGAL_NAV: readonly NavLink[] = [
  { label: "Privacidad", href: "/privacidad" },
  { label: "Términos", href: "/terminos" },
];

export const SOCIALS = [
  { label: "X", href: "https://x.com", icon: "x-social" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
] as const;
