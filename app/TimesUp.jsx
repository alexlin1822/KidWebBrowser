import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function TimesUp() {
  // console.log("TimesUp - time is up");
  const handleReturn = async () => {
    router.replace("/Login");
    return;
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => handleReturn()}
        >
          <MaterialCommunityIcons name="timer" size={128} color="lightblue" />
          <Text style={styles.text}>Times Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 64,
    fontWeight: "bold",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 20,
    color: "orange",
  },
  touchableOpacity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
