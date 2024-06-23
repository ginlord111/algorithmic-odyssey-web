"use  client";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import React from "react";

const FollowingsList = ({
  followerImages,
  followingImages,
}: {
  followerImages: { userFollowerImage: string }[];
  followingImages: { userFollowingImage: string }[];
}) => {
  return (
    <div className="flex mt-5 justify-between">
      <div className="font-semibold ">
        <span>Post:</span>
        <span className="ml-1">2</span>
      </div>
      <div className="flex items-start gap-2 font-semibold ">
        <span className="text-lg">Followers: </span>
        <AvatarGroup max={3}
        isBordered
        >
          {followerImages.map((images) => (
            <Avatar
              key={images.userFollowerImage}
              src={images.userFollowerImage as string}
              size="sm"
            />
          ))}
        </AvatarGroup>
      </div>
      <div className="flex items-start gap-2 font-semibold ">
        <span className="text-lg">Followings: </span>
        <AvatarGroup max={3}>
          {followingImages.map((images) => (
            <Avatar
              key={images.userFollowingImage}
              src={images.userFollowingImage as string}
              size="sm"
            />
          ))}
        </AvatarGroup>
      </div>
    </div>
  );
};

export default FollowingsList;
