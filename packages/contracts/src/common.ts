import { Type } from '@sinclair/typebox';

export const Result = Type.Object({
  id: Type.String(),
  version: Type.Number(),
});

export const Success = Type.Object({
  success: Type.Boolean(),
});

export const UploadData = Type.Object({
  signed_url: Type.String(),
  relative_path: Type.String(),
  resource_id: Type.String({ format: 'uuid' }),
  headers: Type.Record(Type.String(), Type.Any()),
});
