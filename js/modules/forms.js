import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
      //Forms
   //Отправка данных на сервез (53 урок)
   //Формы для отправки данных на сервер
   const forms = document.querySelectorAll(formSelector);

   const message = {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
   };

   //Под каждую форму подвязываем функцию  postData
   forms.forEach(item => {
      bindPostData(item);
   });

   function bindPostData(form) {
      //сначала надо отменить стандартное действие браузера при нажатии пользователем на кнопку "Перезвонить мне" (т.е. перезагрузка сайта):
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         //Создание блока сообщения со спииннером
         const statusMessage = document.createElement('img');
         statusMessage.src = message.loading;
         statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
         `;
         // form.append(statusMessage); //Помещаем форму на страничку
         form.insertAdjacentElement('afterend', statusMessage); //Помещаем форму со спиннером на страничку в определенном местеб (вместо предыдущей команды), делаем для того что-бы спиннер был сразу под формой

         // const request = new XMLHttpRequest(); //Устаревший способ, вместо него сейчас используется способ fetch
         // request.open('POST', 'server.php'); 

         //Существует два формата передачи данных на сервер: FormData и JSON.
         // request.setRequestHeader('Content-type', "multipart/form-data"); //При использовании XMLHttpRequest + FormData Header устанавливать не надо, будет ошибка и данные на сервер не отправятся. Используется только в формате JSON.
         const formData = new FormData(form);

         //Перевод формата FormData в формат JSON:
         // const object = {};
         // formData.forEach(function(value, key){
         //    object[key] = value; //На основании данных, полученных formData при помощи перебора вставляем их в пустой объект object. Получаем обычный объект а не formData
         // });
         // =

         const json = JSON.stringify(Object.fromEntries(formData.entries()));

         //const json = JSON.stringify(object); //конвертация в JSON
         // request.send(json); //Отправка данных в формате JSON

         // fetch('server.php', {
         //    method: "POST",
         //    headers: {
         //       'Content-type': 'application/json'
         //    },
         //    body: JSON.stringify(object)
         // })
         postData('http://localhost:3000/requests', /*JSON.stringify(object*/json)
         // .then(data => data.text())
         .then(data => {
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove(); //удаление сообщения
         }).catch(() => {
            showThanksModal(message.failure);
         }).finally(() => {
            form.reset(); //очистка формы после отправки запроса
         });

         // request.send(formData); //Отправка данных в формате formData

         // request.addEventListener('load', () => {
         //    if (request.status === 200) {
         //       console.log(request.response);
         //       showThanksModal(message.success);
         //       form.reset(); //очистка формы после отправки запроса
         //       statusMessage.remove(); //удаление сообщения
         //    } else {
         //       showThanksModal(message.failure);
         //    }
         // });
      });
   }

   //Создание окон оповещений для пользователя (54 урок)
   function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog'); //Получение структуры из документа

      prevModalDialog.classList.add('hide');  //Скрываем окно, чтобы открыть его когда нам будет нужно
      openModal('.modal', modalTimerId);

      //Создание окна
      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');  //добавляем классы
      //Добавляем верстку окна
      thanksModal.innerHTML = `
         <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
         </div>
      `;

         //Добавляем окно на страницу
   document.querySelector('.modal').append(thanksModal); //размещение на месте без использования переменных

   //Скрытие информационного окна и открытие модального окна
   setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal('.modal');
   }, 4000);
   }
}

//Lesson 56. Fetch API.

   // fetch('http://localhost:3000/menu')
   //    .then(data => data.json())
   //    .then(res => console.log(res));
   // fetch('https://jsonplaceholder.typicode.com/todos/1')//GET запрос
   //    .then(response => response.json()) //Получаем Promice в формате JSON
   //    .then(json => console.log(json)); //Получаем обычный JS объект

   // // POST запрос
   // fetch('https://jsonplaceholder.typicode.com/posts', {
   //       method: "POST",
   //       body: JSON.stringify({name: 'Alex'}),
   //       headers: {
   //          'Content-type': 'application/json'
   //       }
   // })
   // .then(response => response.json()) 
   // .then(json => console.log(json)); 
   // fetch('db.json')
   // .then(data => data.json())
   // .then(res => console.log(res));

   export default forms;