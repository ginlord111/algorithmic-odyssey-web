'use client'

import { useEffect, useMemo, useState } from 'react'
import { Card, CardBody, CardHeader,  } from '@nextui-org/react'
import { Avatar } from '@nextui-org/react'
import { Badge } from '@/components/ui/badge'
import { fetchTeacherFeedback } from '@/actions/actions'
import { TeacherFeedBack } from '@prisma/client'
import {formatDateToYYYYMMDD} from '@/utils/formatData'
interface TeacherCommentProps {
  teacherName?: string
  teacherAvatar?: string
  comment?: string
  rating?: number
  grade?:number;
  studActId:string
}

export default function TeacherComment({
  teacherName = "Ms. Johnson",
  teacherAvatar = "/placeholder.svg?height=40&width=40",
  comment = "Great job on your project! Your implementation of the algorithm was very efficient. Keep up the good work!",
  rating = 4,
  grade = 90,
  studActId,
}: TeacherCommentProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [teacherData, setTeacherData] = useState<TeacherFeedBack | null>(null)  
    useEffect(() => {
      const fetchTeacherData = async () => {
        const  data = await fetchTeacherFeedback(studActId)
        setTeacherData(data as TeacherFeedBack)
      }
      fetchTeacherData()
    },[studActId])
    // const submissionDate = useMemo(()=> {
    //   return formatDateToYYYYMMDD(teacherData?.createdAt as Date)
    // },[teacherData?.createdAt])

    console.log(teacherData, "TEACHER DATAAA")
  return (
    <Card className="w-full max-w-2xl mx-auto mt-6 pb-8 px-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h2 className="text-xl font-bold">Teacher's Feedback</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">ewqewqewq</Badge>
          <Badge variant="outline">Grade: {teacherData?.studentScore}</Badge>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex items-start space-x-4">
            <Avatar src={teacherData?.teacherImage} alt={teacherData?.teacherName} />
          <div className="flex-1">
            <p className="font-medium">{teacherData?.teacherName}</p>
            <div className="mt-2">
              <p className={`text-sm text-gray-500 ${isExpanded ? '' : 'line-clamp-3'}`}>
                {teacherData?.feedback}
              </p>
              {comment.length > 150 && (
                <button
                  className="text-sm text-primary mt-2 hover:underline focus:outline-none"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )

}