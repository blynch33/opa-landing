import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(url, key);
}

export const revalidate = 60; // revalidate every 60 seconds

export async function GET() {
  try {
    const supabase = getSupabase();

    // Get total receipts scanned (all receipts ever created)
    const { count: receiptCount, error: receiptError } = await supabase
      .from('receipts')
      .select('*', { count: 'exact', head: true });

    // Get active subscriptions (founding member count)
    const { count: subscriberCount, error: subError } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    return NextResponse.json({
      receiptsScanned: receiptError ? 0 : (receiptCount ?? 0),
      foundingMembers: subError ? 0 : (subscriberCount ?? 0),
      foundingMemberCap: 100,
    });
  } catch {
    return NextResponse.json({
      receiptsScanned: 0,
      foundingMembers: 0,
      foundingMemberCap: 100,
    });
  }
}
