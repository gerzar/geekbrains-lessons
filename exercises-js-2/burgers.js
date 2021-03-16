// ### Маленький (50 рублей, 20 калорий).
// ### Большой (100 рублей, 40 калорий). ### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// ### С сыром (+10 рублей, +20 калорий).
// ### С салатом (+20 рублей, +5 калорий).
// ### С картофелем (+15 рублей, +10 калорий). 
// ### Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) 
// и полить майонезом (+20 рублей, +5 калорий). 
// ### 3Напишите программу, рассчитывающую стоимость и калорийность гамбургера. 
// Можно использовать примерную архитектуру класса из методички, но можно использовать и свою.

class Api{
	constructor() {

	}

	burgersArray() {
		return [
			{burgerId: 0, burgerTitle: 'Маленький', burgerPrice: 50, burgerStuffing: 20, },
			{burgerId: 1, burgerTitle: 'Большой', burgerPrice: 100, burgerStuffing: 40, },
		];
	}

	toppingsArray() {
		return [
			{toppingId: 0, toppingTitle: 'C сыром', toppingPrice: 10, toppingStuffing: 20,},
			{toppingId: 1, toppingTitle: 'С салатом', toppingPrice: 20, toppingStuffing: 5,},
			{toppingId: 2, toppingTitle: 'С картофелем', toppingPrice: 15, toppingStuffing: 10,},
			{toppingId: 3, toppingTitle: 'Приправа', toppingPrice: 15, toppingStuffing: 0,},
			{toppingId: 4, toppingTitle: 'Майонез', toppingPrice: 20, toppingStuffing: 5,},
		];
	}

	complexArray() {
		let burgersArray = this.burgersArray();
		let toppingsArray = this.toppingsArray();
		let complexArray = [];
		burgersArray.forEach((complexItem) => {
			complexItem.toppings = toppingsArray;
			complexArray.push(complexItem);
		});
		return complexArray;
	}
}

class BurgerItem {
	constructor(burgerId, burgerTitle, burgerPrice, burgerStuffing, toppings) {
		this.burgerId = burgerId;
		this.burgerTitle = burgerTitle;
		this.burgerPrice = burgerPrice;
		this.burgerStuffing = burgerStuffing;
		this.toppings = toppings;
	}

	getHtml() {
		let toppingsHTML = '';
		this.toppings.forEach((topping) => {
			toppingsHTML += `<p class="topping" onclick="burger.addTopping(this)" toppingid="${topping.toppingId}"> Название топпинга: ${topping.toppingTitle} <br> Цена топпинга ${topping.toppingPrice} <br> Калорийность топпинга ${topping.toppingStuffing} <br> </p>`; 
		});
		return `<div class="stuff"> 
			<p class="burder" onclick="burger.addTopping(this)" burgerid="${this.burgerId}">
			Name: ${this.burgerTitle} <br> 
			Price: ${this.burgerPrice} <br>
			stuffing: ${this.burgerStuffing} <br>
			</p>
			Toppings <br>
			${toppingsHTML}
			</div>
		`;
	}
}

class Hamburger {
	constructor(size, stuffing, price) {
		this.api = new Api;
		this.$mainBlock = document.querySelector('#main-block');
		this.$cartBlock = document.querySelector('#cart-block');
		this.$stuffing = document.querySelector('#stuffing');
		this.$price = document.querySelector('#price');

		this.goods = [];
		this.cart = [];
	}
	addTopping(topping) {
		let burgerID = topping.getAttribute("burgerid");
		let toppingID;
		let cartView;

		if (!burgerID) {
			toppingID = topping.getAttribute("toppingid");
			this.cart.push(api.toppingsArray()[toppingID]);
			cartView = `<p class="toppingView" onclick="burger.removeTopping(this)" carttoppingid="${this.cart.length-1}">Название ${api.toppingsArray()[toppingID].toppingTitle} <br>Цена ${api.toppingsArray()[toppingID].toppingPrice} <br>Калорийность ${api.toppingsArray()[toppingID].toppingStuffing}</p>`;
			this.$cartBlock.insertAdjacentHTML('beforeend', cartView );
		}else{
			this.cart.push(api.burgersArray()[burgerID]);
			cartView = `<p class="toppingView" onclick="burger.removeTopping(this)" carttoppingid="${this.cart.length-1}">Название ${api.burgersArray()[burgerID].burgerTitle} <br>Цена ${api.burgersArray()[burgerID].burgerPrice} <br>Калорийность ${api.burgersArray()[burgerID].burgerStuffing}</p>`;
			this.$cartBlock.insertAdjacentHTML('beforeend', cartView );
		}
		this.calculateCalories();
		this.calculatePrice();
	}
	removeTopping(topping) { 
		let cartToppingId = topping.getAttribute("carttoppingid");
		this.cart.splice(cartToppingId, 1);
		topping.remove();
		this.calculateCalories();
		this.calculatePrice();
	}
	calculateCalories() {   
		let stuffingCount = 0;
		this.cart.forEach((cartItem) => {
			if (cartItem.burgerStuffing) {
				stuffingCount = stuffingCount + cartItem.burgerStuffing;
			}else{
				stuffingCount = stuffingCount + cartItem.toppingStuffing;
			}
		});
		this.$stuffing.innerHTML = '<b>Итоговая калорийность: </b>'+stuffingCount + ' ккал';
	}
	calculatePrice() {    
		let stuffingCount = 0;
		this.cart.forEach((cartItem) => {
			if (cartItem.burgerPrice) {
				stuffingCount = stuffingCount + cartItem.burgerPrice;
			}else{
				stuffingCount = stuffingCount + cartItem.toppingPrice;
			}
		});
		this.$price.innerHTML = '<b>Итоговая сумма: </b>'+stuffingCount + ' рублей';
	}

	fetchGoods() {
        this.goods = this.api.complexArray().map( ({burgerId, burgerTitle, burgerPrice, burgerStuffing, toppings}) => new BurgerItem(burgerId, burgerTitle, burgerPrice, burgerStuffing, toppings) );
    }

    render() {
        this.$mainBlock.textContent = '';
        this.goods.forEach((good) => {
            this.$mainBlock.insertAdjacentHTML('beforeend', good.getHtml());
        });
    }

}

const api = new Api();

const burger = new Hamburger();
api.complexArray();
burger.fetchGoods();
burger.render();