import {gpsStream} from './gps'

describe('gps', () => {
	it('returns a stream with gps position updates', () => {
		const geolocationMock = {
			watchPosition: jest.fn()
		}
		const mock = jest.fn()
		gpsStream(geolocationMock)
			.map(mock)
		expect(geolocationMock.watchPosition).toBeCalled()
		const pos = {}
		geolocationMock.watchPosition.mock.calls[0][0](pos)
		expect(mock).toBeCalledWith(pos)
	})

	it('stream gps position errors', () => {
		const geolocationMock = {
			watchPosition: jest.fn()
		}
		const mock = jest.fn()
		gpsStream(geolocationMock)
			.catch(mock)
		expect(geolocationMock.watchPosition).toBeCalled()
		const error = {}
		geolocationMock.watchPosition.mock.calls[0][1](error)
		expect(mock).toBeCalledWith(error)
	})
})
