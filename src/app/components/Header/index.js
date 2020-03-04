import React from 'react'
import paw from '../../../assets/paw.png'
import menuburguer from '../../../assets/menuburguer.png'
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <div className='header'>
            <img src={menuburguer} className='menuburguer'/>
            <h1 className='title'>
                CATÁLOGO DE ANIMAIS    
            </h1>
            <img src={paw} className='paw'/>
            
            {/* <div className='search-box'>
                <FontAwesomeIcon icon={faSearch} className='search-icon'/>
                <input type='text' placeholder='PESQUISE AQUI' className='search'/>
            </div> */}
        </div>
    )
}


export default Header