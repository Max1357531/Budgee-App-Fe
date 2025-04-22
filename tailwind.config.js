export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}", // tells Tailwind where to scan for class usage
    ],
    darkMode: 'class', // enables dark mode via .dark class
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#6EE7B7',
                    dark: '#10B981',
                },
                accent: {
                    light: '#34D399',
                    dark: '#059669',
                },
                background: {
                    light: '#F0FDF4',
                    dark: '#1F2937',
                },
                textPrimary: {
                    light: '#1E3A1E',
                    dark: '#D1FAE5',
                },
                neutral: {
                    light: '#F9FAFB',
                    dark: '#111827',
                },
            },
            fontFamily: {
                sans: ['"DM Sans"', 'Inter', 'sans-serif'],
            },
            fontSize: {
                xs: ['0.75rem', '1.1rem'],
                sm: ['0.875rem', '1.4rem'],
                base: ['1rem', '1.6rem'],
                lg: ['1.125rem', '1.8rem'],
                xl: ['1.25rem', '1.8rem'],
                '2xl': ['1.5rem', '2rem'],
                '3xl': ['1.875rem', '2.25rem'],
                '4xl': ['2.25rem', '2.5rem'],
            },
            spacing: {
                section: '6rem',
                card: '1.25rem',
            },
            boxShadow: {
                soft: '0 2px 12px rgba(0, 0, 0, 0.06)',
            },
            borderRadius: {
                xl: '1.5rem',
                '2xl': '2rem',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
}
