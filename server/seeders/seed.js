const db = require('../config/connection'); // Import the new db module
const { User, Campaign } = require('../models'); // Import the User model
const userSeeds = require('./userSeeds.json');
const campaignSeeds = require('./campaignSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Campaign', 'campaigns');
    await cleanDB('User', 'users');

    console.log(userSeeds);
    console.log(campaignSeeds);

    await User.create(userSeeds);
    await Campaign.create(campaignSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
