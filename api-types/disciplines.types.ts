export type DisciplineEntity = {
  slug: string;
  name: string;
  tags: string[] | null;
};

export type GetDisciplinesEndpointData = DisciplineEntity[];
