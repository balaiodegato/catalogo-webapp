import React, { useState, useEffect } from "react";
import { Grid, Paper } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { PetItem } from './PetItem';
import { FilterButton } from './FilterButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Api from '../../../api/index'

export const PetList = () => {

    const classes = useStyles()
    const [pets, setPets] = useState([])
    const [filteredPets, setFilteredPets] = useState([])
    const [paginatedPets, setPaginatedPets] = useState([])
    const [filter, setFilter] = useState('')

    const [page, setPage] = useState(1)
    const itemsPerPage = 6

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
        const initialIndex = itemsPerPage * (page -1)
        const finalIndex = initialIndex + itemsPerPage
        setPaginatedPets(filteredPets.slice(initialIndex, finalIndex))
    }, [filteredPets, page])

    useEffect(() => {
        if(filter.length >= 3) {
            setFilteredPets(
                filteredPets.filter(pet => pet.name.includes(filter))
            )
        } else if(filter.length === 0) {
            setFilteredPets(pets)
        }
        setPage(1)
    
    // eslint-disable-next-line
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
        
        setFilteredPets(filteredPets)
        setPage(1)
    }

    function sortPets(pets) {
        return pets.sort((a, b) => a.status > b.status ? 1 : -1)
    }

    return (
        <Grid container>
            <Grid
                item
                xs={12}
                className={classes.actionsGrid}
            >
                <Grid
                    item
                    xs={6}
                >
                    <TextField 
                        className={classes.searchInput}
                        label='Pesquise pelo nome do pet' 
                        color='primary' 
                        value={filter} 
                        onChange={(e) => { setFilter(e.target.value) }}
                    />
                    <FilterButton filterPets={filterKindPets} />
                </Grid>
                <Grid
                    item
                    xs={6}
                    className={classes.gridLabelStatus}
                >
                    <span className={classes.labelStatus}><div className={classes.colorParaAdocao}></div>Para Adoção</span>
                    <span className={classes.labelStatus}><div className={classes.colorAdotado}></div>Adotado</span>
                    <span className={classes.labelStatus}><div className={classes.colorResidente}></div>Residente</span>
                    <span className={classes.labelStatus}><div className={classes.colorEstrelinha}></div>Estrelinha</span>
                </Grid>
            </Grid>

            <Grid
                item
                xs={2}
                className={classes.containerHeader}
            ></Grid>

            {headers.map(header => (
                <HeaderItem key={header.key} classes={classes} header={header}></HeaderItem>
            ))}

            {paginatedPets.map(pet => (
                <PetItem key={pet.id} pet={pet} />
            ))}

            <Pagination count={Math.ceil(filteredPets.length / itemsPerPage)} page={page} onChange={(e, page) => setPage(page)} />

        </Grid>
    )
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

const useStyles = makeStyles(theme => ({
    containerHeader: {
        height: '60px',
        padding: '5px'
    },
    searchInput: {
        margin: '5px',
        width: '20vw'
    },
    actionsGrid: {
        display: 'flex',
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
        justifyContent: 'space-around'
    },
    labelStatus: {
        display: 'flex'
    },
    colorParaAdocao: {
        width: '17px',
        height: '17px',
        marginRight: '5px',
        backgroundColor: '#a0db8e'
    },
    colorAdotado: {
        width: '17px',
        height: '17px',
        marginRight: '5px',
        backgroundColor: '#92a8d1'
    },
    colorResidente: {
        width: '17px',
        height: '17px',
        marginRight: '5px',
        backgroundColor: '#007239'
    },
    colorEstrelinha: {
        width: '17px',
        height: '17px',
        marginRight: '5px',
        backgroundColor: '#f2a994'
    }
}))

export default PetList