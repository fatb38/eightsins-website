/* global axios, getUniqueListBy */

class MerchPage {
  constructor () {
    this.categoriesContainer = document.querySelector('#categories ul')
    this.itemsContainer = document.querySelector('#items ul')
    this.loaderHtmlElement = document.getElementById('loader')
    this.categories = []
    this.items = []
    this.filteredItems = []
  }

  buildCategories () {
    this.items.forEach(item => {
      this.categories.push(item.categories[0])
    })
    this.categories = getUniqueListBy(this.categories, 'name')

    this.categoriesContainer.innerHTML = '<li class="category"><a href="#" data-category-id="all">All</a></li>'
    this.categories.forEach(category => {
      this.categoriesContainer.innerHTML += `
        <li class="category">
          <a href="#" data-category-id="${category.id}">${category.name}</a>
        </li>`
    })

    document.querySelectorAll('.category').forEach(category => {
      category.addEventListener('click', this.onClickCategory.bind(this))
    })
  }

  buildItems () {
    this.itemsContainer.innerHTML = ''
    this.filteredItems.forEach(item => this.createItemHtml(item))

    // Affichage info si article en rupture
    const statusSpan = document.querySelectorAll('.status')
    statusSpan.forEach(status => {
      if (status.innerText === 'active') {
        status.style.display = 'none'
      }
    })
  }

  createItemHtml (item) {
    this.itemsContainer.innerHTML += `
      <li class="item" id="${item.id}">
        <figure>
          <a href="https://eightsins.bigcartel.com${item.url}" target="_blank" rel="noopener">
            <img src="${item.images['0'].url}?w=250" alt="${item.name}" title="${item.name}">
          </a>
          <figcaption>
            <h3>${item.name}</h3>
            <span>${item.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
            <span class="status">${item.status}</span>
          </figcaption>
        </figure>
      </li>
    `

    if (item.options.length > 1) {
      let asideContent = '<p>Options disponibles :</p>'
      item.options.forEach((option) => {
        if (!option.sold_out) {
          asideContent += `<span>${option.name}</span>`
        }
      })
      const aside = document.createElement('aside')
      aside.innerHTML = asideContent
      document.getElementById(item.id).appendChild(aside)
    }
  }

  filterItems (categoryId = 'all') {
    if (categoryId === 'all') {
      this.filteredItems = [...this.items]
      return
    }
    this.filteredItems = this.items.filter(item => {
      return item.categories.find(category => category.id.toString() === categoryId)
    })
  }

  setItems (items) {
    this.items = items
    this.filterItems()
    this.buildItems()
    this.buildCategories()
  }

  onClickCategory (event) {
    event.preventDefault()
    this.filterItems(event.target.dataset.categoryId)
    this.buildItems()
  }

  setLoading () {
    this.loaderHtmlElement.classList.toggle('hide')
    this.loaderHtmlElement.classList.toggle('spinning-loader')
  }

  displayErrorMessage () {
    document.getElementById('categories').remove()
    document.getElementById('items').remove()
    const alert = document.createElement('alert')
    alert.innerHTML = 'Erreur lors du chargement des articles, veuillez rafraichir la page...'
    document.getElementById('container').appendChild(alert)
  }

  run () {
    this.setLoading()
    axios.get('https://api.bigcartel.com/eightsins/products.json')
      .then(response => this.setItems(response.data))
      .catch(() => this.displayErrorMessage())
      .finally(() => this.setLoading())
  }
}
