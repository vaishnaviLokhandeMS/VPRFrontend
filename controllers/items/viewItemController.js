const mongoose = require('mongoose');

const viewItem = async (req, res) => {
  const { itemName } = req.query; // Extract itemName from the query parameters

  if (!itemName) {
    return res.status(400).json({ message: 'Item name is required' });
  }

  const shopIDFromToken = req.shopId; // Retrieved from the shop token

  try {
    const shopMongoDbUri = `${process.env.MONGO_URI}/${shopIDFromToken}`;
    const shopMongoConnection = mongoose.createConnection(shopMongoDbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    shopMongoConnection.once('open', async () => {
      console.log(`MongoDB connected for shop ${shopIDFromToken}`);

      const db = shopMongoConnection.db;
      const itemCollection = db.collection('items');

      // Query the MongoDB collection using itemName
      const itemDetails = await itemCollection.findOne({ itemName });

      if (!itemDetails) {
        shopMongoConnection.close();
        return res.status(404).json({ message: 'Item not found' });
      }

      res.json(itemDetails); // Respond with the item details
      shopMongoConnection.close();
    });

    shopMongoConnection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      res.status(500).json({ message: 'MongoDB error', error: err });
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

module.exports = {
  viewItem,
};
