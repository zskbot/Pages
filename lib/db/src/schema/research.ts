import { pgTable, text, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const selfHealingTable = pgTable("self_healing_data", {
  platform: text("platform").primaryKey(),
  loopStructure: text("loop_structure").notNull(),
  errorDetection: text("error_detection").notNull(),
  patchingMethod: text("patching_method").notNull(),
  stoppingCondition: text("stopping_condition").notNull(),
  iterationsTypical: integer("iterations_typical").notNull(),
  hasWatchdog: boolean("has_watchdog").notNull().default(false),
});

export const automationPipelineTable = pgTable("automation_pipeline", {
  stage: text("stage").primaryKey(),
  description: text("description").notNull(),
  platformCount: integer("platform_count").notNull(),
  platforms: text("platforms").notNull(),
});

export const newsItemsTable = pgTable("news_items", {
  id: text("id").primaryKey(),
  date: text("date").notNull(),
  platform: text("platform").notNull(),
  headline: text("headline").notNull(),
  summary: text("summary").notNull(),
  tag: text("tag").notNull(),
  impact: text("impact").notNull(),
});

export const insertSelfHealingSchema = createInsertSchema(selfHealingTable);
export const insertAutomationPipelineSchema = createInsertSchema(automationPipelineTable);
export const insertNewsItemSchema = createInsertSchema(newsItemsTable);

export type SelfHealingData = typeof selfHealingTable.$inferSelect;
export type AutomationPipeline = typeof automationPipelineTable.$inferSelect;
export type NewsItem = typeof newsItemsTable.$inferSelect;
export type InsertSelfHealingData = z.infer<typeof insertSelfHealingSchema>;
