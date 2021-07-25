import React, {useEffect, useState} from 'react'
import styled from 'styled-components';

import Footer from '../Footer';
import Navigation from '../Navigation';
import Analytics from './Analytics';
import Graph from './Graph';
import Table from './Table';

import { TIINGO_KEY } from '../../Keys';

const Stock = () => {
    const Local_Storage_key = 'stockList';
    const localStorageStocks = JSON.parse(localStorage.getItem(Local_Storage_key));
    
    const [stocks, setStocks] = useState([]);
    let totalEquity = 0;
    
    useEffect(() => {
        async function test(){
            if(localStorageStocks != null){
                setStocks(localStorageStocks);
                await timeout(1000);
                stocks.forEach(updateStocks);
            } 
        }
        test()
    }, [])

    async function timeout(number) {
        return new Promise( res => setTimeout(res, number) );
    }

    useEffect(() => {
        if(stocks !== null){
            localStorage.setItem(Local_Storage_key, JSON.stringify(stocks))
        }
    }, [stocks])

    function updateStocks(element,index){

        var url = 'https://api.tiingo.com/tiingo/daily/' + element['tkrName'] + '/prices?startDate=' + getDate() + '&endDate=' + getDate() + '&token=' + TIINGO_KEY;
        // var url = 'https://api.tiingo.com/tiingo/daily/' + element['tkrName'] + '/prices?startDate=2021-7-15&endDate=2021-7-15&token=' + TIINGO_KEY;

        fetch(url)
        .then(response => response.json())
        .then(data => 
            updateIndividualStock(data)
        )

        function updateIndividualStock(data){
            let updatedPrice = data[0]['close'];
            let newArr = [...stocks];
            newArr[index]['price'] = updatedPrice;
            setStocks(newArr);        
        }       
    }

    function totalEquityFunction(){
        totalEquity = 0;
        stocks.forEach((element) => {
            totalEquity = totalEquity + Math.round((element.price * element.numberOfShares) * 100) / 100;
        })
        
        return totalEquity;
    }

    function getDate(){
        let today = new Date();
        let yesterday = new Date();

        yesterday.setDate(today.getDate() - 1);

        let DateFormat = "";
        if(yesterday.getDay() !== 6 && yesterday.getDay() !== 0){
            DateFormat = yesterday.getFullYear() + "-" + (yesterday.getMonth() + 1) + "-" + yesterday.getDate();
        }
        else if(yesterday.getDay() === 6){
            DateFormat = yesterday.getFullYear() + "-" + (yesterday.getMonth() + 1) + "-" + (yesterday.getDate() - 1);
        }
        else{
            DateFormat = yesterday.getFullYear() + "-" + (yesterday.getMonth() + 1) + "-" + (yesterday.getDate() - 2);
        }
        return DateFormat;
    }
    
    return (
        <Container>
            <Navigation />
            <Content>
                <Title>Stock Portfolio</Title>
                <Data>
                    <AnalyticsGraphDiv>
                        <Analytics totalEquityFunction={totalEquityFunction} />
                        <Graph />
                    </AnalyticsGraphDiv>
                    <TableDiv>
                        <Table stocks={stocks} setStocks={setStocks} getDate={getDate} totalEquityFunction={totalEquityFunction} />
                        <Quote>"The stock market is a device for transferring
                            money from the impatient to the patient."<br/> -Warren Buffet
                        </Quote>
                    </TableDiv>
                </Data>
            </Content>
            <Footer />
        </Container>
    )
}

const Container = styled.div`
    font-family: "Courier New";
    letter-spacing: 3px;
`;

const Content = styled.div`
    background-color: whitesmoke;
    height: calc(100vh - 72px);
    color: #1A1A1A;
`;

const Title = styled.p`
    margin: 0 0 30px 30px;
    padding: 30px 0 0 0;
    font-size: 36px;
    text-decoration: underline;
`;

const Data = styled.div`
    display: flex;
    flex-direction: rows;
    // border: 1px solid red;
`;

const AnalyticsGraphDiv = styled.div`
    width: 45%;
    // border: 1px solid red;
    margin: 0 0 0 30px;
`;

const TableDiv = styled.div`
    width: 55%;
`;

const Quote = styled.p`
    margin: 30px;
    width: 350px;
    text-align: center;
    line-height: 2rem;
    margin: 30px auto;
    font-weight: 700;
`;

export default Stock
