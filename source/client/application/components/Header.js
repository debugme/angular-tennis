import Application from './Application'

const Header = Application.component('Header', {
  template: `
    <header class="header">
      <i class="header-icon">&#xe839;</i>
      <span class="header-logo">Tournament</span>
      <img class="header-avatar" src={avatar} />
      <span class="header-name">Asad</span>
      <span class="header-name"> Razvi</span>
    </header>
  `
})

export default Header