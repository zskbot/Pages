import { Router, type IRouter } from "express";
import {
  GetSelfHealingDataResponse,
  GetAutomationPipelineResponse,
} from "@workspace/api-zod";
import { db } from "@workspace/db";
import {
  selfHealingTable,
  automationPipelineTable,
  newsItemsTable,
} from "@workspace/db/schema";

const router: IRouter = Router();

router.get("/research/self-healing", async (req, res): Promise<void> => {
  const rows = await db.select().from(selfHealingTable);
  res.json(GetSelfHealingDataResponse.parse(rows.map((r) => ({
    platform: r.platform,
    loopStructure: r.loopStructure,
    errorDetection: r.errorDetection,
    patchingMethod: r.patchingMethod,
    stoppingCondition: r.stoppingCondition,
    iterationsTypical: r.iterationsTypical,
    hasWatchdog: r.hasWatchdog,
  }))));
});

router.get("/research/automation-pipeline", async (req, res): Promise<void> => {
  const rows = await db.select().from(automationPipelineTable);
  res.json(GetAutomationPipelineResponse.parse(rows.map((r) => {
    let platforms: string[];
    try {
      platforms = JSON.parse(r.platforms) as string[];
      if (!Array.isArray(platforms)) platforms = [];
    } catch {
      platforms = [];
    }
    return { stage: r.stage, description: r.description, platformCount: r.platformCount, platforms };
  })));
});

router.get("/research/news", async (req, res): Promise<void> => {
  const rows = await db.select().from(newsItemsTable);
  res.json(rows.map((r) => ({
    id: r.id,
    date: r.date,
    platform: r.platform,
    headline: r.headline,
    summary: r.summary,
    tag: r.tag,
    impact: r.impact,
  })));
});

export default router;
