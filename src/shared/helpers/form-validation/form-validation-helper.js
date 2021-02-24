class FormValidationHelper {

  static emailInvalid(element) {
    element.removeAttribute('msg-invalid');

    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regexEmail.test(String(element.value).toLowerCase())) {
      element.setAttribute('msg-invalid', `E-mail inválido`);
      return true;
    }
    return false;
  }

  static alreadyUser(persons, element) {
    element.removeAttribute('msg-invalid');

    if (persons && element.value) {
      let alreadyPerson = '';
      persons.filter(personFiltered => personFiltered.cpf === MaskHelper.removeAll(element.value))
        .map(person => alreadyPerson = person.cpf);

      if (alreadyPerson.length) {
        element.setAttribute('msg-invalid', `Usuário já existe`);
        return true;
      }
      return false;
    }
    return false;
  }

  static quantityCharactersInvalid(element, minQty, minQtyMsg) {
    element.removeAttribute('msg-invalid');

    if (!element.value || element.value.length < minQty) {
      element.setAttribute('msg-invalid', `Campo deve conter ${minQtyMsg} caracteres ou mais`);
      return true;
    }
    return false;
  }

  _removeAttributeError(element) {
    if (element.getAttribute('msg-invalid')) {
      element.removeAttribute('msg-invalid');
    }
  }

}