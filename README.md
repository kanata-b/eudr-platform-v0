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
- `NEXTAUTH_SECRET`: Generated secret key
- `NEXTAUTH_URL`: Your application URL (default: http://localhost:3000)

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Demo Mode

The application includes a comprehensive demo mode with mock data stored in localStorage:

- **Automatic Setup**: Mock data loads automatically on first visit
- **Persistent Storage**: Data survives browser refresh
- **Realistic Scenarios**: Coffee and cocoa supply chain examples
- **Complete CRUD**: Full create, read, update, delete operations
- **No Backend Required**: Perfect for demos and development

### Mock Data Includes:
- Organizations (Coffee & Cocoa exporters)
- Customers (European buyers)
- Products (Coffee & Cocoa beans)
- Suppliers (Farms & Cooperatives)
- Raw Materials (Coffee cherries & Cocoa pods)
- Origins (Brazil & Ghana locations)
- Risk Assessments (Various risk levels)
- Due Diligence Statements (Different compliance states)

## Features

- 🏢 **Organization Management** - Manage company information
- 👥 **Customer Management** - Track customer relationships
- 📦 **Product Management** - Catalog products and materials
- 🏭 **Supplier Management** - Supplier verification and tracking
- 🌍 **Origin Tracking** - Geographic origin management
- ⚠️ **Risk Assessment** - Compliance risk evaluation
- 📋 **Due Diligence** - Statement generation and management
- 📊 **Dashboard Analytics** - Compliance overview and statistics
- 🎯 **Demo Mode** - Complete offline demo with mock data

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: shadcn/ui, Tailwind CSS
- **API**: tRPC for type-safe APIs
- **Authentication**: NextAuth.js
- **Storage**: localStorage for demo mode
- **State Management**: TanStack Query (React Query)
- **Validation**: Zod schemas
- **Styling**: Tailwind CSS with dark mode support

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
| `NEXTAUTH_URL` | Application base URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | NextAuth encryption secret | Required |

## API Structure

The application uses tRPC for type-safe API calls with the following routers:

- **Organizations** - `/api/trpc/organization.*`
- **Customers** - `/api/trpc/customer.*`
- **Products** - `/api/trpc/product.*`
- **Suppliers** - `/api/trpc/supplier.*`
- **Raw Materials** - `/api/trpc/rawMaterial.*`
- **Origins** - `/api/trpc/origin.*`
- **Risk Assessments** - `/api/trpc/riskAssessment.*`
- **Due Diligence** - `/api/trpc/dueDiligence.*`
- **Dashboard** - `/api/trpc/dashboard.*`

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── (dashboard)/       # Dashboard pages
│   ├── api/trpc/          # tRPC API routes
│   └── auth/              # Authentication pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── dashboard/        # Dashboard components
│   └── [entity]/         # Entity-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── server/           # Server-side utilities
│   ├── validations/      # Zod validation schemas
│   ├── mock-data.ts      # Demo mock data
│   ├── mock-api.ts       # Mock API implementation
│   └── local-storage.ts  # localStorage utilities
├── types/                # TypeScript type definitions
└── styles/               # Global styles
\`\`\`

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

## Demo Usage

Perfect for:
- **Sales Demonstrations** - Realistic EUDR compliance scenarios
- **User Testing** - Consistent data across test sessions
- **Development** - No backend setup required
- **Training** - Standardized demo environment
- **Prototyping** - Quick setup for stakeholder reviews

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## License

This project is licensed under the MIT License.
