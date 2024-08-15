"use server";

import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/lib/mongodb";
import User from "@/models/User";

// handles incoming POST requests to add a new user to the database
export async function POST(req: NextRequest) {
  try {

    await ConnectDB(); // Connect to the database

    // parse and extract user data (email, first name, last name) from the request body
    const { email, first_name, last_name } = await req.json();

    // Validate email and name
    if (!email) {
      return new NextResponse(JSON.stringify({ error: "E-mail is required!" }), { status: 400 });
    }

    if (!first_name || !last_name) {
      return new NextResponse(JSON.stringify({ error: "Name is required!" }), { status: 400 });
    }

    // query the database to check if a user with the same email already exists
    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      return new NextResponse(JSON.stringify("User already exists"), { status: 200 });
    }

    // create a new user object if the email is not already registered
    const newUser = new User({
      email,
      first_name,
      last_name,
      isPaidUser: false, // By default making isPaidUser false
    });

    // Save the new user to the database
    await newUser.save();

    // Return a 201 response with the newly created user object
    return new NextResponse(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error("Error while adding user to database:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

