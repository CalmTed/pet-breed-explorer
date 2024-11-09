import { Breed, PET_TYPE } from "../interfaces";

export const fetchCats:() => Promise<Breed[]> = async () => {
    const page = Math.round(Math.random() * 7)
    console.log(page)
    const catRes = await fetch(`https://api.thecatapi.com/v1/breeds?limit=9&page=${page}`)
    const catData = (await catRes.json()).map((i) => ({...i, pet_type: PET_TYPE.CAT})) as Breed[]
    return catData;
}

export const fetchDogs:() => Promise<Breed[]> = async () => {
    const page = Math.round(Math.random() * 7)
    console.log(page)
    const dogRes = await fetch(`https://api.thedogapi.com/v1/breeds?limit=9&page=${page}`)
    const dogData = (await dogRes.json()).map((i) => ({...i, pet_type: PET_TYPE.DOG})) as Breed[]
    return dogData;
}


export const getCatImage: (params: {image_id}) => Promise<string> = async ({image_id}) => {
    const catRes = await fetch(`https://api.thecatapi.com/v1/images/${image_id}`, {
        method: "get",
        headers: {
            "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY
        }
    })
    const catImageData = await catRes.json();
    return catImageData.url;
}

export const getDogImage: (params: {image_id}) => Promise<string> = async ({image_id}) => {
    const dogRes = await fetch(`https://api.thedogapi.com/v1/images/${image_id}`, {
        method: "get",
        headers: {  
            "x-api-key": process.env.NEXT_PUBLIC_DOG_API_KEY
        }
    })
    const dogImageData = await dogRes.json();   
    return dogImageData.url;
}



export const getCatDetails: (params: {id}) => Promise<Breed> = async ({id}) => {
    const catRes = await fetch(`https://api.thecatapi.com/v1/breeds/${id}`, {
        method: "get",
        headers: {
            "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY
        }
    })
    const catData: Breed = await catRes.json();
    return {...catData, pet_type: PET_TYPE.CAT};
}

export const getDogDetails: (params: {id}) => Promise<Breed> = async ({id}) => {
    const dogRes = await fetch(`https://api.thedogapi.com/v1/breeds/${id}`, {
        method: "get",
        headers: {  
            "x-api-key": process.env.NEXT_PUBLIC_DOG_API_KEY
        }
    })
    const dogData: Breed = await dogRes.json();   
    return {...dogData, pet_type: PET_TYPE.DOG};
}

export const getCatImages: (params: {breed_id}) => Promise<string[]> = async ({breed_id}) => {
    const catRes = await fetch(`https://api.thecatapi.com/v1/images/search/?size=med&has_breeds=true&order=RANDOM&include_breeds=${breed_id}&limit=12`, {
        method: "get",
        headers: {  
            "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY
        }
    })
    const catImagesData = await catRes.json();   
    return catImagesData.map(i => i.url) as string[];
}

export const getDogImages: (params: {breed_id}) => Promise<string[]> = async ({breed_id}) => {
    const dogRes = await fetch(`https://api.thedogapi.com/v1/images/search/?size=med&include_breeds=true&has_breeds=true&limit=30`, {
        method: "get",
        headers: {  
            "x-api-key": process.env.NEXT_PUBLIC_DOG_API_KEY
        }
    })
    const dogImagesData = await dogRes.json();
    return dogImagesData.filter(i => i.breeds[0].id === breed_id).map(i => i.url) as string[];
}

export const searchCats: (params: {q: string}) => Promise<Breed[]> = async ({q}    ) => {
    const catRes = await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${q}&attach_image=1`, {
        method: "get",
        headers: {  
            "x-api-key": process.env.NEXT_PUBLIC_CAT_API_KEY
        }
    })
    const catData = await catRes.json();
    return catData as Breed[];
}

export const searchDogs: (params: {q: string}) => Promise<Breed[]> = async ({q}    ) => {
    const dogRes = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${q}&attach_image=1`, {
        method: "get",
        headers: {  
            "x-api-key": process.env.NEXT_PUBLIC_DOG_API_KEY
        }
    })
    const dogData = await dogRes.json();
    return dogData as Breed[];
}