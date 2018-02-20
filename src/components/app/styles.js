import { injectGlobal } from 'styled-components';

injectGlobal`
  a {
    color: inherit;
    text-decoration: none;
  }

  html, body {
    padding: 0;
    margin: 0;
    height: 100%;
    font-family: 'Roboto', sans-serif;
    overflow-y: hidden;
    background: #1c222e;
    color: #eee;
  }

  #app-root {
    height: inherit;
  }

  #modal-root {
    display: none;
    position: absolute;
  }

  .DND--Drag {
    z-index: 4000;
  }

  [type=range] {
    -webkit-appearance: none;
    margin: 7px 0;
    width: 100%;
    background: transparent;
  }
  
  [type=range]:focus {
    outline: none;
  }
  
  [type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    /* transition: all .2s ease; */
    box-shadow: 0px 0px 0px #222, 0 0 0px #2f2f2f;
    background: #394158;
    border: 0px solid #000;
    border-radius: 5px;
  }
  
  [type=range]::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #111, 0 0 0px #1e1e1e;
    border: 0px solid #fff;
    height: 14px;
    width: 14px;
    border-radius: 7px;
    background: #8a919d;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  
  [type=range]:focus::-webkit-slider-runnable-track {
    background: #434c67;
  }
  
  [type=range]::-moz-range-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    /* transition: all .2s ease; */
    box-shadow: 0px 0px 0px #222, 0 0 0px #2f2f2f;
    background: #394158;
    border: 0px solid #000;
    border-radius: 5px;
  }
  
  [type=range]::-moz-range-thumb {
    box-shadow: 0px 0px 0px #111, 0 0 0px #1e1e1e;
    border: 0px solid #fff;
    height: 14px;
    width: 14px;
    border-radius: 7px;
    background: #8a919d;
    cursor: pointer;
  }
  
  [type=range]::-ms-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    /* transition: all .2s ease; */
    background: transparent;
    border-color: transparent;
    border-width: 14px 0;
    color: transparent;
  }
  
  [type=range]::-ms-fill-lower {
    box-shadow: 0px 0px 0px #222, 0 0 0px #2f2f2f;
    background: #2f3649;
    border: 0px solid #000;
    border-radius: 10px;
  }
  
  [type=range]::-ms-fill-upper {
    box-shadow: 0px 0px 0px #222, 0 0 0px #2f2f2f;
    background: #394158;
    border: 0px solid #000;
    border-radius: 10px;
  }
  
  [type=range]::-ms-thumb {
    box-shadow: 0px 0px 0px #111, 0 0 0px #1e1e1e;
    border: 0px solid #fff;
    height: 14px;
    width: 14px;
    border-radius: 7px;
    background: #8a919d;
    cursor: pointer;
  }
  
  [type=range]:focus::-ms-fill-lower {
    background: #394158;
  }
  
  [type=range]:focus::-ms-fill-upper {
    background: #434c67;
  }
`;