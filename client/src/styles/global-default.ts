import { createGlobalStyle } from 'styled-components';
import { size } from '@/utils/media/breakpoints';

export const DefaultStyle = createGlobalStyle`

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}

body {
	font-family: 'Inter', sans-serif;
	overflow-y: auto;
	overflow-x: hidden;
  	position: relative;
}

ol, ul {
	list-style: none;
}

.g-container{ 
	max-width: ${size.laptopL};
	margin: 0 auto;
	height: 100%;
}

a {
    text-decoration: none;
    color: ${(props) => props.theme.textColor};
  }

  ::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  background-color: ${(props) => props.theme.scrollbarBgColor};  ;
  border-radius: 5px;

}

::-webkit-scrollbar-thumb:hover {
  background-color: ${(props) => props.theme.scrollbarHoverBgColor};
}

.g-search {
    border-radius: 5px;
    outline: none;
    border: none;
	  padding: 0 var(--min-spacing);
	  height: 40px;
	  background-color:${(props) => props.theme.inputSearchBkg}; 
  }

  .g-input {
    height: 40px;
    border-radius: var(--min-radius);
    border: 0;
    padding: 0 var(--min-spacing);
    width: 100%;
    background-color: ${(props) => props.theme.inputBkg};
    box-sizing: border-box;
    outline: none;
    color: ${(props) => props.theme.textColor};
  }

  .g-input::placeholder {
    color: ${(props) => props.theme.textColor};
  }

  .g-textarea {
    resize: none;
    background-color: ${(props) => props.theme.inputBkg};
    height: 150px;
    border: 0;
    padding:  8px;
    outline: none;
    color: ${(props) => props.theme.textColor};
    border-radius: var(--min-radius);
    width: 100%;
    box-sizing: border-box;


  }

`;
