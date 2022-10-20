import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;

  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
`

export const LoadIndicator = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.GRAY_100
}))`

`