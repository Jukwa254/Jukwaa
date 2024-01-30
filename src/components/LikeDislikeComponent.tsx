
import { useState, useEffect } from 'react';

import supabase from '../config/superbaseClient';
import { ThumbsDownFilled, ThumbsDownRegular, ThumbsUpFilled, ThumbsUpRegular } from './Icons';


export const getUserReaction = async (postId: string, userId: string): Promise<string | null> => {
    console.log("userId:", userId, "postId:", postId);
    const { data, error } = await supabase
        .from('user_reactions')
        .select('reaction')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .single();

    return error ? null : data?.reaction;
};

export const updateReaction = async (postId: string, userId: string, reaction: string | null) => {
    const currentReaction = await getUserReaction(postId, userId);

    if (currentReaction) {
        if (currentReaction === reaction || reaction === null) {
            await supabase
                .from('user_reactions')
                .delete()
                .match({ post_id: postId, user_id: userId });
        } else {

            await supabase
                .from('user_reactions')
                .update({ reaction })
                .match({ post_id: postId, user_id: userId });
        }
    } else if (reaction !== null) {
        await supabase
            .from('user_reactions')
            .insert([{ post_id: postId, user_id: userId, reaction }]);
    }
    await updatePostLikesDislikes(postId);
};


export const countReactions = async (postId: string): Promise<{ likes: number; dislikes: number }> => {
    const { data, error } = await supabase
        .from('user_reactions')
        .select('reaction')
        .eq('post_id', postId);

    if (error || !data) return { likes: 0, dislikes: 0 };

    let likes = 0;
    let dislikes = 0;
    data.forEach((item) => {
        if (item.reaction === 'like') likes += 1;
        if (item.reaction === 'dislike') dislikes += 1;
    });

    return { likes, dislikes };
};

export const updatePostLikesDislikes = async (postId: string) => {
    const { data, error: countError } = await supabase
        .from('user_reactions')
        .select('reaction')
        .eq('post_id', postId);

    if (countError) {
        console.error('Error counting reactions:', countError);
        return;
    }

    const likes = data?.filter(item => item.reaction === 'like').length || 0;
    const dislikes = data?.filter(item => item.reaction === 'dislike').length || 0;

    // Update the post
    const { error: updateError } = await supabase
        .from('posts')
        .update({ likes, dislikes })
        .match({ id: postId });

    if (updateError) {
        console.error('Error updating post:', updateError);
    }
};

interface LikeDislikeButtonProps {
    postId: string;
    userId: string;
}

const LikeDislikeButton: React.FC<LikeDislikeButtonProps> = ({ postId, userId }) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [userReaction, setUserReaction] = useState<string | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            const counts = await countReactions(postId);
            setLikes(counts.likes);
            setDislikes(counts.dislikes);
            const reaction = await getUserReaction(postId, userId);
            setUserReaction(reaction);
        };

        fetchData();
    }, [postId, userId]);

    const handleReaction = async (reaction: string) => {
        await updateReaction(postId, userId, reaction);
        const counts = await countReactions(postId);
        setLikes(counts.likes);
        setDislikes(counts.dislikes);
        setUserReaction(reaction === userReaction ? null : reaction);
    };

    return (
        <div className="flex justify-between mb-1">
            <div className="flex gap-2 text-lg items-center">
                <div className="flex font-semibold">
                    <span
                        className="cursor-pointer]"
                        onClick={() => handleReaction('like')}
                    >
                        {userReaction === 'like' ? <ThumbsUpFilled /> : <ThumbsUpRegular />}
                    </span>
                    <p className="text-sm">{likes}</p>
                </div>
                <div className="flex items-center font-semibold">
                    <span
                        className="text-2xl cursor-pointer"
                        onClick={() => handleReaction('dislike')}
                    >
                        {userReaction === 'dislike' ? <ThumbsDownFilled /> : <ThumbsDownRegular />}
                    </span>
                    <p className="text-sm">{dislikes}</p>
                </div>
            </div>
            {/* Add other elements like comments icon here if needed */}

        </div>
    );
};

export default LikeDislikeButton;
