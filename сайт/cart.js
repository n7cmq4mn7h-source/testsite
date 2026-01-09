document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartItems = document.getElementById('cartItems');
    const totalPriceEl = document.getElementById('totalPrice');

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h4>${item.name}</h4>
                <p>₴${item.price} x <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantityInput"></p>
                <button class="removeBtn" data-index="${index}">Удалить</button>
            `;
            cartItems.appendChild(div);
        });

        totalPriceEl.textContent = `₴${total}`;
    }

    renderCart();

    // Изменение количества
    cartItems.addEventListener('input', e => {
        if (e.target.classList.contains('quantityInput')) {
            const index = e.target.dataset.index;
            cart[index].quantity = parseInt(e.target.value);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    });

    // Удаление товара
    cartItems.addEventListener('click', e => {
        if (e.target.classList.contains('removeBtn')) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    });


    // Отображение кнопки PayPal
paypal.Buttons({
    createOrder: function(data, actions) {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: total // сумма заказа
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert(`Оплата проведена! Спасибо, ${details.payer.name.given_name}`);
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    }
}).render('#paypal-button-container'); // рендерим кнопку


 paypal.Buttons({
        createOrder: function(data, actions) {
            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            return actions.order.create({
                purchase_units: [{
                    amount: { value: total } 
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert(`Оплата успешна! Спасибо, ${details.payer.name.given_name}`);
                cart = [];
                renderCart();
            });
        }
    }).render('#paypal-button-container');
});