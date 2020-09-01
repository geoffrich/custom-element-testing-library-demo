import App from './App.svelte';
import './custom-elements/simple-greeting';
const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;