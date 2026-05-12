import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState, type ReactNode } from 'react';
import z from 'zod';
import { MyButton } from '../MyButton';

const paramsSchema = z.object({
  taskId: z.coerce.number().int(),
});

type TaskType = { id: number, quote: string, author: string }

export const Route = createFileRoute('/task/$taskId')({
  component: RouteComponent,
  params: {
    parse: (raw) => {
      return paramsSchema.parse(raw)
    },
    stringify: ({ taskId }) => ({ taskId: taskId.toString() }),
  },
})

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  const { taskId } = Route.useParams();
  const { data: task } = useTask(taskId);
  if (!task) {
    return <div>Loading...</div>
  }
  return (
    <Vbox>
        <Task task={task}></Task>
        <Hbox>
          <MyButton>Prev</MyButton>
          <MyButton>Next</MyButton>
        </Hbox>
    </Vbox>
    )
}

function Vbox({ children }: { children: ReactNode }) {
  return (<div className="flex flex-col gap-4">
    {children}
  </div>)
}

function Hbox({ children }: { children: ReactNode }) {
  return (<div className="flex self-start px-4 py-2 rounded-xl gap-2 border border-gray-300">
    {children}
  </div>)
}

// eslint-disable-next-line react-refresh/only-export-components
function Task({ task } : { task: TaskType}) {
  return (<div className="flex flex-col gap-2 shadow-xl p-2">
    <div>{task?.quote}</div>
      <div className="text-gray-600 text-sm">{task?.author}</div>
    </div>)
}

function useTask(id: number) {
  return useQuery({
    queryKey: [ "task", id ],
    queryFn: async() => {
      const resp = await fetch("https://dummyjson.com/quotes/" + id)
      const json = await resp.json() 
      return json as TaskType
    }
  }); 
}