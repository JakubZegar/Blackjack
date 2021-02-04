import styled from 'styled-components';
import {colors} from '../../assets/colors'

export const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    display:flex;
    flex-direction: column;
    background-color: ${colors.background};
    padding: 0 70px;
    height: 350px;
    width: 250px;
    z-index: 1;
    border-radius: 24px;
`

export const MenuTitle = styled.h1`
    color: white;
    text-align: center;
`