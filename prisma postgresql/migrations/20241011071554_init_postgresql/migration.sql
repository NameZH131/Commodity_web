-- CreateTable
CREATE TABLE "cars" (
    "user_id" INTEGER NOT NULL,
    "goods_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "goods" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "original_price" DECIMAL(10,2),
    "image_path" VARCHAR(255) NOT NULL,
    "onsale_time" TIMESTAMP(3),
    "offsale_time" TIMESTAMP(3),

    CONSTRAINT "goods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50),
    "password" VARCHAR(80) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR(255),
    "phone" VARCHAR(20),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "goods_id" ON "cars"("goods_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_cart_item" ON "cars"("user_id", "goods_id");

-- CreateIndex
CREATE UNIQUE INDEX "username" ON "users"("username");

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_ibfk_2" FOREIGN KEY ("goods_id") REFERENCES "goods"("id") ON DELETE CASCADE ON UPDATE CASCADE;
