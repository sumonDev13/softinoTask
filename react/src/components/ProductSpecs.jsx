const ProductSpecs = ({ type, modelNumber }) => (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
      <div>
        <p className="text-sm text-[#8091A7]">Type</p>
        <p className="text-lg">{type}</p>
      </div>
      <div>
        <p className="text-sm text-[#8091A7]">Model Number</p>
        <p className="text-lg">{modelNumber}</p>
      </div>
    </div>
  );

  export default ProductSpecs;