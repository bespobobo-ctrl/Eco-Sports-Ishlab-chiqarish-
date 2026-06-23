// --- Default Data Sets (Initial Mock Database) ---

const defaultMaterials = [
  { "id": "mat-001", "nomi": "Organik Paxta Mato (Green)", "turi": "Mato", "rangi": "Olive Green", "miqdori": 450, "birligi": "kg", "narxi": 12.5, "ekologik_ball": "A+" },
  { "id": "mat-002", "nomi": "Organik Paxta Mato (White)", "turi": "Mato", "rangi": "Natural White", "miqdori": 320, "birligi": "kg", "narxi": 12.0, "ekologik_ball": "A+" },
  { "id": "mat-003", "nomi": "Qayta Ishlangan Poliefir (rPET)", "turi": "Mato", "rangi": "Charcoal Black", "miqdori": 12, "birligi": "kg", "narxi": 15.0, "ekologik_ball": "A" }, // low stock
  { "id": "mat-004", "nomi": "Ekologik Bo'yoq (Suvli)", "turi": "Bo'yoq", "rangi": "Yashil", "miqdori": 45, "birligi": "litr", "narxi": 8.50, "ekologik_ball": "A+" },
  { "id": "mat-005", "nomi": "Qayta Ishlangan Iplar", "turi": "Furnitura", "rangi": "Turli ranglar", "miqdori": 150, "birligi": "g'altak", "narxi": 1.8, "ekologik_ball": "A" },
  { "id": "mat-006", "nomi": "Kraft Qog'oz Qutisi", "turi": "Aksessuar", "rangi": "Kraft", "miqdori": 8, "birligi": "dona", "narxi": 0.25, "ekologik_ball": "A+" } // low stock
];

const defaultCuts = [
  { "id": "cut-001", "sana": "2026-06-15", "nomi": "Organic White T-Shirts", "turi": "Futbolka", "mato_id": "mat-002", "ogirlik": 120, "bichilgan_dona": 500, "chiqindi_pct": 8.4, "masul": "Dilshod Karimov", "status": "Bichildi" },
  { "id": "cut-002", "sana": "2026-06-18", "nomi": "Eco Green Hoodies", "turi": "Hudi", "mato_id": "mat-001", "ogirlik": 180, "bichilgan_dona": 300, "chiqindi_pct": 9.2, "masul": "Dilshod Karimov", "status": "Bichildi" },
  { "id": "cut-003", "sana": "2026-06-22", "nomi": "Recycled Charcoal Sweatpants", "turi": "Shim", "mato_id": "mat-003", "ogirlik": 95, "bichilgan_dona": 250, "chiqindi_pct": 8.8, "masul": "Dilshod Karimov", "status": "Bichildi" }
];

const defaultOrders = [
  { "id": "buy-101", "mahsulot_nomi": "Marathon T-Shirts", "turi": "Futbolka", "miqdori": 500, "tayyorlandi": 500, "bichildi": 500, "liniya": "Liniya B", "boshlangan_sana": "2026-06-10", "topshirish_sana": "2026-06-20", "status": "Tayyor" },
  { "id": "buy-102", "mahsulot_nomi": "Eco Green Hoodies", "turi": "Hudi", "miqdori": 300, "tayyorlandi": 160, "bichildi": 300, "liniya": "Liniya A", "boshlangan_sana": "2026-06-18", "topshirish_sana": "2026-06-28", "status": "Tikilmoqda" },
  { "id": "buy-103", "mahsulot_nomi": "Recycled Charcoal Sweatpants", "turi": "Shim", "miqdori": 250, "tayyorlandi": 80, "bichildi": 250, "liniya": "Liniya C", "boshlangan_sana": "2026-06-22", "topshirish_sana": "2026-07-02", "status": "Tikilmoqda" }
];

const defaultPaintLogs = [
  { "id": "pnt-001", "sana": "2026-06-12", "order_id": "buy-101", "order_name": "Marathon T-Shirts", "press_type": "Termotransfer (Logo)", "ink_type": "Suv asosidagi ekologik", "qty": 500, "desc": "Ko'k rangli old logo bosildi", "qc_status": "Passed" },
  { "id": "pnt-002", "sana": "2026-06-19", "order_id": "buy-102", "order_name": "Eco Green Hoodies", "press_type": "Ipak ekranli bosma", "ink_type": "Plastizol (Oeko-Tex)", "qty": 200, "desc": "Orqa panelda Eco-Tree dizayn", "qc_status": "Passed" }
];

const defaultPackLogs = [
  { "id": "pck-001", "sana": "2026-06-14", "order_name": "Marathon T-Shirts", "qty_passed": 498, "qty_failed": 2, "qadoqlovchi": "Zulayho G'ofurova", "bag_type": "Biodegradable paket", "topshirildi": "Ha" },
  { "id": "pck-002", "sana": "2026-06-20", "order_name": "Eco Green Hoodies", "qty_passed": 120, "qty_failed": 3, "qadoqlovchi": "Zulayho G'ofurova", "bag_type": "Biodegradable paket", "topshirildi": "Yo'q" }
];

const defaultWorkers = [
  { "id": "ish-001", "ism": "Dilshod Karimov", "lavozim": "Bichuvchi", "liniya": "-", "tariflar": { "Hudi": 2500, "Futbolka": 1200, "Shim": 1800 }, "status": "Faol" },
  { "id": "ish-002", "ism": "Maftuna Rahimova", "lavozim": "Tikuvchi", "liniya": "Liniya A", "tariflar": { "Hudi": 8500, "Futbolka": 4000, "Shim": 6000 }, "status": "Faol" },
  { "id": "ish-003", "ism": "Shohida Olimova", "lavozim": "Tikuvchi", "liniya": "Liniya A", "tariflar": { "Hudi": 8500, "Futbolka": 4000, "Shim": 6000 }, "status": "Faol" },
  { "id": "ish-004", "ism": "Nodira Tursunova", "lavozim": "Tikuvchi", "liniya": "Liniya B", "tariflar": { "Hudi": 8500, "Futbolka": 4000, "Shim": 6000 }, "status": "Faol" },
  { "id": "ish-005", "ism": "Sarvar Ergashev", "lavozim": "Tikuvchi", "liniya": "Liniya C", "tariflar": { "Hudi": 8500, "Futbolka": 4000, "Shim": 6000 }, "status": "Faol" },
  { "id": "ish-006", "ism": "Zulayho G'ofurova", "lavozim": "Qadoqlovchi", "liniya": "-", "tariflar": { "Hudi": 1500, "Futbolka": 800, "Shim": 1100 }, "status": "Faol" }
];

const defaultWorkLogs = [
  { "sana": "2026-06-13", "ishchi_id": "ish-004", "ishchi_nomi": "Nodira Tursunova", "buyurtma_id": "buy-101", "mahsulot_turi": "Futbolka", "miqdori": 300, "tarif": 4000, "summa": 1200000 },
  { "sana": "2026-06-19", "ishchi_id": "ish-002", "ishchi_nomi": "Maftuna Rahimova", "buyurtma_id": "buy-102", "mahsulot_turi": "Hudi", "miqdori": 80, "tarif": 8500, "summa": 680000 },
  { "sana": "2026-06-20", "ishchi_id": "ish-003", "ishchi_nomi": "Shohida Olimova", "buyurtma_id": "buy-102", "mahsulot_turi": "Hudi", "miqdori": 80, "tarif": 8500, "summa": 680000 },
  { "sana": "2026-06-22", "ishchi_id": "ish-005", "ishchi_nomi": "Sarvar Ergashev", "buyurtma_id": "buy-103", "mahsulot_turi": "Shim", "miqdori": 80, "tarif": 6000, "summa": 480000 }
];

const defaultServices = [
  { "id": "serv-001", "provider": "Olimxon Kashtachilik", "type": "Kompyuterli Kashta tikish", "order": "Eco Hoodies (Gullar ko'rinishi)", "qty": 300, "rate": 2000, "total": 600000, "deadline": "2026-06-24", "status": "Faol" },
  { "id": "serv-002", "provider": "Sirdaryo Yuvish MCHJ", "type": "Yuvish va Ozonlash", "order": "Charcoal Sweatpants (Ozon yuvish)", "qty": 250, "rate": 3500, "total": 875000, "deadline": "2026-06-28", "status": "Kutilmoqda" }
];

// Showroom initial states
const defaultShowroomSales = [
  { "id": "shw-001", "sana": "2026-06-20", "mijoz": "Jasur Rahimov", "turi": "Hudi", "qty": 2, "summa": 700000, "payment": "Plastik Karta" },
  { "id": "shw-002", "sana": "2026-06-21", "mijoz": "Shahnoza Malikova", "turi": "Futbolka", "qty": 3, "summa": 450000, "payment": "Payme / Click" }
];

const defaultShowroomStock = {
  "Hudi": 45,
  "Futbolka": 120,
  "Shim": 60
};

// --- Tikuv Konveyeri (Kanban) bosqichlari — STANDART (foydalanuvchi o'zgartira oladi) ---
// Bichuvdan kelgan ishlar -> tikuv operatsiyalari -> tayyor mahsulot
const DEFAULT_STAGES = [
  { id: "bichuv",        nomi: "Bichuvdan Kelgan", icon: "fa-scissors",          color: "#38bdf8" },
  { id: "averlok",       nomi: "Averlok",          icon: "fa-grip-lines",        color: "#22d3ee" },
  { id: "chuntak",       nomi: "Chuntak",          icon: "fa-wallet",            color: "#818cf8" },
  { id: "chok",          nomi: "Chok (Asosiy)",    icon: "fa-ruler-horizontal",  color: "#a78bfa" },
  { id: "raspashivalka", nomi: "Raspashivalka",    icon: "fa-align-justify",     color: "#c084fc" },
  { id: "manjet",        nomi: "Manjet",           icon: "fa-mitten",            color: "#f472b6" },
  { id: "yoqa",          nomi: "Yoqa",             icon: "fa-shirt",             color: "#fb923c" },
  { id: "bel",           nomi: "Bel",              icon: "fa-text-width",        color: "#fbbf24" },
  { id: "tayyor",        nomi: "Tayyor Mahsulot",  icon: "fa-circle-check",      color: "#34d399" }
];

const defaultKanban = [
  { id: "k-001", model: "Eco Green Hoodie (Olive)", turi: "Hudi", miqdori: 300, liniya: "Liniya A", masul: "Maftuna Rahimova", deadline: "2026-06-28", prio: "high",   stage: "bichuv" },
  { id: "k-002", model: "Organic White T-Shirt",    turi: "Futbolka", miqdori: 500, liniya: "Liniya B", masul: "Nodira Tursunova",  deadline: "2026-06-25", prio: "normal", stage: "averlok" },
  { id: "k-003", model: "Recycled Sweatpants",       turi: "Shim", miqdori: 250, liniya: "Liniya C", masul: "Sarvar Ergashev",   deadline: "2026-07-02", prio: "normal", stage: "chok" },
  { id: "k-004", model: "Eco Green T-Shirt",         turi: "Futbolka", miqdori: 400, liniya: "Liniya B", masul: "Nodira Tursunova",  deadline: "2026-07-01", prio: "low",    stage: "chuntak" },
  { id: "k-005", model: "Marathon Hoodie (Black)",   turi: "Hudi", miqdori: 180, liniya: "Liniya A", masul: "Shohida Olimova",   deadline: "2026-06-30", prio: "high",   stage: "manjet" },
  { id: "k-006", model: "Sport Trikotaj (Navy)",     turi: "Trikotaj", miqdori: 220, liniya: "Liniya A", masul: "Maftuna Rahimova", deadline: "2026-07-04", prio: "normal", stage: "yoqa" },
  { id: "k-007", model: "Eco Polo Shirt",            turi: "Futbolka", miqdori: 150, liniya: "Liniya B", masul: "Nodira Tursunova",  deadline: "2026-06-26", prio: "normal", stage: "bel" },
  { id: "k-008", model: "Classic White Tee",         turi: "Futbolka", miqdori: 500, liniya: "Liniya B", masul: "Nodira Tursunova",  deadline: "2026-06-22", prio: "normal", stage: "tayyor" }
];


// --- App State ---
let state = {
    materials: [],
    cuts: [],
    orders: [],
    paintLogs: [],
    packLogs: [],
    workers: [],
    workLogs: [],
    services: [],
    showroomSales: [],
    showroomStock: {},
    showroomCatalog: [],
    showroomFilter: 'All',
    kanban: [],
    stages: [],
    activeTab: 'sales',
    activeSubTab: 'ai-calc',
    lastCalculatedModel: null,
    aiApiUsageCount: 0
};


// --- Initialization ---
async function init() {
    // 1. Setup clock
    setInterval(updateClock, 1000);
    updateClock();

    // 2. Load from localStorage or defaults
    if (localStorage.getItem('eco_crm_state_v3')) {
        state = JSON.parse(localStorage.getItem('eco_crm_state_v3'));
        if (!state.showroomCatalog) {
            state.showroomCatalog = [];
        }
        if (!state.showroomFilter) {
            state.showroomFilter = 'All';
        }
        if (typeof state.aiApiUsageCount === 'undefined') {
            state.aiApiUsageCount = 0;
        }
        if (!Array.isArray(state.kanban) || state.kanban.length === 0) {
            state.kanban = JSON.parse(JSON.stringify(defaultKanban));
        }
        if (!Array.isArray(state.stages) || state.stages.length === 0) {
            state.stages = JSON.parse(JSON.stringify(DEFAULT_STAGES));
        }
    } else {
        state.materials = defaultMaterials;
        state.cuts = defaultCuts;
        state.orders = defaultOrders;
        state.paintLogs = defaultPaintLogs;
        state.packLogs = defaultPackLogs;
        state.workers = defaultWorkers;
        state.workLogs = defaultWorkLogs;
        state.services = defaultServices;
        state.showroomSales = defaultShowroomSales;
        state.showroomStock = defaultShowroomStock;
        state.showroomCatalog = [];
        state.showroomFilter = 'All';
        state.kanban = JSON.parse(JSON.stringify(defaultKanban));
        state.stages = JSON.parse(JSON.stringify(DEFAULT_STAGES));
        state.activeTab = 'sales';
        state.activeSubTab = 'ai-calc';
        state.aiApiUsageCount = 0;
        saveState();
    }

    // 2.5. Boshlang'ich kartalarga namunaviy tarix (faqat tarixsizlariga)
    buildSeedHistories();

    // 3. Render and bind events
    setupTabSwitching();
    setupSubTabSwitching();
    setupFormsAndModals();
    setupSearch();
    setupAICalculator();
    setupShowroomSale();
    setupShowroomFilter();
    setupKanban();
    setupProdSubnav();
    setupBuilder();

    // System Reset button
    const btnReset = document.getElementById('btn-system-reset');
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if (confirm("Haqiqatan ham butun tizim ma'lumotlarini (LocalStorage) tozalamoqchimisiz? Barcha buyurtmalar va zaxiralar dastlabki holatga qaytadi.")) {
                localStorage.clear();
                window.location.reload();
            }
        });
    }

    updateUI();
}

function saveState() {
    localStorage.setItem('eco_crm_state_v3', JSON.stringify(state));
}

function updateClock() {
    const clock = document.getElementById('clock');
    if (clock) {
        const time = new Date().toLocaleTimeString('uz-UZ', { hour12: false });
        clock.innerText = time;
    }
}


// --- Main Tab Routing ---
function setupTabSwitching() {
    const navLinks = document.querySelectorAll('#main-nav .nav-link');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const viewTitle = document.getElementById('view-title');
    const subheaderActions = document.getElementById('subheader-actions-container');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            state.activeTab = tabId;
            saveState();

            // Set link classes
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Set pane visibility
            tabPanes.forEach(pane => pane.classList.remove('active'));
            const targetPane = document.getElementById(`tab-${tabId}`);
            if (targetPane) targetPane.classList.add('active');

            let actionButtonHTML = '';
            switch (tabId) {
                case 'sales':
                    if (state.activeSubTab === 'ai-calc') {
                        viewTitle.innerText = "Model & AI Hisob";
                        actionButtonHTML = `<span class="badge" style="background:var(--border-color); color:var(--color-negotiation); padding:8px 12px; font-size:0.8rem;"><i class="fa-solid fa-brain"></i> AI integratsiyasi faol</span>`;
                    } else {
                        viewTitle.innerText = "Eco Sports Showroom";
                        actionButtonHTML = `<span class="badge" style="background:var(--border-color); color:var(--color-won); padding:8px 12px; font-size:0.8rem;"><i class="fa-solid fa-store"></i> Eco Showroom</span>`;
                    }
                    break;
                case 'warehouse':
                    viewTitle.innerText = "Omborxonadagi Zaxiralar";
                    actionButtonHTML = `<button class="btn btn-primary" onclick="openModal('modal-warehouse')"><i class="fa-solid fa-plus"></i> Yangi Xomashyo kiritish</button>`;
                    break;
                case 'cutting':
                    viewTitle.innerText = "Bichuv Bo'limi Hisoboti";
                    actionButtonHTML = `<button class="btn btn-primary" onclick="openModal('modal-cutting')"><i class="fa-solid fa-scissors"></i> Yangi Bichuv buyrug'i</button>`;
                    break;
                case 'production':
                    viewTitle.innerText = "Tikuv Konveyeri (Kanban)";
                    actionButtonHTML = `<span class="badge" style="background:var(--border-color); color:var(--color-won); padding:8px 12px; font-size:0.8rem;"><i class="fa-solid fa-shirt"></i> Tikuv Bo'limi Nazorati</span>`;
                    break;
                case 'paint':
                    viewTitle.innerText = "Pres va Bo'yoq Bo'limi";
                    actionButtonHTML = `<button class="btn btn-primary" onclick="openModal('modal-paint')"><i class="fa-solid fa-palette"></i> Chop/Paint Partiya</button>`;
                    break;
                case 'pack':
                    viewTitle.innerText = "Dazmollash va Qadoqlash";
                    actionButtonHTML = `<button class="btn btn-primary" onclick="openModal('modal-pack')"><i class="fa-solid fa-box-open"></i> Qadoqlash Hisoboti</button>`;
                    break;
                case 'workers':
                    viewTitle.innerText = "Kadrlar va Ish haqilari";
                    actionButtonHTML = `<span class="badge" style="background:var(--border-color); color:var(--color-won); padding:8px 12px; font-size:0.8rem;"><i class="fa-solid fa-calculator"></i> Dona-bay Tariflar</span>`;
                    break;
                case 'services':
                    viewTitle.innerText = "Tashqi Usluga (Autsorsing) Bitimlari";
                    actionButtonHTML = `<button class="btn btn-primary" onclick="openModal('modal-service')"><i class="fa-solid fa-handshake"></i> Yangi Usluga Shartnomasi</button>`;
                    break;
            }

            subheaderActions.innerHTML = actionButtonHTML;
            updateUI();
        });
    });
}


// --- Sales Sub-Tab Routing ---
function setupSubTabSwitching() {
    const subTabButtons = document.querySelectorAll('.sub-tab-btn');
    const subPanes = document.querySelectorAll('.sub-pane');
    const viewTitle = document.getElementById('view-title');
    const subheaderActions = document.getElementById('subheader-actions-container');

    subTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const subtabId = btn.getAttribute('data-subtab');
            state.activeSubTab = subtabId;
            saveState();

            // Classes toggle
            subTabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            subPanes.forEach(pane => pane.classList.remove('active'));
            const targetPane = document.getElementById(`sub-pane-${subtabId}`);
            if (targetPane) targetPane.classList.add('active');

            // Update title text and subheader buttons
            if (subtabId === 'ai-calc') {
                viewTitle.innerText = "Model & AI Hisob";
                subheaderActions.innerHTML = `<span class="badge" style="background:var(--border-color); color:var(--color-negotiation); padding:8px 12px; font-size:0.8rem;"><i class="fa-solid fa-brain"></i> AI integratsiyasi faol</span>`;
            } else {
                viewTitle.innerText = "Eco Sports Showroom";
                subheaderActions.innerHTML = `<span class="badge" style="background:var(--border-color); color:var(--color-won); padding:8px 12px; font-size:0.8rem;"><i class="fa-solid fa-store"></i> Eco Showroom</span>`;
            }

            updateUI();
        });
    });

    // Make sure correct sub tab is active on init
    subTabButtons.forEach(b => {
        if (b.getAttribute('data-subtab') === state.activeSubTab) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });

    subPanes.forEach(pane => {
        if (pane.getAttribute('id') === `sub-pane-${state.activeSubTab}`) {
            pane.classList.add('active');
        } else {
            pane.classList.remove('active');
        }
    });
}


// --- UI Update Coordinator ---
function updateUI(filteredQuery = "") {
    // Populate form selectors
    populateDropdowns();

    // Render respective sections
    renderWarehouse(filteredQuery);
    renderCutting(filteredQuery);
    renderKanban();
    renderPaintLogs(filteredQuery);
    renderPackLogs(filteredQuery);
    renderWorkersTable(filteredQuery);
    renderServicesTable(filteredQuery);

    // Render sales sub sections
    if (typeof renderShowroomSales === 'function') renderShowroomSales(filteredQuery);
    if (typeof renderShowroomCatalog === 'function') renderShowroomCatalog();
    updateApiUsageUI();
}

function updateApiUsageUI() {
    const countEl = document.getElementById('api-req-count');
    const costEl = document.getElementById('api-req-cost');
    if (countEl && costEl && typeof state.aiApiUsageCount !== 'undefined') {
        const count = state.aiApiUsageCount;
        const cost = count * 0.0015;
        countEl.innerText = count + " ta";
        costEl.innerText = "$" + cost.toFixed(4);
    }
}


// --- AI CALCULATOR CORE LOGIC ---
function setupAICalculator() {
    const dropzone = document.getElementById('ai-dropzone');
    const fileInput = document.getElementById('ai-file-input');
    const dropPrompt = document.getElementById('dropzone-prompt');
    const scanContainer = document.getElementById('ai-scan-container');
    const scanImg = document.getElementById('ai-scan-img');
    const scannerLine = document.getElementById('ai-scanner-line');
    const scanStatus = document.getElementById('ai-scan-status');

    const detectedCard = document.getElementById('ai-detected-card');
    const worksheetCard = document.getElementById('ai-worksheet-card');
    const resultsCard = document.getElementById('ai-results-card');

    const placeholder = document.getElementById('ai-placeholder');
    const content = document.getElementById('ai-content');

    if (!dropzone || !fileInput) return;

    // Load and save API key from/to localStorage
    const geminiApiKeyInput = document.getElementById('gemini-api-key-input');
    const apiKeyStatus = document.getElementById('api-key-status');
    const btnTestKey = document.getElementById('btn-test-api-key');

    if (geminiApiKeyInput) {
        const savedKey = localStorage.getItem('gemini_api_key');
        if (savedKey) {
            geminiApiKeyInput.value = savedKey;
        } else {
            geminiApiKeyInput.value = "";
        }

        geminiApiKeyInput.addEventListener('input', (e) => {
            localStorage.setItem('gemini_api_key', e.target.value.trim());
            if (apiKeyStatus) {
                apiKeyStatus.innerText = '';
            }
        });
    }

    // --- TEST API KEY BUTTON ---
    if (btnTestKey) {
        btnTestKey.addEventListener('click', async () => {
            const key = geminiApiKeyInput ? geminiApiKeyInput.value.trim() : '';
            if (!key) {
                if (apiKeyStatus) {
                    apiKeyStatus.innerText = '❌ Kalit kiriting!';
                    apiKeyStatus.style.color = '#ff4d4f';
                }
                return;
            }

            btnTestKey.disabled = true;
            btnTestKey.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Tekshirilmoqda...';
            if (apiKeyStatus) {
                apiKeyStatus.innerText = '';
            }

            try {
                const testBody = {
                    contents: [{ parts: [{ text: "Javob faqat 1 so'z: salom" }] }]
                };

                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(testBody)
                });

                if (res.ok) {
                    if (apiKeyStatus) {
                        apiKeyStatus.innerText = '✅ API Key ishlayapti!';
                        apiKeyStatus.style.color = '#52c41a';
                    }
                } else {
                    const errData = await res.json().catch(() => ({}));
                    const errMsg = errData?.error?.message || `Status: ${res.status}`;
                    console.error('[AI Test] Xato:', errMsg);
                    if (apiKeyStatus) {
                        apiKeyStatus.innerText = `❌ Ishlamadi! (${res.status})`;
                        apiKeyStatus.style.color = '#ff4d4f';
                    }
                    alert(`API Key tekshiruvi muvaffaqiyatsiz!\n\nStatus: ${res.status}\nSabab: ${errMsg}\n\nTo'g'ri kalitni olish: https://aistudio.google.com/ saytiga kirib, "Get API key" tugmasini bosing.`);
                }
            } catch (err) {
                console.error('[AI Test] Network xato:', err);
                if (apiKeyStatus) {
                    apiKeyStatus.innerText = '❌ Tarmoq xatosi!';
                    apiKeyStatus.style.color = '#ff4d4f';
                }
                alert(`Internet aloqasi yoki tarmoq xatosi!\n\n${err.message}`);
            } finally {
                btnTestKey.disabled = false;
                btnTestKey.innerHTML = '<i class="fa-solid fa-plug"></i> Tekshirish';
            }
        });
    }

    // Trigger click on file input when clicking dropzone
    dropzone.addEventListener('click', () => {
        // Only click if not scanning
        if (scanContainer.style.display === 'none' || scanStatus.innerText.includes('Tahlil Yakunlandi')) {
            fileInput.click();
        }
    });

    // Drag & Drop handlers
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUploadedFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            handleUploadedFile(e.target.files[0]);
        }
    });

    function handleUploadedFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Iltimos, faqat rasm faylini yuklang!');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            // Start scanning animation
            dropPrompt.style.display = 'none';
            scanContainer.style.display = 'flex';
            scanImg.src = event.target.result;
            scannerLine.style.display = 'block';
            scanStatus.innerText = "Rasm tayyorlanmoqda...";
            scanStatus.style.color = "var(--color-prospect)";

            detectedCard.style.display = 'none';
            worksheetCard.style.display = 'none';
            placeholder.style.display = 'flex';
            content.style.display = 'none';
            resultsCard.classList.remove('active');

            const GEMINI_API_KEY = geminiApiKeyInput ? geminiApiKeyInput.value.trim() : "";

            if (!GEMINI_API_KEY || GEMINI_API_KEY.length < 10) {
                console.warn("[AI] Gemini API kaliti kiritilmagan yoki noto'g'ri. Standart ko'rsatkichlar yuklanmoqda...");
                
                // Fallback to manual defaults
                const selectedType = document.getElementById('param-type').value || 'Futbolka';
                populateAIParameters(selectedType);
                
                scannerLine.style.display = 'none';
                scanStatus.innerText = `⚠️ API Kalitsiz. Standartlar yuklandi!`;
                scanStatus.style.color = "var(--color-qualified)";
                
                detectedCard.style.display = 'block';
                worksheetCard.style.display = 'block';
                calculateVisualTannarx();
                return;
            }

            // Resize image via Canvas to reduce payload (max 800px)
            resizeImageToBase64(event.target.result, 800, async (resizedBase64, resizedMime) => {
                const base64Data = resizedBase64.split(',')[1];
                console.log('[AI] Rasm kichraytirildi. Base64 hajmi:', Math.round(base64Data.length / 1024), 'KB');

                scanStatus.innerText = "AI Modelni Tahlil Qilmoqda...";

                // Countdown timer
                let secondsElapsed = 0;
                const countdownInterval = setInterval(() => {
                    secondsElapsed++;
                    scanStatus.innerText = `AI Modelni Tahlil Qilmoqda... (${secondsElapsed}s)`;
                }, 1000);

                const requestBody = {
                    contents: [{
                        parts: [
                            {
                                text: `Sen professional tikuvchilik va kiyim ishlab chiqarish bo'yicha 20 yillik tajribaga ega chevar-texnologssan. Sening vazifang — yuborilgan kiyim rasmini sinchiklab tahlil qilib, ishlab chiqarish uchun zarur texnik parametrlarni ANIQ hisoblash.

MUHIM QOIDALAR:
1. FAQAT rasmda ko'rinayotgan narsalarni hisoblash — tasavvur qilma, yo'q narsani qo'shma
2. Agar biror detalning bor-yo'qligini aniqlay olmasang — 0 yoz
3. Rang kombinatsiyasi — FAQAT rasmda real ko'rinayotgan turli rangdagi mato bo'laklarini hisoblash. Bir xil rangdagi kiyimda rang kombinatsiyasi = 0
4. Kraska/Print — FAQAT rasmda bosmachop, chop etilgan yozuv, logotip yoki rasm ko'rinsa hisoblash. Aks holda = 0

MAHSULOT TURINI ANIQLASH:
- "Futbolka" — qisqa yengli, yoqasiz yoki kichik yoqali, engil trikotaj yuqori kiyim
- "Trikotaj" — uzun yengli erkaklar trikotaj kiyimi (sviter, longsleeve, termobel)
- "Hudi" — kapyushonli, oldindan zamokli yoki quyma trikotaj kiyim
- "Shim" — shimlar, shortlar, sport shim — oyoqqa kiyiladigan pastki kiyim
- "Kurtka" — issiq ustki kiyim, plashch, vetrovka
- "Sport Kiyim" — sport kostyumi, trayning kiyim

PARAMETRLAR TA'RIFI:
- param_sew: TIKUV CHOKLARI soni — to'g'ri chiziqli tikuv mashinasida tikiladigan choklarning umumiy soni (yon choklar, yelka choklar, yoqa ulash, yeng ulash, kichik qismlar birlashtirilishi). Har bir alohida tikuv yo'nalishi = 1 chok
- param_overlock: OVERLOK choklari — gazlamaning qirqilgan chetlariga overlok (serger) bilan ishlov berilgan joylar soni. Har bir alohida chet = 1 overlok
- param_flatlock: RASPASHIVALKA soni — tekis tikuv (flatlock/coverstitch) bilan qilingan tikuvlar. Odatda yeng uchi, etak qismi va yoqa chetlarida ishlatiladi
- param_folds: BOSTIRIQ va QAYIRILAR soni — buklanib tikib qo'yilgan joylar (etakning bukilishi, yeng uchining bukilishi, shimning pastki qismi)
- param_inserts: RANGLI MATO KOMBINATSIYALARI — bir kiyimda ishlatiladigan TURLI rangdagi mato bo'laklari soni. Bir xil rangda = 0. 2 xil rang = 1. 3 xil rang = 2
- param_paints: KRASKA/PRINT soni — rasmda ko'rinadigan bosma (print, logotip, yozuv, rasm) joylarning soni
- param_accessories: AKSESSUARLAR soni — zamoklar, tugmalar, etiketkalar, razmer belgilari, ip o'tkazgichlar va boshqa qo'shimcha detallarning umumiy soni

Javobni quyidagi JSON formatida qaytar:
{
  "product_type": "Futbolka",
  "param_sew": 8,
  "param_overlock": 6,
  "param_flatlock": 3,
  "param_folds": 3,
  "param_inserts": 0,
  "param_paints": 0,
  "param_accessories": 2,
  "explanation": "Bu oddiy erkaklar futbolkasi. Tikuv choklari: 2 yelka chok + 2 yeng ulash + 2 yon chok + 1 yoqa ulash + 1 etak tikuv = 8. Overlok: 2 yelka + 2 yeng + 2 yon = 6. Raspashivalka: yeng uchi 2ta + etak 1ta = 3. Bostiriq: 2 yeng uchi + 1 etak = 3. Mato bir rangda, shuning uchun rang kombinatsiya = 0. Print/kraska ko'rinmayapti = 0. Aksessuarlar: 1 etiketka + 1 razmer belgisi = 2."
}`
                            },
                            {
                                inlineData: {
                                    mimeType: resizedMime,
                                    data: base64Data
                                }
                            }
                        ]
                    }],
                    generationConfig: {
                        responseMimeType: "application/json"
                    }
                };

                console.log('[AI] Gemini API so\'rov yuborilmoqda... (AbortController yo\'q, cheksiz kutish)');

                try {
                    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(requestBody)
                    });

                    clearInterval(countdownInterval);

                    if (!res.ok) {
                        const errorBody = await res.text();
                        console.error('[AI] API xato javobi:', res.status, errorBody);
                        let errDetail = '';
                        try {
                            const parsed = JSON.parse(errorBody);
                            errDetail = parsed.error?.message || errorBody;
                        } catch { errDetail = errorBody; }
                        throw new Error(`API rad etdi (${res.status}): ${errDetail}`);
                    }

                    const data = await res.json();
                    console.log('[AI] API javob keldi:', data);

                    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts[0]) {
                        throw new Error("Gemini API kutilmagan javob qaytardi. Candidates topilmadi.");
                    }

                    const text = data.candidates[0].content.parts[0].text;
                    console.log('[AI] Gemini javobi:', text);
                    const parsed = JSON.parse(text.trim());

                    // Fill UI inputs
                    document.getElementById('param-type').value = parsed.product_type || 'Futbolka';
                    document.getElementById('param-sew').value = parsed.param_sew ?? 0;
                    document.getElementById('param-overlock').value = parsed.param_overlock ?? 0;
                    document.getElementById('param-flatlock').value = parsed.param_flatlock ?? 0;
                    document.getElementById('param-folds').value = parsed.param_folds ?? 0;
                    document.getElementById('param-inserts').value = parsed.param_inserts ?? 0;
                    document.getElementById('param-paints').value = parsed.param_paints ?? 0;
                    document.getElementById('param-accessories').value = parsed.param_accessories ?? 0;

                    // Fabric quantity based on product type
                    const fabricMap = {
                        'Hudi': 0.65, 'Futbolka': 0.30, 'Trikotaj': 0.40,
                        'Shim': 0.45, 'Kurtka': 0.80, 'Sport Kiyim': 0.55
                    };
                    document.getElementById('cost-fabric-qty').value = fabricMap[parsed.product_type] || 0.40;

                    // Show AI explanation
                    const explBox = document.getElementById('ai-explanation-box');
                    const explText = document.getElementById('ai-explanation-text');
                    if (explBox && explText && parsed.explanation) {
                        explText.innerText = parsed.explanation;
                        explBox.style.display = 'block';
                    } else if (explBox) {
                        explBox.style.display = 'none';
                    }

                    scannerLine.style.display = 'none';
                    scanStatus.innerText = `✅ Tahlil Yakunlandi! (${secondsElapsed}s)`;
                    scanStatus.style.color = "var(--color-won)";

                    // Increment API usage count
                    if (typeof state.aiApiUsageCount === 'undefined') state.aiApiUsageCount = 0;
                    state.aiApiUsageCount++;
                    saveState();
                    if (typeof updateApiUsageUI === 'function') updateApiUsageUI();

                    detectedCard.style.display = 'block';
                    worksheetCard.style.display = 'block';
                    calculateVisualTannarx();

                } catch (err) {
                    clearInterval(countdownInterval);
                    console.error("[AI] Gemini API xatosi:", err);

                    scannerLine.style.display = 'none';
                    scanStatus.innerText = `⚠️ AI Xatosi. Standartlar yuklandi!`;
                    scanStatus.style.color = "var(--color-qualified)";

                    // Fallback to manual defaults
                    const selectedType = document.getElementById('param-type').value || 'Futbolka';
                    populateAIParameters(selectedType);

                    detectedCard.style.display = 'block';
                    worksheetCard.style.display = 'block';
                    calculateVisualTannarx();

                    alert(`AI tahlilida xatolik yuz berdi (${err.message}).\n\nMahsulot parametrlari standart qiymatlar bilan to'ldirildi. O'zingiz tahrirlashingiz mumkin.`);
                }
            });
        };
        reader.readAsDataURL(file);
    }

    // Helper: Resize image via Canvas
    function resizeImageToBase64(dataUrl, maxSize, callback) {
        const img = new Image();
        img.onload = () => {
            let w = img.width;
            let h = img.height;
            if (w > maxSize || h > maxSize) {
                if (w > h) {
                    h = Math.round(h * maxSize / w);
                    w = maxSize;
                } else {
                    w = Math.round(w * maxSize / h);
                    h = maxSize;
                }
            }
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            const resized = canvas.toDataURL('image/jpeg', 0.8);
            callback(resized, 'image/jpeg');
        };
        img.src = dataUrl;
    }

    // Helper: Reset dropzone to initial state
    function resetDropzone() {
        scannerLine.style.display = 'none';
        setTimeout(() => {
            dropPrompt.style.display = 'flex';
            scanContainer.style.display = 'none';
            scanImg.src = '';
        }, 1500);
    }

    function populateAIParameters(type) {
        if (type === 'Hudi') {
            document.getElementById('param-sew').value = 14;
            document.getElementById('param-overlock').value = 10;
            document.getElementById('param-flatlock').value = 4;
            document.getElementById('param-folds').value = 6;
            document.getElementById('param-inserts').value = 2;
            document.getElementById('param-paints').value = 1;
            document.getElementById('param-accessories').value = 3;
            document.getElementById('cost-fabric-qty').value = 0.65;
        } else if (type === 'Futbolka') {
            document.getElementById('param-sew').value = 6;
            document.getElementById('param-overlock').value = 4;
            document.getElementById('param-flatlock').value = 2;
            document.getElementById('param-folds').value = 2;
            document.getElementById('param-inserts').value = 0;
            document.getElementById('param-paints').value = 1;
            document.getElementById('param-accessories').value = 2;
            document.getElementById('cost-fabric-qty').value = 0.30;
        } else if (type === 'Trikotaj') {
            document.getElementById('param-sew').value = 8;
            document.getElementById('param-overlock').value = 6;
            document.getElementById('param-flatlock').value = 4;
            document.getElementById('param-folds').value = 4;
            document.getElementById('param-inserts').value = 0;
            document.getElementById('param-paints').value = 0;
            document.getElementById('param-accessories').value = 2;
            document.getElementById('cost-fabric-qty').value = 0.40;
        } else if (type === 'Kurtka') {
            document.getElementById('param-sew').value = 25;
            document.getElementById('param-overlock').value = 12;
            document.getElementById('param-flatlock').value = 0;
            document.getElementById('param-folds').value = 8;
            document.getElementById('param-inserts').value = 3;
            document.getElementById('param-paints').value = 0;
            document.getElementById('param-accessories').value = 6;
            document.getElementById('cost-fabric-qty').value = 0.80;
        } else if (type === 'Sport Kiyim') {
            document.getElementById('param-sew').value = 18;
            document.getElementById('param-overlock').value = 14;
            document.getElementById('param-flatlock').value = 6;
            document.getElementById('param-folds').value = 8;
            document.getElementById('param-inserts').value = 2;
            document.getElementById('param-paints').value = 1;
            document.getElementById('param-accessories').value = 4;
            document.getElementById('cost-fabric-qty').value = 0.55;
        } else { // Shim
            document.getElementById('param-sew').value = 10;
            document.getElementById('param-overlock').value = 8;
            document.getElementById('param-flatlock').value = 0;
            document.getElementById('param-folds').value = 4;
            document.getElementById('param-inserts').value = 1;
            document.getElementById('param-paints').value = 0;
            document.getElementById('param-accessories').value = 2;
            document.getElementById('cost-fabric-qty').value = 0.45;
        }
    }

    // Attach real-time calculation listeners
    const inputIds = [
        'param-sew', 'param-overlock', 'param-flatlock', 'param-folds', 'param-inserts', 'param-paints', 'param-accessories', 'param-order-qty',
        'cost-sew', 'cost-overlock', 'cost-flatlock', 'cost-folds', 'cost-inserts', 'cost-paints', 'cost-accessories', 'cost-fabric-qty', 'cost-fabric-price', 'cost-electricity', 'cost-packaging',
        'param-selected-material'
    ];

    inputIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', calculateVisualTannarx);
            el.addEventListener('change', calculateVisualTannarx);
        }
    });

    // Update all parameters to defaults when user manually changes product type!
    const paramTypeEl = document.getElementById('param-type');
    if (paramTypeEl) {
        paramTypeEl.addEventListener('change', (e) => {
            populateAIParameters(e.target.value);
            calculateVisualTannarx();
        });
    }

    function calculateVisualTannarx() {
        const paramSew = parseFloat(document.getElementById('param-sew').value) || 0;
        const paramOverlock = parseFloat(document.getElementById('param-overlock').value) || 0;
        const paramFlatlock = parseFloat(document.getElementById('param-flatlock').value) || 0;
        const paramFolds = parseFloat(document.getElementById('param-folds').value) || 0;
        const paramInserts = parseFloat(document.getElementById('param-inserts').value) || 0;
        const paramPaints = parseFloat(document.getElementById('param-paints').value) || 0;
        const paramAccessories = parseFloat(document.getElementById('param-accessories').value) || 0;
        const type = document.getElementById('param-type').value;
        const orderQty = parseInt(document.getElementById('param-order-qty').value) || 10;

        const costSew = parseFloat(document.getElementById('cost-sew').value) || 0;
        const costOverlock = parseFloat(document.getElementById('cost-overlock').value) || 0;
        const costFlatlock = parseFloat(document.getElementById('cost-flatlock').value) || 0;
        const costFolds = parseFloat(document.getElementById('cost-folds').value) || 0;
        const costInserts = parseFloat(document.getElementById('cost-inserts').value) || 0;
        const costPaints = parseFloat(document.getElementById('cost-paints').value) || 0;
        const costAccessories = parseFloat(document.getElementById('cost-accessories').value) || 0;
        const costFabricQty = parseFloat(document.getElementById('cost-fabric-qty').value) || 0;
        const costFabricPrice = parseFloat(document.getElementById('cost-fabric-price').value) || 0;
        const costElectricity = parseFloat(document.getElementById('cost-electricity')?.value || 1000);
        const costPackaging = parseFloat(document.getElementById('cost-packaging')?.value || 1500);

        // Mathematical model:
        // Labor cost per piece
        const laborPerPiece = (paramSew * costSew) + 
                              (paramOverlock * costOverlock) + 
                              (paramFlatlock * costFlatlock) + 
                              (paramFolds * costFolds) + 
                              (paramInserts * costInserts);

        // Printing/painting cost per piece
        const paintCostPerPiece = paramPaints * costPaints;

        // Accessories cost per piece
        const accessoryCostPerPiece = paramAccessories * costAccessories;

        // Fabric cost per piece
        const fabricCostPerPiece = costFabricQty * costFabricPrice;

        // Total cost per piece (Unit Cost)
        const unitCost = laborPerPiece + paintCostPerPiece + accessoryCostPerPiece + fabricCostPerPiece + costElectricity + costPackaging;

        // Recommended Wholesale/Retail
        const recommendedWholesale = unitCost * 1.35;
        const recommendedRetail = unitCost * 1.60;

        // Totals
        const totalCost = unitCost * orderQty;
        const totalLabor = laborPerPiece * orderQty;
        const totalFabricCost = fabricCostPerPiece * orderQty;
        const totalAccessoriesCost = (paintCostPerPiece + accessoryCostPerPiece + costElectricity + costPackaging) * orderQty;

        // Save estimated model to state
        state.lastCalculatedModel = {
            type,
            qty: orderQty,
            totalFabricKg: costFabricQty * orderQty,
            fabricCostTotal: totalFabricCost,
            laborCostTotal: totalLabor,
            totalProductionCost: totalCost,
            unitCost,
            recommendedWholesale,
            recommendedRetail,
            imageSrc: document.getElementById('ai-scan-img') ? document.getElementById('ai-scan-img').src : '',
            params: {
                paramSew, paramOverlock, paramFlatlock, paramFolds, paramInserts, paramPaints, paramAccessories,
                costSew, costOverlock, costFlatlock, costFolds, costInserts, costPaints, costAccessories,
                costFabricQty, costFabricPrice, costElectricity, costPackaging
            }
        };
        saveState();

        // Render outputs
        document.getElementById('ai-res-unit-cost').innerText = Math.round(unitCost).toLocaleString('uz-UZ') + " so'm";
        document.getElementById('ai-res-wholesale').innerText = Math.round(recommendedWholesale).toLocaleString('uz-UZ') + " so'm";
        document.getElementById('ai-res-retail').innerText = Math.round(recommendedRetail).toLocaleString('uz-UZ') + " so'm";
        
        document.getElementById('ai-res-total-cost').innerText = Math.round(totalCost).toLocaleString('uz-UZ') + " so'm";
        document.getElementById('ai-res-labor').innerText = Math.round(totalLabor).toLocaleString('uz-UZ') + " so'm";
        document.getElementById('ai-res-fabric-cost').innerText = Math.round(totalFabricCost).toLocaleString('uz-UZ') + " so'm";
        document.getElementById('ai-res-accessories-cost').innerText = Math.round(totalAccessoriesCost).toLocaleString('uz-UZ') + " so'm";

        // Inventory Warning Logic
        const selectedMaterialId = document.getElementById('param-selected-material') ? document.getElementById('param-selected-material').value : null;
        const warningContainer = document.getElementById('ai-inventory-warning');
        const warningMsg = document.getElementById('ai-inventory-msg');
        const warningDetails = document.getElementById('ai-inventory-details');

        if (warningContainer && selectedMaterialId) {
            const selectedMaterial = state.materials.find(m => m.id === selectedMaterialId);
            if (selectedMaterial) {
                warningContainer.style.display = 'flex';
                const requiredFabric = costFabricQty * orderQty;
                
                if (requiredFabric > selectedMaterial.miqdori) {
                    // Not enough
                    warningContainer.style.background = 'rgba(239, 68, 68, 0.1)';
                    warningContainer.style.border = '1px solid rgba(239, 68, 68, 0.3)';
                    warningContainer.style.color = 'var(--color-red)';
                    warningMsg.innerText = `Omborda ${selectedMaterial.nomi} yetishmaydi!`;
                    warningDetails.innerText = `Kerakli mato: ${requiredFabric.toFixed(1)} kg. Ombordagi qoldiq: ${selectedMaterial.miqdori} kg. Yetishmayotgan miqdor: ${(requiredFabric - selectedMaterial.miqdori).toFixed(1)} kg.`;
                    warningContainer.querySelector('i').className = 'fa-solid fa-circle-exclamation';
                } else {
                    // Enough
                    warningContainer.style.background = 'rgba(34, 197, 94, 0.1)';
                    warningContainer.style.border = '1px solid rgba(34, 197, 94, 0.3)';
                    warningContainer.style.color = 'var(--color-green)';
                    warningMsg.innerText = `Omborda ${selectedMaterial.nomi} yetarli.`;
                    warningDetails.innerText = `Kerakli mato: ${requiredFabric.toFixed(1)} kg. Ombordagi qoldiq: ${selectedMaterial.miqdori} kg. Partiyani bemalol boshlash mumkin.`;
                    warningContainer.querySelector('i').className = 'fa-solid fa-check-circle';
                }
            } else {
                warningContainer.style.display = 'none';
            }
        } else if (warningContainer) {
            warningContainer.style.display = 'none';
        }

        const detailedCostList = document.getElementById('ai-detailed-cost-list');
        if (detailedCostList) {
            detailedCostList.innerHTML = `
                <div class="eff-summary-item" style="border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 5px;">
                    <span><i class="fa-solid fa-scissors" style="color: #38bdf8;"></i> Tikuv ish haqi:</span>
                    <strong class="text-blue">${Math.round(laborPerPiece).toLocaleString('uz-UZ')} so'm</strong>
                </div>
                <div class="eff-summary-item" style="border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 5px;">
                    <span><i class="fa-solid fa-layer-group" style="color: #4ade80;"></i> Mato sarfi:</span>
                    <strong class="text-green">${Math.round(fabricCostPerPiece).toLocaleString('uz-UZ')} so'm</strong>
                </div>
                <div class="eff-summary-item" style="border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 5px;">
                    <span><i class="fa-solid fa-palette" style="color: #c084fc;"></i> Bo'yoq/Print:</span>
                    <strong>${Math.round(paintCostPerPiece).toLocaleString('uz-UZ')} so'm</strong>
                </div>
                <div class="eff-summary-item" style="border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 5px;">
                    <span><i class="fa-solid fa-gem" style="color: #fb923c;"></i> Aksessuarlar:</span>
                    <strong>${Math.round(accessoryCostPerPiece).toLocaleString('uz-UZ')} so'm</strong>
                </div>
                <div class="eff-summary-item" style="border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 5px;">
                    <span><i class="fa-solid fa-bolt" style="color: #fbbf24;"></i> Elektr energiya:</span>
                    <strong>${Math.round(costElectricity).toLocaleString('uz-UZ')} so'm</strong>
                </div>
                <div class="eff-summary-item">
                    <span><i class="fa-solid fa-box" style="color: #f472b6;"></i> Qadoqlash:</span>
                    <strong>${Math.round(costPackaging).toLocaleString('uz-UZ')} so'm</strong>
                </div>
            `;
        }

        placeholder.style.display = 'none';
        content.style.display = 'flex';
        resultsCard.classList.add('active');
    }

    // Global saveToCatalog function
    window.saveToCatalog = function() {
        const est = state.lastCalculatedModel;
        if (!est) {
            alert("Iltimos, avval mahsulotni AI yordamida tahlil qiling!");
            return;
        }

        const wPrice = est.costPerItem || est.unitCost;
        const rPrice = est.costPerItem ? (est.costPerItem * 1.5) : est.recommendedRetail;

        if (confirm(`Ushbu AI model (${est.type}) narxlari Showroom vitrinasiga saqlansinmi?\nUlgurji: ${Math.round(wPrice).toLocaleString('uz-UZ')} so'm\nChakana: ${Math.round(rPrice).toLocaleString('uz-UZ')} so'm`)) {
            
            // Ensure catalog array exists
            if (!state.showroomCatalog) {
                state.showroomCatalog = [];
            }

            // Add the evaluated model to the catalog
            const catalogItem = {
                id: 'cat-' + Date.now(),
                date: new Date().toISOString().split('T')[0],
                type: est.type,
                qty: est.qty,
                wholesalePrice: wPrice,
                retailPrice: rPrice,
                totalProductionCost: est.totalProductionCost,
                imageSrc: est.imageSrc || '',
                params: est.params || null
            };
            
            state.showroomCatalog.push(catalogItem);
            saveState();
            
            if (typeof renderShowroomCatalog === 'function') {
                renderShowroomCatalog();
            }

            alert(`Muvaffaqiyatli saqlandi! Katalogga yangi ${est.type} qo'shildi.`);
            
            // Switch to Showroom Tab Automatically
            const btnShowroom = document.getElementById('sub-btn-showroom');
            if (btnShowroom) {
                btnShowroom.click();
            }
            
            // Reset dropzone
            const scanContainer = document.getElementById('ai-scan-container');
            const dropPrompt = document.getElementById('dropzone-prompt');
            const scanImg = document.getElementById('ai-scan-img');
            const detectedCard = document.getElementById('ai-detected-card');
            const worksheetCard = document.getElementById('ai-worksheet-card');
            const resultsCard = document.getElementById('ai-results-card');
            const placeholder = document.getElementById('ai-placeholder');
            const content = document.getElementById('ai-content');

            if (detectedCard) detectedCard.style.display = 'none';
            if (worksheetCard) worksheetCard.style.display = 'none';
            if (dropPrompt) dropPrompt.style.display = 'flex';
            if (scanContainer) scanContainer.style.display = 'none';
            if (scanImg) scanImg.src = '';
            if (placeholder) placeholder.style.display = 'flex';
            if (content) content.style.display = 'none';
            if (resultsCard) resultsCard.classList.remove('active');
        }
    };

    // Place order handler
    const btnPlaceOrder = document.getElementById('ai-btn-place-order');
    if (btnPlaceOrder) {
        btnPlaceOrder.addEventListener('click', () => {
            const est = state.lastCalculatedModel;
            if (!est) return;

            if (confirm(`Ushbu AI model bo'yicha ${est.qty} dona ishlab chiqarish buyrug'i yaratilsinmi?\nMato sarfi: ${est.totalFabricKg.toFixed(1)} kg. Ta'minot zaxirasidan chegiriladi.`)) {
                // Match materials by type to deduct roll fabric
                // Hudi -> mat-001 (Green Cotton), Futbolka -> mat-002 (White Cotton), Shim -> mat-003 (Poliefir)
                let fabricMatch = null;
                if (est.type === 'Hudi') {
                    fabricMatch = state.materials.find(m => m.id === 'mat-001');
                } else if (est.type === 'Futbolka') {
                    fabricMatch = state.materials.find(m => m.id === 'mat-002');
                } else {
                    fabricMatch = state.materials.find(m => m.id === 'mat-003');
                }

                if (fabricMatch) {
                    if (fabricMatch.miqdori < est.totalFabricKg) {
                        alert(`Omborxonada yetarli mato yo'q! Zaxiradagi paxta/mato: ${fabricMatch.miqdori} kg. Kerakli mato: ${est.totalFabricKg.toFixed(1)} kg.`);
                        return;
                    }
                    fabricMatch.miqdori -= est.totalFabricKg;
                }

                // Create Cutting Log
                const newCut = {
                    id: 'cut-' + String(state.cuts.length + 1).padStart(3, '0'),
                    sana: new Date().toISOString().split('T')[0],
                    nomi: `AI Model ${est.type} (${fabricMatch ? fabricMatch.nomi : 'Mato'})`,
                    turi: est.type,
                    mato_id: fabricMatch ? fabricMatch.id : 'mat-001',
                    ogirlik: est.totalFabricKg,
                    bichilgan_dona: est.qty,
                    chiqindi_pct: +(8 + Math.random() * 2).toFixed(1),
                    masul: "Dilshod Karimov",
                    status: "Bichildi"
                };
                state.cuts.push(newCut);

                // Create production order in status 'Bichildi' (ready for sewing)
                const prodLine = (est.type === 'Hudi') ? 'Liniya A' : (est.type === 'Futbolka' ? 'Liniya B' : 'Liniya C');
                const targetDays = 10;
                const deliveryDate = new Date();
                deliveryDate.setDate(deliveryDate.getDate() + targetDays);

                const newOrder = {
                    id: 'buy-' + String(100 + state.orders.length + 1),
                    mahsulot_nomi: `AI Model ${est.type} (${fabricMatch ? fabricMatch.nomi : 'Mato'})`,
                    turi: est.type,
                    miqdori: est.qty,
                    tayyorlandi: 0,
                    bichildi: est.qty,
                    liniya: prodLine,
                    boshlangan_sana: new Date().toISOString().split('T')[0],
                    topshirish_sana: deliveryDate.toISOString().split('T')[0],
                    status: 'Bichildi'
                };
                state.orders.push(newOrder);
                saveState();

                // Reset dropzone
                const dropPrompt = document.getElementById('dropzone-prompt');
                const scanContainer = document.getElementById('ai-scan-container');
                const scanImg = document.getElementById('ai-scan-img');
                const scannerLine = document.getElementById('scanner-line');
                const detectedCard = document.getElementById('ai-detected-card');
                const worksheetCard = document.getElementById('ai-worksheet-card');
                const placeholder = document.getElementById('ai-placeholder');
                const content = document.getElementById('ai-content');
                const resultsCard = document.getElementById('ai-results-card');

                dropPrompt.style.display = 'flex';
                scanContainer.style.display = 'none';
                scanImg.src = '';
                scannerLine.style.display = 'none';
                detectedCard.style.display = 'none';
                worksheetCard.style.display = 'none';
                placeholder.style.display = 'flex';
                content.style.display = 'none';
                resultsCard.classList.remove('active');
                
                alert("Muvaffaqiyatli! Ishlab chiqarish buyrug'i topshirildi. Ishlab chiqarish bo'limiga o'tasiz.");
                
                // Transition to production tab
                const navLinkProduction = document.querySelector('#main-nav [data-tab="production"]');
                if (navLinkProduction) {
                    navLinkProduction.click();
                }
            }
        });
    }
}


// --- SHOWROOM SAVDOSI LOGIC ---
function renderShowroomSales(query = "") {
    const tbody = document.getElementById('tbody-showroom-sales');
    if (!tbody) return;
    tbody.innerHTML = '';

    state.showroomSales.forEach(sale => {
        if (query && !sale.mijoz.toLowerCase().includes(query.toLowerCase()) && !sale.turi.toLowerCase().includes(query.toLowerCase())) {
            return;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${sale.sana}</td>
            <td><strong>${sale.mijoz}</strong></td>
            <td><span class="badge-row badge-tag-${sale.turi.toLowerCase()}">${sale.turi}</span></td>
            <td><strong>${sale.qty} ta</strong></td>
            <td style="font-weight:700; color:var(--color-won);">${sale.summa.toLocaleString('uz-UZ')} so'm</td>
            <td>${sale.payment}</td>
            <td>
                <button class="btn btn-xs btn-danger" onclick="deleteShowroomSale('${sale.id}')">O'chirish</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderShowroomCatalog() {
    const grid = document.getElementById('showroom-catalog-grid');
    const emptyState = document.getElementById('showroom-empty-state');
    if (!grid || !emptyState) return;

    if (!state.showroomCatalog || state.showroomCatalog.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'block';
        emptyState.innerHTML = `
            <i class="fa-solid fa-folder-open fa-3x" style="margin-bottom: 15px; opacity: 0.5;"></i>
            <p>Katalogda hali mahsulotlar yo'q. AI yordamida tahlil qilib "Showroomga Saqlash" tugmasini bosing.</p>
        `;
        return;
    }

    grid.style.display = 'grid';
    emptyState.style.display = 'none';
    grid.innerHTML = '';

    // Apply Filter logic
    const filter = state.showroomFilter || 'All';
    const filteredCatalog = state.showroomCatalog.filter(item => {
        if (filter === 'All') return true;
        const itemType = (item.type || '').toLowerCase();
        
        if (filter === 'Futbolka') {
            return itemType === 'futbolka';
        }
        if (filter === 'Triko') {
            return itemType === 'triko' || itemType === 'trikotaj';
        }
        if (filter === 'Sportifka') {
            return itemType === 'sport kiyim' || itemType === 'sportifka';
        }
        if (filter === 'Shortik') {
            return itemType === 'shortik' || itemType === 'shim';
        }
        if (filter === 'Kofta') {
            return itemType === 'kofta' || itemType === 'hudi' || itemType === 'kurtka';
        }
        return false;
    });

    if (filteredCatalog.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'block';
        emptyState.innerHTML = `
            <i class="fa-solid fa-filter fa-3x" style="margin-bottom: 15px; opacity: 0.5;"></i>
            <p>Ushbu turdagi mahsulotlar topilmadi. Boshqa filterlarni tanlab ko'ring.</p>
        `;
        return;
    }

    state.showroomCatalog.forEach(item => {
        // Only render if matches the filter
        const isMatched = filteredCatalog.some(f => f.id === item.id);
        if (!isMatched) return;

        const card = document.createElement('div');
        card.className = 'card-glass';
        card.style.padding = '0';
        card.style.overflow = 'hidden';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';

        // Placeholder if no image
        const imgSrc = item.imageSrc || 'https://via.placeholder.com/300x300?text=Kiyim+Rasmi';

        card.innerHTML = `
            <div style="height: 200px; width: 100%; background: #000; overflow: hidden;">
                <img src="${imgSrc}" style="width: 100%; height: 100%; object-fit: cover;" alt="${item.type}">
            </div>
            <div style="padding: 16px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                        <h4 style="margin: 0; font-size: 1.1rem; color: var(--color-won);">${item.type}</h4>
                        <span class="badge" style="background: rgba(255,255,255,0.1); font-size: 0.75rem;">${item.date}</span>
                    </div>
                    <p style="margin: 0 0 16px; font-size: 0.85rem; color: var(--color-text-muted);">Ishlab chiqarish quvvati: ${item.qty || 0} ta</p>
                    
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem;">
                        <span style="color: var(--color-text-muted);">Tannarx (Ulgurji):</span>
                        <strong>${Math.round(item.wholesalePrice || 0).toLocaleString('uz-UZ')} so'm</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 0.9rem;">
                        <span style="color: var(--color-text-muted);">Sotuv (Chakana):</span>
                        <strong style="color: var(--color-blue);">${Math.round(item.retailPrice || 0).toLocaleString('uz-UZ')} so'm</strong>
                    </div>
                </div>
                
                <button class="btn btn-secondary btn-block" style="padding: 8px;" onclick="openEditCatalogModal('${item.id}')">
                    <i class="fa-solid fa-sliders"></i> To'liq Tahrirlash
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function setupShowroomFilter() {
    const filterButtons = document.querySelectorAll('.filter-pill');
    const currentFilter = state.showroomFilter || 'All';

    // Set initial active state from state
    filterButtons.forEach(btn => {
        const filterVal = btn.getAttribute('data-filter');
        if (filterVal === currentFilter) {
            btn.classList.add('active');
            btn.style.background = 'rgba(56, 189, 248, 0.15)';
            btn.style.color = 'var(--color-prospect)';
            btn.style.borderColor = 'rgba(56, 189, 248, 0.3)';
        } else {
            btn.classList.remove('active');
            btn.style.background = 'rgba(255,255,255,0.03)';
            btn.style.color = 'var(--color-text-muted)';
            btn.style.borderColor = 'var(--border-color)';
        }

        btn.addEventListener('click', () => {
            // Remove active styles from all pills
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.style.background = 'rgba(255,255,255,0.03)';
                b.style.color = 'var(--color-text-muted)';
                b.style.borderColor = 'var(--border-color)';
            });

            // Add active styles to clicked pill
            btn.classList.add('active');
            btn.style.background = 'rgba(56, 189, 248, 0.15)';
            btn.style.color = 'var(--color-prospect)';
            btn.style.borderColor = 'rgba(56, 189, 248, 0.3)';

            const selectedVal = btn.getAttribute('data-filter');
            state.showroomFilter = selectedVal;
            saveState();
            renderShowroomCatalog();
        });
    });
}

// Open Edit Modal with full parameters
window.openEditCatalogModal = function(id) {
    const item = state.showroomCatalog.find(i => i.id === id);
    if (!item) return;
    
    // Check if params exist (older saves might not have it)
    const p = item.params || {};
    
    document.getElementById('edit-cat-id').value = id;
    
    // Intelligent Fallback for AI Parameters (for old saves)
    let defSew = 0, defOverlock = 0, defFlatlock = 0, defFolds = 0, defInserts = 0, defPaints = 0, defAccessories = 0, defFabricQty = 0.45;
    
    if (item.type === 'Hudi') {
        defSew=14; defOverlock=10; defFlatlock=4; defFolds=6; defInserts=2; defPaints=1; defAccessories=3; defFabricQty=0.65;
    } else if (item.type === 'Futbolka') {
        defSew=6; defOverlock=4; defFlatlock=2; defFolds=2; defInserts=0; defPaints=1; defAccessories=2; defFabricQty=0.30;
    } else if (item.type === 'Trikotaj') {
        defSew=8; defOverlock=6; defFlatlock=4; defFolds=4; defInserts=0; defPaints=0; defAccessories=2; defFabricQty=0.40;
    } else if (item.type === 'Kurtka') {
        defSew=25; defOverlock=12; defFlatlock=0; defFolds=8; defInserts=3; defPaints=0; defAccessories=6; defFabricQty=0.80;
    } else if (item.type === 'Sport Kiyim') {
        defSew=18; defOverlock=14; defFlatlock=6; defFolds=8; defInserts=2; defPaints=1; defAccessories=4; defFabricQty=0.55;
    } else { // Shim
        defSew=10; defOverlock=8; defFlatlock=0; defFolds=4; defInserts=1; defPaints=0; defAccessories=2; defFabricQty=0.45;
    }
    
    document.getElementById('edit-param-sew').value = p.paramSew !== undefined ? p.paramSew : defSew;
    document.getElementById('edit-param-overlock').value = p.paramOverlock !== undefined ? p.paramOverlock : defOverlock;
    document.getElementById('edit-param-flatlock').value = p.paramFlatlock !== undefined ? p.paramFlatlock : defFlatlock;
    document.getElementById('edit-param-folds').value = p.paramFolds !== undefined ? p.paramFolds : defFolds;
    document.getElementById('edit-param-inserts').value = p.paramInserts !== undefined ? p.paramInserts : defInserts;
    document.getElementById('edit-param-paints').value = p.paramPaints !== undefined ? p.paramPaints : defPaints;
    document.getElementById('edit-param-accessories').value = p.paramAccessories !== undefined ? p.paramAccessories : defAccessories;
    
    // Cost Parameters (Fallback to standard defaults if old)
    document.getElementById('edit-cost-fabric-qty').value = p.costFabricQty || defFabricQty;
    document.getElementById('edit-cost-sew').value = p.costSew || 500;
    document.getElementById('edit-cost-overlock').value = p.costOverlock || 600;
    document.getElementById('edit-cost-flatlock').value = p.costFlatlock || 800;
    document.getElementById('edit-cost-folds').value = p.costFolds || 400;
    document.getElementById('edit-cost-inserts').value = p.costInserts || 1500;
    document.getElementById('edit-cost-paints').value = p.costPaints || 3000;
    document.getElementById('edit-cost-accessories').value = p.costAccessories || 2500;
    document.getElementById('edit-cost-fabric-price').value = p.costFabricPrice || 150000;
    document.getElementById('edit-cost-electricity').value = p.costElectricity || 1000;
    document.getElementById('edit-cost-packaging').value = p.costPackaging || 1500;

    openModal('modal-edit-catalog');
};

// Save changes from Edit Modal
window.saveEditedCatalogItem = function() {
    const id = document.getElementById('edit-cat-id').value;
    const item = state.showroomCatalog.find(i => i.id === id);
    if (!item) return;

    // Read back values
    const p = {
        paramSew: parseFloat(document.getElementById('edit-param-sew').value) || 0,
        paramOverlock: parseFloat(document.getElementById('edit-param-overlock').value) || 0,
        paramFlatlock: parseFloat(document.getElementById('edit-param-flatlock').value) || 0,
        paramFolds: parseFloat(document.getElementById('edit-param-folds').value) || 0,
        paramInserts: parseFloat(document.getElementById('edit-param-inserts').value) || 0,
        paramPaints: parseFloat(document.getElementById('edit-param-paints').value) || 0,
        paramAccessories: parseFloat(document.getElementById('edit-param-accessories').value) || 0,
        
        costFabricQty: parseFloat(document.getElementById('edit-cost-fabric-qty').value) || 0,
        costSew: parseFloat(document.getElementById('edit-cost-sew').value) || 0,
        costOverlock: parseFloat(document.getElementById('edit-cost-overlock').value) || 0,
        costFlatlock: parseFloat(document.getElementById('edit-cost-flatlock').value) || 0,
        costFolds: parseFloat(document.getElementById('edit-cost-folds').value) || 0,
        costInserts: parseFloat(document.getElementById('edit-cost-inserts').value) || 0,
        costPaints: parseFloat(document.getElementById('edit-cost-paints').value) || 0,
        costAccessories: parseFloat(document.getElementById('edit-cost-accessories').value) || 0,
        costFabricPrice: parseFloat(document.getElementById('edit-cost-fabric-price').value) || 0,
        costElectricity: parseFloat(document.getElementById('edit-cost-electricity').value) || 0,
        costPackaging: parseFloat(document.getElementById('edit-cost-packaging').value) || 0
    };

    // Calculate new costs
    const laborPerPiece = (p.paramSew * p.costSew) + (p.paramOverlock * p.costOverlock) + 
                          (p.paramFlatlock * p.costFlatlock) + (p.paramFolds * p.costFolds) + 
                          (p.paramInserts * p.costInserts);
    const paintCostPerPiece = p.paramPaints * p.costPaints;
    const accessoryCostPerPiece = p.paramAccessories * p.costAccessories;
    const fabricCostPerPiece = p.costFabricQty * p.costFabricPrice;

    const unitCost = laborPerPiece + paintCostPerPiece + accessoryCostPerPiece + fabricCostPerPiece + p.costElectricity + p.costPackaging;
    const wholesalePrice = unitCost * 1.35;
    const retailPrice = unitCost * 1.60;

    // Update item
    item.params = p;
    item.wholesalePrice = wholesalePrice;
    item.retailPrice = retailPrice;
    item.totalProductionCost = unitCost * item.qty;

    saveState();
    closeModal('modal-edit-catalog');
    renderShowroomCatalog();
    alert("O'zgarishlar muvaffaqiyatli saqlandi! Narxlar qayta hisoblandi.");
};

function setupShowroomSale() {
    const form = document.getElementById('form-showroom-sale');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const clientName = document.getElementById('show-client').value;
        const type = document.getElementById('show-type').value;
        const qty = parseInt(document.getElementById('show-qty').value) || 1;
        const payment = document.getElementById('show-payment').value;

        const currentStock = state.showroomStock[type] || 0;
        if (qty > currentStock) {
            alert(`Sotish uchun shourumda yetarli mahsulot yo'q! Qoldiq: ${currentStock} ta.`);
            return;
        }

        let unitPrice = 150000; 
        if (type === 'Hudi') unitPrice = 350000;
        else if (type === 'Shim') unitPrice = 220000;

        const totalSum = qty * unitPrice;
        state.showroomStock[type] -= qty;

        const newSale = {
            id: 'shw-' + String(state.showroomSales.length + 1).padStart(3, '0'),
            sana: new Date().toISOString().split('T')[0],
            mijoz: clientName,
            turi: type,
            qty,
            summa: totalSum,
            payment
        };

        state.showroomSales.push(newSale);
        saveState();
        updateUI();

        form.reset();
        alert("Shourum chakana savdosi muvaffaqiyatli amalga oshirildi!");
    });
}

window.deleteShowroomSale = function(saleId) {
    const sale = state.showroomSales.find(s => s.id === saleId);
    if (sale) {
        if (confirm("Ushbu chakana savdo amalini o'chirishni istaysizmi?\nShourum zaxirasi qayta tiklanadi.")) {
            state.showroomStock[sale.turi] = (state.showroomStock[sale.turi] || 0) + sale.qty;
            state.showroomSales = state.showroomSales.filter(s => s.id !== saleId);
            saveState();
            updateUI();
        }
    }
};


// --- OMBOR-TAMINOT Rendering ---
function renderWarehouse(query = "") {
    const tbody = document.getElementById('tbody-warehouse');
    const lowStockContainer = document.getElementById('low-stock-container');
    if (!tbody) return;

    tbody.innerHTML = '';
    lowStockContainer.innerHTML = '';

    state.materials.forEach(mat => {
        if (query && !mat.nomi.toLowerCase().includes(query.toLowerCase()) && !mat.turi.toLowerCase().includes(query.toLowerCase())) {
            return;
        }

        let ecoBadgeClass = 'badge-eco-b';
        if (mat.ekologik_ball === 'A+') ecoBadgeClass = 'badge-eco-aplus';
        else if (mat.ekologik_ball === 'A') ecoBadgeClass = 'badge-eco-a';
        else if (mat.ekologik_ball === 'B+') ecoBadgeClass = 'badge-eco-bplus';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><code>${mat.id}</code></td>
            <td><strong>${mat.nomi}</strong></td>
            <td><span class="badge-row" style="background:rgba(255,255,255,0.05);">${mat.turi}</span></td>
            <td>${mat.rangi || '-'}</td>
            <td><strong style="${mat.miqdori < 15 ? 'color:var(--color-red)' : ''}">${mat.miqdori}</strong></td>
            <td>${mat.birligi}</td>
            <td>$${mat.narxi.toFixed(2)}</td>
            <td><span class="badge-row ${ecoBadgeClass}">${mat.ekologik_ball}</span></td>
            <td>
                <button class="btn btn-xs btn-danger" onclick="deleteMaterial('${mat.id}')">O'chirish</button>
            </td>
        `;
        tbody.appendChild(tr);

        if (mat.miqdori < 15) {
            const item = document.createElement('div');
            item.className = 'low-stock-item';
            item.innerHTML = `
                <div class="low-stock-info">
                    <h4>${mat.nomi}</h4>
                    <p>Turi: ${mat.turi} | Rang: ${mat.rangi || '-'}</p>
                </div>
                <div class="low-stock-qty">${mat.miqdori} ${mat.birligi}</div>
            `;
            lowStockContainer.appendChild(item);
        }
    });

    if (lowStockContainer.innerHTML === '') {
        lowStockContainer.innerHTML = '<div class="low-stock-info" style="border:none;"><p>Barcha zaxiralar me\'yorida.</p></div>';
    }
}

window.deleteMaterial = function(id) {
    if (confirm("Xomashyoni ro'yxatdan o'chirmoqchimisiz?")) {
        state.materials = state.materials.filter(m => m.id !== id);
        saveState();
        updateUI();
    }
};


// --- BICHUV Rendering ---
function renderCutting(query = "") {
    const tbody = document.getElementById('tbody-cutting');
    if (!tbody) return;
    tbody.innerHTML = '';

    let totalWeight = 0;
    let totalPieces = 0;

    state.cuts.forEach(cut => {
        if (query && !cut.nomi.toLowerCase().includes(query.toLowerCase()) && !cut.turi.toLowerCase().includes(query.toLowerCase())) {
            return;
        }

        totalWeight += cut.ogirlik;
        totalPieces += cut.bichilgan_dona;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cut.sana}</td>
            <td><strong>${cut.nomi}</strong></td>
            <td>${cut.turi}</td>
            <td><code>${cut.mato_id}</code></td>
            <td>${cut.ogirlik} kg</td>
            <td><strong>${cut.bichilgan_dona} ta</strong></td>
            <td style="color:var(--color-qualified);">${cut.chiqindi_pct}%</td>
            <td>${cut.masul}</td>
            <td><span class="badge-row badge-status-bichildi">${cut.status}</span></td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('cut-total-used').innerText = `${totalWeight} kg`;
    document.getElementById('cut-total-pieces').innerText = `${totalPieces} ta`;
}


// --- ISHLAB CHIQARISH Rendering ---
// ====================================================================
//  TIKUV KONVEYERI — KANBAN (SortableJS drag-and-drop)
// ====================================================================

let kanbanSortables = [];

// Foydalanuvchi sozlagan bosqichlar (yo'q bo'lsa standartdan tiklanadi)
function getStages() {
    if (!Array.isArray(state.stages) || state.stages.length === 0) {
        state.stages = JSON.parse(JSON.stringify(DEFAULT_STAGES));
    }
    return state.stages;
}

// Bosqichi mavjud bo'lmagan kartalarni birinchi bosqichga qaytaramiz (yo'qolib qolmasligi uchun)
function reconcileKanbanStages() {
    const stages = getStages();
    const valid = new Set(stages.map(s => s.id));
    let changed = false;
    (state.kanban || []).forEach(k => {
        if (!valid.has(k.stage)) { k.stage = stages[0].id; changed = true; }
    });
    if (changed) saveState();
}

// --- Vaqt yordamchilari ---
function isoFromMs(ms) {
    const d = new Date(ms);
    d.setSeconds(0, 0);
    const off = d.getTimezoneOffset();
    return new Date(d.getTime() - off * 60000).toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm (mahalliy)
}
function nowISO() { return isoFromMs(Date.now()); }

// Boshlang'ich kartalarga real tarix (yakunlangan bosqichlar + ishchilar + vaqt) yaratish
function buildSeedHistories() {
    if (!Array.isArray(state.kanban)) return;
    const stages = getStages();
    const pool = (state.workers || [])
        .filter(w => (w.lavozim || '').toLowerCase().includes('tikuvchi'))
        .map(w => w.ism);
    const names = pool.length ? pool : ['Tikuvchi'];
    let pi = 0;
    const HOUR = 3600 * 1000;
    state.kanban.forEach((item, ii) => {
        if (Array.isArray(item.history) && item.history.length) return; // mavjud tarixga tegmaymiz
        const idx = stages.findIndex(s => s.id === item.stage);
        if (idx < 0) return;
        const hist = [];
        let t = Date.now() - (idx + 1) * 3 * HOUR - ii * 0.5 * HOUR;
        for (let s = 0; s <= idx; s++) {
            const stage = stages[s];
            const worker = names[pi++ % names.length];
            const isOpen = (s === idx);
            const dur = (2 + (s % 3)) * HOUR; // 2-4 soat
            const end = isOpen ? null : t + dur;
            hist.push({
                stageId: stage.id, stageName: stage.nomi, worker,
                qty: item.miqdori,
                start: isoFromMs(t),
                end: end != null ? isoFromMs(end) : null
            });
            t = (end != null) ? end : t;
        }
        item.history = hist;
        item.masul = hist[hist.length - 1].worker;
    });
    saveState();
}
function fmtTime(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    if (isNaN(d)) return '—';
    return d.toLocaleString('uz-UZ', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });
}
function fmtDuration(ms) {
    if (ms == null || ms < 0) return '—';
    const min = Math.floor(ms / 60000);
    if (min < 1) return '1 daq.';
    if (min < 60) return min + ' daq.';
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h < 24) return m ? `${h} s ${m} daq.` : `${h} soat`;
    const d = Math.floor(h / 24);
    return `${d} kun ${h % 24} s`;
}
function elapsedText(start, end) {
    if (!start) return '—';
    const ms = (end ? new Date(end) : new Date()) - new Date(start);
    return fmtDuration(ms);
}
// Har bir kartada bosqichlar tarixi bo'lishini ta'minlash
function ensureHistory(item) {
    if (!Array.isArray(item.history) || item.history.length === 0) {
        const st = getStages().find(s => s.id === item.stage) || getStages()[0];
        item.history = [{
            stageId: item.stage,
            stageName: st ? st.nomi : item.stage,
            worker: item.masul || '—',
            qty: item.miqdori || 0,
            start: item._start || nowISO(),
            end: null
        }];
    }
}
function currentEntry(item) {
    if (!Array.isArray(item.history)) return null;
    return item.history.find(h => h.end === null) || item.history[item.history.length - 1];
}

function renderKanban() {
    const board = document.getElementById('kanban-board');
    if (!board) return;

    // Eski Sortable instansiyalarini tozalash (xotira oqishining oldini olish)
    kanbanSortables.forEach(s => { try { s.destroy(); } catch (e) {} });
    kanbanSortables = [];
    board.innerHTML = '';

    if (!Array.isArray(state.kanban)) state.kanban = [];
    const stages = getStages();
    reconcileKanbanStages();
    state.kanban.forEach(ensureHistory);

    stages.forEach((stage, stageIdx) => {
        const items = state.kanban.filter(k => k.stage === stage.id);

        const col = document.createElement('div');
        col.className = 'kanban-column';
        col.dataset.stage = stage.id;
        col.style.setProperty('--col-accent', stage.color);
        col.innerHTML = `
            <div class="kanban-col-header">
                <div class="kch-left">
                    <span class="kch-icon"><i class="fa-solid ${stage.icon}"></i></span>
                    <span class="kch-title">${stage.nomi}</span>
                </div>
                <span class="kanban-count">${items.length}</span>
            </div>
            <div class="kanban-body" data-stage="${stage.id}"></div>
        `;

        const body = col.querySelector('.kanban-body');
        items.forEach(item => body.appendChild(buildKanbanCard(item, stageIdx)));
        if (items.length === 0) body.appendChild(buildKanbanEmpty());
        board.appendChild(col);

        // SortableJS yuklangan bo'lsa drag-and-drop yoqamiz.
        // Agar CDN yuklanmasa ham kartalar ko'rinaveradi (← / → tugmalari orqali siljitiladi).
        if (typeof Sortable !== 'undefined') {
            try {
                const sortable = Sortable.create(body, {
                    group: 'eco-kanban',
                    animation: 170,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    ghostClass: 'kanban-card-ghost',
                    chosenClass: 'kanban-card-chosen',
                    dragClass: 'kanban-card-drag',
                    filter: '.kanban-empty',
                    onStart: () => board.classList.add('is-dragging'),
                    onEnd: (evt) => {
                        board.classList.remove('is-dragging');
                        const id = evt.item.dataset.id;
                        const fromStage = evt.from.dataset.stage;
                        const toStage = evt.to.dataset.stage;
                        if (fromStage === toStage) {
                            // shu ustun ichida tartiblash
                            syncKanbanFromDOM();
                            setTimeout(renderKanban, 0);
                        } else {
                            // boshqa bosqichga ko'chdi -> ishchi+vaqt so'raymiz (state tasdiqlangach o'zgaradi)
                            openAssignModal(id, toStage, fromStage);
                        }
                    }
                });
                kanbanSortables.push(sortable);
            } catch (e) {
                console.warn('Kanban drag yoqilmadi:', e);
            }
        }
    });

    updateKanbanSummary();
    populateKanbanMasul();
}

function buildKanbanCard(item, stageIdx) {
    const div = document.createElement('div');
    div.className = 'kanban-card prio-' + (item.prio || 'normal');
    div.dataset.id = item.id;

    const dl = formatKanbanDeadline(item.deadline);
    const prioLabel = item.prio === 'high' ? 'Shoshilinch' : (item.prio === 'low' ? 'Past' : 'Oddiy');
    const typeSlug = (item.turi || '').toLowerCase().replace(/[^a-z]/g, '');

    const backBtn = stageIdx > 0
        ? `<button class="kc-nav" title="Orqaga qaytarish" onclick="event.stopPropagation(); moveKanban('${item.id}', -1)"><i class="fa-solid fa-arrow-left"></i></button>`
        : `<span class="kc-nav-spacer"></span>`;
    const isLast = stageIdx === getStages().length - 1;
    const fwdBtn = !isLast
        ? `<button class="kc-nav kc-fwd" title="Keyingi bosqichga topshirish" onclick="event.stopPropagation(); moveKanban('${item.id}', 1)"><i class="fa-solid fa-arrow-right"></i></button>`
        : `<button class="kc-nav kc-pdf" title="Mahsulot pasporti (PDF)" onclick="event.stopPropagation(); generatePassportPDF('${item.id}')"><i class="fa-solid fa-file-pdf"></i></button>`;

    // Joriy bosqichdagi ishchi va o'tgan vaqt
    const cur = currentEntry(item);
    const curWorker = cur ? cur.worker : (item.masul || '—');
    const startISO = cur ? cur.start : null;

    div.innerHTML = `
        <div class="kc-top">
            <span class="kc-type kc-type-${typeSlug}">${item.turi}</span>
            ${item.prio !== 'normal' ? `<span class="kc-prio kc-prio-${item.prio}">${prioLabel}</span>` : ''}
        </div>
        <h4 class="kc-title">${item.model}</h4>
        <div class="kc-meta">
            <span class="kc-chip"><i class="fa-solid fa-shirt"></i> ${item.miqdori} dona</span>
            <span class="kc-chip"><i class="fa-solid fa-diagram-project"></i> ${item.liniya}</span>
            <span class="kc-chip ${dl.cls}"><i class="fa-regular fa-flag"></i> ${dl.text}</span>
        </div>
        <div class="kc-foot">
            <span class="kc-worker" title="${curWorker}"><i class="fa-solid fa-user-gear"></i> ${curWorker}</span>
            <span class="kc-elapsed" data-start="${startISO || ''}" title="Shu bosqichda"><i class="fa-regular fa-clock"></i> ${elapsedText(startISO, null)}</span>
        </div>
        <div class="kc-actions">
            ${backBtn}
            <button class="kc-del" title="O'chirish" onclick="event.stopPropagation(); deleteKanban('${item.id}')"><i class="fa-solid fa-trash-can"></i></button>
            ${fwdBtn}
        </div>
    `;
    div.addEventListener('click', () => openHistory(item.id));
    return div;
}

function buildKanbanEmpty() {
    const el = document.createElement('div');
    el.className = 'kanban-empty';
    el.innerHTML = `<i class="fa-solid fa-inbox"></i><span>Bo'sh — bu yerga sudrang</span>`;
    return el;
}

function formatKanbanDeadline(deadline) {
    if (!deadline) return { text: '—', cls: '' };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dl = new Date(deadline);
    dl.setHours(0, 0, 0, 0);
    const days = Math.round((dl - today) / (1000 * 60 * 60 * 24));
    if (days < 0)  return { text: Math.abs(days) + ' kun kechikdi', cls: 'dl-over' };
    if (days === 0) return { text: 'Bugun', cls: 'dl-urgent' };
    if (days <= 2) return { text: days + ' kun qoldi', cls: 'dl-urgent' };
    if (days <= 5) return { text: days + ' kun qoldi', cls: 'dl-soon' };
    return { text: days + ' kun qoldi', cls: 'dl-ok' };
}

// Drag tugagandan keyin DOM tartibini state'ga ko'chirish
function syncKanbanFromDOM() {
    const newOrder = [];
    document.querySelectorAll('#kanban-board .kanban-column').forEach(col => {
        const stageId = col.dataset.stage;
        col.querySelectorAll('.kanban-card').forEach(cardEl => {
            const item = state.kanban.find(k => k.id === cardEl.dataset.id);
            if (item) {
                item.stage = stageId;
                newOrder.push(item);
            }
        });
    });
    state.kanban = newOrder;
    saveState();
}

function updateKanbanSummary() {
    if (!Array.isArray(state.kanban)) return;
    const stages = getStages();
    const lastStageId = stages.length ? stages[stages.length - 1].id : 'tayyor';
    const total = state.kanban.length;
    const done = state.kanban.filter(k => k.stage === lastStageId).length;
    const progress = total - done;
    const qty = state.kanban.reduce((s, k) => s + (Number(k.miqdori) || 0), 0);

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    set('ks-total', total);
    set('ks-progress', progress);
    set('ks-done', done);
    set('ks-qty', qty.toLocaleString('uz-UZ'));
}

function populateKanbanMasul() {
    const sel = document.getElementById('kanban-masul');
    if (!sel) return;
    const tikuvchilar = (state.workers || []).filter(w => (w.lavozim || '').toLowerCase().includes('tikuvchi'));
    sel.innerHTML = tikuvchilar.length
        ? tikuvchilar.map(w => `<option value="${w.ism}">${w.ism} (${w.liniya})</option>`).join('')
        : `<option value="—">— Tikuvchi yo'q —</option>`;
}

// Kartani bosqichlar bo'ylab oldinga/orqaga surish
window.moveKanban = function(id, dir) {
    const item = state.kanban.find(k => k.id === id);
    if (!item) return;
    const stages = getStages();
    const idx = stages.findIndex(s => s.id === item.stage);
    const next = idx + dir;
    if (next < 0 || next >= stages.length) return;
    // To'g'ridan-to'g'ri ko'chirmaymiz — ishchi va vaqtni so'raymiz
    openAssignModal(id, stages[next].id, item.stage);
};

window.deleteKanban = function(id) {
    const item = state.kanban.find(k => k.id === id);
    if (!item) return;
    if (!confirm(`"${item.model}" partiyasini konveyerdan o'chirmoqchimisiz?`)) return;
    state.kanban = state.kanban.filter(k => k.id !== id);
    saveState();
    renderKanban();
};

function setupKanban() {
    const form = document.getElementById('form-kanban');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const item = {
            id: 'k-' + Date.now(),
            model: document.getElementById('kanban-model').value.trim(),
            turi: document.getElementById('kanban-turi').value,
            miqdori: parseInt(document.getElementById('kanban-qty').value, 10) || 0,
            liniya: document.getElementById('kanban-liniya').value,
            masul: document.getElementById('kanban-masul').value,
            deadline: document.getElementById('kanban-deadline').value,
            prio: document.getElementById('kanban-prio').value,
            stage: getStages()[0].id,
            _start: nowISO()
        };
        ensureHistory(item);
        if (!Array.isArray(state.kanban)) state.kanban = [];
        state.kanban.push(item);
        saveState();
        form.reset();
        closeModal('modal-kanban');
        renderKanban();
    });

    // Topshirish formasi
    const assignForm = document.getElementById('form-assign');
    if (assignForm) assignForm.addEventListener('submit', submitAssign);

    // Joriy bosqichdagi "o'tgan vaqt"ni har daqiqada yangilash
    setInterval(updateKanbanElapsed, 60000);

    // Topshirish modali overlay bosib yopilsa — kartani joyiga qaytaramiz
    const am = document.getElementById('modal-assign');
    if (am) am.addEventListener('click', (e) => {
        if (e.target === am && _assignPending) { _assignPending = false; renderKanban(); }
    });
}

// --- Ishni keyingi bo'limga topshirish (ishchi + vaqt) ---
let _assignPending = false;

function openAssignModal(id, toStageId, fromStageId) {
    const item = state.kanban.find(k => k.id === id);
    if (!item) return;
    const stages = getStages();
    const toStage = stages.find(s => s.id === toStageId);
    const fromStage = stages.find(s => s.id === fromStageId);
    if (!toStage) return;

    document.getElementById('assign-id').value = id;
    document.getElementById('assign-to-stage').value = toStageId;
    document.getElementById('assign-from-stage').value = fromStageId || '';

    document.getElementById('assign-route').innerHTML = `
        <div class="ar-model">${item.model} <span class="ar-qty">${item.miqdori} dona</span></div>
        <div class="ar-flow">
            <span class="ar-from">${fromStage ? fromStage.nomi : "Boshlang'ich"}</span>
            <i class="fa-solid fa-arrow-right-long"></i>
            <span class="ar-to" style="color:${toStage.color}">${toStage.nomi}</span>
        </div>`;

    // ishchilar ro'yxati
    const sel = document.getElementById('assign-worker');
    const tikuvchilar = (state.workers || []).filter(w => (w.lavozim || '').toLowerCase().includes('tikuvchi'));
    sel.innerHTML = (tikuvchilar.length ? tikuvchilar : [{ ism: 'Tikuvchi', liniya: '-' }])
        .map(w => `<option value="${w.ism}">${w.ism} (${w.liniya})</option>`).join('');

    document.getElementById('assign-qty').value = item.miqdori || 0;
    document.getElementById('assign-time').value = nowISO();

    _assignPending = true;
    openModal('modal-assign');
}

function submitAssign(e) {
    e.preventDefault();
    const id = document.getElementById('assign-id').value;
    const toStageId = document.getElementById('assign-to-stage').value;
    const worker = document.getElementById('assign-worker').value;
    const qty = parseInt(document.getElementById('assign-qty').value, 10) || 0;
    const time = document.getElementById('assign-time').value || nowISO();

    const item = state.kanban.find(k => k.id === id);
    if (!item) { closeModal('modal-assign'); return; }
    ensureHistory(item);

    // joriy ochiq bosqichni yopamiz (tugadi)
    const open = item.history.find(h => h.end === null);
    if (open) open.end = time;

    // yangi bosqichni boshlaymiz
    const st = getStages().find(s => s.id === toStageId);
    item.history.push({
        stageId: toStageId,
        stageName: st ? st.nomi : toStageId,
        worker: worker,
        qty: qty,
        start: time,
        end: null
    });
    item.stage = toStageId;
    item.masul = worker;

    _assignPending = false;
    saveState();
    closeModal('modal-assign');
    renderKanban();
    if (typeof window.refreshWorkshop === 'function') window.refreshWorkshop();
}

// Bekor qilinsa — holatni qayta chizamiz (drag bo'lsa karta joyiga qaytadi)
window.cancelAssign = function () {
    _assignPending = false;
    closeModal('modal-assign');
    renderKanban();
};

// Karta bosilganda — to'liq ish yo'li (timeline)
window.openHistory = function (id) {
    const item = state.kanban.find(k => k.id === id);
    if (!item) return;
    ensureHistory(item);

    const stages = getStages();
    const isFinal = stages.length && item.stage === stages[stages.length - 1].id;

    document.getElementById('history-head').innerHTML = `
        <div class="hh-title">${item.model}</div>
        <div class="hh-sub">${item.turi} · ${item.miqdori} dona · ${item.liniya}</div>
        ${isFinal ? `<button class="btn btn-primary btn-block" style="margin-top:14px;" onclick="generatePassportPDF('${item.id}')"><i class="fa-solid fa-file-pdf"></i> Mahsulot Pasportini yuklab olish (PDF)</button>` : ''}`;

    const rows = item.history.map((h, i) => {
        const st = stages.find(s => s.id === h.stageId);
        const color = st ? st.color : '#8c93a8';
        const dur = h.end ? fmtDuration(new Date(h.end) - new Date(h.start)) : `<span class="tl-live">davom etmoqda · ${elapsedText(h.start, null)}</span>`;
        return `
            <div class="tl-item">
                <div class="tl-dot" style="background:${color}"></div>
                <div class="tl-body">
                    <div class="tl-stage">${h.stageName}</div>
                    <div class="tl-meta"><i class="fa-solid fa-user-gear"></i> ${h.worker} &nbsp;·&nbsp; <i class="fa-solid fa-shirt"></i> ${h.qty} dona</div>
                    <div class="tl-times">
                        <span><i class="fa-regular fa-clock"></i> Berildi: <b>${fmtTime(h.start)}</b></span>
                        <span><i class="fa-solid fa-flag-checkered"></i> Tugadi: <b>${h.end ? fmtTime(h.end) : '—'}</b></span>
                    </div>
                    <div class="tl-dur"><i class="fa-solid fa-hourglass-half"></i> Davomiyligi: ${dur}</div>
                </div>
            </div>`;
    }).join('');

    document.getElementById('history-timeline').innerHTML = rows || '<p style="color:var(--color-text-muted)">Tarix yo\'q.</p>';
    openModal('modal-history');
};

// --- MAHSULOT PASPORTI (PDF) ---
window.generatePassportPDF = function (id) {
    const item = state.kanban.find(k => k.id === id);
    if (!item) return;
    if (!window.jspdf || !window.jspdf.jsPDF) {
        alert("PDF kutubxonasi yuklanmadi. Internet aloqasini tekshiring.");
        return;
    }
    ensureHistory(item);
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const W = 210;
    const green = [52, 211, 153], dark = [12, 13, 20], muted = [120, 128, 150];

    // --- Sarlavha paneli ---
    doc.setFillColor(...dark);
    doc.rect(0, 0, W, 34, 'F');
    doc.setTextColor(...green);
    doc.setFont('helvetica', 'bold'); doc.setFontSize(22);
    doc.text('ECO SPORTS', 14, 16);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(11);
    doc.text('Ishlab Chiqarish — MAHSULOT PASPORTI', 14, 24);
    doc.setFontSize(9); doc.setTextColor(180, 188, 205);
    doc.text('Ekologik toza sport kiyimlari ishlab chiqarish', 14, 30);

    // Pasport raqami + sana (o'ng yuqori)
    const passNo = 'ECO-' + String(item.id).replace(/[^a-z0-9]/gi, '').toUpperCase();
    doc.setTextColor(255, 255, 255); doc.setFontSize(10);
    doc.text('Pasport No: ' + passNo, W - 14, 14, { align: 'right' });
    doc.text('Sana: ' + fmtTime(nowISO()), W - 14, 20, { align: 'right' });

    // --- Mahsulot ma'lumotlari ---
    let y = 46;
    doc.setTextColor(...dark); doc.setFont('helvetica', 'bold'); doc.setFontSize(15);
    doc.text(item.model, 14, y);
    y += 8;
    doc.setDrawColor(...green); doc.setLineWidth(0.8); doc.line(14, y, W - 14, y);
    y += 8;

    const info = [
        ['Mahsulot turi', item.turi || '—'],
        ['Buyurtma soni', (item.miqdori || 0) + ' dona'],
        ['Ishlab chiqarish liniyasi', item.liniya || '—'],
        ['Topshirish muddati', item.deadline || '—'],
        ['Holati', 'TAYYOR MAHSULOT'],
        ['Sifat darajasi', 'A+ · OEKO-TEX standarti']
    ];
    doc.setFontSize(10.5);
    info.forEach((r, i) => {
        const col = i % 2;
        const x = 14 + col * 98;
        const ry = y + Math.floor(i / 2) * 9;
        doc.setFont('helvetica', 'normal'); doc.setTextColor(...muted);
        doc.text(r[0] + ':', x, ry);
        doc.setFont('helvetica', 'bold'); doc.setTextColor(40, 44, 60);
        doc.text(String(r[1]), x + 42, ry);
    });
    y += Math.ceil(info.length / 2) * 9 + 6;

    // --- Ishlab chiqarish yo'li (jadval) ---
    doc.setFont('helvetica', 'bold'); doc.setFontSize(12); doc.setTextColor(...dark);
    doc.text('Ishlab chiqarish yo\'li (bosqichlar jurnali)', 14, y);
    y += 3;

    const rows = item.history.map((h, i) => {
        const dur = h.end ? fmtDuration(new Date(h.end) - new Date(h.start)) : 'davom etmoqda';
        return [String(i + 1), h.stageName, h.worker || '—', (h.qty || 0) + ' dona', fmtTime(h.start), h.end ? fmtTime(h.end) : '—', dur];
    });

    doc.autoTable({
        startY: y + 3,
        head: [['#', 'Bosqich', 'Ishchi', 'Soni', 'Berildi', 'Tugadi', 'Davomiyligi']],
        body: rows,
        theme: 'grid',
        styles: { fontSize: 9, cellPadding: 2.5, textColor: [40, 44, 60], lineColor: [225, 228, 238] },
        headStyles: { fillColor: dark, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
        alternateRowStyles: { fillColor: [244, 247, 250] },
        columnStyles: { 0: { cellWidth: 8, halign: 'center' }, 3: { halign: 'center' } }
    });

    let fy = doc.lastAutoTable.finalY + 8;

    // --- Jami vaqt ---
    const first = item.history[0];
    const lastH = item.history[item.history.length - 1];
    const totalMs = (lastH.end ? new Date(lastH.end) : new Date()) - new Date(first.start);
    doc.setFillColor(244, 247, 250);
    doc.rect(14, fy, W - 28, 16, 'F');
    doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(...dark);
    doc.text('Jami ishlab chiqarish vaqti: ' + fmtDuration(totalMs), 18, fy + 7);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(...muted);
    doc.text('Bosqichlar soni: ' + item.history.length + ' ta', 18, fy + 12.5);
    fy += 26;

    // --- Imzo joylari ---
    doc.setDrawColor(180, 188, 205); doc.setLineWidth(0.4);
    doc.line(18, fy + 12, 88, fy + 12);
    doc.line(122, fy + 12, 192, fy + 12);
    doc.setFontSize(9); doc.setTextColor(...muted);
    doc.text('Bo\'lim boshlig\'i', 18, fy + 17);
    doc.text('Sifat nazorati (QC)', 122, fy + 17);

    // --- Footer ---
    doc.setFontSize(8); doc.setTextColor(170, 176, 195);
    doc.text('Ushbu pasport Eco Sports ishlab chiqarish tizimi tomonidan avtomatik yaratildi · ' + fmtTime(nowISO()),
        W / 2, 287, { align: 'center' });

    doc.save('Pasport_' + passNo + '.pdf');
};

// Kartalardagi "o'tgan vaqt"ni jonli yangilash (to'liq qayta chizmasdan)
function updateKanbanElapsed() {
    document.querySelectorAll('.kc-elapsed[data-start]').forEach(el => {
        const start = el.getAttribute('data-start');
        if (!start) return;
        el.innerHTML = `<i class="fa-regular fa-clock"></i> ${elapsedText(start, null)}`;
    });
}


// ====================================================================
//  KONVEYER QURUVCHI (Pipeline Builder) — bosqich zanjirini loyihalash
// ====================================================================

const BUILDER_ICONS = [
    'fa-scissors','fa-grip-lines','fa-wallet','fa-ruler-horizontal','fa-align-justify',
    'fa-mitten','fa-shirt','fa-text-width','fa-circle-check','fa-vest-patches','fa-socks',
    'fa-spray-can','fa-fire','fa-box-open','fa-tag','fa-thumbtack','fa-snowflake','fa-gem',
    'fa-industry','fa-temperature-high','fa-paint-roller','fa-wand-magic-sparkles','fa-bahai','fa-shoe-prints'
];
const BUILDER_PALETTE = [
    '#38bdf8','#22d3ee','#818cf8','#a78bfa','#c084fc','#f472b6',
    '#fb923c','#fbbf24','#34d399','#f87171','#2dd4bf','#facc15'
];

let builderSortable = null;

function kbEscape(str) {
    return String(str == null ? '' : str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function renderBuilder() {
    const chain = document.getElementById('builder-chain');
    if (!chain) return;
    const stages = getStages();

    if (builderSortable) { try { builderSortable.destroy(); } catch (e) {} builderSortable = null; }

    chain.innerHTML = stages.map((s, idx) => {
        const cnt = (state.kanban || []).filter(k => k.stage === s.id).length;
        const swatches = BUILDER_PALETTE.map(c =>
            `<span class="cb-swatch ${c === s.color ? 'active' : ''}" data-act="color" data-id="${s.id}" data-color="${c}" style="background:${c}"></span>`
        ).join('');
        return `
        <div class="chain-block" data-id="${s.id}" style="--blk:${s.color}; --i:${idx};">
            <div class="cb-top">
                <span class="cb-grip" title="Sudrab tartiblang"><i class="fa-solid fa-grip-vertical"></i></span>
                <span class="cb-num">${idx + 1}</span>
                <button class="cb-del" data-act="del" data-id="${s.id}" title="Bosqichni o'chirish"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <button class="cb-icon" data-act="icon" data-id="${s.id}" title="Ikonkani o'zgartirish"><i class="fa-solid ${s.icon}"></i></button>
            <input class="cb-name" data-id="${s.id}" value="${kbEscape(s.nomi)}" maxlength="24" spellcheck="false">
            <div class="cb-count"><i class="fa-solid fa-layer-group"></i> ${cnt} ish</div>
            <div class="cb-palette">${swatches}</div>
        </div>`;
    }).join('');

    // Drag bilan tartiblash (faqat grip orqali)
    if (typeof Sortable !== 'undefined') {
        try {
            builderSortable = Sortable.create(chain, {
                handle: '.cb-grip',
                animation: 180,
                ghostClass: 'chain-block-ghost',
                chosenClass: 'chain-block-chosen',
                onEnd: () => {
                    const ids = Array.from(chain.querySelectorAll('.chain-block')).map(b => b.dataset.id);
                    state.stages = ids.map(id => state.stages.find(s => s.id === id)).filter(Boolean);
                    saveState();
                    renderBuilder();
                    renderKanban();
                }
            });
        } catch (e) { console.warn('Builder drag yoqilmadi:', e); }
    }
}

function setupBuilder() {
    const chain = document.getElementById('builder-chain');
    const scene = document.getElementById('builder-scene');
    if (!chain || !scene) return;

    // --- Delegatsiya: ikon / rang / o'chirish ---
    chain.addEventListener('click', (e) => {
        const target = e.target.closest('[data-act]');
        if (!target) return;
        const act = target.dataset.act;
        const id = target.dataset.id;
        const stage = getStages().find(s => s.id === id);
        if (!stage) return;

        if (act === 'del') {
            if (getStages().length <= 1) { alert("Kamida bitta bosqich qolishi shart."); return; }
            if (!confirm(`"${stage.nomi}" bosqichini o'chirasizmi? Undagi ishlar avvalgi bosqichga o'tkaziladi.`)) return;
            const stages = getStages();
            const idx = stages.findIndex(s => s.id === id);
            const fallback = stages[idx - 1] || stages[idx + 1];
            (state.kanban || []).forEach(k => { if (k.stage === id && fallback) k.stage = fallback.id; });
            state.stages = stages.filter(s => s.id !== id);
            saveState();
            renderBuilder();
            renderKanban();
        } else if (act === 'color') {
            stage.color = target.dataset.color;
            saveState();
            renderBuilder();
            renderKanban();
        } else if (act === 'icon') {
            openIconPicker(id, target);
        }
    });

    // --- Nom tahrirlash ---
    chain.addEventListener('change', (e) => {
        const inp = e.target.closest('.cb-name');
        if (!inp) return;
        const stage = getStages().find(s => s.id === inp.dataset.id);
        if (stage) {
            stage.nomi = inp.value.trim() || 'Bosqich';
            saveState();
            renderKanban();
        }
    });

    // --- Yangi bosqich qo'shish ---
    const addBtn = document.getElementById('btn-add-stage');
    if (addBtn) addBtn.addEventListener('click', () => {
        const color = BUILDER_PALETTE[getStages().length % BUILDER_PALETTE.length];
        const icon = BUILDER_ICONS[getStages().length % BUILDER_ICONS.length];
        // Oxirgi (tayyor) bosqichdan oldin qo'shamiz
        const stages = getStages();
        const newStage = { id: 's-' + Date.now(), nomi: 'Yangi bosqich', icon, color };
        stages.splice(Math.max(0, stages.length - 1), 0, newStage);
        saveState();
        renderBuilder();
        renderKanban();
    });

    // --- Standartga qaytarish ---
    const resetBtn = document.getElementById('btn-reset-stages');
    if (resetBtn) resetBtn.addEventListener('click', () => {
        if (!confirm("Zanjirni standart 9 bosqichli holatga qaytarasizmi?")) return;
        state.stages = JSON.parse(JSON.stringify(DEFAULT_STAGES));
        // Mavjud bo'lmagan bosqichdagi kartalarni birinchi bosqichga o'tkazamiz
        reconcileKanbanStages();
        saveState();
        renderBuilder();
        renderKanban();
    });

    // --- 2D / 3D ko'rinish ---
    const toggle = document.getElementById('builder-view-toggle');
    if (toggle) toggle.addEventListener('click', (e) => {
        const btn = e.target.closest('.vt-btn');
        if (!btn) return;
        toggle.querySelectorAll('.vt-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        scene.classList.toggle('mode-3d', btn.dataset.mode === '3d');
    });

    // --- 3D sahnani sichqoncha bilan aylantirish ---
    let dragging = false, sx = 0, sy = 0, ry = -18, rx = 12;
    const applyRot = () => chain.style.setProperty('transform', `rotateX(${rx}deg) rotateY(${ry}deg)`);
    scene.addEventListener('pointerdown', (e) => {
        if (!scene.classList.contains('mode-3d')) return;
        if (e.target.closest('input, button, .cb-swatch, .cb-grip')) return;
        dragging = true; sx = e.clientX; sy = e.clientY;
        scene.classList.add('rotating');
    });
    window.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        ry = ry + (e.clientX - sx) * 0.4;
        rx = Math.max(-25, Math.min(45, rx - (e.clientY - sy) * 0.3));
        sx = e.clientX; sy = e.clientY;
        applyRot();
    });
    window.addEventListener('pointerup', () => { dragging = false; scene.classList.remove('rotating'); });
}

// --- Ikon tanlash popoveri ---
function openIconPicker(stageId, anchorEl) {
    let pop = document.getElementById('icon-picker-pop');
    if (!pop) {
        pop = document.createElement('div');
        pop.id = 'icon-picker-pop';
        pop.className = 'icon-picker';
        document.body.appendChild(pop);
    }
    pop.innerHTML = `<div class="ip-title">Ikonka tanlang</div><div class="ip-grid">${
        BUILDER_ICONS.map(ic => `<button class="ip-item" data-icon="${ic}"><i class="fa-solid ${ic}"></i></button>`).join('')
    }</div>`;

    const r = anchorEl.getBoundingClientRect();
    pop.style.display = 'block';
    pop.style.top = (r.bottom + window.scrollY + 8) + 'px';
    pop.style.left = Math.max(10, Math.min(r.left + window.scrollX, window.innerWidth - 260)) + 'px';

    const onPick = (e) => {
        const it = e.target.closest('.ip-item');
        if (!it) return;
        const stage = getStages().find(s => s.id === stageId);
        if (stage) { stage.icon = it.dataset.icon; saveState(); renderBuilder(); renderKanban(); }
        closePop();
    };
    const closePop = () => {
        pop.style.display = 'none';
        pop.removeEventListener('click', onPick);
        document.removeEventListener('pointerdown', outside, true);
    };
    const outside = (e) => { if (!pop.contains(e.target) && e.target !== anchorEl && !anchorEl.contains(e.target)) closePop(); };

    pop.addEventListener('click', onPick);
    setTimeout(() => document.addEventListener('pointerdown', outside, true), 0);
}

// 3D sex moduli (workshop3d.js) shu orqali ma'lumot oladi
window.getWorkshopData = function () {
    if (!state.workshopLayout) state.workshopLayout = {};
    return {
        stages: getStages(),
        kanban: state.kanban || [],
        workers: state.workers || [],
        layout: state.workshopLayout,
        beltPath: Array.isArray(state.beltPath) ? state.beltPath : null,        // eski format (1 yo'l)
        beltPaths: Array.isArray(state.beltPaths) ? state.beltPaths : null      // yangi format (bir nechta yo'l)
    };
};

// 3D'da dastgoh/ombor joyi qo'l bilan o'zgartirilganda saqlash
window.saveWorkshopLayout = function (layout) {
    state.workshopLayout = layout || {};
    saveState();
};

// Konveyer lentasi yo'llari (bir nechta, ulanadigan) saqlash
window.saveBeltPaths = function (paths) {
    state.beltPaths = Array.isArray(paths) ? paths : [];
    saveState();
};

// --- Ishlab chiqarish ichki ko'rinish almashtirish (Taxta / Quruvchi / 3D) ---
function setupProdSubnav() {
    const btns = document.querySelectorAll('.prod-subnav-btn');
    const views = document.querySelectorAll('.prodview');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.prodview;
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            views.forEach(v => v.classList.remove('active'));
            const target = document.getElementById('prodview-' + view);
            if (target) target.classList.add('active');
            if (view === 'builder') renderBuilder();
            else if (view === 'workshop') { if (typeof window.initWorkshop3D === 'function') window.initWorkshop3D(); }
            else renderKanban();
        });
    });
}


window.transitionOrderStatus = function(orderId, newStatus) {
    const order = state.orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        if (newStatus === 'Bichildi') {
            order.bichildi = order.miqdori; 
            const newCut = {
                id: 'cut-' + String(state.cuts.length + 1).padStart(3, '0'),
                sana: new Date().toISOString().split('T')[0],
                nomi: order.mahsulot_nomi,
                turi: order.turi,
                mato_id: (order.turi === 'Hudi') ? 'mat-001' : (order.turi === 'Futbolka' ? 'mat-002' : 'mat-003'),
                ogirlik: Math.round(order.miqdori * 0.35),
                bichilgan_dona: order.miqdori,
                chiqindi_pct: +(8 + Math.random() * 2).toFixed(1),
                masul: "Dilshod Karimov",
                status: "Bichildi"
            };
            state.cuts.push(newCut);

            // Bichuvdan ish konveyerga tushadi (takrorlanmasligi uchun tekshiramiz)
            if (!Array.isArray(state.kanban)) state.kanban = [];
            if (!state.kanban.find(k => k.orderId === order.id)) {
                state.kanban.push({
                    id: 'k-' + Date.now(),
                    orderId: order.id,
                    model: order.mahsulot_nomi,
                    turi: order.turi,
                    miqdori: order.miqdori,
                    liniya: order.liniya,
                    masul: '—',
                    deadline: order.topshirish_sana,
                    prio: 'normal',
                    stage: getStages()[0].id
                });
            }
        }
        saveState();
        updateUI();
    }
};


// --- PRES-KRASKA Rendering ---
function renderPaintLogs(query = "") {
    const tbody = document.getElementById('tbody-paint');
    if (!tbody) return;
    tbody.innerHTML = '';

    state.paintLogs.forEach(log => {
        if (query && !log.order_name.toLowerCase().includes(query.toLowerCase()) && !log.press_type.toLowerCase().includes(query.toLowerCase())) {
            return;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${log.sana}</td>
            <td><strong>${log.order_name}</strong> <br><small>(${log.order_id})</small></td>
            <td>${log.press_type}</td>
            <td>${log.ink_type}</td>
            <td><strong>${log.qty} ta</strong></td>
            <td>${log.desc}</td>
            <td><span class="badge-row badge-status-won">${log.qc_status}</span></td>
            <td>
                <button class="btn btn-xs btn-danger" onclick="deletePaintLog('${log.id}')"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.deletePaintLog = function(id) {
    if (confirm("Pres/Bo'yoq hisobotini o'chirishni istaysizmi?")) {
        state.paintLogs = state.paintLogs.filter(p => p.id !== id);
        saveState();
        updateUI();
    }
};


// --- DAZMON-QADOQLASH Rendering ---
function renderPackLogs(query = "") {
    const tbody = document.getElementById('tbody-pack');
    if (!tbody) return;
    tbody.innerHTML = '';

    let totalIroned = 0;
    let totalPassed = 0;
    let totalFailed = 0;

    state.packLogs.forEach(log => {
        if (query && !log.order_name.toLowerCase().includes(query.toLowerCase())) {
            return;
        }

        const ironed = log.qty_passed + log.qty_failed;
        totalIroned += ironed;
        totalPassed += log.qty_passed;
        totalFailed += log.qty_failed;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${log.sana}</td>
            <td><strong>${log.order_name}</strong></td>
            <td>${ironed} ta</td>
            <td style="color:var(--color-won); font-weight:600;">${log.qty_passed} ta</td>
            <td style="color:var(--color-red); font-weight:600;">${log.qty_failed} ta</td>
            <td>${log.qadoqlovchi}</td>
            <td>${log.bag_type}</td>
            <td>
                <button class="btn btn-xs btn-primary" onclick="markProductsToShowroom('${log.id}')" ${log.topshirildi === 'Ha' ? 'disabled style="opacity:0.5;"' : ''}>
                    ${log.topshirildi === 'Ha' ? 'Showroomga berilgan' : 'Showroomga yuborish'}
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('qc-total-ironed').innerText = `${totalIroned} ta`;
    document.getElementById('qc-total-passed').innerText = `${totalPassed} ta`;
    document.getElementById('qc-total-failed').innerText = `${totalFailed} ta`;

    const passRate = totalIroned > 0 ? ((totalPassed / totalIroned) * 100).toFixed(1) : "0.0";
    document.getElementById('qc-pass-rate').innerText = `${passRate}%`;
}

window.markProductsToShowroom = function(logId) {
    const log = state.packLogs.find(l => l.id === logId);
    if (log && log.topshirildi !== 'Ha') {
        if (confirm(`Ushbu partiyadagi ${log.qty_passed} ta sifatli kiyimni Showroomga sotuvga topshirmoqchimisiz?`)) {
            let key = "Futbolka";
            if (log.order_name.toLowerCase().includes('hoodie') || log.order_name.toLowerCase().includes('hudi')) key = "Hudi";
            else if (log.order_name.toLowerCase().includes('pant') || log.order_name.toLowerCase().includes('shim')) key = "Shim";

            state.showroomStock[key] = (state.showroomStock[key] || 0) + log.qty_passed;
            log.topshirildi = "Ha";
            saveState();
            updateUI();
            alert("Muvaffaqiyatli! Tizimdagi Showroom zaxirasi ko'paytirildi.");
        }
    }
};


// --- XODIMLAR & ISH HAQILARI Rendering ---
function renderWorkersTable(query = "") {
    const tbody = document.getElementById('tbody-workers');
    if (!tbody) return;
    tbody.innerHTML = '';

    state.workers.forEach(worker => {
        if (query && !worker.ism.toLowerCase().includes(query.toLowerCase()) && !worker.lavozim.toLowerCase().includes(query.toLowerCase())) {
            return;
        }

        let totalQty = 0;
        let totalSalarySum = 0;

        state.workLogs.forEach(log => {
            if (log.ishchi_id === worker.id) {
                totalQty += log.miqdori;
                totalSalarySum += log.summa;
            }
        });

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><code>${worker.id}</code></td>
            <td><strong>${worker.ism}</strong></td>
            <td>${worker.lavozim}</td>
            <td>${worker.liniya}</td>
            <td>
                <small style="color:var(--color-prospect);">H: ${worker.tariflar.Hudi} | F: ${worker.tariflar.Futbolka} | S: ${worker.tariflar.Shim}</small>
            </td>
            <td><strong>${totalQty} dona</strong></td>
            <td style="color:var(--color-won); font-weight:600;">${totalSalarySum.toLocaleString('uz-UZ')} so'm</td>
            <td><span class="badge-row badge-status-won">${worker.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
}


// --- USLUGI Rendering ---
function renderServicesTable(query = "") {
    const tbody = document.getElementById('tbody-services');
    if (!tbody) return;
    tbody.innerHTML = '';

    let totalDeals = 0;
    let totalSpend = 0;

    state.services.forEach(serv => {
        if (query && !serv.provider.toLowerCase().includes(query.toLowerCase()) && !serv.type.toLowerCase().includes(query.toLowerCase())) {
            return;
        }

        totalDeals++;
        totalSpend += serv.total;

        let statusClass = 'badge-status-prospect';
        if (serv.status === 'Faol') statusClass = 'badge-status-qualified';
        else if (serv.status === 'Yakunlandi') statusClass = 'badge-status-won';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><code>${serv.id}</code></td>
            <td><strong>${serv.provider}</strong></td>
            <td>${serv.type}</td>
            <td>${serv.order}</td>
            <td>${serv.qty} ta</td>
            <td>${serv.rate.toLocaleString('uz-UZ')} so'm</td>
            <td style="font-weight:600; color:var(--color-negotiation);">${serv.total.toLocaleString('uz-UZ')} so'm</td>
            <td>${serv.deadline}</td>
            <td><span class="badge-row ${statusClass}">${serv.status}</span></td>
            <td>
                <button class="btn btn-xs btn-primary" onclick="markServiceCompleted('${serv.id}')" ${serv.status === 'Yakunlandi' ? 'disabled style="opacity:0.5;"' : ''}><i class="fa-solid fa-check"></i> Yopish</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('usluga-total-deals').innerText = `${totalDeals} ta`;
    document.getElementById('usluga-total-amount').innerText = `${totalSpend.toLocaleString('uz-UZ')} so'm`;
}

window.markServiceCompleted = function(id) {
    const serv = state.services.find(s => s.id === id);
    if (serv) {
        serv.status = "Yakunlandi";
        saveState();
        updateUI();
    }
};

// --- Modals global utilities ---
window.openModal = function(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.add('active');
};

window.closeModal = function(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.remove('active');
};

// Setup forms and modals
function setupFormsAndModals() {
    // Attach close button event listeners
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) modal.classList.remove('active');
        });
    });

    // Close on clicking overlay
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });

    // 1. Warehouse Form Submit
    const formWarehouse = document.getElementById('form-warehouse');
    if (formWarehouse) {
        formWarehouse.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('ware-name').value;
            const type = document.getElementById('ware-type').value;
            const color = document.getElementById('ware-color').value;
            const qty = parseFloat(document.getElementById('ware-qty').value) || 0;
            const unit = document.getElementById('ware-unit').value;
            const price = parseFloat(document.getElementById('ware-price').value) || 0;
            const eco = document.getElementById('ware-eco').value;

            const newItem = {
                id: 'mat-' + String(state.materials.length + 1).padStart(3, '0'),
                nomi: name,
                turi: type,
                rangi: color,
                miqdori: qty,
                birligi: unit,
                narxi: price,
                ekologik_ball: eco
            };
            state.materials.push(newItem);
            saveState();
            updateUI();
            formWarehouse.reset();
            closeModal('modal-warehouse');
        });
    }

    // 2. Cutting Form Submit
    const formCutting = document.getElementById('form-cutting');
    if (formCutting) {
        formCutting.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('cut-name').value;
            const type = document.getElementById('cut-type').value;
            const fabricId = document.getElementById('cut-fabric-id').value;
            const weight = parseFloat(document.getElementById('cut-weight').value) || 0;
            const qty = parseInt(document.getElementById('cut-qty').value) || 0;
            const staff = document.getElementById('cut-staff').value;

            // Check inventory
            const mat = state.materials.find(m => m.id === fabricId);
            if (mat) {
                if (mat.miqdori < weight) {
                    alert(`Omborda yetarli mato yo'q! Zaxirada: ${mat.miqdori} kg. Kerakli: ${weight} kg.`);
                    return;
                }
                mat.miqdori -= weight;
            }

            // Create Cutting Log
            const newCut = {
                id: 'cut-' + String(state.cuts.length + 1).padStart(3, '0'),
                sana: new Date().toISOString().split('T')[0],
                nomi: name,
                turi: type,
                mato_id: fabricId,
                ogirlik: weight,
                bichilgan_dona: qty,
                chiqindi_pct: +(8 + Math.random() * 2).toFixed(1),
                masul: staff,
                status: "Bichildi"
            };
            state.cuts.push(newCut);

            // Create Production Order
            const prodLine = (type === 'Hudi') ? 'Liniya A' : (type === 'Futbolka' ? 'Liniya B' : 'Liniya C');
            const targetDays = 10;
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + targetDays);

            const newOrder = {
                id: 'buy-' + String(100 + state.orders.length + 1),
                mahsulot_nomi: name,
                turi: type,
                miqdori: qty,
                tayyorlandi: 0,
                bichildi: qty,
                liniya: prodLine,
                boshlangan_sana: new Date().toISOString().split('T')[0],
                topshirish_sana: deliveryDate.toISOString().split('T')[0],
                status: 'Bichildi'
            };
            state.orders.push(newOrder);

            saveState();
            updateUI();
            formCutting.reset();
            closeModal('modal-cutting');
        });
    }

    // 3. Paint Form Submit
    const formPaint = document.getElementById('form-paint');
    if (formPaint) {
        formPaint.addEventListener('submit', (e) => {
            e.preventDefault();
            const orderId = document.getElementById('paint-order-id').value;
            const pressType = document.getElementById('paint-press-type').value;
            const inkType = document.getElementById('paint-ink-type').value;
            const qty = parseInt(document.getElementById('paint-qty').value) || 0;
            const desc = document.getElementById('paint-desc').value;

            const order = state.orders.find(o => o.id === orderId);

            const newPaint = {
                id: 'pnt-' + String(state.paintLogs.length + 1).padStart(3, '0'),
                sana: new Date().toISOString().split('T')[0],
                order_id: orderId,
                order_name: order ? order.mahsulot_nomi : 'Noma\'lum',
                press_type: pressType,
                ink_type: inkType,
                qty: qty,
                desc: desc,
                qc_status: 'Passed'
            };
            state.paintLogs.push(newPaint);
            saveState();
            updateUI();
            formPaint.reset();
            closeModal('modal-paint');
        });
    }

    // 4. Pack Form Submit
    const formPack = document.getElementById('form-pack');
    if (formPack) {
        formPack.addEventListener('submit', (e) => {
            e.preventDefault();
            const orderId = document.getElementById('pack-order-id').value;
            const qtyPassed = parseInt(document.getElementById('pack-qty-passed').value) || 0;
            const qtyFailed = parseInt(document.getElementById('pack-qty-failed').value) || 0;
            const staff = document.getElementById('pack-staff').value;
            const bagType = document.getElementById('pack-bag-type').value;

            const order = state.orders.find(o => o.id === orderId);
            if (order) {
                // Update order finished count
                order.tayyorlandi = (order.tayyorlandi || 0) + qtyPassed;
                if (order.tayyorlandi >= order.miqdori) {
                    order.status = 'Tayyor';
                }
            }

            const newPack = {
                id: 'pck-' + String(state.packLogs.length + 1).padStart(3, '0'),
                sana: new Date().toISOString().split('T')[0],
                order_name: order ? order.mahsulot_nomi : 'Noma\'lum',
                qty_passed: qtyPassed,
                qty_failed: qtyFailed,
                qadoqlovchi: staff,
                bag_type: bagType,
                topshirildi: 'Yo\'q'
            };
            state.packLogs.push(newPack);
            saveState();
            updateUI();
            formPack.reset();
            closeModal('modal-pack');
        });
    }

    // 5. Service Form Submit
    const formService = document.getElementById('form-service');
    if (formService) {
        formService.addEventListener('submit', (e) => {
            e.preventDefault();
            const provider = document.getElementById('serv-provider').value;
            const type = document.getElementById('serv-type').value;
            const order = document.getElementById('serv-order').value;
            const qty = parseInt(document.getElementById('serv-qty').value) || 0;
            const rate = parseFloat(document.getElementById('serv-rate').value) || 0;
            const deadline = document.getElementById('serv-deadline').value;

            const newService = {
                id: 'serv-' + String(state.services.length + 1).padStart(3, '0'),
                provider: provider,
                type: type,
                order: order,
                qty: qty,
                rate: rate,
                total: qty * rate,
                deadline: deadline,
                status: 'Faol'
            };
            state.services.push(newService);
            saveState();
            updateUI();
            formService.reset();
            closeModal('modal-service');
        });
    }

    // 6. Staff Work Entry Form Submit
    const formStaffWork = document.getElementById('form-staff-work-entry');
    if (formStaffWork) {
        formStaffWork.addEventListener('submit', (e) => {
            e.preventDefault();
            const date = document.getElementById('work-entry-date').value;
            const workerId = document.getElementById('work-entry-staff').value;
            const orderId = document.getElementById('work-entry-order').value;
            const qty = parseInt(document.getElementById('work-entry-qty').value) || 0;

            const worker = state.workers.find(w => w.id === workerId);
            const order = state.orders.find(o => o.id === orderId);

            if (worker && order) {
                const rate = worker.tariflar[order.turi] || 2000;
                const total = qty * rate;

                const newLog = {
                    sana: date,
                    ishchi_id: workerId,
                    ishchi_nomi: worker.ism,
                    buyurtma_id: orderId,
                    mahsulot_turi: order.turi,
                    miqdori: qty,
                    tarif: rate,
                    summa: total
                };
                state.workLogs.push(newLog);
                saveState();
                updateUI();
                formStaffWork.reset();
                alert("Xodim ish hisoboti muvaffaqiyatli saqlandi!");
            }
        });
    }
}

// Setup Search
function setupSearch() {
    const globalSearch = document.getElementById('global-search');
    if (globalSearch) {
        globalSearch.addEventListener('input', (e) => {
            updateUI(e.target.value);
        });
    }
}

// Populate Dropdowns
function populateDropdowns() {
    // 1. Cut Fabric ID (type === 'Mato')
    const cutFabricSelect = document.getElementById('cut-fabric-id');
    if (cutFabricSelect) {
        cutFabricSelect.innerHTML = '';
        state.materials.filter(m => m.turi === 'Mato').forEach(m => {
            const opt = document.createElement('option');
            opt.value = m.id;
            opt.innerText = `${m.nomi} (Zaxira: ${m.miqdori} ${m.birligi})`;
            cutFabricSelect.appendChild(opt);
        });
    }

    // 2. Paint Order ID (Bichildi or Tikilmoqda)
    const paintOrderSelect = document.getElementById('paint-order-id');
    if (paintOrderSelect) {
        paintOrderSelect.innerHTML = '';
        state.orders.filter(o => o.status === 'Bichildi' || o.status === 'Tikilmoqda').forEach(o => {
            const opt = document.createElement('option');
            opt.value = o.id;
            opt.innerText = `${o.mahsulot_nomi} (Kod: ${o.id}, Soni: ${o.miqdori})`;
            paintOrderSelect.appendChild(opt);
        });
    }

    // 3. Pack Order ID (Tikilmoqda)
    const packOrderSelect = document.getElementById('pack-order-id');
    if (packOrderSelect) {
        packOrderSelect.innerHTML = '';
        state.orders.filter(o => o.status === 'Tikilmoqda').forEach(o => {
            const opt = document.createElement('option');
            opt.value = o.id;
            opt.innerText = `${o.mahsulot_nomi} (Qoldi: ${o.miqdori - (o.tayyorlandi || 0)} ta)`;
            packOrderSelect.appendChild(opt);
        });
    }

    // 4. Work Entry Staff (All workers)
    const workStaffSelect = document.getElementById('work-entry-staff');
    if (workStaffSelect) {
        workStaffSelect.innerHTML = '';
        state.workers.forEach(w => {
            const opt = document.createElement('option');
            opt.value = w.id;
            opt.innerText = `${w.ism} (${w.lavozim})`;
            workStaffSelect.appendChild(opt);
        });
    }

    // 5. Work Entry Order (Active orders)
    const workOrderSelect = document.getElementById('work-entry-order');
    if (workOrderSelect) {
        workOrderSelect.innerHTML = '';
        state.orders.filter(o => o.status !== 'Tayyor').forEach(o => {
            const opt = document.createElement('option');
            opt.value = o.id;
            opt.innerText = `${o.mahsulot_nomi} (${o.turi}, Status: ${o.status})`;
            workOrderSelect.appendChild(opt);
        });
    }

    // 6. Pack Staff (Qadoqlovchi)
    const packStaffSelect = document.getElementById('pack-staff');
    if (packStaffSelect) {
        packStaffSelect.innerHTML = '';
        state.workers.filter(w => w.lavozim === 'Qadoqlovchi').forEach(w => {
            const opt = document.createElement('option');
            opt.value = w.ism;
            opt.innerText = w.ism;
            packStaffSelect.appendChild(opt);
        });
    }

    // 7. Cut Staff (Bichuvchi)
    const cutStaffSelect = document.getElementById('cut-staff');
    if (cutStaffSelect) {
        cutStaffSelect.innerHTML = '';
        state.workers.filter(w => w.lavozim === 'Bichuvchi').forEach(w => {
            const opt = document.createElement('option');
            opt.value = w.ism;
            opt.innerText = w.ism;
            cutStaffSelect.appendChild(opt);
        });
    }

    // 8. AI Parameters Material Selection
    const paramMaterialSelect = document.getElementById('param-selected-material');
    if (paramMaterialSelect) {
        paramMaterialSelect.innerHTML = '<option value="">Matoni tanlang...</option>';
        state.materials.filter(m => m.turi === 'Mato').forEach(m => {
            const opt = document.createElement('option');
            opt.value = m.id;
            opt.innerText = `${m.nomi} (Qoldiq: ${m.miqdori} ${m.birligi})`;
            paramMaterialSelect.appendChild(opt);
        });
    }
}

// Start the application
window.addEventListener('DOMContentLoaded', init);
