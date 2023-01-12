import React, { Component } from 'react'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'
import { LoginButton } from "./Login";
import logo_secundario from "../Images/logo_secundario.jpg"
import admin_pic from "../Images/admin_pic.png"

//theme habría que modificar según nuestras paletas de colores
const theme = {
    background: '#000',
    headerBgColor: '#570063',
    headerFontColor: '#fff',
    headerFontSize: '20px',
    botBubbleColor: '#2bfab7',
    botFontColor: '#000',
    userBubbleColor: '#fff',
    userFontColor: '#000',
    fontFamily: 'Poppins',
}

export default class Bot extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <ChatBot 
                floating={true}
                floatingIcon={admin_pic}
                botAvatar={logo_secundario}
                headerTitle={'Play Expert Chat'}
                inputStyle={{color:'#000'}}
                customDelay={2000}
                bubbleOptionStyle={{color:'#fff', background: '#000'}}
                steps={[
                        {
                        id: '1',
                        message: '¡Hola! Encantado de conocerte. Soy el chatbot de Play Expert. Si tienes cualquier duda, aquí estoy para resolver tus preguntas',
                        trigger:'1A'
                        },
                        {
                        id: '1A',
                        message: 'Cual es tu nombre?',
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
                        message: '{previousValue}, encantado de conocerte!. ¿Cómo puedo ayudarte?',
                        trigger:'4'  
                        },
                        {
                            id: "4",
                            options: [
                                {value: "a", label: "Quiero comprar", trigger: "5"},
                                {value: "b", label: "Quiero verder", trigger: "6"},
                                {value: "c", label: "Quiero registrarme", trigger: "7"},
                            ]
                        },
                        {
                            id: "5",
                            message: "Si tu deseas comprar, te invitamos a registrate para que puedas acceder a todas las opciones de Play Expert",
                            trigger: "5A"
                        },
                        {
                            id: "5A",
                            message: "Una vez que estes registrado(a) puedes recorrer los productos de tu interes usado los diferentes filltros que encontraras a tu disposición",
                            trigger: "5B"
                        },
                        {
                            id: "5B",
                            message: "Puedes agregar a tu carrito de compra tantos productos como desees",
                            trigger: "5C"
                        },
                        {
                            id: "5C",
                            message: "Registra una dirección de envío y confirma tu compra ingresando tus datos de tarjeta o medio de pago ",
                            trigger: "5D"
                        },
                        {
                            id: "5D",
                            message: "A tu email llegará tu confirmacion de compra, al finalizar el proceso tendras la opción de posterar reviews sobre tus productos adquiridos y seras parte de la familia Play Expert",
                            trigger: "8"
                        },
                        {
                            id: "6",
                            message: "Si tu deseas vender, te invitamos a registrate para que puedas acceder a todas las opciones de Play Expert",
                            trigger: "6A"
                        },
                        {
                            id: "6A",
                            message: "Una vez que estes registrado(a) puedes ingresar a la opcion seller, donde ingresaras tus productos a vender" ,
                            trigger: "6B"
                        },
                        {
                            id: "6B",
                            message: "Registra todos los datos solicitados de tus productos para que queden registrados en el catalogo y disponibles para ser adquiridos por otros usuarios" ,
                            trigger: "8"
                        },
                        {
                            id: "7",
                            message: "Para registrarte solo tienes que hacer click en loggin e ingresar tus datos de email y contraseña",
                            trigger: "7A"
                        },
                        {
                            id: "7A",
                            message: "Una vez ingresados los datos, se te informara via email de tu registro exitoso y podras hacer uso de las opciones de compra y venta de productos",
                            trigger: "7B"
                        },
                        {
                            id: "7B",
                            message: "Al hacer click en tu usuario accederas a tu perfil donde tendras datos de tus compras realizadas, de tus productos a vender, de tus productos favoritos y tendras la opcion de postear tus reviews",
                            trigger: "8"
                        },
                        {
                            id:'8',
                            message: "¿Resolviste tus dudas?",
                            trigger: "8A"
                        },
                        {
                            id:'8A',
                            options: [
                                {value: "y", label: "Si", trigger: "9"},
                                {value: "n", label: "No", trigger: "4"},
                            ]
                        },
                        {
                            id:'9',
                            message: '¿Te gustaria registrarte en Play Expert?',
                            trigger:'9A'
                        },
                        {
                            id:'9A',
                            options: [
                                {value: "y", label: "Si", trigger: "9B"},
                                {value: "n", label: "No", trigger: "10"},
                            ]
                        },
                        {
                            id:'9B',
                            component: <LoginButton></LoginButton>,
                            end:true
                        },
                        {
                            id:'10',
                            message: 'Te entendemos, esperamos que vuelvas pronto',
                            end:true
                        },


                    ]}
                />
            </ThemeProvider>
        )
    }
}