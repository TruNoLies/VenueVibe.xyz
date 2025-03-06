-- Create artist_feedback table
CREATE TABLE IF NOT EXISTS artist_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id uuid REFERENCES venues ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  message text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'resolved')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE artist_feedback ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Feedback is viewable by everyone"
  ON artist_feedback FOR SELECT
  USING (true);

CREATE POLICY "Artists can create feedback"
  ON artist_feedback FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'artist'
    )
  );

CREATE POLICY "Users can update own feedback"
  ON artist_feedback FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());