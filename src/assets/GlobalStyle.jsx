import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Press Start 2P', cursive;
}

::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

`;

export default GlobalStyle;
