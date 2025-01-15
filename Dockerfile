# Base image for Node.js
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package manager files to install dependencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./ 
COPY .env.prd /app/.env.prd

# Install dependencies using the appropriate package manager
RUN npm i -f

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN rm .env

RUN mv .env.prd .env 

# Disable telemetry during the build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_SKIP_BUILD_LINT=true

# Build the application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Disable telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set permissions for the `.next` directory
RUN chown -R nextjs:nodejs ./public
RUN mkdir -p .next && chown nextjs:nodejs .next

# Set user to non-root
USER nextjs

# Expose the default Next.js port
EXPOSE 80
ENV PORT=80

# Use JSON syntax for CMD
CMD ["node", "server.js"]
