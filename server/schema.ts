import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

export const RoleEnum = pgEnum("roles", ["user", "admin"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false),
  role: RoleEnum("roles").default("user"),
});

export const accounts = pgTable(
  "account",
  {
    // { onDelete: "cascade" } this helps to delete all data when user delete his account
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const emailVerificationToken = pgTable(
  "email_verification_token",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => createId()),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    email: text("email").notNull(),
  },
  (vt) => ({ compoundKey: primaryKey({ columns: [vt.id, vt.token] }) })
);

export const passwordResetToken = pgTable(
  "password_reset_token",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => createId()),
    token: text("token").notNull(),
    email: text("email").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({ compoundKey: primaryKey({ columns: [vt.id, vt.token] }) })
);

export const twoFactorCode = pgTable(
  "two_factor_code",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => createId()),
    code: text("code").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    email: text("email").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (code) => ({
    compoundKey: primaryKey({ columns: [code.id, code.code] }),
  })
);

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  title: text("title").notNull(),
  price: real("price").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

export const productVariants = pgTable("product_variants", {
  id: serial("id").primaryKey(),
  color: text("color").notNull(),
  productType: text("productType").notNull(),
  updated: timestamp("updated").defaultNow(),
  productID: serial("productID")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
});

export const variantImages = pgTable("variant_images", {
  id: serial("id").primaryKey(),
  imageUrl: text("imageUrl").notNull(),
  name: text("name").notNull(),
  size: text("size").notNull(),
  order: real("order").notNull(),
  variantID: serial("variantID")
    .notNull()
    .references(() => productVariants.id, {
      onDelete: "cascade",
    }),
});

export const variantTags = pgTable("variant_tags", {
  id: serial("id").primaryKey(),
  tag: text("tag").notNull(),
  variantID: serial("variantID")
    .notNull()
    .references(() => productVariants.id, { onDelete: "cascade" }),
});

export const productsRelations = relations(products, ({ many, one }) => ({
  productVariants: many(productVariants, {
    relationName: "productsRelations",
  }),
}));

export const productVariantsRelations = relations(
  productVariants,
  ({ many, one }) => ({
    product: one(products, {
      fields: [productVariants.productID],
      references: [products.id],
      relationName: "productVariantsRelations",
    }),
    variantImages: many(variantImages, { relationName: "variantImages" }),
    variantTags: many(variantTags, { relationName: "variantTags" }),
  })
);

export const variantImagesRelations = relations(
  variantImages,
  ({ many, one }) => ({
    productVariant: one(productVariants, {
      fields: [variantImages.variantID],
      references: [productVariants.id],
      relationName: "variantImages",
    }),
  })
);

export const variantTagsRelations = relations(variantTags, ({ many, one }) => ({
  productVariant: one(productVariants, {
    fields: [variantTags.variantID],
    references: [productVariants.id],
    relationName: "variantTags",
  }),
}));
