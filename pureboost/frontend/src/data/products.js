export const productData = {
  drinks: [
    {
      id: 1,
      name: 'Citrus Mint Clarity',
      description: 'Green tea with lemon-lime, L-theanine, and vitamin C for calm alertness.',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=300&fit=crop',
      rating: 4.8,
      category: 'Energy Drink'
    },
    // ... rest of drinks
  ],
  equipment: [
    {
      id: 6,
      name: 'Premium Protein Shaker',
      description: 'Leak-proof shaker bottle with mixing ball and measurement markings.',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300&h=300&fit=crop',
      rating: 4.8,
      category: 'Accessories'
    },
    // ... rest of equipment
  ],
  sportswear: [
    {
      id: 9,
      name: 'Performance Training Tee',
      description: 'Moisture-wicking athletic shirt with antimicrobial treatment.',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
      rating: 4.6,
      category: 'Tops'
    },
    // ... rest of sportswear
  ]
};

export const categories = [
  { id: 'drinks', name: 'Drinks', icon: 'Coffee' },
  { id: 'equipment', name: 'Equipment', icon: 'Dumbbell' },
  { id: 'sportswear', name: 'Sportswear', icon: 'Shirt' }
];