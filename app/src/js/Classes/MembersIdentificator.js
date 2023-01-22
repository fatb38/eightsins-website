class MembersIdentificator {
  constructor () {
    this.members = {
      jambon: document.getElementById('jambon'),
      arno: document.getElementById('arno'),
      lox: document.getElementById('lox'),
      mike: document.getElementById('mike')
    }
    this.images = {
      classic: document.getElementById('classic-band'),
      glam: document.getElementById('glam-band')
    }
  }

  onMouseEnter (member) {
    document.querySelector(`#${member}-text`).classList.add('hover-face')
    this.images.classic.classList.add('hide')
    this.images.glam.classList.remove('hide')
  }

  onMouseLeave (member) {
    document.querySelector(`#${member}-text`).classList.remove('hover-face')
    this.images.glam.classList.add('hide')
    this.images.classic.classList.remove('hide')
  }

  run () {
    for (const member in this.members) {
      this.members[member].addEventListener('mouseenter', function () {
        this.onMouseEnter(member)
      }.bind(this))
      this.members[member].addEventListener('mouseleave', function () {
        this.onMouseLeave(member)
      }.bind(this))
    }
  }
}
