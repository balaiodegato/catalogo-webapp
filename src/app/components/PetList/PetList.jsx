import React, { useState, useEffect } from "react";
import { Grid, Paper } from '@material-ui/core';
import { PetItem } from './PetItem';
import { FilterButton } from './FilterButton';
import { makeStyles } from '@material-ui/core/styles';
import Api from '../../../api/index'

export const PetList = () => {

    const classes = useStyles()
    const [pets, setPets] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const apiResponse = await Api.getAllPets()
            setPets(apiResponse.data)
        }
        fetchData()
    }, [])

    const headers = [
        { key: '1', label: 'Nome' },
        { key: '2', label: 'Data de Resgate' },
        { key: '3', label: 'Data de Adoção' },
        { key: '4', label: 'Data de Castração' },
        { key: '5', label: 'Teste' }
    ]

    return (
        <Grid container>
            {/* <Grid 
                    item 
                    xs={12}
                >
                    <FilterButton/>
                    
                </Grid> */}
            <Grid
                item
                xs={2}
                className={classes.containerHeader}
            ></Grid>

            {headers.map(header => (
                <HeaderItem key={header.key} classes={classes} header={header}></HeaderItem>
            ))}

            {pets.map(pet => (
                <PetItem key={pet.id} pet={pet} />
            ))}

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
    paperHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#b8cd00',
        borderRadius: '10px',
        height: '100%',
        fontWeight: '600'
    }
}))

export default PetList