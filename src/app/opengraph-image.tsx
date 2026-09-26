import { ImageResponse } from 'next/og';

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const logoData = await readFile(join(process.cwd(), 'public/logo.png'), 'base64');
const logoSrc = `data:image/png;base64,${logoData}`;

export const size = {
    width: 1200,
    height: 630
};

export const contentType = 'image/png';

export default async function opengraphImage() {
    return new ImageResponse (
        (
            <div style={{ background: 'white', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={logoSrc} alt="" style={{ width: '50%', height: 'auto' }} />
            </div>
        )
    )
}