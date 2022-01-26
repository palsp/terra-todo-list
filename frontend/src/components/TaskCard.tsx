import { Card } from "@mui/material";
import { useWallet } from "@terra-money/wallet-provider";

import { Task } from "types/Task";
import { get } from "settings";
import { useExecuteContract } from "hooks/useExecuteContract";
import { useAppDispatch, useQuery } from "hooks";
import { updateTodo } from "store/todo-action";

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  const { network } = useWallet();
  const todoAddress = get(network.name, "todo");

  const { execute } = useExecuteContract(todoAddress);
  const dispatch = useAppDispatch();
  const queryHooks = useQuery(network);

  const handleClick = async () => {
    try {
      await execute({ toggle_complete_task: { id: task.id } });
      dispatch(updateTodo(todoAddress, task.id, queryHooks));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        margin: "1rem",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: `3px solid ${task.isCompleted ? "green" : "red"}`,
        borderRadius: "1rem",
      }}
    >
      <div>
        <h1>#{task.id}</h1>
        <p>{task.content}</p>
      </div>
      <div>
        <button onClick={handleClick}>Completed</button>
      </div>
    </Card>
  );
};

export default TaskCard;
