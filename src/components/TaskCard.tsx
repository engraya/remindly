"use client"

import React from 'react'
import { Checkbox } from './ui/checkbox'
import { cn } from '@/lib/utils'
import { Task } from './CollectionCard'
import { setTaskToDone } from '@/db/actions'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { format } from 'date-fns/format'

function getExpirationColor(expiresAt: Date) {
    const days = Math.floor((expiresAt?.getTime() - Date.now()) / 1000 / 60 / 60 / 24);

    if (days < 0) return "text-red-500";
    if (days <= 3 * 24) return "text-yellow-500";

    if (days <= 7 * 24) return "text-yellow-500";

    if (days < 7) return "text-yellow-500";

    return "text-green-500";
 
}


function TaskCard({ task } : { task : Task} ) {

    const router = useRouter();
    const [isLoading, startTransition] = useTransition();



  return (
    <div className='flex items-start gap-2 p-4 border rounded-md'>
      <Checkbox 
      id={task?.id?.toString()} 
      className='w-5 h-5 text-blue-500 border border-blue-400' checked={task.done} 
      disabled={task.done || isLoading}
      onClick={() => {
        startTransition(async () => {
          await setTaskToDone(task.id);
          router.push("/dashboard");
        })
      }}
      />
      <label htmlFor={task?.id?.toString()} className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoratio")}>
        {task.content}
        {task.expireAt && (<p 
        className={cn("text-xs text-neutral-500", getExpirationColor(task.expireAt))}>
            Expires at {format(task.expireAt, "dd/MM/yy")}</p>)
        }
      </label>
    </div>
  )
}

export default TaskCard
