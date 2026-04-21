import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/theme';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: '1', name: 'Books', icon: 'book-open-page-variant', color: '#FF6B6B' },
  { id: '2', name: 'Tablets', icon: 'tablet-android', color: '#4D96FF' },
  { id: '3', name: 'Stationery', icon: 'pencil-ruler', color: '#6BCB77' },
  { id: '4', name: 'Courses', icon: 'play-box-multiple', color: '#FF9F43' },
  { id: '5', name: 'Merch', icon: 'tshirt-crew', color: '#9B51E0' },
];

const PRODUCTS = [
  {
    id: '1',
    name: 'Physics Wallah: Concept of Physics Vol 1',
    price: 450,
    originalPrice: 600,
    discount: '25% OFF',
    rating: 4.8,
    reviews: 1240,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&auto=format&fit=crop&q=60',
    tag: 'Bestseller',
  },
  {
    id: '2',
    name: 'PW Smart Tablet for Learning',
    price: 12999,
    originalPrice: 15999,
    discount: '18% OFF',
    rating: 4.9,
    reviews: 856,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&auto=format&fit=crop&q=60',
    tag: 'New Launch',
  },
  {
    id: '3',
    name: 'PW Fountain Pen: Limited Edition',
    price: 199,
    originalPrice: 249,
    discount: '20% OFF',
    rating: 4.5,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&auto=format&fit=crop&q=60',
    tag: 'Popular',
  },
  {
    id: '4',
    name: 'Mathematics Mastery Workbook',
    price: 350,
    originalPrice: 450,
    discount: '22% OFF',
    rating: 4.7,
    reviews: 540,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&auto=format&fit=crop&q=60',
    tag: 'Recommended',
  },
];

const StoreScreen = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');

  const renderCategory = ({ item }: any) => (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={[styles.categoryIcon, { backgroundColor: item.color + '15' }]}>
        <Icon name={item.icon} size={28} color={item.color} />
      </View>
      <Text style={[styles.categoryName, { color: theme.textSecondary }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }: any) => (
    <TouchableOpacity style={[styles.productCard, { backgroundColor: theme.surface, shadowColor: theme.black }]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={[styles.tagBadge, { backgroundColor: theme.primary }]}>
          <Text style={styles.tagText}>{item.tag}</Text>
        </View>
        <TouchableOpacity style={styles.wishlistBtn}>
          <Icon name="heart-outline" size={20} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: theme.text }]} numberOfLines={2}>{item.name}</Text>
        <View style={styles.ratingRow}>
          <Icon name="star" size={14} color="#FFD700" />
          <Text style={[styles.ratingText, { color: theme.textSecondary }]}>{item.rating} ({item.reviews})</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={[styles.priceText, { color: theme.primary }]}>₹{item.price}</Text>
          <Text style={[styles.originalPriceText, { color: theme.textSecondary }]}>₹{item.originalPrice}</Text>
        </View>
        <Text style={styles.discountText}>{item.discount}</Text>
        <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.primary }]}>
          <Text style={styles.addBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.background === '#ffffff' ? 'dark-content' : 'light-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>Welcome to</Text>
            <Text style={[styles.headerTitle, { color: theme.primary }]}>PW Store</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.surface }]}>
              <Icon name="heart-outline" size={24} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.surface }]}>
              <Icon name="cart-outline" size={24} color={theme.text} />
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={[styles.searchContainer, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Icon name="magnify" size={22} color={theme.textSecondary} />
          <TextInput
            placeholder="Search for books, electronics..."
            placeholderTextColor={theme.placeholder}
            style={[styles.searchInput, { color: theme.text }]}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Banner */}
        <TouchableOpacity style={[styles.banner, { backgroundColor: theme.primary }]}>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Big Education Sale!</Text>
            <Text style={styles.bannerSubtitle}>Up to 50% OFF on all study materials</Text>
            <View style={styles.shopNowBtn}>
              <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Shop Now</Text>
            </View>
          </View>
          <View style={styles.bannerImageContainer}>
             <Icon name="fire" size={80} color="rgba(255,255,255,0.3)" />
          </View>
        </TouchableOpacity>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Categories</Text>
          <TouchableOpacity><Text style={{ color: theme.primary }}>See All</Text></TouchableOpacity>
        </View>
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />

        {/* Featured Products */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Featured Products</Text>
          <TouchableOpacity><Text style={{ color: theme.primary }}>View All</Text></TouchableOpacity>
        </View>
        <FlatList
          data={PRODUCTS}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.productList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionBtn: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    position: 'relative',
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF3B30',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  banner: {
    margin: 20,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bannerTextContainer: {
    flex: 1,
    zIndex: 1,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bannerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 15,
  },
  shopNowBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  bannerImageContainer: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryList: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 25,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
  },
  productList: {
    paddingHorizontal: 15,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - 45) / 2,
    borderRadius: 16,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageContainer: {
    height: 150,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tagBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    height: 40,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 11,
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  originalPriceText: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  discountText: {
    color: '#6BCB77',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 2,
  },
  addBtn: {
    marginTop: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default StoreScreen;
