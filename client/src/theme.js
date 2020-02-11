import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#89C1F2",
      main: "#1F215E"
    },
    secondary: {
      light: "#89C98C",
      main: "#355D36",
      dark: "#268072"
    },
    error: {
      main: "#C31432"
    },
    warning: {
      main: "#FBD857",
      dark: "#A78402"
    },
    sidebar: {
      main: "#00B09B",
      dark: "#96C93D"
    },
    button: {
      main: "#96C93D",
      dark: "#268072"
    },
    money: {
      main: "#85BB65"
    }
  }
});

export default theme;
