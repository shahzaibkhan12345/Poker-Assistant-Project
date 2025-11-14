// renderer.js
const position = document.getElementById('position');
const hand = document.getElementById('hand');
const actionType = document.getElementById('actionType');
const getSuggestionBtn = document.getElementById('getSuggestionBtn');
const clearBtn = document.getElementById('clearBtn');
const actionText = document.getElementById('actionText');
const suggestionOutput = document.getElementById('suggestionOutput');
const handHistoryDiv = document.getElementById('handHistory');
const raiserPositionGroup = document.getElementById('raiserPositionGroup');
const ipOopGroup = document.getElementById('ipOopGroup');
const numRaisesGroup = document.getElementById('numRaisesGroup');
const raiserPosition = document.getElementById('raiserPosition');
const ipOop = document.getElementById('ipOop');
const numRaises = document.getElementById('numRaises');

const helpBtn = document.getElementById('helpBtn');
const helpModal = document.getElementById('helpModal');
const closeBtn = document.querySelector('.close');

helpBtn.addEventListener('click', () => {
    helpModal.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    helpModal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === helpModal) {
        helpModal.classList.add('hidden');
    }
});

let debounceTimer;

hand.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(getSuggestion, 300);
});

actionType.addEventListener('change', getSuggestion);
position.addEventListener('change', getSuggestion);
raiserPosition.addEventListener('change', getSuggestion);
ipOop.addEventListener('change', getSuggestion);
numRaises.addEventListener('change', getSuggestion);

hand.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        getSuggestion();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        clearForm();
    }
});

getSuggestionBtn.addEventListener('click', getSuggestion);
clearBtn.addEventListener('click', clearForm);

actionType.addEventListener('change', () => {
    if (actionType.value === 'OPEN') {
        raiserPositionGroup.style.display = 'none';
        ipOopGroup.style.display = 'none';
        numRaisesGroup.style.display = 'block';
        numRaises.value = '0'; // Reset numRaises to 0 when switching to OPEN action
    } else {
        raiserPositionGroup.style.display = 'block';
        ipOopGroup.style.display = 'block';
        numRaisesGroup.style.display = 'none';
    }
});

function normalizeHand(input) {
    const cleaned = input.toUpperCase().trim();
    
    const match = cleaned.match(/^([AKQJT2-9])([AKQJT2-9])([SO])?$/);
    if (!match) return null;
    
    const card1 = match[1];
    const card2 = match[2];
    const suffix = (match[3] || '').toLowerCase(); // Convert suffix to lowercase for proper format
    
    // If same card, it's a pair (no suffix needed)
    if (card1 === card2) {
        return card1 + card2;
    }
    
    // If suffix is provided (s or o), use it; otherwise default to 'o'
    return card1 + card2 + suffix;
}

async function getSuggestion() {
    const handInput = hand.value.trim();
    
    if (!handInput) {
        suggestionOutput.className = 'suggestion-box error';
        actionText.textContent = 'Please enter a hand (e.g., AKs, QQ, JTo)';
        return;
    }
    
    const normalizedHand = normalizeHand(handInput);
    if (!normalizedHand) {
        suggestionOutput.className = 'suggestion-box error';
        actionText.textContent = 'Invalid hand format. Use: AKs, QQ, JTo, etc.';
        return;
    }
    
    const gameState = {
        actionType: actionType.value,
        raiserPosition: actionType.value !== 'OPEN' ? raiserPosition.value : null,
        ipOop: actionType.value !== 'OPEN' ? ipOop.value : null,
        numRaises: actionType.value === 'OPEN' ? parseInt(numRaises.value) : null,
    };
    
    try {
        suggestionOutput.className = 'suggestion-box loading';
        actionText.textContent = 'Getting GTO suggestion...';
        
        const result = await window.electronAPI.getGtoSuggestion(
            position.value,
            normalizedHand,
            gameState
        );
        
        displaySuggestion(result, normalizedHand, gameState);
        addToHistory(normalizedHand, gameState, result);
    } catch (error) {
        console.error('Error getting suggestion:', error);
        suggestionOutput.className = 'suggestion-box error';
        actionText.textContent = 'Error: Unable to get suggestion. Check hand input.';
    }
}

function displaySuggestion(result, handValue, gameState) {
    if (result.error) {
        suggestionOutput.className = 'suggestion-box error';
        actionText.textContent = result.error;
        return;
    }
    
    let actionClass = 'success';
    if (result.action === 'FOLD') {
        actionClass = 'failure';
    } else if (result.action === 'CALL') {
        actionClass = 'warning';
    }
    
    suggestionOutput.className = `suggestion-box ${actionClass}`;
    
    let actionDisplay = result.action;
    if (result.amount && result.amount !== 'N/A') {
        actionDisplay += ` ${result.amount}`;
    }
    
    actionText.textContent = actionDisplay;
}

function addToHistory(handValue, gameState, result) {
    const isPair = handValue[0] === handValue[1];
    const hasValidSuffix = handValue.match(/[so]$/i);
    
    // Only add if it's a pair OR has a valid suffix (s/o)
    if (!isPair && !hasValidSuffix) {
        return; // Don't add incomplete hands like "A8" or "JT" - wait for "A8o" or "JTs"
    }
    
    const lastEntry = document.getElementById('handHistory').querySelector('.history-entry');
    if (lastEntry) {
        const lastHand = lastEntry.querySelector('.history-hand').textContent;
        if (lastHand === handValue) {
            return; // Don't add if same hand as last entry
        }
    }
    
    const situation = `${position.value} - ${gameState.actionType}`;
    const action = result.error ? 'Error' : (result.action + (result.amount && result.amount !== 'N/A' ? ` ${result.amount}` : ''));
    
    let historyHTML = document.getElementById('handHistory').innerHTML;
    
    if (historyHTML.includes('no-history')) {
        historyHTML = '';
    }
    
    const entry = `
        <div class="history-entry">
            <div class="history-hand">${handValue}</div>
            <div class="history-situation">${situation}</div>
            <div class="history-action ${action.toLowerCase()}">${action}</div>
        </div>
    `;
    
    document.getElementById('handHistory').innerHTML = entry + historyHTML;
    
    const entries = document.getElementById('handHistory').querySelectorAll('.history-entry');
    if (entries.length > 20) {
        entries[entries.length - 1].remove();
    }
}

function clearForm() {
    position.value = 'BTN';
    hand.value = '';
    actionType.value = 'OPEN';
    numRaises.value = '0';
    actionText.textContent = 'Enter hand details and click the button.';
    suggestionOutput.className = 'suggestion-box';
    raiserPositionGroup.style.display = 'none';
    ipOopGroup.style.display = 'none';
    numRaisesGroup.style.display = 'block';
    hand.focus();
}
