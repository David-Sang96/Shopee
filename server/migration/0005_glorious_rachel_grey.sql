CREATE TABLE "two_factor_code" (
	"id" text NOT NULL,
	"code" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL,
	"userId" text NOT NULL,
	CONSTRAINT "two_factor_code_id_code_pk" PRIMARY KEY("id","code")
);
--> statement-breakpoint
ALTER TABLE "two_factor_code" ADD CONSTRAINT "two_factor_code_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;