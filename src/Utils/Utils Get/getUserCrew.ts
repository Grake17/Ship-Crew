// ========================================
// Get Users Crew
// ========================================

// import Tables Interface
import tables from "../../db/table_interface";

// Export Function
export default async function getUserCrew(id: string, table: tables) {
  // Return Crews
  return table.users_table.findOne({ where: { userId: id } });
}
