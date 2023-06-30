import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";

export const theme = extendTheme({
    colors:{
        brand:{
            100: '#38b5ff',            
        },
    },
    fonts:{
        body: "Open Sans, sans-serif"
    },
    styles:{
        global: () => ({
            body:{
                bg: "blue.100",
            }
        })
    },
    components: {
        Button,
    }
})