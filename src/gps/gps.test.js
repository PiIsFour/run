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

	it('stops tracking when the stream is closed', () => {
		const id = 42
		const geolocationMock = {
			watchPosition: jest.fn().mockReturnValue(id),
			clearWatch: jest.fn()
		}
		const s = gpsStream(geolocationMock)
		expect(geolocationMock.clearWatch).not.toBeCalledWith(id)
		s.close()
		expect(geolocationMock.clearWatch).toBeCalledWith(id)
	})
})
