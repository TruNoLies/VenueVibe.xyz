/*
  # Add feedback categories and ratings

  1. Changes
    - Add category and rating columns to artist_feedback table
    - Add check constraints for valid categories and ratings
    - Update existing policies

  2. Security
    - Maintain existing RLS policies
    - Add validation for new fields
*/

ALTER TABLE artist_feedback
ADD COLUMN category text NOT NULL CHECK (category IN ('technical', 'staff', 'facilities', 'payment')),
ADD COLUMN rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5);

-- Update the insert policy to include new fields
DROP POLICY IF EXISTS "Artists can create feedback" ON artist_feedback;

CREATE POLICY "Artists can create feedback"
  ON artist_feedback FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'artist'
    )
  );