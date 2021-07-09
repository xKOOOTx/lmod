const headerCityButton = document.querySelector('.header__city-button')
let hash = location.hash.substring(1);

headerCityButton.textContent = localStorage.getItem('lomodaLocation') || 'Ваш город?';

//  модальное окно
const cartOverlay = document.querySelector('.cart-overlay');
const cartBtnOpen = document.querySelector('.subheader__cart');
const body = document.body;
const widthScroll = window.innerWidth - body.offsetWidth


//  disable scroll
const disableScroll = () => {
    document.body.dbScrollY = window.scrollY;
    body.style.cssText =
        `
         position: fixed;
         top: -${window.scrollY}px;
         left: 0;
         width: 100%;
         height: 100vh;
         overflow: hidden;
         padding-right: ${widthScroll}px;
        `
}

//  enable scroll
const enableScroll = () => {
    body.style.cssText = ``;
    window.scroll({ top: document.body.dbScrollY })
}


//  opening modal window cart
const cartModalOpen = () => {
    cartOverlay.classList.add('cart-overlay-open');
    disableScroll();
}
//  closing modal window cart
const cartModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open');
    enableScroll();
}


// get data
const getData = async () => {
     const data = await fetch('db.json');

     if (data.ok) {
         return data.json()
     } else {
         throw new Error(`Данные не были получены, ошибка ${data.status} ${data.statusText}`)
     }
}

const getGoods = (callback, prop, value) => {
    getData()
        .then(data => {
            if (value) {
                callback(data.filter(item => item[prop] === value))
            } else {
                callback(data)
            }
        })
        .catch(error => {
            console.error(error)
        });
}

// Страница товаров
try {
    const goodsList = document.querySelector('.goods__list');

    if (!goodsList) {
        throw 'This is not a goods page!'
    }

    const goodsTitle = document.querySelector('.goods__title');

    const changeTitle = () => {
        goodsTitle.textContent = document.querySelector(`[href*="#${hash}"]`).textContent;
    }

    const createCart = ({ id, preview, cost, brand, name, sizes }) => {

        const li = document.createElement('li');

        li.classList.add('goods__item');

        li.innerHTML =
            `
                <article class="good">
                    <a class="good__link-img" href="card-good.html#${id}">
                        <img class="good__img" src="goods-image/${preview}" alt="${name}">
                    </a>
                    <div class="good__description">
                        <p class="good__price">${cost} &#8381;</p>
                        <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
                        ${sizes ?
                                  `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>`
                                : '' }
                        
                        <a class="good__link" href="card-good.html#${id}">Подробнее</a>
                    </div>
                </article>
            `;

        return li;
    };

    // const createGoodsTitle = () => {
    //     const goodsSelector = document.querySelector('.goods');
    //     const goodsContainer = goodsSelector.querySelector('.container');
    //     const goodsTitle = document.createElement('h2');
    //     const links = document.querySelectorAll('.navigation__link');
    //     const forWomen = 'Женщинам';
    //     goodsTitle.classList.add('goods__title');
    //     goodsTitle.innerHTML = '';
    //
    //     const renderGoodsTitle = () => {
    //         links.forEach(link => {
    //             link.addEventListener('click', () => {
    //                 goodsTitle.textContent = '';
    //                 goodsTitle.innerHTML = link.innerHTML;
    //                 console.log(link.innerHTML)
    //                 goodsContainer.prepend(goodsTitle)
    //             })
    //         })
    //     }
    //     renderGoodsTitle(createGoodsTitle)
    // }
    // createGoodsTitle();

    const renderGoodsList = data => {
        goodsList.textContent = ``;

        data.forEach( item => {
            const card = createCart(item);
            goodsList.append(card);
        })
    };
    window.addEventListener('hashchange', () => {
        hash = location.hash.substring(1)
        getGoods(renderGoodsList, 'category', hash)
        changeTitle();
    })

    changeTitle();
    getGoods(renderGoodsList, 'category', hash)

} catch (error) {
    console.warn(error)
}

//  listeners
headerCityButton.addEventListener('click', () => {
    const city = prompt('Укажите ваш город:');
    headerCityButton.textContent = city;
    localStorage.setItem('lomodaLocation', city)
});

cartBtnOpen.addEventListener('click', cartModalOpen);

cartOverlay.addEventListener('click', el => {
    const target = el.target;
    if (target.classList.contains('cart__btn-close') || target.matches('.cart-overlay')) {
        cartModalClose();
    }
})

// Страница категорий
try {

} catch (err) {
    console.warn(err)
}

// Страница товара

try {

    if (!document.querySelector('.card-good')) {
        throw 'This is not a card-good page'
    }



} catch (err) {
    console.warn(err)
}
