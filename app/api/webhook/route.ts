import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import mongoose from "mongoose";
import User from "@/models/User";
import ConnectDB from "@/lib/mongodb";

// initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);

// get webhook secret from env file
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;


export const POST = async (req: NextRequest) => {

  // convert the request body to a buffer, as Stripe requires raw body for webhooks
  const buf = Buffer.from(await req.arrayBuffer());

   // retrieve the Stripe signature from the headers
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {

    // verify the event with Stripe's webhook signature
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    return new NextResponse("Webhook Error: ", { status: 400 });
  }

  // Handle stripe events
  switch (event.type) {

    case "checkout.session.completed":

    // get session
      const session = event.data.object as Stripe.Checkout.Session;

    // get metadata from session which were sent with stripe session
      const email = session.metadata?.userId;
      const planType = session.metadata?.planType;

      // update the user record to reflect the payment and plan type
      if (email && planType) {
        try {

          // connect to database
          await ConnectDB();

          // update user info
          await User.findOneAndUpdate(
            { email: email },
            {
              isPaidUser: true,
              planType: planType,
            }
          );
        } catch (dbErr) {
          return new NextResponse("Database update failed", { status: 500 });
        }
      }
      break;

      // as stripe triggers many events making one default case for rest of others
    default:
      console.log(`Unhandled event type ${event.type}`);

      return new NextResponse("Received", { status: 200 });
  }
};
