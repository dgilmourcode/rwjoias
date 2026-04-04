/** @type {import('tailwindcss').Config} */
export default {
    // IMPORTANTE: Onde o Tailwind deve procurar classes
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    
    theme: {
        extend: {
            // ============================================
            // FONTES PERSONALIZADAS
            // ============================================
            fontFamily: {
                'cinzel': ['Cinzel', 'serif'],
                'inter': ['Inter', 'sans-serif'],
            },
            
            // ============================================
            // PALETA DE CORES PERSONALIZADA
            // ============================================
            colors: {
                gold: {
                    100: '#F9F1D8',
                    200: '#F0DEAA',
                    300: '#E6CB7D',
                    400: '#DDB850',
                    500: '#D4A532',    // Dourado principal
                    600: '#B8860B',    // Dourado escuro
                    700: '#8B6914',
                    800: '#5C4510',
                    900: '#2E2208',
                },
                dark: {
                    900: '#0a0a0a',    // Preto principal
                    800: '#121212',    // Preto secundário
                    700: '#1a1a1a',    // Card background
                    600: '#2a2a2a',    // Bordas
                }
            },
            
            // ============================================
            // ANIMAÇÕES PERSONALIZADAS
            // ============================================
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'fade-in': 'fadeIn 1s ease-out forwards',
                'slide-in-right': 'slideInRight 0.6s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(50px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                }
            }
        }
    },
    
    plugins: [],
}