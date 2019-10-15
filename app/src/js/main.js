'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = new BurgerMenu();
    burgerMenu.run();

    // event handler to activate scroll to top
    document.getElementById('scroll-to-top-button').addEventListener('click', function () {
        scrollToTop(300, 3);
    });

    switch (activeTab()) {
        case 'band':
            const membersIdentificator = new MembersIdentificator();
            membersIdentificator.run();
            break;
        case 'merch':
            const merchPage = new MerchPage();
            merchPage.run();
            break;
        case 'music':
            const discographyInformations = new DiscographyInformations();
            discographyInformations.run();
            break;
        case 'news':
            // Troncate the news content with number of chars depending on window width
            const newsContent = document.querySelectorAll('.news .content');
            let width = 100;
            if (window.outerWidth > 767) {
                width = 350;
            }
            newsContent.forEach(news => {
                news.innerHTML = mb_strimwidth(news.innerText, 0, width, '(...)');
            });
            break;
        case 'article':
            // make the iframe dimensions responsive under 500px viewport width
            const iframe = document.querySelector('iframe');
            let windowWidth = window.outerWidth;
            if (iframe && windowWidth <= 500) {
                windowWidth -= 30; // to implement 15px margin on each side
                iframe.width = windowWidth.toString();
                iframe.height = (parseInt(iframe.width) / 1.78).toString();
            }
            break;
    }
});