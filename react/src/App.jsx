import { useEffect, useState } from 'react';
import ProductImage from './components/ProductImage';
import ProductDetails from './components/ProductDetails';
import CheckoutBtn from './components/CheckoutBtn';
import Modal from './components/Modal';
import useCart from './hooks/useCart';
import { product } from './data/productDetails.json';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.details.brandColors[0]);
  const { cart, totalPrice, addToCart, getTotalQuantity } = useCart();

  return (
    <div className="leading-8 p-4 md:p-6 lg:p-8">
      <div className="max-w-[1320px] container mx-auto flex flex-col lg:flex-row gap-6 justify-center items-center">
        <ProductImage 
          selectedColor={selectedColor} 
          productName={product.name} 
        />
        <ProductDetails
          product={product}
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
          onAddToCart={addToCart}
        />
      </div>

      <CheckoutBtn
        count={getTotalQuantity()}
        onOpen={() => setIsOpen(true)}
      />

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        cart={cart}
        totalPrice={totalPrice}
        totalQuantity={getTotalQuantity()}
      />
    </div>
  );
};

export default App;