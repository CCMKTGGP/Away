"use server";

import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/lib/mongodb";
import User from "@/models/User";

// handles a POST request to fetch user details based on email

export async function POST(req: NextRequest) {
  try {
    await ConnectDB(); // Connect to the database

    const { email } = await req.json(); // extract email from the request body to identify the user

    // validate email 
    if (!email) {
      return new NextResponse(
        JSON.stringify({ error: "E-mail is required!" }),
        { status: 400 }
      );
    }

    // find user with given email from database
    const user = await User.findOne({ email });

    // if user not found
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: "User not found with given e-mail." }),
        { status: 404 }
      );
    }

     // return the user's details if found in the database
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error while fetching user from database:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
