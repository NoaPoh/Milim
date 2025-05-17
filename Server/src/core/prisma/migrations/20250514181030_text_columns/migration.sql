ALTER TABLE "Word" RENAME COLUMN "text" TO "originalText";

ALTER TABLE "Word" ADD COLUMN "translatedText" TEXT NOT NULL DEFAULT '';