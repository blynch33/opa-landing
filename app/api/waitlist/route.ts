import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const WAITLIST_FILE = path.join(process.cwd(), 'waitlist.json');

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Read existing waitlist
    let waitlist: Array<{ email: string; timestamp: string }> = [];
    try {
      const data = await fs.readFile(WAITLIST_FILE, 'utf-8');
      waitlist = JSON.parse(data);
    } catch {
      // File doesn't exist yet
    }

    // Check for duplicates
    if (waitlist.some(entry => entry.email === cleanEmail)) {
      return NextResponse.json({ message: 'Already on the list' }, { status: 200 });
    }

    // Add new entry
    waitlist.push({
      email: cleanEmail,
      timestamp: new Date().toISOString(),
    });

    await fs.writeFile(WAITLIST_FILE, JSON.stringify(waitlist, null, 2));

    return NextResponse.json({ message: 'Added to waitlist' }, { status: 200 });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

// Check waitlist count
export async function GET() {
  try {
    const data = await fs.readFile(WAITLIST_FILE, 'utf-8');
    const waitlist = JSON.parse(data);
    return NextResponse.json({ count: waitlist.length });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
