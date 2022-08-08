A token address: not useful — it is a given beyond our control. So all information needs to go in TokenID and URI which we can be freely defined: URI can´t change over the lifetime of the deployed smart contract, but TokenID can. So why can´t the TokenID be a pointer itself to the metadata — an idea by Titusz Pan? We would then just add “ipfs://” in front… which is well possible….


TokenID=IPFScontentidentifierhash

## ipfs://f0{id}

A CID as base58 encoded hash does not make a great TokenID, I doubt that Solidity can handle base58 natively. But thanks to Version 1 , CIDs can have many different formats, identifiable by different leading multi-base identifiers characters. Decimal CID would make a perfect TokenID, however, decimal denominations of CID are work in progress at the time being. On the contrary, the hexadecimal denomination is well implemented into the current version of IPFS and solidity can handle hex numbers pretty well — so why not stick with hex. We will do so in the following.


We create a CID V1 by adding “cid-version=1 hash=blake2b-208”.

$ ipfs add MetaDataIPFSToken.json cid-version=1 hash=blake2b-208
added bafkzvzacdkm3bu3t266ivacqjowxqi3hvpqsyijxhsb23rv7nj7a MetaDataIPFSToken.json

Than convert it to hex “-b=base16”.

$ ipfs cid format -b=base16 bafkzvzacdkm3bu3t266ivacqjowxqi3hvpqsyijxhsb23rv7nj7a
f01559ae4021a99b0d373d7bc8a80504bad782367abe12c21373c83adc6bf6a7e

Without the leading “f” this gives a wonderful token ID.

What is still necessary is to tweak the ERC 1155 URI function a bit to give back a full ipfs URL with hex number (and leading “f0”) in a string.

