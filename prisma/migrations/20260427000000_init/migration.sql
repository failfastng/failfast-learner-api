-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "session_uuid" TEXT NOT NULL,
    "display_name_hash" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "last_activity_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3) NOT NULL,
    "ended_early" BOOLEAN NOT NULL DEFAULT false,
    "questions_answered" INTEGER NOT NULL,
    "questions_abandoned" INTEGER NOT NULL,
    "total_points" INTEGER NOT NULL,
    "success_points" INTEGER NOT NULL,
    "grit_points" INTEGER NOT NULL,
    "completed_waitlist_signup" BOOLEAN NOT NULL DEFAULT false,
    "clicked_share" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionOutcome" (
    "id" SERIAL NOT NULL,
    "session_uuid" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "success_points_earned" INTEGER NOT NULL,
    "grit_points_earned" INTEGER NOT NULL,
    "resolved_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionOutcome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaitlistSignup" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaitlistSignup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResetEvent" (
    "id" SERIAL NOT NULL,
    "session_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResetEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_session_uuid_key" ON "Session"("session_uuid");

-- CreateIndex
CREATE INDEX "Session_subject_idx" ON "Session"("subject");

-- CreateIndex
CREATE INDEX "Session_ended_at_idx" ON "Session"("ended_at");

-- CreateIndex
CREATE INDEX "QuestionOutcome_session_uuid_idx" ON "QuestionOutcome"("session_uuid");

-- CreateIndex
CREATE INDEX "QuestionOutcome_question_id_idx" ON "QuestionOutcome"("question_id");

-- CreateIndex
CREATE INDEX "QuestionOutcome_outcome_idx" ON "QuestionOutcome"("outcome");

-- CreateIndex
CREATE UNIQUE INDEX "WaitlistSignup_email_key" ON "WaitlistSignup"("email");

-- AddForeignKey
ALTER TABLE "QuestionOutcome" ADD CONSTRAINT "QuestionOutcome_session_uuid_fkey" FOREIGN KEY ("session_uuid") REFERENCES "Session"("session_uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
