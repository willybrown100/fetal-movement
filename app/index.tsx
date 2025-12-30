import LeapIcon from "@/assets/svg/leapIcon.svg";
import AppButton from "@/components/AppButton";
import DashedBorder from "@/components/DashedBorder";
import Header from "@/components/Header";
import BookmarkIcon from "@/components/Icons/BookmarkIcon";
import RecordCard from "@/components/RecordCard";
import Typography from "@/components/Typography";
import Wrapper from "@/components/Wrapper";
import { Colors } from "@/constants/Colors";
import { getSessionCount, getSessions, Session } from "@/services/storage";
import MaskedView from "@react-native-masked-view/masked-view";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, ImageBackground, StyleSheet, View } from "react-native";

export default function Index() {
  const navigation = useNavigation();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionCount, setSessionCount] = useState(0);

  // Load sessions when screen focuses (including when navigating back from Counter)
  useFocusEffect(
    useCallback(() => {
      const loadedSessions = getSessions();
      setSessions(loadedSessions);
      setSessionCount(getSessionCount());
    }, [])
  );

  // Format time intelligently based on duration
  const formatTimeDisplay = (seconds: number): string => {
    if (seconds < 60) {
      // Less than 1 minute - show seconds
      return `${seconds} sec${seconds !== 1 ? "s" : ""}`;
    } else if (seconds < 3600) {
      // Less than 1 hour - show minutes and seconds
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;

      if (secs === 0) {
        // Exact minutes (e.g., "5 mins")
        return `${mins} min${mins !== 1 ? "s" : ""}`;
      } else {
        // Minutes with seconds (e.g., "1min :30secs")
        return `${mins}min :${secs}sec${secs !== 1 ? "s" : ""}`;
      }
    } else {
      // 1 hour or more - show hours
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""}`;
    }
  };

  return (
    <Wrapper useTopSafeArea={false} paddingH={0}>
      <Header title="DFM (Kick counter)" avatar={true} count={sessionCount} />
      <DashedBorder />

      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={require("/Users/inhousecodes/Desktop/Daily-Fetal-Movement-Tracker/assets/images/pregWoman.jpg")}
                style={styles.imageBackground}
                imageStyle={{ borderRadius: 16 }}
                resizeMode="cover"
              >
                {/* Top Section with Gradient and Shadow */}
                <View style={styles.topBlurContainer}>
                  <LinearGradient
                    colors={[
                      "rgba(255, 255, 255, 0.95)",
                      "rgba(255, 255, 255, 0.7)",
                      "rgba(255, 255, 255, 0.3)",
                      "rgba(255, 255, 255, 0)",
                    ]}
                    locations={[0, 0.5, 0.8, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.topBlur}
                  >
                    <View style={styles.contentContainer}>
                      <LeapIcon />
                      <View style={styles.saveButton}>
                        <BookmarkIcon />
                        <Typography weight="600" size={14}>
                          Save
                        </Typography>
                      </View>
                    </View>
                  </LinearGradient>
                </View>

                {/* Middle gradient overlay */}
                <LinearGradient
                  colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.65)"]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.gradient}
                />

                {/* Bottom Section with Masked BlurView */}
                <View style={styles.bottomBlurContainer}>
                  <MaskedView
                    style={styles.bottomBlur}
                    maskElement={
                      <LinearGradient
                        colors={["transparent", "white", "white"]}
                        locations={[0, 0.3, 1]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={StyleSheet.absoluteFillObject}
                      />
                    }
                  >
                    <BlurView
                      intensity={20}
                      tint="light"
                      style={StyleSheet.absoluteFillObject}
                    >
                      <View style={styles.bottomBlurContent}>
                        <Typography
                          weight="700"
                          size={24}
                          color="#fff"
                          style={{
                            textShadowColor: "rgba(0, 0, 0, 0.75)",
                            textShadowOffset: { width: 0, height: 2 },
                            textShadowRadius: 4,
                          }}
                        >
                          DFM (fetal movement)
                        </Typography>
                      </View>
                    </BlurView>
                  </MaskedView>
                </View>
              </ImageBackground>
            </View>
            <View
              style={{ marginTop: 16 }}
              className="justify-center  items-center mx-auto"
            >
              <AppButton
                handlePress={() => navigation.navigate("counter")}
                title="Track Movements"
              />
              <Typography
                weight="600"
                size={16}
                style={{ marginVertical: 16 }}
                color={Colors.black.dark}
              >
                Past records
              </Typography>
            </View>
          </>
        }
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
        }}
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecordCard
            day={item.day}
            time={formatTimeDisplay(item.time)}
            date={item.date}
          />
        )}
        ListEmptyComponent={
          <View style={{ padding: 20, alignItems: "center" }}>
            <Typography size={16} weight="400" color={Colors.gray.medium}>
              No sessions recorded yet
            </Typography>
          </View>
        }
      />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white.main,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginRight: 16,
  },
  imageContainer: {
    marginTop: 16,
  },
  imageBackground: {
    height: 200,

    borderRadius: 16,
    overflow: "hidden",
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 32,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
  },
  bottomText: {
    marginTop: "auto",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject, // covers entire image
  },
  topBlurContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 70, // Increased from 50 to make it come down more
    // Shadow for iOS
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    // Shadow for Android
    elevation: 8,
  },
  topBlur: {
    flex: 1,
    overflow: "hidden",

    padding: 12,
    justifyContent: "center",
  },
  bottomBlurContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  bottomBlur: {
    flex: 1,
    overflow: "hidden",
  },
  bottomBlurContent: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
});
