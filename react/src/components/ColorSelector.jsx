 const ColorSelector = ({ colors, selected, onSelect }) => (
    <div>
      <p className="text-lg text-[#3B4747] font-bold">Brand Color</p>
      <div className="flex gap-3 mt-2">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => onSelect(color)}
            className={`w-4 h-4 rounded-full ${
              selected.id === color.id ? 'ring-2 ring-offset-2' : ''
            }`}
            style={{ backgroundColor: color.hex }}
            aria-label={`Select ${color.id} color`}
          />
        ))}
      </div>
    </div>
  );

  export default ColorSelector;