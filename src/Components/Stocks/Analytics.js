import React from 'react'
import styled from 'styled-components'

function Analytics({ totalEquityFunction }) {


    return (
        <Container>
            <Box>
                <BoxTitle>Total Equity</BoxTitle>
                <div>
                    <BoxStat>${ totalEquityFunction() }</BoxStat>
                </div>   
            </Box>
            <Box>
                <BoxTitle>Total Return</BoxTitle>
                <div>
                    <BoxStat>$200.00</BoxStat>
                </div>
            </Box>
            <Box>
                <BoxTitle>Daily Return</BoxTitle>
                <div>
                    <BoxStat>$5.00</BoxStat>
                </div>
            </Box>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: "Courier New";
    letter-spacing: 3px;
    // border: 1px solid blue;
    width: 100%;
    border-radius: 4px;
    color: #1A1A1A;
`;

const Box = styled.div`
    height: 200px;
    width: 200px;
    background-color: white;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    border-radius: 4px;
    color: #1A1A1A;

    div{
        display: flex;
        align-items: center;
        height: 100%;
        // border: 1px solid blue;
    }
`;

const BoxTitle = styled.p`
    text-align: left;
    margin: 15px 0 0 10px;
    font-size: 18px;
    font-weight: 700;
`;

const BoxStat = styled.p`
    text-align: center;
    font-size: 24px;
    width: 100%;
`;

export default Analytics
