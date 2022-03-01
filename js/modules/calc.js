function calc() {
// Calc
      //Lesson 66 Создаем калькулятор  
      const result = document.querySelector('.calculating__result span');

      let sex, height, weight, age, ratio;
      
      if (localStorage.getItem('sex')) {
         sex = localStorage.getItem('sex');
      } else {
         sex = 'female';
         localStorage.setItem('sex', 'female');
      }
      
      if (localStorage.getItem('ratio')) {
         ratio = localStorage.getItem('ratio');
      } else {
         ratio = 1.375;
         localStorage.setItem('ratio', 1.375);
      }

      //Установка классов активности
      function initLocalSettings(selector, activeClass) {
         const elements = document.querySelectorAll(selector);

         elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
               elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
               elem.classList.add(activeClass);
            }
         });
      }

      initLocalSettings('#gender div', 'calculating__choose-item_active');
      initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

      //Рассчет
      function calcTotal() {
         //сначала проверяем чтобы все данные были выбраны или введены:
         if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = 'Данные где?';
            return; //прерываем функцию
         }

         if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
         } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
         }
      }

      calcTotal();

      //Получение статическую информацию со статических блоков:
      function getStaticInfomation(selector, activeClass) {
         const elements = document.querySelectorAll(selector);

         elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
               if (e.target.getAttribute('data-ratio')) {
                  ratio = +e.target.getAttribute('data-ratio');
                  localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); //сохранение в localStorage данных введенных пользователем
               } else {
                  sex = e.target.getAttribute('id');
                  localStorage.setItem('sex', e.target.getAttribute('id'));
               }
   
               //Классы активности: сначала избавление от назначенных активных классов, потом назаначаем класс активности на тот класс кот. кликнул пользователь
               elements.forEach(elem => {
                  elem. classList.remove(activeClass);
               });
   
               e.target.classList.add(activeClass); 
   
               calcTotal();
            });
         });
      }

      getStaticInfomation('#gender div', 'calculating__choose-item_active');
      getStaticInfomation('.calculating__choose_big div', 'calculating__choose-item_active');

      //Получение динамической информации из секции "Ваша конституция"
      function getDynamicInfomation(selector) {
         const input = document.querySelector(selector);

         input.addEventListener('input', ()=> {

            //Предупреждение красной обводкой, если пользователь вводит вместо цифр буквы:
            if (input.value.match(/\D/g)) {
               input.style.border = '2px solid red';
            } else {
               input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
               case 'height':
                  height = +input.value;
                  break;
               case 'weight':
                  weight = +input.value;
                  break;
               case 'age':
                  age = +input.value;
                  break;
            }

            calcTotal();
         });       
      }

      getDynamicInfomation('#height');
      getDynamicInfomation('#weight');
      getDynamicInfomation('#age');
}

export default calc;