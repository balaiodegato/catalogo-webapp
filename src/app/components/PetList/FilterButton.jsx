import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { useEffect } from 'react'

export const FilterButton = ({ filterPets }) => {

    const classes = useStyles()
    const [isDogFilterSelected, setIsDogFilterSelected] = useState(false)
    const [isCatFilterSelected, setIsCatFilterSelected] = useState(false)
    const [dogFilterButtonClass, setDogFilterButtonClass] = useState(classes.filterButton)
    const [catFilterButtonClass, setCatFilterButtonClass] = useState(classes.filterButton)

    useEffect(() => {
        if(isDogFilterSelected) {
            filterPets('dog')
            setIsCatFilterSelected(false)
            setDogFilterButtonClass(`${classes.filterButton} ${classes.selected}`)
        } else {
            setDogFilterButtonClass(classes.filterButton)
        }
    // eslint-disable-next-line
    }, [isDogFilterSelected])

    useEffect(() => {
        if(isCatFilterSelected) {
            filterPets('cat')
            setIsDogFilterSelected(false)
            setCatFilterButtonClass(`${classes.filterButton} ${classes.selected}`)
        } else {
            setCatFilterButtonClass(classes.filterButton)
        }
    // eslint-disable-next-line
    }, [isCatFilterSelected])

    return (
        <Grid container className={classes.container}>
            <button 
                className={dogFilterButtonClass}
                onClick={() => setIsDogFilterSelected(true)}
            >
                Cães
            </button>

            <button 
                className={catFilterButtonClass}
                onClick={() => setIsCatFilterSelected(true)}
            >
                Gatos
            </button>
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        padding: '5px'
    },
    filterButton: {
        padding: '10px',
        marginRight: '10px',
        width: '90px',
        background: 'white',
        border: '2px solid #b8cd00',
        outline: 'none',
        borderRadius: '50px',
        color: '#b8cd00',
    },
    selected: {
        background: '#b8cd00',
        color: 'white'
    }
}))

export default FilterButton