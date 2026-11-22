export type LegalSection = { heading: string; paragraphs: readonly string[] };

const COLLECTION = "Podemos recopilar información de identificación personal de los usuarios de varias maneras: cuando visitan el sitio, se registran, se suscriben al boletín o completan un formulario. Solo recopilamos esta información si la entregan voluntariamente.";

export const PRIVACY: readonly LegalSection[] = [
  { heading: "Introducción", paragraphs: ["En Babaluum nos comprometemos a proteger tu privacidad. Esta política explica cómo recopilamos, usamos, mantenemos y divulgamos la información de quienes visitan nuestro sitio."] },
  { heading: "Información personal", paragraphs: [COLLECTION] },
  { heading: "Información no personal", paragraphs: ["Podemos recopilar datos técnicos como el navegador, el tipo de dispositivo y el proveedor de internet para mejorar la experiencia del sitio."] },
  { heading: "Cómo usamos la información", paragraphs: ["Usamos la información para responder solicitudes, mejorar nuestros programas y enviar comunicaciones periódicas que puedes cancelar cuando quieras."] },
  { heading: "Cómo protegemos tu información", paragraphs: ["Aplicamos prácticas adecuadas de recolección, almacenamiento y procesamiento de datos, junto con medidas de seguridad para evitar accesos no autorizados."] },
  { heading: "Compartir información", paragraphs: ["No vendemos ni alquilamos tu información personal. Podemos compartir datos agregados que no identifican a nadie con aliados de confianza."] },
  { heading: "Cookies", paragraphs: ["El sitio puede usar cookies para mejorar tu experiencia. Puedes configurar tu navegador para rechazarlas; algunas partes del sitio podrían no funcionar correctamente."] },
  { heading: "Cambios a esta política", paragraphs: ["Podemos actualizar esta política en cualquier momento. Te recomendamos revisarla con frecuencia para mantenerte informado."] },
];

export const TERMS: readonly LegalSection[] = [
  { heading: "Introducción", paragraphs: ["Al usar el sitio y los programas de Babaluum aceptas estos términos. Si no estás de acuerdo, te pedimos no utilizar nuestros servicios."] },
  { heading: "Uso del sitio", paragraphs: ["Te comprometes a usar el sitio de forma legal y respetuosa con la comunidad, sin afectar su funcionamiento ni la experiencia de otras personas."] },
  { heading: "Cuentas y membresías", paragraphs: ["Eres responsable de la información de tu cuenta. Las membresías se renuevan según el plan elegido y puedes cancelarlas en cualquier momento."] },
  { heading: "Contenido de la comunidad", paragraphs: ["Conservas los derechos sobre lo que creas. Nos otorgas permiso para mostrarlo en nuestros canales cuando participas en programas y campañas."] },
  { heading: "Limitación de responsabilidad", paragraphs: ["Babaluum no será responsable por daños indirectos derivados del uso del sitio o de los programas."] },
  { heading: "Cambios a estos términos", paragraphs: ["Podemos actualizar estos términos. Publicaremos la nueva versión en esta página con su fecha de vigencia."] },
];
