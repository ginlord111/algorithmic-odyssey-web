import { Activity } from "@prisma/client";
import React from "react";
import TaskContainer from "./TaskContainer";

const PendingTask = ({ pendingTasks }: { pendingTasks: Activity[] }) => {
  return (
  <TaskContainer tasks={pendingTasks} isPending/>
  );
};

export default PendingTask;
