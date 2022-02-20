function main(ratio, threshold, target, autoplay) {
  let delay = null

  const observer = new IntersectionObserver((elements) => {
    clearTimeout(delay)
    delay = setTimeout(() => {
      elements.forEach(element => {
        if (target.paused && autoplay && element.intersectionRatio > ratio)
          target.play()
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
  main(0.6, [0.55, 0.65], video, autoplay)
})