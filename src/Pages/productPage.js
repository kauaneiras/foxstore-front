import styled from "styled-components"
import Header from "../components/header"
import OtherProducts from "../components/otherProducts"
import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import { useContext } from "react"
import { Link } from "react-router-dom"
import Footer from "../components/footer"


export default function ProductPage() {

    const idProduct = useParams();
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([{value:0}]);
    const {sendCart} = useContext(UserContext)

    useEffect( () => {
       const URL = "https://foxstore.onrender.com/products"

        axios.get(URL)
            .then(res => {
                setProducts(res.data);
                const filterProducts = res.data.filter(p => p._id === idProduct.id)
                setSelectedProduct(filterProducts)
                
            })
            .catch(err => {
                console.log(err);
            })
    } , [])

    return (
        <BackGround>
            <Header/>
            <ProductPageStyle>
                <Frame>
                    <ImageStyle>
                    <img src={selectedProduct[0].image} alt="imagem" />
                    </ImageStyle>
                <PrincipalContent>
                    <h1>{selectedProduct[0].name}</h1>
                    <b>R$ {(selectedProduct[0].value).toFixed(2).replace(".", ",")}</b>
                    <h2>Parcelas de até 4x sem juros</h2>
                    <Link to="/cart">
                    <button onClick={() => sendCart(selectedProduct[0].name)}>Comprar</button>
                    </Link>
                    <span>{selectedProduct[0].inventory} produtos disponiveis</span>
                </PrincipalContent>
                </Frame>
                <Description>
                    <h1>informações do produto</h1>
                    <p>{selectedProduct[0].description}</p>
                </Description>
                <OtherProducts categorie={selectedProduct[0].categorie} products={products}/>
            </ProductPageStyle>
            <Footer/>
        </BackGround>
    )
}

const BackGround = styled.div`
background: #F2F2F2;
`

const ProductPageStyle = styled.div`
background: #F2F2F2;
padding-top: 20px;
display: flex;
flex-direction: column;

`
const ImageStyle = styled.div`
    img{
        width: 400px;
        margin: 30px;
        border-radius: 10px;
    }
    @media (max-width: 400px) {
        img{
            width: 100px;

        }
    }
`


const PrincipalContent= styled.div`
display: flex;
flex-direction: column;
margin-left: 10%;
margin-top: 5%;
h1{
    font-family: 'Poppins';
    font-size: 35px;
    font-weight: bold;
    color: #000000;
    text-transform: none;
    line-height: 1.1;
    margin-bottom: 2%;
}
h2{
    font-family: 'Poppins';
font-style: normal;
font-weight: 600;
font-size: 20px;
line-height: 55px;
color: #000000;  ;
}
b{
    font-family: 'Poppins';
font-style: normal;
font-weight: 600;
font-size: 35px;
line-height: 55px;
color: #000000;  
}
button{
    font-family: 'Poppins';
    padding: 0 24px;
    min-width: 165px;
    background-image: linear-gradient(213deg,#ff7b48 7%,#f73c22 92%);
    font-weight: 600;
    color: #fff;
    border-radius: 4px;
    padding: 0 48px;
    height: 44px;
    line-height: 42px;
    font-size: 16px;
    border-width: 1px;
    border: thin;
    margin-top: 50px;
    width: 200px;
    cursor: pointer;
}
span{
    font-family: 'Poppins';
    padding-top: 20px;
    font-size: 14px;
    word-break: break-word;
    font-weight: normal;
    color: rgb(102, 102, 102);
}
@media (max-width: 400px) {
    h1{
        font-size: 20px;
    }
    b{
        font-size: 18px;
    }
    h2{
        font-size: 15px;
        line-height: 15px;
    }
}
`

const Frame= styled.div`
display: flex;
margin-top: 100px;
background-color: white;
border-radius: 20px;
`

const Description = styled.div`
height: 100%;
border-radius: 20px;
margin-top: 80px;
margin-bottom: 100px;
background-color: white;
padding-top: 30px;
padding-left: 20px;
padding-right: 20px;
h1{
    font-family: 'Poppins';
    font-size: 40px;
    font-weight: 600;
    color: rgb(102, 102, 102);
}
p{
    font-family: 'Poppins';
    padding-top: 40px;
    font-size: 25px;
    word-break: break-word;
    font-weight: normal;
    line-height: 38px;
    color: rgb(102, 102, 102);
    margin-bottom: 50px;
}
`
