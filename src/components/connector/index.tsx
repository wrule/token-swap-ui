import { useEffect, useState } from 'react';
import { Button, Spin, Tooltip, Space } from 'antd';
import style from './index.module.scss';

declare var ethereum: any;

export
function Connector() {
  const [account, set_account] = useState<string>('');
  const [fetch_loading, set_fetch_loading] = useState<boolean>(false);
  const [connect_loading, set_connect_loading] = useState<boolean>(false);

  const fetch_account = async () => {
    set_fetch_loading(true);
    try {
      const accounts: string[] = await ethereum.request({ method: 'eth_accounts' });
      set_account(accounts[0] || '');
    } catch (e) {
      console.error(e);
    }
    setTimeout(() => set_fetch_loading(false), 300);
  };

  const connect_account = async () => {
    set_connect_loading(true);
    try {
      const accounts: string[] = await ethereum.request({ method: 'eth_requestAccounts' });
      set_account(accounts[0] || '');
    } catch (e) {
      console.error(e);
    }
    set_connect_loading(false);
  }

  useEffect(() => {
    fetch_account();
  }, []);

  return <span className={style.com}>
    {fetch_loading && <Space>
      <Spin size="small" />
      <span>正在获取账户...</span>
    </Space>}
    {connect_loading && <Space>
      <Spin size="small" />
      <span>正在连接钱包...</span>
    </Space>}
    {!(fetch_loading || connect_loading) && <>
      {account && <Tooltip placement='bottomLeft' title={account}><span className={style.account}>{account}</span></Tooltip>}
      {!account && <Button size="small" type="primary" onClick={connect_account}>连接钱包</Button>}
    </>}
  </span>;
}
