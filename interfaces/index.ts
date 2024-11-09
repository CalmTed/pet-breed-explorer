
export enum PET_TYPE{
  DOG = "dog",
  CAT = "cat"
}

export type Breed = {
  id: number
  name: string
  description: string
  origin:string
  height: {
    metric: string
  },
  weight: {
    metric: string
  }
  life_span: string;
  reference_image_id: string
  pet_type: PET_TYPE
  alt_names?: string
  bred_for?: string
  breed_group?: string
  temperament?: string
  adaptability?: string
  child_friendly?: string
  dog_friendly?: string
  energy_level?: string
  grooming?: string
  health_issues?: string
  intelligence?: string
  shedding_level?: string
  social_needs?: string
  vocalisation?: string
  indor?: string
  lap?: string
  experimental?: string
  hairless?: string
  natural?: string
  rare?: string
  rex?: string
  suppressed_tail?: string
  short_legs?: string
  wikipedia_url?: string
};

