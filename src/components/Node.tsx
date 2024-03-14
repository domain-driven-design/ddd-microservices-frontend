import {memo, useEffect, useRef, useState} from 'react';
import {useReactFlow, useStore} from 'reactflow';
import TextTag from "./TextTag.tsx";
import {TNodeData} from "../types/calculate.ts";
import {AnimatePresence} from "framer-motion";
import GroupNode from "./GroupNode.tsx";
import OperatorLine from "./OperatorLine.tsx";
import {EOperator} from "../constants/operator.ts";
import {cn} from "../utils/common.ts";
import useFormulaVariableMap from "../hooks/useFormulaVariableMap.ts";
import useTagText from "../hooks/useTagText.ts";
import FormulaModal from "./FormulaModal.tsx";
import useModalControl from "../hooks/useModalControl.ts";
import {formatNodeValue} from "../utils/format.ts";
import {Spin} from "antd";
import {Sigma} from "lucide-react";

export type TProps = {
    data: TNodeData;
    defaultShowGroupNode?: boolean;
    last?: boolean;
    first?: boolean;
    root?: boolean;
    onClick?: (value: string) => void;
    selectedNode?: string;
}

const BackgroundAndOperatorMap: Record<EOperator, string> = {
    [EOperator.ADD]: 'bg-light-border-warning',
    [EOperator.SUB]: 'bg-secondary-7',
    [EOperator.MUL]: 'bg-secondary-8',
    [EOperator.DIV]: 'bg-secondary-5',
    [EOperator.EQUAL]: 'bg-gray-border',
    [EOperator.MAX]: 'bg-functional-help'
}

export default memo(({data, defaultShowGroupNode, selectedNode, root, first, onClick}: TProps) => {
    const {data: variableMap, isLoading} = useFormulaVariableMap();
    const {setCenter, setViewport} = useReactFlow();
    const transform = useStore((state) => state.transform);
    const nodeRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<{ modalWidth: number; rect: any }>(null);
    const [showGroupNode, setShowGroupNode] = useState(defaultShowGroupNode);
    const {getTagFlag, getTagFullText} = useTagText();
    const formulaModalControl = useModalControl();

    const childrenNotEqualParams = data.children?.length !== Object.keys(data.params || {}).length;
    const hasFormulaModal = (data.children?.length === 0 || childrenNotEqualParams) && data.expression;
    const hasGroupNode = data.children?.length > 0 && !childrenNotEqualParams;
    const nodeWidth = nodeRef.current?.offsetWidth;

    const variable = variableMap[data.name];

    const handleClick = () => {
        if (hasGroupNode) {
            onClick?.(data.name);
            setShowGroupNode(!showGroupNode);
            return;
        }

        if (!hasFormulaModal) {
            return;
        }

        if (formulaModalControl.visible) {
            formulaModalControl.close();
            return;
        } else {
            formulaModalControl.open();
        }
    }

    const handleFormulaModalClose = () => {
        formulaModalControl.close();
        setTimeout(() => {
            setViewport({
                zoom: 1,
                x: 264,
                y: 80,
            }, {
                duration: 200
            })
        })
    }

    useEffect(() => {
        setTimeout(() => {
            if (formulaModalControl.visible && Number(modalRef.current?.modalWidth) > 0) {
                const rect = modalRef.current?.rect;
                setCenter(rect.x + rect.width / 2 - transform[0], rect.y + rect.height / 2 - transform[1], {
                    zoom: 1,
                    duration: 200
                })
            }
        })
    }, [modalRef.current?.modalWidth, formulaModalControl.visible])

    useEffect(() => {
        if (data) {
            setShowGroupNode(defaultShowGroupNode);
            setTimeout(() => {
                setViewport({
                    zoom: 1,
                    x: 264,
                    y: 80,
                }, {
                    duration: 100
                })
            });
        }
    }, [data])

    useEffect(() => {
        console.log(selectedNode);
        if (selectedNode && data.name !== selectedNode) {
            setShowGroupNode(false);
        }
    }, [selectedNode])

    return (
        <div className="relative flex">
            {!first && data.operator && (
                <OperatorLine
                    operator={data.operator}
                    borderType="solid"
                    direction="vertical"
                    className="node-operator-line"
                />
            )}
            {showGroupNode && hasGroupNode && (
                <OperatorLine
                    operator={EOperator.EQUAL}
                    direction="horizontal"
                    borderType="dash"
                    className="group-node-operator-line"
                    initial={{
                        width: 0,
                        opacity: 0
                    }}
                    animate={{
                        width: 64,
                        opacity: 1
                    }}
                    exit={{
                        width: 0,
                        opacity: 0
                    }}
                    transition={{
                        ease: [0.4, 0, 0.2, 1],
                        duration: 0.15
                    }}
                />
            )}
            <Spin spinning={isLoading}>
                <div
                    ref={nodeRef}
                    className={cn(
                        "node",
                        BackgroundAndOperatorMap[data.operator ? data.operator : root ? EOperator.EQUAL : EOperator.ADD],
                        hasFormulaModal && formulaModalControl.visible && "z-50",
                    )}
                    onClick={handleClick}
                >
                    <div className="flex justify-center items-center gap-1">
                        {getTagFlag(data.name) && (
                            <TextTag
                                text={getTagFlag(data.name)}
                                tooltip={getTagFullText(data.name)}
                            />
                        )}
                        <span className="font-bold text-sm truncate">{variable?.name}</span>
                        {hasFormulaModal && (
                            <div className={cn("w-4 h-4 rounded inline-flex items-center justify-center", {
                                "bg-[#FFA940]": data.operator === EOperator.ADD || (!root && !data.operator),
                                "bg-[#52C41A]": data.operator === EOperator.SUB,
                                "bg-[#627EFF]": data.operator === EOperator.DIV,
                                "bg-[#FF4D4F]": data.operator === EOperator.MUL,
                            })}>
                                <Sigma className={cn("w-3 h-3 text-white")}/>
                            </div>
                        )}
                    </div>
                    <div className="py-3 bg-[#fff] rounded whitespace-nowrap flex justify-center">
                        {formatNodeValue(data.value, variable?.type)}
                    </div>
                </div>
            </Spin>
            {hasFormulaModal && formulaModalControl.visible && (
                <FormulaModal
                    ref={modalRef}
                    data={data}
                    onClose={handleFormulaModalClose}
                    visible={formulaModalControl.visible}
                />
            )}

            <AnimatePresence>
                {hasGroupNode && showGroupNode && (
                    <GroupNode nodeWidth={nodeWidth} data={data.children}/>
                )}
            </AnimatePresence>
        </div>
    );
});
