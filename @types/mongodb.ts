import {
  DefaultSchemaOptions,
  Document,
  FlatRecord,
  Model,
  Mongoose,
  Schema,
  Types,
} from 'mongoose';

declare global {
  var mongoose: {
    model(
      arg0: string,
      UserModal: Schema<
        any,
        Model<any, any, any, any, any, any>,
        {},
        {},
        {},
        {},
        DefaultSchemaOptions,
        {
          name: string;
          clerk_id: string;
          email_address: string;
          image_url?: string | null | undefined;
        },
        Document<
          unknown,
          {},
          FlatRecord<{
            name: string;
            clerk_id: string;
            email_address: string;
            image_url?: string | null | undefined;
          }>
        > &
          FlatRecord<{
            name: string;
            clerk_id: string;
            email_address: string;
            image_url?: string | null | undefined;
          }> & { _id: Types.ObjectId }
      >
    ): import('mongoose').Model<any, {}, {}, {}, any, any>;
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
  };
}
