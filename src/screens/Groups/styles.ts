import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Container = styled(SafeAreaView)`
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  flex: 1;
  padding: 20px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: 32px;
`