import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/header";
import UserContext from "../contexts/UserContext";
import Footer from "../components/footer";
import swal from "sweetalert";

export default function CartPage() {

    const {loadCart, config, productsCart, setProductsCart, sendCart, token, setProductsCheckout} = useContext(UserContext)
    
    const [checkoutpage, setCheckoutpage] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState([])
    const [price, setPrice] = useState(0)

    useEffect(() => {
        loadCart(setProductsCart);

    }, [])

    useEffect(() => {
        let products = new Map();

        productsCart.forEach(p => {
            if(!products.has(p.name)){
                products.set(p.name, p)
            }

            let priceProducts = 0;
            productsCart.forEach(p => priceProducts+= p.value)
            setPrice(priceProducts.toFixed(2).replace(".", ","))
        });

        setSelectedProducts([...products.values()])
    }, [productsCart])

    function Checkout() {
        if(token === null){
            swal({
                icon: "error",
                text: "É necessario ter uma conta para comprar produtos!",
              });
            return
        }else if(productsCart.length === 0){
            swal({
                icon: "error",
                text: "Adicione algo no carrinho antes de finalizar a compra!",
              });
            return
        }
        const URL = "https://foxstore.onrender.com/checkout"
        axios.post(URL, {}, config)
            .then(res => {
                swal({
                    icon: "success",
                    text: "Pedido realizado com sucesso!",
                  });
                setProductsCheckout(productsCart)
                setProductsCart([]);
                setCheckoutpage(true);
            })
            .catch(err => {
                console.log(err);
            })
    }



    function removeProductCart(id){
        const URL = "https://foxstore.onrender.com/cart"

         axios.delete(URL, {data: {id}})
            .then(res => {
                loadCart(setProductsCart);
            })
            .catch(err => {
                console.log(err);
            })
            if(productsCart.length === 1){
                window.location.reload()
            }
    }

    function contador(obj){
       const number = productsCart.filter(p => p.name === obj.name).length
       return number
    }
    

    if (checkoutpage) {
       return <Navigate to={"/checkout"}/>
    }else{
        return (
            <BackGround>
                <Header/>
                <Tittle>Meu Carrinho</Tittle>
                <Container>
                <AlignItems>
                {selectedProducts.map((obj, i) => 
                    <StyleItem key={i}>
                        <img src={obj.image} alt="imagem" />
                        <p>{obj.name}</p>
                        <b>R$ {(obj.value).toFixed(2).replace(".", ",") }</b>
                        <div>
                        <button onClick={() => removeProductCart(obj._id)}>-</button>
                        <span>{contador(obj)}</span>
                        <button onClick={() => sendCart(obj.name)}>+</button>
                        </div>
                    </StyleItem>
                )}
                </AlignItems>
                    <PaymentInformation>
                        <h1>Informações de pagamento</h1>
                        {productsCart.map(p => <p><span>{p.name}</span><span>R$ {productsCart !== [] ? p.value.toFixed(2).replace(".", ",") : ""}</span></p>)}
                        <p><span><b>Total</b></span><span><b>R$ {price}</b></span></p>
                        <ButtonFinish onClick={ () => { Checkout() } } >Finalizar Compra</ButtonFinish>
                    </PaymentInformation>
               

                </Container>
                <Footer/>
            </BackGround>
            )
        }
}
const PaymentInformation = styled.div`
    width: 800px;
    height: 100%;
    border: none;
    border-radius: 5px;
    background-color: white;
    text-align:center;
    border-radius: 20px;
    padding-bottom: 50px;
    b{
        font-weight: bold;
        font-size: 25px;
    }
    h1{
        font-size: 32px;
    color: black;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 50px;
    }
    p{
        display: flex;
        justify-content: space-between;
        padding-left: 30px;
        padding-right: 30px;
    }
    span:nth-child(1){
        width: 400px;
        height: 30px;
        text-align: start;
        display: flex;
        align-items: center;
    }
    p:last-of-type{
        display: flex;
        justify-content: space-between;
        padding-left: 30px;
        padding-right: 30px;
        margin-top: 50px;
    }
    span{
        font-size: 20px;
    color: black;
    font-family: 'Roboto', sans-serif;
    display: flex;
    justify-content: start;
    margin-top: 20px;
    }
`

const Container = styled.div`
    display: flex;
    @media (max-width: 400px) {
        flex-direction: column;
        
    }
`

const AlignItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 2%;
    margin-bottom: 2%;
    margin-left: 4%;
    margin-right: 0.5%;
    width: 950px;
`

const BackGround = styled.div`
background: #F2F2F2;
`

const Tittle = styled.h1`
    font-size: 32px;
    color: black;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 50px;
`

const ButtonFinish = styled.button`
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
const StyleItem = styled.div`
position: relative;
width: 250px;
display: flex;
flex-direction: column;
margin-right: 40px;
padding-left: 15px;
padding-top: 10px;
margin-top: 4%;
position: relative;
background-color: white;
border-radius: 10px;
img{
    width: 83px;
    height: 105px;
}
p{
    font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 17px;
line-height: 38px;
color: #000000;

}
b{
    font-family: 'Poppins';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 55px;
color: #000000;  
}
span{
    display: flex;
    width: 50px;
    height: 25px;
    background-color: white;
    justify-content: center;
    align-items: center;
    border-left: solid;
    border-right: solid;
    border-width: 1px;
    font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 17px;
line-height: 38px;
color: #000000;

}
button{
    width: 30px;
    height: 25px;
    background-color: black;
    border: thin;
    font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 17px;
line-height: 38px;
color: #000000;
display: flex;
justify-content: center;
align-items: center;
color: white;

:hover {
        color: #E96324;
        cursor: pointer;
    }
}
div{
    display: flex;
    position: absolute;
    right: 10px;
    top: 50px;
    border-radius: 5px;
    border: solid ;
    border-color: black;
}
`