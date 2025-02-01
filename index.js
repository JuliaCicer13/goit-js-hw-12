import{a as w,S as L,i as y}from"./assets/vendor-Dpd1z_xS.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&d(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();function u(a){return a.map(({webformatURL:t,largeImageURL:r,tags:d,likes:e,views:s,comments:c,downloads:v})=>`
      <li class="wrap-card">
        <a class="link-card" href="${r}">
          <img class="photo-card" src="${t}" alt="${d}"/>
        </a>
        <div class="info">
          <div class="wrap-text">
            <p><b>Likes</b> ${e}</p>
          </div>
          <div class="wrap-text">
            <p><b>Views</b> ${s}</p>
          </div>
          <div class="wrap-text-two">
            <p><b>Comments</b> ${c}</p>
          </div>
          <div class="wrap-text-two">
            <p><b>Downloads</b> ${v}</p>
          </div>
        </div>
      </li>
      `).join("")}const E="https://pixabay.com/api/",x="48269071-e04b626909c4b310c40a55ae0";async function m(a,t=1){try{return(await w.get(E,{params:{key:x,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:20}})).data}catch(r){throw console.error("Error fetching images:",r.message),r}}const f=document.querySelector(".form");f.classList.add("form");const h=document.querySelector(".input"),o=document.createElement("button"),n=document.createElement("div");n.textContent="Loading images, please wait...";n.classList.add("first-loader");n.style.display="none";o.type="button";o.textContent="LoadMore";o.id="load-more";o.style.display="none";o.classList.add("load-more");document.body.appendChild(o);const i=document.createElement("div");i.id="gallery";document.body.appendChild(i);const p=document.createElement("ul");let b=new L("#gallery a",{captionsData:"alt",captionDelay:250}),l=1,g=20;f.addEventListener("submit",async a=>{o.style.display="none",a.preventDefault(),n.style.display="block",setTimeout(()=>{i.style.display="block",n.style.display="none"},3e4);const t=h.value.trim();if(!t){y.show({title:"Error",message:"These fields are empty, please, fill these all!",color:"red"}),n.style.display="none";return}try{l=1;const r=await m(t,l);if(r.hits.length===0){y.show({title:"Error",message:"Sorry, there are no any matching your search query. Please try again!",color:"red"}),n.style.display="none";return}i.innerHTML="",p.insertAdjacentHTML("beforeend",u(r.hits)),i.append(p),r.totalHits>l*g&&(o.style.display="block",i.insertAdjacentElement("afterend",o)),b.refresh()}catch(r){console.error(r)}finally{n.style.display="none"}});o.addEventListener("click",async()=>{l+=1;const a=document.querySelector(".loader");a.style.display="block",o.disabled=!0,setTimeout(()=>{i.style.display="block",o.disabled=!0},3e4);try{const t=await m(h.value.trim(),l);p.insertAdjacentHTML("beforeend",u(t.hits)),i.append(p),b.refresh();const r=i.getBoundingClientRect();window.scrollBy({top:r.height/2,behavior:"smooth"}),t&&t.totalHits<=l*g&&(o.style.display="none",y.show({title:"Error",message:"We're sorry, but you've reached the end of search results.",color:"blue"}))}catch(t){console.error(t)}finally{a.style.display="none",o.disabled=!1}});
//# sourceMappingURL=index.js.map
