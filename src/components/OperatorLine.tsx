import {forwardRef} from "react";
import {EOperator} from "../constants/operator.ts";
import {Divide, Equal, Minus, Plus, X} from "lucide-react";
import {cn} from "../utils/common.ts";
import {motion} from "framer-motion";

type TProps = {
    operator: EOperator;
    direction: 'horizontal' | 'vertical';
    borderType: 'solid' | 'dash';
    borderSize?: number;
    className?: string;
}

const OperatorColorMap: Record<EOperator, string> = {
    [EOperator.ADD]: 'bg-functional-warning',
    [EOperator.SUB]: 'bg-deep-border-success',
    [EOperator.MUL]: 'bg-deep-border-error',
    [EOperator.DIV]: 'bg-secondary-3',
    [EOperator.EQUAL]: 'bg-gray-disabled',
    [EOperator.MAX]: 'bg-functional-help'
}

const OperatorIconMap: Record<EOperator, JSX.Element> = {
    [EOperator.ADD]: <Plus className="w-[14px] h-[14px] text-white" />,
    [EOperator.SUB]: <Minus className="w-[14px] h-[14px] text-white" />,
    [EOperator.MUL]: <X className="w-[14px] h-[14px] text-white" />,
    [EOperator.DIV]: <Divide className="w-[14px] h-[14px] text-white" />,
    [EOperator.EQUAL]: <Equal className="w-[14px] h-[14px] text-white" />,
    [EOperator.MAX]: <div />
}

const OperatorLine = forwardRef<HTMLDivElement, TProps>((props: TProps, ref) => {
    const {operator, className, direction, borderSize = 2, borderType} = props;
    const icon = OperatorIconMap[operator];

    const classMap = {
        horizontal: {
            solid: 'bg-gray-border',
            dash: 'operator-line-horizontal-dash'
        },
        vertical: {
            solid: 'bg-gray-border',
            dash: 'operator-line-vertical-dash'
        }
    }

    const styleMap = {
        horizontal: {
            height: `${borderSize}px`
        },
        vertical: {
            width: `${borderSize}px`
        }
    }

    return (
        <div ref={ref} className={className}>
            <div
                className={cn("flex items-center justify-center h-full", classMap[direction][borderType])}
                style={styleMap[direction]}
            >
                <div className={cn(OperatorColorMap[operator], "rounded-full w-6 h-6 absolute flex items-center justify-center")}>
                    {icon}
                </div>
            </div>
        </div>
    )
})

export default motion(OperatorLine);
