import { Task } from "types/Task";

import { get } from "settings";
import { Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useExecuteContract } from "hooks/useExecuteContract";
import { useWallet } from "@terra-money/wallet-provider";

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  const {
    network: { name },
  } = useWallet();
  const todoAddress = get(name, "todo");

  const { execute } = useExecuteContract(todoAddress);

  const handleClick = async () => {
    try {
      const resp = await execute({ toggle_complete_task: { id: task.id } });
      console.log(resp);
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
