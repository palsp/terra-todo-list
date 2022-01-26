import { useEffect, useState } from "react";
import { useQuery } from "hooks/useQuery";
import { Task, TaskParams } from "types/Task";
import { useWallet } from "@terra-money/wallet-provider";
import { DEFAULT_NETWORK, networks } from "settings";

const TodoList = () => {
  const { network } = useWallet();
  const { name } = network;
  const todoAddress = networks[name]?.todo || networks[DEFAULT_NETWORK].todo;
  const { query } = useQuery(network);
  const [taskCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTaskCount = async () => {
    const { task_count } = await query<{ task_count: string }>(todoAddress, {
      config: {},
    });

    setTaskCount(+task_count);
  };

  const getTasks = async (_taskCount: number) => {
    const promises = [];
    for (let i = 1; i <= _taskCount; i++) {
      promises.push(
        query<TaskParams>(todoAddress, {
          task: { id: i.toString() },
        }).then((res) => {
          return new Task(res);
        })
      );
    }

    const _tasks = await Promise.all(promises);
    setTasks(_tasks);
  };

  useEffect(() => {
    getTaskCount();
  }, []);

  useEffect(() => {
    getTasks(taskCount);
  }, [taskCount]);

  return (
    <div>
      {tasks.map((task) => (
        <p>{JSON.stringify(task)}</p>
      ))}
    </div>
  );
};

export default TodoList;
