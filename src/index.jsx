import {render} from 'preact';
import './main.scss';
import 'sanitize.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/forms.css';
import './config.js'
import 'animate.css'
import {createTheme, ThemeProvider} from "@mui/material";
import Home from "./components/Home.jsx";
import {debounce} from "./utils/CommonUtils.js";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {DialogContainer} from "./utils/DialogContainer.jsx";

let theme = createTheme({
    palette: {
        primary: {
            main: 'rgba(142,42,254,0.63)',
        },
    },
});

function updateSize() {
    const width = Math.max(window.innerWidth, window.innerHeight)
    document.documentElement.style.fontSize = width / 100 + 'px'
}

updateSize()
//rem
window.addEventListener('resize', () => {
    debounce('resize', updateSize, 500)
})


export function App() {

    return (
        <ThemeProvider theme={theme}>
            <Home/>
            <ToastContainer/>
            <DialogContainer/>
        </ThemeProvider>
    );
}

render(<App/>, document.getElementById('app'));
