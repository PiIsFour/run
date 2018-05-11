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

	it('pushed errors do not show up in map', () => {
		const mock = jest.fn()
		let event = () => {}
		stream((stream) => {
			event = value => stream.pushError(value)
		})
			.map(v => v - 1)
			.map(mock)
		const error = 'ERROR: Sorry something wrong happend'
		event(error)
		expect(mock).not.toBeCalled()
	})

	it('pushed errors show up in catch', () => {
		const mock = jest.fn()
		let event = () => {}
		stream((stream) => {
			event = value => stream.pushError(value)
		})
			.map(v => v - 1)
			.catch(mock)
		const error = 'ERROR: Sorry something wrong happend'
		event(error)
		expect(mock).toBeCalledWith(error)
	})

	it('redirects errors thrown inside map', () => {
		const mock = jest.fn()
		let event = () => {}
		const error = new Error('ERROR: Sorry something wrong happend')
		stream((stream) => {
			event = value => stream.push(value)
		})
			.map(v => {
				throw error
			})
			.catch(mock)
		event(42)
		expect(mock).toBeCalledWith(error)
	})

	it('allows errors to be rethrown inside catch', () => {
		const mock = jest.fn()
		let event = () => {}
		const error = new Error('ERROR: Sorry something wrong happend')
		stream((stream) => {
			event = value => stream.push(value)
		})
			.map(v => {
				throw error
			})
			.catch(e => {
				throw e
			})
			.catch(mock)
		event(42)
		expect(mock).toBeCalledWith(error)
	})

	it('closes the stream', () => {
		const mock = jest.fn()
		const s = stream((stream) => {
			return mock
		})
		expect(mock).not.toBeCalled()
		s.close()
		expect(mock).toBeCalled()
	})

	it('closes the stream from downstream', () => {
		const mock = jest.fn()
		const s = stream((stream) => {
			return mock
		}).map(x => x)
			.catch(() => {})
		expect(mock).not.toBeCalled()
		s.close()
		expect(mock).toBeCalled()
	})
})
