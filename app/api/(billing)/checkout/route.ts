// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);

export async function POST(req: NextRequest) {
  const { plan } = await req.json();

  let priceId: string | undefined;
  let mode: 'payment' | 'subscription';

  // Determine priceId and mode based on plan type
  switch (plan) {
    case 'lifetime':
      priceId = process.env.STRIPE_PRICE_ID_LIFETIME;
      mode = 'payment';
      break;
    case 'monthly':
      priceId = process.env.STRIPE_PRICE_ID_MONTHLY;
      mode = 'subscription';
      break;
    case 'annual':
      priceId = process.env.STRIPE_PRICE_ID_YEARLY;
      mode = 'subscription';
      break;
    default:
      return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 });
  }

  console.log("priceId is ------", priceId);

  // Validate that priceId is not undefined
  if (!priceId) {
    return NextResponse.json({ error: 'Price ID not defined for the selected plan' }, { status: 400 });
  }

  try {
    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode,
      success_url: `${process.env.BASE_URL}/success`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    // Return the session URL to the frontend
    return NextResponse.json({ sessionUrl: session.url });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
