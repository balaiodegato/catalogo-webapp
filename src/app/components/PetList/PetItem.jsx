import React, { useEffect, useContext } from 'react';
import { Grid, Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'

import {
  STATES,
  STATE_COLORS,
  DEFAULT_PHOTOS,
  TEST_RESULT_LABELS,
  formatDate,
} from '../../../common'
import { AppContext, ACTIONS } from '../../../AppContext';

export function PetItem({ pet }) {
    const { state, dispatch } = useContext(AppContext)
    const classes = useStyles()
    const history = useHistory()

    useEffect(() => {
        if(state.selectedPetId && state.selectedPetId === pet.id) {
            window.location.hash = `#${pet.id}`;
            window.scrollTo({ left: 0, top: window.scrollY - 75 })
        }
    }, [state.selectedPetId, pet.id])

    const statusClass = {
        [STATES.adopted]: `${classes.statusIndicator} ${classes.statusIndicatorAdotado}`,
        [STATES.star]: `${classes.statusIndicator} ${classes.statusIndicatorEstrelinha}`,
        [STATES.resident]: `${classes.statusIndicator} ${classes.statusIndicatorResidente}`,
        [STATES.available]: `${classes.statusIndicator} ${classes.statusIndicatorAdocao }`,

        //TEMP
        // 'Adotado': `${classes.statusIndicator} ${classes.statusIndicatorAdotado}`,
        // 'Estrelinha': `${classes.statusIndicator} ${classes.statusIndicatorEstrelinha}`,
        // 'Residente': `${classes.statusIndicator} ${classes.statusIndicatorResidente}`,
        // 'Para adoção': `${classes.statusIndicator} ${classes.statusIndicatorAdocao }`
    }

    const navigateToDetails = () => {
        dispatch({
            type: ACTIONS.SET_SELECTED_PET,
            payload: pet.id
        })
        history.push(`/details/${pet.id}`)
    }

    return (
        <Grid
            id={pet.id}
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
                            src={pet.img ? pet.img : DEFAULT_PHOTOS[pet.kind]}
                        />
                    </Grid>
                </GridData>

                <GridData className={classes.gridItemBold}>
                    {pet.name}
                </GridData>

                <GridData className={classes.gridItem}>
                    {formatDate(pet.rescue_date)}
                </GridData>

                <GridData className={classes.gridItem}>
                    {formatDate(pet.adoption_date)}
                </GridData>

                <GridData className={classes.gridItem}>
                    {pet.castrated ? 'Sim' : 'Não'}
                    {pet.castration_date ?  ` (${formatDate(pet.castration_date)})` : ''}
                </GridData>

                <GridData className={classes.gridItem}>
                    {TEST_RESULT_LABELS[pet.kind][pet.test_result]}
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

    statusIndicator: {
        height: '100px',
        width: '80px',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px'
    },
    statusIndicatorAdotado: {
        backgroundColor: STATE_COLORS.adopted,
    },
    statusIndicatorEstrelinha: {
        backgroundColor: STATE_COLORS.star,
    },
    statusIndicatorResidente: {
        backgroundColor: STATE_COLORS.resident,
    },
    statusIndicatorAdocao: {
        backgroundColor: STATE_COLORS.available,
    }
}))

export default PetItem
