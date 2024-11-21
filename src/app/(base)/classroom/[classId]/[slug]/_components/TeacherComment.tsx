'use client'

import { useState } from 'react'
import { Card, CardBody, CardHeader,  } from '@nextui-org/react'
import { Avatar } from '@nextui-org/react'
import { Badge } from '@nextui-org/react'
import { StarIcon } from 'lucide-react'

interface TeacherCommentProps {
  teacherName?: string
  teacherAvatar?: string
  comment?: string
  rating?: number
  submissionDate?: string
}

export default function TeacherComment({
  teacherName = "Ms. Johnson",
  teacherAvatar = "/placeholder.svg?height=40&width=40",
  comment = "Great job on your project! Your implementation of the algorithm was very efficient. Keep up the good work!",
  rating = 4,
  submissionDate = "2023-06-15"
}: TeacherCommentProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="w-full max-w-2xl mx-auto mt-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-2xl font-bold">Teacher's Feedback</h3>
        <Badge variant='shadow'>{submissionDate}</Badge>
      </CardHeader>
      <CardBody>
        <div className="flex items-start space-x-4">
            <Avatar src={teacherAvatar} alt={teacherName} />
          
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{teacherName}</p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill={i < rating ? 'currentColor' : 'none'}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className={`text-sm text-gray-500 ${isExpanded ? '' : 'line-clamp-3'}`}>
            {comment}
          </p>
          {comment.length > 150 && (
            <button
              className="text-sm text-blue-500 mt-2 hover:underline focus:outline-none"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      </CardBody>
    </Card>
  )
}