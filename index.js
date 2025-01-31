import{a as w,S as x,i as f}from"./assets/vendor-Dpd1z_xS.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))m(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&m(p)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function m(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();function h(n){return n.map(({webformatURL:i,largeImageURL:t,tags:m,likes:e,views:s,comments:p,downloads:v})=>`
      <li class="wrap-card">
        <a class="link-card" href="${t}">
          <img class="photo-card" src="${i}" alt="${m}"/>
        </a>
        <div class="info">
          <div class="wrap-text">
            <p><b>Likes</b> ${e}</p>
          </div>
          <div class="wrap-text">
            <p><b>Views</b> ${s}</p>
          </div>
          <div class="wrap-text-two">
            <p><b>Comments</b> ${p}</p>
          </div>
          <div class="wrap-text-two">
            <p><b>Downloads</b> ${v}</p>
          </div>
        </div>
      </li>
      `).join("")}const E="https://pixabay.com/api/",C="48269071-e04b626909c4b310c40a55ae0";async function g(n,i=1){try{return(await w.get(E,{params:{key:C,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:20}})).data}catch(t){throw console.error("Error fetching images:",t.message),t}}const o=document.createElement("form");o.classList.add("form");const l=document.createElement("input"),y=document.createElement("button");y.classList.add("searchButton");const a=document.createElement("button");l.classList.add("input");l.type="text";l.name="search";l.placeholder="Enter search query...";l.style.marginRight="10px";y.type="submit";y.textContent="Search";y.style.marginRight="10px";a.type="button";a.textContent="LoadMore";a.id="load-more";a.style.display="none";a.classList.add("load-more");o.appendChild(l);o.appendChild(y);document.body.appendChild(o);o.style.alignItems="center";o.style.position="fixed";o.style.top="50px";o.style.left="50%";o.style.transform="translate(-50%, -50%)";o.style.justifyContent="center";o.style.gap="10px";const c=document.createElement("div");c.id="gallery";document.body.appendChild(c);const u=document.createElement("ul");let b=new x("#gallery a",{captionsData:"alt",captionDelay:250}),d=1,L=15;const r=document.createElement("div");r.textContent="Loading images, please wait...";r.classList.add("loader");r.style.display="none";document.body.appendChild(r);o.addEventListener("submit",async n=>{a.style.display="none",n.preventDefault(),r.style.display="block",setTimeout(()=>{r.style.display="none"},3e3);const i=l.value.trim();if(!i){f.show({title:"Error",message:"These fields are empty, please, fill these all!",color:"red"}),r.style.display="none";return}try{d=1;const t=await g(i,d);if(t.hits.length===0){f.show({title:"Error",message:"Sorry, there are no any matching your search query. Please try again!",color:"red"}),r.style.display="none";return}c.innerHTML="",u.insertAdjacentHTML("beforeend",h(t.hits)),c.append(u),t.totalHits>d*L&&(a.style.display="block",c.insertAdjacentElement("afterend",a)),b.refresh()}catch(t){console.error(t)}finally{r.style.display="none"}});a.addEventListener("click",async()=>{d+=1,r.style.display="block",r.textContent="Loading images, please wait...",a.disabled=!0;try{const n=await g(l.value.trim(),d);u.insertAdjacentHTML("beforeend",h(n.hits)),c.append(u),b.refresh(),n.totalHits<=d*L&&(a.style.display="none")}catch(n){console.error(n)}finally{r.style.display="none",a.textContent="Load More",a.disabled=!1}});
//# sourceMappingURL=index.js.map
