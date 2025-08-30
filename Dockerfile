# Builder
FROM node:22-alpine AS builder
ARG APP_ENV
ARG GIT_SHA
ARG GIT_TAG
ARG TRUFFLE_APIKEY
ENV NODE_ENV production
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
# yarn.lock에 명시된 버전 그대로 의존성을 설치합니다.
RUN yarn install --frozen-lockfile

RUN cd /app && echo 'YARN VERSION IN BUILDER: ' && yarn --version
RUN if [ ${APP_ENV} = "dev" ] ; then cp .env.dev .env.production ; elif [ ${APP_ENV} = "prod" ] ; then cp .env.prod .env.production ; elif [ ${APP_ENV} = "test" ] ; then cp .env.test .env.production ; else exit 1 ; fi
RUN echo "NEXT_PUBLIC_GIT_SHA=${GIT_SHA}" >> .env
RUN echo "NEXT_PUBLIC_GIT_TAG=${GIT_TAG}" >> .env
RUN echo "NEXT_PUBLIC_TRUFFLE_APIKEY=${TRUFFLE_APIKEY}" >> .env
RUN yarn rebuild && yarn build

# Runner
FROM node:22-alpine AS runner

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

ENV NODE_ENV production
WORKDIR /app

COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/.yarn ./.yarn
COPY --from=builder --chown=nextjs:nodejs /app/yarn.lock ./yarn.lock
COPY --from=builder --chown=nextjs:nodejs /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder --chown=nextjs:nodejs /app/.pnp.cjs ./.pnp.cjs
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.env ./.env
COPY --from=builder --chown=nextjs:nodejs /app/.env.production ./.env.production

RUN chown -R nextjs:nodejs /app

USER nextjs

RUN rm -rf /app/.yarn/unplugged && yarn rebuild
RUN echo "YARN VERSION IN RUNNER: " && yarn --version

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
