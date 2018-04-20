import {gpsStream} from './gps'

describe('gps', () => {
	it('returns a stream with gps position updates', () => {
		const geolocationMock = {
			watchPosition: jest.fn()
		}
		const mock = jest.fn()
		const s = gpsStream(geolocationMock)
		expect(geolocationMock.watchPosition).toBeCalled()
		const pos = {}
		s.map(mock)
		s.push(pos)
		expect(mock).toBeCalledWith(pos)
	})
})
