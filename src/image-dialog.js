import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";

export class ImageDialog extends DDD {

  static get tag() {
    return 'image-dialog';
  }

  constructor() {
    super();
    this.images = [];
  }

  static get styles() {

    return css`

      :host {
      }

    `;
  }

  render() {
    return html`
    `;
  }

  static get properties() {
    return {
        images: { type: Array, reflect: false },
    };
  }
}


globalThis.ImageDialog = globalThis.ImageDialog || {};

globalThis.ImageDialog.requestAvailability = () => {
  if (!window.ImageDialog.instance) {
    globalThis.ImageDialog.instance = document.createElement("simple-modal");
    document.body.appendChild(globalThis.ImageDialog.instance);
  }
  return globalThis.ImageDialog.instance;
};

export const ImageDialogStore = globalThis.ImageDialog.requestAvailability();