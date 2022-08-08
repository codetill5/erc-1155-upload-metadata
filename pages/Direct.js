import React, { useState } from "react";
import * as IPFS from "ipfs-core";

// IPFS Methods

const Direct = () => {
  const getUpload = async () => {
    const result = [];
    const ipfs = await IPFS.create();

    for await (const resultPart of ipfs.files.ls("/desktop")) {
      result.push(resultPart);
    }
    console.log(result);
    return result;
  };

  //   const ipfs = await IPFS.create();
  //   const { cid } = await ipfs.add("Hello world");
  //   console.info(cid);

  const finalUpload = async () => {
    const metadata = {
      name: "two of one",
      desc: "this is first",
      image:
        "https://ipfs.io/ipfs/bafkreiftqutqqv7h4zha5o7b5mjlielhghqynkgioq42f5aqbwzsil6xvy",
    };
    var type = "application/json";
    var filename01 = "101.json";
    var fd = new FormData();
    var blob = new Blob([JSON.stringify(metadata)], { type: type });
    fd.append("file02", blob, filename01);
    console.log(blob);
    const ipfs = await IPFS.create();
    await ipfs.files.write(
      "/ipfs/bafybeibmxcozfdfn6lnryam2r7tp32fn3h5jlhu2dk7nq6imdotgihzoii" +
        filename01,
      blob,
      { create: true }
    );
  };

  const checkDir = async () => {
    const ipfs = await IPFS.create();
    const res = await ipfs.files.stat("/desktop");
    console.log(res, "hello");
    // await ipfs.files.mkdir('/my/beautiful/assets')
  };

  const writeData = async () => {
    const ipfs = await IPFS.create();
    const metadata = {
      name: "tddssee",
      desc: "thisfdsds is first",
      image:
        "https://ipfs.io/ipfs/bafkreiftqutqqv7h4zha5o7b5mjlielhghqynkgioq42f5aqbwzsil6xvy",
    };
    var type = "application/json";
    var filename01 = "112.json";
    var fd = new FormData();
    var file = new File([JSON.stringify(metadata)], filename01, { type: type }); //add filename here
    console.log(file, "mainn");
    fd.append("file", file);
    const files = [];

    files.push(file);
    console.log(files);

    const options = {
      warpWithDirectory: true,
      progress: (prog) => console.log(prog),
    };

    //   const result = await ipfs.files.write(`/content/items`, blob, {create: true})
    const result = await ipfs.files.write("/desktop/112.json", files, {
      create: true,
    });
    console.log(result, "resss");
  };

  const creatingDir = async () => {
    const ipfs = await IPFS.create();
    const response = await ipfs.files.mkdir("/desktop");
    console.log(response);
  };

  const readData = async () => {
    const ipfs = await IPFS.create();
    const chunks = [];

    for await (const chunk of ipfs.files.read("/content/108.json")) {
      chunks.push(chunk);
    }

    console.log(Buffer.concat(chunks).toString());
  };

  const movingDirectory = async () => {
    const ipfs = await IPFS.create();
    const res = await ipfs.files.mv(
      "/content",
      "/ipfs/bafybeibmxcozfdfn6lnryam2r7tp32fn3h5jlhu2dk7nq6imdotgihzoii"
    );
    console.log(res);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={() => finalUpload()}>Set</button>
      <button onClick={() => getUpload()}>Get</button>
      <button onClick={() => checkDir()}>check directory</button>
      <button onClick={() => writeData()}>Write data</button>
      <button onClick={() => creatingDir()}>create directory </button>
      <button onClick={() => readData()}>read data</button>
      <button onClick={() => movingDirectory()}>move directory </button>
    </div>
  );
};

export default Direct;
