#!/bin/bash
set -e

pnpm install --frozen-lockfile

pnpm --filter @workspace/db run push

# Push to GitHub mirror — only when running on the main branch
CURRENT_BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null || echo "")
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "Not on main branch (got: '$CURRENT_BRANCH') — skipping GitHub push"
  exit 0
fi

if [ -z "$GITHUB_TOKEN" ]; then
  echo "ERROR: GITHUB_TOKEN secret is not set — GitHub mirror push cannot run." >&2
  echo "Add a GitHub Personal Access Token with 'repo' scope to Replit Secrets as GITHUB_TOKEN." >&2
  exit 1
fi

# Build the authenticated remote URL once (not stored in git config or remotes)
GITHUB_URL="https://${GITHUB_TOKEN}@github.com/dotcom-03/auren-os.git"

# Fetch remote state so --force-with-lease can compare correctly
git fetch "$GITHUB_URL" main:refs/remotes/github-mirror/main 2>/dev/null || true

# Mirror Replit main → GitHub main
# --force-with-lease ensures we never silently overwrite concurrent remote changes;
# the fetch above keeps the lease ref fresh so this is not a blind force push.
# Lease is scoped to the destination ref (refs/heads/main on the remote) as tracked
# by our freshly-fetched local ref refs/remotes/github-mirror/main.
git push "$GITHUB_URL" HEAD:main --force-with-lease=refs/heads/main:refs/remotes/github-mirror/main

# Clean up the temporary tracking ref
git update-ref -d refs/remotes/github-mirror/main 2>/dev/null || true
