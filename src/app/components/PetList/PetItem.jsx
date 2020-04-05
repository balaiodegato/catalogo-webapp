import React from 'react';
import { Grid, Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import catPhotoDefault from '../../../assets/cat-default-photo.jpg'
import dogPhotoDefault from '../../../assets/dog-default-photo.jpg'

export function PetItem({ pet }) {

    const classes = useStyles()
    const history = useHistory()

    const statusClass = {
        'Adotado': classes.statusIndicatorAdotado,
        'Estrelinha': classes.statusIndicatorEstrelinha,
        'Residente': classes.statusIndicatorResidente,
        'Para adoção': classes.statusIndicatorAdocao
    }

    const navigateToDetails = () => {
        history.push(`/details/${pet.id}`)
    }

    return (
        <Grid
            container
            className={classes.container}
            onClick={() => navigateToDetails()}
        >
            <Paper
                className={classes.paper}
            >
                <GridData className={classes.gridItem}>
                    <Grid
                        item
                        xs={4}
                    >
                        <Box
                            className={statusClass[pet.status]}
                        ></Box>
                    </Grid>

                    <Grid
                        xs={8}
                        item
                    >
                        <PetPhoto
                            src={pet.img ? pet.img : getDefaultPhoto(pet)}
                        />
                    </Grid>
                </GridData>

                <GridData className={classes.gridItemBold}>
                    {pet.name}
                </GridData>

                <GridData className={classes.gridItem}>
                    {pet.rescue_date}
                </GridData>

                <GridData className={classes.gridItem}>
                    {pet.adoption_date}
                </GridData>

                <GridData className={classes.gridItem}>
                    {pet.castrated}
                </GridData>

                <GridData className={classes.gridItem}>
                    {pet.test_result}
                </GridData>

            </Paper>
        </Grid>
    )
}

function getDefaultPhoto(pet) {
    switch(pet.kind) {
        case 'cat':
            return catPhotoDefault
        case 'dog':
            return dogPhotoDefault
        default:
            return null
    }
}

function GridData(props) {
    const { className, children } = props

    return (
        <Grid
            item
            md={2}
            sm={12}
            className={className}
        >
            {children ? children : '-'}
        </Grid>
    )
}

function PetPhoto({ src }) {

    return (
        <img
            width='80'
            height='80'
            src={src}
            alt="FotoPet"
        />
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        margin: '5px',
        height: '100px'
    },
    paper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: '10px'
    },
    gridItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridItemBold: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '600'
    },
    statusIndicatorAdotado: {
        height: '100px',
        width: '10px',
        backgroundColor: '#92a8d1',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px'
    },
    statusIndicatorEstrelinha: {
        height: '100px',
        width: '10px',
        backgroundColor: '#f2a994',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px'
    },
    statusIndicatorResidente: {
        height: '100px',
        width: '10px',
        backgroundColor: '#007239',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px'
    },
    statusIndicatorAdocao: {
        height: '100px',
        width: '10px',
        backgroundColor: '#a0db8e',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px'
    }
}))

export default PetItem