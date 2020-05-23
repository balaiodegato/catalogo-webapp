import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import MSearchIcon from '@material-ui/icons/Search';

import { STATES, STATE_COLORS, STATE_LABELS, KINDS, VALID_STATES } from '../../../common'

export const Filters = ({ filter, setFilter, countPets }) => {
    
    const [consolidatedCount, setConsolidatedCount] = useState({ cat: {}, dog: {} })
    
    useEffect(() => {
        const count = {
            cat: consolidatesPetStates(countPets, 'cat'),
            dog: consolidatesPetStates(countPets, 'dog')
        }
        setConsolidatedCount(count)
    }, [countPets])

    const handleChangeFilter = (type, value) => {
        setFilter({
            ...filter,
            [type]: value
        })
    }

    const consolidatesPetStates = (countPets, kind) => {
        const consolidatedCount = {
            total: 0,
            adopted: 0,
            available: 0,
            star: 0,
            resident: 0
        }

        for(const state in countPets[kind]) {
            const stateQuantity = countPets[kind][state]
            
            consolidatedCount.total += stateQuantity
            if(VALID_STATES.adopted.includes(state)) {
                consolidatedCount.adopted += stateQuantity
            }
            if(VALID_STATES.available.includes(state)) {
                consolidatedCount.available += stateQuantity
            }
            if(VALID_STATES.star.includes(state)) {
                consolidatedCount.star += stateQuantity
            }
            if(VALID_STATES.resident.includes(state)) {
                consolidatedCount.resident += stateQuantity
            }
        }

        return consolidatedCount
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
                    >Gatos: { consolidatedCount.cat.total ? consolidatedCount.cat.total : '0' }</KindButton>

                    <KindButton 
                        selected={filter.kind === 'dog'}
                        onClick={() => handleChangeFilter('kind', KINDS.dog)}
                    >Cães: { consolidatedCount.dog.total ? consolidatedCount.dog.total : '0' }</KindButton>
                </KindContainer>
            </div>

            <StatusContainer>
                <StatusButton
                    status={STATES.available}
                    selected={filter.status === STATES.available}
                    onClick={() => handleChangeFilter('status', STATES.available)}
                >{`${STATE_LABELS.available}: ${consolidatedCount[filter.kind].available ? consolidatedCount[filter.kind].available : '0'}`}</StatusButton>

                <StatusButton
                    status={STATES.adopted}
                    selected={filter.status === STATES.adopted}
                    onClick={() => handleChangeFilter('status', STATES.adopted)}
                >{`${STATE_LABELS.adopted}: ${consolidatedCount[filter.kind].adopted ? consolidatedCount[filter.kind].adopted : '0'}`}</StatusButton>

                <StatusButton
                    status={STATES.resident}
                    selected={filter.status === STATES.resident}
                    onClick={() => handleChangeFilter('status', STATES.resident)}
                >{`${STATE_LABELS.resident}: ${consolidatedCount[filter.kind].resident ? consolidatedCount[filter.kind].resident : '0'}`}</StatusButton>

                <StatusButton
                    status={STATES.star}
                    selected={filter.status === STATES.star}
                    onClick={() => handleChangeFilter('status', STATES.star)}
                >{`${STATE_LABELS.star}: ${consolidatedCount[filter.kind].star ? consolidatedCount[filter.kind].star : '0'}`}</StatusButton>
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