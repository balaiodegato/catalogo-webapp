import React from 'react';
import { Grid, Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const AnimalItem = (props) => {

    const { animal } = props
    const classes = useStyles()
    
    const informationTestClass = {
        'Negativo': classes.infoTesteNegativo,
        'Positivo': classes.infoTestePositivo
    }

    const statusClass = {
        'Adotado': classes.statusIndicatorAdotado,
        'ParaAdocao': classes.statusIndicatorParaAdocao,
        'DaCasa': classes.statusIndicatorDaCasa
    }

    return (
        <Grid 
            container
            className={classes.container}
        >
            <Paper
                className={classes.paper}
            >
                <GridData className={classes.gridItem}>
                    <Grid
                        xs={4}
                    >
                        <Box
                            className={statusClass[animal.status]}
                        ></Box>
                    </Grid>
                    
                    <Grid
                        xs={8}
                    >
                        <img 
                            width='80'
                            height='80'
                            src='https://abrilsuperinteressante.files.wordpress.com/2018/05/filhotes-de-cachorro-alcanc3a7am-o-c3a1pice-de-fofura-com-8-semanas1.png'
                            alt="FotoAnimal"
                        />
                    </Grid>
                </GridData>
                
                <GridData className={{ ...classes.gridItem, fontWeight: '600' }}>
                    {animal.name}
                </GridData>

                <GridData className={classes.gridItem}>
                    {animal.dataResgate}
                </GridData>

                <GridData className={classes.gridItem}>
                    {animal.dataAdocao}
                </GridData>

                <GridData className={classes.gridItem}>
                    {animal.dataCastracao}
                </GridData>

                <GridData className={classes.gridTesteItem}>
                    <Typography
                        className={informationTestClass[animal.infoTeste]}
                    >
                        {animal.infoTeste}
                    </Typography>
                    <Typography>
                        {animal.dataTeste}
                    </Typography>
                </GridData>

            </Paper>
        </Grid>
    )
}

const GridData = (props) => {
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
    statusIndicatorParaAdocao: {
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

export default AnimalItem