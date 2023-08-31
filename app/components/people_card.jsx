import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { styleSheetCustom } from "../utility/styles";

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
        <Image source={{ uri: item.icon }} style={styles.image} />
        <Text style={styles.text_title}>{item.title}</Text>
        <Text style={styles.text_description}>{item.description}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create(styleSheetCustom);
