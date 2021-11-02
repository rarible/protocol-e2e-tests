import type {AbiItem} from "web3-utils"
import Web3 from "web3"
import {Address} from "@rarible/protocol-api-client"
import {Contract} from "web3-eth-contract"
import {sentTx} from "@rarible/protocol-ethereum-sdk/build/common/send-transaction";

const testErc721Abi: AbiItem[] = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address",
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address",
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
        ],
        "name": "Approval",
        "type": "event",
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address",
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address",
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool",
            },
        ],
        "name": "ApprovalForAll",
        "type": "event",
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "owner",
                "type": "address",
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string",
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "symbol",
                "type": "string",
            },
        ],
        "name": "CreateERC721Rarible",
        "type": "event",
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
            {
                "components": [
                    {
                        "internalType": "address payable",
                        "name": "account",
                        "type": "address",
                    },
                    {
                        "internalType": "uint96",
                        "name": "value",
                        "type": "uint96",
                    },
                ],
                "indexed": false,
                "internalType": "struct LibPart.Part[]",
                "name": "creators",
                "type": "tuple[]",
            },
        ],
        "name": "Creators",
        "type": "event",
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address",
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "hasApproval",
                "type": "bool",
            },
        ],
        "name": "DefaultApproval",
        "type": "event",
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address",
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address",
            },
        ],
        "name": "OwnershipTransferred",
        "type": "event",
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
            {
                "components": [
                    {
                        "internalType": "address payable",
                        "name": "account",
                        "type": "address",
                    },
                    {
                        "internalType": "uint96",
                        "name": "value",
                        "type": "uint96",
                    },
                ],
                "indexed": false,
                "internalType": "struct LibPart.Part[]",
                "name": "royalties",
                "type": "tuple[]",
            },
        ],
        "name": "RoyaltiesSet",
        "type": "event",
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address",
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address",
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
        ],
        "name": "Transfer",
        "type": "event",
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address",
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address",
            },
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256",
            },
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
    },
    {
        "inputs": [],
        "name": "baseURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string",
            },
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [],
        "name": "contractURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string",
            },
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address",
            },
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256",
            },
        ],
        "name": "getCreators",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address payable",
                        "name": "account",
                        "type": "address",
                    },
                    {
                        "internalType": "uint96",
                        "name": "value",
                        "type": "uint96",
                    },
                ],
                "internalType": "struct LibPart.Part[]",
                "name": "",
                "type": "tuple[]",
            },
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256",
            },
        ],
        "name": "getRaribleV2Royalties",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address payable",
                        "name": "account",
                        "type": "address",
                    },
                    {
                        "internalType": "uint96",
                        "name": "value",
                        "type": "uint96",
                    },
                ],
                "internalType": "struct LibPart.Part[]",
                "name": "",
                "type": "tuple[]",
            },
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address",
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address",
            },
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool",
            },
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256",
                    },
                    {
                        "internalType": "string",
                        "name": "tokenURI",
                        "type": "string",
                    },
                    {
                        "components": [
                            {
                                "internalType": "address payable",
                                "name": "account",
                                "type": "address",
                            },
                            {
                                "internalType": "uint96",
                                "name": "value",
                                "type": "uint96",
                            },
                        ],
                        "internalType": "struct LibPart.Part[]",
                        "name": "creators",
                        "type": "tuple[]",
                    },
                    {
                        "components": [
                            {
                                "internalType": "address payable",
                                "name": "account",
                                "type": "address",
                            },
                            {
                                "internalType": "uint96",
                                "name": "value",
                                "type": "uint96",
                            },
                        ],
                        "internalType": "struct LibPart.Part[]",
                        "name": "royalties",
                        "type": "tuple[]",
                    },
                    {
                        "internalType": "bytes[]",
                        "name": "signatures",
                        "type": "bytes[]",
                    },
                ],
                "internalType": "struct LibERC721LazyMint.Mint721Data",
                "name": "data",
                "type": "tuple",
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address",
            },
        ],
        "name": "mintAndTransfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string",
            },
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address",
            },
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address",
            },
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address",
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address",
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address",
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address",
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
            {
                "internalType": "bytes",
                "name": "_data",
                "type": "bytes",
            },
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address",
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool",
            },
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address",
            },
            {
                "internalType": "bool",
                "name": "hasApproval",
                "type": "bool",
            },
        ],
        "name": "setDefaultApproval",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4",
            },
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool",
            },
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string",
            },
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256",
            },
        ],
        "name": "tokenByIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256",
            },
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address",
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256",
            },
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256",
            },
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string",
            },
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256",
            },
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address",
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address",
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256",
            },
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256",
                    },
                    {
                        "internalType": "string",
                        "name": "tokenURI",
                        "type": "string",
                    },
                    {
                        "components": [
                            {
                                "internalType": "address payable",
                                "name": "account",
                                "type": "address",
                            },
                            {
                                "internalType": "uint96",
                                "name": "value",
                                "type": "uint96",
                            },
                        ],
                        "internalType": "struct LibPart.Part[]",
                        "name": "creators",
                        "type": "tuple[]",
                    },
                    {
                        "components": [
                            {
                                "internalType": "address payable",
                                "name": "account",
                                "type": "address",
                            },
                            {
                                "internalType": "uint96",
                                "name": "value",
                                "type": "uint96",
                            },
                        ],
                        "internalType": "struct LibPart.Part[]",
                        "name": "royalties",
                        "type": "tuple[]",
                    },
                    {
                        "internalType": "bytes[]",
                        "name": "signatures",
                        "type": "bytes[]",
                    },
                ],
                "internalType": "struct LibERC721LazyMint.Mint721Data",
                "name": "data",
                "type": "tuple",
            },
            {
                "internalType": "address",
                "name": "from",
                "type": "address",
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address",
            },
        ],
        "name": "transferFromOrMint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address",
            },
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256",
            },
            {
                "internalType": "address",
                "name": "_from",
                "type": "address",
            },
            {
                "internalType": "address",
                "name": "_to",
                "type": "address",
            },
        ],
        "name": "updateAccount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string",
            },
            {
                "internalType": "string",
                "name": "_symbol",
                "type": "string",
            },
            {
                "internalType": "string",
                "name": "baseURI",
                "type": "string",
            },
            {
                "internalType": "string",
                "name": "contractURI",
                "type": "string",
            },
        ],
        "name": "__ERC721Rarible_init",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
]

const testErc721Bytecode = "0x608060405234801561001057600080fd5b506143ca806100206000396000f3fe608060405234801561001057600080fd5b50600436106101cf5760003560e01c80636c0360eb11610104578063a22cb465116100a2578063e07f231911610071578063e07f2319146103b9578063e8a3d485146103cc578063e985e9c5146103d4578063f2fde38b146103e7576101cf565b8063a22cb4651461036d578063b88d4fde14610380578063c87b56dd14610393578063cad96cca146103a6576101cf565b8063832fbb29116100de578063832fbb291461032a578063891be9741461033d5780638da5cb5b1461035d57806395d89b4114610365576101cf565b80636c0360eb1461030757806370a082311461030f578063715018a614610322576101cf565b806323b872dd1161017157806342842e0e1161014b57806342842e0e146102bb57806342966c68146102ce5780634f6ccce7146102e15780636352211e146102f4576101cf565b806323b872dd146102825780632a839963146102955780632f745c59146102a8576101cf565b8063095ea7b3116101ad578063095ea7b31461023257806318054c371461024757806318160ddd1461025a57806322a775b61461026f576101cf565b806301ffc9a7146101d457806306fdde03146101fd578063081812fc14610212575b600080fd5b6101e76101e2366004613b94565b6103fa565b6040516101f49190613e3c565b60405180910390f35b61020561040d565b6040516101f49190613e47565b610225610220366004613cff565b6104a3565b6040516101f49190613ddf565b610245610240366004613b69565b610505565b005b610245610255366004613b38565b6105e0565b610262610662565b6040516101f49190613fb5565b61024561027d366004613c58565b610673565b610245610290366004613a8e565b6107fe565b6102456102a3366004613bbc565b610855565b6102626102b6366004613b69565b610990565b6102456102c9366004613a8e565b6109bb565b6102456102dc366004613cff565b6109d6565b6102626102ef366004613cff565b610a28565b610225610302366004613cff565b610a3e565b610205610a66565b61026261031d366004613a3a565b610ac7565b610245610b2f565b610245610338366004613c9d565b610bed565b61035061034b366004613cff565b610c1b565b6040516101f49190613e29565b610225610cab565b610205610cba565b61024561037b366004613b38565b610d1b565b61024561038e366004613ace565b610e20565b6102056103a1366004613cff565b610e7e565b6103506103b4366004613cff565b6110ff565b6102456103c7366004613d17565b61117a565b6102056111bd565b6101e76103e2366004613a56565b61124c565b6102456103f5366004613a3a565b611258565b60006104058261136d565b90505b919050565b609c8054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104995780601f1061046e57610100808354040283529160200191610499565b820191906000526020600020905b81548152906001019060200180831161047c57829003601f168201915b5050505050905090565b60006104ae8261140c565b6104e95760405162461bcd60e51b815260040180806020018281038252602c81526020018061423e602c913960400191505060405180910390fd5b506000908152609a60205260409020546001600160a01b031690565b600061051082610a3e565b9050806001600160a01b0316836001600160a01b031614156105635760405162461bcd60e51b81526004018080602001828103825260218152602001806142ee6021913960400191505060405180910390fd5b806001600160a01b0316610575611419565b6001600160a01b03161480610596575061059681610591611419565b61141d565b6105d15760405162461bcd60e51b81526004018080602001828103825260388152602001806141416038913960400191505060405180910390fd5b6105db838361144b565b505050565b6105e8611419565b6001600160a01b03166105f9610cab565b6001600160a01b031614610654576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b61065e82826114b9565b5050565b600061066e6098611519565b905090565b815160601c6000610682611419565b9050836040015160008151811061069557fe5b6020026020010151600001516001600160a01b0316826001600160a01b0316146106da5760405162461bcd60e51b81526004016106d190613e8f565b60405180910390fd5b836080015151846040015151146106f057600080fd5b806001600160a01b0316826001600160a01b031614806107155750610715828261124c565b6107315760405162461bcd60e51b81526004016106d190613f16565b600061073c85611524565b905060005b8560400151518110156107b25760008660400151828151811061076057fe5b6020026020010151600001519050836001600160a01b0316816001600160a01b0316146107a9576107a981848960800151858151811061079c57fe5b602002602001015161176d565b50600101610741565b506107c1848660000151611778565b6107d385600001518660600151611792565b6107e585600001518660400151611981565b6107f785600001518660200151611b30565b5050505050565b61080f610809611419565b82611b93565b61084a5760405162461bcd60e51b815260040180806020018281038252603181526020018061430f6031913960400191505060405180910390fd5b6105db838383611b9f565b600054610100900460ff168061086e575061086e611ceb565b8061087c575060005460ff16155b6108b75760405162461bcd60e51b815260040180806020018281038252602e8152602001806141cc602e913960400191505060405180910390fd5b600054610100900460ff161580156108e2576000805460ff1961ff0019909116610100171660011790555b6108eb83611cfc565b6108f3611d0f565b6108fb611db0565b610903611d0f565b61090b611e4d565b610913611eea565b61091b611d0f565b610923611fe3565b61092c826120b2565b6109368585612179565b7ff05e55f0a9d205977ca8cc02236338b6a361376f404cf0b3019b2111964a01fd61095f611419565b868660405161097093929190613df3565b60405180910390a180156107f7576000805461ff00191690555050505050565b6001600160a01b03821660009081526097602052604081206109b29083612274565b90505b92915050565b6105db83838360405180602001604052806000815250610e20565b6109e1610809611419565b610a1c5760405162461bcd60e51b81526004018080602001828103825260308152602001806143656030913960400191505060405180910390fd5b610a2581612280565b50565b600080610a3660988461234d565b509392505050565b6000610405826040518060600160405280602981526020016141a36029913960989190612369565b609f8054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104995780601f1061046e57610100808354040283529160200191610499565b60006001600160a01b038216610b0e5760405162461bcd60e51b815260040180806020018281038252602a815260200180614179602a913960400191505060405180910390fd5b6001600160a01b038216600090815260976020526040902061040590611519565b610b37611419565b6001600160a01b0316610b48610cab565b6001600160a01b031614610ba3576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6033546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3603380546001600160a01b0319169055565b8251610bf89061140c565b15610c1157610c0c828285600001516109bb565b6105db565b6105db8382610673565b60606101c76000838152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b82821015610ca057600084815260209081902060408051808201909152908401546001600160a01b0381168252600160a01b90046001600160601b031681830152825260019092019101610c51565b505050509050919050565b6033546001600160a01b031690565b609d8054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104995780601f1061046e57610100808354040283529160200191610499565b610d23611419565b6001600160a01b0316826001600160a01b03161415610d89576040805162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015290519081900360640190fd5b80609b6000610d96611419565b6001600160a01b03908116825260208083019390935260409182016000908120918716808252919093529120805460ff191692151592909217909155610dda611419565b6001600160a01b03167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405180821515815260200191505060405180910390a35050565b610e31610e2b611419565b83611b93565b610e6c5760405162461bcd60e51b815260040180806020018281038252603181526020018061430f6031913960400191505060405180910390fd5b610e7884848484612380565b50505050565b6060610e898261140c565b610ec45760405162461bcd60e51b815260040180806020018281038252602f8152602001806142bf602f913960400191505060405180910390fd5b6000828152609e602090815260408083208054825160026001831615610100026000190190921691909104601f810185900485028201850190935282815292909190830182828015610f575780601f10610f2c57610100808354040283529160200191610f57565b820191906000526020600020905b815481529060010190602001808311610f3a57829003601f168201915b505050505090506000610f68610a66565b9050805160001415610f7c57509050610408565b81511561103d5780826040516020018083805190602001908083835b60208310610fb75780518252601f199092019160209182019101610f98565b51815160209384036101000a600019018019909216911617905285519190930192850191508083835b60208310610fff5780518252601f199092019160209182019101610fe0565b6001836020036101000a0380198251168184511680821785525050505050509050019250505060405160208183030381529060405292505050610408565b80611047856123d2565b6040516020018083805190602001908083835b602083106110795780518252601f19909201916020918201910161105a565b51815160209384036101000a600019018019909216911617905285519190930192850191508083835b602083106110c15780518252601f1990920191602091820191016110a2565b6001836020036101000a0380198251168184511680821785525050505050509050019250505060405160208183030381529060405292505050919050565b60008181526101c660209081526040808320805482518185028101850190935280835260609492939192909184018215610ca057600084815260209081902060408051808201909152908401546001600160a01b0381168252600160a01b90046001600160601b031681830152825260019092019101610c51565b816001600160a01b031661118c611419565b6001600160a01b0316146111b25760405162461bcd60e51b81526004016106d190613eba565b6105db8383836124ad565b6101fa805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156112445780601f1061121957610100808354040283529160200191611244565b820191906000526020600020905b81548152906001019060200180831161122757829003601f168201915b505050505081565b60006109b28383612559565b611260611419565b6001600160a01b0316611271610cab565b6001600160a01b0316146112cc576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b0381166113115760405162461bcd60e51b81526004018080602001828103825260268152602001806140836026913960400191505060405180910390fd5b6033546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3603380546001600160a01b0319166001600160a01b0392909216919091179055565b60006001600160e01b03198216638486f69f60e01b148061139e57506001600160e01b0319821663656cb66560e11b145b806113b957506001600160e01b031982166301ffc9a760e01b145b806113d457506001600160e01b031982166380ac58cd60e01b145b806113ef57506001600160e01b03198216635b5e139f60e01b145b806104055750506001600160e01b03191663780e9d6360e01b1490565b6000610405609883612585565b3390565b6001600160a01b039182166000908152609b6020908152604080832093909416825291909152205460ff1690565b6000818152609a6020526040902080546001600160a01b0319166001600160a01b038416908117909155819061148082610a3e565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6001600160a01b038216600081815260c96020908152604091829020805460ff1916851515908117909155825190815291517f270dbb8ba4292910ae92862466486be25c355c837270a3d8824b36a8bc7c653b9281900390910190a25050565b600061040582612591565b60008082606001515167ffffffffffffffff8111801561154357600080fd5b5060405190808252806020026020018201604052801561156d578160200160208202803683370190505b50905060005b8360600151518110156115bf576115a08460600151828151811061159357fe5b6020026020010151612595565b8282815181106115ac57fe5b6020908102919091010152600101611573565b50600083604001515167ffffffffffffffff811180156115de57600080fd5b50604051908082528060200260200182016040528015611608578160200160208202803683370190505b50905060005b84604001515181101561164d5761162e8560400151828151811061159357fe5b82828151811061163a57fe5b602090810291909101015260010161160e565b507ff64326045af5fd7e15297ba939f85b550474d3899daa47d2bc1ffbdb9ced344e84600001518560200151805190602001208360405160200180828051906020019060200280838360005b838110156116b1578181015183820152602001611699565b50505050905001915050604051602081830303815290604052805190602001208560405160200180828051906020019060200280838360005b838110156117025781810151838201526020016116ea565b505050509050019150506040516020818303038152906040528051906020012060405160200180868152602001858152602001848152602001838152602001828152602001955050505050506040516020818303038152906040528051906020012092505050919050565b6105db838383612602565b61065e828260405180602001604052806000815250612877565b6000805b82518110156119365760006001600160a01b03168382815181106117b657fe5b6020026020010151600001516001600160a01b0316141561181e576040805162461bcd60e51b815260206004820152601b60248201527f526563697069656e742073686f756c642062652070726573656e740000000000604482015290519081900360640190fd5b82818151811061182a57fe5b6020026020010151602001516001600160601b031660001415611894576040805162461bcd60e51b815260206004820181905260248201527f526f79616c74792076616c75652073686f756c6420626520706f736974697665604482015290519081900360640190fd5b8281815181106118a057fe5b6020026020010151602001516001600160601b0316820191506101c660008581526020019081526020016000208382815181106118d957fe5b60209081029190910181015182546001818101855560009485529383902082519101805492909301516001600160601b0316600160a01b026001600160a01b039182166001600160a01b0319909316929092171617905501611796565b5061271081106119775760405162461bcd60e51b81526004018080602001828103825260258152602001806143406025913960400191505060405180910390fd5b6105db83836128c9565b60008281526101c76020526040812090805b8351811015611acf5760006001600160a01b03168482815181106119b357fe5b6020026020010151600001516001600160a01b031614156119e65760405162461bcd60e51b81526004016106d190613edf565b8381815181106119f257fe5b6020026020010151602001516001600160601b031660001415611a275760405162461bcd60e51b81526004016106d190613e5a565b82848281518110611a3457fe5b602090810291909101810151825460018101845560009384529282902081519301805491909201516001600160601b0316600160a01b026001600160a01b039384166001600160a01b0319909216919091179092169190911790558351611ac590859083908110611aa157fe5b6020026020010151602001516001600160601b03168361290690919063ffffffff16565b9150600101611993565b508061271014611af15760405162461bcd60e51b81526004016106d190613f67565b7f841ffb90d4cabdd1f16034f3fa831d79060febbb8167bdd54a49269365bdf78f8484604051611b22929190613fbe565b60405180910390a150505050565b611b398261140c565b611b745760405162461bcd60e51b815260040180806020018281038252602c81526020018061426a602c913960400191505060405180910390fd5b6000828152609e6020908152604090912082516105db9284019061370d565b60006109b28383612960565b826001600160a01b0316611bb282610a3e565b6001600160a01b031614611bf75760405162461bcd60e51b81526004018080602001828103825260298152602001806142966029913960400191505060405180910390fd5b6001600160a01b038216611c3c5760405162461bcd60e51b81526004018080602001828103825260248152602001806140a96024913960400191505060405180910390fd5b611c478383836105db565b611c5260008261144b565b6001600160a01b0383166000908152609760205260409020611c74908261298c565b506001600160a01b0382166000908152609760205260409020611c979082612998565b50611ca4609882846129a4565b5080826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b6000611cf6306129ba565b15905090565b805161065e90609f90602084019061370d565b600054610100900460ff1680611d285750611d28611ceb565b80611d36575060005460ff16155b611d715760405162461bcd60e51b815260040180806020018281038252602e8152602001806141cc602e913960400191505060405180910390fd5b600054610100900460ff16158015611d9c576000805460ff1961ff0019909116610100171660011790555b8015610a25576000805461ff001916905550565b600054610100900460ff1680611dc95750611dc9611ceb565b80611dd7575060005460ff16155b611e125760405162461bcd60e51b815260040180806020018281038252602e8152602001806141cc602e913960400191505060405180910390fd5b600054610100900460ff16158015611e3d576000805460ff1961ff0019909116610100171660011790555b611d9c63656cb66560e11b6129c0565b600054610100900460ff1680611e665750611e66611ceb565b80611e74575060005460ff16155b611eaf5760405162461bcd60e51b815260040180806020018281038252602e8152602001806141cc602e913960400191505060405180910390fd5b600054610100900460ff16158015611eda576000805460ff1961ff0019909116610100171660011790555b611d9c6301ffc9a760e01b6129c0565b600054610100900460ff1680611f035750611f03611ceb565b80611f11575060005460ff16155b611f4c5760405162461bcd60e51b815260040180806020018281038252602e8152602001806141cc602e913960400191505060405180910390fd5b600054610100900460ff16158015611f77576000805460ff1961ff0019909116610100171660011790555b6000611f81611419565b603380546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3508015610a25576000805461ff001916905550565b600054610100900460ff1680611ffc5750611ffc611ceb565b8061200a575060005460ff16155b6120455760405162461bcd60e51b815260040180806020018281038252602e8152602001806141cc602e913960400191505060405180910390fd5b600054610100900460ff16158015612070576000805460ff1961ff0019909116610100171660011790555b611d9c604051806040016040528060078152602001664d696e7437323160c81b815250604051806040016040528060018152602001603160f81b815250612a44565b600054610100900460ff16806120cb57506120cb611ceb565b806120d9575060005460ff16155b6121145760405162461bcd60e51b815260040180806020018281038252602e8152602001806141cc602e913960400191505060405180910390fd5b600054610100900460ff1615801561213f576000805460ff1961ff0019909116610100171660011790555b8151612153906101fa90602085019061370d565b5061216463e8a3d48560e01b6129c0565b801561065e576000805461ff00191690555050565b600054610100900460ff16806121925750612192611ceb565b806121a0575060005460ff16155b6121db5760405162461bcd60e51b815260040180806020018281038252602e8152602001806141cc602e913960400191505060405180910390fd5b600054610100900460ff16158015612206576000805460ff1961ff0019909116610100171660011790555b825161221990609c90602086019061370d565b50815161222d90609d90602085019061370d565b5061223e6380ac58cd60e01b6129c0565b61224e635b5e139f60e01b6129c0565b61225e63780e9d6360e01b6129c0565b80156105db576000805461ff0019169055505050565b60006109b28383612b06565b600061228b82610a3e565b9050612299816000846105db565b6122a460008361144b565b6000828152609e602052604090205460026000196101006001841615020190911604156122e2576000828152609e602052604081206122e291613799565b6001600160a01b0381166000908152609760205260409020612304908361298c565b50612310609883612b6a565b5060405182906000906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b600080808061235c8686612b76565b9097909650945050505050565b6000612376848484612bf1565b90505b9392505050565b61238b848484611b9f565b61239784848484612c7e565b610e785760405162461bcd60e51b81526004018080602001828103825260328152602001806140516032913960400191505060405180910390fd5b6060816123f757506040805180820190915260018152600360fc1b6020820152610408565b8160005b811561240f57600101600a820491506123fb565b60008167ffffffffffffffff8111801561242857600080fd5b506040519080825280601f01601f191660200182016040528015612453576020820181803683370190505b50859350905060001982015b83156124a457600a840660300160f81b8282806001900393508151811061248257fe5b60200101906001600160f81b031916908160001a905350600a8404935061245f565b50949350505050565b60008381526101c66020526040812054905b818110156107f75760008581526101c66020526040902080546001600160a01b0386169190839081106124ee57fe5b6000918252602090912001546001600160a01b031614156125515760008581526101c66020526040902080548491908390811061252757fe5b600091825260209091200180546001600160a01b0319166001600160a01b03929092169190911790555b6001016124bf565b6001600160a01b038116600090815260c9602052604081205460ff16806109b257506109b2838361141d565b60006109b28383612de7565b5490565b8051602091820151604080517f397e04204c1e1a60ee8724b71f8244e10ab5f2e9009854d80f602bda21b59ebb818601526001600160a01b03909316838201526001600160601b039091166060808401919091528151808403909101815260809092019052805191012090565b600061260d83612dff565b9050612621846001600160a01b03166129ba565b156127d75760408051630b135d3f60e11b808252600482018481526024830193845285516044840152855191936001600160a01b03891693631626ba7e938793899390929091606490910190602085019080838360005b83811015612690578181015183820152602001612678565b50505050905090810190601f1680156126bd5780820380516001836020036101000a031916815260200191505b50935050505060206040518083038186803b1580156126db57600080fd5b505afa1580156126ef573d6000803e3d6000fd5b505050506040513d602081101561270557600080fd5b505160408051808201909152601c81527f7369676e617475726520766572696669636174696f6e206572726f72000000006020820152916001600160e01b0319909116146127d15760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561279657818101518382015260200161277e565b50505050905090810190601f1680156127c35780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50610e78565b6001600160a01b0384166127eb8284612e4b565b6001600160a01b0316146040518060400160405280601c81526020017f7369676e617475726520766572696669636174696f6e206572726f7200000000815250906107f75760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561279657818101518382015260200161277e565b6128818383612ecb565b61288e6000848484612c7e565b6105db5760405162461bcd60e51b81526004018080602001828103825260328152602001806140516032913960400191505060405180910390fd5b7f3fa96d7b6bcbfe71ef171666d84db3cf52fa2d1c8afdb1cc8e486177f208b7df82826040516128fa929190613fbe565b60405180910390a15050565b6000828201838110156109b2576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b6001600160a01b038216600090815260c9602052604081205460ff16806109b257506109b28383612ff9565b60006109b28383613095565b60006109b2838361315b565b600061237684846001600160a01b0385166131a5565b3b151590565b6001600160e01b03198082161415612a1f576040805162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b6001600160e01b0319166000908152606560205260409020805460ff19166001179055565b600054610100900460ff1680612a5d5750612a5d611ceb565b80612a6b575060005460ff16155b612aa65760405162461bcd60e51b815260040180806020018281038252602e8152602001806141cc602e913960400191505060405180910390fd5b600054610100900460ff16158015612ad1576000805460ff1961ff0019909116610100171660011790555b825160208085019190912083519184019190912061012e9190915561012f5580156105db576000805461ff0019169055505050565b81546000908210612b485760405162461bcd60e51b815260040180806020018281038252602281526020018061402f6022913960400191505060405180910390fd5b826000018281548110612b5757fe5b9060005260206000200154905092915050565b60006109b2838361323c565b815460009081908310612bba5760405162461bcd60e51b815260040180806020018281038252602281526020018061421c6022913960400191505060405180910390fd5b6000846000018481548110612bcb57fe5b906000526020600020906002020190508060000154816001015492509250509250929050565b60008281526001840160205260408120548281612c4f5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561279657818101518382015260200161277e565b50846000016001820381548110612c6257fe5b9060005260206000209060020201600101549150509392505050565b6000612c92846001600160a01b03166129ba565b612c9e57506001612ddf565b6000612dac630a85bd0160e11b612cb3611419565b88878760405160240180856001600160a01b03168152602001846001600160a01b0316815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015612d1a578181015183820152602001612d02565b50505050905090810190601f168015612d475780820380516001836020036101000a031916815260200191505b5095505050505050604051602081830303815290604052906001600160e01b0319166020820180516001600160e01b038381831617835250505050604051806060016040528060328152602001614051603291396001600160a01b0388169190613310565b90506000818060200190516020811015612dc557600080fd5b50516001600160e01b031916630a85bd0160e11b14925050505b949350505050565b60009081526001919091016020526040902054151590565b6000612e0961331f565b82604051602001808061190160f01b81525060020183815260200182815260200192505050604051602081830303815290604052805190602001209050919050565b60008151604114612ea3576040805162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604482015290519081900360640190fd5b60208201516040830151606084015160001a612ec18682858561335a565b9695505050505050565b6001600160a01b038216612f26576040805162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015290519081900360640190fd5b612f2f8161140c565b15612f81576040805162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015290519081900360640190fd5b612f8d600083836105db565b6001600160a01b0382166000908152609760205260409020612faf9082612998565b50612fbc609882846129a4565b5060405181906001600160a01b038416906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b60006130048261140c565b61303f5760405162461bcd60e51b815260040180806020018281038252602c815260200180614115602c913960400191505060405180910390fd5b600061304a83610a3e565b9050806001600160a01b0316846001600160a01b031614806130855750836001600160a01b031661307a846104a3565b6001600160a01b0316145b80612ddf5750612ddf818561141d565b6000818152600183016020526040812054801561315157835460001980830191908101906000908790839081106130c857fe5b90600052602060002001549050808760000184815481106130e557fe5b60009182526020808320909101929092558281526001898101909252604090209084019055865487908061311557fe5b600190038181906000526020600020016000905590558660010160008781526020019081526020016000206000905560019450505050506109b5565b60009150506109b5565b60006131678383612de7565b61319d575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556109b5565b5060006109b5565b60008281526001840160205260408120548061320a575050604080518082018252838152602080820184815286546001818101895560008981528481209551600290930290950191825591519082015586548684528188019092529290912055612379565b8285600001600183038154811061321d57fe5b9060005260206000209060020201600101819055506000915050612379565b60008181526001830160205260408120548015613151578354600019808301919081019060009087908390811061326f57fe5b906000526020600020906002020190508087600001848154811061328f57fe5b6000918252602080832084546002909302019182556001938401549184019190915583548252898301905260409020908401905586548790806132ce57fe5b60008281526020808220600260001990940193840201828155600190810183905592909355888152898201909252604082209190915594506109b59350505050565b606061237684846000856134d8565b600061066e7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f61334d613633565b61335561363a565b613641565b60007f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08211156133bb5760405162461bcd60e51b81526004018080602001828103825260228152602001806140cd6022913960400191505060405180910390fd5b8360ff16601b14806133d057508360ff16601c145b61340b5760405162461bcd60e51b81526004018080602001828103825260228152602001806141fa6022913960400191505060405180910390fd5b600060018686868660405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015613467573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166134cf576040805162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604482015290519081900360640190fd5b95945050505050565b6060824710156135195760405162461bcd60e51b81526004018080602001828103825260268152602001806140ef6026913960400191505060405180910390fd5b613522856129ba565b613573576040805162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015290519081900360640190fd5b600080866001600160a01b031685876040518082805190602001908083835b602083106135b15780518252601f199092019160209182019101613592565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d8060008114613613576040519150601f19603f3d011682016040523d82523d6000602084013e613618565b606091505b50915091506136288282866136a3565b979650505050505050565b61012e5490565b61012f5490565b600083838361364e613709565b3060405160200180868152602001858152602001848152602001838152602001826001600160a01b03168152602001955050505050506040516020818303038152906040528051906020012090509392505050565b606083156136b2575081612379565b8251156136c25782518084602001fd5b60405162461bcd60e51b815260206004820181815284516024840152845185939192839260440191908501908083836000831561279657818101518382015260200161277e565b4690565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826137435760008555613789565b82601f1061375c57805160ff1916838001178555613789565b82800160010185558215613789579182015b8281111561378957825182559160200191906001019061376e565b506137959291506137d9565b5090565b50805460018160011615610100020316600290046000825580601f106137bf5750610a25565b601f016020900490600052602060002090810190610a2591905b5b8082111561379557600081556001016137da565b600082601f8301126137fe578081fd5b8135602061381361380e83613ffb565b613fd7565b82815281810190858301855b8581101561384857613836898684358b0101613911565b8452928401929084019060010161381f565b5090979650505050505050565b600082601f830112613865578081fd5b8135602061387561380e83613ffb565b82815281810190858301604080860288018501891015613893578687fd5b865b868110156139035781838b0312156138ab578788fd5b815182810181811067ffffffffffffffff821117156138c657fe5b835283356138d381614019565b8152838701356001600160601b03811681146138ed57898afd5b8188015285529385019391810191600101613895565b509198975050505050505050565b600082601f830112613921578081fd5b813567ffffffffffffffff81111561393557fe5b613948601f8201601f1916602001613fd7565b81815284602083860101111561395c578283fd5b816020850160208301379081016020019190915292915050565b600060a08284031215613987578081fd5b61399160a0613fd7565b905081358152602082013567ffffffffffffffff808211156139b257600080fd5b6139be85838601613911565b602084015260408401359150808211156139d757600080fd5b6139e385838601613855565b604084015260608401359150808211156139fc57600080fd5b613a0885838601613855565b60608401526080840135915080821115613a2157600080fd5b50613a2e848285016137ee565b60808301525092915050565b600060208284031215613a4b578081fd5b81356109b281614019565b60008060408385031215613a68578081fd5b8235613a7381614019565b91506020830135613a8381614019565b809150509250929050565b600080600060608486031215613aa2578081fd5b8335613aad81614019565b92506020840135613abd81614019565b929592945050506040919091013590565b60008060008060808587031215613ae3578081fd5b8435613aee81614019565b93506020850135613afe81614019565b925060408501359150606085013567ffffffffffffffff811115613b20578182fd5b613b2c87828801613911565b91505092959194509250565b60008060408385031215613b4a578182fd5b8235613b5581614019565b915060208301358015158114613a83578182fd5b60008060408385031215613b7b578182fd5b8235613b8681614019565b946020939093013593505050565b600060208284031215613ba5578081fd5b81356001600160e01b0319811681146109b2578182fd5b60008060008060808587031215613bd1578182fd5b843567ffffffffffffffff80821115613be8578384fd5b613bf488838901613911565b95506020870135915080821115613c09578384fd5b613c1588838901613911565b94506040870135915080821115613c2a578384fd5b613c3688838901613911565b93506060870135915080821115613c4b578283fd5b50613b2c87828801613911565b60008060408385031215613c6a578182fd5b823567ffffffffffffffff811115613c80578283fd5b613c8c85828601613976565b9250506020830135613a8381614019565b600080600060608486031215613cb1578081fd5b833567ffffffffffffffff811115613cc7578182fd5b613cd386828701613976565b9350506020840135613ce481614019565b91506040840135613cf481614019565b809150509250925092565b600060208284031215613d10578081fd5b5035919050565b600080600060608486031215613d2b578081fd5b833592506020840135613ce481614019565b6000815180845260208085019450808401835b83811015613d8957815180516001600160a01b031688528301516001600160601b03168388015260409096019590820190600101613d50565b509495945050505050565b60008151808452815b81811015613db957602081850181015186830182015201613d9d565b81811115613dca5782602083870101525b50601f01601f19169290920160200192915050565b6001600160a01b0391909116815260200190565b6001600160a01b0384168152606060208201819052600090613e1790830185613d94565b8281036040840152612ec18185613d94565b6000602082526109b26020830184613d3d565b901515815260200190565b6000602082526109b26020830184613d94565b6020808252818101527f43726561746f722073686172652073686f756c6420626520706f736974697665604082015260600190565b6020808252601190820152701d1bdad95b9259081a5b98dbdc9c9958dd607a1b604082015260600190565b6020808252600b908201526a1b9bdd08185b1b1bddd95960aa1b604082015260600190565b60208082526019908201527f4163636f756e742073686f756c642062652070726573656e7400000000000000604082015260600190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b6020808252602e908201527f746f74616c20616d6f756e74206f662063726561746f7273207368617265207360408201526d0686f756c642062652031303030360941b606082015260800190565b90815260200190565b6000838252604060208301526123766040830184613d3d565b60405181810167ffffffffffffffff81118282101715613ff357fe5b604052919050565b600067ffffffffffffffff82111561400f57fe5b5060209081020190565b6001600160a01b0381168114610a2557600080fdfe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e64734552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734552433732313a207472616e7366657220746f20746865207a65726f206164647265737345434453413a20696e76616c6964207369676e6174757265202773272076616c7565416464726573733a20696e73756666696369656e742062616c616e636520666f722063616c6c4552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e496e697469616c697a61626c653a20636f6e747261637420697320616c726561647920696e697469616c697a656445434453413a20696e76616c6964207369676e6174757265202776272076616c7565456e756d657261626c654d61703a20696e646578206f7574206f6620626f756e64734552433732313a20617070726f76656420717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732314d657461646174613a2055524920736574206f66206e6f6e6578697374656e7420746f6b656e4552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776e4552433732314d657461646174613a2055524920717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564526f79616c747920746f74616c2076616c75652073686f756c64206265203c2031303030304552433732314275726e61626c653a2063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564a2646970667358221220e4e317589b83edb15df0a382977ac584048a65ee7cf99c84b68e604a51a042f064736f6c63430007060033"

/**
 * Deploy ERC721Rarible contract (https://github.com/rarible/protocol-contracts/blob/master/tokens/contracts/erc-721/ERC721Rarible.sol)
 */
export async function deployTestErc721Rarible(web3: Web3, name = "test", symbol = "test"): Promise<Contract> {
    const empty = createTestErc721(web3)
    const [address] = await web3.eth.getAccounts()
    return empty
        .deploy({
            "data": testErc721Bytecode,
            "arguments": [ //TODO
                name,
                symbol,
            ],
        })
        .send({
            "from": address,
            "gas": 5000000,
            "gasPrice": "0",
        })
        .then((contract) =>
            sentTx(
                contract.methods.__ERC721Rarible_init(name, symbol, "ipfs:/", "ipfs:/"),
                {from: address}
            ).then(() => contract))
}

function createTestErc721(web3: Web3, address?: Address): Contract {
    return new web3.eth.Contract(testErc721Abi, address)
}
