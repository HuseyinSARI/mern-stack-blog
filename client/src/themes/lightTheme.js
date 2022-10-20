import { createTheme } from "@mui/material";

// #F8EDE3
// #DFD3C3
// #D0B8A8
// #7D6E83
// #06283D
// #251B37
export default createTheme({
    palette: {
        primary: {
            main: "#7D6E83"
        },
        secondary: {
            main: "#47B5FF"
        },
        text: {
            light: "#7D6E83",
            primary: "#06283D"
        }
    },
    components: {
        MuiTextField: {
            defaultProps: {
                size: "small",
                disable: "true",
                variant: "outlined",
                fullWidth: true,
                InputLabelProps: {
                    shrink: true,
                    color: "primary"
                }
            }
        },
        MuiButton: {
            defaultProps: {
                size: "small",
                variant: "contained"
            },
            styleOverrides: {
                root: {
                    textTransform: "none",
                    color:"#F8EDE3"
                }
            }
        },
        MuiCard: {
            variants: [
                {
                    props: { variant: "shaded" },
                    style: {
                        backgroundColor: "#BCCEF8",
                        borderRadius: "10px"
                    }
                }
            ]
        },
        MuiTypography: {
            defaultProps: {
                align: "left"
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: 8,
                    backgroundColor: "#BCCEF8"
                }
            }
        },
        MuiAppBar:{
            styleOverrides:{
                root:{
                    padding:0
                }
            }
        },
        MuiListItemText:{
            styleOverrides:{
                root:
                {
                    color: "#06283D"
                      // change this after 
                }

            }
        },
        MuiList:{
            styleOverrides:{
                root:{
                    backgroundColor: "#BECEFA"
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: "#06283D",
                    backgroundColor: "#D0B8A8",
                    borderRadius: "50%"
                }
            }
        }
    }
});