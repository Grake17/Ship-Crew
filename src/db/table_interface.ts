// ========================================
// Table Interface
// ========================================

// Import Sequelize
import { Model, ModelCtor } from "sequelize";
// Import Crew_Ship Attributes
import crew_ship from "./models/CrewShip/crew_ship_attributes";
// import Users Attribute
import user_attributes from "./models/Users/user_attributes";
// Import Crews Attributes
import crew_attributes from "./models/Crews/crews_attributes"

// Export Interface
export default interface tables {
  crew_ship_table: ModelCtor<Model<crew_ship>>;
  users_table: ModelCtor<Model<user_attributes>>;
  crews_table: ModelCtor<Model<crew_attributes>>;
}
