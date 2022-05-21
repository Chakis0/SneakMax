import _vars from '../_vars';

const catalogeList = document.querySelector('.cataloge__list');
const catalogeMore = document.querySelector('.btn__product');
let prodQuantity = 5;
let dataLength = null;

const normalPrice = (str) => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

if (catalogeList) {
  const loadProducts = (quantity = 5) => {
    fetch('../data/data.json')
      .then((reponse) => {
        return reponse.json();
      })

      .then((data) => {

        dataLength = data.length;

        catalogeList.innerHTML = '';

        for (let i = 0; i < dataLength; i++) {
          if (i < quantity) {
            let item = data[i];
            console.log(item)

            catalogeList.innerHTML += `

            <li class="cataloge-list__item">
            <article class="product">
              <div class="product__image">

                <picture>
                  <source srcset="${item.mainImage}" type="image/avif">
                  <source srcset="${item.mainImage}" type="image/webp">
                  <img class="image" loading="lazy" src="${item.mainImage}" alt="${item.title}">
                </picture>

                <div class="product__btns">
                  <button class="btn-reset product__btn" data-id="${item.id}" aria-label="Показать информацию о товаре">
                    <svg>
                      <use xlink:href="img/sprite.svg#show"></use>
                    </svg>
                  </button>
                  <button class="btn-reset product__btn" aria-label="Добавить товар в корзину">
                    <svg>
                      <use xlink:href="img/sprite.svg#cart"></use>
                    </svg>
                  </button>
                </div>

              </div>
              <h3 class="product__title">${item.title}</h3>
              <span class="product__price">${normalPrice(item.price)} р</span>
            </article> <!-- //.article-1 -->
          </li>

            `;
          }
        }
      });
  };

  loadProducts(prodQuantity);
}
