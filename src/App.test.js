import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import enzymeToJson from 'enzyme-to-json'

import App from './App'

describe('app', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div')
		ReactDOM.render(<App />, div)
		ReactDOM.unmountComponentAtNode(div)
	})

	it('snapshot matches', () => {
		const wrapper = shallow(<App />)
		expect(enzymeToJson(wrapper)).toMatchSnapshot()
	})
})
