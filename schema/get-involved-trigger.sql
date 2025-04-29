-- Trigger for automatically updating the updated_at timestamp

-- Add function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update the updated_at column automatically
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON get_involved
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
