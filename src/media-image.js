import { html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import '@lrnwebcomponents/play-list/play-list.js';

class MediaImage extends DDD {
  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        max-width: 300px;
        background: black;
        border: 5px solid green;
        box-sizing: border-box;
        position: relative;
      }
      img {
        width: 100%;
        height: auto;
      }
      .close-button {
        position: absolute;
        top: 0;
        right: 0;
        background: none;
        border: none;
        font-size: 24px;
        color: white;
        cursor: pointer;
      }
      .navigation-buttons {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(0, 0, 0, 0.5);
        padding: 10px;
      }
      .navigation-buttons button {
        background: none;
        border: none;
        font-size: 24px;
        color: white;
        cursor: pointer;
      }
      .slideshow {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background: rgba(0, 0, 0, 0.5);
      }
      .slideshow .caption {
        color: white;
      }
    `;
  }

  static get properties() {
    return {
      source: { type: String },
      caption: { type: String },
      images: { type: Array },
      captions: { type: Array },
      currentImageIndex: { type: Number }
    };
  }

  constructor() {
    super();
    this.source = '';
    this.caption = '';
    this.images = [];
    this.captions = [];
    this.currentImageIndex = 0;
  }

  render() {
    return html`
      <img src="${this.source}" alt="${this.caption}">
      <button class="close-button" @click="${this.closePlaylist}">×</button>
      <div class="navigation-buttons">
        <button class="prev-button" @click="${this.prevImage}">&lt;</button>
        <div class="slideshow">
          <span class="image-number">${this.currentImageIndex + 1}/${this.images.length}</span>
          <span class="caption">${this.caption}</span>
        </div>
        <button class="next-button" @click="${this.nextImage}">&gt;</button>
      </div>
      <play-list id="playlist"></play-list>
    `;
  }

  static get tag() {
    return "media-image";
  }

  firstUpdated() {
    this.shadowRoot.querySelector('img').addEventListener('click', () => this.openPlaylist());
    this.shadowRoot.querySelector('.close-button').addEventListener('click', () => this.closePlaylist());
    this.shadowRoot.querySelector('.next-button').addEventListener('click', () => this.nextImage());
    this.shadowRoot.querySelector('.prev-button').addEventListener('click', () => this.prevImage());
    console.log('Page has loaded. Images:', this.images);
  }

  openPlaylist() {
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.background = 'rgba(0, 0, 0, 0.5)';
    popup.style.zIndex = '9999';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    document.body.appendChild(popup);
  
    const counter = document.createElement('div');
    counter.style.position = 'absolute';
    counter.style.top = '20px';
    counter.style.left = '20px';
    counter.style.background = 'black';
    counter.style.padding = '5px 10px';
    counter.style.borderRadius = '5px';
    counter.innerText = `${this.currentImageIndex + 1}/${this.images.length}`;
    popup.appendChild(counter);
  
    const slideshow = document.createElement('div');
    slideshow.style.width = '100%';
    slideshow.style.maxWidth = '800px';
    slideshow.style.height = '500px';
    slideshow.style.position = 'relative';
    slideshow.style.marginTop = '50px';
    slideshow.style.marginBottom = '20px';
    popup.appendChild(slideshow);
  
    const img = document.createElement('img');
    img.src = this.images[this.currentImageIndex];
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.objectFit = 'contain';
    slideshow.appendChild(img);
  
    const caption = document.createElement('div');
    caption.style.position = 'absolute';
    caption.style.bottom = '0';
    caption.style.left = '0';
    caption.style.right = '0';
    caption.style.background = 'black';
    caption.style.padding = '10px';
    caption.style.textAlign = 'center';
    caption.innerText = this.captions[this.currentImageIndex];
    slideshow.appendChild(caption);
  
    const thumbnails = document.createElement('div');
    thumbnails.style.display = 'flex';
    thumbnails.style.justifyContent = 'center';
    thumbnails.style.marginTop = '10px';
    thumbnails.style.marginBottom = '20px';
    popup.appendChild(thumbnails);
  
    this.images.forEach((image, index) => {
      const thumbnail = document.createElement('img');
      thumbnail.src = image;
      thumbnail.style.width = '100px';
      thumbnail.style.height = '75px';
      thumbnail.style.objectFit = 'cover';
      thumbnail.style.margin = '0 5px';
      thumbnail.addEventListener('click', () => {
        this.currentImageIndex = index;
        img.src = image;
        caption.innerText = this.captions[index];
        counter.innerText = `${this.currentImageIndex + 1}/${this.images.length}`;
      });
      thumbnails.appendChild(thumbnail);
    });
    const prevButton = document.createElement('button');
    prevButton.style.position = 'absolute';
    prevButton.style.top = '50%';
    prevButton.style.left = '20px';
    prevButton.style.background = 'transparent';
    prevButton.style.border = 'none';
    prevButton.style.fontSize = '24px';
    prevButton.style.color = 'white';
    prevButton.style.transform = 'translateY(-50%)';
    prevButton.innerText = '<';
    prevButton.addEventListener('click', () => {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
      img.src = this.images[this.currentImageIndex];
      caption.innerText = this.captions[this.currentImageIndex];
      counter.innerText = `${this.currentImageIndex + 1}/${this.images.length}`;
    });
    popup.appendChild(prevButton);
  
    const nextButton = document.createElement('button');
    nextButton.style.position = 'absolute';
    nextButton.style.top = '50%';
    nextButton.style.right = '20px';
    nextButton.style.background = 'transparent';
    nextButton.style.border = 'none';
    nextButton.style.fontSize = '24px';
    nextButton.style.color = 'white';
    nextButton.style.transform = 'translateY(-50%)';
    nextButton.innerText = '>';
    nextButton.addEventListener('click', () => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      img.src = this.images[this.currentImageIndex];
      caption.innerText = this.captions[this.currentImageIndex];
      counter.innerText = `${this.currentImageIndex + 1}/${this.images.length}`;
    });
    popup.appendChild(nextButton);
  
    const closeButton = document.createElement('button');
    closeButton.style.position = 'fixed';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.style.background = 'black';
    closeButton.style.border = 'none';
    closeButton.style.color = 'white';
    closeButton.style.fontSize = '24px';
    closeButton.style.padding = '10px';
    closeButton.innerText = 'X';
    closeButton.addEventListener('click', () => {
      popup.remove();
    });
    popup.appendChild(closeButton);
  }

  closePlaylist() {
    const popupWindow = window.open('', '_blank');
    popupWindow.close();
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.source = this.images[this.currentImageIndex];
    this.caption = this.captions[this.currentImageIndex];
    this.updateSlideshow();
    this.updateCounter();
  }
  
  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    this.source = this.images[this.currentImageIndex];
    this.caption = this.captions[this.currentImageIndex];
    this.updateSlideshow();
    this.updateCounter();
  }
  
  updateCounter() {
    const counter = document.querySelector('.counter');
    counter.innerText = `${this.currentImageIndex + 1}/${this.images.length}`;
  }

  updateSlideshow() {
    const slideshow = this.shadowRoot.querySelector('.slideshow');
    slideshow.innerHTML = `
      <span class="image-number">${this.currentImageIndex + 1}/${this.images.length}</span>
      <span class="caption">${this.caption}</span>
    `;
  }
}

customElements.define(MediaImage.tag, MediaImage);