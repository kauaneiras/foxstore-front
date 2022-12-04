import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";


export default function QuickView({categorie, products}) {

    const filteredProducts = products.filter(p => p.categorie === (categorie).toLowerCase())

    return (
        <StyleQuickView>
            <StyleHeaderQuickView>
                <span>{categorie}</span>
                <Link to={`/listProducts/${categorie}`}>
                <span>Veja mais >></span>
                </Link>
            </StyleHeaderQuickView>
            <StyleQuickViewList>
                {filteredProducts.map(p => <Item key={p._id} id={p._id} image={p.image} name={p.name} value={p.value}/>)}
            </StyleQuickViewList>
        </StyleQuickView>

    )
}

function Item(props){

    const navigate = useNavigate();
    const { sendCart } = useContext(UserContext); 

    
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



const StyleQuickView = styled.div`

width: 100%;
height: 120%;
display: flex;
flex-direction: column;
border-radius: 10px;
background-color: white;
margin-bottom: 50px;
padding-bottom: 20px;
`

const StyleQuickViewList = styled.div`
width: 100%;
height: 100%;
display: flex;
padding-left: 30px;
padding-top: 20px;
align-items: center;
overflow: scroll;
@media (max-width: 400px) {
    flex-wrap: wrap;
}
`

const StyleItem = styled.div`
width: 243px;
height: 100%;
display: flex;
flex-direction: column;
margin-right: 50px;
padding-left: 15px;
padding-top: 10px;
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

const StyleHeaderQuickView = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 65px;
    background-color: #E96324;
    padding-left: 32px;
    padding-right: 8px;
    span{
        font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 35px;
line-height: 52px;
color: white;
    }
    span:last-child{
        font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 25px;
line-height: 38px;
color:white;
    }

`