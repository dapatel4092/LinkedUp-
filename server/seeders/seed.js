const mongoose = require('mongoose');
const Game = require('../models/Game');
// one time seed file to get our Games the user can choose populated to the database
const games = [
    { title: 'Apex Legends' },
    { title: 'Call of Duty' },
    { title: 'Fortnite' },
    { title: 'Counter-Strike: Global Offensive'}
  ];
  
  const seedGames = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/gamers');
      await Game.deleteMany();
      const insertedGames = await Game.insertMany(games);
      console.log(`Seeded ${insertedGames.length} games`);
    } catch (err) {
      console.error('Error seeding games:', err);
    } finally {
      mongoose.connection.close();
    }
  };
  
  seedGames();