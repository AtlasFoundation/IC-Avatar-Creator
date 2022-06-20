import React from "react"
import './dabStuff.css';
import dip721v2_idl from '@psychedelic/dab-js/dist/idls/dip_721_v2.did';
import { sceneService } from "../services";
import * as assetIDL from './interfaces/index';

export function Mint({onSuccess}) {

  const cipherCanister = "6hgw2-nyaaa-aaaai-abkqq-cai"
  const dansAssets = "qgh4x-kyaaa-aaaaj-afk5q-cai"
  const whitelist = [cipherCanister, dansAssets];

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
    const storageActor = await (window as any).ic.plug.createActor({canisterId: dansAssets, interfaceFactory: assetIDL.idlFactory});
    const image = await sceneService.getScreenShot();

    const model = await sceneService.getModelFromScene("glb");

    const {hair, face, tops, arms, shoes, legs}: any = sceneService.getTraits();

    // TODO: Upload glb in chunks
    const previewImgUrl = "https://qgh4x-kyaaa-aaaaj-afk5q-cai.raw.ic0.app/2/preview.jpg"; // TODO
    const modelUrl = "https://qgh4x-kyaaa-aaaaj-afk5q-cai.raw.ic0.app/2/preview.jpg"; // TODO=

    const createChunkDefault = async ({batch_id, chunk}) => storageActor.create_chunk({
      batch_id,
      content: [...new Uint8Array(await chunk.arrayBuffer())]
    })

    {
      const {batch_id} = await storageActor.create_batch({});
    
      const promises = [];
      const chunkSize = 700000;
      for (let start = 0; start < image.size; start += chunkSize) {
        const chunk = image.slice(start, start + chunkSize);
        promises.push(createChunkDefault({
          batch_id,
          chunk
        }));
      }
    
      const chunkIds = await Promise.all(promises);
      console.log(chunkIds);
    
      await storageActor.commit_batch({
        batch_id,
        operations: [{'CreateAsset': {key: 'thumbnail', content_type: image.type}}],
      })
    }
    {
      const {batch_id} = await storageActor.create_batch({});
    
      const promises = [];
      const chunkSize = 700000;
      for (let start = 0; start < (model as Blob).size; start += chunkSize) {
        const chunk = (model as Blob).slice(start, start + chunkSize);
        promises.push(createChunkDefault({
          batch_id,
          chunk
        }));
      }
    
      const chunkIds = await Promise.all(promises);
      console.log(chunkIds);
    
      await storageActor.commit_batch({
        batch_id,
        operations: [{'CreateAsset': {key: 'model', content_type: (model as Blob).type}}],
      })
    }

        // opensea metadata format
        const metadata = {
          name: import.meta.env.VITE_ASSET_NAME ?? "Open Character Creator Avatar",
          description: import.meta.env.VITE_ASSET_DESCRIPTION ?? "Custom 3D NFT Avatars",
          image: previewImgUrl,
          animation_url: modelUrl,
          attributes: [
            {
              trait_type: "Hair",
              value: hair?.traitInfo ? hair?.traitInfo?.name : "None"
            },
            {
              trait_type: "Face",
              value: face?.traitInfo ? face?.traitInfo?.name : "None"
            },
            {
              trait_type: "Tops",
              value: tops?.traitInfo ? tops?.traitInfo?.name : "None"
            },
            {
              trait_type: "Arms",
              value: arms?.traitInfo ? arms?.traitInfo?.name : "None"
            },
            {
              trait_type: "Legs",
              value: legs?.traitInfo ? legs?.traitInfo?.name : "None"
            },
            {
              trait_type: "Shoes",
              value: shoes?.traitInfo ? shoes?.traitInfo?.name : "None"
            }
          ]
        };
    
        const stringifiedMetadata = JSON.stringify(metadata);
    
        const properties = [
          [
            "location",
            {
              "TextContent": previewImgUrl
            }
          ],
          [
            "json",
            {
              "TextContent": stringifiedMetadata
            }
          ]
        ];
        console.log("principal is", principal);
        console.log("tokenIndex is", tokenIndex);
        console.log("properties", properties)
    
    const mintResult = await plugActor.mint(principal, tokenIndex, properties);
    if(onSuccess) onSuccess(mintResult);
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