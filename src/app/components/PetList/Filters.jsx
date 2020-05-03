import React from 'react'
import styled from 'styled-components'
import MSearchIcon from '@material-ui/icons/Search';

import { STATES, STATE_COLORS, STATE_LABELS, KINDS } from '../../../common'

export const Filters = ({ filter, setFilter }) => {

    const handleChangeFilter = (type, value) => {
        setFilter({
            ...filter,
            [type]: value
        })
    }

    return (
        <Container>
            
            <div>
                <SearchContainer>
                    <SearchIcon />
                    <SearchInput
                        value={filter.name}
                        onChange={e => handleChangeFilter('name', e.target.value)}
                    />
                </SearchContainer>

                <KindContainer>
                    <KindButton 
                        selected={filter.kind === 'cat'}
                        onClick={() => handleChangeFilter('kind', KINDS.cat)}
                    >Gatos</KindButton>

                    <KindButton 
                        selected={filter.kind === 'dog'}
                        onClick={() => handleChangeFilter('kind', KINDS.dog)}
                    >Cães</KindButton>
                </KindContainer>
            </div>

            <StatusContainer>
                <StatusButton
                    status={STATES.available}
                    selected={filter.status === STATES.available}
                    onClick={() => handleChangeFilter('status', STATES.available)}
                >{STATE_LABELS.available}</StatusButton>

                <StatusButton
                    status={STATES.adopted}
                    selected={filter.status === STATES.adopted}
                    onClick={() => handleChangeFilter('status', STATES.adopted)}
                >{STATE_LABELS.adopted}</StatusButton>

                <StatusButton
                    status={STATES.resident}
                    selected={filter.status === STATES.resident}
                    onClick={() => handleChangeFilter('status', STATES.resident)}
                >{STATE_LABELS.resident}</StatusButton>

                <StatusButton
                    status={STATES.star}
                    selected={filter.status === STATES.star}
                    onClick={() => handleChangeFilter('status', STATES.star)}
                >{STATE_LABELS.star}</StatusButton>
            </StatusContainer>

        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);

    width: 100%;
    padding: 2.5vh 3.5vw;
`

const SearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #0772d3;
    padding: 10px;
    border-radius: 25px;
    width: 16vw;
    height: 20px;
    margin-bottom: 2vh;
`

const SearchIcon = styled(MSearchIcon)`
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

const RoundButton = styled.button`
    outline: none;
    cursor: pointer;
    
    height: fit-content;
    padding: 10px 30px;
    margin-right: 10px;
    
    border: 2px solid;
    border-radius: 50px;
    
    font-weight: 600;
    letter-spacing: 1px;
    transition: all 0.3s;
`

const KindContainer = styled.div`
    display: flex;
`

const KindButton = styled(RoundButton)`
    background: ${props => props.selected ? '#b8cd00' : 'transparent'};
    color: ${props => props.selected ? 'white' : '#b8cd00'};
    border-color: #b8cd00;
`

const StatusContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const StatusButton = styled(RoundButton)`
    background-color: ${props => props.selected ? STATE_COLORS[props.status] : 'transparent'};
    color: ${props => props.selected ? 'white' : STATE_COLORS[props.status]};
    border-color: ${props => STATE_COLORS[props.status]};
`

export default Filters