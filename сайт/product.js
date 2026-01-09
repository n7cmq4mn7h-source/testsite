document.addEventListener("DOMContentLoaded", () => {

    const products = [
        {
            id: 0,
            name: "Товар 1",
            img: [
                "https://picsum.photos/800/500?1",
                "https://picsum.photos/800/500?11",
                "https://picsum.photos/800/500?12"
            ],
            description: "Подробное описание товара 1. Качественный и надёжный.",
            price: 150
        },
        {
            id: 1,
            name: "Товар 2",
            img: [
                "https://picsum.photos/800/500?2",
                "https://picsum.photos/800/500?21",
                "https://picsum.photos/800/500?22"
            ],
            description: "Описание товара 2. Отличный выбор.",
            price: 200
        }
    ];

    // 1️⃣ Получаем ID товара
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));
    const product = products.find(p => p.id === id);

    if (!product) {
        alert("Товар не найден");
        return;
    }

    // 2️⃣ ЭЛЕМЕНТЫ СО СТРАНИЦЫ
    const title = document.getElementById("productTitle");
    const name = document.getElementById("detailName");
    const desc = document.getElementById("detailDescription");
    const price = document.getElementById("detailPrice");
    const mainImage = document.getElementById("mainImage");
    const thumbs = document.getElementById("detailImages");
    const buyBtn = document.getElementById("buyButton");

    // 3️⃣ ЗАПОЛНЯЕМ ДАННЫЕ
    title.textContent = product.name;
    name.textContent = product.name;
    desc.textContent = product.description;
    price.textContent = `₴ ${product.price}`;

    // 4️⃣ ГЛАВНОЕ ФОТО (ВАЖНО!)
    mainImage.src = product.img[0];

    // 5️⃣ МИНИАТЮРЫ
  thumbs.innerHTML = "";

product.img.forEach(src => {
    const img = document.createElement("img");
    img.src = src;

    img.addEventListener("click", () => {
        // Анимация исчезновения
        mainImage.style.opacity = "0";
        mainImage.style.transform = "scale(0.98)";

        setTimeout(() => {
            mainImage.src = src;

            // Анимация появления
            mainImage.style.opacity = "1";
            mainImage.style.transform = "scale(1)";
        }, 200);
    });

    thumbs.appendChild(img);
});

    // 6️⃣ КНОПКА КУПИТЬ
    buyBtn.onclick = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Товар добавлен в корзину");
    };

});
