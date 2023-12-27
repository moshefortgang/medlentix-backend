/*
  Warnings:

  - A unique constraint covering the columns `[MichrazID,MitchamName,SchumZchiya,ShemZoche]` on the table `Michraz` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gush,helka,tatHelka,saleDate,declaredValueInShekel,area,rooms]` on the table `RealEstateTransactions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "city" INTEGER;

-- CreateTable
CREATE TABLE "RealEstateTransactionsNadlanGov" (
    "id" SERIAL NOT NULL,
    "dealDateTime" TIMESTAMP(3) NOT NULL,
    "fullAddress" TEXT,
    "displayAddress" TEXT,
    "gush" INTEGER,
    "helka" INTEGER,
    "tatHelka" INTEGER,
    "dealNatureDescription" TEXT,
    "assetRoomNum" TEXT NOT NULL,
    "floorNo" TEXT,
    "dealNature" TEXT NOT NULL,
    "dealAmount" TEXT NOT NULL,
    "newProjectText" TEXT,
    "projectName" TEXT,
    "buildingYear" TEXT,
    "yearBuilt" TEXT,
    "buildingFloors" TEXT,
    "keyValue" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "polygonId" TEXT NOT NULL,
    "trendIsNegative" BOOLEAN NOT NULL,
    "trendFormat" TEXT,

    CONSTRAINT "RealEstateTransactionsNadlanGov_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Michraz_MichrazID_MitchamName_SchumZchiya_ShemZoche_key" ON "Michraz"("MichrazID", "MitchamName", "SchumZchiya", "ShemZoche");

-- CreateIndex
CREATE UNIQUE INDEX "RealEstateTransactions_gush_helka_tatHelka_saleDate_declare_key" ON "RealEstateTransactions"("gush", "helka", "tatHelka", "saleDate", "declaredValueInShekel", "area", "rooms");
