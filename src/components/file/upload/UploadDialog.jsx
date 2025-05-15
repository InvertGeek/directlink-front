import styled from "styled-components";
import {Button} from "@mui/material";
import {ProgressCard} from "./UploadCard.jsx";
import {notifyMsg} from "../../../utils/CommonUtils.js";
import {addDialog, dialogProxy} from "../../../utils/DialogContainer.jsx";
import {proxy, ref, useSnapshot} from "valtio";
import {useEffect} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard/src";


const Container = styled.div`
    display: flex;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    justify-content: center;
    width: 500px;
    max-width: 95vw;
    gap: 10px;
    flex-direction: column;
    color: #8e2afe;
    word-break: break-all;

    > .content {
        gap: 10px;
        display: flex;
        flex-direction: column;
        max-height: 60vh;
        overflow-y: auto;
    }

    p {
        white-space: nowrap;
        font-weight: bold;
    }

    button {
        font-size: max(.6rem, 14px);
    }
`

export const uploadFileList = proxy([])


export function addUploadFile(...files) {
    files.forEach((file) => {
        uploadFileList.push({
            file: ref(file),
            result: null,
            complete: false,
            error: false,
            tip: '',
            progress: 0,
            title: file.name,
            cancel: null,
        })
    })
    addDialog(<UploadDialog/>, false)
}


function UploadDialog() {

    const fileList = useSnapshot(uploadFileList)

    const results = fileList.filter(file => file.result !== null)

    const uploaded = results.length
    const errorCount = fileList.filter(file => file.error).length
    const complete = fileList.filter(file => file.complete).length === fileList.length

    let title = <h3>{uploaded} / {fileList.length} 个文件正在上传</h3>
    if (complete) {
        title = (
            <h3 className={'file-card animate__animated animate__bounceIn'}>
                {fileList.length} 个文件全部上传成功
            </h3>
        )
    }

    if (errorCount > 0) {
        title = (
            <h3 className={'file-card animate__animated animate__bounceIn'}>
                {uploaded} / {fileList.length} 个文件上传中 {errorCount} 个文件上传失败
            </h3>
        )
        if (complete) {
            title = (
                <h3 className={'file-card animate__animated animate__bounceIn'}>
                    {uploaded} / {fileList.length} 个文件上传成功 {errorCount} 个文件上传失败
                </h3>
            )
        }
    }

    useEffect(() => {
        const listener = function (event) {
            if (!complete) {
                event.preventDefault()
                const msg = '文件正在上传中,是否确认关闭?'
                event.returnValue = msg
                return msg
            }
        }
        window.addEventListener('beforeunload', listener)
        return () => {
            window.removeEventListener('beforeunload', listener)
        }
    }, [complete]);

    return (
        <Container className={'shadow'}>
            {
                title
            }
            <div class="content">
                {
                    uploadFileList.map((file, index) =>
                        <ProgressCard file={file} key={index}/>
                    )
                }
            </div>

            {
                results.length > 1 &&
                <CopyToClipboard
                    text={results.map((it) => it.result + '#' + encodeURIComponent(it.file.name)).filter(Boolean).join('\n')}
                    onCopy={() => {
                        notifyMsg('复制成功!', {toastId: 'copy-to-clipboard'})
                    }}>
                    <Button variant={'outlined'}>全部复制</Button>
                </CopyToClipboard>
            }

            <Button variant={'contained'} onClick={() => {
                notifyMsg('上传已取消', {toastId: 'cancel-upload'})
                dialogProxy.pop()
                uploadFileList.length = 0
            }}>{complete ? '关闭' : '取消'}</Button>
        </Container>

    );
}

export default UploadDialog;
