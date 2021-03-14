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
      <div class="modal">
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

    this.modal = this.shadowRoot.querySelector('.modal');
    this.modalContainer = this.shadowRoot.querySelector('.modal__container');
    this.primaryButton = this.shadowRoot.querySelector('#btnPrimary');
    this.secondButton = this.shadowRoot.querySelector('#btnSecond');

  }

  connectedCallback() {
    this.primaryButton.addEventListener('click', this.#clickPrimaryButton.bind(this));
    this.primaryButton.addEventListener('click', this.#closeAction.bind(this));
    this.secondButton.addEventListener('click', this.#clickSecondButton.bind(this));
    this.secondButton.addEventListener('click', this.#closeAction.bind(this));
  }

  disconnectedCallback() {
    this.primaryButton.removeEventListener('click', this.#clickPrimaryButton.bind(this))
    this.primaryButton.removeEventListener('click', this.#closeAction.bind(this));
    this.secondButton.removeEventListener('click', this.#clickSecondButton.bind(this));
    this.secondButton.removeEventListener('click', this.#closeAction.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'open':
        this.#checkOpenClose(newValue);
        break;

      case 'width':
        this.modalContainer.style.width = newValue;
        break;

      case 'background':
        this.modalContainer.style.background = newValue;
        break;

      case 'modal-color':
        this.modalContainer.style.color = newValue;
        break;

      case 'modal-primary-button-text':
        this.primaryButton.innerHTML = newValue
        break;

      case 'modal-second-button-text':
        this.secondButton.innerHTML = newValue
        break;

      case 'hidden-second-button':
        this.secondButton.remove();
        break;
    }
  }

  #checkOpenClose(newValue) {
    const action = newValue === 'true' ? true : false;
    if (action) {
      this.modal.classList.add('open');
    } else if (!action && this.modal.className === 'open') {
      this.#closeAction();
    }
  }

  #closeAction() {
    this.modal.classList.remove('open');
    this.dispatchEvent(new CustomEvent('close'));
  }

  #clickPrimaryButton() {
    this.dispatchEvent(new CustomEvent('clickPrimaryButton'));
  }

  #clickSecondButton() {
    this.dispatchEvent(new CustomEvent('clickSecondButton'));
  }
}

customElements.define('modal-dialog', ModalComponent);