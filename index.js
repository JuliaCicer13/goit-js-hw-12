import{a as w,S as L,i as u}from"./assets/vendor-Dpd1z_xS.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))p(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&p(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function p(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();function y(s){return s.map(({webformatURL:a,largeImageURL:t,tags:p,likes:e,views:r,comments:c,downloads:v})=>`
      <li class="wrap-card">
        <a class="link-card" href="${t}">
          <img class="photo-card" src="${a}" alt="${p}"/>
        </a>
        <div class="info">
          <div class="wrap-text">
            <p><b>Likes</b> ${e}</p>
          </div>
          <div class="wrap-text">
            <p><b>Views</b> ${r}</p>
          </div>
          <div class="wrap-text-two">
            <p><b>Comments</b> ${c}</p>
          </div>
          <div class="wrap-text-two">
            <p><b>Downloads</b> ${v}</p>
          </div>
        </div>
      </li>
      `).join("")}const E="https://pixabay.com/api/",x="48269071-e04b626909c4b310c40a55ae0";async function m(s,a=1){try{return(await w.get(E,{params:{key:x,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:20}})).data}catch(t){throw console.error("Error fetching images:",t.message),t}}const f=document.querySelector(".form");f.classList.add("form");const h=document.querySelector(".input"),o=document.createElement("button");o.type="button";o.textContent="LoadMore";o.id="load-more";o.style.display="none";o.classList.add("load-more");document.body.appendChild(o);const i=document.createElement("div");i.id="gallery";document.body.appendChild(i);const d=document.createElement("ul"),n=document.querySelector(".loader");n.style.display="none";let g=new L("#gallery a",{captionsData:"alt",captionDelay:250}),l=1,b=20;f.addEventListener("submit",async s=>{s.preventDefault(),n.style.display="block",i.innerHTML="",d.innerHTML="",o.style.display="none";const a=h.value.trim();if(!a){u.show({title:"Error",message:"These fields are empty, please, fill these all!",color:"red"}),n.style.display="none";return}try{l=1;const t=await m(a,l);if(t.hits.length===0){u.show({title:"Error",message:"Sorry, there are no any matching your search query. Please try again!",color:"red"}),n.style.display="none";return}d.insertAdjacentHTML("beforeend",y(t.hits)),i.append(d),g.refresh(),t.totalHits>l*b&&(o.style.display="block",i.insertAdjacentElement("afterend",o))}catch(t){console.error(t)}finally{setTimeout(()=>{n.style.display="none"},1e3)}});o.addEventListener("click",async()=>{n.style.display="block",o.disabled=!0,l+=1;try{const s=await m(h.value.trim(),l);d.insertAdjacentHTML("beforeend",y(s.hits)),i.append(d),g.refresh();const a=i.getBoundingClientRect();window.scrollBy({top:a.height/2,behavior:"smooth"}),s&&s.totalHits<=l*b&&(o.style.display="none",u.show({title:"Error",message:"We're sorry, but you've reached the end of search results.",color:"blue"}))}catch(s){console.error(s)}finally{setTimeout(()=>{n.style.display="none"},1e3),o.disabled=!1}});
//# sourceMappingURL=index.js.map
