const appFooter = function() {
  return {
    replace: true,
    template: `
      <footer class="footer">

        <a class="footer-link" href="mailto:debugme@hotmail.com">
          <i class="footer-link-icon" data-title="E-Mail" data-icon="&#xf1d8;"></i>
        </a>
        <a class="footer-link" href="https://uk.linkedin.com/in/debugme" target="_blank">
          <i class="footer-link-icon" data-title="LinkedIn" data-icon="&#xf30c;"></i>
        </a>
        <a class="footer-link" href="https://github.com/debugme" target="_blank">
          <i class="footer-link-icon" data-title="GitHub" data-icon="&#xf09b;"></i>
        </a>
        <a class="footer-link" href="https://debugme.wordpress.com/" target="_blank">
          <i class="footer-link-icon" data-title="WordPress" data-icon="&#xf19a;"></i>
        </a>

        <span class="footer-view">
          <i class="footer-view-icon"
            data-title-micro="Phone" data-icon-micro="&#xF10B;"
            data-title-small="Tablet" data-icon-small="&#xF10A;"
            data-title-medium="Laptop" data-icon-medium="&#xF109;"
            data-title-large="Desktop" data-icon-large="&#xF108;">
          </i>
        </span>

      </footer>
    `
  }
}

export default appFooter