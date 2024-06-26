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
import React, { useLayoutEffect, useRef, useState } from "react";
import ParallaxScrollView from "@/Components/ParallaxScrollView";
import Colors from "@/constants/Colors";
import { restaurant } from "@/assets/data/restaurant";
import { Link, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useBasketStore from "@/basketStore";
import { SafeAreaView } from "react-native-safe-area-context";

const Details = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const { items, total, addProduct, products, reduceProduct } =
    useBasketStore();

  const opacity = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<TouchableOpacity[]>([]);

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

  const onScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y > 350) {
      opacity.value = withTiming(1);
    } else {
      opacity.value = withTiming(0);
    }
  };

  const itemFinder = (item: any) => {
    const response = products.filter((it) => it.id == item.id);
    return response[0]?.quantity;
  };

  const renderItem: ListRenderItem<any> = ({ item, index }) => (
    <Link href={{ pathname: "/(modal)/dish", params: { id: item.id } }} asChild>
      <TouchableOpacity style={styles.item}>
        <View style={{ flex: 1 }}>
          <Text style={styles.dish}>{item.name}</Text>
          <Text style={styles.dishText}>{item.info}</Text>
          <Text style={styles.dishText}>${item.price}</Text>
          {itemFinder(item) ? (
            <TouchableOpacity activeOpacity={1} style={styles.twoButton}>
              <TouchableOpacity
                onPress={() => addProduct(item)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={35}
                  color={Colors.primary}
                />
              </TouchableOpacity>
              <Text>{itemFinder(item)}</Text>
              <TouchableOpacity
                onPress={() => reduceProduct(item)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="remove-circle-outline"
                  size={35}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addCart}
              onPress={() => addProduct(item)}
            >
              <View>
                <Text style={{ color: "#fff" }}>Add to cart</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <Image source={item.img} style={styles.dishImage} />
      </TouchableOpacity>
    </Link>
  );

  return (
    <>
      <ParallaxScrollView
        scrollEvent={onScroll}
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

      {/* sticky segments  */}

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

      {/* Footer Basket */}

      {items > 0 && (
        <View style={styles.footer}>
          <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "#fff" }}>
            <Link href="/basket" asChild>
              <TouchableOpacity style={styles.fullButton}>
                <Text style={styles.basket}>{items}</Text>
                <Text style={styles.footerText}>View Basket</Text>
                <Text style={styles.basketTotal}>
                  Total: ${total.toFixed(2)}
                </Text>
              </TouchableOpacity>
            </Link>
          </SafeAreaView>
        </View>
      )}
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
    paddingBottom: 6,
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
  addCart: {
    backgroundColor: Colors.primary,
    width: 100,
    height: 40,
    borderRadius: 5,

    justifyContent: "center",
    alignItems: "center",
  },
  twoButton: {
    height: 40,
    width: 120,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingLeft: 4,
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
  footer: {
    position: "absolute",
    backgroundColor: "#fff",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingTop: 20,
  },
  fullButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  basket: {
    color: "#fff",
    backgroundColor: "#19AA86",
    fontWeight: "bold",
    padding: 8,
    borderRadius: 2,
  },
  basketTotal: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Details;
