import{a as E,S as b,i}from"./assets/vendor-tnUJPedx.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&d(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const I="48167569-742bafd1cf9306d4d73187ce8",$="https://pixabay.com/api/";async function p(t,s=1,r=15){const d=`${$}?key=${I}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${s}&per_page=${r}`;try{const e=await E.get(d),{hits:o,totalHits:a}=e.data;return{images:o,total:a}}catch(e){throw console.error("Error fetching images:",e),e}}const L=document.getElementById("gallery");let m;function w(t){const s=t.map(r=>`
      <a href="${r.largeImageURL}" class="gallery-item" data-lightbox="gallery">
        <img src="${r.webformatURL}" alt="${r.tags}" />
        <p>Likes: ${r.likes} | Views: ${r.views} | Comments: ${r.comments} | Downloads: ${r.downloads}</p>
      </a>`).join("");L.insertAdjacentHTML("beforeend",s),m?m.refresh():m=new b(".gallery a")}function y(){L.innerHTML=""}const P=document.getElementById("search-form"),v=document.getElementById("search-input"),f=document.getElementById("load-more"),h=document.getElementById("loader");let u="",l=1;const n=15;let g=0;P.addEventListener("submit",async t=>{if(t.preventDefault(),u=v.value.trim(),!u){y(),i.error({title:"Error",message:"Please enter a search query!"});return}l=1,y(),c(!0),f.classList.add("hidden");try{const{images:s,total:r}=await p(u,l,n);g=r,s.length===0?i.warning({title:"Error!",message:"No images found. Please try a different search query."}):(w(s),s.length===n&&g>n&&f.classList.remove("hidden"))}catch{i.error({title:"Error",message:"Something went wrong. Please try again!"})}finally{c(!1)}});f.addEventListener("click",async()=>{l+=1,c(!0);try{const{images:t}=await p(u,l,n);w(t),(t.length<n||l*n>=g)&&(f.classList.add("hidden"),i.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."})),B()}catch{c(!1),i.error({title:"Error",message:"Failed to load more images."})}finally{c(!1)}});function c(t){t?h.style.display="block":h.style.display="none"}function B(){const t=document.querySelector(".gallery a").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
