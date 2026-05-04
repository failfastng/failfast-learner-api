-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "session_uuid" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Review_source_idx" ON "Review"("source");

-- CreateIndex
CREATE INDEX "Review_created_at_idx" ON "Review"("created_at");
