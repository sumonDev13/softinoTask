import { useState, useEffect } from 'react';

const useCart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      return cart.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0);
    };
    setTotalPrice(calculateTotal());
  }, [cart]);

  const addToCart = (item, quantity, selectedSize) => {
    if (!quantity) {
      alert('Please select quantity');
      return;
    }

    const itemPrice = selectedSize.price;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.color === item.color && 
          cartItem.size === selectedSize.size
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        const existingItem = updatedCart[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;
        
        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          totalItemPrice: newQuantity * itemPrice,
        };
        
        return updatedCart;
      }

      const newItem = {
        name: item.name,
        color: item.color,
        size: selectedSize.size,
        itemPrice,
        quantity,
        totalItemPrice: itemPrice * quantity,
      };

      return [...prevCart, newItem];
    });
  };

  const getTotalQuantity = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return { cart, totalPrice, addToCart, getTotalQuantity };
};

export default useCart;