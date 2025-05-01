#!/usr/bin/env bash
set -e

echo "🔍 Running TypeScript check..."
npx tsc --noEmit

echo "🔍 Running ESLint..."
npx eslint . --ext .js,.jsx,.ts,.tsx

echo "🛠️  Building Next.js..."
npm run build

echo "✅ All checks passed!"
