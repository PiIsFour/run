import React, { Component } from 'react'
import './App.css'

import {gpsStream} from './gps/gps'

function Pos ({pos}) {
	return <div>
		{Object.entries(pos).map(([key, value]) => <span key={key}>{key}: {value}</span>)}
	</div>
}

class App extends Component {
	constructor (props) {
		super(props)
		this.state = {pos: []}
	}
	render () {
		let north = 0
		let east = 0
		if (this.state.pos.length > 0) {
			const u = 40000000
			const first = this.state.pos[0]
			const last = this.state.pos[this.state.pos.length - 1]
			north = (last.lat - first.lat) * u / 360
			east = (last.lon - first.lon) * u / 360 * Math.cos(first.lat * Math.PI / 180)
		}
		return (
			<div className="App">
				{this.state.pos.map((p, index) => <Pos pos={p} key={index}/>)}
				<div><span>north: {north}m</span><span>east: {east}m</span></div>
			</div>
		)
	}
	componentDidMount () {
		const s = gpsStream(this.props.geolocation)
			.map(p => ({
				lat: p.coords.latitude,
				lon: p.coords.longitude,
				accuracy: p.coords.accuracy,
				date: new Date(p.timestamp).toLocaleString()
			}))
		s.map(p => {
			this.setState({pos: [...this.state.pos, p]})
			s.map(next => ({
				...next
			}))
				.map(p => this.setState({pos: [...this.state.pos, p]}))
			return 0
		})
	}
}

export default App
