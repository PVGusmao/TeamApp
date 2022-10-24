import { useEffect, useState, useRef } from "react";
import { Alert, FlatList, Text, TextInput } from "react-native";
import { useTheme } from "styled-components/native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { AppError } from "../../utils/AppError";

import { PlayerAddByGroup } from "../../storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "../../storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "../../storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "../../storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "../../storage/group/groupRemoveByName";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { Button } from "../../components/Button";
import { ButtonIcon } from "../../components/ButtonIcon";
import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { Highlights } from "../../components/HighLights";
import { Input } from "../../components/Input";
import { PlayerCard } from "../../components/PlayerCard";

type RouteParams = {
  group: string;
}

export function Players() {
  const theme = useTheme();
  
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  
  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);
  
  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova Pessoa', 'Informe o nome da pessoa para adicionar.')
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await PlayerAddByGroup(newPlayer, group);
      newPlayerNameInputRef.current?.blur();
      setNewPlayerName('');
      fetchPlayersByTeam();

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova Pessoa', error.message);
      } else {
        console.log(error);
        Alert.alert('Nova Pessoa', 'Não foi possível adicionar.')
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playerGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error);
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas filtradas do time selecionado')
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert('Remover essoa, Não foi possível remover esta pessoa.')
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');
    } catch (error) {
      console.log(error);
      Alert.alert('Remover grupo', 'Não foi possível removero grupo.')
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remover',
      'Deseja remover o frupo?',
      [
        { text: 'Não', style: 'cancel'},
        { text: 'Sim', onPress: () => groupRemove() }
      ]
    )
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team])
  
  return (
    <Container>
      <Header showBackButton />

      <Highlights
        title={group}
        subtitle="Adicione a galera e separe os times"
      />
      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer}/>
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
        keyExtractor={item => item.name}
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
            name={ item.name }
            onRemove={() => {handlePlayerRemove(item.name)}}
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
        onPress={handleGroupRemove}
      />
    </Container>
  )
}