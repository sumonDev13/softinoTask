// Constants
const CONSTANTS = {
	MAX_QUANTITY: 5,
	MIN_QUANTITY: 1,
	ANIMATION_DURATION: 300,
	TOAST_SHOW_DURATION: 5000,
	TOAST_DELAY: 1000
  };
  
  // DOM Elements
  const elements = {
	thumbnail: document.getElementById('product-thumbnail'),
	bandColors: document.querySelectorAll('input[name="product-color"]'),
	sizeButtons: document.querySelectorAll('.size-option'),
	decrement: document.getElementById('decrement'),
	increment: document.getElementById('increment'),
	quantity: document.getElementById('quantity'),
	cartButton: document.getElementById('checkout-button'),
	cartModal: document.getElementById('cart-modal'),
	cartCount: document.getElementById('cart-count'),
	cartItems: document.getElementById('cart-items'),
	cartTotal: document.getElementById('cartTotal'),
	totalQtyText: document.getElementById('totalQty'),
	continueShopping: document.getElementById('continue-shopping'),
	toast: document.getElementById('toast'),
	addToCartButton: document.getElementById('add-to-cart')
  };
  
  // State management
  const state = {
	product: {
	  name: "Classy Modern Smart watch",
	  color: "purple",
	  image: "./assets/purple-device.png",
	  qty: 1,
	  size: "S",
	  price: 69
	},
	cart: [],
	quantity: 1
  };
  
  // Utility functions
  const updateProductImage = (selectedColor) => {
	const currentSrc = elements.thumbnail.getAttribute("src");
	const imgSrcRegex = /(.*\/)[a-z]+(-device\.png)$/i;
	return currentSrc.replace(imgSrcRegex, `$1${selectedColor}$2`);
  };
  
  const animateThumbnail = async (newSrc) => {
	elements.thumbnail.classList.add("slide-out");
	
	await new Promise(resolve => setTimeout(resolve, CONSTANTS.ANIMATION_DURATION));
	
	elements.thumbnail.setAttribute("src", newSrc);
	elements.thumbnail.classList.remove("slide-out");
	elements.thumbnail.classList.add("slide-in");
	
	setTimeout(() => {
	  elements.thumbnail.classList.remove("slide-in");
	}, CONSTANTS.ANIMATION_DURATION);
  };
  
  // Event handlers
  const handleColorChange = (input) => {
	if (!input.checked) return;
	
	const selectedColor = input.value;
	const updatedSrc = updateProductImage(selectedColor);
	
	animateThumbnail(updatedSrc);
	
	state.product.color = selectedColor;
	state.product.image = updatedSrc;
  };
  
  const handleSizeSelection = (button) => {
	elements.sizeButtons.forEach(btn => btn.classList.remove('active'));
	button.classList.add('active');
  
	const productSize = button.querySelector('.size');
	const productPrice = button.querySelector('.price');
	const price = parseInt(productPrice.textContent.split("$")[1]);
  
	state.product.size = productSize.textContent;
	state.product.price = price;
  };
  
  const updateQuantity = () => {
	const { quantity } = state;
	elements.quantity.textContent = quantity;
	
	elements.decrement.disabled = quantity <= CONSTANTS.MIN_QUANTITY;
	elements.increment.disabled = quantity >= CONSTANTS.MAX_QUANTITY;
	
	state.product.qty = quantity;
  };
  
  // Toast functionality
  const showToast = (message) => {
	const { toast } = elements;
	toast.textContent = message;
	
	setTimeout(() => {
	  toast.classList.replace("opacity-0", "opacity-100");
	}, CONSTANTS.TOAST_DELAY);
  
	setTimeout(() => {
	  toast.classList.replace("opacity-100", "opacity-0");
	}, CONSTANTS.TOAST_SHOW_DURATION);
  };
  
  // Cart functionality
  const updateCartDisplay = () => {
	const { cart } = state;
	elements.cartItems.innerHTML = '';
	
	const cartSummary = cart.reduce((acc, item) => {
	  acc.total += item.price * item.qty;
	  acc.totalQty += item.qty;
	  return acc;
	}, { total: 0, totalQty: 0 });
  
	cart.forEach(item => {
	  elements.cartItems.innerHTML += `
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
  
	elements.cartTotal.textContent = cartSummary.total;
	elements.totalQtyText.textContent = cartSummary.totalQty;
	elements.cartCount.textContent = cart.length;
  };
  
  // Event listeners
  const initializeEventListeners = () => {
	// Color selection
	elements.bandColors.forEach(input => {
	  input.addEventListener("change", () => handleColorChange(input));
	});
  
	// Size selection
	elements.sizeButtons.forEach(button => {
	  button.addEventListener('click', () => handleSizeSelection(button));
	});
  
	// Quantity controls
	elements.decrement.addEventListener('click', () => {
	  if (state.quantity > CONSTANTS.MIN_QUANTITY) {
		state.quantity--;
		updateQuantity();
	  }
	});
  
	elements.increment.addEventListener('click', () => {
	  if (state.quantity < CONSTANTS.MAX_QUANTITY) {
		state.quantity++;
		updateQuantity();
	  }
	});
  
	// Cart management
	elements.addToCartButton.addEventListener('click', () => {
	  const existingItem = state.cart.find(item => 
		item.color === state.product.color && 
		item.size === state.product.size && 
		item.price === state.product.price
	  );
  
	  if (existingItem) {
		existingItem.qty += state.product.qty;
	  } else {
		state.cart.push({ ...state.product });
	  }
  
	  showToast("Product added to cart successfully!");
	  elements.cartButton.classList.remove('hidden');
	  updateCartDisplay();
	});
  
	// Modal controls
	elements.cartButton.addEventListener('click', () => {
	  const modalContent = elements.cartModal?.querySelector('.modal_content');
	  elements.cartModal.classList.remove('opacity-0', 'pointer-events-none');
	  elements.cartModal.classList.add('opacity-100');
	  modalContent?.classList.remove('scale-95');
	  modalContent?.classList.add('scale-100');
	  updateCartDisplay();
	});
  
	elements.continueShopping.addEventListener('click', () => {
	  const modalContent = elements.cartModal?.querySelector('.modal_content');
	  elements.cartModal.classList.add('opacity-0', 'pointer-events-none');
	  elements.cartModal.classList.remove('opacity-100');
	  modalContent?.classList.add('scale-95');
	  modalContent?.classList.remove('scale-100');
	});
  };
  
  // Initialize the application
  const init = () => {
	updateQuantity();
	initializeEventListeners();
  };
  
  init();