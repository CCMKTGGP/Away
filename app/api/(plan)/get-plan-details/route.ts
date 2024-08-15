import { NextRequest, NextResponse } from 'next/server';
import { plans } from '../../../../lib/plan';

// api route
// /api/get-plan-details

export async function GET(req: NextRequest) {

    // plan from plan.ts and send the response in json
    return NextResponse.json(plans, { status: 200 });
}
