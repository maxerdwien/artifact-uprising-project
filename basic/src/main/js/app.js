'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');


class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {items: []};
	}

	componentDidMount() {
		client({method: 'GET', path: '/api/items'}).done(response => {
			this.setState({items: response.entity._embedded.items});
		});
	}

	addToCart(item, changeAmount) {
		item.numberInCart += changeAmount;

		client({method: 'PUT', path: 'http://localhost:8080/api/items/' + item.id2, entity: item, headers: {'Content-Type': 'application/json'}}).done(response => {
			// retrieving state back from the server is an inefficient way to do things. But it's also more robust.
			this.componentDidMount();
		});
	}

	render() {
		return (
			<div>
				<Store items={this.state.items} addToCart={(item, changeAmount) => this.addToCart(item, changeAmount)}/>
				<Cart items={this.state.items} addToCart={(item, changeAmount) => this.addToCart(item, changeAmount)}/>
			</div>
		)
	}
}

class Store extends React.Component {
	render() {
		const items = this.props.items.map(items =>
			<StoreItem key={items._links.self.href} item={items} addToCart={(item, changeAmount) => this.props.addToCart(item, changeAmount)}/>
		);

		return (
			<div>
				<h3>Store</h3>
				<table>
					<tbody>
						<tr>
							<th>Item</th>
							<th>Price</th>
							<th>Add to Cart</th>
						</tr>
						{items}
					</tbody>
				</table>
			</div>
		)
	}
}

class StoreItem extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.item.itemName}</td>
				<td>{this.props.item.priceInCents / 100}</td>
				<td><button onClick={() => this.props.addToCart(this.props.item, 1)}>Add</button></td>
			</tr>
		)
	}
}

class Cart extends React.Component{

	render() {
		const items = this.props.items.map(items =>
			<CartItem key={items._links.self.href} item={items} addToCart={(item, changeAmount) => this.props.addToCart(item, changeAmount)}/>
		);

		let totalCostInCents = 0;
		for (let i = 0; i < this.props.items.length; i++) {
			totalCostInCents += this.props.items[i].priceInCents * this.props.items[i].numberInCart;
		}

		let anyItemsInCart = false;
		for (let i = 0; i < this.props.items.length; i++) {
			if (this.props.items[i].numberInCart > 0) {
			anyItemsInCart = true;
			break;
			}
		}

		if (anyItemsInCart) {
			return (
				<div>
					<h3>Cart</h3>
					<table>
						<tbody>
							<tr>
								<th>Item</th>
								<th>Price</th>
								<th>Quantity</th>
							</tr>
							{items}
							<tr>
								<td><strong>Total</strong></td>
								<td><strong>{totalCostInCents / 100}</strong></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			)
		}
		else {
			return (
				<div>
					<h3>Cart [Empty]</h3>
				</div>
			)
		}
	}
}

class CartItem extends React.Component{

	render() {
		if (this.props.item.numberInCart == 0) {
			return null;
		} else {
			return (
				<tr>
					<td>{this.props.item.itemName}</td>
					<td>{this.props.item.priceInCents / 100}</td>
					<td>{this.props.item.numberInCart}
					<button onClick={() => this.props.addToCart(this.props.item, -1)}>Less!</button>
					<button onClick={() => this.props.addToCart(this.props.item, 1)}>More!</button></td>
				</tr>
			)
		}
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)
