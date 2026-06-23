function initSettings() {
    // Migrate deprecated Gemini models
    try {
        var m = localStorage.getItem('gemini_ai_model');
        if (m === 'gemini-1.5-flash' || m === 'gemini-pro' || !m) {
            localStorage.setItem('gemini_ai_model', 'gemini-2.5-flash');
        } else if (m === 'gemini-1.5-pro') {
            localStorage.setItem('gemini_ai_model', 'gemini-2.5-pro');
        }
    } catch(e) {}

    const apiKeyInput = document.getElementById('setting-api-key');
    const aiModelSelect = document.getElementById('setting-ai-model');
    const saveBtn = document.getElementById('btn-save-settings');
    const statusDiv = document.getElementById('settings-status');

    if (!apiKeyInput || !saveBtn) {
        console.error("Settings UI elements not found!");
        return;
    }

    // O'qib olish
    const savedKey = localStorage.getItem('gemini_api_key');
    const savedModel = localStorage.getItem('gemini_ai_model');

    if (savedKey) apiKeyInput.value = savedKey;
    if (savedModel && aiModelSelect) aiModelSelect.value = savedModel;
    else if (aiModelSelect) aiModelSelect.value = 'gemini-2.5-flash';

    // Saqlash bosilganda
    saveBtn.addEventListener('click', () => {
        const key = apiKeyInput.value.trim();
        const model = aiModelSelect ? aiModelSelect.value : 'gemini-2.5-flash';

        if (!key) {
            statusDiv.style.color = '#ff4d4f'; // red
            statusDiv.innerText = 'Iltimos, API kalitini kiriting!';
            statusDiv.style.display = 'block';
            return;
        }

        localStorage.setItem('gemini_api_key', key);
        localStorage.setItem('gemini_ai_model', model);

        statusDiv.style.color = '#52c41a'; // green
        statusDiv.innerText = 'Sozlamalar muvaffaqiyatli saqlandi!';
        statusDiv.style.display = 'block';

        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 3000);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSettings);
} else {
    initSettings();
}
