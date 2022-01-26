import { useEffect, useState } from "react";
import { useQuery } from "hooks/useQuery";
import { Task, TaskParams } from "types/Task";
import { useWallet } from "@terra-money/wallet-provider";
import { get } from "settings";

import TaskCard from "components/TaskCard";
import { useAppSelector } from "hooks";

const TodoList = () => {
  const tasks = useAppSelector((state) => state.todo.todos);

  return (
    <>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </>
  );
};

export default TodoList;
