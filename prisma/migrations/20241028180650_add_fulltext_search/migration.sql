-- CreateIndex
CREATE FULLTEXT INDEX `products_name_description_tag_idx` ON `products`(`name`, `description`, `tag`);
