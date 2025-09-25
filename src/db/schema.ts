import {integer, pgTable, pgEnum, date, text, timestamp, uuid} from "drizzle-orm/pg-core";


export const planEnum = pgEnum("plan", ["free", "basic", "premium"]);
export const subscriptionEnum = pgEnum("subscription_type", ["monthly", "yearly"]);
export const subscriptionsTable = pgTable("subscriptions", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    startDate: date().notNull(),
    endDate: date(),
    type: subscriptionEnum().notNull(),
    plan: planEnum().notNull().default("free"),
});


export const kyc = pgTable("kyc", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().unique(), // <-- add unique constraint
    groupName: text("group_name").notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    bvn: text("bvn"),
    nin: text("nin"),
    phone: text("phone"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
  });
