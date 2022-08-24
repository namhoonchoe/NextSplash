interface IRandom {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  urls: IUrls;
  links: ILinks;
  categories: Array<any>;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: Array<any>;
  sponsorship: any;
  topic_submissions: any;
  user: IUser;
  exif: IExif;
  location: ILocation;
  views: number;
  downloads: number;
}

interface IExif {
  make: string;
  model: string;
  name: string;
  exposure_time: string;
  aperture: string;
  focal_length: string;
  iso: number;
}

interface ILinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface ILocation {
  title: null;
  name: null;
  city: null;
  country: null;
  position: IPosition;
}

interface IPosition {
  latitude: number;
  longitude: number;
}

interface IUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

interface ITag {
  type: string;
  title: string;
  source?: any;
}

interface IUser {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string;
  portfolio_url: null;
  bio: string;
  location: string;
  links: IUserLinks;
  profile_image: IProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: ISocial;
}

interface IUserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

interface ICollectionItem {
  id: number;
  title: string;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  cover_photo: null;
  user: null;
}

interface ISocial {
  instagram_username: string;
  portfolio_url: string;
  twitter_username: string;
  paypal_email: null;
}

interface IProfileImage {
  small: string;
  medium: string;
  large: string;
}

interface ITopic {
  id: string;
  slug: string;
  title: string;
  description: string;
  published_at: Date;
  updated_at: Date;
  starts_at: Date;
  ends_at: null;
  only_submissions_after: null;
  featured: boolean;
  total_photos: number;
  links: ITopicLinks;
  status: string;
  owners: Array<IOwner>;
  current_user_contributions: Array<any>;
  total_current_user_submissions: any;
  cover_photo: ICoverPhoto;
  preview_photos: Array<IPreviewPhoto>;
}

interface ITopicLinks {
  self: string;
  html: string;
  photos: string;
}

interface IOwnerLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

interface IOwner {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: null | string;
  twitter_username: string;
  portfolio_url: string;
  bio: string;
  location: string;
  links: IOwnerLinks;
  profile_image: IProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
}

interface ICoverPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: null | string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string | null;
  urls: IUrls;
  links: ILinks;
  categories: Array<any>;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: Array<any>;
  sponsorship: any;
  topic_submissions: any;
  user: IUser;
}

interface IPreviewPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  blur_hash: string;
  urls: IUrls;
}

interface ITopicPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: null | string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  urls: IUrls;
  links: ILinks;
  categorys: Array<any>;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: Array<any>;
  sponsorship: any;
  topic_submissions: any;
  user: IUser;
}

interface ISearchPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  urls: IUrls;
  links: ILinks;
  categories: Array<any>;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: any;
  topic_submissions: any;
  user: IUser;
  tags: Array<ITag>;
}

interface ISearchCollectionUserLinks {
  self: string;
  html: string;
  photos: string;
  likes?: string;
  related?: string;
}

interface ISearchCollectionUser {
  id: string;
  username: string;
  name: string;
  portfolio_url: string | null;
  bio: string;
  profile_image: IProfileImage;
  links: ISearchCollectionUserLinks;
}

interface ISearchCollectionCoverPhoto {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string;
  user: ISearchCollectionUser;
  urls: IUrls;
  links: ISearchPhotoDataLinks;
}

interface ISearchCollection {
  id: number;
  title: string;
  description: null | string;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  curated: boolean;
  featured: boolean;
  total_photos: number;
  private: boolean;
  share_key: string;
  tags: Array<ITag>;
  user: IUser;
  links: ILinks;
  cover_photo: ISearchCollectionCoverPhoto;
  preview_photos: Array<IPreviewPhoto>;
}

interface ISearchUser {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: null | string;
  portfolio_url: null | string;
  bio: string;
  location: string;
  links: IOwnerLinks;
  profile_image: IProfileImage;
  instagram_username: null | string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  followed_by_user: boolean;
  social: ISocial;
  photos: Array<IPreviewPhoto>;
}

interface IMeta {
  title?: null | string;
  description?: null | string;
  index: boolean;
}

interface ICollection {
  id: number;
  title: string;
  description: null | string;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  curated: boolean;
  featured: boolean;
  total_photos: number;
  private: boolean;
  share_key: string;
  tags: Array<ITag>;
  user: IUser;
  links: ILinks;
  cover_photo: ISearchCollectionCoverPhoto;
  preview_photos: Array<IPreviewPhoto>;
  meta: IMeta;
}

interface ITags {
  custom: Array<ITag>;
  aggregated: Array<ITag>;
}

interface IBadge {
  title: string;
  primary: boolean;
  slug: string;
  link: string;
}

interface IProfileInfo {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: null | string;
  portfolio_url: null | string;
  bio: null | string;
  location: null | string;
  links: IUserLinks;
  profile_image: IProfileImage;
  instagram_username: null | string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: ISocial;
  followed_by_user: boolean;
  photos: Array<IPreviewPhoto>;
  badge: IBadge;
  tags: ITags;
  followers_count: number;
  following_count: number;
  allow_messages: true;
  numeric_id: number;
  downloads: number;
  meta: IMeta;
}