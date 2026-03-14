import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    // === JOVERO BRAND COLORS - Marketing Agency Aesthetic ===
                    primary: '#05011a',         // Deep midnight/purple background
                    accent: '#bb26ff',          // Vibrant Magenta/Purple
                    secondary: '#00f2ff',       // Vibrant Cyan/Blue
                    dark: '#020617',            // Darkest depth
                    surface: '#0d0d21',         // Panel BG (Lighter dark navy)
                    text: '#ffffff',            // Pure white text
                    muted: '#94a3b8',           // Slate-400 for muted text

                    // Specific UI states
                    'accent-hover': '#9d1df5',
                    'secondary-hover': '#00d8e6',

                    // Glass & Glow
                    glass: 'rgba(5, 1, 26, 0.7)',
                    'glass-border': 'rgba(187, 38, 255, 0.15)',
                    'glass-border-hover': 'rgba(0, 242, 255, 0.3)',
                    glow: 'rgba(187, 38, 255, 0.2)',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'system-ui', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            boxShadow: {
                'neon-purple': '0 0 5px rgba(139, 92, 246, 0.2), 0 0 20px rgba(139, 92, 246, 0.1)',
                'neon-blue': '0 0 5px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.1)',
                'glow-card': '0 0 40px -10px rgba(139, 92, 246, 0.1)',
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'fade-up': 'fadeUp 0.6s ease-out forwards',
                'scale-in': 'scaleIn 0.5s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
                'width-expand': 'widthExpand 1s ease-out forwards',
                'marquee': 'marquee 40s linear infinite',
                'marquee-reverse': 'marqueeReverse 40s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                marqueeReverse: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                pulseGlow: {
                    '0%, 100%': { opacity: '0.6', filter: 'brightness(1)' },
                    '50%': { opacity: '1', filter: 'brightness(1.2)' },
                },
                widthExpand: {
                    '0%': { width: '0%' },
                    '100%': { width: '100%' },
                },
            },
            backgroundImage: {
                'hero-gradient': 'radial-gradient(circle at top center, #1e1b4b 0%, #05011a 100%)',
                'accent-gradient': 'linear-gradient(135deg, #bb26ff 0%, #00f2ff 100%)',
                'card-gradient': 'linear-gradient(180deg, rgba(13, 13, 33, 0.8) 0%, rgba(5, 1, 26, 0.9) 100%)',
                'glow-radial': 'radial-gradient(circle at center, var(--tw-gradient-from) 0%, transparent 70%)',
            },
        },
    },
    plugins: [],
};

export default config;
