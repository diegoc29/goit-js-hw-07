import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

document.addEventListener('DOMContentLoaded', function () {
  new SimpleLightbox ('.sl-gallery a',{
    captionsData: "alt",
    captionDelay: 250
  });
});

const galleryContainer = document.querySelector('.gallery');
let lightboxInstance = null; 


const markup = galleryItems
  .map(
    (item) => `
    <li>
      <a class="gallery__link" href="${item.original}">
        <img class="gallery__image" src="${item.preview}" alt="${item.description}" />
      </a>
    </li>
  `
  )
  .join('');

galleryContainer.innerHTML = markup;

galleryContainer.addEventListener('click', function (event) {
    event.preventDefault();


if (event.target.tagName === 'IMG') {
    const imageUrl = event.target.parentElement.href;    
  

 lightboxInstance = SimpleLightbox.create(`
      <img src="${imageUrl}" alt="Imagen en ventana modal" />
    `, {
      onShow: (instance) => {
        const modalImage = instance.element().querySelector('img');
      
        modalImage.src = imageUrl;

        document.addEventListener('keyup', handleKeyUb);
      },

      onClose: () => {
        document.removeEventListener('keyup', handleKeyUb);
      }
    });
    
    lightboxInstance.show();
  }
});

function handleKeyUb(event){
  if (event.key === 'Escape') {
    lightboxInstance.close();
  }
}

