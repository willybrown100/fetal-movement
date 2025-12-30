import AppButton from "@/components/AppButton";
import DashedBorder from "@/components/DashedBorder";
import Header from "@/components/Header";
import ArrowDown from "@/components/Icons/ArrowDown";
import PlayIcon from "@/components/Icons/PlayIcon";
import AppModal from "@/components/modals/AppModal";
import Typography from "@/components/Typography";
import Wrapper from "@/components/Wrapper";
import { createSession, saveSession } from "@/services/storage";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

const Counter = () => {
  // Modal state
  const [visible, setVisible] = useState(false);

  // Timer and counter state
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [kickCount, setKickCount] = useState(0);

  // Show modal on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Timer logic - runs every second when isRunning is true
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Auto-stop timer when 10 kicks reached
  useEffect(() => {
    if (kickCount >= 10) {
      setIsRunning(false);
    }
  }, [kickCount]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Handler: Toggle timer start/stop
  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  // Handler: Save session to storage
  const handleSave = () => {
    const session = createSession(elapsedTime, kickCount);
    saveSession(session);
    router.back();
  };

  // Handler: Discard and go back
  const handleDiscard = () => {
    router.back();
  };

  return (
    <Wrapper useTopSafeArea={false} useBottomSafeArea={false} paddingH={0}>
      <Header
        title="Record DFM"
        backButton={true}
        handleInfoPress={() => setVisible((prev) => !prev)}
      />
      <DashedBorder />

      <LinearGradient
        colors={["#f2e6f2", "#ffecef"]}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 0.5, y: 1 }}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        style={{
          flex: 1,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            flex: 1,
            // justifyContent: "center",

            alignItems: "center",
          }}
        >
          <View>
            <View
              style={{
                alignItems: "center",
                width: 282,
                height: 100,
                marginTop: 90,
                borderRadius: 16,
                padding: 16,
                backgroundColor: "white",
                justifyContent: "center",
              }}
            >
              <Typography size={24} align="center" weight="600">
                Stop recording after 10 kicks
              </Typography>
            </View>
            <View style={{ alignItems: "center" }}>
              <ArrowDown />
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
              marginTop: 31,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                position: "absolute",
                width: 268,
                borderWidth: 4,
                borderColor: "#FFFFFF",
                height: 160,
                borderRadius: 140,
                backgroundColor: "rgba(255, 255, 255, 0.4)",
              }}
            />

            {/* Inner ring */}
            <View
              style={{
                position: "absolute",
                width: 234,
                height: 140,
                borderWidth: 4,
                borderColor: "#FFFFFF",
                borderRadius: 110,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              }}
            />

            <View
              style={{
                width: 190,
                height: 114,
                borderRadius: 72,
                borderWidth: 4,
                borderColor: "#FFFFFF",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography color="#EC523D" size={40} weight="700">
                {formatTime(elapsedTime)}
              </Typography>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              marginTop: 70,
              marginBottom: 70,
              height: 72,
              width: 72,
              borderRadius: 72,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#FFFFFF",
            }}
          >
            {!isRunning ? (
              <Pressable onPress={handleStartStop}>
                <PlayIcon />
              </Pressable>
            ) : (
              <Pressable
                onPress={handleStartStop}
                style={{
                  width: 27,
                  height: 27,
                  borderRadius: 4,
                  backgroundColor: "#343330",
                }}
              />
            )}
          </View>
          <View style={{ width: "100%" }}>
            <AppButton title="Save" handlePress={handleSave} />
          </View>
          <Link style={{ marginTop: 30, width: 213 }} href="/counter">
            <Typography
              size={18}
              style={{ marginTop: 20, textDecorationLine: "underline" }}
              align="center"
              weight="600"
            >
              What if I am not getting enough kicks?
            </Typography>
          </Link>
        </View>
      </LinearGradient>
      <AppModal visible={visible} onClose={() => setVisible(false)} />
    </Wrapper>
  );
};
export default Counter;
