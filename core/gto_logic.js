// core/gto_logic.js

// --- 1. CORE GTO DATA STRUCTURE (Architecturally Robust for Expansion) ---
// This nested structure is designed to be easily expanded by plugging in new GTO data.
// Structure: [Spot] -> [Position] -> [Hand] -> { Action, Amount }
const GTO_RANGES = {
    // --- SCENARIO 1: First to act (Open Raise) ---
    'PREFLOP_OPEN': {
        'UTG': { 
            'AA': { action: 'Raise', amount: '3BB' }, 'KK': { action: 'Raise', amount: '3BB' }, 'QQ': { action: 'Raise', amount: '3BB' }, 'AKs': { action: 'Raise', amount: '3BB' },
            // Add other hands to UTG open range...
        },
        'HJ': { 
            'TT': { action: 'Raise', amount: '3BB' }, 'AQs': { action: 'Raise', amount: '3BB' }, 'KJs': { action: 'Raise', amount: '3BB' },
            // Add other hands to HJ open range...
        },
        'BTN': { 
            'A2s': { action: 'Raise', amount: '3BB' }, 'QTo': { action: 'Raise', amount: '3BB' }, 'T7s': { action: 'Raise', amount: '3BB' },
            // Add other hands to BTN open range...
        },
        'SB': { 
            '87s': { action: 'Raise', amount: '3BB' }, 'J9o': { action: 'Raise', amount: '3BB' },
            // Add other hands to SB open range...
        },
        // 'CO' and 'BB' are implicitly handled by the lookup function's checks below.
    },
    
    // --- SCENARIO 2: Facing an Open Raise (BTN vs. UTG Example) ---
    // In a full GTO solution, this would be structured like: 
    // 'FACE_UTG_OPEN': { 'BTN': { ... } } or 'FACE_HJ_OPEN': { 'BTN': { ... } }
    // For this MVP, we simplify the spot name to just 'FACE_OPEN' and code for BTN vs UTG.
    'FACE_OPEN': {
        'BTN': { // Assuming BTN faces an open from an early position (UTG/HJ)
            // Action: Raise (3-Bet)
            'AA': { action: 'Raise', amount: '9BB' },    // 3-Bet
            'KK': { action: 'Raise', amount: '9BB' },
            'AKs': { action: 'Raise', amount: '9BB' },
            
            // Action: Call (Flat)
            'AQs': { action: 'Call', amount: '3BB' },    
            'TT': { action: 'Call', amount: '3BB' },     
            '98s': { action: 'Call', amount: '3BB' },
            
            // Explicit Fold is not needed as the logic handles the absence of a hand
        }
    }
    // Add more spots here: 'FACE_3BET', 'FACE_4BET', etc.
};


/**
 * Provides a GTO-based suggestion for a given hand, position, and spot.
 * This function is now simplified to use the unified GTO_RANGES object.
 * 
 * @param {string} position - Player's position (e.g., 'UTG').
 * @param {string} hand - The two-card starting hand (e.g., 'QQ', 'AKs').
 * @param {string} spot - The current game scenario (e.g., 'Preflop_Open', 'Face_Open').
 * @returns {object} - The suggested action and amount.
 */
function getGtoSuggestion(position, hand, spot) {
    // Standardize input for reliable key lookups
    const upperHand = hand.toUpperCase().replace(' ', '').replace('O', 'o').replace('S', 's');
    const upperPosition = position.toUpperCase();
    const upperSpot = spot.toUpperCase();
    
    // 1. Check if the SPOT (Scenario) exists in the data structure
    const scenarioRanges = GTO_RANGES[upperSpot];
    if (!scenarioRanges) {
        return { 
            action: 'Fold', 
            amount: 'N/A', 
            message: `FATAL: Scenario '${upperSpot}' not yet coded.` 
        };
    }

    // 2. Check if the POSITION has ranges defined for this SPOT
    const positionRanges = scenarioRanges[upperPosition];
    if (!positionRanges) {
        return { 
            action: 'Fold', 
            amount: 'N/A', 
            message: `Position '${upperPosition}' is not coded for scenario '${upperSpot}'.` 
        };
    }

    // 3. Look up the specific HAND in the defined range
    const suggestion = positionRanges[upperHand];
    
    if (suggestion) {
        return suggestion;
    }

    // 4. Default Fallback: If Hand is not found in the defined range
    // A hand not in a pre-flop action range is almost always a fold.
    const spotType = upperSpot.includes('OPEN') ? 'Open Raise' : 'Action';
    
    return { 
        action: 'Fold', 
        amount: 'N/A', 
        message: `Hand '${upperHand}' is not in the optimal ${upperPosition} ${spotType} range.` 
    };
}

module.exports = { getGtoSuggestion };