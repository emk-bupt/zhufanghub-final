import { NextResponse } from "next/server";
import { getPlaiceholder } from "plaiceholder";

// Optimized fetch with retry logic
const fetchWithRetry = async (url, retries = 3, timeout = 15000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        // Avoid retrying on 4xx errors (e.g., 404 Not Found)
        if (response.status >= 400 && response.status < 500) {
          throw new Error(`Fetch failed with status: ${response.status}`);
        }
        throw new Error(`Fetch attempt ${attempt} failed`);
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (attempt === retries) {
        throw new Error(`Failed to fetch URL after ${retries} attempts.`);
      }
    }
  }
};

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json(
        { error: "Missing 'url' parameter in query." },
        { status: 400 }
      );
    }

    const response = await fetchWithRetry(url);
    const buffer = Buffer.from(await response.arrayBuffer());

    const { base64 } = await getPlaiceholder(buffer);

    return NextResponse.json({ base64 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
