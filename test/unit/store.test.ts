import {initStore} from '../../src/client/store';
import {CartApi, ExampleApi} from "../../src/client/api";
import 'jest-localstorage-mock';
import {CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo} from "../../src/common/types";
import {AxiosResponse} from "axios";

const getProduct = (id: number): Product => {
	return {
		id,
		name: 'Тестовый продукт номер ' + id,
		price: 10*id,
		description: 'Какое-то описание',
		material: 'Пластик',
		color: 'Черный',
	}
}

const getProductShortInfo = (id: number): ProductShortInfo => {
	return {
		id,
		name: 'Тестовый продукт номер ' + id,
		price: 10*id
	}
}

class MockApi extends ExampleApi {
	async getProducts() {
		return {data: [
			getProductShortInfo(1),
			getProductShortInfo(2),
			getProductShortInfo(3),
			getProductShortInfo(4),
			getProductShortInfo(5)
		]} as AxiosResponse<ProductShortInfo[]>;
	}

	async getProductById(id: number) {
		return {data: getProduct(id)} as AxiosResponse<Product>;
	}

	async checkout(form: CheckoutFormData, cart: CartState) {
		return {data: {id : 12345}} as AxiosResponse<CheckoutResponse>;
	}
}

const store = initStore(new MockApi(''), new CartApi());

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

	it('Loaded Product', async () => {
		await store.dispatch({type: 'PRODUCT_DETAILS_LOAD', id: 10});
		expect({10: getProduct(10)}).toStrictEqual(store.getState().details);
	});

	it('Checkout', async () => {

		const product = {
			id: 2,
			name: 'bbb',
			price: 200,
			description: '',
			material: '',
			color: ''
		};

		await store.dispatch({type: 'ADD_TO_CART', product: product});

		await store.dispatch({type: 'CHECKOUT', form: {name: '', phone: '', address: ''}, cart: store.getState().cart});

		expect(12345).toStrictEqual(store.getState().latestOrderId);
	});
});