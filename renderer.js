// renderer.js
const getSuggestionBtn = document.getElementById('getSuggestionBtn');
const positionInput = document.getElementById('position');
const handInput = document.getElementById('hand');
const actionTypeInput = document.getElementById('actionType');
const raiserPositionInput = document.getElementById('raiserPosition');
const ipOopInput = document.getElementById('ipOop');
const numRaisesInput = document.getElementById('numRaises');
const suggestionOutput = document.getElementById('suggestionOutput');
const actionText = document.getElementById('actionText');
const handHistoryContainer = document.getElementById('handHistory');

// UI elements that need to be shown/hidden based on action type
const raiserPositionGroup = document.getElementById('raiserPositionGroup');
const ipOopGroup = document.getElementById('ipOopGroup');
const numRaisesGroup = document.getElementById('numRaisesGroup');

// Update UI based on action type
actionTypeInput.addEventListener('change', function() {
    const actionType = this.value;
    
    // Reset visibility
    raiserPositionGroup.style.display = 'none';
    ipOopGroup.style.display = 'none';
    
    // Show relevant fields based on action type
    if (actionType === 'FACE_RAISE') {
        raiserPositionGroup.style.display = 'block';
        numRaisesInput.value = '1';
    } else if (actionType === 'FACE_3BET') {
        ipOopGroup.style.display = 'block';
        numRaisesInput.value = '2';
    } else if (actionType === 'FACE_4BET') {
        ipOopGroup.style.display = 'block';
        numRaisesInput.value = '3';
    } else {
        numRaisesInput.value = '0';
    }
});

// Also update numRaises when it's changed manually
numRaisesInput.addEventListener('change', function() {
    const numRaises = parseInt(this.value);
    
    // Auto-update action type based on number of raises
    if (numRaises === 0) {
        actionTypeInput.value = 'OPEN';
        raiserPositionGroup.style.display = 'none';
        ipOopGroup.style.display = 'none';
    } else if (numRaises === 1) {
        actionTypeInput.value = 'FACE_RAISE';
        raiserPositionGroup.style.display = 'block';
        ipOopGroup.style.display = 'none';
    } else if (numRaises === 2) {
        actionTypeInput.value = 'FACE_3BET';
        raiserPositionGroup.style.display = 'none';
        ipOopGroup.style.display = 'block';
    } else if (numRaises === 3) {
        actionTypeInput.value = 'FACE_4BET';
        raiserPositionGroup.style.display = 'none';
        ipOopGroup.style.display = 'block';
    }
});

getSuggestionBtn.addEventListener('click', getSuggestion);

// Also get suggestion when Enter is pressed in the hand input
handInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getSuggestion();
    }
});

async function getSuggestion() {
    const position = positionInput.value;
    const hand = handInput.value.trim();
    const actionType = actionTypeInput.value;
    const raiserPosition = raiserPositionInput.value;
    const ipOop = ipOopInput.value;
    const numRaises = parseInt(numRaisesInput.value);

    if (!hand) {
        actionText.textContent = "Please enter a hand (e.g., AQs).";
        suggestionOutput.className = 'suggestion-box error';
        return;
    }

    // Build game state object
    const gameState = {
        actionType,
        raiserPosition,
        numRaises,
        ipOop
    };

    // Call API with enhanced parameters
    const response = await window.electronAPI.getGtoSuggestion(position, hand, gameState);

    if (response.success) {
        const data = response.data;
        let message;
        let style;
        
        switch (data.action.toUpperCase()) {
            case 'RAISE':
                message = `RAISE ${data.amount}`;
                style = 'success';
                break;
            case 'CALL':
                message = `CALL ${data.amount}`;
                style = 'warning';
                break;
            case 'FOLD':
            default:
                message = `FOLD. ${data.message || 'Outside optimal range.'}`;
                style = 'failure';
                break;
        }

        actionText.textContent = message;
        suggestionOutput.className = `suggestion-box ${style}`;
        
        // Update hand history using the history returned with the response
        if (response.history && response.history.length > 0) {
            updateHandHistoryDisplay(response.history);
        }
    } else {
        actionText.textContent = `Error: ${response.error}`;
        suggestionOutput.className = 'suggestion-box error';
    }
}

function updateHandHistoryDisplay(history) {
    // Clear "no history" message if it exists
    const noHistoryMsg = handHistoryContainer.querySelector('.no-history');
    if (noHistoryMsg) {
        handHistoryContainer.innerHTML = '';
    }
    
    // Get the latest hand (first in the array)
    const latestHand = history[history.length - 1];
    
    // Create a new history entry
    const historyEntry = document.createElement('div');
    historyEntry.className = 'history-entry';
    
    const actionTypeText = latestHand.gameState.actionType.replace('_', ' ');
    const actionText = latestHand.result.action === 'Fold' ? 'Fold' : `${latestHand.result.action} ${latestHand.result.amount}`;
    
    historyEntry.innerHTML = `
        <div class="history-hand">${latestHand.hand} from ${latestHand.position}</div>
        <div class="history-situation">${actionTypeText}</div>
        <div class="history-action ${latestHand.result.action.toLowerCase()}">${actionText}</div>
    `;
    
    // Add to top of history container
    handHistoryContainer.insertBefore(historyEntry, handHistoryContainer.firstChild);
    
    // Limit history to 10 entries in UI
    while (handHistoryContainer.children.length > 10) {
        handHistoryContainer.removeChild(handHistoryContainer.lastChild);
    }
}

// Initialize the UI state
document.addEventListener('DOMContentLoaded', function() {
    // Trigger the change event to set initial visibility
    actionTypeInput.dispatchEvent(new Event('change'));
});