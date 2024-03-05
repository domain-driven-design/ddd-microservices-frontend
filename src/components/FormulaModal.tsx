import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {Lightbulb, X} from "lucide-react";
import {TNodeData} from "../types/calculate.ts";
import FormulaItem from "./FormulaItem.tsx";
import useFormlaVariableMap from "../hooks/useFormulaVariableMap.ts";

type TProps = {
    visible: boolean;
    data: TNodeData;
    onClose: () => void;
}

const FormulaModal = forwardRef<{ modalWidth: number }, TProps>((props, ref) => {
    const {visible, data, onClose} = props;
    const modalRef = useRef<HTMLDivElement>(null);
    const [modalWidth, setModalWith] = useState(0);
    const {isLoading} = useFormlaVariableMap();
    const variableKeys = data?.params ? Object.keys(data.params) : [];

    // 对外部组件通过ref通知modalWidth
    useImperativeHandle(ref, () => ({
        modalWidth,
        rect: modalRef.current?.getBoundingClientRect()
    }), [modalWidth]);

    useEffect(() => {
        setModalWith(modalRef.current?.offsetWidth || 0);
    }, [isLoading, visible, data]);

    if (isLoading) {
        return null;
    }

    return (
        <>
            <div
                className="absolute top-[-200vh] left-[-200vw] bottom-0 right-0 w-[400vw] h-[400vh] z-30 transiton-all"
                style={{background: "rgba(0,0,0,0.35)"}}
                onClick={onClose}
            />
            <div className="operator-line-formula operator-line-formula-dash"/>
            <div ref={modalRef} className="absolute z-30 bg-[#fff] px-6 py-4 rounded max-w-[932px] w-max transiton-all"
                 style={{right: `-${modalWidth + 64}px`}}>
                <div className="flex justify-between items-center pb-2 border-b-[1px] border-gray-divider-2 mb-4">
                    <div className="flex items-center gap-[10px]">
                        <Lightbulb className="bg-functional-warning w-4 h-4"/>
                        <span>计算公式</span>
                    </div>
                    <X className="w-4 h-4" onClick={onClose}/>
                </div>

                <div className="flex gap-1">
                    <div className="flex items-center gap-1">
                        <FormulaItem className="border-light-border-warning bg-background-warning"
                                     variableKey={data?.name} value={data?.value}/>
                        <span>=</span>
                    </div>
                    <div className="flex items-center flex-swap gap-2">
                        {data.expression
                            ?.split(new RegExp(`(${variableKeys.join('|')})`, 'g'))
                            ?.map((item, index) => {
                                if (variableKeys.includes(item)) {
                                    return <FormulaItem key={index} variableKey={item} value={data.params[item]}/>;
                                }
                                return <span key={index}>{item}</span>;
                            })}
                    </div>
                </div>
            </div>
        </>
    )
})

export default FormulaModal;
