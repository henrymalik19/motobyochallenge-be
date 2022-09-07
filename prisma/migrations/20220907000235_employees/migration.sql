-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT NOT NULL,
    "middleInitial" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "dateOfEmployment" TEXT NOT NULL,
    "status" "EmployeeStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_firstName_lastName_dateOfBirth_key" ON "employees"("firstName", "lastName", "dateOfBirth");
