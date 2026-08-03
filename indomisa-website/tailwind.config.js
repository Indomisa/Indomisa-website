module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      borderRadius: {
        // Collapses Tailwind's default rounded-* scale onto the same
        // --radius-* custom properties used by hardcoded page SCSS, so
        // rounded-lg/2xl/3xl utilities and hand-rolled cards land on one
        // consistent physical scale instead of drifting per page.
        sm: 'var(--radius-xs)',
        DEFAULT: 'var(--radius-xs)',
        md: 'var(--radius-sm)',
        lg: 'var(--radius-md)',
        xl: 'var(--radius-lg)',
        '2xl': 'var(--radius-xl)',
        '3xl': 'var(--radius-xl)',
      },
      fontFamily: {
        // Class names kept as-is (font-inter / font-syne) so no template
        // changes were needed elsewhere — only the underlying typefaces
        // changed. See index.html for the actual font loading.
        inter: ['IBM Plex Sans', 'Inter', 'sans-serif'],
        syne: ['Space Grotesk', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        'primary-contrast': 'hsl(var(--primary-contrast))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        border: 'hsl(var(--border))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
      }
    }
  },
  plugins: []
};
