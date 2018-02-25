import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import mockData from '../mockdata.json';
import App from '../App';


describe('Component Count: App page', () => {
	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<App />, div);
	  ReactDOM.unmountComponentAtNode(div);
	});

	it('renders 1 <App /> component', () => {
		const appPage = shallow(<App/>);
		expect(appPage.length).toEqual(1);
	});

	it('renders 1 <result /> component', () => {
		const wrapper = shallow(<App/>);
		const result = wrapper.find('#results');
		// console.log("result:" + result.length);
		expect(result.length).toEqual(1);
	});

	it('renders 1 <saved /> component', () => {
		const wrapper = shallow(<App/>);
		const saved = wrapper.find('#saved');
		// console.log("saved:" + saved.length);
		expect(saved.length).toEqual(1);
	});
});

describe('Mouse over events: App page', () => {
	it('Default show 0 button', () => {
		const wrapper = shallow(<App/>);
		// console.log(wrapper.find('button').length);
		expect(wrapper.find('button').length).toEqual(0);
	});

	// ReactTestUtils.Simulate.mouseOver not available!
	it('Mouse over show button in result', () => {
		const wrapper = shallow(<App/>);
		const mockId = mockData["results"][0].id;

		// skip mouse over event
		wrapper.setState({showAddButton : mockId});
		expect(wrapper.find('Button').length).toEqual(1);

		const domId = '#box' + mockId;
		const box = wrapper.find(domId);
		expect(box.find('Button').length).toEqual(1);
	});

	// ReactTestUtils.Simulate.mouseOver not available!
	it('Mouse over show button in saved', () => {
		const wrapper = shallow(<App/>);
		const mockId = mockData["saved"][0].id;

		// skip mouse over event
		wrapper.setState({showRemoveButton : mockId});
		expect(wrapper.find('Button').length).toEqual(1);

		const domId = '#box' + mockId;
		const box = wrapper.find(domId);
		expect(box.find('Button').length).toEqual(1);
	});
});


describe('Mouse click events: add property', () => {
	it('Mouse click add property button in result, saved +1', () => {
		const wrapper = shallow(<App/>);
		const boxesNum0 = wrapper.find(".save").find(".box").length;

		const mockId = mockData["results"][0].id;
		wrapper.setState({showAddButton : mockId});

		const btn = wrapper.find("Button").at(0);
		btn.simulate('click');
		const boxesNum1 = wrapper.find(".save").find(".box").length;
		expect(boxesNum1).toEqual(boxesNum0 + 1);
	});

	it('Try Mouse click twice on add property button in result, saved stay same', () => {
		const wrapper = shallow(<App/>);
		const boxesNum0 = wrapper.find(".save").find(".box").length;

		const mockId = mockData["results"][0].id;
		wrapper.setState({showAddButton : mockId});

		const btn = wrapper.find("Button").at(0);
		btn.simulate('click');
		const boxesNum1 = wrapper.find(".save").find(".box").length;

		btn.simulate('click');
		const boxesNum2 = wrapper.find(".save").find(".box").length;
		expect(boxesNum1).toEqual(boxesNum2);
	});

	it('Mouse click on add property, button change to disable', () => {
		const wrapper = shallow(<App/>);
		const mockId = mockData["results"][0].id;
		wrapper.setState({showAddButton : mockId});

		const btn = wrapper.find("Button").at(0);

		btn.simulate('click');
		const btnAddNew = wrapper.find("Button").at(0);
		expect(btnAddNew.find(".disable").length).toEqual(1);
	});
});


describe('Mouse click events: remove property', () => {

	it('Mouse click remove property button, saved elements -1', () => {
		const wrapper = shallow(<App/>);
		const mockId = mockData["saved"][0].id;
		wrapper.setState({showRemoveButton : mockId});

		const btn = wrapper.find("Button").at(0);
		const boxesNum0 = wrapper.find(".save").find(".box").length;
		// expect(wrapper.find(".disabled").length).toEqual(0);

		btn.simulate('click');
		const boxesNum1 = wrapper.find(".save").find(".box").length;
		expect(boxesNum0).toEqual(boxesNum1 + 1);
	});

	it('Mouse click remove property button, update the saved btn in result list', () => {
		const wrapper = shallow(<App/>);
		const mockId = mockData["results"][0].id;
		wrapper.setState({showAddButton : mockId});
		expect(wrapper.find(".disable").length).toEqual(0);

		// Click on the add button in Result list
		const btnAdd = wrapper.find(".result").find("Button").at(0);
		btnAdd.simulate('click');
		expect(wrapper.find(".disable").length).toEqual(1);

		// Click on the remove btn in saved list
		wrapper.setState({showRemoveButton : mockId});
		const btnRemove = wrapper.find(".save").find("Button").at(0);
		btnRemove.simulate('click');

		// Check the disable btn number
		expect(wrapper.find(".disable").length).toEqual(0);
	});
});








