import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function TimesUp() {
  const handleReturn = async () => {
    router.replace("/Login");
  };

  // Navigation
  const navigation = useNavigation();

  // Effect
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      console.log("onback");
      // Do your stuff here
      // navigation.dispatch(e.data.action);
      // router.replace("/Login");
    });
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.text}>Times Up</Text>
        <Button style={styles.button} title="Go Back" onPress={handleReturn} />
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
    fontSize: 60,
    fontWeight: "bold",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 20,
  },
  button: {
    height: 40,
  },
});
