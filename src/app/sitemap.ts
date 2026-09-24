import type { MetadataRoute } from "next";
import { slugifyString } from "@/_helpers/NormalizeStringsHelpers";
import { AllPaintings } from "@/_helpers/APIHelpers";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const objects = await AllPaintings();
    const paintings = objects.map((painting: { title: string }) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/paintings/${slugifyString(painting.title)}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return [
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
            lastModified: new Date().toISOString(),
            changeFrequency: "weekly",
            priority: 0.5,
        },
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/paintings/`,
            lastModified: new Date().toISOString(),
            changeFrequency: "weekly",
            priority: 1,
        },
        ...paintings,
    ];
}