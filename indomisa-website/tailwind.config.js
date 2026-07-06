module.exports = {
  // THEME: manual light/dark toggling — ThemeService adds/removes the
  // 'dark' class on <html>, and every color below flips with it because
  // each one reads from a CSS custom property re-declared under .dark
  // in styles.scss.
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
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
