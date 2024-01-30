// Define the structure of the data for a single comment's user

export interface Profile {
  user_id: string;
  user_name: string;
  email: string;
}


export interface Comments {
  id: string;
  post_id: string
  created_at: Date;
  comment_description: string;
  likes: number;
  dislikes: number;
  user_id: Profile;
  //   posts: PostItem;
}


export interface PostItem {
  id: string;
  created_at: Date;
  post_title: string;
  post_description: string;
  post_category: string;
  post_image: string;
  likes: number;
  dislikes: number;
  profile_id: string;
  profiles: Profile;
  comments: Comments[];
}
