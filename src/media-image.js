import {LitElement, html, css} from 'lit';
//import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";

// Singleton for managing the content in the body and listening for media-image tags
globalThis.MediaImageManager = globalThis.MediaImageManager || {};
globalThis.MediaImageManager.requestAvailability = () => {
  if (!window.MediaImageManager.instance) {
    globalThis.MediaImageManager.instance = document.createElement("media-image-manager");
    document.body.appendChild(globalThis.MediaImageManager.instance);
  }
  return globalThis.MediaImageManager.instance;
};

export const MediaImageManagerStore = globalThis.MediaImageManager.requestAvailability();

// media-image web component
export class mediaImage extends LitElement {
    static get styles() {
      return css`
        :host {
          display: block;
          width: 100%;
          max-width: 300px;
          background: black;
          border: 5px solid green;
          box-sizing: border-box;
        }
        img {
          width: 100%;
          height: auto;
        }
        /* Styles for the lightbox and navigation arrows */
        .lightbox {
          display: none;
          position: fixed;
          z-index: 9999;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          justify-content: center;
          align-items: center;
          overflow: auto;
        }
        .lightbox img {
          max-width: 80%;
          max-height: 80%;
          margin: auto;
          display: block;
        }
        .lightbox .prev, .lightbox .next, .lightbox .close {
          color: #fff;
          font-size: 2em;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.5);
          padding: 10px;
          cursor: pointer;
        }
        .lightbox .prev { left: 10px; }
        .lightbox .next { right: 10px; }
        .lightbox .close { top: 10px; right: 10px; transform: none; }
        .lightbox .caption {
          position: absolute;
          bottom: 10px;
          left: 0;
          width: 100%;
          text-align: center;
          color: #fff;
          font-size: 1.2em;
        }
      `;
    }
  
    static get properties() {
      return {
        source: { type: String },
        caption: { type: String },
        images: { type: Array },
        captions: { type: Array }
      };
    }
  
    constructor() {
      super();
      this.source = '';
      this.caption = '';
      this.images = []; // Array of all image sources for the slideshow
      this.captions = []; // Array of all image captions for the slideshow
    }
  
    firstUpdated() {
      this.shadowRoot.querySelector('img').addEventListener('click', () => this.openLightbox());
      this.shadowRoot.querySelector('.close').addEventListener('click', () => this.closeLightbox());
      console.log('Page has loaded. Images:', this.images);
    }
  
    openLightbox() {
      this.shadowRoot.querySelector('.lightbox').style.display = 'block';
      console.log('Image clicked. Images:', this.images);
    }
  
    closeLightbox() {
      this.shadowRoot.querySelector('.lightbox').style.display = 'none';
      console.log('Lightbox closed. Images:', this.images);
    }
  
    nextImage() {
      let index = this.images.indexOf(this.source);
      if (index < this.images.length - 1) {
        this.source = this.images[index + 1];
        this.caption = this.captions[index + 1];
      }
      console.log('Next button clicked. Images:', this.images);
    }
    
      prevImage() {
        let index = this.images.indexOf(this.source);
        if (index > 0) {
          this.source = this.images[index - 1];
          this.caption = this.captions[index - 1];
        }
        console.log('Previous button clicked. Images:', this.images);
      }
      
      render() {
        return html`
          <img src="${this.source}" alt="${this.caption}">
          <p>${this.caption}</p>
          <div class="lightbox">
            <span class="close" @click="${this.closeLightbox}">X</span>
            <span class="prev" @click="${this.prevImage}">❮</span>
            <img src="${this.source}" alt="${this.caption}">
            <span class="next" @click="${this.nextImage}">❯</span>
            <div class="caption">${this.caption}</div>
          </div>
        `;
      }
    }
    
  
  customElements.define('media-image', mediaImage);
  