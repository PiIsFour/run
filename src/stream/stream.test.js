import stream from './stream'

describe('stream', () => {
	it('creates a stream', () => {
		const mock = jest.fn()
		let event = () => {}
		stream((stream) => {
			event = value => stream.push(value)
		})
			.map(v => v - 1)
			.map(mock)
		event(43)
		expect(mock).toBeCalledWith(42)
	})
})
