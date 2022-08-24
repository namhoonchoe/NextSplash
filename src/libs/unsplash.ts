import { createApi } from "unsplash-js";

const ApiKey = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY as string

const unsplash = createApi({
  accessKey: ApiKey
})

export const getRandomPhotos = async () => {
  const { response } = await unsplash.photos.getRandom({
    count: 20,
    featured: true,
  });
  if (response !== undefined) {
    return { props: { response } };
  }
};

export async function getRelatedPhotos(topicIds: Array<string>) {
  const { response } = await unsplash.photos.getRandom({
    count: 15,
    topicIds: topicIds,
    featured: true,
  });
  if (response !== undefined) {
    return response;
  }
}

export const getTopics = async () => {
  const { response } = await unsplash.topics.list({
    perPage: 20,
    orderBy: "featured",
  });
  if (response !== undefined) {
    const { results } = response;
    return results;
  }
};

export async function getTopicPhotos(topicId: string) {
  const { response } = await unsplash.topics.getPhotos({
    topicIdOrSlug: topicId,
    perPage: 20,
  });
  return response?.results as Array<ITopicPhoto> | undefined;
}

interface ISearchQuery {
  query: string;
  orientation?: any;
  color?: any;
  orderBy?: any;
}

export async function searchPhotos(queryObject: ISearchQuery) {
  const { query, orientation, color, orderBy } = queryObject;
  const { response } = await unsplash.search.getPhotos({
    query,
    orientation,
    color,
    orderBy,
  });
  return response?.results as Array<ISearchPhoto> | undefined;
}

export async function searchCollections(query: string) {
  const { response } = await unsplash.search.getCollections({ query });
  return response?.results as Array<ISearchCollection> | undefined;
}

export async function getCollection(id: string) {
  const { response } = await unsplash.collections.get({ collectionId: id });
  return response as ICollection | undefined;
}

export async function getCollectionPhotos(id: string) {
  const { response } = await unsplash.collections.getPhotos({
    collectionId: id,
  });
  return response?.results as Array<ICoverPhoto> | undefined;
}
