import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import {
    querySelectorAllDeep,
    querySelectorDeep
} from 'query-selector-shadow-dom';
// TODO: better way of importing custom elements
import '../src/custom-elements';

import App from '../src/App'

beforeAll(() => {
    // testing-library uses querySelectorAll to find elements
    // Replace it with a function that will find elements in shadow roots
    document.body.querySelectorAll = querySelectorAllDeep;
    document.body.querySelector = querySelectorDeep;
})

describe('Svelte tests', () => {
    test('main heading', () => {
        render(App, { name: 'world' });
        const mainHeading = screen.getByText('Custom Element Demo');
        expect(mainHeading).toBeInTheDocument();
    });

    test('simple greeting', async () => {
        render(App, { name: 'Geoff' });
        // wait for custom element to be rendered
        const greeting = await screen.findByText('Hello, Geoff!');
        // you can't use toBeInTheDocument for custom element children
        // because element.ownerDocument.contains(element) returns false
        expect(greeting).toBeVisible();

        // PR open on testing-library to make workaround unnecessary
        const root = greeting.getRootNode().host;
        expect(root).toBeInTheDocument();
    });

    test('custom button', async () => {
        render(App, { name: 'Geoff' });
        const button = await screen.findByRole('button', {name: "Submit"});
        userEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText('Successfully submitted!')).toBeInTheDocument();
        });
        expect(button).toBeDisabled();
    });

    test('custom text input', async () => {
        render(App, { name: 'Geoff' });
        const input = await screen.findByLabelText('Name');
        userEvent.type(input, 'testing, testing');
        
        await waitFor(() => {
            expect(screen.getByText('You typed: testing, testing')).toBeInTheDocument();
        });
    });
})
