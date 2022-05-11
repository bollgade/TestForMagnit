'use strict';

//Base functions
function getZero(num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  };
};

const users = [];

(function () {

  const form = document.querySelector('form');

  class User {
    constructor(login, pass, email, animal) {
      this.login = login;
      this.pass = pass.split("").reverse().join("");
      this.email = email;
      this.animal = animal;
      this.num = 0;
      this.date = this.getDateInFormat();
      this.comment = 'Введите комментарий';
      this.getRandomNum(0, 10000);
    }

    getRandomNum(min, max) {
      this.num = Math.round(Math.random() * (max - min) + min);
    }

    getDateInFormat() {
      const date = new Date();
      return `${getZero(date.getDate())}.${getZero(date.getMonth() + 1)}.${date.getFullYear()}`;
    }
  };

  function createElement() {
    const login = document.querySelector('#login'),
      pass = document.querySelector('#password'),
      email = document.querySelector('#email'),
      animal = document.querySelector('#animal');

    const loginValue = login.value,
      passValue = pass.value,
      emailValue = email.value,
      animalValue = animal.value;

    login.value = '';
    pass.value = '';
    email.value = '';
    animal.value = '';
    if (!loginValue || !passValue || !emailValue || animalValue === '') {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    users.push(new User(loginValue, passValue, emailValue, animalValue));
  }

  function updateTable(arr, selector) {
    const table = document.querySelector(selector);

    table.innerHTML = `
      <tr class="database__header">
        <th class="database__header-item">#</th>
        <th class="database__header-item">Логин</th>
        <th class="database__header-item">Пароль (наоборот)</th>
        <th class="database__header-item">Email</th>
        <th class="database__header-item">Животное</th>
        <th class="database__header-item">Число</th>
        <th class="database__header-item">Дата записи</th>
        <th class="database__header-item">Комментарий</th>
      </tr>
    `;

    arr.forEach((element, index) => {
      const row = document.createElement('tr');
      row.classList.add('database__row');

      row.innerHTML = `
        <th class="database__header-item">${index + 1}</th>
        <th class="database__header-item">${element.login}</th>
        <th class="database__header-item">${element.pass}</th>
        <th class="database__header-item">${element.email}</th>
        <th class="database__header-item">${element.animal}</th>
        <th class="database__header-item">${element.num}</th>
        <th class="database__header-item">${element.date}</th>
        <th class="database__header-item">${element.comment}</th>
        <th data-num='${index}' class="database__header-btn"><img width="10px" src="./img/trash.svg"></img></th>
      `;

      table.append(row);
    });
  };

  function deleteItem(item, arr, selector) {
    arr.splice(+item.getAttribute('data-num'), 1);
    updateTable(arr, selector);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    createElement();
    updateTable(users, 'table');
  })

  const table = document.querySelector('table')
  table.addEventListener('click', (e) => {
    console.log(e.target.parentElement);
    if (e.target.closest('.database__header-btn')) {
      deleteItem(e.target, users, 'table');
    }
  });

}());