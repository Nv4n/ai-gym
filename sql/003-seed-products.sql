-- Insert supplement products
INSERT INTO products (name, description, price, category, subcategory, image_url, stripe_price_id, stock) VALUES
  ('Whey Protein Powder', 'Premium quality whey protein isolate for muscle recovery and growth', 49.99, 'supplements', 'protein', '/whey-protein-powder.jpg', 'price_whey_protein', 100),
  ('Creatine Monohydrate', 'Pure creatine monohydrate for strength and performance', 29.99, 'supplements', 'performance', '/creatine-powder.jpg', 'price_creatine', 150),
  ('BCAA Supplement', 'Branch-chain amino acids for muscle recovery', 34.99, 'supplements', 'recovery', '/bcaa-supplement.jpg', 'price_bcaa', 120),
  ('Pre-Workout', 'Energy and focus formula for intense workouts', 39.99, 'supplements', 'energy', '/pre-workout-supplement.jpg', 'price_preworkout', 90),
  ('Multivitamin', 'Complete daily multivitamin for overall health', 24.99, 'supplements', 'health', '/multivitamin-pills.jpg', 'price_multivitamin', 200),
  ('Fish Oil Omega-3', 'High-quality omega-3 fatty acids for heart and brain health', 27.99, 'supplements', 'health', '/fish-oil-supplement.jpg', 'price_fishoil', 180),
  ('ZMA Supplement', 'Zinc, magnesium, and vitamin B6 for recovery and sleep', 22.99, 'supplements', 'recovery', '/zma-supplement.jpg', 'price_zma', 140),
  ('Casein Protein', 'Slow-digesting protein for overnight recovery', 54.99, 'supplements', 'protein', '/casein-protein.jpg', 'price_casein', 85);

-- Insert equipment products
INSERT INTO products (name, description, price, category, subcategory, image_url, stripe_price_id, stock) VALUES
  ('Adjustable Dumbbells', 'Space-saving adjustable dumbbells set', 299.99, 'equipment', 'weights', '/placeholder.svg?height=400&width=400', 'price_dumbbells', 50),
  ('Yoga Mat', 'Premium non-slip yoga mat', 39.99, 'equipment', 'accessories', '/placeholder.svg?height=400&width=400', 'price_yoga_mat', 150),
  ('Resistance Bands', 'Set of 5 resistance bands', 24.99, 'equipment', 'accessories', '/placeholder.svg?height=400&width=400', 'price_resistance_bands', 200),
  ('Kettlebell Set', 'Professional kettlebell set (8kg, 12kg, 16kg)', 149.99, 'equipment', 'weights', '/placeholder.svg?height=400&width=400', 'price_kettlebell', 75),
  ('Foam Roller', 'High-density foam roller for muscle recovery', 29.99, 'equipment', 'recovery', '/placeholder.svg?height=400&width=400', 'price_foam_roller', 100),
  ('Jump Rope', 'Speed jump rope for cardio training', 14.99, 'equipment', 'cardio', '/placeholder.svg?height=400&width=400', 'price_jump_rope', 180),
  ('Ab Wheel', 'Ab roller wheel for core training', 19.99, 'equipment', 'accessories', '/placeholder.svg?height=400&width=400', 'price_ab_wheel', 120),
  ('Pull-up Bar', 'Doorway pull-up bar', 34.99, 'equipment', 'accessories', '/placeholder.svg?height=400&width=400', 'price_pullup_bar', 90);

-- Insert food & drinks products
INSERT INTO products (name, description, price, category, subcategory, image_url, stripe_price_id, stock) VALUES
  ('Grilled Chicken Bowl', 'Healthy grilled chicken with quinoa and vegetables', 12.99, 'food-drinks', 'healthy-meals', '/placeholder.svg?height=400&width=400', 'price_chicken_bowl', 50),
  ('Salmon Power Bowl', 'Fresh salmon with brown rice and greens', 14.99, 'food-drinks', 'healthy-meals', '/placeholder.svg?height=400&width=400', 'price_salmon_bowl', 45),
  ('Vegan Buddha Bowl', 'Plant-based protein bowl with chickpeas', 11.99, 'food-drinks', 'healthy-meals', '/placeholder.svg?height=400&width=400', 'price_vegan_bowl', 60),
  ('Turkey Wrap', 'Lean turkey with whole wheat wrap', 9.99, 'food-drinks', 'healthy-meals', '/placeholder.svg?height=400&width=400', 'price_turkey_wrap', 70),
  ('Protein Energy Bar - Chocolate', 'High protein energy bar', 3.99, 'food-drinks', 'protein-bars', '/placeholder.svg?height=400&width=400', 'price_protein_bar_choc', 200),
  ('Protein Energy Bar - Peanut Butter', 'Peanut butter flavored protein bar', 3.99, 'food-drinks', 'protein-bars', '/placeholder.svg?height=400&width=400', 'price_protein_bar_pb', 180),
  ('Pre-Workout Energy Drink', 'Natural energy drink with caffeine', 4.99, 'food-drinks', 'energy-drinks', '/placeholder.svg?height=400&width=400', 'price_energy_drink', 150),
  ('Electrolyte Sports Drink', 'Hydration drink with electrolytes', 3.49, 'food-drinks', 'energy-drinks', '/placeholder.svg?height=400&width=400', 'price_sports_drink', 200);
