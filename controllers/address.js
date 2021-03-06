const dotenv = require('dotenv');

dotenv.config();

const cChainMethods = require('../services/c-chain');
const xChainMethods = require('../services/x-chain');
const pChainMethods = require('../services/p-chain');

const X_CHAIN = 'X';
const P_CHAIN = 'P';
const C_CHAIN = '0x';

//GET address info by hash
exports.getAddressInfoByHash = async (ctx, next) => {
    let addressInfoFromXChain;
    let addressInfoFromCChain;
    let addressInfoFromPChain;
    let returnData;

    if ((ctx.params.hash).charAt(0) == X_CHAIN) {
        addressInfoFromXChain = await xChainMethods.getAddressInfoByHashFromXChain(ctx.params.hash);

        if (addressInfoFromXChain[0] == 1) {
            returnData = addressInfoFromXChain[1];
            ctx.body = { returnData };
        } else {
            returnData = addressInfoFromXChain;
            ctx.body = { returnData };
        }
    } else if ((ctx.params.hash).charAt(0) == P_CHAIN) {
        addressInfoFromPChain = await pChainMethods.getAddressInfoFromPChain(ctx.params.hash);

        if (addressInfoFromPChain[0] == 1) {
            returnData = addressInfoFromPChain[1];
            ctx.body = { returnData };
        } else {
            returnData = addressInfoFromPChain[1];
            ctx.body = { returnData };
        }
    } else if ((ctx.params.hash).slice(0, 2) == C_CHAIN){
        addressInfoFromCChain = await cChainMethods.getAddressInfoFromCChain(ctx.params.hash);

        if (addressInfoFromCChain[0] == 1) {
            returnData = addressInfoFromCChain[1];
            ctx.body = { returnData };
        } else {
            returnData = addressInfoFromCChain;
            ctx.body = { returnData };
        }
    } else {
        ctx.body = JSON.parse('{"result":"wrong input"}');
    }
};