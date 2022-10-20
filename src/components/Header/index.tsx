import { BackButton, BackIcon, Container, Logo } from "./styles";
import LogoImg from '../../../assets/icon.png' 

type Props = {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false }: Props) {
  return (
    <Container>
      {
        showBackButton && 
        <BackButton>
          <BackIcon name="left" />
        </BackButton>
      }
      <Logo source={LogoImg}/>
    </Container>
  )
}