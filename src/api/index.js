
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { VALID_KINDS, MONTHS_PTBR } from '../common';

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
    'positivo fiv': 'fiv-positive',
    'positivo felv': 'felv-positive',
    'felv positivo': 'felv-positive',
    'positivo fiv e felv': 'fiv-felv-positive',
    'negativo': 'negative',
    'negativa': 'negative',
  },
  dog: {
    'positivo leishmaniose': 'positive-leish',
    'positivo': 'positive-leish',
    'negativo': 'negative',
    'true': 'positive-leish',
    'false': 'negative',
  },
}

const TEST_RESULT_VALUES = {
  cat: ['fiv-positive', 'felv-positive', 'fiv-felv-positive', 'negative'],
  dog: ['positive-leish', 'negative'],
}

const NULLABLE_KEYS = ['status', 'rescue_date', 'test_result', 'adoption_date']

const SPECIAL_DATE_VALUES = {
  '2018': '2018-01-01',
  'gosto 2016': '2016-08-01',
}

function normalizeField(value, string_values, valid_values) {
  if (value && value.toLowerCase && string_values[value.trim().toLowerCase()]) {
    return string_values[value.trim().toLowerCase()]
  } else if (!valid_values.includes(value)) {
    return null
  }
  return value
}

function normalizeDateMonthYearFormat(text) {
  if (!text) {
    return null
  }

  if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(text)) {
    return text
  }

  text = text.trim().toLowerCase()

  if (SPECIAL_DATE_VALUES[text]) {
    return SPECIAL_DATE_VALUES[text]
  }

  if (text.split(' ').length !== 2) {
    console.warn('Invalid date length after split:', text)
    return null
  }

  const [monthStr, yearStr] = text.split(' ')
  const monthIndex = MONTHS_PTBR.indexOf(monthStr.toLowerCase())
  const year = Number(yearStr)
  if (monthIndex !== -1 && !isNaN(year) && year >= 2010 && year <= 2030) {
    const date = String(year) + '-' + String(monthIndex + 1).padStart(2, '0') + '-01'
    return date
  } else {
    return null
  }
}

function normalizeCastrationFields(pet) {
  if (pet.castrated === true || pet.castrated === false) {
    return
  }

  if (!pet.castrated || typeof pet.castrated !== typeof '') {
    pet.castrated = false
    pet.castration_date = null
    return
  }

  pet.castrated = pet.castrated.trim().toLowerCase()

  if (pet.castrated === "" || pet.castrated === 'não') {
    pet.castrated = false
    pet.castration_date = null
  } else if (pet.castrated.trim() === 'sim') {
    pet.castrated = true
    pet.castration_date = null
  } else {
    pet.castration_date = normalizeDateMonthYearFormat(pet.castrated)
    pet.castrated = false
  }
}

function normalizePetData(petData) {
  const pet = {...petData}
  for (let key of Object.keys(pet)) {
    if (NULLABLE_KEYS.includes(key) && !pet[key]) {
      pet[key] = null
    }
  }

  if (!VALID_KINDS.includes(pet.kind)) {
    pet.kind = 'cat'
  }

  pet.gender = normalizeField(pet.gender, GENDER_STRINGS, GENDER_VALUES)

  pet.test_result = normalizeField(
    pet.test_result, TEST_RESULT_STRINGS[pet.kind], TEST_RESULT_VALUES[pet.kind])

  if (STATES[pet.status]) {
    pet.status = STATES[pet.status]
  }

  normalizeCastrationFields(pet)

  pet.when_born = normalizeDateMonthYearFormat(pet.when_born)
  pet.rescue_date = normalizeDateMonthYearFormat(pet.rescue_date)
  pet.adoption_date = normalizeDateMonthYearFormat(pet.adoption_date)

  pet.rescue_info = String(pet.rescue_info || "")
  pet.behaviour_info = String(pet.behaviour_info || "")
  pet.sponsorship = String(pet.sponsorship || "")

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
      data.img = await Api.uploadPhoto(petId, 'small', data.img)
    }
    if (data.img_original) {
      data.img_original = await Api.uploadPhoto(petId, 'original', data.img_original)
    }
    if (data.img_medium) {
      data.img_medium = await Api.uploadPhoto(petId, 'medium', data.img_medium)
    }

    try {
      const req = await axios.patch(`${this.BASE_URL}/${petId}`, data)
      return req.data
    } catch (err) {
      console.error('Erro ao requisitar Firebase: ', err);
    }
  }

  static async createPet(data) {
    try {
      const req = await axios.post(`${this.BASE_URL}`, data)
      return req.data
    } catch (err) {
      console.error('Erro ao requisitar Firebase: ', err);
    }
  }

  static async getAllPets() {
    try {
      const result = await axios.get(this.BASE_URL + '?cache=true')
      return result.data.map(normalizePetData)
    } catch(err) {
      console.warn('Erro ao requisitar Firebase: ', err);
    }
  }

  static async countPets() {
    try {
      const result = await axios.get(this.BASE_URL + '/count')
      return result.data
    } catch(err) {
      console.warn('Erro ao requisitar Firebase: ', err);
    }
  }

}

export default Api;

