
import axios from 'axios';

const STATES = {
    "Residente do abrigo": "resident",
    "Para adoção": "available",
}

const NULLABLE_KEYS = ['status', 'rescue_date', 'test_result', 'adoption_date']

function normalizePetData(petData) {
  const pet = {...petData}
  for (let key of Object.keys(pet)) {
    if (NULLABLE_KEYS.includes(key) && !pet[key]) {
      pet[key] = null
    }
  }

  if (STATES[pet.status]) {
    pet.status = STATES[pet.status]
  }

  if (!pet.castration_date && pet.castrated === "Sim") {
    pet.castration_date = '2010-01-01'
  }

  return pet
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

  static async savePet(petId, data) {
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

