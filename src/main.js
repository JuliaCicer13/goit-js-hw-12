import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast  from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// Додатковий імпорт стилів
import { createMarkUp } from "./js/render-functions";

import { fetchImages } from "./js/pixabay-api";

// Создаю форму :
const form = document.createElement('form');
form.classList.add('form');
// Создаю инпут:
const input = document.createElement('input');
// Теперь кнопочки:
const searchButton = document.createElement("button");
searchButton.classList.add("searchButton");
const loadMoreButton = document.createElement("button");
// Стили для инпута:
input.classList.add('input');
input.type = 'text';
input.name = 'search';
input.placeholder = 'Enter search query...';
input.style.marginRight = "10px";


// Настройки кнопки поиска :
searchButton.type = "submit";
searchButton.textContent = "Search";
searchButton.style.marginRight = "10px";

// Индикатор для первой кнопки:

const firstLoader = document.createElement("div");
firstLoader.textContent = "Loading images, please wait...";
firstLoader.classList.add("first-loader");
firstLoader.style.display = "none";


searchButton.insertAdjacentElement("beforeend", firstLoader);

// Настройки кнопки "LoadMore":
loadMoreButton.type = "button";
loadMoreButton.textContent = "LoadMore";
loadMoreButton.id = "load-more";
loadMoreButton.style.display = "none";
loadMoreButton.classList.add("load-more");



// Индикатор для второй кнопки!!!

const loader = document.createElement("div");
loader.textContent = "Loading images, please wait...";
loader.classList.add("loader");
loader.style.display = "none";

document.body.appendChild(loadMoreButton);

loadMoreButton.insertAdjacentElement("beforeend", loader);


// Добавление єлементов в форму:
form.appendChild(input);
form.appendChild(searchButton);


// Добавляю форму в DOM:

document.body.appendChild(form);
// Выравниваю элементы по горизонтали

form.style.alignItems = "center";
form.style.position = "fixed";
form.style.top = "50px";
form.style.left = "50%";
form.style.transform = "translate(-50%, -50%)";
form.style.justifyContent = "center";
form.style.gap = "10px"



// контейнер для галереи:
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
let limit = 15;

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

     const newImages = photoList.querySelectorAll("li");

     if (newImages.length > 0) {

   const {height} = 
      newImages[newImages.length - data.hits.length].getBoundingClientRect();
            window.scrollBy({
               top: height * 2,
              behavior: "smooth"
                  });
             }
     
		} catch(error)  {

      console.error(error);

    } finally {

      firstLoader.style.display = "none";
    }

  });
     
    loadMoreButton.addEventListener ("click", async () => {

      let data;

      page += 1;

      // Показать индикатор
     
     loader.style.display = "block";
     loader.textContent = "Loading images, please wait...";
     loadMoreButton.disabled = true;

     setTimeout(() => {

      gallery.style.display = "block";
      loadMoreButton.disabled = true;
      loader.style.display = 'none';
  
    } , 30000);
    

  
      try {

     const data = await 
      fetchImages(input.value.trim(), page);
    
      photoList.insertAdjacentHTML("beforeend", createMarkUp(data.hits));
      gallery.append(photoList);

      lightbox.refresh();

      // Высота карточки:



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

    loader.style.display = "none";
    loadMoreButton.disabled = false;
  
   }    
  });
    