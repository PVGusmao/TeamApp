import { useEffect, useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { groupsGetAll } from '../../storage/group/groupsGetAll';

import { Button } from '../../components/Button';
import { EmptyList } from '../../components/EmptyList';
import { GroupCard } from "../../components/GroupCard";
import { Header } from "../../components/Header"
import { Highlights } from "../../components/HighLights";
import { Container } from "./styles";

export const Groups = () => {
  const [groups, setGroups] = useState<string[]>([]);
  
  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('newGroup')
  }

  async function fetchGroups() {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch(error) {
      console.log(error);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []))

  return (
    <Container>
      <Header />

      <Highlights title="Turmas" subtitle="Jogue com a sua turma"/>

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        ListEmptyComponent={ () => <EmptyList message="Que tal cadastrar a primeira turma?" />}
        contentContainerStyle={[!groups.length ? {flex: 1} : {width: 400}]}
      />

      <Button
        onPress={handleNewGroup}
        title="Criar nova turma"
      />
    </Container>
  );
}