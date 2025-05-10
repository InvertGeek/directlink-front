import styled from "styled-components";

import logo from '../assets/logo.png'
import FileUpload from "./file/FileUpload.jsx";

const Container = styled.div`
    margin: 5vh auto;
    display: flex;
    justify-content: center;
    //border: 1px solid rgba(160, 158, 158, 0.45);
    width: 1400px;
    max-width: 90vw;
    padding: 10px;
    border-radius: 10px;
    //box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    flex-direction: column;
    gap: 20px;
    align-items: center;

    .title {
        display: flex;
        align-items: center;
        gap: 20px;
        justify-content: center;

        h1 {
            font-size: max(3rem, 50px);
            background: linear-gradient(to right, rgba(64, 91, 254, 0.66), rgba(171, 25, 254, 0.72));
            background-clip: text; /* 适用于大多数浏览器 */
            -webkit-background-clip: text; /* 适用于 WebKit 浏览器 */
            color: transparent; /* 使文本颜色透明 */
            filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
        }

        .logo {
            height: max(5rem, 100px);
            width: max(5rem, 100px);
            display: flex;

            img {
                width: 100%;
                transition: .3s;
                filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));

                &:hover {
                    transform: scale(1.1);
                }
            }
        }
    }
`

function Home(props) {

    return (
        <Container>
            <div className="title">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>
                <h1>DirectLink</h1>
            </div>
            <FileUpload/>
        </Container>
    );
}

export default Home;
