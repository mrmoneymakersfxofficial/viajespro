// ============================================================
// AGENT Travel Agency - Centralized Content Configuration
// All texts, links, and image paths in one place for easy editing.
// ============================================================

export type Language = "es" | "en";

interface Destination {
  id: string;
  image: string;
  price: string;
  duration: string;
  slug: {
    es: string;
    en: string;
  };
  title: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  highlights: {
    es: string[];
    en: string[];
  };
}

interface Testimonial {
  name: string;
  location: {
    es: string;
    en: string;
  };
  avatar: string;
  rating: number;
  text: {
    es: string;
    en: string;
  };
}

interface Feature {
  icon: string;
  title: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
}

// ─── Site Configuration ─────────────────────────────────────
export const siteConfig = {
  name: {
    es: "Viajeros VIP",
    en: "Viajeros VIP",
  },
  tagline: {
    es: "Descubre la magia del Perú",
    en: "Discover the magic of Peru",
  },
  description: {
    es: "Tu agencia de viajes de confianza en Perú. Paquetes turísticos exclusivos a Machu Picchu, Cusco, Amazonía y más. Reserva ahora y vive una experiencia inolvidable.",
    en: "Your trusted travel agency in Peru. Exclusive tour packages to Machu Picchu, Cusco, the Amazon, and more. Book now and live an unforgettable experience.",
  },
  phone: "+51958446061",
  whatsapp: "51958446061",
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
  },
  provider: {
    name: "fastpagepro.com",
    url: "https://www.fastpagepro.com",
    developer: "Fabio Herrera",
    slogan: {
      es: "Construyendo la presencia digital que su empresa merece",
      en: "Building the digital presence your company deserves",
    },
  },
};

// ─── Navigation ────────────────────────────────────────────
export const navLinks = [
  { href: "#inicio", label: { es: "Inicio", en: "Home" } },
  { href: "#destinos", label: { es: "Destinos", en: "Destinations" } },
  { href: "#experiencias", label: { es: "Experiencias", en: "Experiences" } },
  { href: "#nosotros", label: { es: "Nosotros", en: "About Us" } },
  { href: "#contacto", label: { es: "Contacto", en: "Contact" } },
];

// ─── Hero Section ──────────────────────────────────────────
export const heroContent = {
  badge: {
    es: "\u2726 Experiencias de Elite",
    en: "\u2726 Elite Experiences",
  },
  title: {
    es: "Vive la Aventura de",
    en: "Live the Adventure of",
  },
  titleHighlight: {
    es: "Conocer Perú",
    en: "Discovering Peru",
  },
  subtitle: {
    es: "Paquetes turísticos exclusivos diseñados para crear recuerdos que durarán toda la vida. Desde las ruinas milenarias de Machu Picchu hasta la exuberante selva amazónica.",
    en: "Exclusive tour packages designed to create memories that will last a lifetime. From the ancient ruins of Machu Picchu to the lush Amazon rainforest.",
  },
  ctaPrimary: {
    es: "Reservar Ahora",
    en: "Book Now",
  },
  ctaSecondary: {
    es: "Ver Destinos",
    en: "View Destinations",
  },
  stats: [
    {
      value: "5,000+",
      label: { es: "Viajeros Felices", en: "Happy Travelers" },
    },
    {
      value: "50+",
      label: { es: "Destinos", en: "Destinations" },
    },
    {
      value: "98%",
      label: { es: "Satisfacción", en: "Satisfaction" },
    },
    {
      value: "15+",
      label: { es: "Años de Experiencia", en: "Years of Experience" },
    },
  ],
};

// ─── Destinations ──────────────────────────────────────────
export const destinations: Destination[] = [
  {
    id: "machupicchu",
    image: "/images/hero-machupicchu.jpg",
    price: "Desde $299",
    duration: "4 Días / 3 Noches",
    slug: { es: "machu-picchu", en: "machu-picchu" },
    title: {
      es: "Machu Picchu",
      en: "Machu Picchu",
    },
    description: {
      es: "Descubre la ciudadela inca más famosa del mundo. Un viaje mágico a las ruinas milenarias entre las nubes.",
      en: "Discover the most famous Inca citadel in the world. A magical journey to ancient ruins among the clouds.",
    },
    highlights: {
      es: ["Tren a Machu Picchu", "Guiado profesional", "Entrada incluida", "Hotel 3 estrellas"],
      en: ["Train to Machu Picchu", "Professional guide", "Included entrance", "3-star hotel"],
    },
  },
  {
    id: "sacred-valley",
    image: "/images/dest-sacred-valley.jpg",
    price: "Desde $199",
    duration: "3 Días / 2 Noches",
    slug: { es: "valle-sagrado", en: "sacred-valley" },
    title: {
      es: "Valle Sagrado",
      en: "Sacred Valley",
    },
    description: {
      es: "Explora los pintorescos pueblos andinos y las impresionantes terrazas incas del Valle Sagrado de los Incas.",
      en: "Explore the picturesque Andean villages and stunning Inca terraces of the Sacred Valley of the Incas.",
    },
    highlights: {
      es: ["Pisac y Ollantaytambo", "Mercado artesanal", "Comida típica", "Transporte privado"],
      en: ["Pisac and Ollantaytambo", "Craft market", "Traditional food", "Private transport"],
    },
  },
  {
    id: "titicaca",
    image: "/images/dest-titicaca.jpg",
    price: "Desde $249",
    duration: "3 Días / 2 Noches",
    slug: { es: "lago-titicaca", en: "lake-titicaca" },
    title: {
      es: "Lago Titicaca",
      en: "Lake Titicaca",
    },
    description: {
      es: "Navega por las aguas más altas del mundo y visita las fascinantes islas flotantes de los Uros en Puno.",
      en: "Navigate the highest navigable waters in the world and visit the fascinating floating Uros Islands in Puno.",
    },
    highlights: {
      es: ["Islas flotantes Uros", "Isla Taquile", "Hospedaje local", "Todo incluido"],
      en: ["Floating Uros Islands", "Taquile Island", "Local homestay", "All inclusive"],
    },
  },
  {
    id: "amazon",
    image: "/images/dest-amazon.jpg",
    price: "Desde $349",
    duration: "4 Días / 3 Noches",
    slug: { es: "amazonia-peruana", en: "peruvian-amazon" },
    title: {
      es: "Amazonía Peruana",
      en: "Peruvian Amazon",
    },
    description: {
      es: "Adéntrate en la selva tropical más biodiversa del planeta. Aventura, naturaleza y cultura ancestral.",
      en: "Dive into the most biodiverse tropical rainforest on the planet. Adventure, nature, and ancestral culture.",
    },
    highlights: {
      es: ["Jungle lodge", "Tour nocturno", "Avistamiento de fauna", "Navegación por ríos"],
      en: ["Jungle lodge", "Night tour", "Wildlife spotting", "River navigation"],
    },
  },
  {
    id: "rainbow-mountain",
    image: "/images/dest-rainbow-mountain.jpg",
    price: "Desde $89",
    duration: "1 Día Completo",
    slug: { es: "montana-colores", en: "rainbow-mountain" },
    title: {
      es: "Montaña de Colores",
      en: "Rainbow Mountain",
    },
    description: {
      es: "Trekking a la espectacular Montaña Vinicunca con sus impresionantes franjas de colores naturales.",
      en: "Trekking to the spectacular Vinicunca Mountain with its stunning natural colorful stripes.",
    },
    highlights: {
      es: ["Trekking guiado", "Desayuno incluido", "Caballos disponibles", "Transporte ida y vuelta"],
      en: ["Guided trekking", "Breakfast included", "Horses available", "Round trip transport"],
    },
  },
  {
    id: "lima",
    image: "/images/dest-lima.jpg",
    price: "Desde $129",
    duration: "2 Días / 1 Noche",
    slug: { es: "lima-gastronomica", en: "culinary-lima" },
    title: {
      es: "Lima Gastronómica",
      en: "Culinary Lima",
    },
    description: {
      es: "Descubre por qué Lima es la capital gastronómica de América. Tour por barrios históricos y degustación de cocina peruana.",
      en: "Discover why Lima is the culinary capital of the Americas. Historic neighborhoods tour and Peruvian cuisine tasting.",
    },
    highlights: {
      es: ["City tour histórico", "Degustación gourmet", "Miraflores y Barranco", "Show de cocina"],
      en: ["Historic city tour", "Gourmet tasting", "Miraflores and Barranco", "Cooking show"],
    },
  },
];

// ─── Features / Why Choose Us ──────────────────────────────
export const features: Feature[] = [
  {
    icon: "shield-check",
    title: {
      es: "Seguridad Total",
      en: "Total Safety",
    },
    description: {
      es: "Todos nuestros paquetes incluyen seguro de viaje completo y guías certificados para garantizar tu tranquilidad durante todo el viaje.",
      en: "All our packages include comprehensive travel insurance and certified guides to ensure your peace of mind throughout the trip.",
    },
  },
  {
    icon: "clock",
    title: {
      es: "Atención 24/7",
      en: "24/7 Support",
    },
    description: {
      es: "Equipo dedicado disponible las 24 horas del día, los 7 días de la semana. Estamos contigo en cada momento de tu aventura.",
      en: "Dedicated team available 24 hours a day, 7 days a week. We are with you every moment of your adventure.",
    },
  },
  {
    icon: "wallet",
    title: {
      es: "Mejor Precio",
      en: "Best Price",
    },
    description: {
      es: "Garantizamos los mejores precios del mercado sin comprometer la calidad. Trabajamos directamente con proveedores locales.",
      en: "We guarantee the best market prices without compromising quality. We work directly with local providers.",
    },
  },
  {
    icon: "star",
    title: {
      es: "Experiencia Premium",
      en: "Premium Experience",
    },
    description: {
      es: "Más de 15 años creando experiencias de viaje únicas. Cada itinerary está diseñado con atención al detalle para sorprenderte.",
      en: "Over 15 years creating unique travel experiences. Every itinerary is designed with attention to detail to amaze you.",
    },
  },
];

// ─── Testimonials ──────────────────────────────────────────
export const testimonials: Testimonial[] = [
  {
    name: "María García",
    location: { es: "Lima, Perú", en: "Lima, Peru" },
    avatar: "MG",
    rating: 5,
    text: {
      es: "Una experiencia increíble desde el primer momento. El equipo de la agencia se aseguró de que cada detalle fuera perfecto. Machu Picchu me dejó sin palabras. ¡100% recomendado!",
      en: "An incredible experience from the very first moment. The agency team made sure every detail was perfect. Machu Picchu left me speechless. 100% recommended!",
    },
  },
  {
    name: "Carlos Mendoza",
    location: { es: "Bogotá, Colombia", en: "Bogotá, Colombia" },
    avatar: "CM",
    rating: 5,
    text: {
      es: "Viajé con mi familia a la Amazonía y fue la mejor decisión que tomamos. Los guías son muy profesionales y conocedores. Los niños disfrutaron cada minuto de la aventura.",
      en: "I traveled with my family to the Amazon and it was the best decision we made. The guides are very professional and knowledgeable. The kids enjoyed every minute of the adventure.",
    },
  },
  {
    name: "Jennifer López",
    location: { es: "Buenos Aires, Argentina", en: "Buenos Aires, Argentina" },
    avatar: "JL",
    rating: 5,
    text: {
      es: "El tour gastronómico por Lima superó todas mis expectativas. La combinación de historia, cultura y deliciosa comida peruana fue perfecta. Ya estoy planeando mi próximo viaje con ellos.",
      en: "The culinary tour in Lima exceeded all my expectations. The combination of history, culture, and delicious Peruvian food was perfect. I am already planning my next trip with them.",
    },
  },
  {
    name: "Robert Chen",
    location: { es: "Toronto, Canadá", en: "Toronto, Canada" },
    avatar: "RC",
    rating: 5,
    text: {
      es: "Desde que contacté por WhatsApp la atención fue excelente. Me ayudaron a personalizar mi viaje completo por Perú. La Montaña de Colores fue la mayor sorpresa de mi vida.",
      en: "Since I contacted them on WhatsApp the service was excellent. They helped me customize my complete trip to Peru. Rainbow Mountain was the biggest surprise of my life.",
    },
  },
];

// ─── About Section ─────────────────────────────────────────
export const aboutContent = {
  title: {
    es: "Sobre Nosotros",
    en: "About Us",
  },
  subtitle: {
    es: "Más de 15 años creando experiencias inolvidables en Perú",
    en: "Over 15 years creating unforgettable experiences in Peru",
  },
  paragraphs: [
    {
      es: "Somos una agencia de viajes peruana con más de 15 años de experiencia en el sector turístico. Nuestra misión es conectar a viajeros de todo el mundo con las maravillas naturales, culturales e históricas que Perú tiene para ofrecer.",
      en: "We are a Peruvian travel agency with over 15 years of experience in the tourism sector. Our mission is to connect travelers from around the world with the natural, cultural, and historical wonders Peru has to offer.",
    },
    {
      es: "Cada paquete turístico que diseñamos es el resultado de años de experiencia local, conocimiento profundo de cada destino y una pasión genuina por compartir la riqueza de nuestra tierra. Trabajamos con comunidades locales y proveedores de confianza para garantizar una experiencia auténtica y responsable.",
      en: "Every tour package we design is the result of years of local experience, deep knowledge of each destination, and a genuine passion for sharing the richness of our land. We work with local communities and trusted providers to ensure an authentic and responsible experience.",
    },
    {
      es: "Nuestro equipo de guías certificados, expertos en turismo sustentable, está listo para llevarlo a vivir aventuras que transformarán su perspectiva del mundo. Desde lo alto de los Andes hasta las profundidades de la selva amazónica, cada viaje es una historia esperando ser contada.",
      en: "Our team of certified guides, experts in sustainable tourism, is ready to take you on adventures that will transform your perspective of the world. From the heights of the Andes to the depths of the Amazon rainforest, every trip is a story waiting to be told.",
    },
  ],
};

// ─── WhatsApp Messages (Pre-filled) ────────────────────────
export const whatsappMessages = {
  general: {
    es: "¡Hola! 🌎 Me interesa obtener más información sobre sus paquetes turísticos a Perú. ¿Podrían ayudarme?",
    en: "Hello! 🌎 I am interested in getting more information about your tour packages to Peru. Could you help me?",
  },
  machupicchu: {
    es: "¡Hola! 🏔️ Quiero información sobre el paquete a Machu Picchu. ¿Cuáles son las fechas disponibles y el precio?",
    en: "Hello! 🏔️ I want information about the Machu Picchu package. What are the available dates and prices?",
  },
  booking: {
    es: "¡Hola! ✈️ Deseo reservar un paquete turístico. Por favor, indíqueme los pasos a seguir.",
    en: "Hello! ✈️ I would like to book a tour package. Please let me know the steps to follow.",
  },
};

// ─── Footer Content ────────────────────────────────────────
export const footerContent = {
  tagline: {
    es: "Tu aventura en Perú comienza aquí. Paquetes exclusivos, precios accesibles y experiencias que durarán para siempre.",
    en: "Your adventure in Peru starts here. Exclusive packages, affordable prices, and experiences that will last forever.",
  },
  quickLinks: {
    title: {
      es: "Enlaces Rápidos",
      en: "Quick Links",
    },
    links: [
      { href: "#inicio", label: { es: "Inicio", en: "Home" } },
      { href: "#destinos", label: { es: "Destinos", en: "Destinations" } },
      { href: "#experiencias", label: { es: "Experiencias", en: "Experiences" } },
      { href: "#nosotros", label: { es: "Nosotros", en: "About Us" } },
      { href: "#contacto", label: { es: "Contacto", en: "Contact" } },
    ],
  },
  popularDestinations: {
    title: {
      es: "Destinos Populares",
      en: "Popular Destinations",
    },
    links: [
      { href: "#destinos", label: { es: "Machu Picchu", en: "Machu Picchu" } },
      { href: "#destinos", label: { es: "Lago Titicaca", en: "Lake Titicaca" } },
      { href: "#destinos", label: { es: "Amazonía", en: "Amazon" } },
      { href: "#destinos", label: { es: "Valle Sagrado", en: "Sacred Valley" } },
    ],
  },
  contact: {
    title: {
      es: "Contacto",
      en: "Contact",
    },
  },
  copyright: {
    es: "Viajeros VIP. Todos los derechos reservados.",
    en: "Viajeros VIP. All rights reserved.",
  },

};
