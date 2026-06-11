Deployment checklist for MAGELANGVERSE-ID

- Environment variables (backend):
  - `DATABASE_URL` -> Prisma Postgres/SQLite connection string
  - `REDIS_URL` -> Redis connection (optional but recommended)
  - `OPENAI_API_KEY` -> For AI features (optional)
  - `NEXT_PUBLIC_API_URL` -> Frontend runtime API base URL for SSR builds
  - `JWT_SECRET` -> Signing key for auth tokens
  - `NODE_ENV` -> production

- Storage:
  - `uploads/` directory persisted or use external object storage (S3, GCS) with rewrite of `/api/uploads` handlers
  - Configure CORS and allowed origins

- Security:
  - Rotate `JWT_SECRET` and keep secure
  - Ensure HTTPS termination at load balancer
  - Rate-limit public endpoints
  - Configure CSP headers, XSS protections

- Scaling:
  - Run multiple backend instances behind a load balancer
  - Use Redis instance for shared cache
  - Use managed DB with pooling

- CI/CD:
  - Run `npm test` for backend and `npm run build` for frontend in pipeline
  - Run E2E smoke tests: create->approve->list

- Rollback plan:
  - Keep schema migrations reversible or support feature flags
  - DB backups before schema changes

- Post-deploy checks:
  - Verify `/api/health` returns status ok
  - Verify key pages load (/, /kuliner, /wisata, /admin)
  - Check logs for errors

- Notes:
  - Large uploads are allowed by app but storage provider may impose limits; consider server-side streaming for very large files
  - Consider using signed upload URLs for direct-to-object-storage uploads
