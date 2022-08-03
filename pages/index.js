import React, { useState } from 'react';

const Home = () => {
  const [image, setImage] = useState();
  const [imageIpfsHash, setImageIpfsHash] = useState();

const uploadImage = async() => {
  const formData = new FormData();
  formData.append("file", image);

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v3/ipfs`,
    formData,
    {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    }
  );
  localStorage.setItem("imageHash", response);
  setImageIpfsHash(response);
}


const createJSONFiles = () => {
  const metadata = {
    name: "First ERC-1155 Token",
    desc: "This is my first ever ERC-1155 Token",
    image: "uri"
    // image: imageIpfsHash ? imageIpfsHash : localStorage.getItem("imageHash") 
  }

}

  return (
   <div>
    <h1>Upload</h1>
    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
    <button onClick={() => uploadImage()}>Upload</button>
    <button onClick={() => createJSONFiles()}>Create Json File</button>
   </div>
  )
}

export default Home;