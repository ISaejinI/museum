"use server";

import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "@/db";
import { fav_paintings } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function setFavouritePainting(paintingId, value) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) throw new Error("Non autorisé");
    if (!Number.isInteger(paintingId)) throw new Error("Id d'œuvre invalide");

    const userId = session.user.id;

    if (value) {
        await db.insert(fav_paintings).values({ userId, paintingId }).onConflictDoNothing();
    } else {
        await db
            .delete(fav_paintings)
            .where(and(eq(fav_paintings.userId, userId), eq(fav_paintings.paintingId, paintingId)));
    }
}
