import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "./Typography";

interface RecordCardProps {
  day: string;
  time: string;
  date: string;
}

const RecordCard: React.FC<RecordCardProps> = ({ day, time, date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Typography weight="500" size={14} color={Colors.black.main}>
          {day}
        </Typography>
        <View
          style={{ height: 20, justifyContent: "center", alignItems: "center" }}
        >
          <Typography weight="600" size={14} color={Colors.black.main}>
            •
          </Typography>
        </View>
        <Typography weight="500" size={14} color={Colors.black.main}>
          {date}
        </Typography>
      </View>
      <View style={styles.rightSection}>
        <Typography weight="500" size={14} color={Colors.black.main}>
          {time}
        </Typography>
      </View>
    </View>
  );
};

export default RecordCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderColor: "#EFEFEF",
    borderWidth: 1,
  },
  leftSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  rightSection: {
    alignItems: "flex-end",
    flexDirection: "row",

    columnGap: 4,
  },
});
