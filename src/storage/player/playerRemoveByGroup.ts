import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "../storageConfig";
import { playersGetGroup } from "./playersGetGroup";

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const storage = await playersGetGroup(group);

    const filtered = storage.filter(player => player.name !== playerName)
    const players = JSON.stringify(filtered);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players)
  } catch (error) {
    throw error;
  }
}