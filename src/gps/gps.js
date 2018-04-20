import stream from '../stream/stream'

export function gpsStream (geolocation) {
	return stream(s => geolocation.watchPosition(pos => s.push(pos)))
}
