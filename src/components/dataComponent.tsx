// Define the structure of the data for a single comment's user

export interface Profile {
  user_name: string;
  email: string;
}

// Define the structure of the data for a single comment
export interface Comments {
  id: string;
  created_at: Date;
  comment_description: string;
  likes: number;
  dislikes: number;
  user_id: Profile;
  //   posts: PostItem;
}

// Define the structure of the data for a single post
export interface PostItem {
  id: string;
  created_at: Date;
  post_title: string;
  post_description: string;
  post_category: string;
  post_image: string;
  likes: number;
  dislikes: number;
  profile_id: string; // Assuming this is the ID of the user who made the post
  profiles: Profile; // This should be an array if a post can have multiple profiles
  comments: Comments[]; // An array of Comment objects
}
