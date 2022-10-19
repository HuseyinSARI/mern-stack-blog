import { createTheme } from "@mui/material";

export default createTheme({
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
                color: "primary",
                variant: "contained"
            },
            styleOverrides: {
                root: {
                    textTransform: "none"
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
            styleOverrides:{
                root:{
                    padding:8
                }
            }
        }
    }
});