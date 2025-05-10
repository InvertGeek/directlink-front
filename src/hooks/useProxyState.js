import {proxy, useSnapshot} from 'valtio';
import {useRef} from 'react';

function useProxyState(initialState) {
    const stateRef = useRef(null);

    // 判断初始状态是否为对象/数组，如果不是，包装成 { value: initialState }
    const isPrimitive = initialState === null || (typeof initialState !== 'object' && !Array.isArray(initialState));
    if (!stateRef.current) {
        stateRef.current = proxy(isPrimitive ? {value: initialState} : initialState);
    }
    const state = stateRef.current;
    const snap = useSnapshot(state);

    // 如果是简单值，返回 snap.value，否则返回整个 snap
    return [isPrimitive ? snap.value : snap, state];
}

export default useProxyState;