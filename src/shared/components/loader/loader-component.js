class LoaderComponent extends HTMLElement {

  static get observedAttributes() {
    return ['width', 'color', 'show'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>@import url('../../../src/shared/components/loader/loader-component.css')</style>
      <div class="loader">
        <div class="loader__container"></div>
      </div>
    `;

    this.loader = this.shadowRoot.querySelector('.loader');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'width':
        this.loader.style.width = newValue;
        this.loader.style.height = newValue;
        break;

      case 'color':
        this.loader.querySelector('div').style.borderLeftColor = newValue;
        break;

      case 'show':
        this.#show(newValue);
        break;
    }

  }

  #show(newValue) {
    if (newValue) {
      this.loader.classList.add('show');
    } else if (this.loader.classList.contains('show')) {
      this.loader.classList.remove('show');
    }
  }
  
}

customElements.define('on-loader', LoaderComponent);