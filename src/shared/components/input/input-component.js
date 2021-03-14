class InputComponent extends HTMLElement {

  static get observedAttributes() {
    return ['type', 'value', 'label', 'msg-invalid', 'maxlength'];
  }

  get value() {
    return this.getAttribute('value');
  }

  set value(val) {
    if (val) {
      this.setAttribute('value', val);
    } else {
      this.removeAttribute('value');
    }
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>@import url('../../../src/shared/components/input/input-component.css');</style>
      <div class="container">
        <label class="container__label" for="input"></label>
        <input type="text" id="input" teste="teste" class="container__input"></input>
        <span></span>
      </div>
    `;

    this.label = this.shadowRoot.querySelector('label');
    this.input = this.shadowRoot.querySelector('input');
  }

  connectedCallback() {
    this.input.addEventListener('change', this.#updateValue.bind(this));
    this.input.addEventListener('keydown', this.#updateValue.bind(this));
    this.input.addEventListener('focus', this.#changesColorFocusInput.bind(this));
    this.input.addEventListener('focusout', this.#removeChangesColorFocusInput.bind(this));
  }

  disconnectedCallback() {
    this.input.removeEventListener('change', this.#updateValue.bind(this));
    this.input.removeEventListener('keydown', this.#updateValue.bind(this));
    this.input.removeEventListener('focus', this.#changesColorFocusInput.bind(this));
    this.input.removeEventListener('focusout', this.#removeChangesColorFocusInput.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'type':
        this.input.setAttribute('type', newValue);
        break;

      case 'label':
        this.label.innerHTML = newValue;
        break;

      case 'value':
        this.input.value = newValue;
        break;

      case 'maxlength':
        this.input.setAttribute('maxlength', newValue);
        break;

      case 'msg-invalid':
        this.#checkMsgInvalid(newValue);
        break;
    }
  }

  #updateValue() {
    this.value = this.input.value;
  }

  #changesColorFocusInput() {
    this.label.style.color = '#333333';
  }

  #removeChangesColorFocusInput() {
    this.label.removeAttribute('style');
  }

  #checkMsgInvalid(newValue) {
    const msg = this.shadowRoot.querySelector('span');
    if (newValue) {
      msg.innerHTML = newValue;
      this.input.after(msg);
      this.input.style.borderColor = "#eb4a46";

    } else {
      if (msg) {
        msg.innerHTML = '';
        this.input.removeAttribute('style');
      }
    }
  }

}

customElements.define('input-label', InputComponent);