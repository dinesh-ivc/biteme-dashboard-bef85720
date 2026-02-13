import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { validateRecipe } from '@/lib/validation';

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get all recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: List of recipes
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new recipe (auth required)
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - entry_number
 *               - title
 *               - slug
 *               - date
 *               - ingredients
 *               - steps
 *             properties:
 *               entry_number:
 *                 type: integer
 *               title:
 *                 type: string
 *               slug:
 *                 type: string
 *               date:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               steps:
 *                 type: array
 *                 items:
 *                   type: string
 *               hero_image_url:
 *                 type: string
 *               thumbnail_image_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select('*')
      .order('entry_number', { ascending: false });

    if (error) {
      console.error('Database error fetching recipes:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch recipes' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: recipes || [] },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/recipes:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = validateRecipe(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    
    // Check if entry number or slug already exists
    const { data: existing } = await supabase
      .from('recipes')
      .select('id')
      .or(`entry_number.eq.${body.entry_number},slug.eq.${body.slug}`)
      .single();

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Recipe with this entry number or slug already exists' },
        { status: 400 }
      );
    }

    // Create recipe
    const { data: recipe, error } = await supabase
      .from('recipes')
      .insert([
        {
          ...body,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error creating recipe:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create recipe' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: recipe,
        message: 'Recipe created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/recipes:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}