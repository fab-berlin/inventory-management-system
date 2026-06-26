import { neon } from '@neondatabase/serverless';

export async function POST(req: Request) {
    const { data } = await req.json();
    const sql = neon(process.env.DATABASE_URL!);

    await sql`
        INSERT INTO inventory (place, data, updated_at)
        VALUES (${data.place}, ${JSON.stringify(data)}, NOW())
        ON CONFLICT (place)
        DO UPDATE SET data = ${JSON.stringify(data)}, updated_at = NOW()
    `;

    return Response.json({ success: true });
}