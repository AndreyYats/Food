function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
   //Tabs
   
   // Создаем переменные для выполнения задач:
   // 1. Скрыть ненужные табы;
   // 2. Показать нужный таб(active);
   // 3. Изменять активности названий табов.
   const tabs = document.querySelectorAll(tabsSelector),
         tabsContent = document.querySelectorAll(tabsContentSelector),
         tabsParent = document.querySelector(tabsParentSelector); 


   // Функция скрытия табов и классов активности.
   function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
         });

         tabs.forEach(item => {
            item.classList.remove(activeClass);
         });
   }

   // Функция показывающая выбранный пользователем таб.
   function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add(activeClass);
   }

   // Обязательно: вызов функций.
   hideTabContent();
   showTabContent();

   // Назначение делегировния событий и назначение обработчика событий кликом
   tabsParent.addEventListener('click', (event) => {
      const target = event.target; //Для упрощения кода

      if (target && target.classList.contains(/*'tabheader__item' ==*/tabsSelector.slice(1)/*slice(1) удаляет первый символ (.)*/)) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });
}

export default tabs;