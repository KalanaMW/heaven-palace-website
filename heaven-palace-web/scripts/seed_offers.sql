-- Clear existing offers to avoid duplicates
DELETE FROM public.offers;

-- Insert the 4 Original High-Quality Offers
INSERT INTO public.offers (title, subtitle, description, price_label, valid_until, image, inclusions) VALUES
(
  'Romantic Escape Package', 
  'Celebrate Love in Paradise', 
  'Ignite the romance with a specially curated getaway. Enjoy room decoration with flowers, a couple''s Ayurvedic spa treatment, and a private candlelit dinner under the stars.', 
  'From LKR 45,000', 
  'Dec 31, 2025', 
  '/images/offers/romantic.jpg', 
  ARRAY['Deluxe Double Room with Bath', '60-min Couple Spa Treatment', 'Private Candlelit Dinner', 'Daily Breakfast in Bed']
),
(
  'Early Bird Discount', 
  'Plan Ahead & Save', 
  'Secure your sanctuary early and enjoy exclusive savings. The perfect excuse to plan your wellness retreat in Kandy ahead of time.', 
  '15% OFF', 
  'Book 30 Days Advance', 
  '/images/offers/early-bird.jpg', 
  ARRAY['15% Off Best Available Rate', 'Complimentary Room Upgrade', 'Welcome Drink on Arrival', 'Free Cancellation up to 7 days']
),
(
  'Monsoon Wellness Retreat', 
  'Restore Your Balance', 
  'Embrace the healing power of the monsoon season. A holistic program designed to boost immunity and restore mental clarity through Ayurveda.', 
  'LKR 35,000 / Night', 
  'Seasonal (June - Aug)', 
  '/images/offers/wellness.jpg', 
  ARRAY['Consultation with Ayurvedic Doctor', 'Daily Herbal Treatments', 'Organic Full Board Meals', 'Morning Yoga Sessions']
),
(
  'Work & Relax Staycation', 
  'Your Office With A View', 
  'Combine productivity with tranquility. High-speed 50Mbps WiFi, ergonomic workspace setup, and evening relaxation to wind down after work.', 
  'From LKR 20,000', 
  'Min Stay 3 Nights', 
  '/images/offers/family.jpg', 
  ARRAY['High-Speed Dedicated Internet', '20% Off Food & Beverage', 'Daily Evening Head Massage', 'Late Checkout till 4:00 PM']
);
