import React, { useEffect, useState } from 'react';
import { Button, Spin, Tooltip } from 'antd';
import style from './index.module.scss';

declare var ethereum: any;

export
function Connector() {
  const [account, set_account] = useState<string>('');
  const [loading, set_loading] = useState<boolean>(true);

  const update_account = async () => {
    set_loading(true);
    try {
      const accounts: string[] = await ethereum.request({ method: 'eth_requestAccounts' });
      set_account(accounts[0] || '');
    } catch (e) {
      console.error(e);
    }
    set_loading(false);
  }

  useEffect(() => {
    update_account();
  }, []);

  return <Spin spinning={loading}>
    <span className={style.com}>
      {account ? <Tooltip placement='bottomLeft' title={account}>
        <span>{account}</span>
      </Tooltip> : <Button size="small">连接钱包</Button>}
    </span>
  </Spin>;
}
