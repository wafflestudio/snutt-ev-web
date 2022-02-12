import { TagColorDTO, TagDTO } from "./tag"

export interface TagGroupDTO {
  id: number
  name: string
  ordering: number
  color: string
  tags: TagDTO[]
}

export interface TagGroupWithColor {
  id: number
  name: string
  ordering: number
  color: string
  tags: TagColorDTO[]
}
