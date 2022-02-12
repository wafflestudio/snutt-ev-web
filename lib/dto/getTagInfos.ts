import { TagGroupDTO, TagGroupWithColor } from "./core/tagGroup"

export interface GetTagInfosResult {
  tag_groups: TagGroupDTO[]
}

export interface GetTagInfosProcessedResult {
  tag_groups: TagGroupWithColor[]
}
