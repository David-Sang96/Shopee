CREATE TABLE "product_variants" (
	"id" serial PRIMARY KEY NOT NULL,
	"color" text NOT NULL,
	"productType" text NOT NULL,
	"updated" timestamp DEFAULT now(),
	"productID" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE "variant_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"imageUrl" text NOT NULL,
	"name" text NOT NULL,
	"size" text NOT NULL,
	"order" real NOT NULL,
	"variantID" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE "variant_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"tag" text NOT NULL,
	"variantID" serial NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_productID_products_id_fk" FOREIGN KEY ("productID") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variant_images" ADD CONSTRAINT "variant_images_variantID_product_variants_id_fk" FOREIGN KEY ("variantID") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variant_tags" ADD CONSTRAINT "variant_tags_variantID_product_variants_id_fk" FOREIGN KEY ("variantID") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;