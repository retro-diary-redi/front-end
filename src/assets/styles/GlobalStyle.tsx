import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  :root {
  --primary: #fbf2e8;
  --secondary: #d6dddb;
  --yellow: #FFFACD;
  --blue: #1246ff;
  --red: #ff1d1d;
}

  @font-face {
    font-family: "DungGeunMo";
    font-weight: normal;
    src: url()("./../fonts/DungGeunMo2.ttf") format("truetype");
  }

  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body {
    height: 100%;
    font-family: "DungGeunMo";
    line-height: 1.5;
    background-color: var(--primary);
  }

  #root {
    height: 100%;
  }

  h1, h2, p {
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  a:visited {
    text-decoration: none;
    color: black;
  }

  input {
    border: none;
  }

  input:focus {
    outline: none;
  }

  *:disabled {
    color: black;
  }
`;

export default GlobalStyle;
