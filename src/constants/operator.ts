export enum EOperator {
    ADD = 'add',
    SUB = 'sub',
    MUL = 'mul',
    DIV = 'div',
    MAX = 'max',
    EQUAL = 'eq',
}

export const OPERATOR_COLOR_MAP = {
    [EOperator.ADD]: '#627EFF',
    [EOperator.SUB]: 'red',
    [EOperator.MUL]: 'blue',
    [EOperator.DIV]: '#627EFF',
    [EOperator.MAX]: 'purple',
    [EOperator.EQUAL]: 'black',
}
