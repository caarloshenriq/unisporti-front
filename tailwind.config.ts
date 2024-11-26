import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        uniporra: '#69f152',
        uniporra2: '#EEE82C',
        uniporraBlack: '#1c3631',
        uniporraGray: '#A9ACA9',
        uniporraGreen1: '#1E7F4D',
        uniporraGreen2: '#1F271B',
        uniporraGreen3: '#84a690',
        uniporrabg: '#c1c1be',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
