use crate::msg::{ConfigResponse, TaskResponse};
use crate::state::{Config, CONFIG, TASKS};
use cosmwasm_std::{Deps, StdResult, Uint128};

pub fn config(deps: Deps) -> StdResult<ConfigResponse> {
  let config: Config = CONFIG.load(deps.storage)?;
  Ok(ConfigResponse {
    task_count: config.task_count,
  })
}

pub fn task_by_id(deps: Deps, task_id: Uint128) -> StdResult<TaskResponse> {
  let task = TASKS.load(deps.storage, &task_id.to_string())?;

  Ok(TaskResponse {
    task_id: task.id,
    content: task.content,
    is_completed: task.is_completed,
  })
}
