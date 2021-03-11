// const goods = [
//     { title: 'Jacket', price: 52, description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", img: 'img/prod1.jpg', link: '#' },
//     { title: 'Shoes', price: 250, description: "Tempora sed aperiam id quo atque rem ducimus alias odit tenetur. Alias?", img: 'img/prod2.jpg', link: '#' },
//     { title: 'Shorts', price: 70, description: "Tempora sed aperiam id quo atque rem ducimus alias odit tenetur. Alias?", img: 'img/prod3.jpg', link: '#' },
//     { title: 'Pants', price: 150, description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", img: 'img/prod4.jpg', link: '#' },
//     { title: 'Blouse', price: 90, description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", img: 'img/prod5.jpg', link: '#' },
//     { title: 'T-short', price: 120, description: "Tempora sed aperiam id quo atque rem ducimus alias odit tenetur. Alias?", img: 'img/prod6.jpg', link: '#' },
// ];


// const $goodsList = document.querySelector('#featured-homepage__products-list');
  
// const renderGoodsItem = ({ title, price, img, link, description }) => {
//     return `
//     <li class="featured-homepage__product-card">
//         <a class="link" href="${link}">
//             <img src="${img}" alt="product">
//             <div class="text-block">
//                 <h5>${title}</h5>
//                 <p class="description">${description}</p>
//                 <span class="price pink">$${price}</span>
//             </div>
//         </a>
//     </li>`;
// };
  
// const renderGoodsList = (list = goods) => {
//     let goodsList = list.map(
//             item => renderGoodsItem(item)
//         ).join('');

//     $goodsList.insertAdjacentHTML('beforeend', goodsList);
// }
  
// renderGoodsList();



//classes

class ApiMock {
    constructor() {

    }

    fetch() {
        return [
            { title: 'Jacket', price: 52, description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", img: 'img/prod1.jpg', link: '#' },
            { title: 'Shoes', price: 250, description: "Tempora sed aperiam id quo atque rem ducimus alias odit tenetur. Alias?", img: 'img/prod2.jpg', link: '#' },
            { title: 'Shorts', price: 70, description: "Tempora sed aperiam id quo atque rem ducimus alias odit tenetur. Alias?", img: 'img/prod3.jpg', link: '#' },
            { title: 'Pants', price: 150, description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", img: 'img/prod4.jpg', link: '#' },
            { title: 'Blouse', price: 90, description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", img: 'img/prod5.jpg', link: '#' },
            { title: 'T-short', price: 120, description: "Tempora sed aperiam id quo atque rem ducimus alias odit tenetur. Alias?", img: 'img/prod6.jpg', link: '#' },
        ];
    }
}

class GoodsItem {
    constructor(title, price, description, img, link) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.link = link;
        this.description = description;
    }

    getHtml() {
        return `
        <li class="featured-homepage__product-card">
            <a class="link" href="${this.link}">
                <img src="${this.img}" alt="product">
                <div class="text-block">
                    <h5>${this.title}</h5>
                    <p class="description">${this.description}</p>
                    <span class="price pink">$${this.price}</span>
                </div>
            </a>
        </li>`;
    }
}

class GoodsList {
    constructor() {
        this.api = new ApiMock();
        this.$goodsList = document.querySelector('#featured-homepage__products-list');
        this.goods = [];
    }

    fetchGoods() {
        this.goods = this.api.fetch().map( ({title, price, description, img, link}) => new GoodsItem(title, price, description, img, link) );
    }

    render() {
        this.$goodsList.textContent = '';
        this.goods.forEach((good) => {
            this.$goodsList.insertAdjacentHTML('beforeend', good.getHtml());
        });
    }

    totalSumm() { //задание номер 2
        let totalSummValue = 0;
        this.goods.forEach((good) => {
            totalSummValue += good.price;
        });
        return totalSummValue;
    }
}

//задание 1 начало
class CartList {
    constructor() {

    }

}

class CartItem {
    constructor() {

    }

}
//задание 2 начало


const goodsList = new GoodsList();

goodsList.fetchGoods();
goodsList.render();
console.log(goodsList.totalSumm());