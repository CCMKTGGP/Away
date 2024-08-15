// app/api/checkout/route.ts
import PAYMENT_CONSTANTS from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);

// handles POST requests to create a Stripe checkout session
export async function POST(req: NextRequest) {
  const { plan, userId } = await req.json();


  let priceId: string | undefined;
  let mode: any;

  // determine priceId and mode based on the selected plan
  switch (plan) {
    case "lifetime":
      priceId = process.env.STRIPE_PRICE_ID_LIFETIME;
      mode = PAYMENT_CONSTANTS.PAYMENT_MODE;
      break;
    case "monthly":
      priceId = process.env.STRIPE_PRICE_ID_MONTHLY;
      mode = PAYMENT_CONSTANTS.SUBSCRIPTION_MODE;
      break;
    case "annual":
      priceId = process.env.STRIPE_PRICE_ID_YEARLY;
      mode = PAYMENT_CONSTANTS.SUBSCRIPTION_MODE;
      break;
    default:
      // return an error if the plan type is invalid
      return NextResponse.json({ error: "Invalid plan type" }, { status: 400 });
  }

  // validate that priceId is not undefined
  if (!priceId) {
    return NextResponse.json(
      { error: "Price ID not defined for the selected plan" },
      { status: 400 }
    );
  }

  try {
    // create metadata object to pass user information and plan type
    const metadata = {
      userId: String(userId), 
      planType: String(plan),
    };

    // create a Stripe checkout session with the specified parameters
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode,
      billing_address_collection: "required",
      success_url: `${process.env.BASE_URL}/payment-success`,
      cancel_url: `${process.env.BASE_URL}/account`,
      metadata, // attaching metadata to session
    });

    return NextResponse.json({ sessionUrl: session.url, metadata: metadata });
  } catch (error) {

    // handle any errors that occur during the session creation
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
