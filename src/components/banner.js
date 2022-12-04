import styled from "styled-components";
import banner from "../img/promocaoBlackFriday.jpg_.jpg"

export default function Banner(){
   return(
           <StyleBanner>
            <img src={banner} alt="promocao" />
           </StyleBanner>
   )
}

const StyleBanner = styled.div`
border-radius: 10px;
width: 100%;
height: 530px;
margin-left: 22px;
img{
   width:100%;
   height: 530px;
}
`