
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

export const VALID_KINDS = ['dog', 'cat']
