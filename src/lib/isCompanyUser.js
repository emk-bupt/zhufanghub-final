import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/lib/db";

export default async function isCompanyUser() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      console.log("❌ No session found.");
      return null;
    }
    console.log("✅ Session User:", session.user);
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, email: true, isCompany: true },
    });
    if (!user) {
      console.log("❌ No user found in the database.");
      return null;
    }
    console.log("✅ Database User:", user);
    return user.isCompany ? user : null;
  } catch (error) {
    console.error("🚨 isCompanyUser Error:", error.message);
    return null;
  }
}
