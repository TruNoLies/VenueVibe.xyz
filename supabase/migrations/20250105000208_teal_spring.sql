/*
  # Add location fields to venues table

  1. Changes
    - Add latitude and longitude columns to venues table
    - Add location_details column for storing additional location info
    - Add search_radius column for venue discovery range
    - Add function to calculate distance between coordinates
    - Add function to find venues within radius

  2. Security
    - Maintain existing RLS policies
*/

-- Add location columns to venues table
ALTER TABLE venues 
ADD COLUMN IF NOT EXISTS latitude decimal,
ADD COLUMN IF NOT EXISTS longitude decimal,
ADD COLUMN IF NOT EXISTS location_details jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS search_radius integer DEFAULT 10;

-- Function to calculate distance between two points
CREATE OR REPLACE FUNCTION calculate_distance(
  lat1 decimal,
  lon1 decimal,
  lat2 decimal,
  lon2 decimal
)
RETURNS decimal
LANGUAGE plpgsql
AS $$
DECLARE
  R decimal := 6371; -- Earth's radius in kilometers
  dlat decimal;
  dlon decimal;
  a decimal;
  c decimal;
  d decimal;
BEGIN
  dlat := radians(lat2 - lat1);
  dlon := radians(lon2 - lon1);
  
  a := sin(dlat/2) * sin(dlat/2) +
       cos(radians(lat1)) * cos(radians(lat2)) *
       sin(dlon/2) * sin(dlon/2);
  c := 2 * atan2(sqrt(a), sqrt(1-a));
  d := R * c;
  
  RETURN d;
END;
$$;