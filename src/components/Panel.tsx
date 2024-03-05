import {cn} from "../utils/common.ts";

const Panel = ({className, children}: { className?: string, children: React.ReactNode }) => {
    return (
        <>
            <div className={cn("absolute z-50 bg-[#fff] rounded shadow", className)}>
                {children}
            </div>
        </>

    )
}

export default Panel;
