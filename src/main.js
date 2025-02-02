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

const loader = document.querySelector(".loader");
loader.style.display = "none";


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

  event.preventDefault(); 

  loader.style.display = "block";

  gallery.innerHTML = '';

  photoList.innerHTML = '';

 loadMoreButton.style.display = "none"

  const searchValue = input.value.trim();

     if (!searchValue) {
       iziToast.show({
         title: "Error",
         message: "These fields are empty, please, fill these all!",
       color: "red",})

       loader.style.display = 'none';

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
       loader.style.display = "none";
      return ; 
       }


     photoList.insertAdjacentHTML("beforeend", createMarkUp(data.hits));
     gallery.append(photoList);
     lightbox.refresh();
  

     if (data.totalHits > page * limit) {

       loadMoreButton.style.display = "block";
       gallery.insertAdjacentElement("afterend", loadMoreButton);

     }
     
		} catch(error)  {

      console.error(error);

    } finally {
     
        setTimeout(() => {
          loader.style.display = "none"; 
        }, 1000); 
      
    }
  });
     
    loadMoreButton.addEventListener ("click", async () => {

      // Показываем индикатор загрузки
    loader.style.display = "block"; // Показываем индикатор
    loadMoreButton.disabled = true; // Отключаем кнопку во время загрузки
    page += 1;
  
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

      setTimeout(() => {
        loader.style.display = "none"; 
      }, 1000); 
      
      loadMoreButton.disabled = false;
  
   }    
  });
    