import { TagDTO, TagWithColor } from './tag';

export interface TagGroupDTO {
  id: number;
  name: string;
  ordering: number;
  color: string | null;
  tags: TagDTO[];
}

export interface TagGroupWithColor extends TagGroupDTO {
  tags: TagWithColor[];
}
