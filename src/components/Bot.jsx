import React, { Component } from 'react'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'
import { LoginButton } from "./Login";

//theme habría que modificar según nuestras paletas de colores
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
                floating={true}
                speechSynthesis={ {enable: true, lang: 'en', voice: null }}   
                steps={[
                        {
                        id: '1',
                        message: 'What is your name?',
                        trigger: '2',
                        },
                        {
                        id: '2',
                        user: true,
                        validator: (value) => {
                            if (/^[A-Z]{1}[a-z]{2,15}$/.test(value)) {
                                return true;
                            }
                            else {
                                return 'Please enter a valid name.';
                            }
                        },
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
                        },
                        {
                            id: "seleccion",
                            options: [
                                {value: "f", label: "Buy", trigger: "7A"},
                                {value: "b", label: "Sell", trigger: "7B"},
                                {value: "c", label: "Add to cart", trigger: "7C"},

                            ]
                        },
                        {
                            id: "7A",
                            message: "If you want to buy a product, please click on the product's detail. Do you need any thing else?",
                            trigger: "4"
                        },
                        {
                            id: "7B",
                            message: "If you want to sell a product, please first loggin and then go to the sell route on the Navbar. Do you want loggin?",
                            trigger: "8"
                        },
                        {
                            id: "7C",
                            message: "If you want to add a product to your cart, please click on the 'Add to cart' button from any product. Do you need any thing else?",
                            trigger: "4"
                        },
                        {
                            id:'8',
                            options: [
                                {value: "y", label: "Yes", trigger: "9A"},
                                {value: "n", label: "No", trigger: "9B"},
                            ]
                        },
                        {
                            id:'9A',
                            component: <LoginButton></LoginButton>,
                            end:true
                        },
                        {
                            id:'9B',
                            message: 'Do you need any thing else?',
                            trigger:'4'
                        }


                    ]}
                />
            </ThemeProvider>
        )
    }
}