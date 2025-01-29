import { NextResponse } from "next/server";
import { getPlaiceholder } from "plaiceholder";

// Retry logic with timeout for fetch requests

const fetchWithRetry = async (url, retries = 3, timeout = 15000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Fetch failed with status: ${response.status}`);
      }

      return response; // Return successful response
    } catch (error) {
      console.error(`Fetch attempt ${attempt} failed: ${error.message}`);
      if (attempt === retries) {
        throw new Error(`Failed to fetch URL after ${retries} attempts.`);
      }
    }
  }
};

// Ensure this route is treated as dynamic
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

    console.log("Fetching URL:", url);

    // Fetch image with retries
    const response = await fetchWithRetry(url);

    // Convert response to buffer for Plaiceholder
    console.log("Fetch successful, converting response to buffer...");
    const buffer = await response.arrayBuffer();

    console.log("Generating base64 using Plaiceholder...");
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    console.log("Base64 generation complete.");
    return NextResponse.json({ base64 });
  } catch (error) {
    console.error("Error in /api/base64:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
