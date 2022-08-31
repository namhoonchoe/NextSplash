import axios, { AxiosInstance } from "axios";
const ApiKey = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY as string;

const unsplashApi: AxiosInstance = axios.create({
  baseURL: "https://api.unsplash.com/",
  params: {
    client_id: ApiKey,
  },
});




export const getEditorials = async () => {
  const { data } = await unsplashApi.get("photos", {
    params: {
      per_page: 20,
      order_by: "popular",
    },
  });
  return data;
};




export const getRandomPhotos = async () => {
  const { data } = await unsplashApi.get("photos/random", {
    params: {
      count: 20,
      featured: true,
    },
  });
  return data;
};


export const getPhoto = async (id:string) => {
  const { data } = await unsplashApi.get(`photos/${id}`, {
    params: {
      count: 20,
      featured: true,
    },
  });
  return data;
}

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
  const { data: { results } } = await unsplashApi.get("search/photos", {
    params: {
      query,
      orientation,
      color,
      orderBy,
    },
  });

  return results
};

export const searchCollections = async (query: string) => {
  const { data: { results } } = await unsplashApi.get("search/collections", {
    params: {
      query,
    },
  });
  return results
}

export const getCollection = async (id: string) => {
  const { data } = await unsplashApi.get(`collections/${id}`, { params: { collectionId: id } });
  return data
};

export const getCollectionPhotos = async (id: string) => {
  const { data } = await unsplashApi.get(`/collections/${id}/photos`, {
    params: {
      collectionId: id,
    },
  });
  return data
};
