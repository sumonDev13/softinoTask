const PriceDisplay = ({ original, discounted }) => (
    <div className="price flex gap-2 items-center">
      <p className="line-through text-base md:text-[20px] font-normal text-[#8091A7]">
        ${original}
      </p>
      <p className="text-xl md:text-[24px] font-bold text-[#4B97D3]">
        ${discounted}
      </p>
    </div>
  );

  export default PriceDisplay;