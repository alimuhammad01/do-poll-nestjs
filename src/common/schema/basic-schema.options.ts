import { SchemaOptions } from "mongoose";

export class BasicSchemaOptions {

  static getOptions(collectionName: string) : SchemaOptions {

    const options: SchemaOptions = {
      collection: collectionName,

      writeConcern: {
        w: 'majority'
      },
      toJSON: {
          virtuals: true,
          transform: function (doc, ret) { delete ret._id  }
      },
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      },
    };

    return options;
  }
}
