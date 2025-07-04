
-- Enable RLS (Row Level Security) on all tables
alter table if exists auth.users enable row level security;

-- Create designs table to store user designs
create table if not exists designs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  category text not null,
  canvas_data jsonb not null,
  thumbnail_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create RLS policies for designs
alter table designs enable row level security;

create policy "Users can view their own designs"
  on designs for select
  using (auth.uid() = user_id);

create policy "Users can insert their own designs"
  on designs for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own designs"
  on designs for update
  using (auth.uid() = user_id);

create policy "Users can delete their own designs"
  on designs for delete
  using (auth.uid() = user_id);

-- Create proposals table for design ideas/templates
create table if not exists proposals (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  category text not null,
  image_url text,
  template_data jsonb,
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Make proposals readable by everyone
alter table proposals enable row level security;

create policy "Anyone can view proposals"
  on proposals for select
  using (true);

-- Insert some sample proposals
insert into proposals (title, description, category, image_url, is_featured) values
('Modern Living Room', 'A contemporary living space with clean lines and neutral colors', 'living-room', 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop', true),
('Cozy Bedroom', 'A warm and inviting bedroom design with soft textures', 'bedroom', 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop', true),
('Professional Office', 'A productive workspace with modern furniture and good lighting', 'office', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop', false),
('Interactive Classroom', 'An engaging learning environment with flexible seating', 'classroom', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop', false);
