import { createGlobalStyle } from "styled-components";

const spacing = {
    xs: '4px',
    s: '8px',
    m: '16px',
    l: '24px',
    xl: '32px',
    xxl: '64px'
};

const colors = {
    white: '#ffffff',
    black: '#000000',
    lightBlue: '#00acee',
    lightBlue2: '#008ec4',
    lightGreen: '#2baf2b',
    lightGray: '#ccc',
    lightGray2: '#797979',
    lightGray3: '#eeeeee'

};

const opacity = {
    s: 0.16,
    m: 0.32,
    l: 0.64
};

export const theme = {
    margin: spacing,
    padding: spacing,
    fontFamily: {
        primary: 'Arial, sans-serif',
        secondary: 'Montserrat, serif'
    },
    fontSize: {
        xs: '10px',
        s: '12px',
        m: '14px',
        l: '18px',
        xl: '48px'
    },
    fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        bold: 600
    },
    color: {
        ...colors
    },
    backgroundColor: {
        ...colors
    },
    opacity: {
        ...opacity
    }
};

const GlobalStyle = createGlobalStyle`
    body{
      margin: 0;
      font-family: ${theme.fontFamily.primary};
      background-color: ${theme.backgroundColor.black};
    }
    
    a {
      text-decoration: none;
    }
`;

export default GlobalStyle;
