import {LitElement, html, css} from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";

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
export class mediaImage extends DDD {

    static get styles() {
        return [
          super.styles,
          css`
          :host {
            display: block;
          }
          .my-div {
            padding: var(-ddd-spacing-5);
            margin: var(--ddd-spacing-2) var(--ddd-spacing-0);
            color: var(--ddd-theme-default-keystoneYellow);
          }
        `];
    }


  static get properties() {
    return {
      // Add your properties here
    };
  }

  constructor() {
    super();
    // Initialize your properties here
  }

  render() {
    return html`
      <img src="${this.getAttribute('source')}" alt="${this.getAttribute('caption')}">
      <p>${this.getAttribute('caption')}</p>
    `;
  }
}

customElements.define('media-image', mediaImage);

// play-list web component
class PlayList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Add your properties here
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Add your styles here */
      </style>
      <div>
        <!-- Add your slide show logic here -->
      </div>
    `;
  }
}

customElements.define('play-list', PlayList);

// media-image-manager web component
class MediaImageManager extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Add your properties here
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Add your styles here */
      </style>
      <dialog>
        <!-- Add your dialog logic here -->
      </dialog>
    `;
  }
}

customElements.define('media-image-manager', MediaImageManager);
