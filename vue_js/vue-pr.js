const vue = new Vue({
	el: '#vue',
	data: {
		search: '',
		filteredArray: [],
		cart: JSON.parse(localStorage.getItem('cartLS')),
		getProductsArray: [
				{name: 'Short', price: 22, description: 'loremlorem lorem lorem lorem lorem lorem lorem  '},
				{name: 'T-Short', price: 232, description: 'asdfasdf asdfasdf lorem lorem lorem lorem lorem lorem  '},
				{name: 'Pants', price: 123, description: 'loremorem lorem lorem lorem lorem  '},
				{name: 'Shoes', price: 522, description: 'loremlorem lorem lorem  '},
			]
	},
	methods: {
		insertToVue(){
			return this.name;
		},
		addToCart(element){
			const itemIndex = element.target.dataset.index;
			const cartItem = this.filteredArray[itemIndex];
			if (this.cart) {
				cartItem.id = this.cart.length;
			}else{
				cartItem.id = 0;
				this.cart = [];
			} 
			this.cart.push(cartItem);
			
			localStorage.setItem('cartLS', JSON.stringify(this.cart) );
		},
		removeFromCart(element){
			const cartItemIndex = element.target.dataset.index;
			const indexInCart = this.cart.findIndex(i => i.id == cartItemIndex); //поиск по объекту меняешь id на любое название и вперед
			this.cart.splice(indexInCart, 1);
			localStorage.setItem('cartLS', JSON.stringify(this.cart) );
		},
		filterProducts(){
			if(this.search === ''){
				this.filteredArray = this.getProductsArray;
			}else{
				const regex = new RegExp(this.filter, 'gi');
				let productArray = this.getProductsArray;

				this.filteredArray = productArray.filter((good) => regex.test(good.name));
			}
		}
	},
	computed: {
		getSummInCart: function(){
			if (this.cart) {
				const totalSumm = this.cart.reduce((partial_sum, {price}) => partial_sum + price, 0); //для подсчета суммы в массиве объектов
				return totalSumm;
			}else{
				return 0;
			}	
		}
	}
});