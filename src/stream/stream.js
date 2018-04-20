class Stream {
	constructor () {
		this.push = () => {}
	}
	map (cb) {
		const s = new Stream()
		this.push = value => s.push(cb(value))
		return s
	}
}

export default function createStream (creator) {
	const s = new Stream()
	creator(s)
	return s
}
