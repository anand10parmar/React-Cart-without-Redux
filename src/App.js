import React, {Component} from 'react';
import './App.css';
import 'h8k-components';
import ProductList from "./components/product-list";
import Cart from "./components/cart";

const title = "HackerShop";

class App extends Component {
    constructor() {
        super();
        const products = [...PRODUCTS].map((product, index) => {
            product.id = index + 1;
            product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
            product.cartQuantity = 0;
            return product;
        });
        this.state = {
            cart: {
                items: []
            },
            products
        }
        this.addOne = this.addOne.bind(this);
        this.removeOne = this.removeOne.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    addOne(product) {
        const elementsIndex = this.state.cart.items.findIndex(element => element.id === product.id)
        let cartItems = [...this.state.cart.items]
        cartItems[elementsIndex] = { ...cartItems[elementsIndex], quantity: cartItems[elementsIndex].quantity + 1 }

        const elementsIndexPro = this.state.products.findIndex(element => element.id === product.id)
        let productItems = [...this.state.products]
        productItems[elementsIndexPro] = { ...productItems[elementsIndexPro], cartQuantity: productItems[elementsIndexPro].cartQuantity + 1 }

        this.setState({
            cart: {
                items: [...cartItems]
            },
            products: [...productItems]
        })
    }

    removeOne(product) {
        const elementsIndex = this.state.cart.items.findIndex(element => element.id === product.id)
        let cartItems = [...this.state.cart.items]
        cartItems[elementsIndex] = { ...cartItems[elementsIndex], quantity: cartItems[elementsIndex].quantity - 1 }

        const elementsIndexPro = this.state.products.findIndex(element => element.id === product.id)
        let productItems = [...this.state.products]
        productItems[elementsIndexPro] = { ...productItems[elementsIndexPro], cartQuantity: productItems[elementsIndexPro].cartQuantity - 1 }

        //condition when quantity is one
        cartItems = cartItems.filter((el)=> { return (product.cartQuantity === 1&& product.id === el.id)?el.quantity > 1 :cartItems });

        this.setState({
            cart: {
                items: [...cartItems]
            },
            products: [...productItems]
        })
    }

    addToCart(product) {
        const cartItems = [{ id: product.id, item: product.name, quantity: product.cartQuantity + 1 }]
        product.cartQuantity++

        this.setState({
            cart: {
                items: [...this.state.cart.items, ...cartItems]
            },
            products: [...this.state.products]
        })

    }

    render() {
        return (
            <div>
                <h8k-navbar header={title}></h8k-navbar>
                <div className="layout-row shop-component">
                    <ProductList
                        cart={this.state.cart}
                        products={this.state.products}
                        addOne={this.addOne}
                        removeOne={this.removeOne}
                        addToCart={this.addToCart} />
                    <Cart cart={this.state.cart} />
                </div>
            </div>
        );
    }
}

export const PRODUCTS = [
    {
        name: "Cap",
        price: 5
    },
    {
        name: "HandBag",
        price: 30
    },
    {
        name: "Shirt",
        price: 35
    },
    {
        name: "Shoe",
        price: 50
    },
    {
        name: "Pant",
        price: 35
    },
    {
        name: "Slipper",
        price: 25
    }
];
export default App;
