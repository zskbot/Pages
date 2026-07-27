import { Router, type IRouter } from "express";
import healthRouter from "./health";
import platformsRouter from "./platforms";
import researchRouter from "./research";
import meRouter from "./me";

const router: IRouter = Router();

router.use(healthRouter);
router.use(platformsRouter);
router.use(researchRouter);
router.use(meRouter);

export default router;
