const API_URL = 'js/products.json';

const vue = new Vue ({
	el: '#main',
	data: {
		goods: [],
		filteredGoods: [],
		search: '',
		cart: JSON.parse(localStorage.getItem('cart')),
		isCartShow: false
	},
	methods: {
		searchHandler() {
			if(this.search === ''){
				this.filteredGoods = this.goods;
			}
			const regexp = new RegExp(this.search, 'gi');
			this.filteredGoods = this.goods.filter((good) => regexp.test(good.title));
		},
        fetch(error, success) {
            let xhr;
            if(window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            }else if(window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4){
                    success(JSON.parse(xhr.responseText));
                }else if(xhr.status > 400) {
                    error('Somsing went wrong');
                }
            }

            xhr.open('GET', API_URL, true);
            xhr.send();
        },
        fetchPromise() {
            return new Promise((resolve, reject) => {
                this.fetch(reject, resolve)
            })
        },
		addToCart(element){
			const itemIndex = element.target.dataset.index;
			const cartItem = this.filteredGoods[itemIndex];
			if (this.cart) {
				cartItem.id = this.cart.length;
			}else{
				cartItem.id = 0;
				this.cart = [];
			} 
			this.cart.push(cartItem);
			
			localStorage.setItem('cart', JSON.stringify(this.cart) );
		},
		removeFromCart(element){
			const cartItemIndex = element.target.dataset.index;
			const indexInCart = this.cart.findIndex(i => i.id == cartItemIndex); //поиск по объекту меняешь id на любое название и вперед
			this.cart.splice(indexInCart, 1);
			localStorage.setItem('cart', JSON.stringify(this.cart) );
		},
		showCart(){
			this.isCartShow = !this.isCartShow;
		}
	},
    mounted: function() {
        this.fetchPromise()
        .then(data => {
            this.goods = data;
            this.filteredGoods = data;
        })
        .catch(err =>{
            console.log(err);
        })
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
})