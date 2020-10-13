import App from './App.svelte';
import './custom-elements';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;