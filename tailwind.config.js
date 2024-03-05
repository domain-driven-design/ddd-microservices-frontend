/** @type {import('tailwindcss').Config} */
export default {
    content: ['src/**/*.{html,tsx,jsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    1: '#F0F7FF',
                    2: '#A8CEFF',
                    3: '#5794FF',
                    4: '#2D73FF',
                },
                secondary: {
                    1: '#DEEAFF',
                    2: '#102658',
                    3: '#627EFF',
                    4: '#8AA3FF',
                    5: '#DBE5FF',
                    6: '#F0F5FF',
                    7: '#C6F0A5',
                    8: '#FFD9D7'
                },
                functional: {
                    success: '#52C41A',
                    warning: '#FFA940',
                    warning2: '#E4B715',
                    error: '#FF4D4F',
                    help: '#13C2C2',
                    notice: '#1890FF',
                },
                "deep-border": {
                    success: '#73D13D',
                    warning: '#FFC069',
                    warning2: '#EBC950',
                    error: '#FF7875',
                    help: '#36CFC9',
                    notice: '#40A9FF',
                },
                "light-border": {
                    success: '#B7EB8F',
                    warning: '#FFE7BA',
                    warning2: '#FFE177',
                    error: '#FFA39E',
                    help: '#87E8DE',
                    notice: '#91D5FF',
                },
                hover: {
                    success: '#73D13D',
                    warning: '#FFC069',
                    warning2: '#EBC950',
                    error: '#FF7875',
                    help: '#36CFC9',
                    notice: '#40A9FF',
                },
                background: {
                    success: '#F8FFF1',
                    warning: '#FFF7E6',
                    warning2: '#FFFAE8',
                    error: '#FFF1F0',
                    help: '#E6FFFB',
                    notice: '#EFFAFF',
                },
                gray: {
                    head: '#262626',
                    content: '#595959',
                    content2: '#8C8C8C',
                    disabled: '#BFBFBF',
                    border: '#D9D9D9',
                    divider: '#E5E5E5',
                    divider2: '#F0F0F0',
                    disabledBg: '#F7F7F7',
                },
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
}

