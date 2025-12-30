import { Colors } from "@/constants/Colors";
import { BlurView } from "expo-blur";
import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Modal from "react-native-modal";
import BoldText from "../BoldText";
import DashedBorder from "../DashedBorder";
import CloseIcon from "../Icons/CloseIcon";
import FootPrintIcon from "../Icons/FootPrintIcon";
import Typography from "../Typography";

interface BlockUserModalProps {
  visible: boolean;
  showClosBtn?: boolean;
  onClose?: () => void;
  onBlock?: () => void;
  onCancel?: () => void;
  leftBtnText?: string;
  rightBtnText?: string | React.ReactNode;
  title?: string;
  loading?: boolean;
  isLodingLeftButton?: boolean;
  subTitle1?: string;
  subTitle2?: string;
  variant?: any;
  svg?: React.ReactNode;
  img?: any;
}
const AppModal: React.FC<BlockUserModalProps> = ({
  visible,
  loading,
  svg,
  onClose,
  isLodingLeftButton,
  onCancel,
  showClosBtn,
  img,
  onBlock,
  variant,
  leftBtnText,
  rightBtnText,
  title,
  subTitle1,
  subTitle2,
}) => {
  const prevLoadingRef = React.useRef(loading);
  const prevLoadingLeftRef = React.useRef(isLodingLeftButton);

  React.useEffect(() => {
    // Close modal when either loading or isLoadingLeftButton transitions from true to false
    if (
      (prevLoadingRef.current === true && loading === false) ||
      (prevLoadingLeftRef.current === true && isLodingLeftButton === false)
    ) {
      onClose?.();
    }
    prevLoadingRef.current = loading;
    prevLoadingLeftRef.current = isLodingLeftButton;
  }, [loading, isLodingLeftButton, onClose]);

  return (
    <Modal
      useNativeDriver
      isVisible={visible}
      onBackButtonPress={onClose}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0}
      animationInTiming={800}
      animationOutTiming={600}
      style={{ margin: 0 }}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.blurContainer}>
          {Platform.OS === "ios" ? (
            <BlurView
              intensity={10}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <View style={[StyleSheet.absoluteFill, styles.androidOverlay]} />
          )}
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.contentContainer} pointerEvents="box-none">
        <View
          style={{
            paddingHorizontal: 16,
            marginLeft: "auto",
            paddingBottom: 16,
          }}
        >
          <Pressable
            onPress={onClose}
            style={{
              backgroundColor: Colors.white.mediumLight,
              alignItems: "center",
              borderRadius: 40,
              justifyContent: "center",
              padding: 16,

              zIndex: 1000,
            }}
          >
            <CloseIcon />
          </Pressable>
        </View>
        <TouchableWithoutFeedback>
          <View style={{ paddingHorizontal: 16 }}>
            <View
              style={{
                marginBottom: 6,
                overflow: "hidden",
                borderRadius: 16,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                marginHorizontal: 16,
              }}
            >
              <View
                style={{
                  flexDirection: "row",

                  alignItems: "center",
                  padding: 16,
                  columnGap: 12,
                  borderRadius: 16,
                }}
              >
                <FootPrintIcon />
                <Typography size={20} weight="700">
                  Steps to count fetal kicks
                </Typography>
              </View>
              <DashedBorder
                color={"#D2D2D2"}
                dashThickness={2}
                length={47}
                marginTop={0}
              />
            </View>
            <View
              style={{
                borderRadius: 16,
                overflow: "hidden",
                marginHorizontal: 16,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  height: 72,
                  padding: 16,
                  columnGap: 12,
                }}
              >
                <Typography size={14} weight="500">
                  1.
                </Typography>
                <Typography size={14} style={{ flexShrink: 1 }} weight="500">
                  Choose a <BoldText text="time" /> when you are{" "}
                  <BoldText text="least distracted" /> or when you typically{" "}
                  <BoldText text="feel the fetus move." />
                </Typography>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: Colors.white.mediumLight,
                  alignItems: "center",
                  padding: 16,
                  height: 72,
                  columnGap: 12,
                }}
              >
                <Typography size={14} weight="500">
                  2.
                </Typography>
                <Typography size={14} style={{ flexShrink: 1 }} weight="500">
                  Get {""}
                  <BoldText text="comfortable." /> Lie on your {""}
                  <BoldText text="left side" />
                  or sit with your feet propped up.
                </Typography>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  alignItems: "center",
                  padding: 16,
                  height: 72,
                  columnGap: 12,
                }}
              >
                <Typography size={14} weight="500">
                  3.
                </Typography>
                <Typography size={14} weight="500">
                  Place your <BoldText text="hands on your belly." />
                </Typography>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: Colors.white.mediumLight,
                  height: 72,
                  alignItems: "center",
                  padding: 16,
                  columnGap: 12,
                }}
              >
                <Typography size={14} weight="700">
                  4.
                </Typography>
                <Typography size={14} weight="500">
                  <BoldText text="Start a timer" /> or watch the clock.
                </Typography>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  alignItems: "center",
                  padding: 16,
                  height: 72,
                  columnGap: 12,
                }}
              >
                <Typography size={14} weight="700">
                  5.
                </Typography>
                <Typography size={14} style={{ flexShrink: 1 }} weight="500">
                  <BoldText text="Count" /> each kick. Keep counting until you
                  get to{" "}
                  <BoldText text="10 kicks / flutters / swishes/rolls." />
                </Typography>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: Colors.white.mediumLight,
                  alignItems: "center",
                  padding: 16,
                  height: 72,
                  columnGap: 12,
                }}
              >
                <Typography size={14} weight="500">
                  6.
                </Typography>
                <Typography size={14} style={{ flexShrink: 1 }} weight="500">
                  Once you reach <BoldText text="10 kicks,jot down" /> how many{" "}
                  <BoldText text="minutes" /> it took.
                </Typography>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  blurContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  androidOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
