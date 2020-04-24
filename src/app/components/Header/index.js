import React from 'react'
import paw from '../../../assets/paw.png'
import { Link } from 'react-router-dom'
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <div className='header'>
            <Link style={styles.title} to="/">
                <h1 className='title'>
                    CATÁLOGO DE ANIMAIS    
                </h1>
            </Link>
            <img src={paw} alt='paw' className='paw'/>
            
            {/* <div className='search-box'>
                <FontAwesomeIcon icon={faSearch} className='search-icon'/>
                <input type='text' placeholder='PESQUISE AQUI' className='search'/>
            </div> */}
        </div>
    )
}

const styles = {
    title: {
        textDecoration: 'none'
    }
}


export default Header