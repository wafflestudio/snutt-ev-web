export interface TagDTO {
  id: number;
  name: string;
  ordering: number;
  description: string;
}

export interface TagWithColor extends TagDTO {
  color: string;
}
