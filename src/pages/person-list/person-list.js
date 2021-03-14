class PersonList {

  constructor() {
    this.table = document.querySelector('table');
    this.loader = document.querySelector('on-loader');
    this.modal = document.querySelector('modal-dialog');
    this.renderTable();
    this.importMaskHelper();
  }

  async importMaskHelper(){
    this.maskHelper = await (await import('./../../shared/helpers/mask/mask-helper.js')).default;
  }

  template() {
    let template = `
    <thead>
      <tr>
        <th>Nome</th>
        <th>E-mail</th>
        <th>CPF</th>
        <th>Telefone</th>
        <th>Ação</th>
      </tr>
    </thead>`;

    if (JSON.parse(localStorage.getItem('users')) && JSON.parse(localStorage.getItem('users')).length) {
      template += `     
        <tbody>
          ${JSON.parse(localStorage.getItem('users')).map(user => `
            <tr>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${this.maskHelper.cpf(user.cpf)}</td>
              <td>${this.maskHelper.phone(user.phone)}</td>
              <td>
                <button onclick="personList.actionRemove(${user.cpf})">X</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      `;

    } else {
      template += `
        <tbody>
          <tr>
            <td class="not-found" colspan="5">Não há registros</td>
          </tr>
        </tbody>
      `;
    }

    return template;
  }

  renderTable() {
    this.table.innerHTML = '';
    this.loader.setAttribute('show', true);

    setTimeout(() => {
      this.loader.removeAttribute('show');
      this.table.innerHTML = this.template();
    }, 1000);

  }

  actionRemove(cpf) {
    this.modal.setAttribute('open', true);

    this.modal.addEventListener('clickSecondButton', () => {
      const personFiltered = JSON.parse(localStorage.getItem('users')).filter(person => person.cpf != cpf);
      localStorage.setItem('users', JSON.stringify(personFiltered));
      this.renderTable();
    });

  }

  redirectPageRegister(edit = '') {
    window.location.href = `../person-form/person-form.html${edit}`;
  }
}