/*
  Warnings:

  - You are about to drop the column `userId` on the `HomeAddress` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `FavoriteFacility` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `HomeAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HomeAddress" DROP CONSTRAINT "HomeAddress_userId_fkey";

-- DropIndex
DROP INDEX "HomeAddress_userId_key";

-- AlterTable
ALTER TABLE "FavoriteFacility" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "HomeAddress" DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "homeAddressId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_homeAddressId_fkey" FOREIGN KEY ("homeAddressId") REFERENCES "HomeAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
