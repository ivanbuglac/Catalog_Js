const cartRoot = document.getElementById('cart-root')
let cart = JSON.parse(localStorage.getItem('cart')) || []

// Функция добавления товара в корзину
function addToCart(product) {
	const existingProduct = cart.find(item => item.id === product.id)

	if (existingProduct) {
		existingProduct.quantity += 1
	} else {
		cart.push({ ...product, quantity: 1 })
	}

	localStorage.setItem('cart', JSON.stringify(cart))
	renderCart()
}

// Функция рендеринга корзины
function renderCart() {
	cartRoot.innerHTML = '<h2>Basket</h2>'

	if (cart.length === 0) {
		cartRoot.innerHTML += '<p>Корзина пуста.</p>'
		return
	}

	cart.forEach(item => {
		const cartItem = document.createElement('div')
		cartItem.className = 'mini-card'

		cartItem.innerHTML = `
            <div class="small__pictre">
                <img src="${item.thumbnail}" alt="${item.title}" />
            </div>
            <div class="product-info">
                <div class="small__title">${item.title}</div>
                <div class="small__price">$${item.price} x ${item.quantity}</div>
            </div>
            <div class="delete">
                <img src="./assets/Vector.svg" alt="Удалить" data-id="${item.id}" class="delete-cart" />
            </div>
        `

		cartItem.querySelector('.delete-cart').addEventListener('click', () => {
			removeFromCart(item.id)
		})

		cartRoot.appendChild(cartItem)
	})

	const totalPrice = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	)
	const totalDiv = document.createElement('div')
	totalDiv.className = 'total'
	totalDiv.innerHTML = `
        <div class="total__price">Total: $${totalPrice.toFixed(2)}</div>
        <div class="total_btn"><button>CHECKOUT</button></div>
    `
	cartRoot.appendChild(totalDiv)
}

// Функция удаления товара из корзины
function removeFromCart(id) {
	cart = cart.filter(item => item.id !== id)
	localStorage.setItem('cart', JSON.stringify(cart))
	renderCart()
}

// Делаем функцию addToCart глобальной
window.addToCart = addToCart

// Инициализация корзины
renderCart()
