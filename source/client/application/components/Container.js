import Application from './Application'

import Header from './Header'
import Content from './Content'
import Footer from './Footer'

Application.component('Container', {
  template: `
  <div class="container">
    <Header></Header>
    <Content></Content>
    <Footer></Footer>
  </div>
  `
})