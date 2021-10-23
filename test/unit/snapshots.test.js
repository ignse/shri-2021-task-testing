/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import {ProductDetails} from '../../src/client/components/ProductDetails';
import {CartApi, ExampleApi} from '../../src/client/api';
import {initStore} from '../../src/client/store';
import {Provider} from 'react-redux';
import {ProductItem} from '../../src/client/components/ProductItem';
import { BrowserRouter } from 'react-router-dom';
import {CartBadge} from '../../src/client/components/CartBadge';
import {Form} from '../../src/client/components/Form';
import {Contacts} from '../../src/client/pages/Contacts';
import {Delivery} from '../../src/client/pages/Delivery';
import {Home} from '../../src/client/pages/Home';
import {Catalog} from '../../src/client/pages/Catalog';
import {Route} from 'react-router';
import {Cart} from '../../src/client/pages/Cart';

const api = new ExampleApi('');
const cart = new CartApi();
const store = initStore(api, cart);

it('renders correctly ProductDetails', () => {
	const product = {
		id: 2,
		name: 'bbb',
		price: 200,
		description: '',
		material: '',
		color: ''
	};

	const tree = renderer
		.create( <Provider store={store}><ProductDetails product={product} /></Provider>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('renders correctly ProductItem', () => {
	const product = {
		id: 2,
		name: 'bbb',
		price: 200,
		description: '',
		material: '',
		color: ''
	};

	const tree = renderer
		.create(  <BrowserRouter basename={'/'}><Provider store={store}><ProductItem product={product} /></Provider></BrowserRouter>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('renders correctly Form', () => {
	const tree = renderer
		.create(  <Form onSubmit={() => {}} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('renders correctly Contacts', () => {
	const tree = renderer
		.create( <Contacts />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('renders correctly Delivery', () => {
	const tree = renderer
		.create( <Delivery />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('renders correctly Home', () => {
	const tree = renderer
		.create( <Home />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it('renders correctly Catalog', () => {
	const products = [
		{
		id: 111,
		name: 'aaaa',
		description: 'aaaa desc',
		price: 555,
		color: 'black',
		material: 'metal',
		},
		{
			id: 222,
			name: 'bbb',
			description: 'bbb desc',
			price: 1555,
			color: 'white',
			material: 'plastic',
		}
	];

	store.dispatch({type: 'PRODUCTS_LOADED', products: products});

	const tree = renderer
		.create(<BrowserRouter path="/catalog" exact><Provider store={store}><Catalog /></Provider></BrowserRouter>)
		.toJSON();
	expect(tree).toMatchSnapshot();
});