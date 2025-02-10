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
  darkMode: ['class', 'class'],
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
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			},
  			'border-beam': {
  				'100%': {
  					'offset-distance': '100%'
  				}
  			},
			  fadeIn: {
				"0%": { opacity: "0" },
				"100%": { opacity: "1" },
			  },
			  fadeOut: {
				"0%": { opacity: "1" },
				"100%": { opacity: "0" },
			  },
			  float: {
				"0%": { transform: "translateY(0px)" },
				"50%": { transform: "translateY(-15px)" },
				"100%": { transform: "translateY(0px)" },
			  },
			  glow: {
				"0%": { boxShadow: "0px 0px 5px white" },
				"100%": { boxShadow: "0px 0px 20px white" },
			  },
			  textGlow: {
				"0%": { textShadow: "0px 0px 5px white" },
				"100%": { textShadow: "0px 0px 15px white" },
			  },
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			marquee: 'marquee var(--duration) infinite linear',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
  			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
			  fadeIn: "fadeIn 1.5s ease-in-out",
        fadeOut: "fadeOut 1s ease-out forwards",
        bounce: "bounce 1.5s infinite",
        spinSlow: "spin 5s linear infinite",
        pulse: "pulse 2s infinite",
        glow: "glow 2s infinite alternate",
        float: "float 3s ease-in-out infinite",
        textGlow: "textGlow 1.5s ease-in-out infinite",
  		}
  	},
  	images: {
  		domains: [
  			'136.228.158.126'
  		]
  	}
  },
  
  plugins: [tailwindcssAnimate],
};



export default config;
