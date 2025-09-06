import { Schema, model, Document } from 'mongoose';

export interface IRegionDocument extends Document {
  name: string;
  geometry: {
    type: 'Polygon';
    coordinates: [number, number][][];
  };
  createdAt: Date;
  updatedAt: Date;
}

export const RegionSchema = new Schema(
  {
    name: { type: String, required: true },
    geometry: {
      type: {
        type: String,
        enum: ['Polygon'],
        required: true,
      },
      coordinates: {
        type: [[[Number]]],
        required: true,
      },
    },
  },
  { timestamps: true },
);

//
RegionSchema.index({ geometry: '2dsphere' });

export const RegionModel = model<IRegionDocument>('Region', RegionSchema);
