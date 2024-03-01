    import  { Account,RpcProvider, CallData ,Contract}  from "starknet"
    import * as dotenv from 'dotenv'
    import { log } from "console";
    import { cairo } from "starknet";
    dotenv.config();
    const privateKey = process.env.privatekey;
    const provider = new RpcProvider({ nodeUrl:'https://free-rpc.nethermind.io/sepolia-juno/v0_5'});
    const privateKeyAX = privateKey!;
    const AXcontractAddress = "0x0672a8021A17B9137e57d4691893329203967c85E8178ce4f2E65D898E623dC5"; // 替换为你的钱包地址
    const accountAX_new  = new Account(provider, AXcontractAddress, privateKeyAX, '1');
    console.log(accountAX_new.address);
    async function main(){
        const ethAddress = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7" //eth contract address
        // read abi of Test contract
        const { abi: testAbi } = await provider.getClassAt(ethAddress);
        if (testAbi === undefined) {
            throw new Error('no abi.');
        }
        const ethContract = new Contract(testAbi, ethAddress, provider);
        const balanceInitial = await ethContract.balanceOf(AXcontractAddress);
        console.log(balanceInitial);
        // Connect account with the contract
        ethContract.connect(accountAX_new);
        // const transfer_flag = await ethContract.transfer("0x03E64bb02F1Bf09825079ed786A827995F386734F1EDfA5fBd4Da169979C015a", 100000000000000000n);
        // console.log(transfer_flag);
        const multiCall = await accountAX_new.execute([
            // Calling the first contract
            {
            contractAddress: ethAddress,
            entrypoint: 'transfer',
            calldata: CallData.compile({
                recipient:"0x03E64bb02F1Bf09825079ed786A827995F386734F1EDfA5fBd4Da169979C015a", //接收者地址
                amount: cairo.uint256(100000000000000000n),
            }),
            },
            // // Calling the second contract
            {
                contractAddress: ethAddress,
                entrypoint: 'transfer',
                calldata: CallData.compile({
                    recipient:"0x03E64bb02F1Bf09825079ed786A827995F386734F1EDfA5fBd4Da169979C015a",//接收者地址
                    amount: cairo.uint256(100000000000000000n),
                }),
            },
        ]);
    }
    main()
