import { Product, Review, StyleCategory } from '../types';

// --- TRANSLATIONS ---
export const TRANSLATIONS = {
  es: {
    nav: { home: 'Inicio', generator: 'Generador', shop: 'Tienda', profile: 'Perfil', login: 'Acceder', logout: 'Salir' },
    hero: { title: 'MODAI', subtitle: 'Outfits perfectos, cero esfuerzo.', cta: 'Empezar Ahora' },
    generator: { title: 'Crea tu estilo', select: 'Selecciona la ocasión:', button: 'Generar Outfit', loading: 'Generando tu outfit...', result: 'Tu Outfit Ideal' },
    shop: { title: 'Catálogo Exclusivo', filter: 'Filtrar por estilo' },
    auth: { loginTitle: 'Iniciar Sesión', registerTitle: 'Crear Cuenta', name: 'Nombre', email: 'Correo', pass: 'Contraseña', submit: 'Enviar', noAccount: '¿No tienes cuenta?', hasAccount: '¿Ya tienes cuenta?' },
    profile: { title: 'Tu Perfil', plan: 'Plan Actual', save: 'Guardar Cambios', banking: 'Datos Bancarios', business: 'Datos Fiscales', consent: 'Consentimiento de Datos' },
    footer: { about: 'Sobre Nosotros', devs: 'Desarrolladores', terms: 'Términos y Condiciones', privacy: 'Privacidad' },
    plans: { free: 'Gratis', premium: 'Premium (3,99€/mes)', business: 'Empresarial (59,99€/año)' },
    consent: { 
      title: 'Consentimiento de Tratamiento de Datos',
      text: 'Para continuar con el plan seleccionado, necesitamos almacenar sus datos bancarios y/o fiscales. Estos datos se guardarán de forma segura en nuestra base de datos MongoDB. Usted tiene derecho a solicitar la eliminación de estos datos en cualquier momento desde su perfil.',
      checkbox: 'Acepto que mis datos sean almacenados en la base de datos',
      cancel: 'Cancelar',
      accept: 'Confirmar y Guardar'
    }
  },
  en: {
    nav: { home: 'Home', generator: 'Generator', shop: 'Shop', profile: 'Profile', login: 'Login', logout: 'Logout' },
    hero: { title: 'MODAI', subtitle: 'Perfect outfits, zero effort.', cta: 'Start Now' },
    generator: { title: 'Create your style', select: 'Select occasion:', button: 'Generate Outfit', loading: 'Generating outfit...', result: 'Your Ideal Outfit' },
    shop: { title: 'Exclusive Catalog', filter: 'Filter by style' },
    auth: { loginTitle: 'Login', registerTitle: 'Create Account', name: 'Name', email: 'Email', pass: 'Password', submit: 'Submit', noAccount: 'No account?', hasAccount: 'Already have an account?' },
    profile: { title: 'Your Profile', plan: 'Current Plan', save: 'Save Changes', banking: 'Banking Details', business: 'Fiscal Details', consent: 'Data Consent' },
    footer: { about: 'About Us', devs: 'Developers', terms: 'Terms', privacy: 'Privacy' },
    plans: { free: 'Free', premium: 'Premium (3.99€/mo)', business: 'Business (59.99€/yr)' },
    consent: { 
      title: 'Data Processing Consent',
      text: 'To proceed with the selected plan, we need to store your banking and/or fiscal data. This data will be securely stored in our MongoDB database. You have the right to request deletion of this data at any time from your profile.',
      checkbox: 'I accept that my data will be stored in the database',
      cancel: 'Cancel',
      accept: 'Confirm & Save'
    }
  },
  cn: {
    nav: { home: '首页', generator: '生成器', shop: '商店', profile: '个人资料', login: '登录', logout: '登出' },
    hero: { title: 'MODAI', subtitle: '完美装备，零努力。', cta: '现在开始' },
    generator: { title: '创造你的风格', select: '选择场合:', button: '生成装备', loading: '正在生成装备...', result: '你的理想装备' },
    shop: { title: '独家目录', filter: '按风格筛选' },
    auth: { loginTitle: '登录', registerTitle: '创建账户', name: '姓名', email: '邮箱', pass: '密码', submit: '提交', noAccount: '没有账户？', hasAccount: '已有账户？' },
    profile: { title: '个人资料', plan: '当前计划', save: '保存更改', banking: '银行详情', business: '税务详情', consent: '数据同意' },
    footer: { about: '关于我们', devs: '开发人员', terms: '条款', privacy: '隐私' },
    plans: { free: '免费', premium: '高级 (3.99€/月)', business: '企业 (59.99€/年)' },
    consent: { 
      title: '数据处理同意书',
      text: '为了继续使用所选计划，我们需要存储您的银行和/或税务数据。这些数据将安全地存储在我们的 MongoDB 数据库中。您有权随时从您的个人资料中请求删除此数据。',
      checkbox: '我同意将我的数据存储在数据库中',
      cancel: '取消',
      accept: '确认并保存'
    }
  }
};

// --- PRODUCT GENERATOR HELPER ---
const styles: StyleCategory[] = ['casual', 'sport', 'elegant', 'informal', 'work'];
const brands = ['Nike', 'Adidas', 'Puma', 'Zara', 'H&M', 'Under Armour', 'Gucci', 'Uniqlo'];

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  let idCounter = 1;

  styles.forEach(style => {
    // 5 Tops per style
    for (let i = 0; i < 5; i++) {
      const brand = brands[Math.floor(Math.random() * brands.length)];
      products.push({
        id: `top_${idCounter++}`,
        name: `${style.charAt(0).toUpperCase() + style.slice(1)} Top ${i + 1}`,
        brand: brand,
        price: Math.floor(Math.random() * 50) + 20,
        type: 'top',
        style: style,
        image: `https://picsum.photos/seed/top${style}${i}/300/300`,
        url: '#'
      });
    }
    // 5 Bottoms per style
    for (let i = 0; i < 5; i++) {
      const brand = brands[Math.floor(Math.random() * brands.length)];
      products.push({
        id: `btm_${idCounter++}`,
        name: `${style.charAt(0).toUpperCase() + style.slice(1)} Pants ${i + 1}`,
        brand: brand,
        price: Math.floor(Math.random() * 60) + 30,
        type: 'bottom',
        style: style,
        image: `https://picsum.photos/seed/btm${style}${i}/300/300`,
        url: '#'
      });
    }
    // 5 Shoes per style
    for (let i = 0; i < 5; i++) {
      const brand = brands[Math.floor(Math.random() * brands.length)];
      products.push({
        id: `shoe_${idCounter++}`,
        name: `${style.charAt(0).toUpperCase() + style.slice(1)} Shoes ${i + 1}`,
        brand: brand,
        price: Math.floor(Math.random() * 100) + 50,
        type: 'shoes',
        style: style,
        image: `https://picsum.photos/seed/shoe${style}${i}/300/300`,
        url: '#'
      });
    }
  });
  return products;
};

export const PRODUCTS = generateProducts();

export const REVIEWS: Review[] = [
  { id: '1', user: 'Laura G.', rating: 5, text: '¡Me encanta! Modai me ahorra horas cada mañana.', avatar: '/assets/images/reviews/persona1.jpg' },
  { id: '2', user: 'Carlos M.', rating: 4, text: 'Los estilos deportivos son increíbles. Muy recomendada.', avatar: '/assets/images/reviews/persona2.jpg' },
  { id: '3', user: 'Sophie L.', rating: 5, text: 'The business casual options are exactly what I needed.', avatar: '/assets/images/reviews/persona3.jpg' }
];

export const DEVELOPERS = [
  { name: 'Samuel García Díaz', role: 'CTO', img: '/assets/images/team/samuel.jpeg' },
  { name: 'Mario Montero Díaz', role: 'CMO', img: '/assets/images/team/mario.jpeg' },
  { name: 'Densel Didier Barahona Mejía', role: 'CEO', img: '/assets/images/team/didier.jpeg' },
];
