import * as React from "react";

import { Breed, PET_TYPE } from "../interfaces";
import PetImage from "./PetImage";
import Link from "next/link";
import { getCatImages, getDogImages } from "../uitls/fetchHandlers";

type ListDetailProps = {
  item: Breed;
};

const ListDetail = ({ item: breed }: ListDetailProps) => {
  const [breedImages, setImages] = React.useState([])
  const [loadingState, setLoadingState] = React.useState(true)
  React.useEffect(() => {
    const getImages = async () => {
      const imagesData = breed.pet_type === PET_TYPE.CAT ? await getCatImages({breed_id: breed.id}) : await getDogImages({breed_id: breed.id})
      setImages(imagesData)
      setLoadingState(false)  
    }
    getImages()
  },[])
  return (
    <div className="container">
    <div className="flex mt-10">
      <div className="min-w-96 max-w-96 h-min mr-10 rounded-xl overflow-hidden shadow-lg">
        <PetImage breed={breed}/>
      </div>
      <div className="flex-auto grow">
        <h2 className="text-4xl">Detail for {breed.name}</h2>
        {/* <p>ID: {breed.id}</p> */}
        {/* <p>Name: {breed.name}</p> */}
        {breed?.alt_names && <p>Also known as: {breed.alt_names}</p>}
        {breed?.description && <p>Description: {breed.description}</p>}
        <p>Life span: {breed.life_span} {breed.life_span.includes("years") ? "" : "yrs"}</p>
        {breed?.origin && <p>Origin: {breed.origin}</p>}
        {breed?.weight && <p>Weight: {breed.weight.metric} kg</p>}
        {breed?.height && <p>Height: {breed.height?.metric} cm</p>}
        {breed?.bred_for && <p>Bred for: {breed.bred_for}</p>}
        {breed?.breed_group && <p>Breed group: {breed.breed_group}</p>}
        {breed?.temperament && <p>Temperament: {breed.temperament}</p>}

        {breed?.adaptability && <p>Adaptability: {breed.adaptability}/5</p>}
        {breed?.child_friendly && <p>Child friendly: {breed.child_friendly}/5</p>}
        {breed?.dog_friendly && <p>Dog friendly: {breed.dog_friendly}/5</p>}
        {breed?.energy_level && <p>Energy level: {breed.energy_level}/5</p>}
        {breed?.grooming && <p>Grooming: {breed.grooming}/5</p>}
        {breed?.health_issues && <p>Health issues: {breed.health_issues}/5</p>}
        {breed?.intelligence && <p>Intelligence: {breed.intelligence}/5</p>}
        {breed?.shedding_level && <p>Shedding level: {breed.shedding_level}/5</p>}
        {breed?.social_needs && <p>Social needs: {breed.social_needs}/5</p>}
        {breed?.vocalisation && <p>Vocalisation: {breed.vocalisation}/5</p>}

        {typeof breed?.indor !== "undefined" && <p>Indor: {breed.indor ? "Yes" : "No"}</p>}
        {typeof breed?.lap !== "undefined" && <p>Lap: {breed.lap ? "Yes" : "No"}</p>}
        {typeof breed?.experimental !== "undefined" && <p>Experimental: {breed.experimental ? "Yes" : "No"}</p>}
        {typeof breed?.hairless !== "undefined" && <p>Hairless: {breed.hairless ? "Yes" : "No"}</p>}
        {typeof breed?.natural !== "undefined" && <p>Natural: {breed.natural ? "Yes" : "No"}</p>}
        {typeof breed?.rare !== "undefined" && <p>Rare: {breed.rare ? "Yes" : "No"}</p>}
        {typeof breed?.rex !== "undefined" && <p>Rex: {breed.rex ? "Yes" : "No"}</p>}
        {typeof breed?.suppressed_tail !== "undefined" && <p>Suppressed tail: {breed.suppressed_tail ? "Yes" : "No"}</p>}
        {typeof breed?.short_legs !== "undefined" && <p>Short legs: {breed.short_legs ? "Yes" : "No"}</p>}

        {breed?.wikipedia_url && <Link href={breed.wikipedia_url} className="text-blue" target="blank">Read more on Wikipedia</Link>}

      </div>
    </div>
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-4 gap-y-4 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {loadingState && <span>Loading more images...</span>}
      {breedImages.map((img) => (
        <div className="min-w-96 max-w-96 h-min mr-10 rounded-xl overflow-hidden shadow-lg">
          <img key={img} className="w-full" src={img} alt={`${breed.name} image`}/>
          {/* <PetImage breed={breed}/> */}
        </div>
      ))}
    </div>
    </div>
  );
};

export default ListDetail;
