import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

/**
 * @swagger
 * /api/about:
 *   get:
 *     summary: Get about content
 *     tags: [About]
 *     responses:
 *       200:
 *         description: About content
 *       404:
 *         description: No content found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update about content (auth required)
 *     tags: [About]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *               profile_image_url:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Content updated
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data: about, error } = await supabase
      .from('about_content')
      .select('*')
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Database error fetching about content:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch about content' },
        { status: 500 }
      );
    }

    if (!about) {
      return NextResponse.json(
        { success: false, error: 'No about content found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: about },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/about:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { bio, profile_image_url, email } = body;

    const supabase = createAdminClient();

    // Check if content exists
    const { data: existing } = await supabase
      .from('about_content')
      .select('id')
      .limit(1)
      .single();

    let result;
    const updateData = {
      bio,
      profile_image_url,
      email,
      updated_at: new Date().toISOString(),
    };

    if (existing) {
      // Update existing
      result = await supabase
        .from('about_content')
        .update(updateData)
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      // Create new
      result = await supabase
        .from('about_content')
        .insert([updateData])
        .select()
        .single();
    }

    if (result.error) {
      console.error('Database error updating about content:', result.error);
      return NextResponse.json(
        { success: false, error: 'Failed to update about content' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: result.data,
        message: 'About content updated successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in PUT /api/about:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}