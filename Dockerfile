# Builder
FROM node:18-alpine AS builder
ARG APP_ENV
ARG GIT_SHA
ARG GIT_TAG
ARG TRUFFLE_APIKEY
ENV NODE_ENV production
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .

RUN cd /app && echo 'YARN VERSION IN BUILDER: ' && yarn --version
RUN if [ ${APP_ENV} = "dev" ] ; then cp .env.dev .env.production ; elif [ ${APP_ENV} = "prod" ] ; then cp .env.prod .env.production ; elif [ ${APP_ENV} = "test" ] ; then cp .env.test .env.production ; else exit 1 ; fi
RUN echo "NEXT_PUBLIC_GIT_SHA=${GIT_SHA}" >> .env
RUN echo "NEXT_PUBLIC_GIT_TAG=${GIT_TAG}" >> .env
RUN echo "NEXT_PUBLIC_TRUFFLE_APIKEY=${TRUFFLE_APIKEY}" >> .env
RUN yarn rebuild && yarn build

# Runner
FROM node:18-alpine AS runner

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

ENV NODE_ENV production
WORKDIR /app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/.pnp.cjs ./.pnp.cjs
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/.env.production ./.env.production

RUN rm -rf /app/.yarn/unplugged && yarn rebuild
RUN chown -R nextjs:nodejs /app/.next
RUN echo "YARN VERSION IN RUNNER: " && yarn --version

USER nextjs

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
