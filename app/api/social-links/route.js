import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

/**
 * @swagger
 * /api/social-links:
 *   get:
 *     summary: Get all social links
 *     tags: [SocialLinks]
 *     responses:
 *       200:
 *         description: List of social links
 *       500:
 *         description: Server error
 */

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data: socialLinks, error } = await supabase
      .from('social_links')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Database error fetching social links:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch social links' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: socialLinks || [] },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/social-links:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}