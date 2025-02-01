import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast  from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// Додатковий імпорт стилів
import { createMarkUp } from "./js/render-functions";

import { fetchImages } from "./js/pixabay-api";


// Ищим форму по селектору :
const form = document.querySelector('.form');
form.classList.add('form');
// Ищим инпут:
const input = document.querySelector('.input');
// Теперь кнопочки только одна динамичная:

const loadMoreButton = document.createElement("button");

// Индикатор для первой кнопки:

const firstLoader = document.createElement("div");
firstLoader.textContent = "Loading images, please wait...";
firstLoader.classList.add("first-loader");
firstLoader.style.display = "none";



// Настройки кнопки "LoadMore":
loadMoreButton.type = "button";
loadMoreButton.textContent = "LoadMore";
loadMoreButton.id = "load-more";
loadMoreButton.style.display = "none";
loadMoreButton.classList.add("load-more");


document.body.appendChild(loadMoreButton);


// Контейнер для галереи:
const gallery = document.createElement("div");
gallery.id = "gallery";
document.body.appendChild(gallery);
const photoList = document.createElement('ul');


// Настройка lightbox:
let lightbox = new SimpleLightbox("#gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

// Начальная стадия страниц:

let page = 1;
let limit = 20;

// Данные для НТТР запроса перед самом запросом:

form.addEventListener("submit", async (event) => {

  loadMoreButton.style.display = "none"

  event.preventDefault();  

  // Показать индикатор
  firstLoader.style.display = 'block';


  setTimeout(() => {

    gallery.style.display = "block";

    firstLoader.style.display = 'none';

  } , 30000);
  
  const searchValue = input.value.trim();

     if (!searchValue) {
       iziToast.show({
         title: "Error",
         message: "These fields are empty, please, fill these all!",
       color: "red",})
       firstLoader.style.display = 'none';
       return;
  };
   
  try {
    page = 1;
    const data = await fetchImages(searchValue, page);
      
      // Дані від бекенда
        if (data.hits.length === 0) {
            iziToast.show({
              title: "Error",
              message: "Sorry, there are no any matching your search query. Please try again!",
              color: "red",
        });
        firstLoader.style.display = "none";
      return ; 
       }

     gallery.innerHTML = ''; 
     photoList.insertAdjacentHTML("beforeend", createMarkUp(data.hits));
     gallery.append(photoList);
  

     if (data.totalHits > page * limit) {

       loadMoreButton.style.display = "block";
       gallery.insertAdjacentElement("afterend", loadMoreButton);

     }

     lightbox.refresh();

     
		} catch(error)  {

      console.error(error);

    } finally {

      firstLoader.style.display = "none";
    }

  });
     
    loadMoreButton.addEventListener ("click", async () => {

      page += 1;

      // Показываем индикатор загрузки
    const loader = document.querySelector(".loader"); // Используем селектор
    loader.style.display = "block"; // Показываем индикатор
    loadMoreButton.disabled = true; // Отключаем кнопку во время загрузки


     setTimeout(() => {

      gallery.style.display = "block";
      loadMoreButton.disabled = true;
   
  
    } , 30000);
    

  
      try {

     const data = await 
      fetchImages(input.value.trim(), page);
    
      photoList.insertAdjacentHTML("beforeend", createMarkUp(data.hits));
      gallery.append(photoList);

      lightbox.refresh();


     // Прокручиваем так, чтобы кнопка Load More оставалась в зоне видимости
        const galleryRect = gallery.getBoundingClientRect();
        window.scrollBy({
            top: galleryRect.height / 2, // Прокручиваем на половину высоты галереи
            behavior: "smooth"
        });
        

      // Если мы достигли лимита изображений:

      if (data && data.totalHits <= page * limit) {

           loadMoreButton.style.display = "none";
             iziToast.show({
                title: "Error",
                message: "We're sorry, but you've reached the end of search results.",
                color:"blue",
              });
         }
     
    } catch (error) {

       console.error(error); 

    } finally {

      // Скрываем индикатор загрузки и разблокируем кнопку
      loader.style.display = "none"; // Скрываем индикатор
      loadMoreButton.disabled = false;
  
   }    
  });
    