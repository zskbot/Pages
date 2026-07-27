import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod/v4";

const router: IRouter = Router();

interface AuthLocals {
  clerkUserId: string;
}

function requireAuth(
  req: Request,
  res: Response<unknown, AuthLocals>,
  next: NextFunction,
): void {
  const auth = getAuth(req);
  const userId = auth?.userId;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  res.locals.clerkUserId = userId;
  next();
}

router.get(
  "/me",
  requireAuth,
  async (req: Request, res: Response<unknown, AuthLocals>): Promise<void> => {
    const clerkUserId = res.locals.clerkUserId;
    const auth = getAuth(req);

    let [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkId, clerkUserId));

    if (!user) {
      const email = (auth.sessionClaims?.email as string | undefined) ?? "";
      const name = (auth.sessionClaims?.name as string | undefined) ?? null;
      const avatarUrl =
        (auth.sessionClaims?.image_url as string | undefined) ?? null;
      const rows = await db
        .insert(usersTable)
        .values({ id: clerkUserId, clerkId: clerkUserId, email, name, avatarUrl })
        .onConflictDoNothing()
        .returning();
      if (rows.length > 0) {
        user = rows[0];
      } else {
        [user] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.clerkId, clerkUserId));
      }
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
    });
  },
);

const UpdateMeBody = z.object({
  name: z.string().min(1).max(100).optional(),
});

router.patch(
  "/me",
  requireAuth,
  async (req: Request, res: Response<unknown, AuthLocals>): Promise<void> => {
    const clerkUserId = res.locals.clerkUserId;

    const parsed = UpdateMeBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request body", details: parsed.error.issues });
      return;
    }

    const { name } = parsed.data;
    if (name === undefined) {
      res.status(400).json({ error: "No updatable fields provided" });
      return;
    }

    const [updated] = await db
      .update(usersTable)
      .set({ name, updatedAt: new Date() })
      .where(eq(usersTable.clerkId, clerkUserId))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({
      id: updated.id,
      email: updated.email,
      name: updated.name,
      avatarUrl: updated.avatarUrl,
      updatedAt: updated.updatedAt,
    });
  },
);

export default router;
