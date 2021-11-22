import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
     Modal: {
      baseStyle: {
        overlay: {
          bg: '',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)'
        },
        dialog: {
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          bg: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '2rem',
          border: '1px solid rgba(142, 148, 179, 0.2)'
        }
      }
    },
  }
});

export default theme;