# Multi-stage Node build.
#
# WHY a builder stage?  TypeScript (`tsc`) lives under
# devDependencies, so `npm install --production` leaves
# the image without `tsc` and `npm run build` then fails
# with `sh: tsc: not found`.  We install ALL deps, build,
# then copy only what's needed into the runtime image.
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
# Install every dep, including dev, so `tsc` is present.
# `--no-audit --no-fund` quietens the npm log noise.
RUN npm install --no-audit --no-fund
COPY . .
# Tolerate projects without a build script — some MCPs
# are pure JS / no transpile step.
RUN npm run build --if-present
# Drop devDependencies once the build is done so the
# final image stays small.
RUN npm prune --production

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app /app
EXPOSE 3500
CMD ["npm", "start"]
