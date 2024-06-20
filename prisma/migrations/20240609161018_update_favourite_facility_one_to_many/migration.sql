/*
  Warnings:

  - You are about to drop the column `userId` on the `FavoriteFacility` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FavoriteFacility" DROP CONSTRAINT "FavoriteFacility_userId_fkey";

-- DropIndex
DROP INDEX "FavoriteFacility_userId_key";

-- AlterTable
ALTER TABLE "FavoriteFacility" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favoriteFacilityId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_favoriteFacilityId_fkey" FOREIGN KEY ("favoriteFacilityId") REFERENCES "FavoriteFacility"("id") ON DELETE SET NULL ON UPDATE CASCADE;
