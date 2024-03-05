import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {isNil, map, orderBy} from "lodash-es";
import {getKeyAndOperatorMap} from "./operator.ts";
import {EFormulaVariableType} from "../constants/variable.ts";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const transformData = (data: any) => {
    const {value, expression, params} = data;
    const name = data.name.replaceAll(/__\w+/g, '');

    if (isNil(expression)) {
        return {
            name,
            value,
            params,
            children: map(data.children, transformData),
            expression,
        }
    }

    let parsedExpression = expression;
    if (parsedExpression.includes("sumItem")) {
        parsedExpression = Object.keys(params).join("+");
    }

    const keyAndOperatorMap = getKeyAndOperatorMap(map(data.children, 'name'), parsedExpression);

    const children: any = orderBy(data.children || [], (child) => parsedExpression.indexOf(child.name))
        .map(item => ({
            ...transformData(item),
            operator: keyAndOperatorMap[item.name],
        }))

    return {
        name,
        value,
        params,
        children,
        expression: parsedExpression,
    }
}

