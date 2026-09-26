import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { fav_paintings } from "@/db/schema";

export async function isFavouritePainting(userId, paintingId) {
    const rows = await db
        .select({ paintingId: fav_paintings.paintingId })
        .from(fav_paintings)
        .where(and(eq(fav_paintings.userId, userId), eq(fav_paintings.paintingId, paintingId)))
        .limit(1);

    return rows.length > 0;
}

export async function getFavouritePaintingIds(userId) {
    const rows = await db
        .select({ paintingId: fav_paintings.paintingId })
        .from(fav_paintings)
        .where(eq(fav_paintings.userId, userId))
        .orderBy(desc(fav_paintings.createdAt));

    return rows.map((row) => row.paintingId);
}
