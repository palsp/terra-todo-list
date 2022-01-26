use cosmwasm_std::Uint128;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, JsonSchema)]
pub struct InstantiateMsg {}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
  CreateTask { content: String },

  ToggleCompleteTask { id: Uint128 },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
  Task { id: Uint128 },
  Config {},
}

#[derive(Serialize, Deserialize, JsonSchema, PartialEq, Debug)]
pub struct ConfigResponse {
  pub task_count: Uint128,
}

#[derive(Serialize, Deserialize, JsonSchema, PartialEq, Debug)]
pub struct TaskResponse {
  pub task_id: Uint128,
  pub content: String,
  pub is_completed: bool,
}
