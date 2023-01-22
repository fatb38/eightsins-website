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
// equivalent of PHP functions mb_strwidth and mb_strimwidth
(function (ns) {
  /**
   * mbStrwidth
   * @return int
   * @see http://php.net/manual/ja/function.mb-strwidth.php
   * @param str
   */
  const mbStrwidth = function (str) {
    let i = 0
    const l = str.length
    let c = ''
    let length = 0
    for (; i < l; i++) {
      c = str.charCodeAt(i)
      if (c >= 0x0000 && c <= 0x0019) {
        length += 0
      } else if (c >= 0x0020 && c <= 0x1FFF) {
        length += 1
      } else if (c >= 0x2000 && c <= 0xFF60) {
        length += 2
      } else if (c >= 0xFF61 && c <= 0xFF9F) {
        length += 1
      } else if (c >= 0xFFA0) {
        length += 2
      }
    }
    return length
  }

  /**
   * mbStrimwidth
   * @return String
   * @see http://www.php.net/manual/ja/function.mb-strimwidth.php
   * @param str
   * @param start
   * @param width
   * @param trimmarker
   */
  const mbStrimwidth = function (str, start, width, trimmarker) {
    if (typeof trimmarker === 'undefined') trimmarker = ''
    const trimmakerWidth = mbStrwidth(trimmarker)
    let i = start
    const l = str.length
    let trimmedLength = 0
    let trimmedStr = ''
    for (; i < l; i++) {
      const c = str.charAt(i)
      const charWidth = mbStrwidth(c)
      const next = str.charAt(i + 1)
      const nextWidth = mbStrwidth(next)
      trimmedLength += charWidth
      trimmedStr += c
      if (trimmedLength + trimmakerWidth + nextWidth > width) {
        trimmedStr += trimmarker
        break
      }
    }
    return trimmedStr
  }
  ns.mbStrwidth = mbStrwidth
  ns.mbStrimwidth = mbStrimwidth
})(window)

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
    body.scrollTop > windowInnerHeight ||
    html.scrollTop > windowInnerHeight
  ) {
    scrollToTopButton.classList.add('show')
  } else {
    scrollToTopButton.classList.remove('show')
  }
}
