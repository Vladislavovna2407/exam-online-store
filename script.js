const items = [{
        title: "Зеленый чай",
        description: "Обладает сладковатым вкусом, с горчинкой и приятной терпкостью.",
        tags: ["green", "tea"],
        price: 10.00,
        rating: 4.9,
        img: "./img/classical-green-tea.jpeg",
    },
    {
        title: "Черный чай",
        description: "Обладает ярко выраженой терпкостью и отчасти горечью.",
        tags: ["black", "tea"],
        price: 9.00,
        rating: 4.7,
        img: "./img/black-tea.jpeg",
    },
    {
        title: "Зеленый с жасмином",
        description: "Жасмин добавляет тонкую цветочную ноту и лёгкую горчинку.",
        tags: ["green", "tea", "herbal"],
        price: 10.50,
        rating: 4.8,
        img: "./img/jasmine-tea.jpeg",
    },
    {
        title: "Фруктовый чай",
        description: "Имеет фруктово-приторный аромат и обволакивающую свежесть.",
        tags: ["fruit"],
        price: 7.00,
        rating: 3.5,
        img: "./img/fruit-tea.jpeg",
    },
    {
        title: "Каркаде",
        description: "Чайный напиток из цветков Гибискуса.",
        tags: ["hibiscus"],
        price: 6.00,
        rating: 1,
        img: "./img/hibiscus.jpeg",
    },
    {
        title: "Эрл Грей",
        description: "Ароматизированный маслом из кожуры бергамота черный чай.",
        tags: ["black", "tea"],
        price: 12.00,
        rating: 4.7,
        img: "./img/earl-gray-tea.jpeg",
    },
    {
        title: "Травяной чай",
        description: "Напиток обладает приятной кислинкой и вяжущим привкусом.",
        tags: ["herbal"],
        price: 7.50,
        rating: 3.5,
        img: "./img/herbal-tea.jpeg",
    },
    {
        title: "Гречишный чай",
        description: "Насыщенный натуральный вкус и аромат овсяного печенья.",
        tags: ["buckwheat"],
        price: 15,
        rating: 2.4,
        img: "./img/buckwheat-tea.jpeg",
    },
    {
        title: "Молочный улун",
        description: "Имеет богатый сливочный вкус и аромат.",
        tags: ["oolong"],
        price: 16,
        rating: 2.9,
        img: "./img/milk-oolong.jpeg",
    },
    {
        title: "Синий чай",
        description: "Травянистый вкус, с кислинкой и металлическими нотками.",
        tags: ["blue", "tea"],
        price: 19,
        rating: 1.9,
        img: "./img/blue-tea.jpeg",
    },
    {
        title: "Облепиховый чай",
        description: "Обладает приятным терпким вкусом с апельсиновой сладостью.",
        tags: ["buckthorn"],
        price: 17,
        rating: 5.0,
        img: "./img/​​buckthorn-tea.jpeg",
    },
    {
        title: "Связанный чай",
        description: "Состоит из связки сушеных листьев чая, обернутых вокруг сухого цветка.",
        tags: ["related", "tea"],
        price: 25,
        rating: 4.8,
        img: "./img/related-tea.jpeg",
    },
];


const itemContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function prepareShop(shopItems) {
    const { title, description, tags, price, img, rating } = shopItems;
    const item = itemTemplate.content.cloneNode(true);
    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector(".price").textContent = `${price} BYN`;
    item.querySelector("img").src = img;


    const ratingContainer = item.querySelector(".rating");

    for (let i = 0; i < rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }
    const tagsHolder = item.querySelector(".tags");

    tags.forEach((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        element.classList.add("tag");
        tagsHolder.append(element);
    })

    return item;
}

let currentState = [...items];

function renderItems(arr) {
    nothingFound.textContent = "";
    itemContainer.innerHTML = "";

    arr.forEach((item) => {
        itemContainer.append(prepareShop(item));

    })
    if (arr.length == 0) {
        nothingFound.textContent = "Увы, ничего не найдено :("
    }
}

renderItems(currentState);

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 3;
    }

    if (a.title < b.title) {
        return -3;
    }

    if (a.title == b.title) {
        return 0;
    }
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;

    switch (selectedOption) {
        case "expensive":
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }

        case "cheap":
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }

        case "alphabet":
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }

        case "rating":
            {
                currentState((a, b) => b.rating - a.rating)
                break;
            }
    }
    renderItems(currentState);
})

const searchButton = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();
    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );
    currentState.sort((a, b) => sortByAlphabet(a, b));
    sortControl.selectedIndex = 0;
    renderItems(currentState);
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);