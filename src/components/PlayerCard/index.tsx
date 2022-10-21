import React from 'react'
import { ButtonIcon } from '../ButtonIcon';
import { Container, Icon, Name } from './styles';

type Props = {
  name: string;
  onRemove: () => void;
}

export function PlayerCard({ name, onRemove }: Props){
  return (
    <Container>
      <Icon name='person' />
      <Name>{name}</Name>
      <ButtonIcon
        icon="close"
        type="SECONDARY"
        onPress={onRemove}
      />
    </Container>
  );
}
