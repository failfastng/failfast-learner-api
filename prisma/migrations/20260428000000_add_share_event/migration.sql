CREATE TABLE "ShareEvent" (
  "id"           SERIAL PRIMARY KEY,
  "session_uuid" TEXT NOT NULL,
  "created_at"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
