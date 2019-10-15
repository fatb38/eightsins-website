class DiscographyInformations {
    constructor() {
        this.covers = document.querySelectorAll('.cover');
        this.asides = document.querySelectorAll('aside.record-info');
    }

    run() {
        this.covers.forEach(cover => {
            let aside = cover.querySelector('.record-info');
            cover.onclick = () => {
                aside.classList.add('active');
                document.querySelector('html').classList.add('scroll-off');
            }
        });

        this.asides.forEach(aside => {
            aside.onclick = (event) => {
                aside.classList.remove('active');
                document.querySelector('html').classList.remove('scroll-off');
                event.stopPropagation();
            }
        });
    }
}