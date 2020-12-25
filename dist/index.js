"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJs = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, timestamp, data) => {
    return CryptoJs.SHA256(index + previousHash + timestamp + data).toString();
};
Block.validateStructure = (aBlock) => {
    return typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.data === "string";
};
const genesisBlock = new Block(0, "202020202020", "", "hello", 123456);
let blockchain = [genesisBlock]; //블록체인
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1]; //마지막 블록을 불러오는 함수
const getNewTimestamp = () => Math.round(new Date().getTime() / 100); //새로운 타임스탬프를 만드는 함수
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock(); //이전 블록 (블록체인의 마지막 블록을 가져온다.)을 가져온다.
    const newIndex = previousBlock.index + 1; //이전 블록 인덱스에 1을 더한 값
    const newTimestamp = getNewTimestamp(); // 현재 시간을 기준으로 새로운 타임스탬프를 만든다.
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data); //해쉬 계산 함수를 이용해 새로운 해쉬를 만들어낸다.
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp); //매개변루를 이용해 새로운 블록을 생성한다.
    addBlock(newBlock); //정합성 검증 및 블록체인 리스트에 블록을 추가한다.
    return newBlock;
};
const getHashBlock = (aBlock) => {
    return Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
};
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) { //현재 블록의 구조가 블록의 구조가 아니라면 false 리턴
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) { //이전 블록에서 1을 더한것과 현재 블록의 인덱스가 같지 않다면 false
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) { //이전 블록의 해쉬값과 현재 블록의 이전 해쉬값이 같지 않다면 false
        return false;
    }
    else if (getHashBlock(candidateBlock) !== candidateBlock.hash) { //같은 매개변수를 가진 해쉬값과 현재 해쉬값이 같지 않다면 false
        return false;
    }
    else { //위의 모든 정합성이 검증된다면 true 리턴
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) { //블록 구조가 맞는지 체크하고 이전 블록과의 인덱스, 해쉬, 새로운 해쉬값을 통과 한다면
        blockchain.push(candidateBlock); //블록체인 리스트에 현재 블록을 추가한다.
    }
};
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
console.log(blockchain);
//# sourceMappingURL=index.js.map