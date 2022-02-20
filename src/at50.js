function main(ratio, threshold, target) {
  let delay = null

  const observer = new IntersectionObserver((elements) => {
    clearTimeout(delay)
    delay = setTimeout(() => {
      elements.forEach(element => {
        if (target.paused && target.autoplay && element.intersectionRatio > ratio)
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

  main(0.5, [0.45, 0.55], document.querySelector('body video'))

})