import { pgTable, text, integer, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const platformsTable = pgTable("platforms", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  keyDifferentiator: text("key_differentiator").notNull(),
  openSource: boolean("open_source").notNull().default(false),
  selfHosted: boolean("self_hosted").notNull().default(false),
  automationLevel: integer("automation_level").notNull(),
  deploymentType: text("deployment_type").notNull(),
});

export const platformComparisonsTable = pgTable("platform_comparisons", {
  platform: text("platform").primaryKey(),
  autonomy: integer("autonomy").notNull(),
  codeQuality: integer("code_quality").notNull(),
  infrastructure: integer("infrastructure").notNull(),
  selfHealing: integer("self_healing").notNull(),
  deploymentEase: integer("deployment_ease").notNull(),
  collaboration: integer("collaboration").notNull(),
});

export const platformFeaturesTable = pgTable("platform_features", {
  platform: text("platform").primaryKey(),
  autoTesting: boolean("auto_testing").notNull().default(false),
  selfHealing: boolean("self_healing").notNull().default(false),
  ciCdIntegration: boolean("ci_cd_integration").notNull().default(false),
  multiAgent: boolean("multi_agent").notNull().default(false),
  infraProvisioning: boolean("infra_provisioning").notNull().default(false),
  oneClickDeploy: boolean("one_click_deploy").notNull().default(false),
  noCodeInterface: boolean("no_code_interface").notNull().default(false),
  openSource: boolean("open_source").notNull().default(false),
  multiModel: boolean("multi_model").notNull().default(false),
});

export const platformTrendingTable = pgTable("platform_trending", {
  platform: text("platform").primaryKey(),
  growthScore: integer("growth_score").notNull(),
  trend: text("trend").notNull(),
  note: text("note").notNull(),
});

export const insertPlatformSchema = createInsertSchema(platformsTable);
export const insertPlatformComparisonSchema = createInsertSchema(platformComparisonsTable);
export const insertPlatformFeatureSchema = createInsertSchema(platformFeaturesTable);
export const insertPlatformTrendingSchema = createInsertSchema(platformTrendingTable);

export type Platform = typeof platformsTable.$inferSelect;
export type PlatformComparison = typeof platformComparisonsTable.$inferSelect;
export type PlatformFeature = typeof platformFeaturesTable.$inferSelect;
export type PlatformTrending = typeof platformTrendingTable.$inferSelect;
export type InsertPlatform = z.infer<typeof insertPlatformSchema>;
