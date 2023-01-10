import React, { Component } from 'react'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'

const theme = {
    background: '#f5f8fb',
    headerBgColor: '#eb3449',
    headerFontColor: '#fff',
    headerFontSize: '20px',
    botBubbleColor: '#eb3449',
    botFontColor: '#fff',
    userBubbleColor: '#0cb3c9',
    userFontColor: '#fff',
}

export default class Bot extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <ChatBot   
                steps={[
    {
      id: '1',
      message: 'What is your name?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}, nice to meet you!. Can I help you?',
      trigger:'4'  
    },
    {
        id: "4",
        options: [
            {value: "y", label: "Yes", trigger: "6A"},
            {value: "n", label: "No", trigger: "6B"},
        ]
    },
    {
        id: "6A",
        message: "Great! Tell me what are you looking for...",
        trigger: "seleccion"
    },
    {
        id: "6B",
        message: "Im sorry if I cannot be of help to you. See you later",
        end: true
    },{
        id: "seleccion",
        options: [
            {value: "f", label: "Buy", trigger: "7A"},
            {value: "b", label: "Sell", trigger: "7B"},
        ]
    },
    {
        id: "7A",
        message: "If you want to buy a product, please click on the product's detail. Do you need any thing else?",
        trigger: "4"
    },
    {
        id: "7B",
        message: "If you want to sell a product, please first loggin and then go to the sell route on the Navbar. Do you need any thing else?",
        trigger: "4"
    }
  ]}
                />
            </ThemeProvider>
        )
    }
}