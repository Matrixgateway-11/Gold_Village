// Company details used across the whole site. Edit these values to update
// the header, footer, contact links, WhatsApp chat and page titles at once.
export const site = {
  name: 'Golden Village',
  legalName: 'Golden Village Furniture',
  email: 'hello@goldenvillagefurniture.com',
  phone: '+62 812 3456 7890',
  // Digits only, with country code, for wa.me links.
  whatsapp: '6281234567890',
  address: 'Jl. Raya Jepara - Kudus No. KM 13, Jepara, Jawa Tengah 59462, Indonesia',
  city: 'Jepara, Indonesia',
  website: 'goldenvillagefurniture.com',
  // "Explore Signature Pieces" / "Start Your Project" buttons on the home page.
  signatureUrl: '/product-category/all/',
  // Optional form endpoint (e.g. https://formspree.io/f/xxxx). When empty,
  // inquiry forms open the visitor's email app with the message pre-filled.
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) || '',
}

export const telHref = (phone: string) => 'tel:' + phone.replace(/[^\d+]/g, '')
