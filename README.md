# starknet.js-examples

安装 >18.0.0 node https://nodejs.org/en

```
npm install --global yarn

git clone https://github.com/Starknet-ZH/starknet.js-examples.git
```
将 env_example 文件名修改为 .env，然后在 privatekey= 后填入argent钱包导出的私钥，不建议导出有大额资金或者可能获得空投的账号私钥
将 multicall_send_eth.tsconst AXcontractAddress = "0x06"; 这里的地址替换为 .env 文件中对应的账户地址

```
cd starknet.js-examples

yarn install

yarn ts-node src/multicall_send_eth.ts




```
