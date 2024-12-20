const QuantitySelector = ({ quantity, onChange }) => (
    <div className="flex border-2 border-[#8090A6] rounded-sm w-fit divide-x-2 divide-solid divide-[#8090A6]">
      <button
        onClick={() => onChange(Math.max(0, quantity - 1))}
        className="w-10 text-center hover:text-black font-bold text-[#8090A6] h-[36px]"
        aria-label="Decrease quantity"
      >
        —
      </button>
      <p className="px-6 h-[36px] flex justify-center items-center">
        {quantity}
      </p>
      <button
        onClick={() => onChange(quantity + 1)}
        className="w-10 text-center text-[#8090A6] hover:text-black h-[36px] text-xl flex justify-center items-center"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );

  export default QuantitySelector;