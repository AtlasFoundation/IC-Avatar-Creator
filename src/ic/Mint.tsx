import React from "react"
import './dabStuff.css';
import dip721v2_idl from '@psychedelic/dab-js/dist/idls/dip_721_v2.did';

export function Mint() {

  const cipherCanister = "6hgw2-nyaaa-aaaai-abkqq-cai"
  const whitelist = [cipherCanister];

  const checkIndex = async() => {
    const canisterId = cipherCanister;
    await (window as any).ic.plug.createAgent({whitelist});
    const plugActor = await (window as any).ic.plug.createActor({canisterId, interfaceFactory: dip721v2_idl});
    let tokenIndex = await plugActor.totalSupply();
    console.log("tokenIndex is", tokenIndex)
    // tokenIndex is a BigInt
    // add 1 to it and return it
    // convert token index to a string and remove the last character
    tokenIndex = tokenIndex.toString();
    console.log("tokenIndex is", tokenIndex);
    const finalNumber = Number(tokenIndex) + 1;
    return finalNumber;
  }

  const mintNFT = async() => {
    const canisterId = cipherCanister;
    const principal = await (window as any).ic.plug.agent.getPrincipal();
    const tokenIndex = await checkIndex();
    await (window as any).ic.plug.createAgent({whitelist});
    const plugActor = await (window as any).ic.plug.createActor({canisterId, interfaceFactory: dip721v2_idl});
    const properties = [
      [
        "location",
        {
          "TextContent": "https://f2cug-hyaaa-aaaah-abkdq-cai.raw.ic0.app/0/preview.jpg"
        }
      ],
      [
        "json",
        {
          "TextContent": "{\"this\":\"can be your thoth spell :D\"}"
        }
      ]
    ];
    console.log("principal is", principal);
    console.log("tokenIndex is", tokenIndex);
    console.log("properties", properties)
    const mintResult = await plugActor.mint(principal, tokenIndex, properties);
    console.log(mintResult);
  }

  return (
    <>
      <div className='buttonContainer'>
        <h6>Minting Dip721v2:</h6>
        <button id='mintNFT' onClick={mintNFT} className='mintButton'>Mint</button>
      </div>
    </>
  )
}