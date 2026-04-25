#!/usr/bin/env bash
set -euo pipefail
DATE=$(date -u +%Y-%m-%d_%H-%M-%S)
DUMP=/tmp/pgdump_${DATE}.sql.gz
docker exec postgres pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" | gzip > "$DUMP"
oci os object put \
  --bucket-name failfast-backups \
  --file "$DUMP" \
  --name "daily/pgdump_${DATE}.sql.gz" \
  --force
rm "$DUMP"
# Retention: 30 days (configured via bucket lifecycle rule)
