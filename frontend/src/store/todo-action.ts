import { task } from "@iboss/terrain";
import { ThunkAction, AnyAction } from "@reduxjs/toolkit";
import { UseQueryResult } from "hooks/useQuery";
import { RootState } from "store";
import { todoActions } from "store/todo-slice";
import { Task, TaskParams } from "types/Task";

export const fetchTodo =
  (
    contract: string,
    hooks: UseQueryResult
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    const tasks = await fetchTodoAPI(contract, hooks);
    dispatch(todoActions.replaceAllTodos(tasks));
  };

export const updateTodo =
  (
    contract: string,
    id: string,
    hooks: UseQueryResult
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    const task = await updateTodoAPI(contract, id, hooks);
    dispatch(
      todoActions.updateTodoById({
        task,
        id,
      })
    );
  };

export const fetchTodoAPI = async (
  contract: string,
  { query }: UseQueryResult
) => {
  const { task_count } = await query<{ task_count: string }>(contract, {
    config: {},
  });
  const promises = [];
  for (let i = 1; i < +task_count; i++) {
    promises.push(
      query<TaskParams>(contract, {
        task: { id: i.toString() },
      }).then((res) => {
        return new Task(res);
      })
    );
  }

  return Promise.all(promises);
};

export const updateTodoAPI = async (
  contract: string,
  id: string,
  { query }: UseQueryResult
) => {
  const resp = await query<TaskParams>(contract, {
    task: { id: id.toString() },
  });

  return new Task(resp);
};
