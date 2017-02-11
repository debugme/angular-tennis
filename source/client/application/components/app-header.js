import avatar from 'AvatarImage'

const appHeader = function(){
  return {
    replace: true,
    template: `
      <header class="header">
        <i class="header-icon">&#xe839;</i>
        <span class="header-logo">MatchPoint</span>
        <img class="header-avatar" src=${avatar} />
        <span class="header-name">Asad</span>
        <span class="header-name">Razvi</span>
      </header>
    `
  }
}

export default appHeader