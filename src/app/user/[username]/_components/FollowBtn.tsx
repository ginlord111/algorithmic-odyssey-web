"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { UserPlus, UserX } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const FollowBtn = ({
  followingId,
  className,
}: {
  followingId: string;
  className?: string;
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [revalidateFollow, setRevalidateFollow] = useState<boolean>(false);
  const followerId = session?.user.id;
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
      setRevalidateFollow(true)
      router.refresh();
    }
  };
  // FOR RENDERING IF THE USER IS ALREADY FOLLOWED TO THE OTHER USER
  useEffect(() => {
    const isUserAlreadyFollowedFn = async () => {
      if (followingId === session?.user.id || !session?.user.id ) {
        return;
      }
      const response = await fetch("/api/follow");
      if (response.ok && response.status == 200) {
        const data = await response.json();
        const { followings } = data;
        const isFollowed = followings.some(
          (f: any) => f.followingId === followingId
        );
        setIsFollowing(isFollowed);
      } else if (response.status === 400) {
        setIsFollowing(false);
      }
      setRevalidateFollow(false)
    };
    isUserAlreadyFollowedFn();
  }, [revalidateFollow]);
  /// will return nothin if the current user is === the user targeting
  if (followingId === session?.user.id) {
    return;
  }
  return (
    <div className={` ${className}`}>
      <Button
        className="bg-[#003459] text-white font-semibold tracking-wide text-md flex items-center justify-center"
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
