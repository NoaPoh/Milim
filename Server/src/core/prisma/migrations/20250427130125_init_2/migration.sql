/*
  Warnings:

  - You are about to drop the column `createdBySystem` on the `Category` table. All the data in the column will be lost.
  - Added the required column `price` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "createdBySystem";
