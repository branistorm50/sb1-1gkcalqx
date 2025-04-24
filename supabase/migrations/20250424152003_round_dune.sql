/*
  # Add insert policy for profiles table

  1. Security Changes
    - Add RLS policy to allow new users to insert their own profile
    - This is critical for the registration flow to work properly

  Note: Existing policies for select and update are preserved
*/

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO public
  WITH CHECK (auth.uid() = id);