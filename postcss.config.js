/* ============================================
   CONFIGURAÇÃO DO POSTCSS
   ============================================
   
   Este arquivo configura o PostCSS para processar
   Tailwind CSS v4+ e adicionar prefixos de navegador
   automaticamente (autoprefixer).
   
   Tailwind 4.x usa @tailwindcss/postcss como plugin
   principal, que substitui a abordagem anterior.
*/

export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
