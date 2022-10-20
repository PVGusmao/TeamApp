import { TextInput } from 'react-native';
import styled from 'styled-components/native'

export const Container = styled(TextInput)`
  align-items: center;
  flex: 1;
  justify-content: center;

  width: 100%;
  padding: 12px;

  min-height: 56px;
  max-height: 56px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
`;
