import styled from 'styled-components';
import {colors} from '../../assets/colors'

export const GameScreenContainer = styled.div`
    display:flex;
    flex:1;
    flex-direction:row;
    align-items:center;
    justify-content:space-around;
`

export const HandsContainer = styled.div`
    display:flex;
    flex:3;
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

export const BalanceContainer = styled.div`
    display:flex;
    flex: 1;
    flex-direction:column;
    align-items:center;
    justify-content:flex-end;
`

export const Balance = styled.div`
    background-color: ${colors.buttonHover};
    border-radius:50%;
    padding: 24px;
    align-items:center;
    justify-content:center;
    border: 8px solid black;
    width: 120px;
    margin: 3px 0 3px 0;
`

export const BalanceText = styled.h4`
    color:white;
    text-align:center;
`

export const BetText = styled.h5`
    color:white;
    text-align:center;
`

export const BetCoin = styled.div`
    display: flex;
    width:50px;
    height: 50px;
    background-color: ${colors.buttonPrimary};
    border: 8px solid black;
    border-radius: 50%;
    margin: 1px;
    align-items:center;
    justify-content:center;
    cursor: pointer;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: ${({enabled}) => (enabled ? colors.disabled : colors.buttonHover)};
    }
`

export const BetConiText = styled.h3`
    color:white;
    text-align:center;
`

export const Message = styled.h2`
    color:white;
`
export const OptionsContainer = styled.div`
    display:flex;
    flex:1;
    flex-direction: column;
    align-self: stretch;
    align-items: space-between;
    justify-content:space-between;
    padding: 16px;
`

export const HistoryContainer = styled.div`
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content:center;
`

