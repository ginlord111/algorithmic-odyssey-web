import { Activity, StudentActivity } from '@prisma/client'
import React from 'react'
import TaskContainer from './TaskContainer'

const GradedTask = ({gradedTasks,studentActs}:{gradedTasks:Activity[],studentActs:StudentActivity[]}) => {
  return (
    <TaskContainer tasks={gradedTasks}
    studActs={studentActs}
    />
  )
}

export default GradedTask