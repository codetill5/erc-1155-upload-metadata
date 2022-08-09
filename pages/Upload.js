import React, { useState } from "react";
import { importer } from "ipfs-unixfs-importer";
import browserReadableStreamToIt from "browser-readablestream-to-it";
import axios from "axios";
import { CarWriter } from "@ipld/car";
import * as IPFS from "ipfs-core";

// converting json to .car (content addressable format)

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [rootCid, setRootCid] = useState();
  const [carUrl, setCarUrl] = useState();
  const [data, setData] = useState();
  const [main, setMain] = useState();

  const onFileInput = (setFiles, evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const fileList = evt && evt.target && evt.target.files;
    const files = [];
    for (const file of fileList) {
      files.push(file);
    }
    console.log("adding", files);
    setFiles(files);
  };

  // custom

  const handleCustom = () => {
    const metadata = {
      name: "fivee",
      desc: "this is eee",
      image:
        "https://ipfs.io/ipfs/bafkreiftqutqqv7h4zha5o7b5mjlielhghqynkgioq42f5aqbwzsil6xvy",
    };
    var type = "application/json";
    var filename01 = "105.json";
    var fd = new FormData();
    var file = new File([JSON.stringify(metadata)], filename01, { type: type }); //add filename here
    console.log(main, "mainn");
    fd.append("file", file);
    const files = [];

    files.push(file);

    setFiles(files);
  };

  console.log(files[0]?.name);

  const createCarBlob = async (files) => {
    if (!files || !files.length) return;
    if (files.car) return;
    console.log(files.car, "file car");
    const carParts = [];
    const { root, out } = await fileListToCarIterator(files);
    for await (const chunk of out) {
      carParts.push(chunk);
    }
    const car = new Blob(carParts, {
      type: "application/car",
    });
    return { root, car };
  };

  const fileListToCarIterator = async (
    fileList,
    blockApi = new MapBlockStore()
  ) => {
    const fileEntries = [];
    for (const file of fileList) {
      fileEntries.push({
        path: file.name,
        content: browserReadableStreamToIt(file.stream()),
      });
    }

    const options = {
      cidVersion: 1,
      wrapWithDirectory: true,
      rawLeaves: true,
    };
    const unixFsEntries = [];
    for await (const entry of importer(fileEntries, blockApi, options)) {
      unixFsEntries.push(entry);
    }

    const root = unixFsEntries[unixFsEntries.length - 1].cid;
    const { writer, out } = CarWriter.create(root);
    for (const block of blockApi.blocks()) {
      writer.put(block);
    }
    writer.close();
    console.log(root.toString());
    return { root, out };
  };

  class MapBlockStore {
    constructor() {
      this.store = new Map();
    }
    *blocks() {
      for (const [cid, bytes] of this.store.entries()) {
        yield { cid, bytes };
      }
    }
    put({ cid, bytes }) {
      return Promise.resolve(this.store.set(cid, bytes));
    }
    get(cid) {
      return Promise.resolve(this.store.get(cid));
    }
  }

  const handleCreate = async () => {
    if (files || files.length > 0) {
      const { root, car } = await createCarBlob(files);
      if (car) {
        setCarUrl(URL.createObjectURL(car));
        setRootCid(root);
      }
    } else {
      console.log("none");
    }
  };

  //   console.log(carUrl, "car url");
  console.log(rootCid, "root cid");

  const toFile = async () => {
    const ipfs = await IPFS.create();
    const result = await ipfs.cat(cid);
    console.log(result, "ress");
  };

  const uploadCarToIpfs = async () => {
    const response = await axios.post("https://api.nft.storage/upload", "", {
      headers: {
        "Content-Type": "application/car",
        Authorization: `Bearer`,
      },
    });
    console.log(response, "uploading response");
  };

  return (
    <div>
      <input type="file" multiple onChange={onFileInput.bind(null, setFiles)} />
      <button onClick={() => handleCreate()}>Create</button>
      <button onClick={() => handleCustom()}>Custom</button>
      <button onClick={() => uploadCarToIpfs()}>Upload car</button>
      <a href={carUrl} download={`${rootCid}.car`}>
        Click to download
      </a>

      <button onClick={() => toFile()}>toFile</button>
    </div>
  );
};

export default Upload;
