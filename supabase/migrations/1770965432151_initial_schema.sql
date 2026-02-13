-- Create table: users
CREATE TABLE IF NOT EXISTS users (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
    email text UNIQUE NOT NULL,
    name text,
    password text NOT NULL,
    role text DEFAULT 'viewer' NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users (email);
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Create table: recipes
CREATE TABLE IF NOT EXISTS recipes (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
    entry_number integer UNIQUE NOT NULL,
    title text NOT NULL,
    slug text UNIQUE NOT NULL,
    date date NOT NULL,
    ingredients text[] NOT NULL,
    steps text[] NOT NULL,
    hero_image_url text,
    thumbnail_image_url text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_recipes_entry_number ON recipes (entry_number);
CREATE UNIQUE INDEX IF NOT EXISTS idx_recipes_slug ON recipes (slug);
CREATE  INDEX IF NOT EXISTS idx_recipes_date ON recipes (date);
ALTER TABLE recipes DISABLE ROW LEVEL SECURITY;

-- Create table: daily_status
CREATE TABLE IF NOT EXISTS daily_status (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
    date date UNIQUE NOT NULL,
    day_number integer NOT NULL,
    ingredient_of_day text NOT NULL,
    weather text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_daily_status_date ON daily_status (date);
ALTER TABLE daily_status DISABLE ROW LEVEL SECURITY;

-- Create table: about_content
CREATE TABLE IF NOT EXISTS about_content (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
    bio text NOT NULL,
    profile_image_url text,
    email text,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE about_content DISABLE ROW LEVEL SECURITY;

-- Create table: resources
CREATE TABLE IF NOT EXISTS resources (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
    name text NOT NULL,
    url text NOT NULL,
    description text,
    image_url text,
    display_order integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE  INDEX IF NOT EXISTS idx_resources_order ON resources (display_order);
ALTER TABLE resources DISABLE ROW LEVEL SECURITY;

-- Create table: social_links
CREATE TABLE IF NOT EXISTS social_links (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
    platform text NOT NULL,
    url text NOT NULL,
    display_order integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE  INDEX IF NOT EXISTS idx_social_links_order ON social_links (display_order);
ALTER TABLE social_links DISABLE ROW LEVEL SECURITY;
