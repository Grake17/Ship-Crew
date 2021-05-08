// ========================================
// Get Crew Utils
// ========================================

// Import Table Interface
import tables from "../../db/table_interface";

// Export Function
export default async function getCrew(id: string, table: tables) {
  // Return Crew
  return table.crews_table.findOne({ where: { crewId: id } });
}
