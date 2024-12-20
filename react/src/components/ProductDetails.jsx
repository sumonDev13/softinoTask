import { useState } from 'react';
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import Reviews from './Reviews';
import FavoriteBtn from './FavoriteBtn';
import PriceDisplay from './PriceDisplay';
import ProductSpecs from './ProductSpecs';

const ProductDetails = ({ product, selectedColor, onColorSelect, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product.details.wristSizes[0]);
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    onAddToCart(
      { name: product.name, color: selectedColor.id },
      quantity,
      selectedSize
    );
    setQuantity(0);
  };

  return (
    <div className="w-full lg:w-1/2 space-y-4 px-4 lg:px-0">
      <h1 className="title text-2xl md:text-3xl lg:text-4xl font-semibold">
        {product.name}
      </h1>
      
      <Reviews
        totalRating={product.rating.totalRating}
        reviewCount={product.rating.reviewCount}
      />

      <PriceDisplay 
        original={product.price.original} 
        discounted={product.price.discounted} 
      />

      <p className="text-base lg:text-lg text-[#8091A7]">
        {product.description}
      </p>

      <ProductSpecs 
        type={product.details.type}
        modelNumber={product.details.modelNumber} 
      />

      <ColorSelector
        colors={product.details.brandColors}
        selected={selectedColor}
        onSelect={onColorSelect}
      />

      <SizeSelector
        sizes={product.details.wristSizes}
        selected={selectedSize}
        onSelect={setSelectedSize}
      />

      <div className="flex flex-wrap items-center gap-4">
        <QuantitySelector
          quantity={quantity}
          onChange={setQuantity}
        />
        <button
          onClick={handleAddToCart}
          className="bg-[#6477ff] h-[36px] px-4 font-semibold text-white rounded-[4px]"
        >
          Add to Cart
        </button>
        <FavoriteBtn />
      </div>
    </div>
  );
};

export default ProductDetails;