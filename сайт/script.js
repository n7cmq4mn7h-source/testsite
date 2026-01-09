// Переключение светлой/тёмной темы
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Кнопка интерактивная
const clickMe = document.getElementById('clickMe');
clickMe.addEventListener('click', () => {
    alert('Вы нажали на кнопку!');
});

// Кнопки Купить
const buyButtons = document.querySelectorAll('.buy-btn');
buyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        alert(`Вы добавили ${btn.parentElement.querySelector('h3').textContent} в корзину!`);
    });
});

// Анимация при скролле
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});

// Массив корзины
let cart = [];

// Функция добавления в корзину
buyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const productName = btn.parentElement.querySelector('h3').textContent;
        cart.push(productName);
        alert(`Вы добавили ${productName} в корзину!`);
        updateCart();
        // Перейти к корзине
        document.getElementById('cart').scrollIntoView({ behavior: 'smooth' });
    });
});

// Обновление корзины
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>В корзине пока нет товаров.</p>";
    } else {
        cartItems.innerHTML = "<ul>" + cart.map(item => `<li>${item}</li>`).join("") + "</ul>";
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const buyButtons = document.querySelectorAll('.buy-btn');

    buyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const productName = btn.parentElement.querySelector('h3').textContent;

            // Получаем текущую корзину из localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(productName);
            localStorage.setItem('cart', JSON.stringify(cart));

            // Сообщение и переход на корзину
            alert(`${productName} добавлен в корзину!`);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {

    // Массив товаров
    const products = [
        {
            name: "Товар 1",
            img: ["https://picsum.photos/300/200?1", "https://picsum.photos/300/200?11", "https://picsum.photos/300/200?12"],
            description: "Подробное описание Товара 1",
            price: 150
        },
        {
            name: "Товар 2",
            img: ["https://picsum.photos/300/200?2", "https://picsum.photos/300/200?21", "https://picsum.photos/300/200?22"],
            description: "Подробное описание Товара 2",
            price: 200
        },
        {
            name: "Товар 3",
            img: ["https://picsum.photos/300/200?3", "https://picsum.photos/300/200?31", "https://picsum.photos/300/200?32"],
            description: "Подробное описание Товара 3",
            price: 250
        }
    ];

    const productsContainer = document.querySelector('.products');

    const modal = document.getElementById("productModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalImages = document.getElementById("modalImages");
    const modalDescription = document.getElementById("modalDescription");
    const modalPrice = document.getElementById("modalPrice");
    const modalBuy = document.getElementById("modalBuy");
    const closeBtn = document.querySelector(".close");

    // Создание карточек
    products.forEach((product) => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${product.img[0]}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">₴${product.price}</p>
        `;
        productsContainer.appendChild(card);

        // Клик на карточку открывает модалку
        card.addEventListener('click', () => {
            modal.style.display = "block";
            modalTitle.textContent = product.name;
            modalDescription.textContent = product.description;
            modalPrice.textContent = `Цена: ₴${product.price}`;

            modalImages.innerHTML = "";
            product.img.forEach(src => {
                const imgEl = document.createElement('img');
                imgEl.src = src;
                modalImages.appendChild(imgEl);
            });

            // Кнопка Купить в модалке
            modalBuy.onclick = () => {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(product.name);
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`${product.name} добавлен в корзину!`);
            };
        });
    });

    // Закрытие модалки
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (event) => { if (event.target === modal) modal.style.display = "none"; };
});
