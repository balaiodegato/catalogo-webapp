import React, { useState, useEffect, useContext } from "react";
import { Grid, Paper } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

import { PetItem } from './PetItem'
import Filters from './Filters'
import { AppContext, ACTIONS } from '../../../AppContext'
import { VALID_STATES, STATE_COLORS, VALID_KINDS, KIND_LABELS } from '../../../common'

export const PetList = () => {
    const { state, dispatch } = useContext(AppContext)

    const classes = useStyles()
    const [filteredPets, setFilteredPets] = useState([])
    const [filteredKind, setFilteredKind] = useState(null)
    const history = useHistory()

    useEffect(() => {
        const pets = filterPets(state.pets, state.filter)
        const orderedPets = sortPets(pets)
        setFilteredPets(orderedPets);
        setFilteredKind(state.filter.kind)
    }, [state.pets, state.filter])

    const headers = [
        { key: '1', label: 'Nome' },
        { key: '2', label: 'Data de Resgate' },
        { key: '3', label: 'Data de Adoção' },
        { key: '4', label: 'Castrado' },
        { key: '5', label: 'Teste' }
    ]

    function filterPets(pets, filter) {
        if (filter.name !== '') {
            pets = pets.filter(pet =>
                normalize(pet.name)
                    .includes(
                        normalize(state.filter.name)
                    )
            )
        }

        return pets.filter(pet => pet.kind === filter.kind)
            .filter(pet => VALID_STATES[filter.status].includes(pet.status)) //TEMP
            // Retornar esse código quando normalizar o status dos pets
            // .filter(pet => filter.status === pet.status)
    }

    function sortPets(pets) {
        // Retornar esse código quando normalizar o status dos pets
        // const petsParaAdocao = sortPetsByName(pets.filter(pet => pet.status === STATES.available))
        // const petsAdotados = sortPetsByName(pets.filter(pet => pet.status === STATES.adopted))
        // const petsResidentes = sortPetsByName(pets.filter(pet => pet.status === STATES.resident))
        // const petsEstrelinha = sortPetsByName(pets.filter(pet => pet.status === STATES.star))

        // TEMP
        const petsParaAdocao = sortPetsByName(pets.filter(pet => VALID_STATES.available.includes(pet.status)))
        const petsAdotados = sortPetsByName(pets.filter(pet => VALID_STATES.adopted.includes(pet.status)))
        const petsResidentes = sortPetsByName(pets.filter(pet => VALID_STATES.resident.includes(pet.status)))
        const petsEstrelinha = sortPetsByName(pets.filter(pet => VALID_STATES.star.includes(pet.status)))

        return [...petsParaAdocao, ...petsAdotados, ...petsResidentes, ...petsEstrelinha]
    }

    function sortPetsByName(pets) {
        return pets.sort((a, b) => a.name > b.name ? 1 : -1)
    }

    function setFilter(filter) {
        dispatch({
            type: ACTIONS.SET_FILTER,
            payload: filter
        });
    }

    function normalize(str) {
        return str
            .replace(/[^a-zA-Z ]/g, '')
            .toLowerCase()
    }

    function openNewPet() {
        history.push('/newpet/' + filteredKind)
    }

    return <div>
        {VALID_KINDS.includes(filteredKind) &&
            <Tooltip title={`Adicionar ${KIND_LABELS[filteredKind]}`} aria-label='add'>
                <Fab className={classes.addButton} onClick={openNewPet} color='primary' aria-label='add'>
                    <AddIcon />
                </Fab>
            </Tooltip>
        }
        <Grid container>

            <Filters filter={state.filter} setFilter={setFilter} />
            <Grid
                item
                xs={2}
                className={classes.containerHeader}
            ></Grid>

            {headers.map(header => (
                <HeaderItem key={header.key} classes={classes} header={header}></HeaderItem>
            ))}

            {filteredPets.map(pet => (
                <PetItem key={pet.id} pet={pet} />
            ))}

        </Grid>
    </div>
}

function HeaderItem(props) {
    const { classes, header } = props

    return (
        <Grid
            key={header.key}
            item
            xs={2}
            className={classes.containerHeader}
        >
            <Paper className={classes.paperHeader}>
                {header.label.toUpperCase()}
            </Paper>
        </Grid>
    )
}

const useStyles = makeStyles(() => ({
    containerHeader: {
        position: 'sticky',
        top: 0,
        height: '60px',
        padding: '5px'
    },
    actionsGrid: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px'
    },
    paperHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#b8cd00',
        borderRadius: '10px',
        height: '100%',
        fontWeight: '600'
    },
    gridLabelStatus: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-end'
    },
    labelStatus: {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginRight: '4vw'
    },
    colorParaAdocao: {
        width: '17px',
        height: '17px',
        margin: '0 5px',
        backgroundColor: STATE_COLORS.available,
    },
    colorAdotado: {
        width: '17px',
        height: '17px',
        margin: '0 5px',
        backgroundColor: STATE_COLORS.adopted,
    },
    colorResidente: {
        width: '17px',
        height: '17px',
        margin: '0 5px',
        backgroundColor: STATE_COLORS.resident,
    },
    colorEstrelinha: {
        width: '17px',
        height: '17px',
        margin: '0 5px',
        backgroundColor: STATE_COLORS.star,
    },
    addButton: {
        right: '10px',
        bottom: '10px',
        position: 'fixed',
    },
}))

export default PetList
