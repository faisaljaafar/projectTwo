import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";

export class PlayList extends DDD {

  static get tag() {
    return 'play-list';
  }

  constructor() {
    super();
    this.mediaImages;
    this.oppened = false;
    this.currentIndex = 0;
    this.currentImage = null; // Added initialization
    document.body.addEventListener("toggle-play-list", (e) => this.togglePlaylist(e));

    // document.body.addEventListener("toggle-play-list", (e) => {
    //     console.log("Toggle playlist event received:", e);
    //     this.togglePlaylist(e);
    //   });
  }

  //old code
//   togglePlaylist(e) {
//     if (this.oppened) {
//       this.oppened = false;
//     } else {
//       this.getCurrentImage(e);
//       this.oppened = true;
//     }
//     this.requestUpdate();
//   }
  //end

  //new code
 togglePlaylist(e) {
    if (this.oppened) {
      this.oppened = false;
    } else {
      if (this.mediaImages) {
        const index = Array.from(this.mediaImages).indexOf(e.detail.invokedBy);
        if (index !== -1) {
          this.currentIndex = index;
          this.getCurrentImage(e);
          this.oppened = true;
        }
      }
    }
    this.requestUpdate();
}
//end new code

  connectedCallback() {
    super.connectedCallback();
    this.getImages(); // Get images when component is connected to the DOM
  }

  //OLD OLD OLD
//   getImages(e) {
//     this.mediaImages = document.querySelectorAll('media-image');

//     var i = 0;
//     this.mediaImages.forEach(element => {
//       if (element == e.target) {
//         this.currentIndex = i;
//       }
//       i = i + 1;
//     });
//   }

  //new code
  getImages() {
    this.mediaImages = document.querySelectorAll('media-image');
    // var i = 0;
    // this.mediaImages.forEach(element => {
    //   element.setAttribute("data-index", i);
    //   i++;
    // });
}

selectImage(e) {
    const index = e.target.getAttribute('data-index');
    if (index !== null) {
        this.currentIndex = parseInt(index);
        this.currentImage = this.mediaImages[this.currentIndex];
        this.requestUpdate();
    }
}


//end new code
  


  static get styles() {

    return css`

      :host {
        --width: 900px;
        --height: 500px;
      }

     .background-overlay { 
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0px;
        left: 0px;
        background-color: rgba(0,0,0,.5);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

     .content {
        display: flex;
        flex-direction: row;
        color: white;
        align-items: center;
      }

     .close-button {
        position: fixed;
        top: 20px;
        right: 20px;
        border: none;
        background-color: none;
        border-radius: 90%;
        height: 1.5rem;
        width: 1.5rem;
        font-size: 1rem;
      }

     .image-box {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      media-image {
        pointer-events: none;
      }

      button {
        height: 40px;
        width: 80px;
        margin-right: 20px;
        margin-left: 20px;
      }

     .progress-numbers {
        display: flex;
        flex-direction: row;
      }

     .thumbnail-list {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 20px;
      }

     .thumbnail {
        width: 50px;
        height: 50px;
        border: 2px solid transparent;
        cursor: pointer;
      }

     .thumbnail.selected {
        border: 2px solid black;
      }
    `;
  }

  closeOverlay() {
    this.oppened = false;
    this.requestUpdate();
  }

  getCurrentImage(e) {
    this.getImages(e);
    this.currentImage = this.mediaImages[this.currentIndex].cloneNode();
    //new code
     this.currentIndex = Array.from(this.mediaImages).indexOf(e.target);
     this.currentImage = this.mediaImages[this.currentIndex].cloneNode(true); // Clone with others
  }

// getCurrentImage(e) {
//     if (this.mediaImages && this.mediaImages[this.currentIndex]) {
//       this.currentImage = this.mediaImages[this.currentIndex].cloneNode(true);
//       this.requestUpdate();
//     }
//   }

  moveLeft() {
    if (this.mediaImages[this.currentIndex - 1]) {
      this.currentIndex = this.currentIndex - 1;
      this.currentImage = this.mediaImages[this.currentIndex].cloneNode(true);
      this.requestUpdate();
    }
  }

  moveRight() {
    if (this.mediaImages[this.currentIndex + 1]) {
      this.currentIndex = this.currentIndex + 1;
      this.currentImage = this.mediaImages[this.currentIndex].cloneNode(true);
      this.requestUpdate();
    }
  }

  //old code
//   selectImage(e) {
//     this.currentIndex = Array.prototype.indexOf.call(this.mediaImages, e.target);
//     this.currentImage = this.mediaImages[this.currentIndex].cloneNode(true);
//     this.requestUpdate();
//   }

//NEW CODE
selectImage(e) {
    const index = e.target.getAttribute('data-index');
    if (index !== null) {
        this.currentIndex = parseInt(index);
        this.currentImage = this.mediaImages[this.currentIndex].cloneNode(true);
        this.requestUpdate();
    }
}
  //end NEW CODE
  
//currently working
  render() {
    return !this.oppened ? "" : html`
        <div class="background-overlay">
            <button class="close-button" @click="${this.closeOverlay}">X</button>
            <div class="content">
                <div class="image-box">
                  <span class="progress-numbers">
                    <p>${this.currentIndex + 1}</p>
                    <p>&nbsp;/&nbsp;</p>
                    <p>${this.mediaImages.length}</p>
                  </span>
                  ${this.currentImage}
                  <p>${this.currentImage.description}</p>
                  <span>
                    <button @click="${this.moveLeft}">Previous</button>
                    <button @click="${this.moveRight}">Next</button>
                  </span>
                </div>
                <!-- NEW CODE -->
                <div class="thumbnail-list">
                ${Array.from(this.mediaImages).map((image, index) => html`
                   <img 
                     class="thumbnail ${index === this.currentIndex ? 'selected' : ''}" 
                      src="${image.src}" 
                     alt="${image.alt}" 
                     data-index="${index}"
                     @click="${this.selectImage}">
                  `)}
                </div>
                <!-- NEW CODE -->
            </div>
        </div>    
    `;
  }

  //end currently working

  //new
// Inside the render method of the PlayList component
// render() {
//     return !this.oppened ? "" : html`
//       <div class="background-overlay">
//         <button class="close-button" @click="${this.closeOverlay}">X</button>
//         <div class="content">
//           <div class="image-box">
//             <span class="progress-numbers">
//               <p>${this.currentIndex + 1}</p>
//               <p>&nbsp;/&nbsp;</p>
//               <p>${this.mediaImages.length}</p>
//             </span>
//             ${this.currentImage}
//             <p>${this.currentImage.description}</p>
//             <span>
//               <button @click="${this.moveLeft}">Previous</button>
//               <button @click="${this.moveRight}">Next</button>
//             </span>
//           </div>
//           <!-- NEW CODE -->
//           <div class="thumbnail-list">
//             ${Array.from(this.mediaImages).map((image, index) => html`
//               <media-image 
//                 class="thumbnail ${index === this.currentIndex ? 'selected' : ''}" 
//                 .source="${image.src}" 
//                 .altText="${image.alt}" 
//                 .description="${image.description}"
//                 data-index="${index}"
//                 @click="${this.selectImage}">
//               </media-image>
//             `)}
//           </div>
//           <!-- NEW CODE -->
//         </div>
//       </div>    
//     `;
//   }
  //end



  static get properties() {
    return {
    };
  }
}

globalThis.customElements.define(PlayList.tag, PlayList);


globalThis.PlayList = globalThis.PlayList || {};
globalThis.PlayList.requestAvailability = () => {
  if (!window.PlayList.instance) {
    globalThis.PlayList.instance = document.createElement("play-list");
    document.body.appendChild(globalThis.PlayList.instance);
  }
  return globalThis.PlayList.instance;
};

export const PlayListStore = globalThis.PlayList.requestAvailability();