function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
//Slider
const slides = document.querySelectorAll(slide),
slider = document.querySelector(container),
prev = document.querySelector(prevArrow),
next = document.querySelector(nextArrow),
total = document.querySelector(totalCounter),
current = document.querySelector(currentCounter),
slidesWrapper = document.querySelector(wrapper),
slidesField = document.querySelector(field),
width = window.getComputedStyle(slidesWrapper).width;

let slideIndex = 1; //Индекс, определяющий текущее положение в слайдере
let offset = 0; //

//Lesson 62. Создание слайдера в виде карусели

if (slides.length < 10) {
total.textContent = `0${slides.length}`;
current.textContent = `0${slideIndex}`;
} else {
total.textContent = slides.length;
current.textContent = slideIndex;
}
//Устанавливаем ширину блоку слайдов (под 100%)
slidesField.style.width = 100 * slides.length + '%'; //Устанавливаем ширину блоку слайдов (под 100%)
slidesField.style.display = 'flex'; //выстраиваем слайды в ряд
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden'; //скрываем слайды не попадающие в нормальное окно

slides.forEach(slide => {
slide.style.width = width;
}); //Приведем все слайды под один размер

slider.style.position = 'relative';

//Создание обертки для всех точек в слайдере:
const indicators = document.createElement('ol'),
dots = [];

indicators.classList.add('carousel-indicators');
indicators.style.cssText = `
position: absolute;
right: 0;
bottom: 0;
left: 0;
z-index: 15;
display: flex;
justify-content: center;
margin-right: 15%;
margin-left: 15%;
list-style: none;
`;
slider.append(indicators); //добавляем обертку в слайд

for (let i = 0; i < slides.length; i++) {
const dot = document.createElement('li');
dot.setAttribute('data-slide-to', i + 1);
dot.style.cssText = `
box-sizing: content-box;
flex: 0 1 auto;
width: 30px;
height: 6px;
margin-right: 3px;
margin-left: 3px;
cursor: pointer;
background-color: #fff;
background-clip: padding-box;
border-top: 10px solid transparent;
border-bottom: 10px solid transparent;
opacity: .5;
transition: opacity .6s ease;
`;
if (i == 0) {
dot.style.opacity = 1;
}

indicators.append(dot);
dots.push(dot);
}

//Для получения корректных данных (только чисел) без букв px чтобы передвигать слайды на свой размер:
function deleteNotDigits(str) {
return +str.replace(/\D/g, '');
}

//Передвижение слайдера вперед:
next.addEventListener('click', () => {
if (offset == deleteNotDigits(width) * (slides.length - 1)){
offset = 0;
} else {
offset += deleteNotDigits(width);
}

slidesField.style.transform = `translateX(-${offset}px)`; //смещаем картинку влево (-) по оси Х на {offset}px пикселей

if (slideIndex == slides.length) {
slideIndex = 1;
} else {
slideIndex++;
}

//Меняем значения в текстовых блоках
if (slides.length < 10) {
current.textContent = `0${slideIndex}`;
} else {
current.textContent = slideIndex;
}

dots.forEach(dot => dot.style.opacity = '.5');
dots[slideIndex - 1].style.opacity = 1;
});

prev.addEventListener('click', () => {
if (offset == 0){
offset = deleteNotDigits(width) * (slides.length - 1);
} else {
offset -= deleteNotDigits(width);
}

slidesField.style.transform = `translateX(-${offset}px)`; //смещаем картинку влево (-) по оси Х на {offset}px пикселей

if (slideIndex == 1) {
slideIndex = slides.length;
} else {
slideIndex--;
}

//Меняем значения в текстовых блоках
if (slides.length < 10) {
current.textContent = `0${slideIndex}`;
} else {
current.textContent = slideIndex;
}

dots.forEach(dot => dot.style.opacity = '.5');
dots[slideIndex - 1].style.opacity = 1;
});

//Lesson 63. Создание точек
dots.forEach(dot => {
dot.addEventListener('click', (e) => {
const slideTo = e.target.getAttribute('data-slide-to');

slideIndex = slideTo;
offset = deleteNotDigits(width) * (slideTo - 1);

slidesField.style.transform = `translateX(-${offset}px)`;

if (slides.length < 10) {
   current.textContent = `0${slideIndex}`;
} else {
   current.textContent = slideIndex;
}

dots.forEach(dot => dot.style.opacity = '.5');
dots[slideIndex - 1].style.opacity = 1;
});
});



//Lesson 61. Создание слайдера
// showSlides(slideIndex); //инициализация слайдера

// if (slides.length < 10) {
//    total.textContent = `0${slides.length}`;
// } else {
//    total.textContent = slides.length;
// } //подстановка 0 если общее кол-во слайдов меньше 10

// //Функция по показу и скрытию слайдов:
// function showSlides(n) {
//    if (n > slides.length) {
//       slideIndex = 1;
//    }

//    if (n < 1) {
//       slideIndex = slides.length;
//    }

//    slides.forEach(item => item.style.display = 'none'); //скрываем все слайды

//    slides[slideIndex - 1].style.display = 'block'; //показываем текущий слайд (-1 - приводим в соответствие чел. язык(1) и машинный индекс (0))

//    if (slides.length < 10) {
//       current.textContent = `0${slideIndex}`;
//    } else {
//       current.textContent = slideIndex;
//    }
// }

// function plusSlides(n) {
//    showSlides(slideIndex += n);
// } //Перелистывание слайдов

// prev.addEventListener('click', () => {
//    plusSlides(-1);
// });

// next.addEventListener('click', () => {
//    plusSlides(1);
// });
}

export default slider;