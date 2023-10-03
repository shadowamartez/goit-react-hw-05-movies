import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }

    code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    li, ul {
        list-style: none;
        padding: 0;
    }

    a {
        text-decoration: none;
        color: black;
    }

    a:hover {
        color: orangered;
    }

    button {
        background-color: orangered;
        color: white;
        border-radius: 4px;
        padding: 8px 16px;
        border: 4px black;
    }

    input, input:hover, focus {
        padding: 8px 16px;
        border-radius: 4px;
        outline: none; 
    }
`;