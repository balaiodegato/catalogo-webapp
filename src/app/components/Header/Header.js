import React from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import paw from '../../../assets/paw.png'
import logo from '../../../assets/logo.png'


const Header = ({ filter, setFilter }) => {
    const history = useHistory()

    const navigateToHome = () => {
        history.push('/')
    }

    return (
        <div style={styles.header}>
            <img style={styles.logo} src={logo} alt="logo balaio de gato" onClick={navigateToHome} />
            <h1 style={styles.title} onClick={navigateToHome}>
                CATÁLOGO DE ANIMAIS    
            </h1>

            <img src={paw} alt='patinha' style={styles.paw}/>

            <div style={styles.searchContainer}>
                <FontAwesomeIcon icon={faSearch} style={styles.searchIcon}/>
                <input 
                    id="searchInput" 
                    style={styles.input} 
                    type='text' 
                    placeholder='PESQUISE AQUI'
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                />
            </div>
        </div>
    )
}

const styles = {
    title: {
        cursor: 'pointer',
        color: 'white',
        margin: 0
    },
    logo: {
        cursor: 'pointer',
        width: '70px',
        height: '70px',
        marginRight: '2rem',
        marginLeft: '1rem'
    },
    header: {
        backgroundColor: '#b7cd00',
        display: 'flex',
        alignItems: 'center',
        height: '70px',
        width: '100vw',
    },
    paw: {
        marginLeft: '2rem'
    },
    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#0772d3',
        padding: '10px',
        borderRadius: '25px',
        width: '16vw',
        marginLeft: '4vw'
    },
    searchIcon: {
        color: 'white',
        marginRight: '8px'
    },
    input: {
        outline: 'none',
        backgroundColor: '#0772d3',
        border: 'none',
        width: '15vw',
        color: 'white'
    }
}

export default Header