import React, { createContext, useReducer } from 'react'
import { STATES, KINDS } from './common'

const initialState = {
    filter: {
        name: '',
        kind: KINDS.cat,
        status: STATES.available
    },
    selectedPetId: undefined,
    pets: []
}

const ACTIONS = {
    SET_SELECTED_PET: 'setSelectedPet',
    SET_FILTER: 'setFilter',
    SET_PETS: 'setPets'
}

const AppContext = createContext(initialState)
const { Provider } = AppContext

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {

        switch (action.type) {
            case ACTIONS.SET_SELECTED_PET:
                return {
                    ...state,
                    selectedPetId: action.payload
                }
            case ACTIONS.SET_FILTER:
                return {
                    ...state,
                    filter: action.payload
                }
            case ACTIONS.SET_PETS:
                return {
                    ...state,
                    pets: action.payload
                }
            default:
                throw new Error()
        }

    }, initialState)

    return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { AppContext, StateProvider, ACTIONS }