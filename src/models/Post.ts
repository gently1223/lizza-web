export interface Post {
  id: string;
  media_url: string;
  caption: string;
  likes: number;
  comments: number;
  thumbnail_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  //Product
  price: number;
  name: string;
  description: string;
}
