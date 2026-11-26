import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ScreenName } from './src/types';
import { SplashScreen } from './src/screens/SplashScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { SignInScreen } from './src/screens/SignInScreen';
import { NumberScreen } from './src/screens/NumberScreen';
import { VerificationScreen } from './src/screens/VerificationScreen';
import { SelectLocationScreen } from './src/screens/SelectLocationScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { ProductCard } from './src/components/ProductCard';

type LangCode = 'kk' | 'ru' | 'en';
type TabKey = 'Shop' | 'Explore' | 'Cart' | 'Favourite' | 'Account';
type ExtraView = 'none' | 'card' | 'tabs';

interface LocalizedProductText {
  title: string;
  subtitle: string;
}

interface ProductItem {
  id: string;
  priceNum: number;
  priceText: string;
  imageUri: string;
  category: string;
  i18n: Record<LangCode, LocalizedProductText>;
}

interface CartEntry {
  product: ProductItem;
  qty: number;
}

const UI_TEXT = {
  kk: {
    location: 'Алматы, Қазақстан',
    searchPlaceholder: 'Дүкеннен іздеу...',
    bannerTitle: 'Жаңа піскен көкөністер',
    bannerSub: '40%-ға дейін жеңілдік',
    exclusiveOffer: 'Арнайы ұсыныс',
    seeAll: 'Барлығы',
    findProducts: 'Өнімдерді табу',
    categoryLabel: 'Санат',
    clearFilter: 'Тазарту',
    productsTitle: 'Өнімдер',
    myCart: 'Менің себетім',
    emptyCart: 'Себет әзірге бос',
    backToHome: 'Басты бетке оралу',
    testError: 'Error терезесін тексеру (Order Failed)',
    goToCheckout: 'Тапсырысқа өту',
    favourite: 'Таңдаулылар',
    emptyFav: 'Таңдаулы өнімдер жоқ',
    addBtn: 'Қосу',
    orders: 'Тапсырыстар',
    myDetails: 'Менің деректерім',
    deliveryAddress: 'Жеткізу мекенжайы',
    paymentMethods: 'Төлем тәсілдері',
    promoCard: 'Промо-карта',
    notifications: 'Хабарламалар',
    help: 'Көмек',
    about: 'Қосымша туралы',
    sectionOpened: 'бөлімі ашылды',
    logOut: 'Шығу',
    checkoutTitle: 'Тапсырысты рәсімдеу',
    delivery: 'Жеткізу',
    selectMethod: 'Тәсілін таңдау',
    expressDelivery: 'Жедел жеткізу',
    pickup: 'Алып кету',
    payment: 'Төлем',
    promoCode: 'Промокод',
    pickDiscount: 'Жеңілдік таңдау',
    totalCost: 'Жалпы сома',
    termsNote: 'Тапсырыс беру арқылы шарттар мен ережелерге келісесіз',
    placeOrder: 'Тапсырыс беру',
    orderAcceptedTitle: 'Тапсырысыңыз қабылданды',
    orderAcceptedSub: 'Өнімдеріңіз рәсімделді және өңделу үстінде',
    trackOrder: 'Тапсырысты қадағалау',
    orderFailedTitle: 'Қап! Тапсырыс сәтсіз аяқталды',
    orderFailedSub: 'Бірдеңе дұрыс болмай қалды.',
    tryAgain: 'Қайта көру',
    cardSample: 'Product Card үлгісі',
    addToCart: 'Корзинаға қосу',
    shopTab: 'Дүкен',
    exploreTab: 'Каталог',
    cartTab: 'Корзина',
    favTab: 'Таңдаулы',
    accountTab: 'Профиль',
    catFruitsVeg: 'Көкөніс пен жеміс',
    catOil: 'Май және сұйық май',
    catMeat: 'Ет және балық',
    catBakery: 'Наубайхана',
    catDairy: 'Сүт және жұмыртқа',
    catBeverages: 'Сусындар',
  },
  ru: {
    location: 'Алматы, Казахстан',
    searchPlaceholder: 'Поиск в магазине...',
    bannerTitle: 'Свежие овощи',
    bannerSub: 'Скидки до 40%',
    exclusiveOffer: 'Специальное предложение',
    seeAll: 'Все',
    findProducts: 'Поиск товаров',
    categoryLabel: 'Категория',
    clearFilter: 'Сбросить',
    productsTitle: 'Товары',
    myCart: 'Моя корзина',
    emptyCart: 'Корзина пока пуста',
    backToHome: 'На главную',
    testError: 'Проверить окно ошибки (Order Failed)',
    goToCheckout: 'Перейти к оформлению',
    favourite: 'Избранное',
    emptyFav: 'Нет избранных товаров',
    addBtn: 'В корзину',
    orders: 'Заказы',
    myDetails: 'Мои данные',
    deliveryAddress: 'Адрес доставки',
    paymentMethods: 'Способы оплаты',
    promoCard: 'Промокарта',
    notifications: 'Уведомления',
    help: 'Помощь',
    about: 'О приложении',
    sectionOpened: 'раздел открыт',
    logOut: 'Выйти',
    checkoutTitle: 'Оформление заказа',
    delivery: 'Доставка',
    selectMethod: 'Выберите способ',
    expressDelivery: 'Экспресс-доставка',
    pickup: 'Самовывоз',
    payment: 'Оплата',
    promoCode: 'Промокод',
    pickDiscount: 'Выбрать скидку',
    totalCost: 'Итоговая сумма',
    termsNote: 'Оформляя заказ, вы соглашаетесь с Условиями использования',
    placeOrder: 'Подтвердить заказ',
    orderAcceptedTitle: 'Ваш заказ принят',
    orderAcceptedSub: 'Ваши товары оформлены и уже переданы в обработку',
    trackOrder: 'Отследить заказ',
    orderFailedTitle: 'Ой! Ошибка заказа',
    orderFailedSub: 'Что-то пошло не так.',
    tryAgain: 'Попробовать снова',
    cardSample: 'Пример Product Card',
    addToCart: 'В корзину',
    shopTab: 'Магазин',
    exploreTab: 'Каталог',
    cartTab: 'Корзина',
    favTab: 'Избранное',
    accountTab: 'Профиль',
    catFruitsVeg: 'Овощи и фрукты',
    catOil: 'Масла и жиры',
    catMeat: 'Мясо и рыба',
    catBakery: 'Выпечка и снеки',
    catDairy: 'Молоко и яйца',
    catBeverages: 'Напитки',
  },
  en: {
    location: 'Almaty, Kazakhstan',
    searchPlaceholder: 'Search Store',
    bannerTitle: 'Fresh Vegetables',
    bannerSub: 'Get Up To 40% OFF',
    exclusiveOffer: 'Exclusive Offer',
    seeAll: 'See all',
    findProducts: 'Find Products',
    categoryLabel: 'Category',
    clearFilter: 'Clear',
    productsTitle: 'Products',
    myCart: 'My Cart',
    emptyCart: 'Your cart is empty',
    backToHome: 'Back to home',
    testError: 'Test Error modal (Order Failed)',
    goToCheckout: 'Go to Checkout',
    favourite: 'Favourite',
    emptyFav: 'No favourite items yet',
    addBtn: 'Add',
    orders: 'Orders',
    myDetails: 'My Details',
    deliveryAddress: 'Delivery Address',
    paymentMethods: 'Payment Methods',
    promoCard: 'Promo Card',
    notifications: 'Notifications',
    help: 'Help',
    about: 'About',
    sectionOpened: 'section opened',
    logOut: 'Log Out',
    checkoutTitle: 'Checkout',
    delivery: 'Delivery',
    selectMethod: 'Select Method',
    expressDelivery: 'Express Delivery',
    pickup: 'Pickup',
    payment: 'Payment',
    promoCode: 'Promo Code',
    pickDiscount: 'Pick discount',
    totalCost: 'Total Cost',
    termsNote: 'By placing an order you agree to our Terms And Conditions',
    placeOrder: 'Place Order',
    orderAcceptedTitle: 'Your Order has been accepted',
    orderAcceptedSub: "Your items has been placed and is on it's way to being processed",
    trackOrder: 'Track Order',
    orderFailedTitle: 'Oops! Order Failed',
    orderFailedSub: 'Something went terribly wrong.',
    tryAgain: 'Please Try Again',
    cardSample: 'Product Card Sample',
    addToCart: 'Add to Cart',
    shopTab: 'Shop',
    exploreTab: 'Explore',
    cartTab: 'Cart',
    favTab: 'Favourite',
    accountTab: 'Account',
    catFruitsVeg: 'Fresh Fruits & Veg',
    catOil: 'Cooking Oil & Ghee',
    catMeat: 'Meat & Fish',
    catBakery: 'Bakery & Snacks',
    catDairy: 'Dairy & Eggs',
    catBeverages: 'Beverages',
  },
} as const;

const PRODUCTS: ProductItem[] = [
  {
    id: '1',
    priceNum: 4.99,
    priceText: '$4.99',
    imageUri: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
    category: 'Fruits',
    i18n: {
      kk: { title: 'Органикалық банан', subtitle: '7 дана, Бағасы' },
      ru: { title: 'Органические бананы', subtitle: '7 шт., Цена' },
      en: { title: 'Organic Bananas', subtitle: '7pcs, Priceg' },
    },
  },
  {
    id: '2',
    priceNum: 4.99,
    priceText: '$4.99',
    imageUri: 'https://images.unsplash.com/photo-1567306226416-28f0ebce88ce?w=400',
    category: 'Fruits',
    i18n: {
      kk: { title: 'Қызыл алма', subtitle: '1 кг, Бағасы' },
      ru: { title: 'Красное яблоко', subtitle: '1 кг, Цена' },
      en: { title: 'Red Apple', subtitle: '1kg, Priceg' },
    },
  },
  {
    id: '3',
    priceNum: 4.99,
    priceText: '$4.99',
    imageUri: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400',
    category: 'Vegetables',
    i18n: {
      kk: { title: 'Қызыл болгар бұрышы', subtitle: '1 кг, Бағасы' },
      ru: { title: 'Красный сладкий перец', subtitle: '1 кг, Цена' },
      en: { title: 'Bell Pepper Red', subtitle: '1kg, Priceg' },
    },
  },
  {
    id: '4',
    priceNum: 1.99,
    priceText: '$1.99',
    imageUri: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400',
    category: 'Dairy & Eggs',
    i18n: {
      kk: { title: 'Ауыл жұмыртқасы', subtitle: '4 дана, Бағасы' },
      ru: { title: 'Куриные яйца', subtitle: '4 шт., Цена' },
      en: { title: 'Egg Chicken Red', subtitle: '4pcs, Priceg' },
    },
  },
  {
    id: '5',
    priceNum: 1.5,
    priceText: '$1.50',
    imageUri: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400',
    category: 'Beverages',
    i18n: {
      kk: { title: 'Спрайт сусыны', subtitle: '325 мл, Бағасы' },
      ru: { title: 'Напиток Sprite', subtitle: '325 мл, Цена' },
      en: { title: 'Sprite Can', subtitle: '325ml, Price' },
    },
  },
  {
    id: '6',
    priceNum: 4.99,
    priceText: '$4.99',
    imageUri: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400',
    category: 'Vegetables',
    i18n: {
      kk: { title: 'Зімбір тамыры', subtitle: '250 г, Бағасы' },
      ru: { title: 'Корень имбиря', subtitle: '250 г, Цена' },
      en: { title: 'Ginger', subtitle: '250gm, Priceg' },
    },
  },
];

const SCREENS: { key: ScreenName; label: string }[] = [
  { key: 'splash', label: 'Splash' },
  { key: 'onboarding', label: 'Onboard' },
  { key: 'signin', label: 'Sign In' },
  { key: 'number', label: 'Number' },
  { key: 'verification', label: 'Verify' },
  { key: 'location', label: 'Location' },
  { key: 'login', label: 'Log In' },
  { key: 'signup', label: 'Sign Up' },
];

const LANGS: { code: LangCode; label: string }[] = [
  { code: 'kk', label: 'ҚАЗ' },
  { code: 'ru', label: 'РУС' },
  { code: 'en', label: 'ENG' },
];

export default function App() {
  const [lang, setLang] = useState<LangCode>('kk');
  const t = UI_TEXT[lang];

  const getProductLabel = (item: ProductItem) => item.i18n[lang] ?? item.i18n.en;

  const [currentScreen, setCurrentScreen] = useState<ScreenName>('splash');
  const [phone, setPhone] = useState('+880');
  const [extraView, setExtraView] = useState<ExtraView>('tabs');
  const [activeTab, setActiveTab] = useState<TabKey>('Shop');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<string, CartEntry>>({
    '3': { product: PRODUCTS[2], qty: 1 },
    '4': { product: PRODUCTS[3], qty: 1 },
  });
  const [favourites, setFavourites] = useState<string[]>(['5']);

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [deliveryIndex, setDeliveryIndex] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'none' | 'accepted' | 'error'>('none');
  const [simulateError, setSimulateError] = useState(false);
  const [accountInfo, setAccountInfo] = useState<string | null>(null);

  const deliveryOptions = [t.selectMethod, t.expressDelivery, t.pickup];
  const categories = [
    { key: 'Fresh Fruits & Veg', title: t.catFruitsVeg, bg: '#E8F5EC', border: '#53B175' },
    { key: 'Cooking Oil & Ghee', title: t.catOil, bg: '#FFF4E5', border: '#F8A44C' },
    { key: 'Meat & Fish', title: t.catMeat, bg: '#FDECEC', border: '#F7A593' },
    { key: 'Bakery & Snacks', title: t.catBakery, bg: '#F3ECFA', border: '#D3B0E0' },
    { key: 'Dairy & Eggs', title: t.catDairy, bg: '#FFFBE6', border: '#FDE598' },
    { key: 'Beverages', title: t.catBeverages, bg: '#EAF4FE', border: '#B7DFF5' },
  ];

  const tabs: { key: TabKey; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { key: 'Shop', label: t.shopTab, icon: 'storefront-outline' },
    { key: 'Explore', label: t.exploreTab, icon: 'search-outline' },
    { key: 'Cart', label: t.cartTab, icon: 'cart-outline' },
    { key: 'Favourite', label: t.favTab, icon: 'heart-outline' },
    { key: 'Account', label: t.accountTab, icon: 'person-outline' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen((prev) => (prev === 'splash' ? 'onboarding' : prev));
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const openTabsAt = (tab: TabKey) => {
    setExtraView('tabs');
    setActiveTab(tab);
  };

  const addToCart = (product: ProductItem) => {
    setCart((prev) => {
      const existing = prev[product.id];
      return {
        ...prev,
        [product.id]: {
          product,
          qty: existing ? existing.qty + 1 : 1,
        },
      };
    });
  };

  const changeQty = (productId: string, delta: number) => {
    setCart((prev) => {
      const existing = prev[productId];
      if (!existing) return prev;
      const nextQty = existing.qty + delta;
      const copy = { ...prev };
      if (nextQty <= 0) {
        delete copy[productId];
      } else {
        copy[productId] = { ...existing, qty: nextQty };
      }
      return copy;
    });
  };

  const toggleFavourite = (productId: string) => {
    setFavourites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const totalCartItems = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const subtotalPrice = Object.values(cart).reduce(
    (sum, item) => sum + item.qty * item.product.priceNum,
    0
  );
  const discountValue = promoApplied ? 1.0 : 0;
  const finalTotalCost = Math.max(0, subtotalPrice - discountValue);

  const visibleProducts = PRODUCTS.filter((item) => {
    const q = searchQuery.trim().toLowerCase();
    const localized = getProductLabel(item);
    const matchesQuery =
      !q ||
      localized.title.toLowerCase().includes(q) ||
      item.i18n.kk.title.toLowerCase().includes(q) ||
      item.i18n.ru.title.toLowerCase().includes(q) ||
      item.i18n.en.title.toLowerCase().includes(q);

    if (!selectedCategory) return matchesQuery;
    if (selectedCategory === 'Fresh Fruits & Veg') {
      return matchesQuery && (item.category === 'Fruits' || item.category === 'Vegetables');
    }
    return matchesQuery && item.category.toLowerCase().includes(selectedCategory.toLowerCase().split(' ')[0]);
  });

  const favouriteProducts = PRODUCTS.filter((item) => favourites.includes(item.id));

  const handlePlaceOrder = () => {
    setCheckoutOpen(false);
    if (simulateError || finalTotalCost === 0) {
      setOrderStatus('error');
    } else {
      setCart({});
      setOrderStatus('accepted');
    }
  };

  const renderAuthFlow = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onNext={() => setCurrentScreen('onboarding')} />;
      case 'onboarding':
        return <OnboardingScreen onGetStarted={() => setCurrentScreen('signin')} />;
      case 'signin':
        return (
          <SignInScreen
            phone={phone}
            onPressPhone={() => setCurrentScreen('number')}
            onSocialSuccess={() => setCurrentScreen('location')}
            onGoLogin={() => setCurrentScreen('login')}
          />
        );
      case 'number':
        return (
          <NumberScreen
            phone={phone}
            onChangePhone={setPhone}
            onBack={() => setCurrentScreen('signin')}
            onNext={() => setCurrentScreen('verification')}
          />
        );
      case 'verification':
        return (
          <VerificationScreen
            onBack={() => setCurrentScreen('number')}
            onNext={() => setCurrentScreen('location')}
          />
        );
      case 'location':
        return (
          <SelectLocationScreen
            onBack={() => setCurrentScreen('verification')}
            onSubmit={() => setCurrentScreen('login')}
          />
        );
      case 'login':
        return (
          <LoginScreen
            onGoSignUp={() => setCurrentScreen('signup')}
            onSuccess={() => openTabsAt('Shop')}
          />
        );
      case 'signup':
        return (
          <SignUpScreen
            onGoLogin={() => setCurrentScreen('login')}
            onSuccess={() => openTabsAt('Shop')}
          />
        );
      default:
        return null;
    }
  };

  const renderProductGrid = (items: ProductItem[], showFavIcon: boolean) => (
    <View style={styles.cardsGrid}>
      {items.map((item) => {
        const label = getProductLabel(item);
        const isFav = favourites.includes(item.id);
        return (
          <View key={item.id} style={styles.productCardBox}>
            {showFavIcon && (
              <TouchableOpacity
                style={styles.favCornerBtn}
                onPress={() => toggleFavourite(item.id)}
              >
                <Ionicons
                  name={isFav ? 'heart' : 'heart-outline'}
                  size={18}
                  color={isFav ? '#EB5757' : '#7C7C7C'}
                />
              </TouchableOpacity>
            )}
            <Image source={{ uri: item.imageUri }} style={styles.productThumb} />
            <Text style={styles.productName} numberOfLines={1}>
              {label.title}
            </Text>
            <Text style={styles.productSub}>{label.subtitle}</Text>
            <View style={styles.productBottomRow}>
              <Text style={styles.productPrice}>{item.priceText}</Text>
              <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
                <Ionicons name="add" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );

  const renderShopTab = () => (
    <ScrollView style={styles.tabScroll} contentContainerStyle={styles.tabContent}>
      <View style={styles.shopTopHeader}>
        <Ionicons name="nutrition" size={28} color="#53B175" />
        <View style={styles.locationRow}>
          <Ionicons name="location" size={16} color="#4C4F4D" />
          <Text style={styles.locationText}>{t.location}</Text>
        </View>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder={t.searchPlaceholder}
        placeholderTextColor="#7C7C7C"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.bannerCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>{t.bannerTitle}</Text>
          <Text style={styles.bannerSub}>{t.bannerSub}</Text>
        </View>
        <Ionicons name="leaf" size={44} color="#53B175" />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t.exclusiveOffer}</Text>
        <TouchableOpacity onPress={() => openTabsAt('Explore')}>
          <Text style={styles.seeAllText}>{t.seeAll}</Text>
        </TouchableOpacity>
      </View>

      {renderProductGrid(visibleProducts, true)}
    </ScrollView>
  );

  const renderExploreTab = () => {
    const activeCatObj = categories.find((c) => c.key === selectedCategory);
    return (
      <ScrollView style={styles.tabScroll} contentContainerStyle={styles.tabContent}>
        <Text style={styles.centeredPageTitle}>{t.findProducts}</Text>
        <TextInput
          style={styles.searchInput}
          placeholder={t.searchPlaceholder}
          placeholderTextColor="#7C7C7C"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {activeCatObj && (
          <View style={styles.activeFilterRow}>
            <Text style={styles.activeFilterText}>
              {t.categoryLabel}: {activeCatObj.title}
            </Text>
            <TouchableOpacity onPress={() => setSelectedCategory(null)}>
              <Text style={styles.clearFilterText}>{t.clearFilter}</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.categoryGrid}>
          {categories.map((cat) => {
            const active = selectedCategory === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.categoryTile,
                  { backgroundColor: cat.bg, borderColor: active ? '#53B175' : cat.border },
                ]}
                onPress={() => setSelectedCategory(active ? null : cat.key)}
              >
                <Text style={styles.categoryTileText}>{cat.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>{t.productsTitle}</Text>
        {renderProductGrid(visibleProducts, false)}
      </ScrollView>
    );
  };

  const renderCartTab = () => {
    const entries = Object.values(cart);
    return (
      <View style={styles.tabFlex}>
        <Text style={styles.centeredPageTitle}>{t.myCart}</Text>

        {entries.length === 0 ? (
          <View style={styles.centerEmpty}>
            <Ionicons name="cart-outline" size={48} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>{t.emptyCart}</Text>
            <TouchableOpacity style={styles.primaryGreenBtn} onPress={() => openTabsAt('Shop')}>
              <Text style={styles.primaryGreenBtnText}>{t.backToHome}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <FlatList
              data={entries}
              keyExtractor={(entry) => entry.product.id}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 12, paddingBottom: 16 }}
              renderItem={({ item }) => {
                const label = getProductLabel(item.product);
                return (
                  <View style={styles.cartItemCard}>
                    <Image source={{ uri: item.product.imageUri }} style={styles.cartItemImg} />
                    <View style={{ flex: 1 }}>
                      <View style={styles.cartItemTop}>
                        <Text style={styles.productName}>{label.title}</Text>
                        <TouchableOpacity onPress={() => changeQty(item.product.id, -item.qty)}>
                          <Ionicons name="close" size={18} color="#7C7C7C" />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.productSub}>{label.subtitle}</Text>
                      <View style={styles.cartItemBottom}>
                        <View style={styles.qtyRow}>
                          <TouchableOpacity
                            style={styles.qtySquare}
                            onPress={() => changeQty(item.product.id, -1)}
                          >
                            <Text style={styles.qtySign}>-</Text>
                          </TouchableOpacity>
                          <Text style={styles.qtyNum}>{item.qty}</Text>
                          <TouchableOpacity
                            style={styles.qtySquare}
                            onPress={() => changeQty(item.product.id, 1)}
                          >
                            <Text style={[styles.qtySign, { color: '#53B175' }]}>+</Text>
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.productPrice}>
                          ${(item.product.priceNum * item.qty).toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />

            <View style={styles.cartFooter}>
              <TouchableOpacity
                style={styles.errorToggleRow}
                onPress={() => setSimulateError((v) => !v)}
              >
                <Ionicons
                  name={simulateError ? 'checkbox' : 'square-outline'}
                  size={18}
                  color="#53B175"
                />
                <Text style={styles.errorToggleText}>{t.testError}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkoutBarBtn}
                onPress={() => setCheckoutOpen(true)}
              >
                <Text style={styles.primaryGreenBtnText}>{t.goToCheckout}</Text>
                <View style={styles.totalPill}>
                  <Text style={styles.totalPillText}>${subtotalPrice.toFixed(2)}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };

  const renderFavouriteTab = () => (
    <View style={styles.tabFlex}>
      <Text style={styles.centeredPageTitle}>{t.favourite}</Text>
      {favouriteProducts.length === 0 ? (
        <View style={styles.centerEmpty}>
          <Ionicons name="heart-outline" size={48} color="#9CA3AF" />
          <Text style={styles.emptyTitle}>{t.emptyFav}</Text>
          <TouchableOpacity style={styles.primaryGreenBtn} onPress={() => openTabsAt('Shop')}>
            <Text style={styles.primaryGreenBtnText}>{t.backToHome}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favouriteProducts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 10, paddingBottom: 24 }}
          renderItem={({ item }) => {
            const label = getProductLabel(item);
            return (
              <View style={styles.favListRow}>
                <Image source={{ uri: item.imageUri }} style={styles.cartItemImg} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.productName}>{label.title}</Text>
                  <Text style={styles.productSub}>{label.subtitle}</Text>
                </View>
                <Text style={styles.productPrice}>{item.priceText}</Text>
                <TouchableOpacity
                  style={styles.miniAddBtn}
                  onPress={() => {
                    addToCart(item);
                    openTabsAt('Cart');
                  }}
                >
                  <Text style={styles.miniAddText}>{t.addBtn}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </View>
  );

  const renderAccountTab = () => {
    const menuItems: { label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
      { label: t.orders, icon: 'bag-handle-outline' },
      { label: t.myDetails, icon: 'card-outline' },
      { label: t.deliveryAddress, icon: 'location-outline' },
      { label: t.paymentMethods, icon: 'wallet-outline' },
      { label: t.promoCard, icon: 'pricetag-outline' },
      { label: t.notifications, icon: 'notifications-outline' },
      { label: t.help, icon: 'help-circle-outline' },
      { label: t.about, icon: 'information-circle-outline' },
    ];

    return (
      <ScrollView style={styles.tabScroll} contentContainerStyle={styles.accountContent}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={28} color="#53B175" />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.nameEditRow}>
              <Text style={styles.profileName}>Afsar Hossen</Text>
              <Ionicons name="pencil" size={15} color="#53B175" />
            </View>
            <Text style={styles.profileEmail}>Imshuvo97@gmail.com</Text>
          </View>
        </View>

        <View style={styles.menuList}>
          {menuItems.map((m) => (
            <TouchableOpacity
              key={m.label}
              style={styles.menuRow}
              onPress={() => setAccountInfo(`${m.label} — ${t.sectionOpened}`)}
            >
              <View style={styles.menuLeft}>
                <Ionicons name={m.icon} size={20} color="#181725" />
                <Text style={styles.menuLabel}>{m.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#181725" />
            </TouchableOpacity>
          ))}
        </View>

        {accountInfo && (
          <View style={styles.infoBanner}>
            <Text style={styles.infoBannerText}>{accountInfo}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => {
            setExtraView('none');
            setCurrentScreen('login');
          }}
        >
          <Ionicons name="log-out-outline" size={20} color="#53B175" />
          <Text style={styles.logoutText}>{t.logOut}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Shop':
        return renderShopTab();
      case 'Explore':
        return renderExploreTab();
      case 'Cart':
        return renderCartTab();
      case 'Favourite':
        return renderFavouriteTab();
      case 'Account':
        return renderAccountTab();
      default:
        return renderShopTab();
    }
  };

  const renderBody = () => {
    if (extraView === 'tabs') {
      return (
        <View style={styles.tabFlex}>
          <View style={styles.tabFlex}>{renderActiveTab()}</View>

          <View style={styles.bottomTabBar}>
            {tabs.map((tabItem) => {
              const isSelected = activeTab === tabItem.key;
              const color = isSelected ? '#53B175' : '#181725';
              return (
                <TouchableOpacity
                  key={tabItem.key}
                  style={styles.bottomTabItem}
                  onPress={() => setActiveTab(tabItem.key)}
                >
                  <Ionicons name={tabItem.icon} size={22} color={color} />
                  <Text style={[styles.bottomTabLabel, { color }]}>
                    {tabItem.key === 'Cart' && totalCartItems > 0
                      ? `${tabItem.label} (${totalCartItems})`
                      : tabItem.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      );
    }

    if (extraView === 'card') {
      const sampleLabel = getProductLabel(PRODUCTS[0]);
      return (
        <View style={styles.cardDemoContainer}>
          <Text style={styles.cardDemoTitle}>{t.cardSample}</Text>
          <ProductCard
            title={sampleLabel.title}
            subtitle={sampleLabel.subtitle}
            price={PRODUCTS[0].priceText}
            imageUri={PRODUCTS[0].imageUri}
          />
          <View style={styles.rowGap}>
            <TouchableOpacity
              style={styles.primaryGreenBtn}
              onPress={() => {
                addToCart(PRODUCTS[0]);
                openTabsAt('Cart');
              }}
            >
              <Text style={styles.primaryGreenBtnText}>{t.addToCart}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.grayBtn} onPress={() => openTabsAt('Shop')}>
              <Text style={styles.grayBtnText}>{t.shopTab}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return <View style={styles.tabFlex}>{renderAuthFlow()}</View>;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.devBar}>
          {SCREENS.map((item) => {
            const active = extraView === 'none' && currentScreen === item.key;
            return (
              <TouchableOpacity
                key={item.key}
                style={[styles.devPill, active && styles.devPillActive]}
                onPress={() => {
                  setExtraView('none');
                  setCurrentScreen(item.key);
                }}
              >
                <Text style={[styles.devPillText, active && styles.devPillTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={[styles.devPill, extraView === 'card' && styles.devPillActive]}
            onPress={() => setExtraView('card')}
          >
            <Text style={[styles.devPillText, extraView === 'card' && styles.devPillTextActive]}>
              Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.devPill, extraView === 'tabs' && styles.devPillActive]}
            onPress={() => openTabsAt('Shop')}
          >
            <Text style={[styles.devPillText, extraView === 'tabs' && styles.devPillTextActive]}>
              App Tabs
            </Text>
          </TouchableOpacity>

          <View style={styles.langGroup}>
            {LANGS.map((l) => {
              const isLangActive = lang === l.code;
              return (
                <TouchableOpacity
                  key={l.code}
                  style={[styles.langPill, isLangActive && styles.langPillActive]}
                  onPress={() => setLang(l.code)}
                >
                  <Text style={[styles.langPillText, isLangActive && styles.langPillTextActive]}>
                    {l.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.contentLift}>{renderBody()}</View>

        <Modal
          visible={checkoutOpen}
          transparent
          animationType="slide"
          onRequestClose={() => setCheckoutOpen(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.checkoutSheet}>
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>{t.checkoutTitle}</Text>
                <TouchableOpacity onPress={() => setCheckoutOpen(false)}>
                  <Ionicons name="close" size={22} color="#181725" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.sheetRow}
                onPress={() => setDeliveryIndex((prev) => (prev + 1) % deliveryOptions.length)}
              >
                <Text style={styles.sheetLabel}>{t.delivery}</Text>
                <View style={styles.sheetValueRight}>
                  <Text style={styles.sheetValue}>{deliveryOptions[deliveryIndex]}</Text>
                  <Ionicons name="chevron-forward" size={18} color="#181725" />
                </View>
              </TouchableOpacity>

              <View style={styles.sheetRow}>
                <Text style={styles.sheetLabel}>{t.payment}</Text>
                <View style={styles.sheetValueRight}>
                  <Ionicons name="card" size={18} color="#3B82F6" />
                  <Ionicons name="chevron-forward" size={18} color="#181725" />
                </View>
              </View>

              <TouchableOpacity
                style={styles.sheetRow}
                onPress={() => setPromoApplied((prev) => !prev)}
              >
                <Text style={styles.sheetLabel}>{t.promoCode}</Text>
                <View style={styles.sheetValueRight}>
                  <Text style={styles.sheetValue}>
                    {promoApplied ? 'NECTAR10 (-$1.00)' : t.pickDiscount}
                  </Text>
                  <Ionicons name="chevron-forward" size={18} color="#181725" />
                </View>
              </TouchableOpacity>

              <View style={styles.sheetRow}>
                <Text style={styles.sheetLabel}>{t.totalCost}</Text>
                <View style={styles.sheetValueRight}>
                  <Text style={styles.sheetTotal}>${finalTotalCost.toFixed(2)}</Text>
                  <Ionicons name="chevron-forward" size={18} color="#181725" />
                </View>
              </View>

              <Text style={styles.termsNote}>{t.termsNote}</Text>

              <TouchableOpacity style={styles.primaryGreenBtn} onPress={handlePlaceOrder}>
                <Text style={styles.primaryGreenBtnText}>{t.placeOrder}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          visible={orderStatus === 'accepted'}
          animationType="fade"
          onRequestClose={() => setOrderStatus('none')}
        >
          <View style={styles.statusScreen}>
            <View style={styles.successCircle}>
              <Ionicons name="checkmark" size={54} color="#FFFFFF" />
            </View>
            <Text style={styles.statusTitle}>{t.orderAcceptedTitle}</Text>
            <Text style={styles.statusSub}>{t.orderAcceptedSub}</Text>

            <TouchableOpacity
              style={[styles.primaryGreenBtn, styles.fullWidthBtn]}
              onPress={() => {
                setOrderStatus('none');
                openTabsAt('Account');
              }}
            >
              <Text style={styles.primaryGreenBtnText}>{t.trackOrder}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: 14 }}
              onPress={() => {
                setOrderStatus('none');
                openTabsAt('Shop');
              }}
            >
              <Text style={styles.backToHomeLink}>{t.backToHome}</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          visible={orderStatus === 'error'}
          transparent
          animationType="fade"
          onRequestClose={() => setOrderStatus('none')}
        >
          <View style={styles.errorBackdrop}>
            <View style={styles.errorCard}>
              <TouchableOpacity
                style={styles.errorCloseBtn}
                onPress={() => setOrderStatus('none')}
              >
                <Ionicons name="close" size={22} color="#181725" />
              </TouchableOpacity>

              <View style={styles.bagBadge}>
                <Ionicons name="bag-handle" size={44} color="#53B175" />
              </View>

              <Text style={styles.statusTitle}>{t.orderFailedTitle}</Text>
              <Text style={styles.statusSub}>{t.orderFailedSub}</Text>

              <TouchableOpacity
                style={[styles.primaryGreenBtn, styles.fullWidthBtn]}
                onPress={() => {
                  setSimulateError(false);
                  setOrderStatus('none');
                  setCheckoutOpen(true);
                }}
              >
                <Text style={styles.primaryGreenBtnText}>{t.tryAgain}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginTop: 14 }}
                onPress={() => {
                  setOrderStatus('none');
                  openTabsAt('Shop');
                }}
              >
                <Text style={styles.backToHomeLink}>{t.backToHome}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  devBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 6,
    backgroundColor: '#F3F4F6',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  devPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  devPillActive: { backgroundColor: '#53B175' },
  devPillText: { fontSize: 11, color: '#374151', fontWeight: '500' },
  devPillTextActive: { color: '#FFFFFF' },
  langGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 'auto',
  },
  langPill: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  langPillActive: {
    backgroundColor: '#181725',
  },
  langPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#181725',
  },
  langPillTextActive: {
    color: '#FFFFFF',
  },
  contentLift: { flex: 1, marginTop: -2 },
  tabFlex: { flex: 1 },
  tabScroll: { flex: 1, backgroundColor: '#FFFFFF' },
  tabContent: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 24 },
  shopTopHeader: { alignItems: 'center', marginBottom: 10, gap: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { fontSize: 15, fontWeight: '600', color: '#4C4F4D' },
  centeredPageTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#181725',
    textAlign: 'center',
    paddingVertical: 12,
  },
  searchInput: {
    backgroundColor: '#F2F3F2',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: '#181725',
    marginBottom: 14,
  },
  bannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EAF7EE',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  bannerTitle: { fontSize: 18, fontWeight: '700', color: '#181725' },
  bannerSub: { fontSize: 13, color: '#53B175', fontWeight: '600', marginTop: 4 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#181725', marginBottom: 10 },
  seeAllText: { fontSize: 14, fontWeight: '600', color: '#53B175' },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  productCardBox: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 12,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  favCornerBtn: { position: 'absolute', top: 8, right: 8, zIndex: 2, padding: 4 },
  productThumb: {
    width: '100%',
    height: 92,
    borderRadius: 12,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  productName: { fontSize: 15, fontWeight: '700', color: '#181725' },
  productSub: { fontSize: 12, color: '#7C7C7C', marginTop: 2 },
  productBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  productPrice: { fontSize: 16, fontWeight: '700', color: '#181725' },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 13,
    backgroundColor: '#53B175',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeFilterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  activeFilterText: { fontSize: 13, fontWeight: '600', color: '#181725' },
  clearFilterText: { fontSize: 13, fontWeight: '600', color: '#53B175' },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 16,
  },
  categoryTile: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTileText: { fontSize: 14, fontWeight: '700', color: '#181725', textAlign: 'center' },
  cartItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  cartItemImg: { width: 62, height: 62, borderRadius: 10, resizeMode: 'cover' },
  cartItemTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cartItemBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtySquare: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtySign: { fontSize: 18, fontWeight: '700', color: '#7C7C7C' },
  qtyNum: { fontSize: 15, fontWeight: '700', color: '#181725' },
  cartFooter: { padding: 16, gap: 10 },
  errorToggleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  errorToggleText: { fontSize: 12, color: '#4C4F4D' },
  checkoutBarBtn: {
    backgroundColor: '#53B175',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  totalPill: {
    position: 'absolute',
    right: 14,
    backgroundColor: '#489E67',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  totalPillText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  favListRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  miniAddBtn: {
    backgroundColor: '#53B175',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  miniAddText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
  accountContent: { paddingBottom: 28 },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  avatarCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#EAF7EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameEditRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  profileName: { fontSize: 18, fontWeight: '700', color: '#181725' },
  profileEmail: { fontSize: 13, color: '#7C7C7C', marginTop: 2 },
  menuList: { marginBottom: 16 },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  menuLabel: { fontSize: 16, fontWeight: '600', color: '#181725' },
  infoBanner: {
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#EAF7EE',
  },
  infoBannerText: { color: '#181725', fontSize: 13, fontWeight: '600' },
  logoutBtn: {
    marginHorizontal: 16,
    backgroundColor: '#F2F3F2',
    borderRadius: 16,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoutText: { fontSize: 16, fontWeight: '700', color: '#53B175' },
  bottomTabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderTopWidth: 1,
    borderColor: '#ECECEC',
    elevation: 8,
  },
  bottomTabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3 },
  bottomTabLabel: { fontSize: 11, fontWeight: '600' },
  primaryGreenBtn: {
    backgroundColor: '#53B175',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryGreenBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  grayBtn: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grayBtnText: { color: '#181725', fontWeight: '600', fontSize: 14 },
  rowGap: { flexDirection: 'row', gap: 10 },
  centerEmpty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14, padding: 20 },
  emptyTitle: { fontSize: 16, color: '#7C7C7C', fontWeight: '600' },
  cardDemoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    gap: 16,
    paddingHorizontal: 16,
  },
  cardDemoTitle: { fontSize: 18, fontWeight: '700', color: '#181725' },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  checkoutSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    gap: 14,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sheetTitle: { fontSize: 20, fontWeight: '700', color: '#181725' },
  sheetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sheetLabel: { fontSize: 16, fontWeight: '600', color: '#7C7C7C' },
  sheetValueRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sheetValue: { fontSize: 14, fontWeight: '700', color: '#181725' },
  sheetTotal: { fontSize: 15, fontWeight: '700', color: '#181725' },
  termsNote: { fontSize: 12, color: '#7C7C7C', lineHeight: 17 },
  statusScreen: {
    flex: 1,
    backgroundColor: '#F7FAF8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  successCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#53B175',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#181725',
    textAlign: 'center',
    marginBottom: 10,
  },
  statusSub: {
    fontSize: 14,
    color: '#7C7C7C',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 20,
  },
  fullWidthBtn: { width: '100%' },
  backToHomeLink: { fontSize: 16, fontWeight: '600', color: '#181725' },
  errorBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  errorCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    position: 'relative',
  },
  errorCloseBtn: { position: 'absolute', top: 16, left: 16, padding: 4 },
  bagBadge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EAF7EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
});