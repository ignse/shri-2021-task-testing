import {initStore} from '../../src/client/store';
import {CartApi, ExampleApi} from "../../src/client/api";
import 'jest-localstorage-mock';
import {CheckoutFormData} from "../../src/common/types";

const store = initStore(new ExampleApi(''), new CartApi());

describe('Test Case for Reducer', () => {
	it('Add to Cart', () => {

		const product = {
			id: 2,
			name: 'bbb',
			price: 200,
			description: '',
			material: '',
			color: ''
		};

		store.dispatch({type: 'ADD_TO_CART', product: product});

		const expected = {
			2: {
				name: 'bbb',
				count: 1,
				price: 200
			}
		};

		expect(expected).toStrictEqual(store.getState().cart);
	});

	it('Clear Cart', () => {
		store.dispatch({type: 'CLEAR_CART'});
		expect({}).toStrictEqual(store.getState().cart);
	});

	it('Loaded Products', () => {
		const products = [{
			id: 111,
			name: 'aaaa',
			description: '',
			price: 555,
			color: 'black',
			material: '',
		}];

		store.dispatch({type: 'PRODUCTS_LOADED', products: products});
		expect(products).toStrictEqual(store.getState().products);
	});

	it('Checkout Complete', () => {
		store.dispatch({type: 'CHECKOUT_COMPLETE', orderId: 123456});
		expect(123456).toStrictEqual(store.getState().latestOrderId);
	});
});