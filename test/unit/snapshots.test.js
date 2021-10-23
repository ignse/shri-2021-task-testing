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

it('renders correctly CartBadge', () => {
	const tree = renderer
		.create(  <Provider store={store}><CartBadge id={111} /></Provider>)
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