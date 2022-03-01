function timer(id, deadLine) {
   // Timer

   // const deadline = '2022-03-19';

   // Функция, которая определяет разницу между deadline и текущим временем
   function getTimeRemaining(endtime) {
      const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)), 
            /* математическое вычисление (Math) с округлением до ближайшего целего числа(floor)*/
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            /* символ % дает нам остаток от полученного в t времени,
            т.е если t=50, то получим 2 часа, 
            т.е. если t=50, то 50/24=48+2(остаток)*/
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60);

         // Вывод данных наружу, т.е. из функции
         return {
         'total': t,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      };
   }

   //Функция-помощник для подставки нуля перед цифрой если она меньше 10 (09, 08 и т.д.)
   function getZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   //Функция, которая выводит часы, минуты и т.д. на страничку
   function setClock(selector, endtime) {
      const timer = document.querySelector(/*'.timer'*/selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000); //Запуск обновления timerа каждую секунду

      updateClock(); 
      //Вызов функции вручную нужен чтобы исключить показ данных таймера из HTML файла первые 1000 миллисекунд пока не сработал timeInterval
      
      //Функция, которая обновляет timer каждую секунду
      function updateClock() {
         const t = getTimeRemaining(endtime); //расчет времени, кот. остался на эту секунду

         //Размещение полученных расчетных величин (разницы времени) на страницу
         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);

         //Остановка timerа
         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
      }
   }

   setClock(id, deadLine);
}

export default timer;