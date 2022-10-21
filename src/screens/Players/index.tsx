import { useState } from "react";
import { FlatList, Text } from "react-native";
import { useTheme } from "styled-components/native";
import { useRoute } from "@react-navigation/native";

import { Button } from "../../components/Button";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { Highlights } from "../../components/HighLights";
import { Input } from "../../components/Input";
import { PlayerCard } from "../../components/PlayerCard";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams = {
  group: string;
}

export function Players() {
  const theme = useTheme();

  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState([]);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  return (
    <Container>
      <Header showBackButton />

      <Highlights
        title="Nome da Turma"
        subtitle="Adicione a galera e separe os times"
      />
      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />

        <ButtonIcon icon="add" />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          horizontal
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>


      <FlatList
        data={players}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text
            style={{
              color: theme.COLORS.GRAY_200,
              width: '100%',
              textAlign: 'center',
            }}
          >
            Não há pessoas na lista
          </Text>
        )}
        renderItem={({ item }) => (
          <PlayerCard
            name={ item }
            onRemove={() => {}}
          />
        )}
        contentContainerStyle={[
          { paddingBottom: 50 },
          !players.length && { flex: 1 }
        ]}
      />

      <Button
        type="SECONDARY"
        title="Remover Turma"
      />
    </Container>
  )
}