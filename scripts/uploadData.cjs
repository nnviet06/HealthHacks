// health-hacks/scripts/uploadData.js

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// 1. Initialize Firebase Admin
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 2. Define the path to your JSON data file
const dataFilePath = path.join(__dirname, '../../data/data_sample.json');

// 3. Read and parse the JSON file
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

// 4. Function to upload data
async function uploadData() {
  
  const collectionRef = db.collection('foods'); 

  console.log('Starting data upload...');
  
 
  for (const item of data.Ingredients) {
    try {
      
      const docRef = collectionRef.doc(item.Name); 
      await docRef.set(item);
      console.log(`Successfully added: ${item.Name}`);
    } catch (error) {
      console.error(`Error adding ${item.Name}: `, error);
    }
  }

  console.log('Data upload finished!');
}


uploadData();