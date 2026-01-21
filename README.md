# ProdLens MVP

A modern product management dashboard built with Next.js 15, React 19, and Tailwind CSS. Features a complete set of pages with form validations, dark/light theme support, and SEO optimization.

## Features

- **Dashboard** - Project overview with dossier cards and quick access
- **Project Management** - Full CRUD operations with search and filtering
- **Team Management** - Add, edit, and manage team members
- **Task Board** - Kanban-style favorites with drag between columns
- **Dossier Tracking** - Organize and track project dossiers
- **Settings** - Profile, notifications, security, appearance preferences
- **Help Center** - Searchable FAQ with category filtering
- **Report System** - Bug reports and feature requests
- **Payment & Billing** - Pricing plans and checkout flow
- **Authentication** - Login and registration pages
- **Dark/Light Mode** - Theme toggle with system preference support
- **Form Validations** - Comprehensive client-side validation
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** - Metadata, sitemap, and robots.txt

## Requirements

- **Node.js**: >= 20.0.0 (compatible with Node 24)
- **npm**: >= 10.0.0 (or yarn/pnpm/bun)

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd prodlens-mvp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | Home page with project cards and search |
| `/my-projects` | My Projects | Project management with CRUD operations |
| `/my-teams` | My Teams | Team member management |
| `/favorites` | Favorites | Kanban-style task board |
| `/all-dossiers` | All Dossiers | Dossier listing and management |
| `/settings` | Settings | User preferences and account settings |
| `/help` | Help Center | FAQ and support resources |
| `/report` | Report | Bug reports and feature requests |
| `/payment` | Payment | Pricing plans and checkout |
| `/login` | Login | Authentication (login/signup) |

## Project Structure

```
prodlens-mvp/
├── src/
│   └── app/
│       ├── layout.tsx            # Root layout with SEO metadata
│       ├── LayoutWrapper.tsx     # Client-side layout with theme provider
│       ├── page.tsx              # Home/Dashboard page
│       ├── globals.css           # Global styles, CSS variables, dark mode
│       ├── Sidebar.tsx           # Navigation sidebar with theme toggle
│       ├── sitemap.ts            # Dynamic sitemap generation
│       ├── robots.ts             # Robots.txt configuration
│       ├── context/
│       │   └── ThemeContext.tsx  # Dark/light theme management
│       ├── assets/               # Static images
│       ├── components/           # Shared React components
│       │   ├── Header.tsx
│       │   ├── SearchBar.tsx
│       │   ├── Card.tsx
│       │   ├── Button.tsx
│       │   ├── StatusLabel.tsx
│       │   ├── MenuBar.tsx
│       │   ├── Title.tsx
│       │   └── cardsData.ts
│       ├── my-projects/          # Project management page
│       ├── my-teams/             # Team management page
│       ├── favorites/            # Task board page
│       ├── all-dossiers/         # Dossiers listing page
│       ├── settings/             # Settings page
│       ├── help/                 # Help center page
│       ├── report/               # Report page
│       ├── payment/              # Payment page
│       └── login/                # Authentication page
├── public/
│   └── manifest.json             # PWA manifest
├── tailwind.config.ts            # Tailwind CSS with dark mode
├── tsconfig.json                 # TypeScript configuration
├── next.config.mjs               # Next.js configuration
└── package.json
```

## Form Validations

All forms include comprehensive client-side validation:

### My Projects
- Project name: Required, 3-50 characters
- Description: Required, 10-500 characters
- Due date: Required, cannot be in the past

### My Teams
- Name: Required, minimum 2 characters
- Role: Required
- Email: Required, valid email format

### Favorites (Tasks)
- Task name: Required, 3-100 characters

### Settings - Profile
- Full name: Required, minimum 2 characters
- Email: Required, valid email format
- Phone: Valid phone format (optional)

### Settings - Security
- Current password: Required
- New password: Minimum 8 characters, must contain uppercase, lowercase, and number
- Confirm password: Must match new password

### Report
- Report type: Required selection
- Subject: Required, 5-100 characters
- Description: Required, 20-2000 characters
- Email: Valid email format (optional)

### Payment
- Card number: Required, 16 digits
- Cardholder name: Required, minimum 3 characters
- Expiry date: Required, valid future date (MM/YY)
- CVV: Required, 3-4 digits

### Login/Signup
- Email: Required, valid email format
- Password: Required, minimum 8 characters
- Name (signup): Required, minimum 2 characters
- Confirm password (signup): Must match password

## Dark/Light Mode

The app supports both light and dark themes:

### Toggle Methods
1. **Sidebar** - Click the sun/moon icon
2. **Settings** - Go to Settings > Appearance

### Features
- Persists preference to localStorage
- Respects system color scheme preference
- Smooth transitions between themes
- All pages fully support both modes

### Using Theme in Components

```tsx
"use client";
import { useTheme } from "@/app/context/ThemeContext";

export default function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

### CSS Variables

Theme colors are defined as CSS variables in `globals.css`:

```css
:root {
  --background: #f0f4f7;
  --foreground: #171717;
  --custom-text: #4b4b4b;
  --card-bg: #ffffff;
  --sidebar-bg: #ffffff;
  --border-color: #dbdbdb;
}

.dark {
  --background: #1a1a2e;
  --foreground: #e4e4e7;
  --custom-text: #d1d5db;
  --card-bg: #16213e;
  --sidebar-bg: #0f3460;
  --border-color: #374151;
}
```

## Development Guidelines

### Adding New Pages

Create a new folder under `src/app/` with a `page.tsx` file:

```tsx
// src/app/new-page/page.tsx
export default function NewPage() {
  return <div>New Page Content</div>;
}
```

### Adding Page-Specific Metadata

Use the Next.js Metadata API for SEO:

```tsx
// src/app/new-page/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description for SEO",
};

export default function NewPage() {
  return <div>New Page Content</div>;
}
```

### Using Client Components

Add `"use client"` directive at the top of files that need browser APIs:

```tsx
"use client";

import { useState } from "react";

export default function InteractiveComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Styling with Tailwind CSS

Use Tailwind utility classes with dark mode variants:

```tsx
<div className="bg-card-bg dark:bg-gray-800 text-custom-text p-4 rounded-lg">
  <span className="text-[#051F61] dark:text-white font-semibold">Content</span>
</div>
```

### Path Aliases

TypeScript path aliases are configured for cleaner imports:

```tsx
import Component from "@/app/components/Component";
import image from "@assets/image.png";
```

## Environment Variables

Create a `.env.local` file for local development:

```env
# Base URL for sitemap and SEO (optional, defaults to https://prodlens.com)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Deployment

### Vercel (Recommended)

Deploy with one click using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Docker

```dockerfile
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

### Other Platforms

The app can be deployed to any platform supporting Node.js:
- AWS (Amplify, EC2, ECS)
- Google Cloud (Cloud Run, App Engine)
- Railway
- Render
- DigitalOcean App Platform

## SEO Configuration

SEO is configured in `src/app/layout.tsx` with:
- Page titles and descriptions
- Open Graph tags for social sharing
- Twitter Card metadata
- Dynamic sitemap at `/sitemap.xml`
- Robots.txt at `/robots.txt`

To add SEO assets, place these files in the `public/` folder:
- `favicon.ico` - Browser favicon
- `og-image.png` - Open Graph image (1200x630px)
- `apple-touch-icon.png` - Apple touch icon (180x180px)
- `icon-192.png` - PWA icon (192x192px)
- `icon-512.png` - PWA icon (512x512px)

## Data Persistence

The app uses localStorage for client-side data persistence:

| Key | Description |
|-----|-------------|
| `theme` | User's theme preference (light/dark) |
| `projects` | Project data for My Projects page |
| `favoriteTasks` | Task data for Favorites page |
| `userSettings` | User profile and preferences |

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run linting: `npm run lint`
4. Build to verify: `npm run build`
5. Commit your changes: `git commit -m "Add your feature"`
6. Push to branch: `git push origin feature/your-feature`
7. Open a Pull Request

## License

This project is private and proprietary.
