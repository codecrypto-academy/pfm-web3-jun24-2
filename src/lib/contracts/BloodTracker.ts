export const abi = [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "bldTokenAddress",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "derTokenAddress",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "buyItem",
      "inputs": [
        { "name": "nftAddress", "type": "address", "internalType": "address" },
        { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "cancelListing",
      "inputs": [
        { "name": "nftAddress", "type": "address", "internalType": "address" },
        { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "companies",
      "inputs": [
        {
          "name": "companyWallet",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        { "name": "name", "type": "string", "internalType": "string" },
        { "name": "location", "type": "string", "internalType": "string" },
        {
          "name": "role",
          "type": "uint8",
          "internalType": "enum BloodTracker.Role"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "donate",
      "inputs": [
        { "name": "_from", "type": "address", "internalType": "address" }
      ],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "donors",
      "inputs": [
        { "name": "donorWallet", "type": "address", "internalType": "address" }
      ],
      "outputs": [
        {
          "name": "bloodType",
          "type": "uint8",
          "internalType": "enum IBlood.BloodType"
        },
        { "name": "balance", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getListing",
      "inputs": [
        { "name": "nftAddress", "type": "address", "internalType": "address" },
        { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct Marketplace.Listing",
          "components": [
            { "name": "price", "type": "uint256", "internalType": "uint256" },
            { "name": "seller", "type": "address", "internalType": "address" }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getProceeds",
      "inputs": [
        { "name": "seller", "type": "address", "internalType": "address" }
      ],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getTokensOnSale",
      "inputs": [
        { "name": "tokenAddress", "type": "address", "internalType": "address" }
      ],
      "outputs": [
        { "name": "", "type": "uint256[]", "internalType": "uint256[]" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "listItem",
      "inputs": [
        { "name": "nftAddress", "type": "address", "internalType": "address" },
        { "name": "tokenId", "type": "uint256", "internalType": "uint256" },
        { "name": "price", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "process",
      "inputs": [
        { "name": "_tokenId", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "signUp",
      "inputs": [
        { "name": "_name", "type": "string", "internalType": "string" },
        { "name": "_location", "type": "string", "internalType": "string" },
        {
          "name": "_role",
          "type": "uint8",
          "internalType": "enum BloodTracker.Role"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "updateListing",
      "inputs": [
        { "name": "nftAddress", "type": "address", "internalType": "address" },
        { "name": "tokenId", "type": "uint256", "internalType": "uint256" },
        { "name": "newPrice", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "withdrawProceeds",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "Donation",
      "inputs": [
        {
          "name": "donor",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ItemBought",
      "inputs": [
        {
          "name": "buyer",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "nftAddress",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "name": "price",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ItemCanceled",
      "inputs": [
        {
          "name": "seller",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "nftAddress",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ItemListed",
      "inputs": [
        {
          "name": "seller",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "nftAddress",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "tokenId",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "name": "price",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "AlreadyListed",
      "inputs": [
        { "name": "nftAddress", "type": "address", "internalType": "address" },
        { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
      ]
    },
    {
      "type": "error",
      "name": "BloodTracker__IncorrectRole",
      "inputs": [
        {
          "name": "required",
          "type": "uint8",
          "internalType": "enum BloodTracker.Role"
        },
        {
          "name": "yourRole",
          "type": "uint8",
          "internalType": "enum BloodTracker.Role"
        }
      ]
    },
    { "type": "error", "name": "BloodTracker__NotOwner", "inputs": [] },
    { "type": "error", "name": "NoProceeds", "inputs": [] },
    { "type": "error", "name": "NotApprovedForMarketplace", "inputs": [] },
    {
      "type": "error",
      "name": "NotListed",
      "inputs": [
        { "name": "nftAddress", "type": "address", "internalType": "address" },
        { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
      ]
    },
    { "type": "error", "name": "NotOwner", "inputs": [] },
    { "type": "error", "name": "PriceMustBeAboveZero", "inputs": [] },
    {
      "type": "error",
      "name": "PriceNotMet",
      "inputs": [
        { "name": "nftAddress", "type": "address", "internalType": "address" },
        { "name": "tokenId", "type": "uint256", "internalType": "uint256" },
        { "name": "price", "type": "uint256", "internalType": "uint256" }
      ]
    },
    { "type": "error", "name": "ReentrancyGuardReentrantCall", "inputs": [] }
  ] as const