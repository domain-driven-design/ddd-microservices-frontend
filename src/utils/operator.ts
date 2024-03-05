import {EOperator} from "../constants/operator.ts";


export const getKeyAndOperatorMap = (keys: string[], expression: string): Record<string, string> => {
    const rawOperatorMap: Record<string, string> = {
        '+': EOperator.ADD,
        '-': EOperator.SUB,
        '*': EOperator.MUL,
        '/': EOperator.DIV,
    }

    return keys.reduce((result, key) => {
        if (expression.match(/max\([^()]+\)/)) {
            return {
                ...result,
                [key]: 'max',
            }
        }

        const rawOperator = expression.match(`([\\+\\-\\*\\/])\\(?${key}\\)?`)?.[1];
        const operator = rawOperator && rawOperatorMap[rawOperator];
        return {
            ...result,
            [key]: operator,
        }
    }, {});
}

