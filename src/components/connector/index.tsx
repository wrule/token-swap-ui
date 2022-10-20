import React, { useEffect, useState } from 'react';
import { Button, Spin, Tooltip, Space } from 'antd';
import style from './index.module.scss';

declare var ethereum: any;

export
function Connector() {
  const [account, set_account] = useState<string>('');
  const [loading, set_loading] = useState<boolean>(true);

  const update_account = async () => {
    console.log(1);
    set_loading(true);
    console.log(2);
    try {
      console.log('a');
      const accounts: string[] = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log('b');
      set_account(accounts[0] || '');
      console.log('c');
    } catch (e) {
      console.error(e);
    }
    console.log(3);
    set_loading(false);
    console.log(4);
  }

  useEffect(() => {
    update_account();
  }, []);

  return <Space className={style.com}>
    {loading && <Space>
      <Spin size="small" />
      <span>正在连接钱包...</span>
    </Space>}
    {!loading && <>
      {account && <Tooltip placement='bottomLeft' title={account}><span>{account}</span></Tooltip>}
      {!account && <Button size="small" type="primary">连接钱包</Button>}
    </>}
  </Space>;
}
