class MerchPage {
    constructor() {
        this.categoriesContainer = document.querySelector('#categories ul');
        this.categories = [];
        this.itemsContainer = document.querySelector('#items ul');
        this.items = [];
    }

    buildCategories() {
        this.categoriesContainer.innerHTML = '<li class="category"><a href="#" data-category-id="all">All Categories</a></li>';
        this.categories.forEach(category => {
            this.categoriesContainer.innerHTML += `
                <li class="category"><a href="#" data-category-id="${category.id}">${category.name}</a></li>
            `
        });

        document.querySelectorAll('.category').forEach(category => {
            category.addEventListener('click', this.onClickCategory.bind(this));
        })
    }

    buildItems(categoryId = 'all') {
        this.itemsContainer.innerHTML = '';

        // Construction de la liste des articles en fonction du choix de la categorie
        this.items.forEach(item => {
            if (categoryId === 'all' || categoryId === (item.categories['0'].id).toString()) {
                this.itemsContainer.innerHTML += `
                    <li class="item">
                        <figure id="${item.id}">
                            <a href="https://eightsins.bigcartel.com${item.url}" target="_blank" rel="noopener">
                                <img src="${item.images['0'].url}?w=250"
                                 alt="${item.name}"
                                 title="${item.name}">
                            </a>
                            <figcaption>
                                <h3>${item.name}</h3>
                                <span>${item.price.toLocaleString('fr-FR', {style: "currency", currency: "EUR"})}</span>
                                <span class="status">${item.status}</span>
                            </figcaption>
                        </figure>
                    </li>
                `;

                // ajout du des tailles ou coloris disponibles
                if (item.categories[0].name === 'T-Shirts' || item.categories[0].name === 'Caps') {
                    let aside = document.createElement('aside');
                    aside.innerHTML = this.getOptions(item);
                    document.getElementById(item.id).appendChild(aside);
                }
            }
        });

        // Affichage info si article en rupture
        const statusSpan = document.querySelectorAll('.status');
        statusSpan.forEach(status => {
            if (status.innerText === 'active') {
                status.style.display = 'none';
            }
        })
    }

    // Construction de la liste des tailles et coloris disponibles
    getOptions(item) {
        let optionList = '';
        switch (item.categories[0].name) {
            case 'T-Shirts':
                optionList = '<p>Tailles disponibles :</p>';
                break;
            case 'Caps':
                optionList = '<p>Coloris disponibles :</p>';
                break;
        }
        item.options.forEach(option => {
            if (!option.sold_out) {
                optionList += `<span>${option.name}</span>`
            }
        });
        return optionList;
    }

    setCategories(response) {
        this.categories = JSON.parse(response).categories;
        this.buildCategories();
    }

    setItems(response) {
        this.items = JSON.parse(response);
        this.buildItems();
    }

    onClickCategory(event) {
        event.preventDefault();
        this.buildItems(event.target.dataset.categoryId);
    }

    run() {
        ajaxGet('https://api.bigcartel.com/eightsins/store.json', this.setCategories.bind(this));
        ajaxGet('https://api.bigcartel.com/eightsins/products.json', this.setItems.bind(this));
    }
}