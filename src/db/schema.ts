<<<<<<< HEAD
import {integer, pgTable, pgEnum, date} from "drizzle-orm/pg-core";
=======
import {integer, pgTable, pgEnum, date, text, timestamp, uuid} from "drizzle-orm/pg-core";

>>>>>>> 978af04 (Initial commit)

export const planEnum = pgEnum("plan", ["free", "basic", "premium"]);
export const subscriptionEnum = pgEnum("subscription_type", ["monthly", "yearly"]);
export const subscriptionsTable = pgTable("subscriptions", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    startDate: date().notNull(),
    endDate: date(),
    type: subscriptionEnum().notNull(),
    plan: planEnum().notNull().default("free"),
});

<<<<<<< HEAD
=======

export const kyc = pgTable("kyc", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(), // Clerk userId
    groupName: text("group_name").notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    bvn: text("bvn"),
    nin: text("nin"),
    phone: text("phone"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
  });
>>>>>>> 978af04 (Initial commit)
