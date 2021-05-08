// ========================================
// Get Parent Ship
// ========================================

// Import Tables Interface
import tables from "../../db/table_interface";

// Export Function
export default async function getcrewShip(id: string, table: tables) {
  // Return Data
  return table.crew_ship_table.findOne({ where: { parentshipID: id } });
}
