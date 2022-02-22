const parentWindow = window.parent

window.addEventListener('load', () => {
	
	if (window.CustomEvent && typeof window.CustomEvent === 'function') {
		var event = new CustomEvent('my-event', {detail: {some: 'data'}});
	} else {
		var event = document.createEvent('CustomEvent');
		event.initCustomEvent('my-event', true, true, {some: 'data'});
	}
	
	document.body.dispatchEvent(event);
	const video = document.querySelector("video")

	window.addEventListener('message', e => {
		console.log('IFRAME: RECEIVED ', e.data)
		const mute = video.muted
		video.muted = true
		video[e.data]()
		video.muted = mute
	})
	
  for (const key in video)
    if (key.search('on') === 0)
      video.addEventListener(key.slice(2), event => {
        parent.postMessage(event.type, '*');
      })
})