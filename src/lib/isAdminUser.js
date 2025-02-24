import { getCurrentUser } from "./currentUser";
import { NextResponse } from "next/server";

const isAdminUser = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.isAdmin) {
      return NextResponse.error({ message: "User is not an admin!" }, { status: 403 });
    }
    return currentUser;
  } catch (error) {
    console.error("Error in isAdminUser:", error);
    return NextResponse.error({ message: "Server error" }, { status: 500 });
  }
};

export default isAdminUser;
