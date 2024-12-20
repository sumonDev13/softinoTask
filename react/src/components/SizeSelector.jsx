const SizeSelector = ({ sizes, selected, onSelect }) => (
    <div>
      <p className="text-lg text-[#3B4747] font-bold mb-2">Wrist Size</p>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size.size}
            onClick={() => onSelect(size)}
            className={`px-4 py-1 rounded-[4px] border ${
              selected.size === size.size
                ? 'border-[#4B97D3] text-[#4B97D3]'
                : 'border-[#8090A6] text-[#8090A6]'
            } font-semibold`}
          >
            <span className="text-black font-bold">{size.size}</span>
            <span className="ml-1">${size.price}</span>
          </button>
        ))}
      </div>
    </div>
  );

  export default SizeSelector;