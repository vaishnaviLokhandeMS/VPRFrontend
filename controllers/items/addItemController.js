const mongoose = require('mongoose');
const { createConnection } = require('../../config/db.js');
const dotenv = require('dotenv');
const generateUniqueItemID = require('../../utils/generateUniqueItemID'); // Import the function
const moment = require('moment'); // Import moment for date and time handling
dotenv.config();

// MongoDB connection
const connectMongoDB = require('../../config/mongo');

const addItem = async (req, res) => {
  const {
    itemName,
    itemHSN,
    itemCode,
    shortDescription,
    description,
    sgst,
    cgst,
    salePriceWithTax,
    salePriceWithoutTax,
    wholesalePriceWithTax,
    wholesalePriceWithoutTax,
    discountedPriceWithTax,
    discountedPriceWithoutTax,
    costPriceWithTax,
    costPriceWithoutTax,
    wholesaleQuantity,
    weight,
    weightUnit,
    volume,
    volumeUnit,
    size,
    efficiency,
    length,
    lengthUnit,
    width,
    widthUnit,
    height,
    heightUnit,
    diameter,
    radius,
    diameterUnit,
    radiusUnit,
    type,
    ram,
    storage,
    storageUnit,
    stock,
    stockUnit,
    minStockQty,
    minStockQtyUnit,
    storageLocation,
    rack,
    drawer,
    shelfLife,
    temperature,
    temperatureUnit,
    minTemperature,
    minTemperatureUnit,
    maxTemperature,
    maxTemperatureUnit,
    power,
    powerUnit,
    voltage,
    voltageUnit,
    current,
    currentUnit,
    capacity,
    capacityUnit,
    supply,
    powerFactor,
    warranty,
    warrantyUnit,
    guarantee,
    guaranteeUnit,
    location,
    material,
    tags,
    environmentalImpact,
    usageInstructions,
    hazardousMaterial,
    grade,
    certification,
    complianceStandards,
    legalRequirements,
    createdByUser,
    shopID,
    supplierID,
    manufacturer,
    countryOfOrigin,
    createTime,
    lastModified,
    manufacturedOn,
    manufacturingDate,
    expiryDate,
    category,
    sku,
    barcode,
    serialNumber,
    batchNumber,
    modelNumber,
  } = req.body;

  const userID = req.userId; // Retrieved from the user token
  const shopIDFromToken = req.shopId; // Retrieved from the shop token

  // Create MySQL connection with shopIDFromToken
  const db = createConnection(shopIDFromToken);

  try {
    // Generate unique item ID
    const itemID = await generateUniqueItemID(shopIDFromToken);

    // Get current date and time
    const currentDate = moment().format('YYYY-MM-DD');
    const currentTime = moment().format('HH:mm:ss');

    // Insert item into MySQL
    const insertItemQuery = `
      INSERT INTO items (itemID, createdBy, createdOnDate, createdOnTime, modifiedBy, modifiedOnDate, modifiedOnTime)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const itemData = [itemID, userID, currentDate, currentTime, userID, currentDate, currentTime];

    db.query(insertItemQuery, itemData, (insertItemErr, result) => {
      if (insertItemErr) {
        db.end();
        return res.status(500).json({ message: 'Database error', error: insertItemErr });
      }

      // Insert item into MongoDB
      const shopMongoDbUri = `${process.env.MONGO_URI}/${shopIDFromToken}`;
      const shopMongoConnection = mongoose.createConnection(shopMongoDbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      shopMongoConnection.once('open', async () => {
        console.log(`MongoDB connected for shop ${shopIDFromToken}`);

        const db = shopMongoConnection.db;
        const collections = await db.listCollections({ name: 'items' }).toArray();
        let itemCollection;

        if (collections.length === 0) {
          itemCollection = await db.createCollection('items');
          console.log('Created new items collection in MongoDB');
        } else {
          itemCollection = db.collection('items');
        }

        // Build the item document dynamically
        const itemDocument = {
          _id: itemID,
          itemID,
          shopID: shopIDFromToken,
          userID,
        };

        // Only add properties that have values
        if (itemName) itemDocument.itemName = itemName;
        if (itemHSN) itemDocument.itemHSN = itemHSN;
        if (itemCode) itemDocument.itemCode = itemCode;
        if (shortDescription) itemDocument.shortDescription = shortDescription;
        if (description) itemDocument.description = description;
        if (sgst) itemDocument.sgst = sgst;
        if (cgst) itemDocument.cgst = cgst;
        if (salePriceWithTax) itemDocument.salePriceWithTax = salePriceWithTax;
        if (salePriceWithoutTax) itemDocument.salePriceWithoutTax = salePriceWithoutTax;
        if (wholesalePriceWithTax) itemDocument.wholesalePriceWithTax = wholesalePriceWithTax;
        if (wholesalePriceWithoutTax) itemDocument.wholesalePriceWithoutTax = wholesalePriceWithoutTax;
        if (discountedPriceWithTax) itemDocument.discountedPriceWithTax = discountedPriceWithTax;
        if (discountedPriceWithoutTax) itemDocument.discountedPriceWithoutTax = discountedPriceWithoutTax;
        if (costPriceWithTax) itemDocument.costPriceWithTax = costPriceWithTax;
        if (costPriceWithoutTax) itemDocument.costPriceWithoutTax = costPriceWithoutTax;
        if (wholesaleQuantity) itemDocument.wholesaleQuantity = wholesaleQuantity;
        if (weight) itemDocument.weight = weight;
        if (weightUnit) itemDocument.weightUnit = weightUnit;
        if (volume) itemDocument.volume = volume;
        if (volumeUnit) itemDocument.volumeUnit = volumeUnit;
        if (size) itemDocument.size = size;
        if (efficiency) itemDocument.efficiency = efficiency;
        if (length) itemDocument.length = length;
        if (lengthUnit) itemDocument.lengthUnit = lengthUnit;
        if (width) itemDocument.width = width;
        if (widthUnit) itemDocument.widthUnit = widthUnit;
        if (height) itemDocument.height = height;
        if (heightUnit) itemDocument.heightUnit = heightUnit;
        if (diameter) itemDocument.diameter = diameter;
        if (radius) itemDocument.radius = radius;
        if (diameterUnit) itemDocument.diameterUnit = diameterUnit;
        if (radiusUnit) itemDocument.radiusUnit = radiusUnit;
        if (type) itemDocument.type = type;
        if (ram) itemDocument.ram = ram;
        if (storage) itemDocument.storage = storage;
        if (storageUnit) itemDocument.storageUnit = storageUnit;
        if (stock) itemDocument.stock = stock;
        if (stockUnit) itemDocument.stockUnit = stockUnit;
        if (minStockQty) itemDocument.minStockQty = minStockQty;
        if (minStockQtyUnit) itemDocument.minStockQtyUnit = minStockQtyUnit;
        if (storageLocation) itemDocument.storageLocation = storageLocation;
        if (rack) itemDocument.rack = rack;
        if (drawer) itemDocument.drawer = drawer;
        if (shelfLife) itemDocument.shelfLife = shelfLife;
        if (temperature) itemDocument.temperature = temperature;
        if (temperatureUnit) itemDocument.temperatureUnit = temperatureUnit;
        if (minTemperature) itemDocument.minTemperature = minTemperature;
        if (minTemperatureUnit) itemDocument.minTemperatureUnit = minTemperatureUnit;
        if (maxTemperature) itemDocument.maxTemperature = maxTemperature;
        if (maxTemperatureUnit) itemDocument.maxTemperatureUnit = maxTemperatureUnit;
        if (power) itemDocument.power = power;
        if (powerUnit) itemDocument.powerUnit = powerUnit;
        if (voltage) itemDocument.voltage = voltage;
        if (voltageUnit) itemDocument.voltageUnit = voltageUnit;
        if (current) itemDocument.current = current;
        if (currentUnit) itemDocument.currentUnit = currentUnit;
        if (capacity) itemDocument.capacity = capacity;
        if (capacityUnit) itemDocument.capacityUnit = capacityUnit;
        if (supply) itemDocument.supply = supply;
        if (powerFactor) itemDocument.powerFactor = powerFactor;
        if (warranty) itemDocument.warranty = warranty;
        if (warrantyUnit) itemDocument.warrantyUnit = warrantyUnit;
        if (guarantee) itemDocument.guarantee = guarantee;
        if (guaranteeUnit) itemDocument.guaranteeUnit = guaranteeUnit;
        if (location) itemDocument.location = location;
        if (material) itemDocument.material = material;
        if (tags) itemDocument.tags = tags;
        if (environmentalImpact) itemDocument.environmentalImpact = environmentalImpact;
        if (usageInstructions) itemDocument.usageInstructions = usageInstructions;
        if (hazardousMaterial) itemDocument.hazardousMaterial = hazardousMaterial;
        if (grade) itemDocument.grade = grade;
        if (certification) itemDocument.certification = certification;
        if (complianceStandards) itemDocument.complianceStandards = complianceStandards;
        if (legalRequirements) itemDocument.legalRequirements = legalRequirements;
        if (createdByUser) itemDocument.createdByUser = createdByUser;
        if (supplierID) itemDocument.supplierID = supplierID;
        if (manufacturer) itemDocument.manufacturer = manufacturer;
        if (countryOfOrigin) itemDocument.countryOfOrigin = countryOfOrigin;
        if (createTime) itemDocument.createTime = createTime;
        if (lastModified) itemDocument.lastModified = lastModified;
        if (manufacturedOn) itemDocument.manufacturedOn = manufacturedOn;
        if (manufacturingDate) itemDocument.manufacturingDate = manufacturingDate;
        if (expiryDate) itemDocument.expiryDate = expiryDate;
        if (category) itemDocument.category = category;
        if (sku) itemDocument.sku = sku;
        if (barcode) itemDocument.barcode = barcode;
        if (serialNumber) itemDocument.serialNumber = serialNumber;
        if (batchNumber) itemDocument.batchNumber = batchNumber;
        if (modelNumber) itemDocument.modelNumber = modelNumber;

        await itemCollection.insertOne(itemDocument);
        console.log('Item added to MongoDB');

        res.status(201).json({ success: true, message: 'Item added successfully' });
        shopMongoConnection.close();
      });

      shopMongoConnection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        res.status(500).json({ message: 'MongoDB error', error: err });
      });
    });
  } catch (err) {
    db.end();
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

module.exports = {
  addItem,
};
