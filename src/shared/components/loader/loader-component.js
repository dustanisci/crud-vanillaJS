class LoaderComponent extends HTMLElement {

  static get observedAttributes() {
    return ['width', 'color', 'show'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>@import url('../../../src/shared/components/loader/loader-component.css')</style>
      <div id="loader" class="loader">
        <div class="loader__container"></div>
      </div>
    `;

    this._loader = this.shadowRoot.querySelector('#loader');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'width':
        this._loader.style.width = newValue;
        this._loader.style.height = newValue;
        break;

      case 'color':
        this._loader.querySelector('div').style.borderLeftColor = newValue;
        break;

      case 'show':
        if (newValue) {
          this._loader.classList.add('show');
        } else if (this._loader.classList.contains('show')) {
          this._loader.classList.remove('show');
        }
        break;
    }

  }
}

customElements.define('on-loader', LoaderComponent);