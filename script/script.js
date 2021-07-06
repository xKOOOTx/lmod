const headerCityButton = document.querySelector('.header__city-button')

headerCityButton.textContent = localStorage.getItem('lomodaLocation') || 'Ваш город?'

headerCityButton.addEventListener('click', () => {
    const city = prompt('Укажите ваш город:');
    headerCityButton.textContent = city;
    localStorage.setItem('lomodaLocation', city)
});


//  модальное окно
const cartOverlay = document.querySelector('.cart-overlay');
const cartBtnOpen = document.querySelector('.subheader__cart');
const cartBtnClose = document.querySelector('.cart__btn-close');
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
cartBtnOpen.addEventListener('click', cartModalOpen);

cartOverlay.addEventListener('click', el => {
    const target = el.target;
    if (target.classList.contains('cart__btn-close') || target.matches('.cart-overlay')) {
        cartModalClose();
    }
})
