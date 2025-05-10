import styled from "styled-components";
import {Button} from "@mui/material";
import {CopyToClipboard} from "react-copy-to-clipboard/src";
import {formatFileSize, notifyMsg} from "../../utils/CommonUtils.js";

const Container = styled.div`
    display: flex;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    justify-content: center;
    width: 500px;
    max-width: 95vw;
    flex-wrap: wrap;
    gap: 10px;
    flex-direction: column;
    color: #8e2afe;
    word-break: break-all;

    button {
        font-size: max(.6rem, 14px);
    }
`


function FileDialog({data}) {

    const {name, size, link} = data


    return (
        <Container className={'shadow'}>
            <h3 className={'text-hide'}>文件: {name}</h3>
            <p>{formatFileSize(size ?? 0)}</p>
            <CopyToClipboard text={link} onCopy={() => {
                notifyMsg('复制成功!', {toastId: 'copy-to-clipboard'})
            }}>
                <Button variant={'outlined'}>复制地址</Button>
            </CopyToClipboard>
            <Button variant={'contained'} onClick={() => {
                window.open(link)
            }}>打开</Button>
        </Container>
    );
}


export default FileDialog;
