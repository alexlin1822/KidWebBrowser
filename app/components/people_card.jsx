import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function PeopleCard({
  item,
  onSubmitResource,
  onSubmitLongResource,
}) {
  const strIcon = item.icon.toString();
  let isDefaultIcon = item.key === "0" ? true : false;

  // console.log("People card here" + JSON.stringify(item));

  const handleClick = () => {
    // console.log("People card Clicked: " + JSON.stringify(item));
    onSubmitResource(item);
  };

  const handleLongClick = () => {
    onSubmitLongResource(item);
  };

  return (
    <View style={styles.card} key={item.key}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleClick}
        onLongPress={handleLongClick}
      >
        <Image source={{ uri: item.icon }} style={styles.people_image} />
        <Text style={styles.text}>{item.title}</Text>
        <Text style={{ color: "blue" }}>{item.description}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 3,
    margin: 3,
  },
  people_image: {
    width: 128,
    height: 128,
    resizeMode: "stretch",
  },
  text: {
    fontWeight: "bold",
    marginTop: 8,
  },
});
