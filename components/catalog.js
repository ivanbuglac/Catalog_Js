const catalogRoot = document.getElementById('catalog-root')
let products = []
let productsToShow = 6 // Количество товаров для отображения за раз
let currentOffset = 0 // Текущее смещение

// Функция рендеринга части каталога с товарами
function renderCatalogPart() {
	const productsSubset = products.slice(
		currentOffset,
		currentOffset + productsToShow
	)

	productsSubset.forEach(product => {
		const productCard = document.createElement('div')
		productCard.className = 'container'

		productCard.innerHTML = `
            <div class="container__image">
                <img src="${product.thumbnail}" alt="${product.title}" />
            </div>
            <div class="container__title">${product.title}</div>
            <div class="container__description">${product.description}</div>
            <div class="buy">
                <div class="container__price">$${product.price}</div>
                <div class="price-btn">
                    <img src="./assets/Button.svg" alt="Добавить в корзину" data-id="${product.id}" class="add-to-cart" />
                </div>
            </div>
        `

		// Добавляем обработчик на изображение "Добавить в корзину"
		productCard.querySelector('.add-to-cart').addEventListener('click', () => {
			window.addToCart(product) // Вызов глобальной функции addToCart
		})

		catalogRoot.appendChild(productCard)
	})

	// Проверяем, есть ли еще товары для подгрузки
	if (currentOffset + productsToShow < products.length) {
		const loadMoreBtn = document.createElement('button')
		loadMoreBtn.textContent = 'Show More'
		loadMoreBtn.className = 'btn__show_more'
		loadMoreBtn.addEventListener('click', loadMoreProducts)
		catalogRoot.appendChild(loadMoreBtn)
	}
}

// Функция для подгрузки дополнительных товаров
function loadMoreProducts() {
	currentOffset += productsToShow
	// Удаляем кнопку "Load More" перед перерисовкой, чтобы не дублировать
	const loadMoreBtn = document.querySelector('.btn__show_more')
	if (loadMoreBtn) loadMoreBtn.remove()

	renderCatalogPart() // Рендерим следующие 6 товаров
}

// Функция загрузки всех товаров
async function loadProducts() {
	try {
		const response = await fetch('https://dummyjson.com/products?limit=30')
		const data = await response.json()
		products = data.products
		renderCatalogPart() // Рендерим первые 6 товаров
	} catch (error) {
		console.error('Ошибка загрузки каталога:', error)
	}
}

// Инициализация каталога
loadProducts()
