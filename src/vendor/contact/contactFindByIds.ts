import client from '../client';
import { getFlatProjectionFromAST } from 'graphql-compose';
import { GraphQLResolveInfo } from 'graphql-compose/lib/graphql';
import { splitRequestBy100 } from '../_helpers/splitRequestBy100';
import { AxiosRequestConfig } from 'axios';

export const projectionFields = ['metadata', 'workScheduleId'] as const;

type TaskProjection = typeof projectionFields[number][];

type FindByIdsOpts = {
  ids: ReadonlyArray<string>;
  projection?: TaskProjection;
};

// https://developers.wrike.com/api/v4/contacts/#query-contacts
export async function _contactFindByIds(opts: FindByIdsOpts, context: AxiosRequestConfig) {
  const { ids, projection } = opts || {};

  const params: Record<string, any> = {};
  if (projection) {
    if (projection.length > 0) params.fields = projection;
  }

  return splitRequestBy100(ids, async (preparedIds) => {
    const res = await client.get(`/contacts/${preparedIds}`, { ...context, params });
    return res?.data?.data;
  });
}

export function contactFindByIds(
  opts: Exclude<FindByIdsOpts, 'projection'> & { info: GraphQLResolveInfo },
  context: AxiosRequestConfig
) {
  const requestedFields = Object.keys(getFlatProjectionFromAST(opts.info));
  const projection = projectionFields.filter((n) => requestedFields.includes(n));
  return _contactFindByIds({ ...opts, projection }, context);
}
