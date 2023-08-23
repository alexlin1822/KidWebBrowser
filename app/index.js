import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Page() {
  const handleStart = () => {
    router.replace("/Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowView}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handleStart()}
        >
          <Text style={styles.buttonText}>Go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  submitButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    height: 50,
    marginTop: 20,
    marginBottom: 50,
  },
  buttonText: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
