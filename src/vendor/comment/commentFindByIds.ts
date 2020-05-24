import client from '../client';

export type FindByIdsArgs = {
  ids: string[];
  plainText: boolean;
};

// https://developers.wrike.com/api/v4/comments/#get-comments
export async function commentFindByIds(opts: FindByIdsArgs) {
  const { ids, plainText } = opts || {};

  if (!ids) {
    throw new Error('You should provide at least one id in `ids` argument');
  }

  const params = {} as Record<string, any>;
  if (plainText) params.plainText = true;

  const res = await client.get(`/comments/${ids.join(',')}`, { params });

  return res?.data?.data;
}
