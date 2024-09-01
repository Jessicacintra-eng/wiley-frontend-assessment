import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        text: {
          primary: '#313131',
        },
        primary: {
          plainColor:  '#313131',
          solidColor: '#ffffff',
          solidBg: '#115C36',
          solidHoverBg: '#115c3614', 
          solidActiveBg: '#115c3614', 
          solidDisabledBg: '#9999999', 
        },
      },
    },
  },
  components: {
    JoyTypography: {
      styleOverrides: {
        root: {
          color: '#313131',
        },
      
  }
},
}
});

export default theme;
