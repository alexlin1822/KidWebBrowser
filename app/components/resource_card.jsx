import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ResourceCard({
  item,
  onSubmitResource,
  onSubmitLongResource,
}) {
  let strIcon = item.icon.toString();
  let isDefaultIcon = item.rid === "0" ? true : false;

  const handleClick = () => {
    onSubmitResource(item);
  };

  const handleLongClick = () => {
    onSubmitLongResource(item);
  };

  return (
    <View style={styles.card} key={item.rid}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleClick}
        onLongPress={handleLongClick}
      >
        {isDefaultIcon ? (
          <MaterialCommunityIcons name="web-plus" size={48} color="green" />
        ) : (
          <Image source={{ uri: item.icon }} style={styles.image} />
        )}
        {/* {strIcon.startsWith("http") ? (
          <Image source={{ uri: item.icon }} style={styles.image} />
        ) : (
          <Image source={strIcon} style={styles.image} />
        )} */}
        <Text style={styles.text}>{item.title}</Text>
        {/* <Text>{item.default_url}</Text>
        <Text>{item.description}</Text> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    margin: 20,
  },
  button: {
    alignItems: "center",
  },
  image: {
    width: 48,
    height: 48,
  },
  text: {
    fontWeight: "bold",
    marginTop: 8,
  },
});
