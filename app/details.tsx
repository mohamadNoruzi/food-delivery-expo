import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SectionList,
  ListRenderItem,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import ParallaxScrollView from "@/Components/ParallaxScrollView";
import Colors from "@/constants/Colors";
import { restaurant } from "@/assets/data/restaurant";
import { Link, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const Details = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  const opacity = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const Data = restaurant.food.map((item, index) => ({
    title: item.category,
    data: item.meals,
    index,
  }));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
      headerTintColor: Colors.primary,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.roundBatton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundBatton}>
            <Ionicons name="share-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundBatton}>
            <Ionicons name="search-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const selectCategory = (index: number) => setActiveIndex(index);

  const renderItem: ListRenderItem<any> = ({ item, index }) => (
    <Link href={"/"} asChild>
      <TouchableOpacity style={styles.item}>
        <View style={{ flex: 1 }}>
          <Text style={styles.dish}>{item.name}</Text>
          <Text style={styles.dishText}>{item.info}</Text>
          <Text style={styles.dishText}>{item.price}</Text>
        </View>
        <Image source={item.img} style={styles.dishImage} />
      </TouchableOpacity>
    </Link>
  );

  return (
    <>
      <ParallaxScrollView
        backgroundColor={"#fff"}
        style={{ flex: 1 }}
        parallaxHeaderHeight={250}
        stickyHeaderHeight={100}
        contentBackgroundColor={Colors.lightGrey}
        renderBackground={() => (
          <Image
            source={restaurant.img}
            style={{ height: 300, width: "100%" }}
          />
        )}
        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickySection}>
            <Text style={styles.stickySectionText}>{restaurant.name}</Text>
          </View>
        )}
      >
        <View style={styles.detailsContainer}>
          <Text style={styles.restauarantName}>{restaurant.name}</Text>
          <Text style={styles.restauarantDescription}>
            {restaurant.delivery} .
            {restaurant.tags.map(
              (tag, index) =>
                `${tag}${index < restaurant.tags.length - 1 ? " . " : ""}`
            )}
          </Text>
          <Text style={styles.restauarantDescription}>{restaurant.about}</Text>
          <SectionList
            contentContainerStyle={{ paddingBottom: 50 }}
            sections={Data}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  marginHorizontal: 16,
                  backgroundColor: Colors.gery,
                }}
              />
            )}
            SectionSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.gery }} />
            )}
            keyExtractor={(item, index) => `${item.id + index}`}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title, index } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
          />
        </View>
      </ParallaxScrollView>

      <Animated.View style={[styles.stickySegments, animatedStyles]}>
        <View style={styles.segmentShadow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.segmentScrollView}
          >
            {restaurant.food.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => selectCategory(index)}
                style={
                  activeIndex === index
                    ? styles.segmentButtonActive
                    : styles.segmentButton
                }
              >
                <Text
                  style={
                    activeIndex === index
                      ? styles.segemtTextActive
                      : styles.segemtText
                  }
                >
                  {item.category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: Colors.lightGrey,
  },
  stickySection: {
    backgroundColor: "#fff",
    marginLeft: 70,
    height: 100,
    justifyContent: "flex-end",
  },
  roundBatton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  stickySectionText: {
    fontSize: 20,
    margin: 10,
  },
  restauarantName: {
    fontSize: 30,
    margin: 16,
  },
  restauarantDescription: {
    fontSize: 16,
    margin: 16,
    lineHeight: 22,
    color: Colors.medium,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 40,
    margin: 16,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
  },
  dishImage: {
    height: 80,
    width: 80,
    borderRadius: 4,
  },
  dish: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dishText: {
    fontSize: 14,
    color: Colors.mediumDark,
    paddingVertical: 4,
    paddingRight: 6,
  },
  stickySegments: {
    position: "absolute",
    height: 50,
    left: 0,
    right: 0,
    top: 100,
    backgroundColor: "#fff",
    overflow: "hidden",
    paddingBottom: 4,
  },
  segmentShadow: {
    backgroundColor: "#fff",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    height: "100%",
  },
  segmentButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  segemtText: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  segmentButtonActive: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  segemtTextActive: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  segmentScrollView: {
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 20,
    paddingBottom: 4,
  },
});

export default Details;