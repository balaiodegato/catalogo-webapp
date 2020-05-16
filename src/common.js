
import moment from 'moment'

import catPhotoDefault from './assets/cat-default-photo.jpg'
import dogPhotoDefault from './assets/dog-default-photo.jpg'

export const VALID_STATES = {
    'star': ['star', 'Estrelinha'],
    'available': ['available', 'Para adoção'],
    'adopted': ['adopted', 'Adotado'],
    'resident': ['resident', 'Residente']
}

export const STATES = {
    'star': 'star',
    'available': 'available',
    'adopted': 'adopted',
    'resident': 'resident'
}

export const STATE_COLORS = {
    'star': '#f2a994',
    'available': '#a0db8e',
    'adopted': '#92a8d1',
    'resident': '#007239',
}

export const STATE_LABELS = {
    'star': 'Estrelinha',
    'available': 'Para Adoção',
    'adopted': 'Adotado',
    'resident': 'Residente',
}

export const GENDER_LABELS = {
    'M': 'Macho',
    'F': 'Fêmea',
    null: '-',
}

export const TEST_RESULT_LABELS = {
    cat: {
        'fiv-positive': 'Positivo fiv',
        'felv-positive': 'Positivo felv',
        'fiv-felv-positive': 'Positivo fiv e felv',
        'negative': 'Negativo',
        null: 'Não testado',
    },
    dog: {
        true: 'Positivo leishmaniose',
        false: 'Negativo',
        null: 'Não testado',
    },
}

export const KINDS = {
    cat: 'cat',
    dog: 'dog'
}

export const VALID_KINDS = ['dog', 'cat']

export const DEFAULT_PHOTOS = {
    'dog': dogPhotoDefault,
    'cat': catPhotoDefault,
}

export const KIND_LABELS = {
    'dog': 'Cão',
    'cat': 'Gato',
}

export function formatDate(dt) {
  if (!dt) {
    return '-'
  }

  return moment(dt).format('DD/MM/YYYY')
}
