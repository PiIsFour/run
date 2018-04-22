class Stream {
	constructor () {
		this.push = () => {}
		this.pushError = () => {}
	}
	map (cb) {
		const s = new Stream()
		this.push = value => {
			try {
				return s.push(cb(value))
			} catch (error) {
				s.pushError(error)
			}
		}
		this.pushError = error => s.pushError(error)
		return s
	}
	catch (cb) {
		const s = new Stream()
		this.push = value => s.push(value)
		this.pushError = error => {
			try {
				cb(error)
			} catch (error) {
				s.pushError(error)
			}
		}
		return s
	}
}

export default function createStream (creator) {
	const s = new Stream()
	creator(s)
	return s
}
