/// <reference types="vite/client" />

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    mainBgColor: string;
    navBarBgColor: string;
    textColor: string;
    btnBgColor: string;
    cardBgColor: string;
    avatarBgColor: string;
    avatarBorderColor: string;
    dropdownSelectedBgColor: string;
    inputBkg: string;
    dropdownHoverBgColor: string;
    tableTheadBgColor: string;
    tableBorderColor: string;
    cardBorderColor: string;
    scrollbarBgColor: string;
    scrollbarHoverBgColor: string;
    inputSearchBkg: string;
    btnDeleteBgColor: string;
    modalBgColor: string;
    modalBorderColor: string;
    modalOutsideBgColor: string;
    loaderBgColor: string;
    skeletonBgColor1: string;
    skeletonBgColor2: string;
    dropdownMenuBgColor: string;
  }
}
