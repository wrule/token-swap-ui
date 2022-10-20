import { Button, ConfigProvider, Form, InputNumber, Layout } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.min.css';
import './App.scss';
import style from './App.module.scss';
import { useEffect, useState } from 'react';
import { Connector } from './components/connector';
import Web3 from 'web3';
import { ethers } from 'ethers';
declare var ethereum: any;
const web3 = new Web3(ethereum);

const { Header, Content } = Layout;

moment.locale('zh-cn');

function App() {
  const test = async () => {
    // console.log(1234);
    // const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    const provider = new ethers.providers.Web3Provider(ethereum);
    // const accounts = await provider.listAccounts();
    const accounts = await provider.send("eth_requestAccounts", []);
    console.log(accounts);
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <Layout className={style.layout}>
        <Header className={style.header}>
          <h1 className={style.title}>Token Swap</h1>
          <Connector onAccount={(account) => {
            console.log(account);
          }} />
          {/* {account ? <span>{account}</span> : <Button onClick={handleConnect}>连接钱包</Button>} */}
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
              <Button onClick={() => {
                console.log(ethereum.selectedAddress);
              }} className={style.form_item} type="primary">Swap</Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
