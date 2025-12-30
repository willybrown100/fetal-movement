import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

export type TypographyProps = {
  children: any;
  weight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  color?: string;
  font?: string;
  size?: number;
  align?: "center" | "justify" | "right" | "left";
  style?: StyleProp<TextStyle>;
  lineHeight?: number;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
};

const Typography = ({
  children,
  color,
  weight = "400",
  size,
  align,
  style,
  lineHeight,
  numberOfLines,
  ellipsizeMode,
}: TypographyProps) => {
  const getFontFamily = (weight: TypographyProps["weight"]) => {
    switch (weight) {
      case "100":
        return "Nunito-ExtraLight";
      case "200":
        return "Nunito-Light";
      case "300":
        return "Nunito-Regular";
      case "400":
        return "Nunito-Regular";
      case "500":
        return "Nunito-Medium";
      case "600":
        return "Nunito-SemiBold";
      case "700":
        return "Nunito-Bold";
      case "800":
        return "Nunito-ExtraBold";
      case "900":
        return "Nunito-Black";
      default:
        return "Nunito-Regular";
    }
  };
  return (
    <Text
      style={[
        {
          color: color ? color : Colors.black.main,
          fontWeight: weight,
          fontFamily: getFontFamily(weight),
          fontSize: size,
          textAlign: align,
          lineHeight: lineHeight,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </Text>
  );
};

export default Typography;
