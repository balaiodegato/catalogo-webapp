
import axios from 'axios';

let petsDatabase = null;

function parseCsvValue(value) {
  if (value === "NULL") {
    return null;
  }

  return value;
}

function buildObj(fields, values) {
  const obj = {};
  fields.forEach((field, index) => {
    obj[field] = parseCsvValue(values[index]);
  });
  return obj;
}

setTimeout(async () => {
  const data = (await axios.get('/pets_data.csv')).data.split('\n');
  const fields = data[0].split(',');
  const database = {}
  for (let row of data.slice(1)) {
    if (row.length === 0) {
      continue;
    }
    const obj = buildObj(fields, row.split(','));
    database[obj.id] = obj;
  }

  const photos_data = (await axios.get('/pets_photos.csv')).data.split('\n');
  const photos_fields = photos_data[0].split(',');
  for (let row of photos_data.slice(1)) {
    if (row.length === 0) {
      continue;
    }
    const obj = buildObj(photos_fields, row.split(','));
    database[obj.id].photo = obj.data;
  }

  petsDatabase = database;
});


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, +ms));
}


class Api {
  static async getPet(petId) {
    await sleep(100);
    while (!petsDatabase) {
      await sleep(100);
    }
    return petsDatabase[petId];
  }

  static async savePet(petId, data) {
    await sleep(100);
    petsDatabase[petId] = {
      ...petsDatabase[petId],
      ...data,
    };
    return petsDatabase[petId];
  }
}

export default Api;

