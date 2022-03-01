// Открытие модального окна на каждую кнопку с классм data-modal
function openModal(modalSelector, modalTimerId) {
   const modal = document.querySelector(modalSelector);
   modal.classList.add('show');
   modal.classList.remove('hide');
   // modal.classList.toggle('show'); // Альтернатива: Отмена возможности прокрутки страницы за открытым модальным окном при помощи метода toggle
   document.body.style.overflow = 'hidden'; 

   console.log(modalTimerId);
   if (modalTimerId) {
      clearInterval(modalTimerId); // Отмена автоматического открытия модального окна, если пользователь уже сам его открывал
   }   
}

// Закрытие модального окна
function closeModal(modalSelector) {
   const modal = document.querySelector(modalSelector);
   modal.classList.add('hide');
   modal.classList.remove('show');
   // modal.classList.toggle('show');
   document.body.style.overflow = ''; // Отмена установленной нами отмены возможности прокрутки страницы при закрытии модального окна ('' - по умолчанию (default))
}
//modalCloseBtn.addEventListener('click', closeModal);


function modal(triggerSelector, modalSelector, modalTimerId) {
   // Modal

   const modalTrigger = document.querySelectorAll(triggerSelector),
         modal = document.querySelector(modalSelector);
         //modalCloseBtn = document.querySelector('[data-close]');

   
     
   
      modalTrigger.forEach(btn => {
         btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
      });
      

   // Закрытие модального окна при клике на серую область вокруг модального окна
      modal.addEventListener('click', (e) => {
         if (e.target === modal || e.target.getAttribute('data-close') == '') {
         closeModal(modalSelector);
      }
   });

   // Закрытие окна при нажатии пользователя на клавишу Esc
   document.addEventListener('keydown', (e) => {
      if (e.code === "Escape" && modal.classList.contains('show')) {
         closeModal(modalSelector);
      }
   });

   // Автоматическое открытие модального окна с использованием setTimeout
   //const modalTimerId = setTimeout(openModal, 30000); переменная переехала в script.js

   // Автоматическое открытие модального окна, когда пользователь досмотрел страницу до конца
   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) /*эта формула обозначает что пользователь пролистал сайт до конеца*/ {
         openModal(modalSelector, modalTimerId);
         window.removeEventListener('scroll', showModalByScroll);
      }
   }
   window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};
