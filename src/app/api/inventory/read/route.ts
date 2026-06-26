import { neon } from '@neondatabase/serverless';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const place = searchParams.get('place') ?? 'Wustrow';
    const sql = neon(process.env.DATABASE_URL!);

    const rows = await sql`
        SELECT data FROM inventory WHERE place = ${place}
    `;

    if (rows.length === 0) {
        return Response.json(null, { status: 404 });
    }

    return Response.json(rows[0].data);
}