import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { reactionAdded } from "./postsSlice";
import React from 'react'

type Props = {
    post: {
        id: string; 
        title: string; 
        body: string;
        userId: string | number;
        date: string;
        reactions: {
            thumbsUp: number;
            wow: number;
            heart: number;
            rocket: number;
            coffee: number;
        }
    }
}

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

// Funzione per tipizzare le keys
function typedKeys<T extends Object>(obj: T): Array<keyof T> {
    return Object.keys(obj) as Array<keyof typeof obj>;
}

const ReactionButtons = ({post}: Props) => {

    const dispatch = useDispatch<AppDispatch>();

    // Object.entries(reactionEmoji) permette di mappare su tutto nell'oggetto
    const reactionButtons = typedKeys(reactionEmoji).map((name) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton mx-1 px-1"
                onClick={() =>
                    dispatch(reactionAdded({ postId: post.id, reaction: name}))
                }
            >
                {reactionEmoji[name]} {post.reactions[name]}
            </button>
        )
    })

    return (
        <div>
            {reactionButtons}
        </div>
    );
}

export default ReactionButtons