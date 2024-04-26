import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";

export class MediaImage extends DDD {

  static get tag() {
    return 'media-image';
  }

  constructor() {
    super();
    this.source = "https://assets-global.website-files.com/648b07b602810d848d5617a5/64a5856733c97c2d2457e7ad_6234f0e17e979159359bd9e6_Designership-Shipfaster-UI-Design-System-4%2520(1).png";
    this.caption = "Temp"
    this.description = "Temp temp temp temp"
    this.altText = "temp alt text";
    this.primary = "green";
    this.secondary = "black";
  }

  static get styles() {

    return css`

      :host([primary="green"]) {
        --background-color: var(--ddd-theme-default-opportunityGreen);
      }
      :host([primary="red"]) {
        --background-color: var(--ddd-theme-default-original87Pink);
      }
      :host([primary="blue"]) {
        --background-color: var(--ddd-theme-default-beaverBlue);
      }
      :host([primary="black"]) {
        --background-color: #000;
      }

      :host([secondary="green"]) {
        --border-color: var(--ddd-theme-default-opportunityGreen);
      }
      :host([secondary="red"]) {
        --border-color: var(--ddd-theme-default-original87Pink);
      }
      :host([secondary="blue"]) {
        --border-color: var(--ddd-theme-default-beaverBlue);
      }
      :host([secondary="black"]) {
        --border-color: #000;
      }

      :host {
        margin: 25px;
      }

      .background {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: .15rem solid var(--border-color, var(--ddd-theme-default-coalyGray));
        border-radius: 8px;
        width: var(--width, 650px);
        height: var(--height, 350px);
        padding: 1%;
        background-color: var(--background-color);
      }

      .background:hover {
        transform: translate(8px,-8px);
        box-shadow: -8px 8px var(--border-color);
        transition: .5s;
      }

      img {
        width: var(--image-width, 80%);
        height: var(--image-height, 85%);
        border: .15rem solid var(--border-color, var(--ddd-theme-default-coalyGray));
        border-radius: 8px;
      }

      .caption {
        height: 13%;
        padding: 2% 0;
        margin: 0;
        font-size: 25px;
        color: var(--caption-color, var(--ddd-theme-default-slateMaxLight))
      }

    `;
  }



openPlaylist() {
    const evt = new CustomEvent("toggle-play-list", {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        opened: true,
        invokedBy: this,
      },
    });
    this.dispatchEvent(evt);
  }

  addToModal() {
//such emptiness.
  }


  //new code
  render() {
    this.addToModal();
    return html`
        <div class="background" @click="${this.openPlaylist}">
            <img src="${this.source}" alt="${this.altText}"></img>
            <p class="caption">${this.caption}</p>
        </div>
    `;
}
//end new

  static get properties() {
    return {
        source: { type: String, reflect: true },
        caption: {type: String, reflect: true},
        altText: { type: String, reflect: true, attribute: "alt-text" },
        description: { type: String, reflect: true },
        primary: { type: String, reflect: true },
        secondary: { type: String, reflect: true },
    };
  }
}

globalThis.customElements.define(MediaImage.tag, MediaImage);