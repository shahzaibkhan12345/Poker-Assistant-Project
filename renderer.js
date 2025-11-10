// renderer.js
const getSuggestionBtn = document.getElementById('getSuggestionBtn');
const positionInput = document.getElementById('position');
const handInput = document.getElementById('hand');
const spotInput = document.getElementById('spot');
const suggestionOutput = document.getElementById('suggestionOutput');
const actionText = document.getElementById('actionText');

getSuggestionBtn.addEventListener('click', getSuggestion);

async function getSuggestion() {
    const position = positionInput.value;
    const hand = handInput.value.trim();
    const spot = spotInput.value;

    if (!hand) {
        actionText.textContent = "Please enter a hand (e.g., AQs).";
        suggestionOutput.className = 'suggestion-box error';
        return;
    }

    // Call the secure API exposed in preload.js
    const response = await window.electronAPI.getGtoSuggestion(position, hand, spot);

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
                message = `CALL (Flatted)`;
                style = 'warning';
                break;
            case 'FOLD':
            default:
                message = `FOLD. Reason: ${data.message || 'Outside optimal range.'}`;
                style = 'failure';
                break;
        }

        actionText.textContent = message;
        suggestionOutput.className = `suggestion-box ${style}`;

        // Optionally show the hand memory in the console for development tracking
        // const history = await window.electronAPI.getHandHistory();
        // console.log("Current Hand History:", history.data);

    } else {
        actionText.textContent = `Error: ${response.error}`;
        suggestionOutput.className = 'suggestion-box error';
    }
}