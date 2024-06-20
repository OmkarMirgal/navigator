-- CreateTable
CREATE TABLE "FavoriteFacility" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "facilityId" INTEGER NOT NULL,
    "facilityType" TEXT NOT NULL,

    CONSTRAINT "FavoriteFacility_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteFacility_userId_key" ON "FavoriteFacility"("userId");

-- AddForeignKey
ALTER TABLE "FavoriteFacility" ADD CONSTRAINT "FavoriteFacility_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
