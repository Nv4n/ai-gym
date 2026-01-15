-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "ai_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" text,
	"data" json,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"type" "ai_category" NOT NULL
);

*/