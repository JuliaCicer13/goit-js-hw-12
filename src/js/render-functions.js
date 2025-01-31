
export function createMarkUp(images) {
  
  return images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
      `
      <li class="wrap-card">
        <a class="link-card" href="${largeImageURL}">
          <img class="photo-card" src="${webformatURL}" alt="${tags}"/>
        </a>
        <div class="info">
          <div class="wrap-text">
            <p><b>Likes</b> ${likes}</p>
          </div>
          <div class="wrap-text">
            <p><b>Views</b> ${views}</p>
          </div>
          <div class="wrap-text-two">
            <p><b>Comments</b> ${comments}</p>
          </div>
          <div class="wrap-text-two">
            <p><b>Downloads</b> ${downloads}</p>
          </div>
        </div>
      </li>
      `).join('');
  }


