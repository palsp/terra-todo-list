import { MsgExecuteContract } from "@terra-money/terra.js";

export type ExecuteMsg =
  | {
      create_task: {
        content: string;
      };
    }
  | {
      toggle_complete_task: {
        id: string;
      };
    };

export interface TaskParams {
  content?: string;
  is_completed?: boolean;
  task_id?: string;
}

export const getExecuteMsg = (
  walletAddress: string,
  contractAddress: string,
  msg: object
) => new MsgExecuteContract(walletAddress, contractAddress, msg);

export class Task {
  public id: string;
  public content: string;
  public isCompleted: boolean;
  constructor({
    task_id = "0",
    content = "",
    is_completed = false,
  }: TaskParams) {
    this.id = task_id;
    this.content = content;
    this.isCompleted = is_completed;
  }

  setContent(_content: string) {
    this.content = _content;
  }
}
