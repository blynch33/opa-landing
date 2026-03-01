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

    // Count across all receipt-related tables
    const [receipts, lineItems, scannedReceipts, subscribers] = await Promise.all([
      supabase.from('receipts').select('*', { count: 'exact', head: true }),
      supabase.from('line_items').select('*', { count: 'exact', head: true }),
      supabase.from('scanned_receipts').select('*', { count: 'exact', head: true }),
      supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    ]);

    const totalReceipts =
      (receipts.count ?? 0) +
      (lineItems.count ?? 0) +
      (scannedReceipts.count ?? 0);

    return NextResponse.json({
      receiptsScanned: totalReceipts,
      foundingMembers: subscribers.count ?? 0,
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
