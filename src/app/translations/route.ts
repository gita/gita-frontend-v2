import fs from "fs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({
      success: false,
    });
  }
  const { locale, literal } = await request.json();

  const filename =
    process.env.INIT_CWD + `/src/shared/translate/locales/${locale}.json`;

  const data = fs.readFileSync(filename, "utf8");

  const translations = JSON.parse(data);
  if (translations[literal]) {
    console.error(`${literal} already added for ${locale}`);
  } else {
    translations[literal] = literal;
    fs.writeFileSync(filename, `${JSON.stringify(translations, null, 2)}\n`);
  }

  return NextResponse.json({
    success: true,
  });
}
