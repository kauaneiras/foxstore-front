import styled from "styled-components"
import Header from "../components/header"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Link } from "react-router-dom"
import Footer from "../components/footer"


export default function SearchPage() {

    const {search} = useParams();
    const [products, setProducts] = useState([]);

    useEffect( () => {
       const URL = "https://foxstore.onrender.com/products"

        axios.get(URL)
            .then(res => {
                const filteredProducts = res.data.filter(p => p.name.toLowerCase().includes(search))
                setProducts(filteredProducts);
            })
            .catch(err => {
                console.log(err);
            })
    } , [])

    return (
        <BackGround>
            <Header/>
            <SearchPageStyle>
            <Title>
                <h1>resultados para "{search}"</h1>
                <p>{products.length} produtos</p>
            </Title>
                <Frame>
                {products.length === 0 ? <span>Nenhum produto encontrado</span> : products.map(p => <Item key={p._id} id={p._id} image={p.image} name={p.name} value={p.value}/>)}
                </Frame>
            </SearchPageStyle>
            <Footer/>
        </BackGround>
    )
}

function Item(props){
    const {sendCart} = useContext(UserContext)
    const navigate = useNavigate()
    
    return(
        <StyleItem>
            <Link onClick={() => {
                navigate(`/product/${props.id}`)
                window.location.reload()
            }}>
            <img src={props.image} alt="imagem" />
        <p>{props.name}</p>
            </Link>
        <b>R$ {(props.value).toFixed(2).replace(".", ",")}</b>
        <Link to="/cart">
        <button onClick={() => sendCart(props.name)} >Comprar</button>
        </Link>
    </StyleItem>
    )
}



const BackGround = styled.div`
background: #F2F2F2;
`

const SearchPageStyle = styled.div`
background: #F2F2F2;
width: 100%;
padding-top: 20px;
display: flex;
flex-direction: column;
padding-left: 180px;
`

const Frame= styled.div`
width: 1500px;
display: flex;
background-color: white;
border-radius: 20px;
flex-wrap: wrap;
margin-bottom: 100px;
padding-top: 35px;
span{
    width: 100%;
    height: 900px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins';
    font-size: 35px;
    font-weight: bold;
    color: #000000;
    text-transform: none;
    line-height: 1.1;
    margin-bottom: 5px;
}
`

const StyleItem = styled.div`
width: 243px;
height: 100%;
display: flex;
flex-direction: column;
padding-left: 15px;
padding-top: 10px;
margin-bottom: 80px;
margin-right: 28px;
margin-left: 28px;
img{
    width: 213px;
    height: 255px;
}
p{
    font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 25px;
line-height: 38px;
color: #000000;

}
b{
    font-family: 'Poppins';
font-style: normal;
font-weight: 600;
font-size: 25px;
line-height: 55px;
color: #000000;  
}
button{
    width: 130px;
    height: 30px;
    background-color: #E60014;
    border-radius: 15px;
    font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 20px;
line-height: 30px;
color: #FFFFFF;
    border: thin;
    cursor: pointer;
}
`

const Title = styled.div`
display: flex;
flex-direction: column;
width: 300px;
height: 60px;
background-color: #F2F2F2;
margin-bottom: 30px;
h1{
    width: 600px;
    font-family: 'Poppins';
    font-size: 35px;
    font-weight: bold;
    color: #000000;
    text-transform: none;
    line-height: 1.1;
    margin-bottom: 5px;
}
p{
    width: 600px;
    font-family: 'Poppins';
    font-size: 25px;
    color: #000000;
    text-transform: none;
    line-height: 1.1;
    margin-bottom: 25%;
}
`
