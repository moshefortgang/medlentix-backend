-- CreateTable
CREATE TABLE "RealEstateTransactions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "gush" INTEGER,
    "helka" INTEGER,
    "tatHelka" INTEGER,
    "saleDate" TIMESTAMP(3),
    "declaredValueInShekel" INTEGER,
    "saleValueInShekel" INTEGER,
    "propertyType" TEXT,
    "soldPart" INTEGER,
    "locality" TEXT,
    "constructionYear" INTEGER,
    "area" TEXT,
    "rooms" INTEGER,
    "blockId" INTEGER,

    CONSTRAINT "RealEstateTransactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "projectId" INTEGER NOT NULL,
    "projectName" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Block" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "gush" INTEGER,
    "helka" INTEGER,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
