const goods = [
    { title: 'Jacket', price: 52, description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", img: 'img/prod1.jpg', link: '#' },
    { title: 'Shoes', price: 250, description: "Tempora sed aperiam id quo atque rem ducimus alias odit tenetur. Alias?", img: 'img/prod2.jpg', link: '#' },
    { title: 'Shorts', price: 70, description: "Tempora sed aperiam id quo atque rem ducimus alias odit tenetur. Alias?", img: 'img/prod3.jpg', link: '#' },
    { title: 'Pants', price: 150, description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", img: 'img/prod4.jpg', link: '#' },
    { title: 'Blouse', price: 90, description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", img: 'img/prod5.jpg', link: '#' },
    { title: 'T-short', price: 120, description: "Tempora sed aperiam id quo atque rem ducimus alias odit tenetur. Alias?", img: 'img/prod6.jpg', link: '#' },
];


const $goodsList = document.querySelector('#featured-homepage__products-list');
  
const renderGoodsItem = ({ title, price, img, link, description }) => {
    // return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
    return `
    <li class="featured-homepage__product-card">
        <a class="link" href="${link}">
            <img src="${img}" alt="product">
            <div class="text-block">
                <h5>${title}</h5>
                <p class="description">${description}</p>
                <span class="price pink">$${price}</span>
            </div>
        </a>
    </li>`;
};
  
const renderGoodsList = (list = goods) => {
    let goodsList = list.map(
            item => renderGoodsItem(item)
        ).join('');

    $goodsList.insertAdjacentHTML('beforeend', goodsList);
}
  
renderGoodsList();