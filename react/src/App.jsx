import { useEffect, useState } from 'react';
import FavoriteBtn from './components/FavoriteBtn';
import FloatingButton from './components/FloatingButton';
import Modal from './components/Modal';
import Rating from './components/Rating';
import { product } from './data/productDetails.json';

const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedColor, setSelectedColor] = useState(
		product.details.brandColors[0]
	);
	const [selectedSize, setSelectedSize] = useState(
		product.details.wristSizes[0]
	);
	const [quantity, setQuantity] = useState(0);
	const [cart, setCart] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		const newTotal = cart.reduce((sum, item) => {
			return sum + item.itemPrice * item.quantity;
		}, 0);
		setTotalPrice(newTotal);
	}, [cart]);

	const handleColorSelect = (color) => {
		setSelectedColor(color);
		// console.log(color.id);
	};

	const handleSizeSelect = (size) => {
		setSelectedSize(size);
		// console.log(size.size, size.price);
	};

	const handleQuantityChange = (increment) => {
		setQuantity((prev) => Math.max(0, prev + increment));
	};

	const handleAddToCart = () => {
		if (!quantity) {
			alert('Please select quantity');
			return;
		}

		const itemPrice = selectedSize.price;

		setCart((prevCart) => {
			// if item with same color & size exist
			const existingItemIndex = prevCart.findIndex(
				(item) =>
					item.color === selectedColor.id && item.size === selectedSize.size
			);

			let newCart;
			if (existingItemIndex !== -1) {
				// update existing item
				newCart = [...prevCart];
				newCart[existingItemIndex] = {
					...newCart[existingItemIndex],
					quantity: newCart[existingItemIndex].quantity + quantity,
					totalItemPrice:
						(newCart[existingItemIndex].quantity + quantity) * itemPrice,
				};
			} else {
				// add new item
				newCart = [
					...prevCart,
					{
						name: product.name,
						color: selectedColor.id,
						size: selectedSize.size,
						itemPrice,
						quantity,
						totalItemPrice: itemPrice * quantity,
					},
				];
			}

			return newCart;
		});

		setQuantity(0);
	};

	return (
		<div className="leading-8 p-4 md:p-6 lg:p-8">
			<div className="max-w-[1320px] container mx-auto flex flex-col lg:flex-row gap-6 justify-center items-center">
				{/* Featured image */}
				<div className="w-full lg:w-1/2 flex justify-center">
					<img
						className="w-full max-w-[320px] md:max-w-[480px] lg:max-w-[630px] h-auto object-contain"
						src={`images/${selectedColor.id}.jpeg`}
						alt="featured image"
					/>
				</div>
				{/* Descriptions */}
				<div className="w-full lg:w-1/2 space-y-4 px-4 lg:px-0">
					<h1 className="title text-2xl md:text-3xl lg:text-4xl font-semibold">
						{product.name}
					</h1>
					<Rating
						totalRating={product.rating.totalRating}
						reviewCount={product.rating.reviewCount}
					/>

					<div className="price flex gap-2 items-center">
						<p className="line-through text-base md:text-[20px] font-normal text-[#8091A7]">
							${product.price.original}
						</p>
						<p className="text-xl md:text-[24px] font-bold text-[#4B97D3]">
							${product.price.discounted}
						</p>
					</div>

					<p className="text-base lg:text-lg text-[#8091A7]">
						{product.description}
					</p>

					<div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
						<div>
							<p className="text-sm text-[#8091A7]">Type</p>
							<p className="text-lg">{product.details.type}</p>
						</div>
						<div>
							<p className="text-sm text-[#8091A7]">Model Number</p>
							<p className="text-lg">{product.details.modelNumber}</p>
						</div>
					</div>

					<div>
						<p className="text-lg text-[#3B4747] font-bold">Brand Color</p>
						<div className="flex gap-3 mt-2">
							{product.details.brandColors.map((color) => (
								<button
									key={color.id}
									onClick={() => handleColorSelect(color)}
									className={`w-4 h-4 rounded-full ${
										selectedColor.id === color.id ? 'ring-2 ring-offset-2' : ''
									}`}
									style={{
										backgroundColor: color.hex,
									}}
								/>
							))}
						</div>
					</div>

					<div>
						<p className="text-lg text-[#3B4747] font-bold mb-2">Wrist Size</p>
						<div className="flex flex-wrap gap-2">
							{product.details.wristSizes.map((size) => (
								<button
									key={size.size}
									onClick={() => handleSizeSelect(size)}
									className={`px-4 py-1 rounded-[4px] border ${
										selectedSize.size === size.size
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

					<div className="flex flex-wrap items-center gap-4">
						<div className="flex border-2 border-[#8090A6] rounded-sm w-fit divide-x-2 divide-solid divide-[#8090A6]">
							<button
								onClick={() => handleQuantityChange(-1)}
								className="w-10 text-center hover:text-black font-bold text-[#8090A6] h-[36px]"
							>
								—
							</button>
							<p className="px-6 h-[36px] flex justify-center items-center">
								{quantity}
							</p>
							<button
								onClick={() => handleQuantityChange(1)}
								className="w-10 text-center text-[#8090A6] hover:text-black h-[36px] text-xl flex justify-center items-center"
							>
								+
							</button>
						</div>
						<button
							onClick={handleAddToCart}
							className="bg-[#6477ff] h-[36px] px-4 font-semibold text-white rounded-[4px]"
						>
							Add to Cart
						</button>
						<FavoriteBtn />
					</div>
				</div>
			</div>

			<FloatingButton
				count={cart.reduce((sum, item) => sum + item.quantity, 0)}
				onOpen={() => setIsOpen(true)}
			/>

			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				cart={cart}
				totalPrice={totalPrice}
				totalQuantity={cart.reduce((sum, item) => sum + item.quantity, 0)}
			/>
		</div>
	);
};

export default App;
