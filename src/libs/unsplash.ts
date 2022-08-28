import axios, { AxiosInstance } from "axios";
const ApiKey = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY as string;

const unsplashApi: AxiosInstance = axios.create({
  baseURL: "https://api.unsplash.com/",
  params: {
    client_id: ApiKey,
  },
});

export const getRandomPhotos = async () => {
  const { data } = await unsplashApi.get("photos/random", {
    params: {
      count: 20,
      featured: true,
    },
  });
  return data;
};

export const getTopic = async (topicId: string) => {
  const { data } = await unsplashApi.get(`topics/${topicId}`, {
    params: {
      id_or_slug: topicId,
    },
  });
  return data;
};

export const getTopicList = async () => {
  const { data } = await unsplashApi.get("topics", {
    params: {
      per_page: 20,
      order_by: "featured",
    },
  });
  return data;
};

export const getRelatedPhotos = async (topicIds: Array<string>) => {
  const { data } = await unsplashApi.get("photos/random", {
    params: {
      count: 15,
      topic_ids: topicIds,
      featured: true,
    },
  })
  return data;

}

export const getTopicPhotos = async (topicId: string) => {
  const { data } = await unsplashApi.get(`topics/${topicId}/photos`, {
    params: {
      id_or_slug: topicId,
      per_page: 20,
    },
  })
  return data;
}


interface ISearchQuery {
  query: string;
  orientation?: any;
  color?: any;
  orderBy?: any;
}

export const searchPhotos = async (queryObject: ISearchQuery) => {
  const { query, orientation, color, orderBy } = queryObject;
  await unsplashApi.get("search/photos", {
    params: {
      query,
      orientation,
      color,
      orderBy,
    },
  });
};

export const searchCollections = async (query: string) =>
  await unsplashApi.get("search/collections", {
    params: {
      query,
    },
  });

export const getCollection = async (id: string) => {
  await unsplashApi.get(`collections/${id}`, { params: { collectionId: id } });
};

export const getCollectionPhotos = async (id: string) => {
  await unsplashApi.get(`/collections/${id}/photos`, {
    params: {
      collectionId: id,
    },
  });
};
