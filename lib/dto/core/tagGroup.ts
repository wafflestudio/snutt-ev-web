import { TagDTO } from "./tag"

export interface TagGroupDTO {
  id: number
  name: string
  ordering: number
  tags: TagDTO[]
}
