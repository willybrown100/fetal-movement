import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import Typography from "./Typography";

const AppButton = ({
  title,
  handlePress,
}: {
  title: string;
  handlePress: () => void;
}) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    if (isDisabled) return;

    setIsDisabled(true);
    handlePress();

    // Re-enable after 500ms
    setTimeout(() => {
      setIsDisabled(false);
    }, 500);
  };

  return (
    <TouchableOpacity
      style={{
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderColor: Colors.black.main,
        borderWidth: 1,
        height: 56,
        width: "100%",
        backgroundColor: Colors.white.main,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
        opacity: isDisabled ? 0.6 : 1,
      }}
      onPress={handleClick}
      disabled={isDisabled}
    >
      <Typography
        weight="600"
        align="center"
        size={16}
        color={Colors.black.main}
      >
        {title}
      </Typography>
    </TouchableOpacity>
  );
};
export default AppButton;
