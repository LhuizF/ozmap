export class RegionEntity {
  constructor(id: string, name: string, coordinates: [number, number][][]) {
    this.id = id;
    this.name = name;
    this.geometry = {
      type: 'Polygon',
      coordinates: coordinates,
    };
  }
  readonly id: string;
  readonly name: string;
  readonly geometry: {
    readonly type: 'Polygon';
    readonly coordinates: [number, number][][];
  };
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
