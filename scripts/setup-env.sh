#!/bin/bash

# EUDR Platform Environment Setup Script

echo "🚀 Setting up EUDR Platform environment..."

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists. Backing up to .env.local.backup"
    cp .env.local .env.local.backup
fi

# Copy example environment file
echo "📋 Copying .env.example to .env.local..."
cp .env.example .env.local

# Generate NextAuth secret
echo "🔐 Generating NextAuth secret..."
if command -v openssl &> /dev/null; then
    NEXTAUTH_SECRET=$(openssl rand -base64 32)
    # Replace the placeholder in .env.local
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/generate-a-secure-secret-key/$NEXTAUTH_SECRET/" .env.local
    else
        # Linux
        sed -i "s/generate-a-secure-secret-key/$NEXTAUTH_SECRET/" .env.local
    fi
    echo "✅ Generated NextAuth secret"
else
    echo "⚠️  OpenSSL not found. Please manually generate a secret for NEXTAUTH_SECRET"
fi

echo ""
echo "✅ Environment setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Review and update .env.local with your Directus URL"
echo "2. Set up your Directus instance (Cloud or self-hosted)"
echo "3. Start the development server: npm run dev"
echo ""
echo "🔗 Useful URLs:"
echo "- Next.js App: http://localhost:3000"
echo "- Directus Cloud: https://directus.cloud"
echo ""
echo "📖 For more information, see README.md"
