import {writeFile} from "fs/promises";
import path from 'path';

export async function POST(req: Request) {
    const { data } = await req.json();

    const filePath = path.join(process.cwd(), 'public', 'inventory.json');

    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

    return Response.json({ success: true });
}