#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{
  to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult, Uint128,
};

use crate::{
  handler::{create_task, toggle_complete_task},
  msg::{ExecuteMsg, InstantiateMsg, QueryMsg},
  querier::{config, task_by_id},
  state::{Config, CONFIG},
};

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
  deps: DepsMut,
  _env: Env,
  _info: MessageInfo,
  _msg: InstantiateMsg,
) -> StdResult<Response> {
  let config = Config {
    task_count: Uint128::from(0 as u64),
  };

  CONFIG.save(deps.storage, &config)?;

  Ok(Response::new().add_attributes(vec![
    ("method", "instantiate"),
    ("count", &config.task_count.to_string()),
  ]))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
  deps: DepsMut,
  _env: Env,
  _info: MessageInfo,
  msg: ExecuteMsg,
) -> StdResult<Response> {
  match msg {
    ExecuteMsg::CreateTask { content } => create_task(deps, content),
    ExecuteMsg::ToggleCompleteTask { id } => toggle_complete_task(deps, id),
  }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
  match msg {
    QueryMsg::Task { id } => to_binary(&task_by_id(deps, id)?),
    QueryMsg::Config {} => to_binary(&config(deps)?),
  }
}
