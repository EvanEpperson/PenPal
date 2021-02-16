import { StyleSheet } from "react-native";
// import { color } from "../../utility";

export default StyleSheet.create({
  cardStyle: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    // borderColor: 'silver',
  },
  cardItemStyle: {
    backgroundColor: "white",
  },

  logoContainer: {
    height: 60,
    width: 60,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
  },
  thumbnailName: { fontSize: 30, fontWeight: "bold" },
  profileName: { fontSize: 20, fontWeight: "bold" },
});
