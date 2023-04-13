/* global BurgerMenu, scrollToTop, activeTab, MembersIdentificator, MerchPage, DiscographyInformations, mbStrimwidth */
'use strict'

document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = new BurgerMenu()
  burgerMenu.run()

  // event handler to activate scroll to top
  document.getElementById('scroll-to-top-button').addEventListener('click', function () {
    scrollToTop(300, 3)
  })

  // Redirection to news page under 1080px width
  if (document.getElementById('bgvideo') && window.outerWidth < 1080) {
    window.setTimeout(() => {
      document.location.href = 'news.php'
    }, 2000)
  }
  switch (activeTab()) {
    case 'band':
      new MembersIdentificator().run()
      break
    case 'merch':
      new MerchPage().run()
      break
    case 'music':
      new DiscographyInformations().run()
      break
    case 'article':
      // make the iframe dimensions responsive under 500px viewport width
      const iframe = document.querySelector('iframe')
      const windowWidth = window.outerWidth
      if (iframe && windowWidth <= 500) {
        iframe.width = windowWidth.toString()
        iframe.height = (parseInt(iframe.width) / 1.78).toString()
      }
      break
  }
})
