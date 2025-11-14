const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const sampleProducts = [
  {
    name: 'Whey Protein Isolate - Vanilla',
    description: 'Premium 100% whey protein isolate with 25g protein per serving. Fast-absorbing, low in carbs and fat. Perfect for post-workout recovery and muscle building.',
    price: 2499,
    stock: 50,
    category: 'Whey Protein',
    images: [
      'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'
    ],
    brand: 'Koushiks Supplements',
    ratings: [
      { userId: new mongoose.Types.ObjectId(), rating: 5, comment: 'Amazing quality and taste!' },
      { userId: new mongoose.Types.ObjectId(), rating: 4, comment: 'Great product, mixes well.' }
    ]
  },
  {
    name: 'Creatine Monohydrate - Unflavored',
    description: 'Pure creatine monohydrate powder. Scientifically proven to increase strength, power, and muscle mass. 5g per serving, 100 servings per container.',
    price: 899,
    stock: 75,
    category: 'Creatine',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'
    ],
    brand: 'Koushiks Supplements',
    ratings: [
      { userId: new mongoose.Types.ObjectId(), rating: 5, comment: 'Best creatine I\'ve used!' }
    ]
  },
  {
    name: 'BCAA Powder - Fruit Punch',
    description: '2:1:1 ratio of Leucine, Isoleucine, and Valine. Supports muscle recovery, reduces fatigue, and enhances endurance during workouts.',
    price: 1299,
    stock: 60,
    category: 'Amino Acids',
    images: [
      'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500'
    ],
    brand: 'Koushiks Supplements',
    ratings: [
      { userId: new mongoose.Types.ObjectId(), rating: 4, comment: 'Good taste and effective.' }
    ]
  },
  {
    name: 'Pre-Workout Energy - Blue Raspberry',
    description: 'High-energy pre-workout formula with caffeine, beta-alanine, and citrulline malate. Boosts energy, focus, and performance.',
    price: 1799,
    stock: 40,
    category: 'Pre-Workout',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'
    ],
    brand: 'Koushiks Supplements',
    ratings: [
      { userId: new mongoose.Types.ObjectId(), rating: 5, comment: 'Incredible energy boost!' },
      { userId: new mongoose.Types.ObjectId(), rating: 4, comment: 'Great for intense workouts.' }
    ]
  },
  {
    name: 'Casein Protein - Chocolate',
    description: 'Slow-digesting casein protein for sustained amino acid release. Perfect for nighttime use to support muscle recovery while you sleep.',
    price: 2699,
    stock: 35,
    category: 'Casein Protein',
    images: [
      'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500'
    ],
    brand: 'Koushiks Supplements',
    ratings: [
      { userId: new mongoose.Types.ObjectId(), rating: 5, comment: 'Perfect for nighttime recovery.' }
    ]
  },
  {
    name: 'Mass Gainer - Vanilla',
    description: 'High-calorie mass gainer with 50g protein and 250g carbs per serving. Perfect for hardgainers looking to bulk up and gain weight.',
    price: 3299,
    stock: 30,
    category: 'Mass Gainers',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'
    ],
    brand: 'Koushiks Supplements',
    ratings: [
      { userId: new mongoose.Types.ObjectId(), rating: 4, comment: 'Helped me gain weight effectively.' }
    ]
  },
  {
    name: 'Glutamine Powder - Unflavored',
    description: 'Pure L-Glutamine powder to support muscle recovery, immune function, and gut health. 5g per serving, 200 servings per container.',
    price: 799,
    stock: 80,
    category: 'Amino Acids',
    images: [
      'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500'
    ],
    brand: 'Koushiks Supplements',
    ratings: [
      { userId: new mongoose.Types.ObjectId(), rating: 5, comment: 'Great for recovery.' }
    ]
  },
  {
    name: 'Multivitamin Complex',
    description: 'Comprehensive multivitamin with 20+ essential vitamins and minerals. Supports overall health, energy levels, and immune function.',
    price: 599,
    stock: 100,
    category: 'Vitamins',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500'
    ],
    brand: 'Koushiks Supplements',
    ratings: [
      { userId: new mongoose.Types.ObjectId(), rating: 5, comment: 'Essential daily supplement.' },
      { userId: new mongoose.Types.ObjectId(), rating: 4, comment: 'Good quality vitamins.' }
    ]
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products (optional - comment out if you want to keep existing)
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Created ${createdProducts.length} products:`);
    
    createdProducts.forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.name} - ₹${product.price}`);
    });

    console.log('\n🎉 Product seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
    process.exit(1);
  }
};

seedProducts();

