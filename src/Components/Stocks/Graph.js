import React from 'react'
import styled from 'styled-components'
import Chart from 'react-google-charts'

function Graph() {
    return (
        <Container>
            <p>Graph</p>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    background-color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    height: 300px;
    font-family: "Courier New";
    letter-spacing: 3px;
    border-radius: 4px;
    color: #1A1A1A;
`;

export default Graph;
