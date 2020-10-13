import { LitElement, html } from 'lit-element';

class CustomTextInput extends LitElement {
  static get properties() {
    return { label: { type: String }, value: { type: String } };
  }

  handleInput(e) {
    this.value = e.target.value;
  }
  
  render() {
    return html`
      <label for="input">${this.label}</label>
      <input @input=${this.handleInput} .value=${this.value || ''} type="text" id="input">`;
  }
}

customElements.define('custom-text-input', CustomTextInput);
