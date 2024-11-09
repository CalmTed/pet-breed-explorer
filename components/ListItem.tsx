import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Breed, PET_TYPE } from "../interfaces";
import { getCatImage, getDogImage } from "../uitls/fetchHandlers";

type Props = {
  data: Breed;
};

const ListItem = ({ data }: Props) => {
  const [image, setImage] = useState("");
  useEffect(() => {
      const getImage = async () => {
        try{
          if( typeof data.reference_image_id != "string") {
            return;
          }
          const imageurl = (data.pet_type == PET_TYPE.CAT ? await getCatImage({image_id: data.reference_image_id}) : await getDogImage({image_id: data.reference_image_id}))
          setImage(imageurl)
        }catch(e){
          console.error("Unable to get image")
        }
      }
      if(image === ""){
        getImage()
      }
  },
  [data.reference_image_id]
)
  return <Link href="/breed/[id]" as={`/breed/${data.id}`} >
    <div className="flex max-w-xl flex-col items-start justify-between rounded-xl overflow-hidden hover:opacity-90 shadow-lg hover:scale-105 shadow-xl transition-all">
      {data.reference_image_id && <img className="w-full" src={image} alt={`${data.name} image`}/> }
      {!data.reference_image_id && <img className="w-fit" src="https://dogsinsights.com/wp-content/uploads/2023/08/dog-breed-placeholder-2.jpg" alt={`${data.name} image`}/> }
      <span className="text-center w-full text-lg my-5">{data.name}</span>
    </div>
  </Link>
}

export default ListItem