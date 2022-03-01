const postData = async (url, data) => {
   const res = await fetch(url, {
      method: "POST",
      headers: {
         'Content-type': 'application/json'
      },
      body: data 
   });

   return await res.json(); //возвращаем с сервера ответ и переводим в формат json
   //оператор async показывает, что у нас в коде есть асинхронное поведение кода и включает оператор await.
   //оператор await приостанавливает работу кода до момента полной загрузки данных с сервера, превращает асинхронный код в синхронный.

};

//Выводим карточки на страницу

async function getResource(url) {
   let res = await fetch(url);

   //Если что-то пошло не так:
   if (!res.ok) {
      throw new Error(`Could not fetch ${url}, ${res.status}`);
   }

   return await res.json(); 
}

export {postData};
export {getResource};