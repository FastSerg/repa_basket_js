import {
  cartPrice,
  cartCounter,
  numberDevice,
  priceDevice,
} from './main.js';

export const btnCart = document.querySelector('#cart');
const hiddenClass = 'hidden';

const createElem = ({
  type,
  attrs, 
  container = null, 
  evt = null, 
  handler = null, 
  position = 'append'
}) => {
 const el = document.createElement(type);
  
  Object.keys(attrs).forEach((key) => {

   if(key !== 'innerHTML') el.setAttribute(key, attrs[key]);
   else el.innerHTML = attrs[key];
  })
  
  if(container && position === 'append') container.append(el);
  if(container && position === 'prepend') container.prepend(el);
  
  return el
};

export const createBasket = () => {

   createElem({
    type: 'div',
    attrs: {
      class: `${hiddenClass} basket`,
      id: 'basket'
    },
    container: btnCart
   })
   
};

export const btnClickCart = () => {
  const basket = document.querySelector('#basket');
  basket.classList.toggle(hiddenClass);
  basket.matches('.hidden')? clearBasket() : createCounterBasket();

};

const clearBasket = () => {
  document.querySelector('.totalSum').remove();
  document.querySelector('.priseBasket').remove();
  document.querySelector('.titleBasket').remove();
};

const createCounterBasket = () => {

  createElem({
    type: 'p',
    attrs: {
      class: 'titleBasket',
      innerHTML: `В корзине ${cartCounter} товаров`,
    },
    container: basket,
    position: 'prepend' 
  })

  createElem({
    type: 'div',
    attrs: {
      class: 'priseBasket',
      innerHTML: `${numberDevice} Device Name цена ${priceDevice}$ сумма: `,
    },
    container: basket,  
  });

  createElem({
    type: 'div',
    attrs: {
      class: 'totalSum',
      innerHTML: `Всего в корзине товаров на сумму ${cartPrice.toFixed(2)}$`,
    },
    container: basket,
  });

};

export const createBasketBtn = () => {

  const btnContainer = createElem({
    type: 'div',
    attrs: {class: 'btnContainer'},
    container: basket,
  });

  createElem({
    type: 'button',
    attrs: {
      class: 'btnBasketBuy btn-primery',
      type: 'button',
      innerHTML: 'Продолжить покупки',
    },
    container: btnContainer,
  });

  createElem({
    type: 'button',
    attrs: {
      class: 'btnBasketCleenCart btn-primery',
      type: 'submit',
      innerHTML: 'Очистить корзину',
    },
    container: btnContainer,
  });

  createElem({
    type: 'button',
    attrs: {
      class: 'btnBasketCleenCart btn-primery',
      type: 'button',
      innerHTML: 'Оформить заказ',
    },
    container: btnContainer,
  });
};

export const createStyle = () => {
  createElem({
    type: 'style',
    attrs: {
    innerHTML: `
      .hidden {
        display: none;
      }
      
      .basket {
        position: absolute;
        padding: 10px;
        right: 0;
        top: 80px;
        width: 300px;
        min-height: 200px;
        background: skyblue;
        z-index: 5;
      }
      
      .titleBasket {
        padding: 10px;
        display: flex;
        justify-content: center;
        font-size: 14px;
      }
      
      .btnContainer {
        position: absolute;
        display: flex;
        gap: 5px;
        font-size: 12px;
        padding: 10px;
        bottom: 0;
        left: 0;
      }
      
      .btn-primery {
        color: #fff3cd;
        background: #0056b3;
        border-radius: 7px;
        border: 1px solid #fff3cd;
      }`
    },
    container: document.head       
  })
};