import {cn} from "../utils/common.ts";
import {Tooltip} from "antd";

type TProps = {
    className?: string;
    text: string;
    tooltip: string;
}

const TextTag = ({className, text, tooltip}: TProps) => {
    return (
        <Tooltip title={tooltip}>
            <div
                className={cn("inline-flex items-center justify-center min-w-5 h-5 text-xs bg-transparent border border-gray-disabled border-solid rounded box-border font-light", className)}>
                {text}
            </div>
        </Tooltip>
    )
}

export default TextTag;
