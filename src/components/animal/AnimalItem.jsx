import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const AnimalItem = (props) => {

    const { animal } = props
    const classes = useStyles()
    
    const getClassInfoTeste = (infoTeste) => {
        switch(infoTeste) {
            case 'Negativo':
                return classes.infoTesteNegativo
            case 'Positivo':
                return classes.infoTestePositivo
            default:
                return null

        }
    }

    const getClassStatus = (status) => {
        switch(status) {
            case 'Adotado':
                return classes.statusIndicatorAdotado
            case 'ParaAdocao':
                return classes.statusIndicatorParaAdocao
            case 'DaCasa':
                return classes.statusIndicatorDaCasa
            default:
                return null
        }
    }

    return (
        <Grid 
            container
            className={classes.container}
        >
            <Paper
                className={classes.paper}
            >
                <Grid
                    item
                    md={2}
                    sm={12}
                    className={classes.gridItem}
                >
                    <Grid
                        xs={4}
                    >
                        <div
                            className={getClassStatus(animal.status)}
                        ></div>
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
                </Grid>
                
                <Grid
                    item
                    md={2}
                    sm={12}
                    className={classes.gridItem}
                    style={{ fontWeight: '600' }}
                >
                    {animal.name}
                </Grid>

                <Grid
                    item
                    md={2}
                    sm={12}
                    className={classes.gridItem}
                >
                    {animal.dataResgate}
                </Grid>

                <Grid
                    item
                    md={2}
                    sm={12}
                    className={classes.gridItem}
                >
                    {animal.dataAdocao}
                </Grid>

                <Grid
                    item
                    md={2}
                    sm={12}
                    className={classes.gridItem}
                >
                    {animal.dataCastracao}
                </Grid>

                <Grid
                    item
                    md={2}
                    sm={12}
                    className={classes.gridTesteItem}
                >
                    <Typography
                        className={getClassInfoTeste(animal.infoTeste)}
                    >
                        {animal.infoTeste}
                    </Typography>
                    <Typography>
                        {animal.dataTeste}
                    </Typography>
                </Grid>

            </Paper>
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