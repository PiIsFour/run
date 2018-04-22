import stream from '../stream/stream'

export function gpsStream (geolocation) {
	return stream(s => {
		geolocation.watchPosition(pos => s.push(pos),
			error => s.pushError(error),
			{
				enableHighAccuracy: true,
				// timeout: 5000,
				maximumAge: 0
			})
	})
}
