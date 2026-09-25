import { ImageResponse } from 'next/og';
import { singlePainting } from "@/lib/api";

export const size = {
    width: 1200,
    height: 630
};

export const contentType = 'image/png';

export default async function opengraphImage({ params } : { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const painting = await singlePainting(slug);

    return new ImageResponse (
        (
            <div style={{ background: 'white', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={painting.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
        )
    )
}