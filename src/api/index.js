
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const STATES = {
  'Estrelinha': 'star',
  'Para adoção': 'available',
  'Adotado': 'adopted',
  'Adotada': 'adopted',
  'Residente': 'resident',
}

const GENDER_STRINGS = {
  'fêmea': 'F',
  'femea': 'F',
  'macho': 'M',
}

const GENDER_VALUES = ['M', 'F']

const TEST_RESULT_STRINGS = {
  cat: {
    'Positivo fiv': 'fiv-positive',
    'Positivo felv': 'felv-positive',
    'Positivo fiv e felv': 'fiv-felv-positive',
    'Negativo': 'negative',
  },
  dog: {
    'Positivo leishmaniose': true,
    'Negativo': false,
  },
}

const TEST_RESULT_VALUES = {
  cat: ['fiv-positive', 'felv-positive', 'fiv-felv-positive', 'negative'],
  dog: [true, false],
}

const NULLABLE_KEYS = ['status', 'rescue_date', 'test_result', 'adoption_date']

function normalizeField(value, string_values, valid_values) {
  if (value && value.toLowerCase && string_values[value.toLowerCase()]) {
    return string_values[value.toLowerCase()]
  } else if (!valid_values.includes(value)) {
    return null
  }
  return value
}

function normalizePetData(petData) {
  const pet = {...petData}
  for (let key of Object.keys(pet)) {
    if (NULLABLE_KEYS.includes(key) && !pet[key]) {
      pet[key] = null
    }
  }

  pet.gender = normalizeField(pet.gender, GENDER_STRINGS, GENDER_VALUES)

  pet.test_result = normalizeField(
    pet.test_result, TEST_RESULT_STRINGS[pet.kind], TEST_RESULT_VALUES[pet.kind])

  if (STATES[pet.status]) {
    pet.status = STATES[pet.status]
  }

  if (!pet.castration_date && pet.castrated === "Sim") {
    pet.castration_date = '2010-01-01'
  }

  return pet
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      let data = e.target.result;
      resolve(data);
    };

    reader.readAsArrayBuffer(file);
  });
}

class Api {

  static BASE_URL = 'https://us-central1-dataloadercatalogobalaiogato.cloudfunctions.net/api/v1/animals'

  static async getPet(petId) {
    try {
      const req = await axios.get(`${this.BASE_URL}/${petId}`)
      return normalizePetData(req.data)
    } catch(err) {
      console.warn('Erro ao requisitar Firebase: ', err);
    }
  }

  static getPetPhotoUrl(petId, size) {
    return `${this.BASE_URL}/${petId}/photos/${size}`
  }

  static getPetPhotoCachableUrl(petId, size) {
    // Add cachekey query parameter to get a cachable URL
    return Api.getPetPhotoUrl(petId, size) + '?cachekey=' + uuidv4()
  }

  static async uploadPhoto(petId, size, file) {
    const imageBinaryData = await readFile(file);
    await axios({
      url: Api.getPetPhotoUrl(petId, size),
      data: imageBinaryData,
      method: 'PUT',
      headers: {
        'content-type': 'application/octet-stream'
      },
    })
    return Api.getPetPhotoCachableUrl(petId, size)
  }

  static async savePet(petId, data) {
    if (data.img) {
      data.img = await Api.uploadPhoto(petId, 'original', data.img)
    }

    try {
      const req = await axios.patch(`${this.BASE_URL}/${petId}`, data)
      return req.data
    } catch (err) {
      console.error('Erro ao requisitar Firebase: ', err);
    }
  }

  static getAllPets() {
    try {
      return axios.get(this.BASE_URL)
    } catch(err) {
      console.warn('Erro ao requisitar Firebase: ', err);
    }
  }
}

export default Api;

