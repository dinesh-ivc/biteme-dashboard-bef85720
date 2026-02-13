import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { validateRecipe } from '@/lib/validation';

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Get recipe by ID or slug
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe details
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update recipe (auth required)
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Recipe updated
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete recipe (auth required)
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe deleted
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Server error
 */

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const supabase = createAdminClient();

    // Try to find by UUID first, then by slug
    let query = supabase.from('recipes').select('*');
    
    // Check if id is a UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(id)) {
      query = query.eq('id', id);
    } else {
      query = query.eq('slug', id);
    }

    const { data: recipe, error } = await query.single();

    if (error || !recipe) {
      return NextResponse.json(
        { success: false, error: 'Recipe not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: recipe },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/recipes/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Validate input
    const validation = validateRecipe(body, true);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Update recipe
    const { data: recipe, error } = await supabase
      .from('recipes')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !recipe) {
      return NextResponse.json(
        { success: false, error: 'Recipe not found or update failed' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: recipe,
        message: 'Recipe updated successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in PUT /api/recipes/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const supabase = createAdminClient();

    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Database error deleting recipe:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete recipe' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Recipe deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in DELETE /api/recipes/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}