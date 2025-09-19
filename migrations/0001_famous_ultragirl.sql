CREATE TABLE "kyc" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"group_name" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"bvn" text,
	"nin" text,
	"phone" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
