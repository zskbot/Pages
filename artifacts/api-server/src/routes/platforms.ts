import { Router, type IRouter } from "express";
import {
  GetPlatformsResponse,
  GetPlatformsComparisonResponse,
  GetPlatformFeaturesResponse,
  GetPlatformsSummaryResponse,
} from "@workspace/api-zod";
import { db } from "@workspace/db";
import {
  platformsTable,
  platformComparisonsTable,
  platformFeaturesTable,
  platformTrendingTable,
} from "@workspace/db/schema";

const router: IRouter = Router();

router.get("/platforms", async (req, res): Promise<void> => {
  const rows = await db.select().from(platformsTable);
  res.json(GetPlatformsResponse.parse(rows.map((r) => ({
    id: r.id,
    name: r.name,
    company: r.company,
    type: r.type,
    description: r.description,
    keyDifferentiator: r.keyDifferentiator,
    openSource: r.openSource,
    selfHosted: r.selfHosted,
    automationLevel: r.automationLevel,
    deploymentType: r.deploymentType,
  }))));
});

router.get("/platforms/summary", async (req, res): Promise<void> => {
  const platforms = await db.select().from(platformsTable);
  const features = await db.select().from(platformFeaturesTable);

  const totalPlatforms = platforms.length;
  const openSourceCount = platforms.filter((p) => p.openSource).length;
  const selfHostedCount = platforms.filter((p) => p.selfHosted).length;
  const avgAutomationLevel = totalPlatforms > 0
    ? platforms.reduce((sum, p) => sum + p.automationLevel, 0) / totalPlatforms
    : 0;
  const fullPipelineCount = features.filter(
    (f) => f.autoTesting && f.selfHealing && f.infraProvisioning && f.oneClickDeploy
  ).length;

  res.json(
    GetPlatformsSummaryResponse.parse({
      totalPlatforms,
      openSourceCount,
      selfHostedCount,
      avgAutomationLevel: Math.round(avgAutomationLevel * 10) / 10,
      fullPipelineCount,
    })
  );
});

router.get("/platforms/comparison", async (req, res): Promise<void> => {
  const rows = await db.select().from(platformComparisonsTable);
  res.json(GetPlatformsComparisonResponse.parse(rows.map((r) => ({
    platform: r.platform,
    autonomy: r.autonomy,
    codeQuality: r.codeQuality,
    infrastructure: r.infrastructure,
    selfHealing: r.selfHealing,
    deploymentEase: r.deploymentEase,
    collaboration: r.collaboration,
  }))));
});

router.get("/platforms/features", async (req, res): Promise<void> => {
  const rows = await db.select().from(platformFeaturesTable);
  res.json(GetPlatformFeaturesResponse.parse(rows.map((r) => ({
    platform: r.platform,
    autoTesting: r.autoTesting,
    selfHealing: r.selfHealing,
    ciCdIntegration: r.ciCdIntegration,
    multiAgent: r.multiAgent,
    infraProvisioning: r.infraProvisioning,
    oneClickDeploy: r.oneClickDeploy,
    noCodeInterface: r.noCodeInterface,
    openSource: r.openSource,
    multiModel: r.multiModel,
  }))));
});

router.get("/platforms/trending", async (req, res): Promise<void> => {
  const rows = await db.select().from(platformTrendingTable);
  res.json(rows.map((r) => ({
    platform: r.platform,
    growthScore: r.growthScore,
    trend: r.trend,
    note: r.note,
  })));
});

export default router;
