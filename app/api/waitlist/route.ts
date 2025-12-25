import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage for demo purposes
// In production, use a database like PostgreSQL or a service like Resend
const waitlist: string[] = [];

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if email already exists
    if (waitlist.includes(email)) {
      return NextResponse.json(
        { message: 'Email already in waitlist' },
        { status: 409 }
      );
    }

    // Add to waitlist
    waitlist.push(email);

    // TODO: In production, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Add to email marketing service (Mailchimp, ConvertKit, etc.)

    console.log('Waitlist emails:', waitlist);

    return NextResponse.json(
      { 
        message: 'Successfully added to waitlist',
        count: waitlist.length 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Simple endpoint to check waitlist size (remove in production)
  return NextResponse.json({ count: waitlist.length });
}
