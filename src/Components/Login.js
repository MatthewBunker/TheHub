import Footer from './Footer';

import React from 'react'
import styled from 'styled-components';
import {useHistory} from "react-router-dom";
import {auth, provider } from '../firebase';
import { EMAIL_KEY } from '../Keys';


const Login = () => {
    const history = useHistory();

    const SignInFunction = () => {
        auth.signInWithPopup(provider)
        .then((userCredentials) => {
            const user=userCredentials.user.uid;
            if(user === EMAIL_KEY){
                console.log("Valid User");
                history.push("/stock");
            }
            else(
                alert("Invalid User")
            )
        })
        .catch((error) => {
            console.log(error.message);
        })
    };

    return (
        <Container>
            <Content>
                <Title>The Hub</Title>
                <Wrapper onClick={SignInFunction}><SignIn>Sign In</SignIn></Wrapper>
                <SubText>Everything I need in one location.</SubText>
            </Content>
            <Footer />
            <BGVideo id="video" src="./Videos/loginBackground.mp4" type="video/mp4"
            autoPlay muted loop playsInline={true} disablePictureInPicture={true}/>
        </Container>
    )
}

const Container = styled.div`
    color: white;
    font-family: "Courier New";
    letter-spacing: 3px;
    // border: 1px solid red;
`;

const Content = styled.div`
    text-align: center;
    height: 70vh;
    width: 50%;
    margin: 30vh 0px 0px 50%;
    opacity: 0;
    transform: translateY(3rem);

    animation: fadeup 3s ease 1s forwards;

    @keyframes fadeup{
        to{
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 48rem){
        width: 100%;
        margin: 30vh 0px 0px 0px;
        height: 70vh;
    }
`;

const Title = styled.p`
    font-size: 36px;
`;

const Wrapper = styled.a`
    cursor: pointer;

    animation: jump 1s linear 1s infinite;

    @keyframes jump{
        0%{ transfrom: translateY(0); }
        50%{ transfrom: translateY(-6); }
        100%{ transfrom: translateY(0); }
    }
`;

const SignIn = styled.p`
    background-color: #B454FD;
    padding: 15px;
    border-radius: 4px;
    max-width: 300px;
    margin: auto;
    transition-duration: 1s;

    &:hover{
        background-color: #54FDD6;
        transition-duration: 1s;
        color: black;
    }
`;

const SubText = styled.p`
    font-size: 24px;
`;

const BGVideo = styled.video`
    height: 100vh;
    width: 100%;
    z-index: -1;
    object-fit: cover; 
    position: absolute;
    top: 0;
    left: 0;
`;

export default Login;
