/*
  Warnings:

  - You are about to drop the column `projectId` on the `Project` table. All the data in the column will be lost.
  - The `locality` column on the `RealEstateTransactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Block" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "projectId",
ADD COLUMN     "michrazId" INTEGER,
ADD COLUMN     "shchuna" TEXT;

-- AlterTable
ALTER TABLE "RealEstateTransactions" DROP COLUMN "locality",
ADD COLUMN     "locality" INTEGER;

-- CreateTable
CREATE TABLE "Michraz" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "MichrazID" INTEGER NOT NULL,
    "MitchamName" TEXT NOT NULL,
    "SchumZchiya" INTEGER NOT NULL,
    "ShemZoche" TEXT NOT NULL,
    "Kibolet" INTEGER NOT NULL,
    "HotzaotPituach" INTEGER NOT NULL,
    "VaadaDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Michraz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cities" (
    "id" SERIAL NOT NULL,
    "settlementCode" INTEGER NOT NULL,
    "settlementName" TEXT NOT NULL,
    "settlementNameEnglish" TEXT NOT NULL,
    "districtCode" INTEGER NOT NULL,
    "districtName" TEXT NOT NULL,
    "ministryDistrictCode" INTEGER NOT NULL,
    "ministryDistrict" TEXT NOT NULL,
    "regionalCouncilCode" INTEGER NOT NULL,
    "regionalCouncilName" TEXT,

    CONSTRAINT "Cities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_michrazId_fkey" FOREIGN KEY ("michrazId") REFERENCES "Michraz"("id") ON DELETE SET NULL ON UPDATE CASCADE;
