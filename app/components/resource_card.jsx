import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getIcon } from "../utility/Common";
import { styleSheetCustom } from "../utility/styles";

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
          <MaterialCommunityIcons name="web-plus" size={96} color="green" />
        ) : (
          <Image source={{ uri: getIcon(item.icon) }} style={styles.image} />
        )}
        <Text style={styles.text_title}>{item.title}</Text>
        <Text style={styles.text_description}>{item.description}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create(styleSheetCustom);
