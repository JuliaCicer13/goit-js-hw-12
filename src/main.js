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


// Настройки кнопки "LoadMore":
loadMoreButton.type = "button";
loadMoreButton.textContent = "LoadMore";
loadMoreButton.id = "load-more";
loadMoreButton.style.display = "none";
loadMoreButton.classList.add("load-more");



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

// Индикатор перед НТТР запросом!!!
const loader = document.createElement("div");
loader.textContent = "Loading images, please wait...";
loader.classList.add("loader");
loader.style.display = "none";
document.body.appendChild(loader);

// Данные для НТТР запроса перед самом запросом:

form.addEventListener("submit", async (event) => {

  loadMoreButton.style.display = "none"

  event.preventDefault();  

  // Показать индикатор
  loader.style.display = 'block';


  setTimeout(() => {

    loader.style.display = 'none';


  } , 3000);
  
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

      loader.style.display = "none";
    }

  });
     
    loadMoreButton.addEventListener ("click", async () => {

      page += 1;

      // Показать индикатор
     
     loader.style.display = "block";
     loader.textContent = "Loading images, please wait...";
     loadMoreButton.disabled = true;

  
      try {

     const data = await 
      fetchImages(input.value.trim(), page);
    
      photoList.insertAdjacentHTML("beforeend", createMarkUp(data.hits));
      gallery.append(photoList);

      lightbox.refresh();

     if (data.totalHits <= page * limit) {
      loadMoreButton.style.display = "none";
     }
     
    } catch (error) {
       console.error(error); 
    } finally {
      loader.style.display ="none";
      loadMoreButton.textContent = "Load More";
      loadMoreButton.disabled = false;
      }
   });
    