import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

// Extend the Tailwind theme types
declare module 'tailwindcss' {
  interface Theme {
    colors: {
      sidebar: {
        DEFAULT: string;
        foreground: string;
        primary: string;
        'primary-foreground': string;
        accent: string;
        'accent-foreground': string;
        border: string;
        ring: string;
      };
      // Add other color properties if needed (e.g., popover, card)
      popover: {
        foreground: string;
        DEFAULT: string;
      };
      card: {
        foreground: string;
        DEFAULT: string;
      };
      // Continue for other custom colors
    };
    borderRadius: {
      lg: string;
      md: string;
      sm: string;
    };
    keyframes: {
      [key: string]: { from: { [key: string]: string }; to: { [key: string]: string } };
    };
    animation: {
      [key: string]: string;
    };
  }
  
}

// Tailwind configuration object
const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimaryLight: '#F7FDFB',
        bglight: '#F9FAFE',
        primary: '#0BBB8A',
        secondary: '#FFA500',
        accent: '#F88787',
        danger: '#D43B3B',
        warning: '#F5C449',
        bgdark: '#02042C',
        textprimary: '#034B72',
        yellowlish: '#FFD300',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    },
    images: {
      domains: ['136.228.158.126'], // Add your image domain here
    },
  },
  
  plugins: [tailwindcssAnimate],
};



export default config;
