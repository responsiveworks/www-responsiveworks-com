# ResponsiveWorks Website

A modern, minimalist website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Modern Tech Stack**: Built with Next.js 14, React 18, and TypeScript
- **Minimalist Design**: Clean, professional design focused on content
- **Portfolio Showcase**: Dynamic portfolio pages with detailed project information
- **Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Proper metadata and semantic HTML for search engines
- **Type Safe**: Full TypeScript support for better developer experience
- **Fast**: Optimized for performance with Next.js App Router

## Getting Started

### Prerequisites

- **Node.js 18.17.0 or higher** (required for Next.js 14)
- npm or yarn

**Important**: Your current Node.js version (18.15.0) is below the minimum required version. Please upgrade to 18.17.0 or higher, or use Node.js 20.x LTS for best compatibility.

To check your Node version:
```bash
node --version
```

To upgrade Node.js:
- Download from [nodejs.org](https://nodejs.org/)
- Or use a version manager like [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
responsiveworks-new/
├── app/                    # Next.js App Router
│   ├── portfolio/         # Portfolio detail pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── sections/         # Page sections
│   ├── Header.tsx        # Navigation
│   └── Footer.tsx        # Footer
├── data/                 # Data files
│   └── portfolio.ts      # Portfolio projects
└── public/               # Static files

```

## Customization

### Adding Portfolio Projects

Edit `data/portfolio.ts` to add or modify portfolio projects.

### Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Theme colors and fonts can be customized in the Tailwind config

### Contact Form

The contact form currently shows a success message. To implement actual email sending:

1. Create an API route in `app/api/contact/route.ts`
2. Update the form submission handler in `components/sections/Contact.tsx`
3. Use a service like SendGrid, Mailgun, or your existing PHP backend

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

Build the production version:

```bash
npm run build
npm start
```

## License

© 2025 ResponsiveWorks. All rights reserved.
