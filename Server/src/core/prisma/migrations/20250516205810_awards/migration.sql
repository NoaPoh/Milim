-- CreateEnum
CREATE TYPE "AwardType" AS ENUM ('BACKGROUND_COLOR', 'PROFILE_ICON', 'ICON_BACKGROUND', 'ICON_FRAME');

-- AlterTable
ALTER TABLE "Word" ALTER COLUMN "translatedText" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Award" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "AwardType" NOT NULL,
    "price" INTEGER NOT NULL,
    "iconUrl" TEXT,

    CONSTRAINT "Award_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "awardId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_userId_awardId_key" ON "Purchase"("userId", "awardId");

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_awardId_fkey" FOREIGN KEY ("awardId") REFERENCES "Award"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
