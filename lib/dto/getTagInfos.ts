import { TagDTO } from "./core/tag"
import { TagGroupDTO } from "./core/tagGroup"

export interface GetTagInfosResult {
  results: {
    tags: TagDTO[]
    tagGroup: TagGroupDTO
  }[]
}
