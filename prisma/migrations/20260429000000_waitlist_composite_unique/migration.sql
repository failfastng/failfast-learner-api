-- Drop unique on email only; same email may join multiple form sources.
DROP INDEX IF EXISTS "WaitlistSignup_email_key";

-- Add website and learner fields.
ALTER TABLE "WaitlistSignup" ADD COLUMN     "name" TEXT;
ALTER TABLE "WaitlistSignup" ADD COLUMN     "message" TEXT;
ALTER TABLE "WaitlistSignup" ADD COLUMN     "school_size" TEXT;
ALTER TABLE "WaitlistSignup" ADD COLUMN     "session_uuid" TEXT;
ALTER TABLE "WaitlistSignup" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- One row per email + source (form source / canonical source string).
CREATE UNIQUE INDEX "WaitlistSignup_email_source_key" ON "WaitlistSignup"("email", "source");

CREATE INDEX "WaitlistSignup_source_idx" ON "WaitlistSignup"("source");
CREATE INDEX "WaitlistSignup_created_at_idx" ON "WaitlistSignup"("created_at");
