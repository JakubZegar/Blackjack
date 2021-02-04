import React from 'react'
import { Button } from '../../components/Button'
import { MenuContainer, MenuTitle } from './MenuElements'

function Menu() {
    return (
        <MenuContainer>
            <MenuTitle>
                Blackjack
            </MenuTitle>

            <Button to={'/game'}>Play</Button>
            <Button to={'/rank'}>High Scores</Button>
            <Button to={'/options'}>Options</Button>
            <Button to={'/help'}>Help</Button>

        </MenuContainer>
    )
}

export default Menu
