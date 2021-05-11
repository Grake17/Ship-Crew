// ========================================
// DB Script
// ========================================

// Import Env Variables
import { env_var } from "../env";
// Import Sequelize
import { Sequelize } from "sequelize";
// Import Crew_Ship Model
import crew_ship from "./models/CrewShip/crew_ship_model";
// import Table Interface
import Table from "./table_interface";
// Import Users Model
import users_model from "./models/Users/users_model";
// Import Crews Model
import crews_model from "./models/Crews/crews_model";

// Export Function DB
export default async function load_db(): Promise<
  | {
      tables: Table;
      sequelize: Sequelize;
    }
  | undefined
> {
  // Return Promise for check error
  return new Promise((resolve, rejects) => {
    // Env Variable
    const env = env_var();
    // Check value If Undefind
    if (!env.database || !env.user_db)
      return rejects("Some env var are undefind");
    // Sequelize
    const sequelize = new Sequelize(
      env.database,
      env.user_db,
      env.password_db,
      {
        host: env.host,
        dialect: "postgres",
        logging: false,
        define: {
          timestamps: false,
        },
      }
    );
    // Authtentication
    sequelize
      .authenticate()
      .then(() => {
        console.log("Connect to DB");
      })
      .catch((err) => {
        return rejects("Can't connect to DB");
      });
    // Define Model
    const crew_ship_table = sequelize.define(crew_ship.name, crew_ship.model);
    const users_table = sequelize.define(users_model.name, users_model.model);
    const crews_table = sequelize.define(crews_model.name, crews_model.model);
    // Define Tables
    const tables: Table = {
      crew_ship_table: crew_ship_table,
      users_table: users_table,
      crews_table: crews_table,
    };
    // Return
    resolve({ tables, sequelize });
  });
}
