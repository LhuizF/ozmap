export class RegionEntity {
  constructor(
    id: string,
    name: string,
    geometry: { type: string; coordinates: [number, number][][] },
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.geometry = geometry;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  readonly id: string;
  readonly name: string;
  readonly geometry: {
    readonly type: string;
    readonly coordinates: [number, number][][];
  };
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
