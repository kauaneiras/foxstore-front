import styled from "styled-components";
import twitter from "../img/Twitter.png"
import instagram from "../img/instagram.png"
import Facebook from "../img/Facebook.png"
import Whatsapp from "../img/Whatsapp.png"

export default function Footer() {
    return (
        <StyleFooter>
            <div>
                <h1>Fox Store</h1>
                <p>São Paulo, Brasil</p>
                <p>+55 0123456</p>
                <h2>Siga-nos:</h2>
            </div>
            <StyleOptions>
            <img src={twitter} alt="twitter" />
            <img src={instagram} alt="instagram" />
            <img src={Facebook} alt="facebook" />
            <img src={Whatsapp} alt="whatsapp" />
            </StyleOptions>
        </StyleFooter>

    )
}

const StyleFooter = styled.div`
width: 100%;
height: 481px;
display: flex;
flex-direction: column;
background-color: #E96324;
padding-left: 51px;
padding-top: 33px;
margin-top: 200px;
div{
display: flex;
flex-direction: column;
justify-content: space-between;
}
h1{
    font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 35px;
line-height: 52px;
color: #FFFFFF;
margin-bottom: 5px;
}
h2{
    font-family: 'Poppins';
font-style: normal;
font-weight: 500;
font-size: 35px;
line-height: 52px;
color: #FFFFFF;
margin-top: 83px;
}
p{
    font-family: 'Poppins';
font-style: normal;
font-weight: 400;
font-size: 25px;
line-height: 38px;
color: #FFFFFF;
margin-bottom: 10px;
}
`

const StyleOptions = styled.span`
display: flex;
margin-top: 14px;
img{
    width: 65px;
    height: 60px;
    margin-right: 25px;
}
`