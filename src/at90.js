function main(ratio, threshold, target, autoplay) {
  let delay = null

  const observer = new IntersectionObserver((elements) => {
    clearTimeout(delay)
    delay = setTimeout(() => {
      elements.forEach(element => {
        if (target.paused && autoplay && element.intersectionRatio > ratio)
          target.play().catch(error => {})
        else if (!target.paused && element.intersectionRatio < ratio)
          target.pause()
      })
    }, 150)
  }, {
    threshold: threshold,
    root: null,
  })

  observer.observe(target)
}

window.addEventListener('load', () => {
  const video = document.querySelector('body video')
  const autoplay = video.autoplay
  video.autoplay = false
  main(0.9, [0.85, 0.95], video, autoplay)
})