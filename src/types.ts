import { Forum } from "@prisma/client";



export interface ForumData {
    data:Forum;
    metaData: MetaData;
}

export interface Datum {
    id:             string;
    userId:         string;
    authorUsername: string;
    forumImage:     string;
    title:          string;
    caption:        string;
    createdAt:      Date;
}

export interface MetaData {
    lastCursor:  string;
    hasNextPage: boolean;
}
