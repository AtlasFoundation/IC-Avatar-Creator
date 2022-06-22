import React from "react"
import './dabStuff.css';
import dip721v2_idl from '@psychedelic/dab-js/dist/idls/dip_721_v2.did';
import { sceneService } from "../services";
import { createActor, idlFactory } from './interfaces/motokoStorage/src/declarations/storage';
import { Actor, HttpAgent } from "@dfinity/agent";


let storageActor;

export function Mint({ onSuccess }) {

  const cipherCanister = "6hgw2-nyaaa-aaaai-abkqq-cai"
  const cipherAssets = "piwdi-uyaaa-aaaam-qaojq-cai"


  const whitelist = [cipherCanister, cipherAssets];

  const checkIndex = async () => {
    const canisterId = cipherCanister;
    // await (window as any).ic.plug.createAgent({whitelist});
    const plugActor = await (window as any).ic.plug.createActor({ canisterId, interfaceFactory: dip721v2_idl });
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


  const uploadChunk = async ({ batch_name, chunk }) => storageActor.create_chunk({
    batch_name,
    content: [...new Uint8Array(await chunk.arrayBuffer())],
  })

  const upload = async (file, name) => {
    const batch_name = name;
    const chunks = [];
    const chunkSize = 1500000

    for (let start = 0; start < file.size; start += chunkSize) {
      const chunk = file.slice(start, start + chunkSize);

      chunks.push(uploadChunk({
        batch_name,
        chunk
      }))
    }

    const chunkIds = await Promise.all(chunks);

    console.log("chunkIds", chunkIds);

    await storageActor.commit_batch({
      batch_name,
      chunk_ids: chunkIds.map(({ chunk_id }) => chunk_id),
      content_type: file.type
    })

    console.log("upload finished");
  }

  const downloadModel = (model, format: any) => {
    sceneService.download(model, `testmodel`, format, false);
  };

  const mintNFT = async () => {
    const canisterId = cipherCanister;
    const assetsCanister = cipherAssets;
    const principal = await (window as any).ic.plug.agent.getPrincipal();
    const tokenIndex = await checkIndex();
    await (window as any).ic.plug.createAgent({ whitelist });
    const image = await sceneService.getScreenShotByElementId('editor-scene');
    console.log("image", image);
    const plugActor = await (window as any).ic.plug.createActor({ canisterId: cipherCanister, interfaceFactory: dip721v2_idl });
    const model = await sceneService.getModelFromScene();
    console.log("model is", model)


    const { hair, face, tops, arms, shoes, legs }: any = sceneService.getTraits();

    const agent = (window as any).ic.plug.agent;

    storageActor = createActor(assetsCanister, agent);

    console.log("image is", image);
    console.log("mo//del is", model);

    // TODO: Upload glb in chunks
    const previewImgUrl = tokenIndex + "_preview.jpg"; // TODO
    const modelUrl = tokenIndex + "_model.glb";
    const viewerLink = "https://" + cipherAssets + ".raw.ic0.app/assets/?token=" + tokenIndex;

    const actualImgUrl = "https://" + cipherAssets + ".raw.ic0.app/assets/" + previewImgUrl;
    const actualModelUrl = "https://" + cipherAssets + ".raw.ic0.app/assets/" + modelUrl;

    const previewAssetContainer = "https://fsn6e-wqaaa-aaaam-qapqa-cai.ic0.app/?token=" + tokenIndex;

    await upload(image, previewImgUrl);
    console.log("uploading model")
    await upload(model, modelUrl);

    // opensea metadata format
    const metadata = {
      name: import.meta.env.VITE_ASSET_NAME ?? "Open Character Creator Avatar",
      description: import.meta.env.VITE_ASSET_DESCRIPTION ?? "Custom 3D NFT Avatars",
      image: actualImgUrl,
      animation_url: actualModelUrl,
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
          "TextContent": previewAssetContainer
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
    if (onSuccess) onSuccess(previewAssetContainer);
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