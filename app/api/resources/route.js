import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

/**
 * @swagger
 * /api/resources:
 *   get:
 *     summary: Get all resources
 *     tags: [Resources]
 *     responses:
 *       200:
 *         description: List of resources
 *       500:
 *         description: Server error
 */

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data: resources, error } = await supabase
      .from('resources')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Database error fetching resources:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch resources' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: resources || [] },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/resources:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}