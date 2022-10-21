import { useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { Button } from '../../components/Button';
import { EmptyList } from '../../components/EmptyList';
import { GroupCard } from "../../components/GroupCard";
import { Header } from "../../components/Header"
import { Highlights } from "../../components/HighLights";
import { Container } from "./styles";

export const Groups = () => {
  const [groups, setGroups] = useState<string[]>(['Galera da Rocket', 'Amigos']);

  return (
    <Container>
      <Header />

      <Highlights title="Turmas"  subtitle="Jogue com a sua turma"/>

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        ListEmptyComponent={ () => <EmptyList message="Que tal cadastrar a primeira turma?" />}
        contentContainerStyle={[!groups.length ? {flex: 1} : {width: 400}]}
      />

      <Button
        title="Criar nova turma"
      />
    </Container>
  );
}