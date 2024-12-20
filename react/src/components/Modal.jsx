const Modal = ({ isOpen, onClose, cart, totalPrice, totalQuantity }) => {

	return (
		<div
			className={`${
				!isOpen && 'hidden'
			} fixed inset-0 z-50 flex justify-center items-center bg-black/60 p-4`}
			id="modal"
		>
			<div
				id="cartDetails"
				className="relative w-full max-w-[650px] h-fit p-4 md:p-6 bg-white flex flex-col justify-center items-center rounded-3xl"
			>

				<h2 className="w-full text-left text-xl md:text-2xl font-bold mb-4">
					Your Cart
				</h2>

				{!cart.length && <p id="noItemsYet">No items added to cart yet!</p>}

				{cart.length ? (
					<>
						<div className="w-full" id="cartItems">
							<table className="w-full">
								<thead>
									<tr className="border-b border-[#DADFEB] text-[#8090A6]">
										<th className="p-2 text-left">Item</th>
										<th className="p-2 text-left">Color</th>
										<th className="p-2 text-left">Size</th>
										<th className="p-2 text-left">Qnt</th>
										<th className="p-2 text-right">Price</th>
									</tr>
								</thead>

								<tbody>
									{cart.map((item, i) => (
										<tr key={i} className="border-b border-[#DADFEB]">
											<td className="p-2 flex gap-2">
												<div className="w-9 h-9 object-cover object-center overflow-hidden">
													<img src={`/images/${item.color}.jpeg`} alt="Thumbnail" />
												</div>
												{item.name}
											</td>
											<td className="p-2 capitalize">{item.color}</td>
											<td className="p-2 font-semibold">{item.size}</td>
											<td className="p-2 font-semibold">{item.quantity}</td>
											<td className="p-2 text-right font-semibold">
												${item.totalItemPrice}
											</td>
										</tr>
									))}

									<tr className="font-semibold">
										<td className="p-2" colSpan="3">
											Total
										</td>
										<td className="p-2 ">{totalQuantity}</td>
										<td className="p-2 text-right">${totalPrice}</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div
							className="w-full flex justify-end items-end gap-4 mt-4 flex-wrap"
							id="cartActionBtns"
						>
							<button
								onClick={onClose}
								id="continueShopping"
								className="h-[36px] px-4 font-semibold text-[#364A63] rounded-[4px] border-2"
							>
								Continue Shopping
							</button>
							<button
								id="checkoutShopping"
								className="bg-[#6477ff] h-[36px] px-4 font-semibold text-white rounded-[4px]"
							>
								Checkout
							</button>
						</div>
					</>
				) : (
					''
				)}
			</div>
		</div>
	);
};
export default Modal;
