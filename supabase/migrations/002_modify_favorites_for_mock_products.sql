-- Modify favorites table to allow mock products
-- Remove the foreign key constraint on product_id to allow favoriting mock products
-- that don't exist in the products table yet

-- First, drop the existing foreign key constraint
ALTER TABLE favorites 
DROP CONSTRAINT IF EXISTS favorites_product_id_fkey;

-- Add a check constraint instead that validates UUID format
-- This allows any UUID to be stored, whether the product exists or not
ALTER TABLE favorites
ADD CONSTRAINT favorites_product_id_check 
CHECK (product_id IS NOT NULL AND product_id::text ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$');

-- Create a function to handle favorites insertion with optional product validation
CREATE OR REPLACE FUNCTION insert_favorite(
  p_user_id UUID,
  p_product_id UUID
) RETURNS favorites AS $$
DECLARE
  v_favorite favorites;
BEGIN
  -- Check if favorite already exists
  SELECT * INTO v_favorite
  FROM favorites
  WHERE user_id = p_user_id AND product_id = p_product_id;
  
  IF v_favorite IS NOT NULL THEN
    RETURN v_favorite;
  END IF;
  
  -- Insert new favorite
  INSERT INTO favorites (user_id, product_id)
  VALUES (p_user_id, p_product_id)
  RETURNING * INTO v_favorite;
  
  RETURN v_favorite;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION insert_favorite(UUID, UUID) TO authenticated;
