import { GraphQLResolveInfo } from 'graphql';
import { getFlatProjectionFromAST } from 'graphql-compose';
import client from '../client';
import { AxiosRequestConfig } from 'axios';

interface Filter {
  // path fields
  folderId?: string;
  spaceId?: string;
  // regular fields
  permalink?: string;
  descendants?: boolean;
  metadata?: Record<string, string>;
  customField?: Record<string, string>;
  updatedDate?: {
    start?: string;
    end?: string;
  };
  project?: boolean;
  deleted?: boolean;
  contractTypes?: string;
}

export const projectionFields = [
  'metadata',
  'hasAttachments',
  'attachmentCount',
  'description',
  'briefDescription',
  'customFields',
  'customColumnIds',
  'superParentIds',
  'space',
  'contractType',
] as const;

type Projection = typeof projectionFields[number][];

type FindManyOpts = {
  filter?: Filter;
  projection?: Projection;
};

// https://developers.wrike.com/api/v4/folders-projects/#get-folder-tree
export async function _folderFindMany(opts: FindManyOpts, context: AxiosRequestConfig) {
  const { filter, projection } = opts || {};

  let params: Record<string, any> = {};

  const { folderId, spaceId, ...restFilter } = filter || {};

  if (restFilter) {
    params = { ...restFilter };
  }

  if (projection) {
    if (projection.length > 0) params.fields = projection;
  }

  let url = '/folders';
  if (folderId) {
    url = `/folders/${folderId}/folders`;
  } else if (spaceId) {
    url = `/spaces/${spaceId}/folders`;
  }

  const res = await client.get(url, { ...context, params });

  return res?.data?.data;
}

export function folderFindMany(
  opts: Exclude<FindManyOpts, 'projection'> & { info: GraphQLResolveInfo },
  context: AxiosRequestConfig
) {
  const requestedFields = Object.keys(getFlatProjectionFromAST(opts.info));
  const projection = projectionFields.filter((n) => requestedFields.includes(n));
  return _folderFindMany({ ...opts, projection }, context);
}
