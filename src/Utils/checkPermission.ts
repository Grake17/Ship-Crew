// ========================================
// Persmission Utils
// ========================================

// Import Config
import { permission } from "../config.json";

// Export Function
export default function checkPermission(id: string): boolean {
    // Check Permission
    const test = JSON.stringify(permission);
    // Return Boolen
    return test.includes(id);
}