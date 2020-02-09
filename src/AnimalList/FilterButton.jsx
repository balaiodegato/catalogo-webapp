import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Button, Typography} from '@material-ui/core'

export const FilterButton = () => {

    const classes = useStyles()

    return (
        <Grid>
            <Button 
                variant="outlined" 
                className={classes.deselectedButton}
            >
                <span className={classes.deselectedDot}></span>
                <Typography
                    className={classes.colorGreen}
                >
                    Cães
                </Typography>
            </Button>

            <Button 
                variant="primary" 
                className={classes.selectedButton}
            >
                <Typography
                    className={classes.colorWhite}
                >
                    Gatos
                </Typography>
                <span className={classes.selectedDot}></span>
            </Button>
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    colorGreen: {
        color: '#b8cd00'
    },
    deselectedButton: {
        border: '2px solid #b8cd00',
        padding: '5px',
        borderRadius: '50px',
        width: '150px'
    },
    deselectedDot: {
        height: '30px',
        width: '30px',
        backgroundColor: '#bbb',
        borderRadius: '50%',
        display: 'inline-block'
    },
    colorWhite: {
        color: '#ffffff'
    },
    selectedButton: {
        backgroundColor: '#b8cd00',
        padding: '5px',
        borderRadius: '50px',
        width: '150px'
    },
    selectedDot: {
        height: '30px',
        width: '30px',
        backgroundColor: '#0573d1',
        borderRadius: '50%',
        display: 'inline-block'
    }
}))

export default FilterButton