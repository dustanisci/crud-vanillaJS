class PersonForm {

  constructor() {
    this.buttonSend = document.querySelector('button-custom');
    this.modal = document.querySelector('modal-dialog');

    this.imports().then(() => {
      this.personInvalid = new this.classPerson();
      this.personInputs = new this.classPerson(
        document.querySelector('#name'),
        document.querySelector('#email'),
        document.querySelector('#cpf'),
        document.querySelector('#phone')
      );
    });
  }

  async imports() {
    return await Promise.all([
      import('./../../shared/helpers/mask/mask-helper.js'),
      import('./../../shared/helpers/form-validation/form-validation-helper.js'),
      import('./../../shared/models/person.js')
    ]).then(([maskHelper, formValidationHelper, classPerson]) => {
      this.maskHelper = maskHelper.default;
      this.formValidationHelper = formValidationHelper.default;
      this.classPerson = classPerson.default;
    });
  }

  formValid() {
    this.personInvalid.name = false;
    this.personInvalid.phone = false;
    this.personInvalid.cpf = false;
    this.personInvalid.email = false;

    this.personInputs.cpf.value = this.maskHelper.cpf(this.personInputs.cpf.value);
    this.personInputs.phone.value = this.maskHelper.phone(this.personInputs.phone.value);

    this.personInvalid.name = this.formValidationHelper.quantityCharactersInvalid(this.personInputs.name, 3, 3);
    this.personInvalid.phone = this.formValidationHelper.quantityCharactersInvalid(this.personInputs.phone, 13, 10);

    this.formValidationHelper.quantityCharactersInvalid(this.personInputs.cpf, 14, 11) ?
      this.personInvalid.cpf = true :
      this.personInvalid.cpf = this.formValidationHelper.alreadyUser(JSON.parse(localStorage.getItem('users')), this.personInputs.cpf);

    this.formValidationHelper.quantityCharactersInvalid(this.personInputs.email, 10, 10) ?
      this.personInvalid.email = true :
      this.personInvalid.email = this.formValidationHelper.emailInvalid(this.personInputs.email);

    if (!this.personInvalid.name && !this.personInvalid.email && !this.personInvalid.cpf && !this.personInvalid.phone) {
      return true;
    }
    return false;
  }

  createPersonApi() {
    return new this.classPerson(
      this.personInputs.name.value,
      this.personInputs.email.value,
      this.maskHelper.removeAll(this.personInputs.cpf.value),
      this.maskHelper.removeAll(this.personInputs.phone.value)
    );
  }

  resetPersonInputs() {
    Object.keys(this.personInputs).map((personInput) => this.personInputs[personInput].value = '');
  }

  save(event) {
    event.preventDefault();

    if (this.formValid()) {
      const personsStorage = JSON.parse(localStorage.getItem('users')) || [];
      personsStorage.push(this.createPersonApi());
      localStorage.setItem('users', JSON.stringify(personsStorage));

      this.buttonSend.setAttribute('loader', true);

      setTimeout(() => {

        this.buttonSend.removeAttribute('loader');
        this.modal.setAttribute('open', true);
        this.resetPersonInputs();

      }, 1000);
    }
  }

  redirectPageList() {
    window.location.href = '../person-list/person-list.html';
  }
}
