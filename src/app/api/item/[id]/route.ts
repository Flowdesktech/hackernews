import { NextResponse } from "next/server";
import { fetchItemTree } from "@/lib/hn";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const decodedId = decodeURIComponent(id);
  const match = decodedId.match(/\d+/);
  const itemId = match ? Number.parseInt(match[0], 10) : NaN;

  if (Number.isNaN(itemId)) {
    return NextResponse.json({ error: "Invalid item id" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const depth = Math.min(
    Math.max(parseInt(searchParams.get("depth") ?? "2", 10) || 2, 0),
    5
  );
  const limit = Math.min(
    Math.max(parseInt(searchParams.get("limit") ?? "120", 10) || 120, 1),
    300
  );

  try {
    const result = await fetchItemTree(itemId, depth, limit);
    if (!result.item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(result.item, {
      headers: {
        "Cache-Control": "public, max-age=30, s-maxage=60",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch item" },
      { status: 500 }
    );
  }
}
