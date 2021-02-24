class ButtonComponent extends HTMLElement {

  static get observedAttributes() {
    return ['loader', 'disabled', 'background', 'color', 'width', 'type'];
  }

  get type() {
    return this.getAttribute('type');
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>@import url('../../../src/shared/components/button/button-component.css');</style>
      <button id="button-custom">
        <slot></slot>
      </button>
    `;

    this._button = this.shadowRoot.querySelector('#button-custom');
    this._color = '';
    this._background = '';
    this._content = this.shadowRoot.querySelector('#button-custom slot').assignedNodes()[0].textContent;
  }

  connectedCallback() {
    if(this.type === 'submit'){
      this.onclick = () => this.closest('FORM').dispatchEvent(new Event('submit'));
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'color':
        this._color = newValue;
        this._button.style.color = newValue;
        break;

      case 'background':
        this._background = newValue;
        this._button.style.background = newValue;
        break;

      case 'loader':
        if (newValue) {
          this._button.innerHTML = '<on-loader show="true"></on-loader>';
        } else {
          this._button.innerHTML = this._content;
        }
        break;

      case 'disabled':
        if (newValue) {
          this._button.setAttribute('disabled', true);
          this._button.style.color = '#dddcdc'
          this._button.style.background = '#f6f6f6';
        } else {
          this._button.setAttribute('disabled', false);
          this._button.style.color = this._color;
          this._button.style.background = this._background;
        }
        break;

      case 'width':
        this._button.style.width = newValue;
        break;
    }
  }

}

customElements.define('button-custom', ButtonComponent);