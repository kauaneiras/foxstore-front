import { useContext, useState, useRef } from "react"
import styled from "styled-components"
import {useNavigate} from "react-router-dom"
import Header from "../components/header";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import Footer from "../components/footer";
import swal from "sweetalert";
import { ThreeDots } from 'react-loader-spinner'

export default function SignIn() {
    const Url = "https://foxstore.onrender.com/signin"
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const body = {email, password,}
    const { setAndPersistToken, setAndPersistUsername } = useContext(UserContext);
    const [wrongInputs, setWrongInputs]= useState([])
    const [buttonText, setButtonText] = useState("Entrar")
    const inputRef1 = useRef("")
    const inputRef2 = useRef("")
    const focus1 = () => {
        inputRef1.current.focus()
    }
    const focus2 = () => {
        inputRef2.current.focus()
    }

    function handleSubmit(e) {
        e.preventDefault();

        setButtonText(<ThreeDots
            height="80"
            width="80"
            radius="9"
            color="white"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />)
        let alert = async () => {
            await swal({
                icon: "error",
                text: "senha incorreta",
              });
        }

        axios.post(Url, body)
        .then(res => {
            setAndPersistToken(res.data.token);
            setAndPersistUsername(res.data.name);
            setWrongInputs([])
            alert = null
            setButtonText("Entrar")
            navigate("/");
        })
        .catch(async err => {
            setWrongInputs([...wrongInputs, 1])
               await swal({
                    icon: "error",
                    text: err.response.data,
                  });
                  setButtonText("Entrar")
                  focus1()
        });
        setTimeout(() => {
            setWrongInputs([...wrongInputs, 2])
            setButtonText("Entrar")
            alert()
            focus2()
        }, 8000)
    }
    return (
        <BackGround>
            <Header />
            <Conteiner>
                <Titlle>Faça Login</Titlle>
                <Form onSubmit={handleSubmit}>

                    <StyleInput
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        id="email"
                        placeholder="E-mail"
                        name='email' type='email'
                        required
                        ref={inputRef1}
                        color={wrongInputs.includes(1) ? "#F59E87" : "white"}>
                        </StyleInput>

                    <StyleInput
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        id="senha"
                        placeholder="Senha"
                        name='senha' type='password'
                        required
                        ref={inputRef2}
                        color={wrongInputs.includes(2) ? "#F59E87" : "white"}>
                        </StyleInput>

                    <button type='submit'> {buttonText}</button>

                </Form>

            </Conteiner>
            <Footer/>
        </BackGround>
    )
}


const BackGround = styled.div`
background: #F2F2F2;
`

const Conteiner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 50px 50px 50px;
    
`
const Titlle = styled.h1`
  
    margin-bottom: 24px;
    font-family: 'Saira Stencil One';
    font-weight: bold;
    font-size: 32px;
    line-height: 50px;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-items: center;
    button{
        width: 326px;
        height: 46px;
        background: #E96324;
        border-radius: 5px;
        border: none;
        font-family: 'Raleway';
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        display: flex;
        align-items: center;
        color: white;
        justify-content: center;
        cursor: pointer;
    }
`
const StyleInput = styled.input`
    margin-bottom: 13px ;
    width: 100%;
    height: 58px;
    border-radius: 5px;
    border:  1px solid #E96324;
    background-color: ${props => props.color};
    ::placeholder{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: black;
`