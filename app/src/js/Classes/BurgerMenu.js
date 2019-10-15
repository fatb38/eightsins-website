class BurgerMenu {
    constructor() {
        this.burgerButton = document.getElementById('burger-button');
        this.mainNav = document.getElementById('main-nav');
        this.menuList = document.querySelector('.menu-list');
        this.topLine = document.querySelector('.top-line');
        this.middleLine = document.querySelector('.middle-line');
        this.bottomLine = document.querySelector('.bottom-line');
        this.links = document.querySelectorAll('.menu-link a');
        this.logo = document.querySelector('#main-logo img');
    }

    highlightActiveLink() {
        const URL = document.location.href;
        let tab = URL.substring(URL.lastIndexOf('/') + 1, URL.lastIndexOf('.')); // the actual tab name

        if (tab === 'welcome') {
            tab = '';
        }

        this.links.forEach(link => {
            if (link.innerHTML.toLowerCase() === tab) {
                link.style.color = '#9c2685';
            }
        })
    }

    onClick() {
        // menu closes
        if (this.mainNav.classList.contains('opened')) {
            this.mainNav.classList.remove('opened');
            this.menuList.classList.remove('opened');
            this.topLine.classList.remove('opened');
            this.middleLine.classList.remove('opened');
            this.bottomLine.classList.remove('opened');
            return;
        }

        // menu opens
        this.mainNav.classList.add('opened');
        this.menuList.classList.add('opened');
        this.topLine.classList.add('opened');
        this.middleLine.classList.add('opened');
        this.bottomLine.classList.add('opened');
        this.logo.classList.remove('tiny');
        this.mainNav.classList.remove('tiny');
    }

    onScroll() {
        window.addEventListener("scroll", () => {
            let offset = window.pageYOffset || document.documentElement.scrollTop;

            if (!this.mainNav.classList.contains('opened')) {

                if (offset >= 40) {
                    this.mainNav.classList.add('tiny');
                    this.logo.classList.add('tiny');
                }

                if (offset <= 60) {
                    this.mainNav.classList.remove('tiny');
                    this.logo.classList.remove('tiny');
                }
            }
        }, false);
    }

    run() {
        this.burgerButton.addEventListener('click', this.onClick.bind(this));
        this.highlightActiveLink();
        this.onScroll();
    }
}