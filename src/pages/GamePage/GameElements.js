import styled from 'styled-components';
import {colors} from '../../assets/colors'

export const HandsContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
`

export const UserHandContainer = styled.div`
    display:flex;
    flex:1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
`

export const CroupierHandContainer = styled.div`
    display:flex;
    flex:1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
`

export const ActionButtonContainer = styled.div`
    display:flex;
    flex:2;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    margin: 5px 0 5px 0;
`

export const PointsContainer = styled.div`
    display: flex;
    width:60px;
    min-height: 30px;
    border-radius: 30px;
    margin-top: 5px;
    margin-bottom: 10px;
    border: solid 5px ${colors.buttonBorder};
    background-color: ${colors.buttonHover};
    justify-content: center;
    align-items: center;
`

export const PointsValue = styled.div`
    color: white;
    text-align: center;
    font-weight: bold;
`