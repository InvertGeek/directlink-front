import {proxy, ref, useSnapshot} from "valtio";
import {Backdrop} from "@mui/material";

export const dialogProxy = proxy([])

export function addDialog(dialog, autoClose = true) {
    dialogProxy.push({
        content: ref(dialog),
        autoClose,
    })
}

export function DialogContainer(props) {

    let dialogState = useSnapshot(dialogProxy)

    if (dialogState.length === 0) {
        return null
    }

    return dialogState.map((item, index) => {
        return <Backdrop open onClick={(event, key = index) => {
            if (event.target === event.currentTarget && item.autoClose) {
                dialogProxy.pop()
            }
        }} style={{
            zIndex: '99'
        }}>
            {item.content}
        </Backdrop>
    })
}