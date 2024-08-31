import { Activity } from '@prisma/client'
import React from 'react'
import TaskContainer from './TaskContainer'

const GradedTask = ({gradedTasks}:{gradedTasks:Activity[]}) => {
  return (
    <TaskContainer tasks={gradedTasks}/>
  )
}

export default GradedTask