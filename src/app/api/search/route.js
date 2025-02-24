import db from "@/lib/db";

export async function GET(request) {
  try {
    // Properly parse the URL and query parameters
    const url = new URL(request.url);
    const query = url.searchParams.get("query");

    // Validate query parameter
    if (!query || query.trim() === "") {
      return new Response(
        JSON.stringify({ message: "搜索查询不能为空" }),  // Chinese error message
        { status: 400 }
      );
    }

    // Search listings in database
    const listings = await db.listing.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { location: { contains: query, mode: "insensitive" } },
          { desc: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        owner: true,
      },
    });

    // Handle no results found
    if (!listings || listings.length === 0) {
      return new Response(
        JSON.stringify({ message: "未找到符合条件的房源" }),  // Chinese error message
        { status: 404 }
      );
    }

    // Return successful response
    return new Response(JSON.stringify({ listings }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.error("Search API Error:", error);
    return new Response(
      JSON.stringify({ message: "服务器内部错误" }),  // Chinese error message
      { status: 500 }
    );
  }
}
