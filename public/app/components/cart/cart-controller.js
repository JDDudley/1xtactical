; (function () {
    angular.module('1x')

        .component('cart', {
            templateUrl: 'app/components/cart/cart.html',
            controller: CartController
        })

    CartController.$inject = ['CartService', 'AuthService', '$scope']

    function CartController(CartService, AuthService, $scope) {

        var $ctrl = this;

        // GET LOGGED IN USER INFO
        let updateUser = (user) => {
            $ctrl.user = user
            update()
        }

        $ctrl.cart = []

        $ctrl.$onInit = function () {
            AuthService.on('USER', updateUser)
            var localCart = JSON.parse(localStorage.getItem('localCart')) || [];
            if (localCart) {
                $ctrl.cart = localCart;
            }
        }

        let update = () => {
            $scope.$evalAsync()
        }

        this.products = []

        // this.store = CartService.getAll((products) => {
        //     console.log(products.data[0].msrp)
        //     this.products = products.data
        //     return this.products
        // })


        this.name = 'My Cart'

        $ctrl.getCartCount = function () {
            return $ctrl.cart.length
        }

        this.calculateMsrp = function () {
            var sum = 0;
            for (var i = 0; i < this.cart.length; i++) {
                var total = this.cart[i].msrp * this.cart[i].quantity;
                sum += total;
            }
            return sum
        }

        this.calculateMembers = function () {
            var sum = 0;
            for (var i = 0; i < this.cart.length; i++) {
                var total = this.cart[i].memberPrice * this.cart[i].quantity;
                sum += total;
            }
            return sum
        }

        this.calculateNonMembers = function () {
            var sum = 0;
            for (var i = 0; i < this.cart.length; i++) {
                var total = this.cart[i].nonMemberPrice * this.cart[i].quantity;
                sum += total;
            }
            return sum
        }

        this.removeProductFromCart = function (product) {
            for (var i = 0; i < this.cart.length; i++) {
                var productToDrop = this.cart[i];
                if (productToDrop == product) {
                    this.cart.splice(i, 1)
                }
            }
            localStorage.setItem('localCart', JSON.stringify(this.cart))
            return this.cart
        }

        this.addProductToCart = function (product) {
            var newProduct = {
                quantity: 1,
                name: product.name,
                description: product.description,
                specs: product.specs,
                reviews: product.reviews,
                msrp: product.msrp,
                memberPrice: product.memberPrice,
                nonMemberPrice: product.nonMemberPrice
            }
            this.cart.push(newProduct)
            localStorage.setItem('localCart', JSON.stringify(this.cart));
        }
    }

} ());