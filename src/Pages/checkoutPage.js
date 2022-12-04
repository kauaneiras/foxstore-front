import {useContext} from "react"
import UserContext from "../contexts/UserContext"
import styled from "styled-components";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";


export default function CheckoutPage() {
    const { productsCheckout } = useContext(UserContext);


    return (
        <>
        <BackGround>
                <Header/>
                <Tittle>Pedido Finalizado com Sucesso</Tittle>
                <AlignItems>
                <Subtitle>Você comprou:</Subtitle>
                        {productsCheckout.map(p => (
                            <StyleItem key={p.id}>
                                <img src={p.image} alt={p.name}/>
                                <StyleText>
                                    <span><b style={{fontWeight: '600'}}>Produto:</b> {p.name}</span>
                                    <span><b style={{fontWeight: '600'}}>preço:</b> R${p.value},00</span>
                                    <span><b style={{fontWeight: '600'}}>quantidade:</b> {p.qtde}</span>
                                    <span><b style={{fontWeight: '600'}}>Forma de pagamento:</b>boleto</span>
                                </StyleText>
                            </StyleItem>
                        ))}
                </AlignItems>
                <Link to="/"><ButtonHome>Continuar Comprando</ButtonHome></Link>
                <Footer/>
        </BackGround>
        </>
    )
}


const ButtonHome = styled.button`
width: 400px;
height: 40px;
background-color: #FFC700;
border: none;
border-radius: 5px;
font-size: 20px;
color: black;
font-weight: bold;
margin-top: 50px;
:hover {
    background-color: #FFC700;
    opacity: 0.8;
    cursor: pointer;
}
`
const Subtitle = styled.h2`
    position: relative;
    font-size: 25px;
    margin-top: 40px;
    color: #black;
    margin: 0 0 20px 0;
    text-align: center;

`
const StyleText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 30px;
    width: 100%;
    height: 100%;
    span {
        max-width: 70%;
        font-size: 20px;
        color: #black;
        margin: 0 0 5px 0;
    }
`

const BackGround = styled.div`
background: #F2F2F2;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

`
const AlignItems = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`

const Tittle = styled.h1`
    font-size: 32px;
    color: black;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
`
 
const StyleItem = styled.div`
width: 150%;
height: 200px;
align-items: center;
justify-content: center;

display: flex;
flex-direction: row;
border-radius: 10px;
margin-bottom: 20px;
margin-top: 20px;
margin-left: 20px;
margin-right: 20px;


background-color: white;

img{
    width: 100px;
    height: 100px;
    margin-left: 20px;
}
`