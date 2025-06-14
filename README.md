# EUDR Platform

European Union Deforestation Regulation compliance platform for exporters.

## Quick Start

### 1. Environment Setup

\`\`\`bash
# Copy environment template
cp .env.example .env.local

# Generate NextAuth secret
openssl rand -base64 32
\`\`\`

Update `.env.local` with your values:
- `NEXT_PUBLIC_DIRECTUS_URL`: Your Directus instance URL
- `NEXTAUTH_SECRET`: Generated secret key

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Directus Setup

This application connects to a Directus backend via the public API. You can:

### Option 1: Use Directus Cloud
1. Create account at [directus.cloud](https://directus.cloud)
2. Create new project
3. Copy your project URL to `NEXT_PUBLIC_DIRECTUS_URL`

### Option 2: Self-hosted Directus
1. Install Directus: `npm install -g @directus/cli`
2. Create project: `npx create-directus-project my-project`
3. Start Directus: `cd my-project && npx directus start`
4. Set `NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055`

### Required Collections

The application expects these Directus collections:
- `organizations`
- `customers` 
- `products`
- `suppliers`
- `raw_materials`
- `origins`
- `risk_assessments`
- `due_diligence_statements`

## Features

- 🏢 **Organization Management** - Manage company information
- 👥 **Customer Management** - Track customer relationships
- 📦 **Product Management** - Catalog products and materials
- 🏭 **Supplier Management** - Supplier verification and tracking
- 🌍 **Origin Tracking** - Geographic origin management
- ⚠️ **Risk Assessment** - Compliance risk evaluation
- 📋 **Due Diligence** - Statement generation and management

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Directus (Headless CMS)
- **UI**: shadcn/ui, Tailwind CSS
- **Authentication**: Directus Auth
- **API**: oRPC for type-safe APIs

## Development

\`\`\`bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
\`\`\`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_DIRECTUS_URL` | Directus instance URL | `http://localhost:8055` |
| `NEXTAUTH_URL` | Application base URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | NextAuth encryption secret | Required |
| `NEXT_PUBLIC_API_URL` | API endpoint URL | `http://localhost:3000/api` |

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Other Platforms

1. Build the application: `npm run build`
2. Set environment variables
3. Start with: `npm start`

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## License

This project is licensed under the MIT License.
