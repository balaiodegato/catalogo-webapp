import React from 'react'
import styled from 'styled-components'
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
        <HeaderContainer>
            <Logo onClick={navigateToHome}/>
            <Title onClick={navigateToHome}>
                CATÁLOGO DE ANIMAIS    
            </Title>

            <Paw />

            <SearchContainer>
                <SearchIcon/>
                <SearchInput 
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                />
            </SearchContainer>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    background-color: #b7cd00;
    display: flex;
    align-items: center;
    height: 70px;
    width: 100vw;
`

const Logo = styled.img.attrs({
    src: logo,
    alt: 'logo balaio de gato',
})`
    cursor: pointer;
    width: 70px;
    height: 70px;
    margin-right: 2rem;
    margin-left: 1rem;
`

const Title = styled.h1`
    cursor: pointer;
    color: white;
    margin: 0;
`

const Paw = styled.img.attrs({
    src: paw,
    alt: 'patinha'
})`
    margin-left: 2rem;
`

const SearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #0772d3;
    padding: 10px;
    border-radius: 25px;
    width: 16vw;
    margin-left: 4vw;
`

const SearchIcon = styled(FontAwesomeIcon).attrs({
    icon: faSearch
})`
    color: white;
    margin-right: 8px;
`

const SearchInput = styled.input.attrs({
    type: 'text',
    placeholder: 'PESQUISE AQUI'
})`
    ::placeholder {
        color: white;
    }

    outline: none;
    background-color: #0772d3;
    border: none;
    width: 15vw;
    color: white;
`

export default Header