import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.min.css';
import './App.scss';
import style from './App.module.scss';

const { Header, Content } = Layout;

moment.locale('zh-cn');

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className={style.layout}>
        <Header>
          <h1 className={style.title}>Token Swap</h1>
        </Header>
        <Content className={style.content}>Content</Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
