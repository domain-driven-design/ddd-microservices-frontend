import {ConfigProvider} from "antd";
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { StyleProvider } from '@ant-design/cssinjs';
import Flow from "./pages/flow";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ConfigProvider
                locale={zhCN}
                theme={{
                    cssVar: true,
                }}
            >
                <StyleProvider hashPriority="high">
                    <Flow />
                </StyleProvider>
            </ConfigProvider>
        </QueryClientProvider>
    )
}
