import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

/**
 * @swagger
 * /api/daily-status:
 *   get:
 *     summary: Get current daily status
 *     tags: [DailyStatus]
 *     responses:
 *       200:
 *         description: Daily status
 *       404:
 *         description: No status found
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create or update daily status (auth required)
 *     tags: [DailyStatus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - day_number
 *               - ingredient_of_day
 *             properties:
 *               date:
 *                 type: string
 *               day_number:
 *                 type: integer
 *               ingredient_of_day:
 *                 type: string
 *               weather:
 *                 type: string
 *     responses:
 *       201:
 *         description: Status created/updated
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

export async function GET() {
  try {
    const supabase = createAdminClient();
    const today = new Date().toISOString().split('T')[0];

    // Get today's status or most recent
    const { data: status, error } = await supabase
      .from('daily_status')
      .select('*')
      .order('date', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Database error fetching daily status:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch daily status' },
        { status: 500 }
      );
    }

    if (!status) {
      return NextResponse.json(
        { success: false, error: 'No daily status found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: status },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/daily-status:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { date, day_number, ingredient_of_day, weather } = body;

    if (!date || !day_number || !ingredient_of_day) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: date, day_number, ingredient_of_day' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Check if status for this date exists
    const { data: existing } = await supabase
      .from('daily_status')
      .select('id')
      .eq('date', date)
      .single();

    let result;
    if (existing) {
      // Update existing
      result = await supabase
        .from('daily_status')
        .update({
          day_number,
          ingredient_of_day,
          weather,
        })
        .eq('date', date)
        .select()
        .single();
    } else {
      // Create new
      result = await supabase
        .from('daily_status')
        .insert([
          {
            date,
            day_number,
            ingredient_of_day,
            weather,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();
    }

    if (result.error) {
      console.error('Database error creating/updating daily status:', result.error);
      return NextResponse.json(
        { success: false, error: 'Failed to save daily status' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: result.data,
        message: 'Daily status saved successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/daily-status:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}