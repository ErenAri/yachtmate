/*
  Warnings:

  - Added the required column `updatedAt` to the `Yacht` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "YachtImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fileName" TEXT NOT NULL,
    "yachtId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "YachtImage_yachtId_fkey" FOREIGN KEY ("yachtId") REFERENCES "Yacht" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Yacht" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Yacht" ("createdAt", "description", "id", "image", "location", "name", "price") SELECT "createdAt", "description", "id", "image", "location", "name", "price" FROM "Yacht";
DROP TABLE "Yacht";
ALTER TABLE "new_Yacht" RENAME TO "Yacht";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
