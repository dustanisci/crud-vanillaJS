
class PersonForm {

  constructor() {
    this.buttonSend = document.querySelector('button-custom');
    this.modal = document.querySelector('modal-dialog');

    this.personInvalid = new Person();
    this.personInputs = new Person(
      document.querySelector('#name'),
      document.querySelector('#email'),
      document.querySelector('#cpf'),
      document.querySelector('#phone')
    );
  }

  createPerson() {
    return new Person(
      this.personInputs.name.value,
      this.personInputs.email.value,
      MaskHelper.removeAll(this.personInputs.cpf.value),
      MaskHelper.removeAll(this.personInputs.phone.value)
    );
  }

  resetPersonInputs() {
    Object.keys(this.personInputs).map((personInput) => this.personInputs[personInput].value = '');
  }

  formValid() {
    this.personInvalid.name = false;
    this.personInvalid.phone = false;
    this.personInvalid.cpf = false;
    this.personInvalid.email = false;

    this.personInputs.cpf.value = MaskHelper.cpf(this.personInputs.cpf.value);
    this.personInputs.phone.value = MaskHelper.phone(this.personInputs.phone.value);

    this.personInvalid.name = FormValidationHelper.quantityCharactersInvalid(this.personInputs.name, 3, 3);
    this.personInvalid.phone = FormValidationHelper.quantityCharactersInvalid(this.personInputs.phone, 13, 10);

    FormValidationHelper.quantityCharactersInvalid(this.personInputs.cpf, 14, 11) ?
      this.personInvalid.cpf = true :
      this.personInvalid.cpf = FormValidationHelper.alreadyUser(JSON.parse(localStorage.getItem('users')), this.personInputs.cpf);

    FormValidationHelper.quantityCharactersInvalid(this.personInputs.email, 10, 10) ?
      this.personInvalid.email = true :
      this.personInvalid.email = FormValidationHelper.emailInvalid(this.personInputs.email);

    if (!this.personInvalid.name && !this.personInvalid.email && !this.personInvalid.cpf && !this.personInvalid.phone) {
      return true;
    }
    return false;
  }

  save(event) {
    event.preventDefault();

    if (this.formValid()) {
      const personsStorage = JSON.parse(localStorage.getItem('users')) || [];
      personsStorage.push(this.createPerson());
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
