import { NextRequest, NextResponse } from "next/server";

import { getDailyVerse } from "lib/getDailyVerse";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const locale = (searchParams.get("locale") || "en") as Locale;

    const dailyVerse = await getDailyVerse(locale);

    if (!dailyVerse) {
      return NextResponse.json(
        { error: "Daily verse not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(dailyVerse, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching daily verse:", error);
    return NextResponse.json(
      { error: "Failed to fetch daily verse" },
      { status: 500 },
    );
  }
}

