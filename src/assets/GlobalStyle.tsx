import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import '../index.css';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: "DungGeunMo";
    font-weight: normal;
    src: url()("./../fonts/DungGeunMo2.ttf") format("truetype");
  }

  body {
    font-family: "DungGeunMo";
    line-height: 1.5;
    background-color: var(--primary);
  }

  h2, p {
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  a:visited {
    text-decoration: none;
    color: black;
  }
`;

export default GlobalStyle;
