import { Button, ConfigProvider, Form, InputNumber, Layout } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.min.css';
import './App.scss';
import style from './App.module.scss';

declare var ethereum: any;

const { Header, Content } = Layout;

moment.locale('zh-cn');

function App() {

  const handleConnect = async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Layout className={style.layout}>
        <Header className={style.header}>
          <h1 className={style.title}>Token Swap</h1>
          <Button onClick={handleConnect}>连接钱包</Button>
        </Header>
        <Content className={style.content}>
          <Form className={style.form}>
            <Form.Item>
              <InputNumber
                className={style.form_item}
                min={0}
                addonAfter="USDC"
              />
            </Form.Item>
            <Form.Item>
              <InputNumber
                className={style.form_item}
                min={0}
                addonAfter="USDM"
              />
            </Form.Item>
            <Form.Item>
              <Button className={style.form_item} type="primary">Swap</Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
