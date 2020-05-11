import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import paw from '../../../assets/paw.png'
import logo from '../../../assets/logo.png'


const Header = () => {
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
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    background-color: #b7cd00;
    display: flex;
    align-items: center;
    height: 70px;
    width: 100%;
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

export default Header