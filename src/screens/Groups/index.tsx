import { GroupCard } from "../../components/GroupCard";
import { Header } from "../../components/Header"
import { Highlights } from "../../components/HighLights";
import { Container } from "./styles";

export const Groups = () => {
  return (
    <Container>
      <Header />

      <Highlights title="Turmas"  subtitle="Jogue com a sua turma"/>

      <GroupCard title="Galera do Ignite" />
    </Container>
  );
}