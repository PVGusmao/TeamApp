import { playersGetGroup } from "./playersGetGroup";

export async function playerGetByGroupAndTeam(group: string, team: string) {
  try {
    const storage = await playersGetGroup(group)

    const players = storage.filter(player => player.team === team);

    return players;
  } catch (error) {
    throw error;
  }
}