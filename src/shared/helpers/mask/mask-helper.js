 export class MaskHelper {

  static phone(value) {
    if(value){
      value = value.replace(/\D/g, "");
      value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
      value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    }
    return value;
  }

  static cpf(value) {
    if(value){
      value = value.replace(/\D/g, "");
      value = value.replace(/^(\d{9})(\d)/g, "$1-$2");
      value = value.replace(/^(\d{6})(\d)/g, "$1.$2");
      value = value.replace(/^(\d{3})(\d)/g, "$1.$2");
    }
    return value;
  }

  static removeAll(value){
    return value.toString().replace(/\(|\)|[.,-\s]/g, '');
  }
}