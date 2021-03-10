class ModalComponent extends HTMLElement {

  static get observedAttributes() {
    return [
      'width',
      'open',
      'background',
      'modal-primary-button-text',
      'modal-second-button-text',
      'hidden-second-button',
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>@import url('../../../src/shared/components/modal/modal-component.css')</style>
      <div id="modal" class="modal">
        <div class="modal__container">
          <slot></slot>
          
          <div class="buttons">
            <div class="buttons__container">
              <button-custom id="btnPrimary" color="#333" background="#FFF">Cancelar</button-custom>
              <button-custom id="btnSecond" color="#FFFFFF" background="#00c8b3">Confirmar</button-custom>
            </div>
          </div>
        </div>
      </div>
    `;

    this._modal = this.shadowRoot.querySelector('#modal');
    this._modalContainer = this.shadowRoot.querySelector('#modal .modal__container');
    this._primaryButton = this.shadowRoot.querySelector('#btnPrimary');
    this._secondButton = this.shadowRoot.querySelector('#btnSecond');
  }

  connectedCallback() {
    this._primaryButton.addEventListener('click', this._clickPrimaryButton.bind(this));
    this._primaryButton.addEventListener('click', this._close.bind(this));

    this._secondButton.addEventListener('click', this._clickSecondButton.bind(this));
    this._secondButton.addEventListener('click', this._close.bind(this));
  }

  disconnectedCallback() {
    this._primaryButton.removeEventListener('click', this._clickPrimaryButton.bind(this))
    this._primaryButton.removeEventListener('click', this._close.bind(this));
    this._secondButton.removeEventListener('click', this._clickSecondButton.bind(this));
    this._secondButton.removeEventListener('click', this._close.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'open':
        if (newValue) {
          this._modal.classList.add('open');
        } else if (this._modal.className === 'open') {
          this.close();
        }
        break;

      case 'width':
        this._modalContainer.style.width = newValue;
        break;

      case 'background':
        this._modalContainer.style.background = newValue;
        break;

      case 'modal-color':
        this._modalContainer.style.color = newValue;
        break;

      case 'modal-primary-button-text':
        this._primaryButton.innerHTML = newValue
        break;

      case 'modal-second-button-text':
        this._secondButton.innerHTML = newValue
        break;

      case 'hidden-second-button':
        this._secondButton.remove();
        break;
    }
  }

  _close() {
    this._modal.classList.remove('open');
    this.dispatchEvent(new CustomEvent('close'));
  }

  _clickPrimaryButton() {
    this.dispatchEvent(new CustomEvent('clickPrimaryButton'));
  }

  _clickSecondButton() {
    this.dispatchEvent(new CustomEvent('clickSecondButton'));
  }
}

customElements.define('modal-dialog', ModalComponent);