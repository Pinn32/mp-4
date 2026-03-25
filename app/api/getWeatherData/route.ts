import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const API_KEY = process.env.API_KEY;

export async function GET(): Promise<NextResponse> {
    const res = await fetch(
        `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`
    );

    if (res.status !== 200) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
}
