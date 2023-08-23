import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GetAccountID, SetCurrentID } from "./utility/Common";
import { router } from "expo-router";

export default function Login() {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Simulating a login check (you should replace this with your actual authentication logic)
    let resultID = await GetAccountID(userName, password);

    if (resultID != "") {
      SetCurrentID("currentAccountID", resultID);

      router.push({
        pathname: "/UserProfile",
        params: { needLoad: true },
      });
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleSignUp = () => {
    router.replace("/SignUp");
  };

  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
});
