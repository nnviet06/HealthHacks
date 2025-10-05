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

// 3. Read and parse the JSON file safely
let raw;
try {
  raw = fs.readFileSync(dataFilePath, 'utf8');
} catch (err) {
  console.error('Failed to read data file:', err);
  process.exit(1);
}

let parsed;
try {
  parsed = JSON.parse(raw);
} catch (err) {
  console.error('Failed to parse JSON:', err);
  process.exit(1);
}

// 3b. Normalize to an array of items.
// Support formats: top-level array, or object with keys like Ingredients (array), Recipe (object), etc.
function collectItems(obj) {
  if (Array.isArray(obj)) return obj;
  if (obj && typeof obj === 'object') {
    const items = [];
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (Array.isArray(val)) {
        items.push(...val);
      } else if (val && typeof val === 'object' && (val.Id || val.Name || val.name)) {
        items.push(val);
      }
    }
    return items;
  }
  return [];
}

const dataItems = collectItems(parsed);

if (!dataItems.length) {
  console.error('No items found in data file after normalization. Aborting.');
  process.exit(1);
}

// helper to build a safe doc id
function safeId(rawId, index) {
  if (!rawId) return undefined;
  const s = String(rawId).trim();
  if (!s) return undefined;
  // remove characters invalid in Firestore path and limit length
  return s.replace(/[\/\\#?\s]+/g, '-').slice(0, 150);
}

// 4. Function to upload data
async function uploadData() {
  const collectionRef = db.collection('foods');

  console.log('Starting data upload...', `found ${dataItems.length} items`);

  let success = 0;
  let skipped = 0;

  for (let i = 0; i < dataItems.length; i++) {
    const item = dataItems[i];
    // try multiple potential ID fields
    const candidateId = item.Name || item.name || item.Id || item.id || item.title || item.Title;
    const docId = safeId(candidateId, i);

    try {
      if (docId) {
        await collectionRef.doc(docId).set(item);
        console.log(`Added: ${docId}`);
      } else {
        // no safe id -> let Firestore auto-generate id
        const docRef = await collectionRef.add(item);
        console.log(`Added with auto-id: ${docRef.id}`);
      }
      success++;
    } catch (error) {
      console.error(`Error adding item at index ${i} (candidateId='${candidateId}'):`, error);
      skipped++;
    }
  }

  console.log(`Data upload finished! success=${success}, skipped=${skipped}`);
}

uploadData().catch((err) => {
  console.error('Unexpected upload error:', err);
  process.exit(1);
});