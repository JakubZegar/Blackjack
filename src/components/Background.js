import styled from 'styled-components';
import backgroundImage from '../assets/table-background.jpg'

export const Background = styled.div`
    display: flex;
    background-image: url(${backgroundImage});
    background-size:cover;
    background-position:center;
    min-height: 100vh;
    max-height: 100vh;
    min-width: 100vw;
    max-width: 100vw;
    align-items: center;
    justify-content: center;
`