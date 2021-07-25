import React from 'react'
import styled from 'styled-components'

function Footer() {
    return (
        <Container>
            <Content>
                <SubText>July 2021 - Present</SubText>
                <SubText>Created By: Matthew Bunker</SubText>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    min-height: 72px;
    // border: 1px solid black;
    background-color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const Content = styled.div`
    color: #1A1A1A;
    font-family: "Courier New";
    letter-spacing: 3px;
    height: 100%;
    width: 100%;
    text-align: center;
`;

const SubText = styled.p`
    margin: 0;
    padding: 15px 0 0 0;
`;

export default Footer
