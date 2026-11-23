export type LegalItem = { term?: string; text: string };

export type LegalSection = { heading: string; paragraphs: readonly string[]; items?: readonly LegalItem[] };

export const PRIVACY: readonly LegalSection[] = [
  {
    heading: "Babaluum | Aviso de privacidad",
    paragraphs: [
      "En BABALUUM estamos comprometidos con la protección y confidencialidad de los datos personales de nuestros usuarios y miembros de la comunidad, de conformidad con la Ley de Protección de la Persona Frente al Tratamiento de sus Datos Personales (Ley No.8968) y su Reglamento (Decreto No.37554). Este aviso detalla cómo recopilamos, utilizamos y protegemos su información.",
    ],
  },
  {
    heading: "Información que Recopilamos",
    paragraphs: [],
    items: [
      { text: "Nombre completo" },
      { text: "Correo electrónico" },
      { text: "Número de teléfono" },
      { text: "Dirección física" },
      { text: "Información / Perfil Educativo y Profesional" },
      { text: "Contactos adicionales" },
      { text: "Cualquier otra información necesaria para llevar a cabo nuestras actividades." },
    ],
  },
  {
    heading: "Finalidad del Tratamiento de Datos Personales",
    paragraphs: [],
    items: [
      { text: "Enviar comunicaciones sobre nuestros programas, actualizaciones y temas de interés (boletines informativos, invitaciones a eventos, promociones, etc.)." },
      { text: "Responder consultas y agendar reuniones." },
      { text: "Mejorar la calidad de nuestro contenido y actividades." },
    ],
  },
  {
    heading: "Tiempo de Conservación de los Datos Personales",
    paragraphs: [
      "Conservaremos sus datos personales durante cinco años, tiempo necesario para cumplir con las finalidades descritas en este aviso y según lo permita la ley. En caso de solicitar la supresión de sus datos, estos serán eliminados de nuestra base de datos activa, conservando únicamente la información necesaria para fines de archivo y cumplimiento Legal.",
    ],
  },
  {
    heading: "Responsable del Tratamiento",
    paragraphs: ["BABALUUM, con domicilio en San José, Costa Rica, y correo electrónico: hola@babaluum.com, es responsable del tratamiento de sus datos personales."],
  },
];

export const TERMS: readonly LegalSection[] = [
  {
    heading: "Aviso importante",
    paragraphs: [
      "Estos Términos y Condiciones tienen como objetivo establecer las reglas básicas para el uso de nuestro sitio web. Le recomendamos que los lea detenidamente y consulte con un abogado si tiene alguna pregunta.",
    ],
  },
  {
    heading: "1. Información general",
    paragraphs: [
      "Gracias por visitar www.babaluum.com",
      "Por favor, lea los Términos y Condiciones que se describen a continuación, éstos aplicarán tanto para la navegación en el sitio de internet www.babaluum.com, como para los servicios y actividades ofrecidas en este sitio Web. Nos reservamos el derecho de modificar, agregar y/o eliminar las condiciones total o parcialmente en cualquier momento, a nuestra discreción, sin necesidad de previo aviso.",
      "El sitio web www.babaluum.com es propiedad de Mariana Murillo Baltodano, fundadora (en adelante \"Babaluum\"). Es una plataforma que divulga información sobre y no se limita a tecnología, sostenibilidad y desarrollo profesional, fomenta diversas iniciativas para el crecimiento profesional de sus usuarios, organiza eventos y crea una comunidad para aprendizaje y desarrollo personal.",
    ],
  },
  {
    heading: "2. Aceptación de los términos",
    paragraphs: [
      "Al acceder y utilizar este sitio web, usted acepta estos Términos y Condiciones en su totalidad. Si no está de acuerdo con alguna parte de estos términos, por favor absténgase de utilizar el sitio. Babaluum se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Es su responsabilidad revisar periódicamente esta página para estar al tanto de las actualizaciones.",
    ],
  },
  {
    heading: "3. Uso del sitio web",
    paragraphs: [],
    items: [
      {
        term: "Propiedad Intelectual",
        text: "Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, imágenes, videos, software y cualquier otro material, está protegido por derechos de autor y propiedad intelectual, tanto costarricenses como internacionales. Queda prohibida la reproducción, distribución, modificación o explotación comercial de cualquier contenido sin la autorización expresa y por escrito de Babaluum.",
      },
      {
        term: "Responsabilidad",
        text: "El uso de este sitio web es bajo su propio riesgo. Babaluum no se hace responsable de ningún daño directo o indirecto que surja del uso de este sitio web o de la información contenida en él.",
      },
      {
        term: "Enlaces Externos",
        text: "Este sitio puede contener enlaces a sitios web de terceros. Babaluum no se hace responsable del contenido ni de las prácticas de privacidad de estos sitios externos.",
      },
      {
        term: "Cuentas de Usuario",
        text: "Para acceder a ciertos servicios, es posible que deba crear una cuenta de usuario. Usted es responsable de mantener la confidencialidad de su nombre de usuario y contraseña.",
      },
      { term: "Uso Prohibido", text: "Queda prohibido utilizar este sitio web para cualquier propósito ilegal o que viole estos Términos y Condiciones." },
    ],
  },
  {
    heading: "4. Limitación de responsabilidad",
    paragraphs: [
      "Babaluum no garantiza resultados específicos en la divulgación de prácticas y consejos. La información proporcionada en este sitio web no debe interpretarse como una garantía de éxito en ningún procedimiento que se comparta con fines educativos en los temas ya mencionados anteriormente.",
    ],
  },
  {
    heading: "7. Ley aplicable y jurisdicción",
    paragraphs: [
      "Estos Términos y Condiciones se rigen por las leyes de la República de Costa Rica. Cualquier disputa que surja en relación con estos términos se someterá a la jurisdicción exclusiva de los tribunales de Costa Rica.",
    ],
  },
  {
    heading: "8. Contacto",
    paragraphs: ["Si tiene alguna pregunta sobre estos Términos y Condiciones, puede comunicarse con nosotros a través de hola@babaluum.com."],
  },
];
