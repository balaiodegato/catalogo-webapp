import React from "react";
import { Grid, Paper } from '@material-ui/core';
import { AnimalItem } from './AnimalItem';
import { FilterButton } from './FilterButton';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

export const AnimalList = (props) => {

        const classes = useStyles()

        const headers = [
            { key: '1', label: 'Nome' },
            { key: '2', label: 'Data de Resgate' },
            { key: '3', label: 'Data de Adoção' },
            { key: '4', label: 'Data de Castração' },
            { key: '5', label: 'Teste' }
        ]

        const animals = [
            { 
                key: '1', 
                name: 'Renatinho',
                dataResgate: '09/12/2018',
                dataAdocao: '-',
                dataCastracao: '15/12/2018',
                infoTeste: 'Negativo',
                dataTeste: '15/12/2018',
                status: 'Adotado'
            },
            { 
                key: '2', 
                name: 'Mamão',
                dataResgate: '30/11/2019',
                dataAdocao: '05/12/2019',
                dataCastracao: '01/12/2019',
                infoTeste: 'Negativo',
                dataTeste: '01/12/2019',
                status: 'ParaAdocao'
            },
            { 
                key: '3', 
                name: 'Ícaro',
                dataResgate: '02/11/2018',
                dataAdocao: '-',
                dataCastracao: '10/12/2018',
                infoTeste: 'Positivo',
                dataTeste: '11/12/2018',
                status: 'DaCasa'
            }
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
                    <HeaderItem classes={classes} header={header}></HeaderItem>
                ))}

                {animals.map(animal => (
                        <AnimalItem key={animal.key} animal={animal} />
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
                { header.label.toUpperCase() }
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

export default AnimalList