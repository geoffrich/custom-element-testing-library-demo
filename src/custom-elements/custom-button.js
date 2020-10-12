import { LitElement, html } from 'lit-element';

class CustomButton extends LitElement {
  static get properties() {
    return { disabled: { type: Boolean } };
  }

  constructor() {
    super();
    this.disabled = false;
  }
  
  render() {
    return html`<button ?disabled=${this.disabled}><slot></slot></button>`;
  }
}

customElements.define('custom-button', CustomButton);
