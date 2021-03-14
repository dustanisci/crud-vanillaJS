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
      <button>
        <slot></slot>
      </button>
    `;

    this.button = this.shadowRoot.querySelector('button');
    this.color = '';
    this.background = '';
    this.content = this.shadowRoot.querySelector('button slot').assignedNodes()[0].textContent;
  }

  connectedCallback() {
    if (this.type === 'submit') {
      this.onclick = () => this.closest('FORM').dispatchEvent(new Event('submit'));
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'color':
        this.color = newValue;
        this.button.style.color = newValue;
        break;

      case 'background':
        this.background = newValue;
        this.button.style.background = newValue;
        break;

      case 'loader':
        this.#loader(newValue);
        break;

      case 'disabled':
        this.#disabled(newValue);
        break;

      case 'width':
        this.button.style.width = newValue;
        break;
    }
  }

  #disabled(newValue) {
    if (newValue) {
      this.button.setAttribute('disabled', true);
      this.button.style.color = '#dddcdc'
      this.button.style.background = '#f6f6f6';
    } else {
      this.button.setAttribute('disabled', false);
      this.button.style.color = this.color;
      this.button.style.background = this.background;
    }
  }

  #loader(newValue) {
    if (newValue) {
      this.button.innerHTML = '<on-loader show="true"></on-loader>';
    } else {
      this.button.innerHTML = this.content;
    }
  }

}

customElements.define('button-custom', ButtonComponent);