-- CreateEnum
CREATE TYPE "GuitarType" AS ENUM ('electro', 'acoustics', 'ukukule');

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "photo" TEXT,
    "type" "GuitarType" NOT NULL DEFAULT 'electro',
    "article" TEXT,
    "StringCount" INTEGER NOT NULL,
    "Price" INTEGER,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "products_article_idx" ON "products"("article");

-- CreateIndex
CREATE INDEX "users_email_login_idx" ON "users"("email", "login");
