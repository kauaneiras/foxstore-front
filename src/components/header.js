import styled from "styled-components";
import raposa from "../img/logo.png"
import carrinho from "../img/carrinho.png"
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({quantity}) {

    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const {productsCart} = useContext(UserContext)
    const {username} = useContext(UserContext)

    function logout() {
        navigate("/");
        window.location.reload();
        localStorage.clear();
    }


    function searchFor(){
        if(search !== ""){
            navigate(`/searchPage/${search.toLowerCase()}`)
            window.location.reload()
        }
    }

if (username === null || username === undefined || window.location.pathname === "/signin" || window.location.pathname === "/signup") {
        return (
            <StyleHeader>
                <div>
                    <Link to="/">
                        <img src={raposa} alt="logo" />
                    </Link>
                    <input type="text" placeholder="Pesquisar" value={search} onChange={e => setSearch(e.target.value)} />
                    <button>
                        <img onClick={searchFor} src="https://cdn-icons-png.flaticon.com/512/49/49116.png" alt="lupa" />
                    </button>
                </div>
                <StyleOptions>
                    <Link to="/signUp">
                        <p>Cadastrar</p>
                    </Link>
                    <Link to="/signIn">
                        <p>Entrar</p>
                    </Link>
                    <Link to="/cart">
                        <img src={carrinho} alt="carrinho" />
                    </Link>
                    <span>{productsCart.length}</span>
                </StyleOptions>
            </StyleHeader>
        )
    } else {
        return (
            <StyleHeader>
                <div>
                    <Link to="/">
                        <img src={raposa} alt="logo" />
                    </Link>
                    <input type="text" placeholder="Pesquisar" value={search} onChange={e => setSearch(e.target.value)} />
                    <button>
                        <img onClick={searchFor} src="https://cdn-icons-png.flaticon.com/512/49/49116.png" alt="lupa" />
                    </button>
                </div>
                <StyleOptions>
                    <Link to="/">
                        <p>Bem vindo, {username}</p>
                    </Link>
                        <p onClick={() => logout()}>Sair</p>
                    <Link to="/cart">
                        <img src={carrinho} alt="carrinho" />
                    </Link>
                    <span>{productsCart.length}</span>
                </StyleOptions>
            </StyleHeader>
        )
    }
}

const StyleHeader = styled.div`
width: 100%;
height: 93px;
display: flex;
align-items: center;
justify-content: space-between;
background-color: #E96324;
padding-left: 71px;
padding-right: 87px;

button{
width: 55px;
height: 55px;
border-radius: 10px;
background-color: white;
border: thin;
border: 2px solid black;
img{
    width: 100%;
}
}

img{
    width: 80px;
    border-radius: 15px;
}

div{
display: flex;
align-items: center;
justify-content: space-between;
}

input{
width: 408px;
height: 55px;
font-family: 'Poppins';
font-style: normal;
font-weight: 300;
font-size: 25px;
line-height: 38px;
color: black;
border: 2px solid black;
border-radius: 15px;
padding-left: 15px;
margin-left: 160px;
margin-right: 20px;
::placeholder{
font-family: 'Poppins';
font-style: normal;
font-weight: 300;
font-size: 25px;
line-height: 38px;
color: black;
}

}
@media (max-width: 400px){
    justify-content: center;
    input{
       display: none;
    }
    button{
        display: none;
    }
    p{
        margin-left: 10px;
    }
    img{
        width: 60px;
    }
}
`

const StyleOptions = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
position: relative;
p{
font-family: 'Poppins';
font-style: normal;
font-weight: 600;
font-size: 30px;
color: black;
margin-right: 50px;
cursor: pointer;
}
img{
    width: 45px;
    border-radius: 15px;
}
span{
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
    width: 35px;
    height: 35px;
    color: #fff;
    border-radius: 25px;
    position: absolute;
    top: -10px;
    right: -20px;
    font-size: 17px;
    line-height: 20px;
    text-align: center;
    font-family: 'Poppins';
    font-style: normal;
}

@media (max-width: 400px){
    
    p{
        font-size: 18px;
        line-height: 18px;
        margin-right: 20px;

    }
}
`