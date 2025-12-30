import React from "react";
import { StyleSheet, View } from "react-native";

interface DashedBorderProps {
  color?: string;
  dashLength?: number;
  dashGap?: number;
  dashThickness?: number;
  marginTop?: number;
  length?: number;
}

const DashedBorder: React.FC<DashedBorderProps> = ({
  color = "#E5E5E5",
  dashLength = 4,
  marginTop = 16,
  dashGap = 4,
  length = 50,
  dashThickness = 1,
}) => {
  return (
    <View style={[styles.container, { marginTop }]}>
      {Array.from({ length: length }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dash,
            {
              width: dashLength,
              height: dashThickness,
              backgroundColor: color,
              marginRight: dashGap,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    overflow: "hidden",
  },
  dash: {
    // Styles applied dynamically via props
  },
});

export default DashedBorder;
