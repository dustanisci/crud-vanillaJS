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
        <label id="label" class="container__label" for="input"></label>
        <input type="text" id="input" teste="teste" class="container__input"></input>
        <span></span>
      </div>
    `;

    this._label = this.shadowRoot.querySelector('#label');
    this._input = this.shadowRoot.querySelector('#input');
  }

  connectedCallback() {
    this._input.addEventListener('change', this._updateValue.bind(this));
    this._input.addEventListener('keydown', this._updateValue.bind(this));
    this._input.addEventListener('focus', this._changesColorFocusInput.bind(this));
    this._input.addEventListener('focusout', this._removeChangesColorFocusInput.bind(this));
  }

  disconnectedCallback() {
    this._input.removeEventListener('change', this._updateValue.bind(this));
    this._input.removeEventListener('keydown', this._updateValue.bind(this));
    this._input.removeEventListener('focus', this._changesColorFocusInput.bind(this));
    this._input.removeEventListener('focusout', this._removeChangesColorFocusInput.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'type':
        this._input.setAttribute('type', newValue);
        break;

      case 'label':
        this._label.innerHTML = newValue;
        break;

      case 'value':
        this._input.value = newValue;
        break;

      case 'maxlength':
        this._input.setAttribute('maxlength', newValue);
        break;

      case 'msg-invalid':
        const msg = this.shadowRoot.querySelector('span');
        this._msgInvalid = newValue;

        if (this._msgInvalid) {
          msg.innerHTML = this._msgInvalid;
          this._input.after(msg);
          this._input.style.borderColor = "#eb4a46";

        } else {
          if (msg) {
            msg.innerHTML = '';
            this._input.removeAttribute('style');
          }
        }

        break;
    }
  }

  _updateValue() {
    this.value = this._input.value;
  }

  _changesColorFocusInput() {
    this._label.style.color = '#333333';
  }

  _removeChangesColorFocusInput() {
    this._label.removeAttribute('style');
  }

}

customElements.define('input-label', InputComponent);