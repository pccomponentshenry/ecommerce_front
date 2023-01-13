import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { LoginButton } from "./Login";
import logo_secundario from "../Images/logoSecundario.png";
import admin_pic from "../Images/admin_pic.png";

//theme habría que modificar según nuestras paletas de colores
const theme = {
  background: "#000",
  headerBgColor: "#570063",
  headerFontColor: "#fff",
  headerFontSize: "20px",
  botBubbleColor: "#2bfab7",
  botFontColor: "#000",
  userBubbleColor: "#fff",
  userFontColor: "#000",
  fontFamily: "Open Sans",
};

export default class Bot extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          floating={true}
          //   floatingIcon={admin_pic}
          botAvatar={logo_secundario}
          headerTitle={"Play Expert Chat"}
          inputStyle={{ color: "#000" }}
          customDelay={2000}
          bubbleOptionStyle={{ color: "#fff", background: "#000" }}
          steps={[
            {
              id: "1",
              message:
                "Hi! Nice to meet you. I am Play Expert chatbot. If you have any questions, I am here to help you",
              trigger: "1A",
            },
            {
              id: "1A",
              message: `What's your name?`,
              trigger: "2",
            },
            {
              id: "2",
              user: true,
              validator: value => {
                if (/^[a-zA-Z]{1}[a-z]{2,15}$/.test(value)) {
                  return true;
                } else {
                  return "Please enter a valid name.";
                }
              },
              trigger: "3",
            },
            {
              id: "3",
              message:
                "{previousValue}, Nice to meet you!. ¿How can I help you?",
              trigger: "4",
            },
            {
              id: "4",
              options: [
                { value: "a", label: "I want to buy", trigger: "5" },
                { value: "b", label: "I want to sell", trigger: "6" },
                { value: "c", label: "I want to register", trigger: "7" },
              ],
            },
            {
              id: "5",
              message:
                "If you want to buy, we invite you to register so you can access all Play Expert options",
              trigger: "5A",
            },
            {
              id: "5A",
              message:
                "Once you are registered you can browse the products of your interest using the different filters that you will find at your disposal",
              trigger: "5B",
            },
            {
              id: "5B",
              message:
                "You can add as many products as you want to your shopping cart",
              trigger: "5C",
            },
            {
              id: "5C",
              message:
                "Register a shipping address and confirm your purchase by entering your card details or payment method",
              trigger: "5D",
            },
            {
              id: "5D",
              message:
                "Your purchase confirmation will arrive to your email, at the end of the process you will have the option to post reviews about your purchased products and you will be part of the Play Expert family",
              trigger: "8",
            },
            {
              id: "6",
              message:
                "If you want to sell, we invite you to register so you can access all Play Expert options",
              trigger: "6A",
            },
            {
              id: "6A",
              message:
                "Once you are registered you can enter the seller option, where you will enter your products to sell",
              trigger: "6B",
            },
            {
              id: "6B",
              message:
                "Register all the requested data of your products so that they are registered in the catalog and available to be acquired by other users",
              trigger: "8",
            },
            {
              id: "7",
              message:
                "To register you just have to click on login and enter your email and password information",
              trigger: "7A",
            },
            {
              id: "7A",
              message:
                "Once the data is entered, you will be informed via email of your successful registration and you will be able to make use of the options to buy and sell products.",
              trigger: "7B",
            },
            {
              id: "7B",
              message:
                "By clicking on your user you will access your profile where you will have data on your purchases, your products to sell, your favorite products and you will have the option to post your reviews",
              trigger: "8",
            },
            {
              id: "8",
              message: "¿You solved your doubts?",
              trigger: "8A",
            },
            {
              id: "8A",
              options: [
                { value: "y", label: "Yes", trigger: "9" },
                { value: "n", label: "No", trigger: "4" },
              ],
            },
            {
              id: "9",
              message: "¿Would you like to sign up for Play Expert?",
              trigger: "9A",
            },
            {
              id: "9A",
              options: [
                { value: "y", label: "Yes", trigger: "9B" },
                { value: "n", label: "No", trigger: "10" },
              ],
            },
            {
              id: "9B",
              component: <LoginButton></LoginButton>,
              end: true,
            },
            {
              id: "10",
              message: "We understand you, we hope you come back soon",
              end: true,
            },
          ]}
        />
      </ThemeProvider>
    );
  }
}
