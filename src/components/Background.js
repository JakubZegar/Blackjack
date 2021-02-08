import styled from 'styled-components';
import backgroundImage from '../assets/table-background.jpg'

export const Background = styled.div`
    display: flex;
    background-image: url(${backgroundImage});
    background-size:cover;
    background-attachment: fixed;
    background-position:center;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
`