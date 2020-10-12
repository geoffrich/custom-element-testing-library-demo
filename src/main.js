import App from './App.svelte';
import './custom-elements/simple-greeting.js';
import './custom-elements/custom-button.js';
const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;