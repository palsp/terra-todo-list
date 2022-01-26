use cosmwasm_std::Uint128;
use cw_storage_plus::{Item, Map};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

pub const TASKS: Map<&str, Task> = Map::new("task");
pub const CONFIG: Item<Config> = Item::new("config");

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct Config {
  pub task_count: Uint128,
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct Task {
  pub id: Uint128,
  pub content: String,
  pub is_completed: bool,
}
