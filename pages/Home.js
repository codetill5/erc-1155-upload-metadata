// import * as IPFS from 'ipfs-core';
const CIDTool = require('cid-tool')

 const Home = () => {
//Do check notes.md
  const addToIPFS = async() => {
    const metadata = {
      name: "POKEMON 101",
      description: "This is Pikachu",
      image: "https://static.wikia.nocookie.net/pokemon/images/4/49/Ash_Pikachu.png/revision/latest?cb=20200405125039" //ipfs hash
    }
    
    const options ={
      cidVersion: 1,
    //   hashAlg: "0xb21a"   // different Hashing Algo
    }

    //Storing data
    // const ipfs = await IPFS.create();
    // const response = await ipfs.add({content: JSON.stringify(metadata)}, options);
    // console.log(response);
    }


    //converting to base16
    const res = CIDTool.format('bafkreic2aonyr3whz2cd7dllb42nhwjhs2lnfc3j6vs5b4lgno5jojtise', { base: 'base16' })
    console.log(res);

  return (
    <div>
     <button onClick={() => addToIPFS()}>UPload</button>
    </div>
  )
}

export default Home;
