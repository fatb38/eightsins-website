'use strict'
// Fonction pour récupérer le nom du fichier de l'URL en cours (sans l'extension)
// Ce qui va permettre de mettre en évidence l'onglet actif lors de la navigation
function activeTab () {
  const URL = document.location.href
  return URL.substring(URL.lastIndexOf('/') + 1, URL.lastIndexOf('.'))
}

function getUniqueListBy (arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}

/************************************************************/
// Smooth Scroll

let html, body, scrollToTopButton
window.onload = function () {
  html = document.documentElement
  body = document.body
  scrollToTopButton = document.getElementById('scroll-to-top-button')
}

function scrollToTop (totalTime, easingPower) {
  const timeInterval = 1 // in ms
  const scrollTop = Math.round(body.scrollTop || html.scrollTop)
  let timeLeft = totalTime
  const scrollByPixel = setInterval(function () {
    const percentSpent = (totalTime - timeLeft) / totalTime
    if (timeLeft >= 0) {
      const newScrollTop = scrollTop * (1 - easeInOut(percentSpent, easingPower))
      body.scrollTop = newScrollTop
      html.scrollTop = newScrollTop
      // console.log(easeInOut(percentSpent,easingPower));
      timeLeft--
    } else {
      clearInterval(scrollByPixel)
      // Add hash to the url after scrolling
      // window.location.hash = hash;
    }
  }, timeInterval)
}

function easeInOut (t, power) {
  if (t < 0.5) {
    return 0.5 * Math.pow(2 * t, power)
  } else {
    return 0.5 * (2 - Math.pow(2 * (1 - t), power))
  }
}

window.onscroll = controlScrollToTopButton

function controlScrollToTopButton () {
  const windowInnerHeight = window.innerHeight
  if (
    body?.scrollTop > windowInnerHeight ||
    html?.scrollTop > windowInnerHeight
  ) {
    scrollToTopButton.classList.add('show')
  } else {
    scrollToTopButton?.classList.remove('show')
  }
}
