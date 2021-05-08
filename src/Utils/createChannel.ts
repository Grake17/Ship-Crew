// ========================================
// Channel Create
// ========================================

// Import Discord Type
import { VoiceState } from "discord.js";
// Import Crew Ship Interface
import crew_ship from "../db/models/CrewShip/crew_ship_attributes";

// Exports Functions
export default async function createChannel(newMember: VoiceState, crew_ship: crew_ship): Promise<unknown> {
    // Return Promise
    return new Promise((resolve, rejects) => {
        // Create Channel
        newMember.guild.channels.create("Test 1", {
            type: "voice",
            parent: crew_ship.parentshipID
        }).then(channel => {
            // Set Users in new Channel
            resolve(channel);
        }).catch((err) => {
            // Reject Promise
            rejects(err);
        });    
    });
}