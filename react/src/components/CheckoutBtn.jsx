const CheckoutBtn = ({ count = 0, onOpen }) => {
	return (
		<>
			{count > 0 ? (
				<div
					onClick={onOpen}
					className="fixed bottom-0 left-1/2 right-1/2 transform -translate-x-1/2 bg-[#FFBB5A] w-fit px-6 py-3 space-x-2 rounded-full cursor-pointer"
					id="checkout"
				>
					<span className="font-bold text-[#3B4747]">Checkout</span>
					<span className="bg-white rounded-lg px-2" id="cart">
						{count}
					</span>
				</div>
			) : (
				''
			)}
		</>
	);
};
export default CheckoutBtn;
