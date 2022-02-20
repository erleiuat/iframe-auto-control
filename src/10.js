window.addEventListener('load', () => {

  const video = document.querySelector('body video')
  const threshold = [ 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0 ]

  let paused = false
  const observer = new IntersectionObserver(elements => {
    elements.forEach(element => {
      if (element.intersectionRatio < 0.5 && !video.paused) {
        video.pause()
        paused = true
      } else if (paused) {
        video.play()
        paused = false
      }
    })
  }, {
    threshold : threshold,
    root      : null,
  })

  observer.observe(video)

})
