import stream from '../stream/stream'

export function gpsStream (geolocation) {
	return stream(s => {
		const id = geolocation.watchPosition(pos => s.push(pos),
			error => s.pushError(error),
			{
				enableHighAccuracy: true,
				// timeout: 5000,
				maximumAge: 0
			})
		return () => {
			geolocation.clearWatch(id)
		}
	})
}
