import React, {useState} from 'react'
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';

// You can import supported modules from npm


// or any files within the Snack
import AssetExample from './components/AssetExample';
type Product = {
  id: number,
  name: string,
  price: number,
};
export default function App() {
  const products: Product[] = [
    {id: 1, name: 'Điện thoại', price: 17000000},{id: 2, name: 'Điện thoại', price: 17000000},{id: 3, name: 'Điện thoại', price: 17000000},{id: 4, name: 'Điện thoại', price: 17000000},{id: 5, name: 'Điện thoại', price: 17000000},{id: 6, name: 'Điện thoại', price: 17000000},
  ]
  
  const [cart, setCart] = useState<Product[6]>([]);
  const addToCart = ( item: Product) => {
    setCard(prev => [...prev, item]);
  };

  return (
    <View style={styles.container}>
      <h1> DANH SÁCH SẢN PHẨM </h1>
      <FlatList data = {products} keyExtractor = {item => item.id.toString()} renderItem = {({item}) => (
        <View style = {styles.item}>
        <Text style = {styles.productName}> {item.name} </Text>
        <Text style = {styles.productPrice}> {item.price.toLocaleString()} đ </Text>
        <Pressable style={styles.btnAddProduct}  onPress = {() => addToCart(item)}>Thêm vào giỏ hàng</Pressable>
        </View>
      )}/>
      <Text> Giỏ hàng ({cart.length} sản phẩm):</Text>
      {cart.map((p, idx)=>(
        <Text key={idx}> {p.name} - {p.price.toLocaleString()}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  
  productName: {
    fontWeight: 'bold',
  },
  productPrice: {
    color: '#EE0D0D',
  },
  btnAddProduct: {
    borderWidth: 2,
    backgroundColor: "#C4C4C4",
    borderRadius: 20,
    alignItems: 'center',
  },
  item:{
    padding: 5,
    borderWidth: 1,
    margin: 1,
    backgroundColor: '#FFFFFF'
  },
});
