import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/lib/mongodb";
import User from "@/models/User";

// handles a POST request to update user details
export async function POST(req: NextRequest) {
  try {
    await ConnectDB(); // connect to the database

    // extract data from the request body
    const { email, new_email, first_name, last_name } = await req.json();

    // check if the email is provided
    if (!email) {
      return new NextResponse(JSON.stringify({ error: "email is required" }), { status: 400 });
    }

    // check if the new email is provided
    if (!new_email) {
      return new NextResponse(JSON.stringify({ error: "new email is required" }), { status: 400 });
    }

    // check if the first name is provided
    if (!first_name) {
      return new NextResponse(JSON.stringify({ error: "first name is required" }), { status: 400 });
    }

    // check if the last name is provided
    if (!last_name) {
      return new NextResponse(JSON.stringify({ error: "last name is required" }), { status: 400 });
    }

    // find the user with the provided email
    const existingUser = await User.findOne({ email });

    // return error if the user is not found
    if (!existingUser) {
      return new NextResponse(JSON.stringify({ error: "user with given email not found" }), { status: 404 });
    }

    // check if the new email is different from the current email
    if (email !== new_email) {

        // check if the new email is already in use by another user
        const isEmailInUse = await User.findOne({ email: new_email });

        // return error if the new email is already in use
        if (isEmailInUse) {
          return new NextResponse(JSON.stringify({ error: "new email is already in use" }), { status: 409 });
        }

    }

    // update the user's details and return the updated user data
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { email: new_email, first_name, last_name },
      { new: true, runValidators: true }
    );

    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("error while updating user:", error);
    return new NextResponse(JSON.stringify({ error: "internal server error" }), { status: 500 });
  }
}
