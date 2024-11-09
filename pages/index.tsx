import Layout from "../components/Layout";

import List from "../components/List";
import { Breed } from "../interfaces";
import { useEffect, useState } from "react";
import {fetchCats, fetchDogs, searchCats, searchDogs } from "../uitls/fetchHandlers"

export default function Page() {
  const [petBreeds, setPetBreeds] = useState([] as Breed[])
  const [loadingState, setLoadingState] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [searchInput, setSearchInput] = useState("")


  async function fetchCatBreeds() {
    try{
      const catData = await fetchCats();
      const dogData = await fetchDogs();
      const shuffledData = [...catData, ...dogData].sort(() => Math.random() > 0.5 ? -1 : 1)
      setPetBreeds(shuffledData)
      setLoadingState(false)
    }catch(e){
      console.error("Uable to fetch data")
      setLoadingState(false)
    }
  }

  async function fetchSuggestions(nv:string) {
    try{
      const catSuggestions = await searchCats({q:nv})
      const dogSuggestions = await searchDogs({q:nv})
      const shuffledData = [...catSuggestions, ...dogSuggestions].map(b => b.name).sort(() => Math.random() > 0.5 ? -1 : 1).slice(0,10)
      setSuggestions(shuffledData)
    }catch(e){
      console.error("Uable to fetch data")
    }
  }

  async function fetchSearch(nv:string) {
    try{
      const catSearched = await searchCats({q:nv})
      const dogSearched = await searchDogs({q:nv})
      const shuffledData = [...catSearched, ...dogSearched].sort(() => Math.random() > 0.5 ? -1 : 1)
      setPetBreeds(shuffledData)
    }catch(e){
      console.error("Uable to fetch data")
    }
  }

  useEffect(() => {
    setLoadingState(true)
    fetchCatBreeds()
    
  }, [])
     
  const handleClick = () => {
    fetchCatBreeds()
  }

  const handleInputChange = (nv:string) => {
    fetchSuggestions(nv)
    setSearchInput(nv)
  }

  const handleSearch = () => {
    fetchSearch(searchInput)
  }

  const handleOptionSelection = (s:string) => {
    setSuggestions([])
    setSearchInput(s)
    fetchSearch(s)
  }


  return (
    <Layout title="Pet Breed Explorer">
      <div className="container mx-auto my-10">
       <div>
       <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Pet Breed Explorer</h2>
      <div className="flex gap-10 mt-10">
         <button className="rounded-full bg-gray-50 px-5 py-3 h-min font-medium text-gray shadow-md transition-all hover:shadow-xl" onClick={handleClick}>🔁 New random breeds</button>
          <div>
            <label>
              <input className="px-5 py-3 mr-3 rounded-full shadow-md" type="search" value={searchInput} onChange={(e) => handleInputChange(e.target.value)}/>
              <button className="px-5 py-3 rounded-full shadow-md hover:shadow-xl" onClick={handleSearch}>Search</button>
            </label>
            {suggestions.length > 0 &&
              <div className="flex-wrap max-w-min bg-white absolute rounded-sm overflow-hidden">
                {suggestions.filter(s => s !== searchInput).map(s => 
                  <span key={s} onClick={() => handleOptionSelection(s)} className="flex flex-auto px-4 py-2 min-w-full hover:bg-gray-light">{s}</span>
                  )}
              </div>
            }
          </div>
      </div>
       </div>
       <div>
        {!!petBreeds.length && <List items={petBreeds}></List>}
        {loadingState && <div>Loading...</div>}
        {!loadingState &&  !petBreeds.length && <div>Nothing to show here :(</div>}
       </div>
      </div>
     </Layout>
  )
}
