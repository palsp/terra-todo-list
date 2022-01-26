use crate::state::{Config, Task, CONFIG, TASKS};
use cosmwasm_std::{DepsMut, Response, StdError, StdResult, Uint128};

pub fn create_task(deps: DepsMut, content: String) -> StdResult<Response> {
  let config: Config = CONFIG.load(deps.storage)?;

  let task_id = config.task_count.checked_add(Uint128::from(1 as u32))?;

  // Save new task
  TASKS.save(
    deps.storage,
    &task_id.to_string(),
    &Task {
      id: task_id,
      content,
      is_completed: false,
    },
  )?;

  // Update task's count
  CONFIG.update(deps.storage, |mut config| -> StdResult<_> {
    config.task_count = task_id;
    Ok(config)
  })?;

  Ok(Response::new().add_attributes(vec![
    ("action", "create_task"),
    ("task_id", &task_id.to_string()),
  ]))
}

pub fn toggle_complete_task(deps: DepsMut, task_id: Uint128) -> StdResult<Response> {
  let task = TASKS.may_load(deps.storage, &task_id.to_string())?;
  if task.is_none() {
    return Err(StdError::generic_err(format!(
      "task {} not found",
      task_id.to_string()
    )));
  }

  let mut task: Task = task.unwrap();

  task.is_completed = !task.is_completed;

  TASKS.save(deps.storage, &task_id.to_string(), &task)?;

  Ok(Response::new().add_attributes(vec![
    ("action", "toggle_complete_task"),
    ("task_id", &task_id.to_string()),
  ]))
}
