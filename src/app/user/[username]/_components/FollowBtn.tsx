"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserPlus, UserX } from "lucide-react";
import { signIn } from "next-auth/react";
const FollowBtn = ({
  followerId,
  followingId,
}: {
  followerId: string | undefined;
  followingId: string;
}) => {
  const queryClient = useQueryClient();
  const fetchUserFollowings = async () => {
    const response = await fetch("/api/follow");
    if (response.ok && response.status == 200) {
      const data = await response.json();
      const { followings } = data;
      return followings.some((kekw: any) => kekw.followingId === followingId);
    }

    return false;
  };
  console.log(followerId, followingId, "FOLLOWERS");
  const { data: isFollowing } = useQuery({
    queryKey: ["get-user-followings"],
    queryFn: fetchUserFollowings,
  });
  const handleFollowUnfollowUser = async () => {
    // IF THERE IS NO USER SIGN IN return sign in
    if (!followerId) {
      return signIn();
    }
    const response = await fetch("/api/follow", {
      method: "POST",
      body: JSON.stringify({ followerId, followingId, isFollowing }),
    });
    if (response.ok) {
      queryClient.invalidateQueries({ queryKey: ["get-user-followings"] });
    }
  };
  console.log(isFollowing, "is followiungg");
  return (
    <div className="mt-5">
      <Button
        className="bg-transparent font-semibold tracking-wide text-md flex items-center justify-center"
        variant="bordered"
        onClick={handleFollowUnfollowUser}
      >
        {isFollowing ? "Unfollow" : "Follow"}
        {isFollowing ? (
          <UserX className="w-5 h-5" />
        ) : (
          <UserPlus className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
};

export default FollowBtn;
