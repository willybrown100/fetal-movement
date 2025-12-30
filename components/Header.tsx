import Avatar from "@/assets/svg/Badge content.svg";
import InfoIcon from "@/assets/svg/Info.svg";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "./Icons/BackButton";
import Typography from "./Typography";

const Header = ({
  title,
  backButton,
  avatar,
  handleInfoPress,
  count,
}: {
  title: string;
  backButton?: boolean;
  avatar?: boolean;
  handleInfoPress?: () => void;
  count?: number;
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top + 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      {/* Left side - Back button or empty space */}
      <View style={{ width: 40 }}>
        {backButton && (
          <Pressable onPress={() => router.back()}>
            <BackButton />
          </Pressable>
        )}
      </View>

      {/* Center - Title */}
      <View style={{ flex: 1, alignItems: "center" }}>
        <Typography size={18} weight="700">
          {title}
        </Typography>
      </View>

      {/* Right side - Avatar or Info Icon */}
      <View style={{ width: 40, alignItems: "flex-end" }}>
        {avatar ? (
          <View
            style={{ flexDirection: "row", alignItems: "center", columnGap: 7 }}
          >
            <Avatar />
            <Typography size={16} weight="600">
              {count || 0}
            </Typography>
          </View>
        ) : (
          <Pressable onPress={handleInfoPress}>
            <InfoIcon />
          </Pressable>
        )}
      </View>
    </View>
  );
};
export default Header;
