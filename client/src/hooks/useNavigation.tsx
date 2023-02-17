import { RootStackParamList } from "@/types";
import { useNavigation as useNativeNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

/**
 * Custom navigation hook
 * @returns {NativeStackNavigationProp<RootStackParamList>} - Navigation hook
 */
export function useNavigation(): NativeStackNavigationProp<RootStackParamList> {
  return useNativeNavigation<NativeStackNavigationProp<RootStackParamList>>();
}
