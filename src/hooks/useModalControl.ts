import {useState} from "react";


const useModalControl = () => {
    const [visible, setVisible] = useState(false);
    const [meta, setMeta] = useState({});

    const open = (meta?: any) => {
        setVisible(true);
        meta && setMeta(meta);
    }

    const close = () => {
        setVisible(false);
    }

    return {
        visible,
        open,
        close,
        meta,
        setMeta
    }
}

export default useModalControl;
