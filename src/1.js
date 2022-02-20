window.addEventListener('load', () => {

  const video = document.querySelector('body video')
  const threshold = [ 0.45, 0.55 ]

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
