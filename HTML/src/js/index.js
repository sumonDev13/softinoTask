// dom element selection
const thumbnail = document.getElementById('product-thumbnail');
const bandColors = document.querySelectorAll('input[name="product-color"]');
const sizeButtons = document.querySelectorAll('.size-option');
const decrement = document.getElementById('decrement');
const increment = document.getElementById('increment');
const quantity = document.getElementById('quantity');
const cartButton = document.getElementById('checkout-button');
const cartModal = document.getElementById('cart-modal');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cartTotal');
const totalQtyText = document.getElementById('totalQty');
const continueShopping = document.getElementById('continue-shopping');
const toast = document.getElementById('toast');

// initial product data
let product = {
	name: "Classy Modern Smart watch",
	color: "purple",
	image: "./img/purple-device.png",
	qty: 1,
	size: "S",
	price: 69
};
let cart = [];

// Add a change event listener to each radio input
bandColors.forEach(input => {
	input.addEventListener("change", () => {
		if (input.checked) {
			const selectedColor = input.value;

			thumbnail.classList.add("slide-out");

			// Wait for the slide-out animation to finish
			setTimeout(() => {
				// Update the image source
				const currentSrc = thumbnail.getAttribute("src");
				const imgSrcRegex = /(.*\/)[a-z]+(-device\.png)$/i;
				const updatedSrc = currentSrc.replace(imgSrcRegex, `$1${selectedColor}$2`);
				thumbnail.setAttribute("src", updatedSrc);

				product.color = selectedColor;
				product.image = thumbnail.getAttribute("src");

				// console.log("product", product);

				thumbnail.classList.remove("slide-out");
				thumbnail.classList.add("slide-in");

				// Remove slide-in class after animation
				setTimeout(() => {
					thumbnail.classList.remove("slide-in");
				}, 300);
			}, 300);
		}
	});
});

// Choose Size add event listener
sizeButtons.forEach(button => {
	button.addEventListener('click', function () {
		sizeButtons.forEach(btn => btn.classList.remove('active'));
		button.classList.add('active');

		// Get the size and price from the selected button
		const productSize = document.querySelector('.size-option.active .size');
		const productPrice = document.querySelector('.size-option.active .price');
		const price = parseInt(productPrice.textContent.split("$")[1]);

		product.size = productSize.textContent;
		product.price = price;

		// console.log("product", product);
	});
});

// Update increment/decrement button disabled state based on quantity
let qty = parseInt(quantity.textContent);

function updateQty() {
	if (qty === 1) decrement.setAttribute('disabled', 'true');
	if (qty > 1) decrement.removeAttribute('disabled');

	if (qty === 5) increment.setAttribute('disabled', 'true');
	if (qty < 5) increment.removeAttribute('disabled');
}

// Decrement button click event
decrement.addEventListener('click', () => {
	if (qty > 1) {
		qty--;
		quantity.textContent = qty;
		updateQty();
		product.qty = parseInt(quantity.textContent);

		// console.log("product", product);
	}
});

// Increment button click event
increment.addEventListener('click', () => {
	if (qty < 5) {
		qty++;
		quantity.textContent = qty;
		updateQty();
		product.qty = parseInt(quantity.textContent);

		// console.log("product", product);
	}
});

// Initialize states on page load
updateQty();

// toast message
const showToast = message => {
	toast.textContent = message;
	setTimeout(() => {
		toast.classList.remove("opacity-0");
		toast.classList.add("opacity-100");
	}, 1000);

	setTimeout(() => {
		toast.classList.remove("opacity-100");
		toast.classList.add("opacity-0");
	}, 5000);
}

// Add to cart functionality
document.getElementById('add-to-cart').addEventListener('click', () => {
	// restrict to direct add duplicate item
	const existingItem = cart.find(
		item => item.color === product.color && item.size === product.size && item.price === product.price
	);

	if (existingItem) {
		existingItem.qty += product.qty;

		showToast("Product added to cart successfully!");
	} else {
		const productCopy = { ...product };
		cart.push(productCopy);

		showToast("Product added to cart successfully!");
	}

	cartCount.textContent = cart.length;
	cartButton.classList.remove('hidden');
});

// Show cart modal
const modalContent = cartModal?.querySelector('.modal_content');
cartButton.addEventListener('click', () => {
	cartModal.classList.remove('opacity-0', 'pointer-events-none');
	cartModal.classList.add('opacity-100');
	modalContent.classList.remove('scale-95');
	modalContent.classList.add('scale-100');
	updateCart();
});

// Close modal
continueShopping.addEventListener('click', () => {
	cartModal.classList.add('opacity-0', 'pointer-events-none');
	cartModal.classList.remove('opacity-100');
	modalContent.classList.add('scale-95');
	modalContent.classList.remove('scale-100');
});

// Update cart modal
function updateCart() {
	cartItems.innerHTML = '';
	let total = 0;
	let totalQty = 0;

	cart.forEach(item => {
		total += item.price * item.qty;
		totalQty += item.qty;
		cartItems.innerHTML += `
			<tr class="h-9 text-sm font-normal text-titleText">
				<td class="min-w-64 w-4/12 flex items-center gap-2 py-4 border-b border-b-border">
					<img class="rounded w-9 h-9" src="${item.image}" alt="product thumbnail" />
					<span>${item.name}</span>
				</td>
				<td class="w-2/12 py-4 border-b border-b-border px-4 capitalize">${item.color}</td>
				<td class="w-2/12 py-4 border-b border-b-border px-4">${item.size}</td>
				<td class="w-2/12 py-4 border-b border-b-border px-4">${item.qty}</td>
				<td class="w-2/12 text-end py-4 border-b border-b-border">$${item.price * item.qty}</td>
			</tr>
		`;
	});
	cartTotal.textContent = total;
	totalQtyText.textContent = totalQty;
}