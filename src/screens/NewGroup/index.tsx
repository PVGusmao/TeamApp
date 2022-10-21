import { useNavigation } from '@react-navigation/native';
import { Container, Content, Icon } from "./styles";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Highlights } from "../../components/HighLights";
import { Input } from "../../components/Input";

export function NewGroup() {

  const navigation = useNavigation()

  function handleNew() {
    navigation.navigate('players', { group: 'Rocket' });
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon name="users" />
        
        <Highlights
          title="Nova Turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />
        
        <Input placeholder="Nome da Turma" />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>

    </Container>
  )
}