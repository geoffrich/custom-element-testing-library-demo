import { render, screen, waitFor } from '@testing-library/svelte';
import {
    querySelectorAllDeep,
    querySelectorDeep
} from 'query-selector-shadow-dom';
// TODO: better way of importing custom elements
import '../src/custom-elements/simple-greeting';
import '../src/custom-elements/custom-button';

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
        renderWithCustomElements(App, { name: 'world' });
        const mainHeading = screen.getByText('Custom Element Demo');
        expect(mainHeading).toBeInTheDocument();
    });

    test('simple greeting', async () => {
        renderWithCustomElements(App, { name: 'Geoff' });
        // wait for custom element to be rendered
        const greeting = await screen.findByText('Hello, Geoff!');
        // you can't use toBeInTheDocument for custom element children
        // because element.ownerDocument.contains(element) returns false
        expect(greeting).toBeVisible();

        // possibly contribute back to testing library?
        const root = greeting.getRootNode().host;
        expect(root).toBeInTheDocument();
    });

    test('custom button', async () => {
        renderWithCustomElements(App, { name: 'Geoff' });
        const button = await screen.findByRole('button', {name: "Submit"});
        button.click();
        await waitFor(() => {
            expect(screen.getByText('Successfully submitted!')).toBeInTheDocument();
        });
        expect(button).toBeDisabled();
    });
})
