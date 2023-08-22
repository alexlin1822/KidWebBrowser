import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { GetAccountID, SetCurrentID, GetCurrentID } from "./utility/Common";
import { Link, router } from "expo-router";

export default function Page() {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Simulating a login check (you should replace this with your actual authentication logic)
    let resultID = await GetAccountID(userName, password);
    console.log("resultID: " + resultID);

    if (resultID != "") {
      SetCurrentID("currentAccountID", resultID);
      console.log(
        "currentAccountID - Login page: " + GetCurrentID("currentAccountID")
      );
      // navigation.navigate("UserProfile", { needLoad: true });
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleSignUp = () => {
    // navigation.navigate("SignUp");
    router.replace("/about");
  };

  return (
    <View style={styles.container}>
      <Text>User Name</Text>
      <TextInput
        value={userName}
        onChangeText={setuserName}
        autoCapitalize="none"
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
});
