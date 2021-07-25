
import React, { useRef }from 'react'
import styled from 'styled-components'

import { TIINGO_KEY } from '../../Keys';

function Table({ stocks, setStocks, getDate, totalEquityFunction }) {
    const stockName = useRef();
    const numberOfShares = useRef();

    function AddStocks(){
        const name = stockName.current.value;
        const Shares = parseInt(numberOfShares.current.value);

        if(name === '' || stocks.find(({tkrName}) => tkrName.toUpperCase() === name.toUpperCase())){
            console.log("old: " + name);
            stockName.current.value = null; 
            numberOfShares.current.value = 1;
        }
        else{
            console.log("new: " + name);
            fetchStock(name, Shares);
            stockName.current.value = null; 
            numberOfShares.current.value = 1;
        }
    }

    function fetchStock(tkrSymbol, numberOfShares){
        // var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=' + tkrSymbol + '&apikey=' + ALPHA_ADVANTAGE_KEY;
        var url = 'https://api.tiingo.com/tiingo/daily/' + tkrSymbol + '/prices?startDate=' + getDate() + '&endDate=' + getDate() + '&token=' + TIINGO_KEY;
        fetch(url)
        .then(response => response.json())
        .then(data => 
            // setStocks(prevStocks => {return [...prevStocks, { tkrName: tkrSymbol, days: data['Monthly Time Series'], key: tkrSymbol }]}) 
            setStocks(prevStocks => {return [...prevStocks, { tkrName: tkrSymbol.toUpperCase(), price: data[0]['close'], numberOfShares: numberOfShares, key: tkrSymbol.toUpperCase() }]}) 
        );
    }

    function DeleteStock(rowKey){
        if(window.confirm('Are you sure you wish to delete ' + rowKey + ' stock(s)')){
            const copyStock = stocks.filter((element) => element.key !== rowKey)
            // console.log(copyStock);
            setStocks(copyStock)
        }
    }

    function EditStock(element, index){
        let newNumberOfStocks = parseInt(prompt("Number of " + element.key + ' shares'));
        const copyStock = [...stocks];
        copyStock[index]['numberOfShares'] = newNumberOfStocks;
        setStocks(copyStock)
    }

    function Table(){
        if(stocks.length > 0){
            return(
                <table style={{textAlign: 'center'}} cellPadding="3" cellSpacing="5" id="stockTable">
                    <TableHeader>
                        <TableRow>
                            <th>Ticker Name</th>
                            <th>Current Price</th>
                            <th># Of Shares</th>
                            <th>Equity</th>
                            <th>Equity %</th>
                        </TableRow>
                    </TableHeader>
                    {stocks.map(AddRow)}
                </table>
            )
        }
        else{
            return null;
        }
    }

    function AddRow(element, index){
    
        let stockPrice = Math.round(element.price * 100) / 100;
        let Equity = Math.round(element.numberOfShares * stockPrice * 100) / 100;
        let totalEquity = totalEquityFunction();
        let equityPercentage = Math.round(((Equity / totalEquity) * 100) * 100) / 100;

        return(
            <TableRow>
                <td>{element.tkrName}</td>
                <td>{stockPrice}</td>
                <td>{element.numberOfShares}</td>
                <td>{Equity}</td>
                <td>{ equityPercentage }%</td>
                <td><EditButton onClick={() => EditStock(element, index)}>Edit</EditButton></td>
                <td><DeleteButton onClick={() => DeleteStock(element.key)} >Delete</DeleteButton></td>
            </TableRow>
        )
    }

    return (
        <TableDiv>
            <Table />
            <AddStockDiv>
                <AddStock type="text" autoFocus maxLength={4} ref={stockName} placeholder="Ticker Symbol..."></AddStock>
                <AddStock type="number" ref={numberOfShares} placeholder="# Of Shares..." min={1} step="any" defaultValue={1}></AddStock>
                <AddStockButton onClick={AddStocks}>Add Stock</AddStockButton>
            </AddStockDiv>
        </TableDiv>
    )
}

const TableDiv = styled.div`
    background-color: white;
    padding 15px;
    border-radius: 4px;
    color: #1A1A1A;
    height: max-content;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    overflow-y: hidden;
    font-family: "Courier New";
    letter-spacing: 3px;
    margin: 0 30px 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const TableHeader = styled.thead`
    font-size: 11px;
`;

const TableRow = styled.tr`
    &:nth-child(even){
        background-color: rgba(173,255,47,1);
    }

    td{
        &:nth-child(6), :nth-child(7){
            background-color: white;
        } 
    }
`;

const EditButton = styled.a`
    color: blue;
    border-radius: 4px;
    padding: 5px;
    cursor: pointer;
    font-size: 12px;

    &:hover{
        text-decoration: underline;
    }
`;

const DeleteButton = styled.a`
    color: red;
    border-radius: 4px;
    padding: 5px;
    cursor: pointer;
    font-size: 12px;

    &:hover{
        text-decoration: underline;
    }
`;

const AddStockDiv = styled.div`
    margin: 15px 0 0 0;
`;

const AddStock = styled.input`
    border-radius: 4px;
    padding: 5px;
    margin-right: 5px;
`;

const AddStockButton = styled.a`
    background-color: white;
    color: #1A1A1A;
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    background-color: rgba(173,255,47,1);
    border: 3px solid rgba(173,255,47,1);
    font-size: 12px;
    transition: all 500ms;

    &:hover{
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
        transition: all 500ms;
        // border: 3px solid rgba(173,255,47,1);
        // background-color: rgba(173,255,47,.6);
    }
`;

export default Table
