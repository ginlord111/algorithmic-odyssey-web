"use client"
import ForumContainer from '@/components/forum/ForumContainer';
import { UserProfilePostsProps } from '@/types/types';
import React, { Fragment } from 'react'

  const UserProfilePosts = ({ forums, userLikes }: UserProfilePostsProps) => {
    return (
      <Fragment>
        {forums.map((forum) => (
          <Fragment key={forum.id}>
            <ForumContainer {...forum} className="lg:mx-[200px]" userLikes={userLikes} />
          </Fragment>
        ))}
      </Fragment>
    );
  };

export default UserProfilePosts