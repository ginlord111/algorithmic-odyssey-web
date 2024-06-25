import timeDiff from "@/utils/timeCalc";
import { useMemo } from "react";

export const timeDiffFunc = (createdAt:Date):string | undefined => {
    return useMemo(() => {
        return timeDiff(createdAt) 
      }, [createdAt]);
}