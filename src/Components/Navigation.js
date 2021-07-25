import React, { useRef, useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components';
import {useHistory} from "react-router-dom";
import {auth, provider} from "../firebase"

const Navigation = () => {
    const history = useHistory();

    const lightDarkMode = useRef();
    const toggle_Storage_Key = 'toggleStorage'
    const [toggle, setToggle] = useState([false])
    const [theme, setTheme] = useState('light')


    //sign out of application and get sent to login page
    const SignOutFunction = () => {
        auth.signOut().then(() => {
            history.push("/");
        })
    }

    //change page when nav button is clicked.
    const ChangePagesFunction = (route) => {
        history.push(route);
    }

    // Get value of lightDark mode toggle from local storage on initial load of page.
    useEffect(() => {
        const toggleState = JSON.parse(localStorage.getItem(toggle_Storage_Key))
        if (toggleState !== null){
            lightDarkMode.current.checked = toggleState;
            if(toggleState === false){
                setToggle(false)
                setTheme('light');
            }
            else{
                setToggle(true)
                setTheme('dark');
            }
        }
    }, [])

    //set value of lightDark mode toggle to local storage everytime toggle variable is changed.
    useEffect(() => {
        localStorage.setItem(toggle_Storage_Key, JSON.stringify(toggle))    
    }, [toggle])

    //call setToggle function everytime lightDark toggle is changed.
    function handleToggle(){
        const toggleState = lightDarkMode.current.checked;
        setToggle(toggleState)

        if (toggleState === true){
            setTheme('dark');
        }
        else{
            setTheme('light')
        }
    }

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <Container>
                <Content>
                    <LeftDiv>
                        <UserImg src="./Images/navPhoto.jpg" />
                        <Title>The Hub</Title>
                    </LeftDiv>
                    <PageButtons>
                        <Button onClick={() => ChangePagesFunction('/stock')}>Stocks</Button>
                        <Button onClick={() => ChangePagesFunction('/finances')}>Finances</Button>
                        <Button onClick={() => ChangePagesFunction('/todolist')}>TodoList</Button>
                    </PageButtons>
                    <RightDiv>
                        <Toggle type="checkbox" onClick={handleToggle} ref={lightDarkMode}></Toggle>
                        <LogOutBTN onClick={SignOutFunction}>Log Out</LogOutBTN>
                    </RightDiv>
                </Content>
            </Container>
        </ThemeProvider>
    )
}

const lightTheme = {
    body: 'white',
    text: '#1A1A1A',
    cardBackground: 'whitesmoke',
    cardtext: '#1A1A1A',
    toggleTransition: 'all 500ms',
    shadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'
}

const darkTheme = {
    body: '#1A1A1A',
    text: 'white',
    cardBackground: '#4a4947',
    cardtext: 'white',
    toggleTransition: 'all 500ms',
    shadow: 'rgba(255, 255, 255, 0.25) 0px 6px 12px -2px, rgba(255, 255, 255, 0.3) 0px 3px 7px -3px'
}

const Container = styled.div`
    height: 72px;
    position: sticky;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.body};
    width: 100%;
    z-index: 1;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    font-family: "Courier New";
    letter-spacing: 3px;
    transition: ${({ theme }) => theme.toggleTransition}
`;

const Content = styled.div`
    display: flex;
    flex-direction: rows;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: space-between;
`;

const LeftDiv = styled.div`
    display: flex;
    align-items: center;
    margin: 0 0 0 30px;
`;

const UserImg = styled.img`
    height: 60px;
    width: 60px;
    border-radius: 50%;
    object-fit: cover;
`;

const Title = styled.p`
    margin: 0 0 0 30px;
    font-size: 24px;
    color: ${({ theme }) => theme.cardtext};
    background-color: ${({ theme }) => theme.cardBackground};
    padding: 10px;
    border-radius: 4px;
    transition: ${({ theme }) => theme.toggleTransition}
`;

const PageButtons = styled.div`
    color: ${({ theme }) => theme.text};
    display: flex;
    justify-content: space-evenly;
    width: 50%;
    height: 70%;
    align-items: center;
    background-color: ${({ theme }) => theme.cardBackground};
    border-radius: 4px;
    transition: ${({ theme }) => theme.toggleTransition};
`;

const Button = styled.a`
    cursor: pointer;
    font-weight: 700;
`;

const RightDiv = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;

const Toggle = styled.input`
    -webkit-appearance: none;
    outline: none;

    width: 70px;
    height: 30px;
    background-image: url(https://i.postimg.cc/857jHw2q/Screenshot-2020-04-16-at-1-07-06-PM.png);
    background-size: cover;
    border-radius: 50px;
    position: relative;

    margin: 0 30px 0 0;

    transition: background-image .90s;
    box-shadow: 0px 2px 5px 1px gray;

    &:before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 30px;
        width: 30px;
        background-color: #1A1A1A;
        border-radius: 50px;
        transition: all .9s;
    }

    &:checked {
        background-image: url(https://i.postimg.cc/Hn0nstVK/Screenshot-2020-04-16-at-1-07-19-PM.png);
        transition: background-image .90s;
    }

    &:checked:before {
        transform: translate(100%);
        transition: all .9s;
        background-color: white;
      }

`;

const LogOutBTN = styled.a`
    color: ${({ theme }) => theme.cardtext};
    background-color: ${({ theme }) => theme.cardBackground};  
    padding: 15px;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 30px 0 0;
    transition: ${({ theme }) => theme.toggleTransition};

    &:hover{
        box-shadow: ${({ theme }) => theme.shadow};
        transition: all 1s;
    }
    
`;

export default Navigation
export {lightTheme, darkTheme}
