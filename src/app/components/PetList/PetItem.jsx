import React from 'react';
import { Grid, Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'

export function PetItem ({ pet }) {

    const classes = useStyles()
    const history = useHistory()
    
    const informationTestClass = {
        'Negativo': classes.infoTesteNegativo,
        'Positivo': classes.infoTestePositivo
    }

    const statusClass = {
        'Adotado': classes.statusIndicatorAdotado,
        'Estrelinha': classes.statusIndicatorEstrelinha,
        'DaCasa': classes.statusIndicatorDaCasa
    }

    const navigateToDetails = () => {
        history.push(`/details/${pet.id}`)
    }

    return (
        <Grid 
            container
            className={classes.container}
            onClick={() => navigateToDetails() }
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
                        <img 
                            width='80'
                            height='80'
                            src={pet.imgUrl}
                            alt="FotoPet"
                        />
                    </Grid>
                </GridData>
                
                <GridData className={{ ...classes.gridItem, fontWeight: '600' }}>
                    {pet.name}
                </GridData>

                <GridData className={classes.gridItem}>
                    {pet.rescue_date}
                </GridData>

                <GridData className={classes.gridItem}>
                    {pet.adoption_date}
                </GridData>

                <GridData className={classes.gridItem}>
                    {pet.castration_date}
                </GridData>

                <GridData className={classes.gridTesteItem}>
                    <Typography
                        className={informationTestClass[pet.felv_fiv]}
                    >
                        {pet.test_result}
                    </Typography>
                    <Typography>
                        {pet.test_date}
                    </Typography>
                </GridData>

            </Paper>
        </Grid>
    )
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
            { children }
        </Grid>
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
    gridTesteItem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoTesteNegativo: {
        fontWeight: 600,
        color: '#11b726'
    },
    infoTestePositivo: {
        fontWeight: 600,
        color: '#ff1414'
    },
    statusIndicatorAdotado: {
        height: '100px',
        width: '10px',
        backgroundColor: 'yellow',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px'
    },
    statusIndicatorEstrelinha: {
        height: '100px',
        width: '10px',
        backgroundColor: 'purple',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px'
    },
    statusIndicatorDaCasa: {
        height: '100px',
        width: '10px',
        backgroundColor: 'green',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px'
    }
}))

export default PetItem