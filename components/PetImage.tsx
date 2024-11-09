import { useEffect, useState } from "react";
import { Breed, PET_TYPE } from "../interfaces";
import { getCatImage, getDogImage } from "../uitls/fetchHandlers";

type Props = {
    breed: Breed;
  };
  
const ListItem = ({ breed }: Props) => {
    const [image, setImage] = useState("");
    useEffect(() => {
        const getImage = async () => {
          try{
            if( typeof breed.reference_image_id != "string") {
              return;
            }
            const imageurl = (breed.pet_type == PET_TYPE.CAT ? await getCatImage({image_id: breed.reference_image_id}) : await getDogImage({image_id: breed.reference_image_id}))
            setImage(imageurl)
          }catch(e){
            console.error("Unable to get image")
          }
        }
        if(image === ""){
          getImage()
        }
    },
    [breed.reference_image_id]
  )
    return <>
        {breed.reference_image_id && <img className="w-full" src={image} alt={`${breed.name} image`}/> }
        {!breed.reference_image_id && <img className="w-full" src="https://dogsinsights.com/wp-content/uploads/2023/08/dog-breed-placeholder-2.jpg" alt={`${breed.name} image`}/> }
    </>
  }
  
  export default ListItem