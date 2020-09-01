import { render, screen } from '@testing-library/svelte';
import {
    querySelectorAllDeep,
    querySelectorDeep
} from 'query-selector-shadow-dom';
import { tick } from 'svelte';
import '../src/custom-elements/simple-greeting';

import App from '../src/App'

function renderWithCustomElements(ui, options) {
    // testing-library uses querySelectorAll to find elements
    // Replace it with a function that will find elements in shadow roots
    document.body.querySelectorAll = querySelectorAllDeep;
    document.body.querySelector = querySelectorDeep;
    const renderResult = render(ui, options);

    return renderResult;
}

describe('Svelte tests', () => {
    test('main heading', () => {
        render(App, { name: 'world' });
        const mainHeading = screen.getByText('Custom Element Demo');
        expect(mainHeading).toBeInTheDocument();
    });

    // the greeting is in a custom element
    test('simple greeting', async () => {
        renderWithCustomElements(App, { name: 'Geoff' });
        await tick();
        const greeting = screen.getByText('Hello, Geoff!');
        // why can't I use toBeIntheDocument here?
        expect(greeting).toBeVisible();
    });
})
