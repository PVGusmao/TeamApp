import { TouchableOpacityProps } from "react-native";

import { Container, Title, ButtonTypeStyleProps } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  type?: boolean;
}

export function Button({title, type = false, ...rest}: Props) {
  return(
    <Container type { ...rest }>
      <Title>{title}</Title>
    </Container>
  );
}