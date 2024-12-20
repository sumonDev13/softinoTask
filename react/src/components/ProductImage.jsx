const ProductImage = ({ selectedColor, productName }) => (
    <div className="w-full lg:w-1/2 flex justify-center">
      <img
        className="w-full max-w-[320px] md:max-w-[480px] lg:max-w-[630px] h-auto object-contain"
        src={`images/${selectedColor.id}.jpeg`}
        alt={`${productName} in ${selectedColor.id}`}
      />
    </div>
  );

  export default ProductImage;