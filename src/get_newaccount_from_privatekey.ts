import  { Account,RpcProvider, CallData }  from "starknet"
import * as dotenv from 'dotenv'
dotenv.config();
const privateKey = process.env.privatekey;
const provider = new RpcProvider({ nodeUrl:'https://free-rpc.nethermind.io/sepolia-juno/v0_6'});
const privateKeyAX = privateKey!;
const AXcontractAddress = "0x0672a8021A17B9137e57d4691893329203967c85E8178ce4f2E65D898E623dC5"; // 替换为你的账号地址
const accountAX_new  = new Account(provider, AXcontractAddress, privateKeyAX, '1');
console.log(accountAX_new.address);
async function main(){
    let nonce = await accountAX_new.getNonce();
    console.log(nonce)
}
main()