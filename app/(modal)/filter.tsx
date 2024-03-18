import { View, Text, StyleSheet, ListRenderItem } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from 'expo-router'
import categories from '@/assets/data/filter.json'
import { Ionicons } from '@expo/vector-icons'
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface Category {
  name: string;
  count: number;
  checked?: boolean;
}

const ItemBox = () => (
  <>
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="arrow-down-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Sort</Text>
        <Ionicons name="chevron-forward" size={22} color={Colors.medium} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="fast-food-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Hygiene rating</Text>
        <Ionicons name="chevron-forward" size={22} color={Colors.medium} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="pricetag-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Offers</Text>
        <Ionicons name="chevron-forward" size={22} color={Colors.medium} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="nutrition-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Dietary</Text>
        <Ionicons name="chevron-forward" size={22} color={Colors.medium} />
      </TouchableOpacity>
    </View>
    <Text style={styles.header}>Categories</Text>
  </>
)

const Filter = () => {
  const navigation = useNavigation()
  const [items, setItems] = useState<Category[]>(categories);

  const renderItem: ListRenderItem<Category> = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.itemText}>
        {item.name} ({item.count})
      </Text>
      <BouncyCheckbox 
        isChecked={items[index].checked}
        fillColor={Colors.primary}
        unfillColor='#fff'
        disableBuiltInState
        iconStyle={{ borderColor: Colors.primary, borderRadius: 4, borderWidth: 2 }}
        innerIconStyle={{ borderColor: Colors.primary, borderRadius: 4, borderWidth: 2 }}
        onPress={() => {
          const isChecked = items[index].checked

          const updatedItems = items.map((item) => {
            if (item.name === items[index].name) {
              item.checked = !isChecked;
            }
            return item;
          })
          
          setItems(updatedItems);
        }}
      />
    </View>
  )


  return (
    <View style={styles.container}>
      <FlatList data={items} renderItem={renderItem} ListHeaderComponent={<ItemBox />} />
      <View style={{ height: 76 }} />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.fullButton} onPress={() => navigation.goBack()}>
          <Text style={styles.footerText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.lightGrey,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#fff',
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -10,
    },
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16, 
    alignItems: 'center',
    borderRadius: 8,
    
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16, 
  },
  itemContainer: {
    backgroundColor: '#fff', 
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderColor: Colors.gery,
    borderBottomWidth: 1,
  },
  itemText: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
})

export default Filter