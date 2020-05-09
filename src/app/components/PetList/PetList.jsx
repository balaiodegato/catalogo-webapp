import React, { useState, useEffect } from "react";
import { Grid, Paper } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { PetItem } from './PetItem';
import { FilterButton } from './FilterButton';
import { makeStyles } from '@material-ui/core/styles';
import Api from '../../../api/index'
import { STATE_COLORS, VALID_KINDS, KIND_LABELS } from '../../../common'
import { useHistory } from 'react-router';

export const PetList = ({ filter }) => {

    const classes = useStyles()
    const [pets, setPets] = useState([])
    const [filteredPets, setFilteredPets] = useState([])
    const [filteredKind, setFilteredKind] = useState(null)
    const history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            const response = await Api.getAllPets()

            const orderedPets = sortPets(response.data)
            setPets(orderedPets)
            setFilteredPets(orderedPets)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if(filter.length >= 3) {
            const orderedPets = sortPets(filteredPets.filter(pet => pet.name.includes(filter)))
            setFilteredPets(orderedPets)
        } else if(filter.length === 0) {
            setFilteredPets(pets)
        }
    }, [filter])

    const headers = [
        { key: '1', label: 'Nome' },
        { key: '2', label: 'Data de Resgate' },
        { key: '3', label: 'Data de Adoção' },
        { key: '4', label: 'Castrado' },
        { key: '5', label: 'Teste' }
    ]

    function filterKindPets(kind) {
        const filteredPets = pets.filter(pet => pet.kind === kind)
        setFilteredPets(sortPets(filteredPets))
        setFilteredKind(kind)
    }

    function sortPets(pets) {
        const petsParaAdocao = sortPetsByName(pets.filter(pet => pet.status === 'Para adoção'))
        const petsAdotados = sortPetsByName(pets.filter(pet => pet.status === 'Adotado'))
        const petsResidentes = sortPetsByName(pets.filter(pet => pet.status === 'Residente'))
        const petsEstrelinha = sortPetsByName(pets.filter(pet => pet.status === 'Estrelinha'))

        return [...petsParaAdocao, ...petsAdotados, ...petsResidentes, ...petsEstrelinha]
    }

    function sortPetsByName(pets) {
        return pets.sort((a, b) => a.name > b.name ? 1 : -1)
    }

    function openNewPet() {
        history.push('/newpet/' + filteredKind)
    }

    return <div>
        { VALID_KINDS.includes(filteredKind) &&
          <Tooltip title={`Adicionar ${KIND_LABELS[filteredKind]}`} aria-label='add'>
            <Fab className={classes.addButton} onClick={openNewPet} color='primary' aria-label='add'>
              <AddIcon />
            </Fab>
          </Tooltip>
        }
        <Grid container>
            <Grid
                item
                xs={12}
                className={classes.actionsGrid}
            >
                    <div>
                        <FilterButton filterPets={filterKindPets} />
                    </div>

                    <div>
                        <span className={classes.labelStatus}><div className={classes.colorParaAdocao}></div>Para Adoção</span>
                        <span className={classes.labelStatus}><div className={classes.colorAdotado}></div>Adotado</span>
                        <span className={classes.labelStatus}><div className={classes.colorResidente}></div>Residente</span>
                        <span className={classes.labelStatus}><div className={classes.colorEstrelinha}></div>Estrelinha</span>
                    </div>
            </Grid>

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
