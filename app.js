// Migrate deprecated Gemini models to 3.x series
(function() {
    try {
        var m = localStorage.getItem('gemini_ai_model');
        if (m === 'gemini-1.5-flash' || m === 'gemini-2.5-flash' || m === 'gemini-pro' || !m) {
            localStorage.setItem('gemini_ai_model', 'gemini-3.5-flash');
        } else if (m === 'gemini-1.5-pro' || m === 'gemini-2.5-pro') {
            localStorage.setItem('gemini_ai_model', 'gemini-3.1-pro');
        }
    } catch(e) {
        console.error('LocalStorage migration error:', e);
    }
})();

// --- Custom Toast Notification ---
window.showToast = function(message, type = 'success') {
    const container = document.getElementById('custom-toast-container');
    if (!container) {
        console.log(`[Toast Fallback] ${type}: ${message}`);
        return;
    }
    
    const toast = document.createElement('div');
    toast.className = `custom-toast ${type}`;
    
    let iconClass = 'fa-circle-check';
    if (type === 'error') iconClass = 'fa-circle-xmark';
    if (type === 'warning') iconClass = 'fa-triangle-exclamation';
    if (type === 'info') iconClass = 'fa-circle-info';
    
    toast.innerHTML = `
        <i class="fa-solid ${iconClass} custom-toast-icon"></i>
        <div class="custom-toast-content">
            <div class="custom-toast-message">${message}</div>
        </div>
        <button class="custom-toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    container.appendChild(toast);
    
    // Force reflow
    toast.offsetHeight;
    toast.classList.add('show');
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 4000);
};

// --- Custom Confirmation Modal ---
window.showConfirmModal = function(title, message, onConfirm, type = 'info') {
    const modal = document.getElementById('custom-confirm-modal');
    const titleEl = document.getElementById('custom-confirm-title');
    const messageEl = document.getElementById('custom-confirm-message');
    const iconContainer = document.getElementById('custom-confirm-icon-container');
    const iconEl = document.getElementById('custom-confirm-icon');
    const okBtn = document.getElementById('custom-confirm-ok');
    
    if (!modal) {
        if (confirm(`${title}\n\n${message}`)) {
            if (onConfirm) onConfirm();
        }
        return;
    }
    
    titleEl.innerText = title || "Tasdiqlash";
    messageEl.innerText = message || "";
    
    // Set type-based styling
    iconContainer.className = "custom-modal-icon-container";
    okBtn.className = "btn-primary-modal";
    
    if (type === 'danger') {
        iconContainer.classList.add('danger');
        okBtn.classList.add('danger');
        iconEl.className = "fa-solid fa-circle-exclamation";
    } else if (type === 'warning') {
        iconContainer.classList.add('warning');
        iconEl.className = "fa-solid fa-triangle-exclamation";
    } else {
        iconEl.className = "fa-solid fa-circle-question";
    }
    
    modal.style.display = 'flex';
    modal.offsetHeight; // Force reflow
    modal.classList.add('active');
    
    okBtn.onclick = function() {
        closeCustomConfirm(true);
        if (onConfirm) onConfirm();
    };
};

window.closeCustomConfirm = function(result) {
    const modal = document.getElementById('custom-confirm-modal');
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
};

// --- Default Data Sets (Initial Mock Database) ---

const defaultMaterials = [
  { "id": "mat-001", "nomi": "Organik Paxta Mato (Green)", "turi": "Mato", "rangi": "Olive Green", "miqdori": 450, "birligi": "kg", "narxi": 12.5, "ekologik_ball": "A+", "zona": "A", "qator": 1, "tokcha": 3 },
  { "id": "mat-002", "nomi": "Organik Paxta Mato (White)", "turi": "Mato", "rangi": "Natural White", "miqdori": 320, "birligi": "kg", "narxi": 12.0, "ekologik_ball": "A+", "zona": "A", "qator": 2, "tokcha": 2 },
  { "id": "mat-003", "nomi": "Qayta Ishlangan Poliefir (rPET)", "turi": "Mato", "rangi": "Charcoal Black", "miqdori": 12, "birligi": "kg", "narxi": 15.0, "ekologik_ball": "A", "zona": "A", "qator": 3, "tokcha": 1 }, // low stock
  { "id": "mat-004", "nomi": "Ekologik Bo'yoq (Suvli)", "turi": "Bo'yoq", "rangi": "Yashil", "miqdori": 45, "birligi": "litr", "narxi": 8.50, "ekologik_ball": "A+", "zona": "B", "qator": 1, "tokcha": 3 },
  { "id": "mat-005", "nomi": "Qayta Ishlangan Iplar", "turi": "Furnitura", "rangi": "Turli ranglar", "miqdori": 150, "birligi": "g'altak", "narxi": 1.8, "ekologik_ball": "A", "zona": "B", "qator": 2, "tokcha": 2 },
  { "id": "mat-006", "nomi": "Kraft Qog'oz Qutisi", "turi": "Aksessuar", "rangi": "Kraft", "miqdori": 8, "birligi": "dona", "narxi": 0.25, "ekologik_ball": "A+", "zona": "B", "qator": 3, "tokcha": 1 } // low stock
];

const defaultCuts = [];

const defaultOrders = [];


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
    aiApiUsageCount: 0,
    editingCatalogId: null
};


// --- Initialization ---
async function init() {
    // 1. Setup clock
    setInterval(updateClock, 1000);
    updateClock();

    // 2. Load from localStorage or defaults
    let localExists = false;
    if (localStorage.getItem('eco_crm_state_v3')) {
        state = JSON.parse(localStorage.getItem('eco_crm_state_v3'));
        localExists = true;

        // One-time cleanup request from user to clear showroom catalog, stock and sales
        if (!localStorage.getItem('eco_showroom_cleared_once')) {
            state.showroomCatalog = [];
            state.showroomStock = {};
            state.showroomSales = [];
            localStorage.setItem('eco_showroom_cleared_once', 'true');
            saveState();
        }

        // Ensure all materials have WMS location coordinates
        state.materials.forEach((mat, idx) => {
            if (!mat.zona) {
                mat.zona = mat.turi === 'Mato' ? 'A' : 'B';
                mat.qator = (idx % 4) + 1;
                mat.tokcha = (Math.floor(idx / 4) % 3) + 1;
            }
        });
        saveState();

        if (!state.showroomCatalog) {
            state.showroomCatalog = [];
        }
        if (!state.showroomFilter) {
            state.showroomFilter = 'All';
        }
        if (!state.activeWarehouseSubTab) {
            state.activeWarehouseSubTab = 'mato';
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
        state.showroomSales = [];
        state.showroomStock = {};
        state.showroomCatalog = [];
        state.showroomFilter = 'All';
        state.kanban = JSON.parse(JSON.stringify(defaultKanban));
        state.stages = JSON.parse(JSON.stringify(DEFAULT_STAGES));
        state.activeTab = 'sales';
        state.activeSubTab = 'ai-calc';
        state.activeWarehouseSubTab = 'mato';
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

    // Read tab query parameter from URL on page load
    const urlParams = new URLSearchParams(window.location.search);
    const activeTab = urlParams.get('tab') || state.activeTab || 'sales';
    window.activateTab(activeTab);

    // 4. Background Supabase Syncing
    if (supabaseClient) {
        if (!localExists) {
            // Show loading if no local state is found
            showSyncLoading("Supabase ma'lumotlar bazasidan ma'lumotlar olinmoqda...");
        }
        
        loadStateFromSupabase().then((result) => {
            if (result === 'error') {
                setSyncStatus('error');
            } else {
                // result is true (has data) or false (empty tables — not an error)
                if (result === true) {
                    // Save loaded cloud state to local storage
                    localStorage.setItem('eco_crm_state_v3', JSON.stringify(state));
                    // Re-initialize lists and maps
                    buildSeedHistories();
                    updateUI();
                }
                setSyncStatus('synced');
            }
        }).catch((err) => {
            console.error('Supabase init load error:', err);
            setSyncStatus('error');
        }).finally(() => {
            hideSyncLoading();
        });
    } else {
        setSyncStatus('error');
    }
}

// --- Supabase Config & Sync Manager ---
const supabaseUrl = 'https://ajcrsdgerhgnkwkojpki.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqY3JzZGdlcmhnbmt3a29qcGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyNzcyNTAsImV4cCI6MjA5Nzg1MzI1MH0.rk6n6Yks_5ZeaZjmZJCZ_02Fn8TwyNTqZ2sDhge7GSc';
let supabaseClient = null;
if (typeof supabase !== 'undefined' && supabase && supabase.createClient) {
    supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
}

const SUPABASE_TABLES = {
    materials: 'materials',
    cuts: 'cuts',
    orders: 'orders',
    kanban: 'kanban',
    paintLogs: 'paint_logs',
    packLogs: 'pack_logs',
    workers: 'workers',
    workLogs: 'work_logs',
    services: 'services',
    showroomSales: 'showroom_sales',
    showroomStock: 'showroom_stock',
    showroomCatalog: 'showroom_catalog'
};

const SQL_CREATION_SCRIPT = `-- ECO SPORTS - SUPABASE DATABASE STRUCTURE CREATION SCRIPT
-- Copy this script and run it in the SQL Editor of your Supabase project (https://supabase.com)

-- 1. Materials Table
CREATE TABLE IF NOT EXISTS materials (
    id TEXT PRIMARY KEY,
    nomi TEXT,
    turi TEXT,
    miqdori NUMERIC,
    olchov TEXT,
    zona TEXT,
    qator INT,
    tokcha INT,
    ogohlantirish_darajasi NUMERIC,
    oxirgi_kelgan_sana TEXT,
    yetkazib_beruvchi TEXT,
    data JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write Access" ON materials FOR ALL USING (true) WITH CHECK (true);

-- 2. Cuts Table
CREATE TABLE IF NOT EXISTS cuts (
    id TEXT PRIMARY KEY,
    sana TEXT,
    nomi TEXT,
    turi TEXT,
    mato_id TEXT,
    ogirlik NUMERIC,
    bichilgan_dona INT,
    chiqindi_pct NUMERIC,
    masul TEXT,
    status TEXT,
    data JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE cuts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write Access" ON cuts FOR ALL USING (true) WITH CHECK (true);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    mahsulot_nomi TEXT,
    turi TEXT,
    miqdori INT,
    liniya TEXT,
    boshlangan_sana TEXT,
    topshirish_sana TEXT,
    status TEXT,
    tayyorlandi INT,
    bichildi INT,
    data JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write Access" ON orders FOR ALL USING (true) WITH CHECK (true);

-- 4. Kanban Table
CREATE TABLE IF NOT EXISTS kanban (
    id TEXT PRIMARY KEY,
    model TEXT,
    turi TEXT,
    miqdori INT,
    liniya TEXT,
    masul TEXT,
    deadline TEXT,
    prio TEXT,
    stage TEXT,
    data JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE kanban ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write Access" ON kanban FOR ALL USING (true) WITH CHECK (true);

-- 5. Workers Table
CREATE TABLE IF NOT EXISTS workers (
    id TEXT PRIMARY KEY,
    ism TEXT,
    lavozim TEXT,
    tel TEXT,
    balans NUMERIC,
    data JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE workers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write Access" ON workers FOR ALL USING (true) WITH CHECK (true);

-- 6. Work Logs Table
CREATE TABLE IF NOT EXISTS work_logs (
    id TEXT PRIMARY KEY,
    sana TEXT,
    ishchi_id TEXT,
    buyurtma_id TEXT,
    operatsiya TEXT,
    soni INT,
    narxi NUMERIC,
    jami NUMERIC,
    data JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE work_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write Access" ON work_logs FOR ALL USING (true) WITH CHECK (true);

-- 7. Paint Logs Table
CREATE TABLE IF NOT EXISTS paint_logs (
    id TEXT PRIMARY KEY,
    sana TEXT,
    order_id TEXT,
    order_name TEXT,
    press_type TEXT,
    qty INT,
    status TEXT,
    operator TEXT,
    data JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE paint_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write Access" ON paint_logs FOR ALL USING (true) WITH CHECK (true);

-- 8. Pack Logs Table
CREATE TABLE IF NOT EXISTS pack_logs (
    id TEXT PRIMARY KEY,
    sana TEXT,
    order_id TEXT,
    order_name TEXT,
    qty INT,
    defect_qty INT,
    status TEXT,
    operator TEXT,
    data JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE pack_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write Access" ON pack_logs FOR ALL USING (true) WITH CHECK (true);

-- 9. Services Table
CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    nomi TEXT,
    narxi NUMERIC,
    bajarildi INT,
    qoldiq INT,
    masul TEXT,
    data JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write Access" ON services FOR ALL USING (true) WITH CHECK (true);

-- 10. Showroom Sales Table
CREATE TABLE IF NOT EXISTS showroom_sales (
    id TEXT PRIMARY KEY,
    sana TEXT,
    mijoz TEXT,
    mahsulot TEXT,
    miqdori INT,
    narxi NUMERIC,
    jami NUMERIC,
    status TEXT,
    data JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE showroom_sales ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write Access" ON showroom_sales FOR ALL USING (true) WITH CHECK (true);

-- 11. Showroom Stock Table
CREATE TABLE IF NOT EXISTS showroom_stock (
    id TEXT PRIMARY KEY,
    mahsulot TEXT,
    turi TEXT,
    miqdori INT,
    narxi NUMERIC,
    oxirgi_yangilanish TEXT,
    data JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE showroom_stock ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write Access" ON showroom_stock FOR ALL USING (true) WITH CHECK (true);

-- 12. Showroom Catalog Table
CREATE TABLE IF NOT EXISTS showroom_catalog (
    id TEXT PRIMARY KEY,
    nomi TEXT,
    turi TEXT,
    narxi NUMERIC,
    kod TEXT,
    tavsif TEXT,
    data JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE showroom_catalog ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read/Write Access" ON showroom_catalog FOR ALL USING (true) WITH CHECK (true);
`;

window.openSupabaseSetupModal = function() {
    const codeArea = document.getElementById('supabase-sql-code');
    if (codeArea) {
        codeArea.value = SQL_CREATION_SCRIPT;
    }
    openModal('modal-supabase-setup');
};

window.copySupabaseSql = function() {
    const codeArea = document.getElementById('supabase-sql-code');
    if (codeArea) {
        codeArea.select();
        document.execCommand('copy');
        alert("SQL skripti nusxalandi! Uni Supabase loyihangizning SQL Editor-ida ishga tushiring.");
    }
};

function setSyncStatus(status) {
    const dot = document.getElementById('sync-status-dot');
    const text = document.getElementById('sync-status-text');
    if (!dot || !text) return;
    
    dot.className = 'status-dot';
    if (status === 'syncing') {
        dot.classList.add('syncing');
        text.innerText = 'Sinxronizatsiya...';
        text.style.color = 'var(--color-qualified)';
    } else if (status === 'synced') {
        dot.classList.add('synced');
        text.innerText = 'Bulutda saqlandi';
        text.style.color = 'var(--color-won)';
    } else if (status === 'error') {
        dot.classList.add('error');
        text.innerText = 'Xatolik!';
        text.style.color = '#f87171';
    }
}

// Map key-values for DB rows helper
function mapItemToRow(tableName, item) {
    const row = { id: item.id, data: item };
    if (item.nomi) row.nomi = item.nomi;
    if (item.turi) row.turi = item.turi;
    if (item.miqdori !== undefined) row.miqdori = item.miqdori;
    if (item.olchov) row.olchov = item.olchov;
    if (item.zona) row.zona = item.zona;
    if (item.qator !== undefined) row.qator = parseInt(item.qator);
    if (item.tokcha !== undefined) row.tokcha = parseInt(item.tokcha);
    if (item.ogirlik !== undefined) row.ogirlik = item.ogirlik;
    if (item.bichilgan_dona !== undefined) row.bichilgan_dona = item.bichilgan_dona;
    if (item.status) row.status = item.status;
    if (item.sana) row.sana = item.sana;
    if (item.mato_id) row.mato_id = item.mato_id;
    if (item.mahsulot_nomi) row.mahsulot_nomi = item.mahsulot_nomi;
    if (item.tayyorlandi !== undefined) row.tayyorlandi = item.tayyorlandi;
    if (item.bichildi !== undefined) row.bichildi = item.bichildi;
    if (item.ism) row.ism = item.ism;
    if (item.lavozim) row.lavozim = item.lavozim;
    if (item.tel) row.tel = item.tel;
    if (item.balans !== undefined) row.balans = item.balans;
    if (item.ishchi_id) row.ishchi_id = item.ishchi_id;
    if (item.buyurtma_id) row.buyurtma_id = item.buyurtma_id;
    if (item.operatsiya) row.operatsiya = item.operatsiya;
    if (item.soni !== undefined) row.soni = item.soni;
    if (item.narxi !== undefined) row.narxi = item.narxi;
    if (item.jami !== undefined) row.jami = item.jami;
    if (item.order_id) row.order_id = item.order_id;
    if (item.order_name) row.order_name = item.order_name;
    if (item.press_type) row.press_type = item.press_type;
    if (item.qty !== undefined) row.qty = item.qty;
    if (item.operator) row.operator = item.operator;
    if (item.defect_qty !== undefined) row.defect_qty = item.defect_qty;
    if (item.bajarildi !== undefined) row.bajarildi = item.bajarildi;
    if (item.qoldiq !== undefined) row.qoldiq = item.qoldiq;
    if (item.masul) row.masul = item.masul;
    if (item.mijoz) row.mijoz = item.mijoz;
    if (item.mahsulot) row.mahsulot = item.mahsulot;
    if (item.kod) row.kod = item.kod;
    if (item.tavsif) row.tavsif = item.tavsif;
    if (item.deadline) row.deadline = item.deadline;
    if (item.prio) row.prio = item.prio;
    if (item.stage) row.stage = item.stage;
    return row;
}

// Bulk upsert items into Supabase
async function syncTableToSupabase(stateKey) {
    if (!supabaseClient) return { ok: false, table: stateKey };
    const dbTable = SUPABASE_TABLES[stateKey];
    if (!dbTable) return { ok: true, table: stateKey };
    
    const items = state[stateKey];
    if (!Array.isArray(items) || items.length === 0) {
        return { ok: true, table: stateKey };
    }
    
    const rows = items.map(item => mapItemToRow(dbTable, item));
    
    try {
        const { error } = await supabaseClient.from(dbTable).upsert(rows);
        if (error) {
            console.error(`[Supabase Sync] ❌ Jadval: ${dbTable}, Xatolik kodi: ${error.code}, Xabar: ${error.message}`, error.details || '');
            return { ok: false, table: dbTable, error };
        }
        return { ok: true, table: dbTable };
    } catch (e) {
        console.error(`[Supabase Sync] ❌ Jadval: ${dbTable}, Network/Runtime xatolik:`, e);
        return { ok: false, table: dbTable, error: e };
    }
}

// Sync all state to Supabase
async function syncStateToSupabase() {
    if (!supabaseClient) {
        setSyncStatus('error');
        return;
    }
    
    setSyncStatus('syncing');
    try {
        const results = await Promise.all(
            Object.keys(SUPABASE_TABLES).map(key => syncTableToSupabase(key))
        );
        const failures = results.filter(r => r && !r.ok);
        if (failures.length > 0) {
            console.warn(`[Supabase Sync] ${failures.length} ta jadvalda xatolik:`, failures.map(f => f.table).join(', '));
            // If ALL tables failed, show error. Otherwise show synced (partial success)
            if (failures.length === results.length) {
                setSyncStatus('error');
            } else {
                setSyncStatus('synced');
                console.warn('[Supabase Sync] Qisman sinxronizatsiya — ba\'zi jadvallar muvaffaqiyatsiz.');
            }
        } else {
            setSyncStatus('synced');
        }
    } catch (e) {
        console.error('Supabase state sync error:', e);
        setSyncStatus('error');
    }
}

// Trigger force sync from UI
window.triggerManualSync = async function() {
    showSyncLoading("Bulutli ma'lumotlar bazasi bilan force-sync qilinmoqda...");
    try {
        await syncStateToSupabase();
        alert("Sinxronizatsiya muvaffaqiyatli yakunlandi!");
    } catch (e) {
        alert("Sinxronizatsiya jarayonida xatolik yuz berdi. Iltimos, SQL skriptini Supabase console-da ishga tushirganingizni tasdiqlang.");
    } finally {
        hideSyncLoading();
    }
};

// Seed table from defaults
async function seedSupabaseTable(stateKey, defaultItems) {
    if (!supabaseClient) return;
    const dbTable = SUPABASE_TABLES[stateKey];
    if (!dbTable || !defaultItems || defaultItems.length === 0) return;
    
    const rows = defaultItems.map(item => mapItemToRow(dbTable, item));
    const { error } = await supabaseClient.from(dbTable).insert(rows);
    if (error) {
        console.error(`Error seeding table ${dbTable}:`, error);
    }
}

// Load all tables from Supabase
async function loadStateFromSupabase() {
    if (!supabaseClient) return 'error';
    
    try {
        let hasData = false;
        let relationError = false;
        let tableErrors = [];
        
        const promises = Object.keys(SUPABASE_TABLES).map(async (key) => {
            const dbTable = SUPABASE_TABLES[key];
            try {
                const { data, error } = await supabaseClient.from(dbTable).select('*');
                
                if (error) {
                    console.error(`[Supabase Load] ❌ Jadval: ${dbTable}, Xatolik: ${error.code} - ${error.message}`);
                    if (error.code === '42P01' || error.message.includes('does not exist')) {
                        relationError = true;
                    }
                    tableErrors.push({ table: dbTable, error });
                    return; // Continue with other tables
                }
                
                if (data && data.length > 0) {
                    state[key] = data.map(row => ({ ...row.data, id: row.id }));
                    hasData = true;
                    console.log(`[Supabase Load] ✅ ${dbTable}: ${data.length} ta yozuv yuklandi`);
                } else {
                    console.log(`[Supabase Load] ℹ️ ${dbTable}: bo'sh jadval`);
                    // Seed table if empty
                    let defaults = [];
                    if (key === 'materials') defaults = defaultMaterials;
                    else if (key === 'cuts') defaults = defaultCuts;
                    else if (key === 'orders') defaults = defaultOrders;
                    else if (key === 'kanban') defaults = defaultKanban;
                    else if (key === 'paintLogs') defaults = defaultPaintLogs;
                    else if (key === 'packLogs') defaults = defaultPackLogs;
                    else if (key === 'workers') defaults = defaultWorkers;
                    else if (key === 'workLogs') defaults = defaultWorkLogs;
                    else if (key === 'services') defaults = defaultServices;
                    else if (key === 'showroomSales') defaults = defaultShowroomSales;
                    else if (key === 'showroomStock') defaults = defaultShowroomStock;
                    
                    if (defaults.length > 0) {
                        await seedSupabaseTable(key, defaults);
                    }
                }
            } catch (tableErr) {
                console.error(`[Supabase Load] ❌ ${dbTable} jadvalida kutilmagan xatolik:`, tableErr);
                tableErrors.push({ table: dbTable, error: tableErr });
            }
        });
        
        await Promise.all(promises);
        
        if (relationError) {
            console.warn('[Supabase Load] ⚠️ Ba\'zi jadvallar mavjud emas. SQL skriptini ishga tushiring.');
            window.openSupabaseSetupModal();
            return 'error';
        }
        
        if (tableErrors.length > 0 && tableErrors.length === Object.keys(SUPABASE_TABLES).length) {
            // All tables failed
            return 'error';
        }
        
        return hasData;
    } catch (e) {
        console.error('Failed to load state from Supabase:', e);
        if (e.code === '42P01' || (e.message && e.message.includes('does not exist'))) {
            setTimeout(() => {
                window.openSupabaseSetupModal();
            }, 1000);
        }
        return 'error';
    }
}

function showSyncLoading(message) {
    let overlay = document.getElementById('supabase-sync-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'supabase-sync-overlay';
        overlay.style = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(12, 13, 20, 0.9); z-index: 999999; display: flex; flex-direction: column; align-items: center; justify-content: center; backdrop-filter: blur(8px);';
        overlay.innerHTML = `
            <div style="text-align: center; color: white;">
                <i class="fa-solid fa-cloud-arrow-down" style="font-size: 3.5rem; color: var(--color-prospect); margin-bottom: 20px; animation: flash 2s infinite;"></i>
                <h3 id="supabase-sync-title" style="margin: 0 0 10px; font-weight: 500; font-size: 1.2rem;">Supabase yuklanmoqda...</h3>
                <p id="supabase-sync-text" style="margin: 0; color: var(--color-text-muted); font-size: 0.9rem; max-width: 300px; line-height: 1.4;">Tizim ma'lumotlari bulutli server bilan sinxronlashtirilmoqda, iltimos kuting...</p>
            </div>
        `;
        document.body.appendChild(overlay);
    } else {
        overlay.style.display = 'flex';
        document.getElementById('supabase-sync-text').innerText = message;
    }
}

function hideSyncLoading() {
    const overlay = document.getElementById('supabase-sync-overlay');
    if (overlay) overlay.style.display = 'none';
}

let syncTimeout = null;
function saveState() {
    localStorage.setItem('eco_crm_state_v3', JSON.stringify(state));
    
    // Debounce Supabase sync by 2 seconds to avoid overloading API
    if (supabaseClient) {
        setSyncStatus('syncing');
        if (syncTimeout) clearTimeout(syncTimeout);
        syncTimeout = setTimeout(() => {
            syncStateToSupabase();
        }, 2000);
    }
}

function updateClock() {
    const clock = document.getElementById('clock');
    if (clock) {
        const time = new Date().toLocaleTimeString('uz-UZ', { hour12: false });
        clock.innerText = time;
    }
}


// --- Main Tab Routing ---
window.activateTab = function(tabId) {
    const targetPane = document.getElementById(`tab-${tabId}`);
    if (!targetPane) return;

    state.activeTab = tabId;
    saveState();

    // Set link classes
    const navLinks = document.querySelectorAll('#main-nav .nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('data-tab') === tabId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Set pane visibility
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => pane.classList.remove('active'));
    targetPane.classList.add('active');

    const viewTitle = document.getElementById('view-title');
    const subheaderActions = document.getElementById('subheader-actions-container');
    if (viewTitle && subheaderActions) {
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
                actionButtonHTML = `<span class="badge" style="background:var(--border-color); color:var(--color-won); padding:8px 12px; font-size:0.8rem;"><i class="fa-solid fa-scissors"></i> Nastil va Bichish Faol</span>`;
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
    }
    updateUI();
};

function setupTabSwitching() {
    const navLinks = document.querySelectorAll('#main-nav .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const tabId = link.getAttribute('data-tab');
            if (tabId && tabId !== 'settings') {
                e.preventDefault();
                const newUrl = window.location.pathname + '?tab=' + tabId;
                window.history.pushState({ path: newUrl }, '', newUrl);
                window.activateTab(tabId);
            }
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
            } else if (subtabId === 'showroom') {
                viewTitle.innerText = "Eco Sports Showroom";
                subheaderActions.innerHTML = `<span class="badge" style="background:var(--border-color); color:var(--color-won); padding:8px 12px; font-size:0.8rem;"><i class="fa-solid fa-store"></i> Eco Showroom</span>`;
            } else if (subtabId === 'manual-model') {
                viewTitle.innerText = "Modelni Qo'lda Kiritish";
                subheaderActions.innerHTML = `<span class="badge" style="background:var(--border-color); color:var(--color-prospect); padding:8px 12px; font-size:0.8rem;"><i class="fa-solid fa-pen-to-square"></i> Qo'lda Kiritish</span>`;
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
    if (countEl && costEl) {
        const count = state.aiApiUsageCount || 0;
        const cost = state.aiApiUsageCost || 0;
        countEl.innerText = count + " ta so'rov";
        costEl.innerText = "$" + cost.toFixed(5);
    }

    const lastDetailEl = document.getElementById('api-last-detail');
    const lastModelEl = document.getElementById('api-last-model');
    const lastInTokensEl = document.getElementById('api-last-in-tokens');
    const lastOutTokensEl = document.getElementById('api-last-out-tokens');
    const lastCostEl = document.getElementById('api-last-cost');

    if (lastDetailEl && state.lastAiUsage) {
        lastDetailEl.style.display = 'block';
        if (lastModelEl) lastModelEl.innerText = state.lastAiUsage.model || '-';
        
        if (lastInTokensEl) {
            const inTokens = state.lastAiUsage.inTokens || 0;
            const inCost = state.lastAiUsage.inCost || 0;
            lastInTokensEl.innerHTML = `${inTokens.toLocaleString()} token <span style="color: var(--color-text-muted); font-size: 0.72rem; display: block;">($${inCost.toFixed(5)})</span>`;
        }
        
        if (lastOutTokensEl) {
            const outTokens = state.lastAiUsage.outTokens || 0;
            const outCost = state.lastAiUsage.outCost || 0;
            lastOutTokensEl.innerHTML = `${outTokens.toLocaleString()} token <span style="color: var(--color-text-muted); font-size: 0.72rem; display: block;">($${outCost.toFixed(5)})</span>`;
        }
        
        if (lastCostEl) {
            const totalCost = state.lastAiUsage.totalCost || 0;
            lastCostEl.innerText = "$" + totalCost.toFixed(5);
        }
    } else if (lastDetailEl) {
        lastDetailEl.style.display = 'none';
    }
}


// --- MANUAL MODEL ENTRY LOGIC ---
(function() {
    function initManualModel() {
        const wizardForm = document.getElementById('form-manual-model-wizard');
        if (!wizardForm) return;

        // Simplified optional file picker logic
        const fileInput = document.getElementById('wizard-model-file');
        const filePrompt = document.getElementById('wizard-file-prompt');
        const filePreviewContainer = document.getElementById('wizard-file-preview-container');
        const filePreview = document.getElementById('wizard-file-preview');
        const fileNameSpan = document.getElementById('wizard-file-name');
        const btnRemoveFile = document.getElementById('btn-remove-wizard-file');
        const base64Input = document.getElementById('wizard-model-image-base64');

        if (fileInput) {
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(evt) {
                        if (filePreview) filePreview.src = evt.target.result;
                        if (fileNameSpan) fileNameSpan.innerText = file.name;
                        if (filePreviewContainer) filePreviewContainer.style.display = 'flex';
                        if (filePrompt) filePrompt.style.display = 'none';
                        if (base64Input) base64Input.value = evt.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        if (btnRemoveFile) {
            btnRemoveFile.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent file input trigger
                if (fileInput) fileInput.value = '';
                if (base64Input) base64Input.value = '';
                if (filePreview) filePreview.src = '';
                if (fileNameSpan) fileNameSpan.innerText = '';
                if (filePreviewContainer) filePreviewContainer.style.display = 'none';
                if (filePrompt) filePrompt.style.display = 'block';
            });
        }

        // Steps state will be initialized below

        // Product type selection cards
        const typeCards = document.querySelectorAll('.product-type-card');
        const hiddenProductType = document.getElementById('wizard-product-type');
        
        // FontAwesome icons mapping for products
        const iconMap = {
            'Triko': 'fa-solid fa-person-running',
            'Futbolka': 'fa-solid fa-shirt',
            'Shortik': 'fa-solid fa-scissors',
            'Sportifka': 'fa-solid fa-vest-patches',
            'Kofta': 'fa-solid fa-socks',
            'Bomber': 'fa-solid fa-universal-access',
            'Talstofka': 'fa-solid fa-snowman'
        };

        // Initialize icons in type cards
        typeCards.forEach(card => {
            const type = card.getAttribute('data-type');
            const icon = card.querySelector('i');
            if (icon && iconMap[type]) {
                icon.className = iconMap[type];
            }
        });

        typeCards.forEach(card => {
            card.addEventListener('click', function() {
                typeCards.forEach(c => {
                    c.classList.remove('active');
                    c.style.background = 'rgba(255, 255, 255, 0.02)';
                    c.style.borderColor = 'var(--border-color)';
                    const icon = c.querySelector('i');
                    if (icon) icon.style.color = 'var(--color-text-muted)';
                });
                card.classList.add('active');
                card.style.background = 'rgba(56, 189, 248, 0.1)';
                card.style.borderColor = 'var(--color-prospect)';
                const icon = card.querySelector('i');
                if (icon) icon.style.color = 'var(--color-prospect)';
                
                const type = card.getAttribute('data-type');
                hiddenProductType.value = type;
                
                // Pre-populate model name if empty or default
                const nameInput = document.getElementById('wizard-model-name');
                if (!nameInput.value || nameInput.value.startsWith('Eco Runner')) {
                    nameInput.value = 'Eco Runner ' + type;
                }
                
                updateWizardCalculation();
            });
        });

        // Add fabric row
        const fabricContainer = document.getElementById('fabric-rows-container');
        const btnAddFabric = document.getElementById('btn-add-fabric-row');
        let fabricIndex = 1;

        btnAddFabric.addEventListener('click', function() {
            const row = document.createElement('div');
            row.className = 'fabric-row card-glass';
            row.setAttribute('data-index', fabricIndex);
            
            row.innerHTML = `
                <div style="flex: 2; min-width: 150px;">
                    <label style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 4px; display: block;">Mato Turi</label>
                    <select class="fabric-type-select" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border-color); background: #000; color: #fff;">
                        <option value="Asosiy mato">Asosiy mato</option>
                        <option value="Cho'ntak matosi">Cho'ntak matosi</option>
                        <option value="Detal matosi">Detal matosi</option>
                        <option value="Ribana / Manjet">Ribana / Manjet</option>
                        <option value="Boshqa mato">Boshqa mato</option>
                    </select>
                </div>
                <div style="flex: 1.5; min-width: 100px;">
                    <label style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 4px; display: block;">1kg narxi (so'm)</label>
                    <input type="number" class="fabric-price-input" value="150000" min="0" placeholder="0" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border-color); background: #000; color: #fff;">
                </div>
                <div style="flex: 1.5; min-width: 100px;">
                    <label style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 4px; display: block;">Sarfi (gramm)</label>
                    <input type="number" class="fabric-consumption-input" value="100" min="0" placeholder="0" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border-color); background: #000; color: #fff;">
                </div>
                <div style="width: 32px; text-align: center; padding-bottom: 8px;">
                    <button type="button" class="btn-remove-fabric" style="background:none; border:none; color:var(--color-red); cursor:pointer; font-size:1.1rem;"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            fabricContainer.appendChild(row);
            fabricIndex++;
            
            // Bind delete button
            row.querySelector('.btn-remove-fabric').addEventListener('click', function() {
                row.remove();
                updateWizardCalculation();
            });

            // Bind change inputs
            row.querySelectorAll('input, select').forEach(input => {
                input.addEventListener('input', updateWizardCalculation);
                input.addEventListener('change', updateWizardCalculation);
            });

            updateWizardCalculation();
        });

        // Toggle checkbox inputs
        function setupToggleLogic(checkboxClass, priceInputClass, qtyInputClass) {
            document.querySelectorAll('.' + checkboxClass).forEach(checkbox => {
                const row = checkbox.closest('.decoration-row, .sewing-row, .accessory-row, .overhead-row, .packaging-row');
                if (!row) return;

                const priceInput = priceInputClass ? row.querySelector('.' + priceInputClass) : null;
                const qtyInput = qtyInputClass ? row.querySelector('.' + qtyInputClass) : null;

                const handleToggle = () => {
                    if (checkbox.checked) {
                        row.classList.add('active');
                        if (priceInput) priceInput.removeAttribute('disabled');
                        if (qtyInput) qtyInput.removeAttribute('disabled');
                    } else {
                        row.classList.remove('active');
                        if (priceInput) priceInput.setAttribute('disabled', 'true');
                        if (qtyInput) qtyInput.setAttribute('disabled', 'true');
                    }
                    updateWizardCalculation();
                };

                checkbox.addEventListener('change', handleToggle);
                handleToggle(); // Synchronize active state styling on initial load
                if (priceInput) priceInput.addEventListener('input', updateWizardCalculation);
                if (qtyInput) qtyInput.addEventListener('input', updateWizardCalculation);
            });
        }

        setupToggleLogic('decor-checkbox', 'decor-price-input', '');
        setupToggleLogic('sewing-checkbox', 'sewing-price-input', '');
        setupToggleLogic('accessory-checkbox', 'accessory-price-input', 'accessory-qty-input');
        setupToggleLogic('overhead-checkbox', 'overhead-price-input', '');
        setupToggleLogic('packaging-checkbox', 'packaging-price-input', '');

        // Add custom items
        // Sewing
        document.getElementById('btn-add-custom-sewing').addEventListener('click', function() {
            const nameInput = document.getElementById('custom-sewing-name');
            const priceInput = document.getElementById('custom-sewing-price');
            const name = nameInput.value.trim();
            const price = parseFloat(priceInput.value) || 0;

            if (!name || price <= 0) return;

            const container = document.getElementById('sewing-rows-container');
            const row = document.createElement('div');
            row.className = 'sewing-row wizard-toggle-card active';
            row.setAttribute('data-name', name);
            row.innerHTML = `
                <div class="wizard-toggle-card-header">
                    <input type="checkbox" checked class="sewing-checkbox" id="sewing-custom-${Date.now()}-active">
                    <label for="sewing-custom-${Date.now()}-active">${name} (Maxsus)</label>
                </div>
                <div class="wizard-toggle-card-body">
                    <input type="number" class="sewing-price-input" value="${price}" min="0">
                    <span style="font-size: 0.75rem; color: var(--color-text-muted);">so'm</span>
                    <button type="button" class="btn-remove-row" style="background:none; border:none; color:var(--color-red); cursor:pointer; margin-left: 8px;"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            container.appendChild(row);

            nameInput.value = '';
            priceInput.value = '';

            // Setup listeners
            const checkbox = row.querySelector('.sewing-checkbox');
            const priceInp = row.querySelector('.sewing-price-input');
            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    row.classList.add('active');
                    priceInp.removeAttribute('disabled');
                } else {
                    row.classList.remove('active');
                    priceInp.setAttribute('disabled', 'true');
                }
                updateWizardCalculation();
            });
            priceInp.addEventListener('input', updateWizardCalculation);
            row.querySelector('.btn-remove-row').addEventListener('click', function() {
                row.remove();
                updateWizardCalculation();
            });

            updateWizardCalculation();
        });

        // Accessories
        document.getElementById('btn-add-custom-accessory').addEventListener('click', function() {
            const nameInput = document.getElementById('custom-accessory-name');
            const priceInput = document.getElementById('custom-accessory-price');
            const qtyInput = document.getElementById('custom-accessory-qty');
            const unitSelect = document.getElementById('custom-accessory-unit');
            const name = nameInput.value.trim();
            const price = parseFloat(priceInput.value) || 0;
            const qty = parseFloat(qtyInput.value) || 1;
            const unit = unitSelect ? unitSelect.value : 'dona';

            if (!name || price <= 0) return;

            const container = document.getElementById('accessory-rows-container');
            const row = document.createElement('div');
            row.className = 'accessory-row wizard-toggle-card active';
            row.setAttribute('data-name', name);
            row.setAttribute('data-unit', unit);
            const isGr = unit === 'gr';
            row.innerHTML = `
                <div class="wizard-toggle-card-header">
                    <input type="checkbox" checked class="accessory-checkbox" id="acc-custom-${Date.now()}-active">
                    <label for="acc-custom-${Date.now()}-active">${name} (Maxsus)</label>
                </div>
                <div class="wizard-toggle-card-body">
                    <input type="number" class="accessory-price-input" value="${price}" min="0" style="width: 80px;">
                    <span style="font-size: 0.7rem; color: var(--color-text-muted);">${isGr ? "so'm/kg" : "so'm"}</span>
                    <span style="font-size: 0.75rem; color: var(--color-text-muted);">x</span>
                    <input type="number" class="accessory-qty-input" value="${qty}" min="1" style="text-align: center; width: 55px;">
                    <span style="font-size: 0.7rem; color: var(--color-text-muted);">${isGr ? 'gr' : 'ta'}</span>
                    <button type="button" class="btn-remove-row" style="background:none; border:none; color:var(--color-red); cursor:pointer; margin-left: 8px;"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            container.appendChild(row);

            nameInput.value = '';
            priceInput.value = '';
            qtyInput.value = '1';
            if (unitSelect) unitSelect.value = 'dona';

            // Setup listeners
            const checkbox = row.querySelector('.accessory-checkbox');
            const priceInp = row.querySelector('.accessory-price-input');
            const qtyInp = row.querySelector('.accessory-qty-input');
            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    row.classList.add('active');
                    priceInp.removeAttribute('disabled');
                    qtyInp.removeAttribute('disabled');
                } else {
                    row.classList.remove('active');
                    priceInp.setAttribute('disabled', 'true');
                    qtyInp.setAttribute('disabled', 'true');
                }
                updateWizardCalculation();
            });
            priceInp.addEventListener('input', updateWizardCalculation);
            qtyInp.addEventListener('input', updateWizardCalculation);
            row.querySelector('.btn-remove-row').addEventListener('click', function() {
                row.remove();
                updateWizardCalculation();
            });

            updateWizardCalculation();
        });

        // Overheads
        document.getElementById('btn-add-custom-overhead').addEventListener('click', function() {
            const nameInput = document.getElementById('custom-overhead-name');
            const priceInput = document.getElementById('custom-overhead-price');
            const name = nameInput.value.trim();
            const price = parseFloat(priceInput.value) || 0;

            if (!name || price <= 0) return;

            const container = document.getElementById('overhead-rows-container');
            const row = document.createElement('div');
            row.className = 'overhead-row wizard-toggle-card active';
            row.setAttribute('data-name', name);
            row.innerHTML = `
                <div class="wizard-toggle-card-header">
                    <input type="checkbox" checked class="overhead-checkbox" id="oh-custom-${Date.now()}-active">
                    <label for="oh-custom-${Date.now()}-active">${name} (Maxsus)</label>
                </div>
                <div class="wizard-toggle-card-body">
                    <input type="number" class="overhead-price-input" value="${price}" min="0">
                    <span style="font-size: 0.75rem; color: var(--color-text-muted);">so'm</span>
                    <button type="button" class="btn-remove-row" style="background:none; border:none; color:var(--color-red); cursor:pointer; margin-left: 8px;"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            container.appendChild(row);

            nameInput.value = '';
            priceInput.value = '';

            // Setup listeners
            const checkbox = row.querySelector('.overhead-checkbox');
            const priceInp = row.querySelector('.overhead-price-input');
            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    row.classList.add('active');
                    priceInp.removeAttribute('disabled');
                } else {
                    row.classList.remove('active');
                    priceInp.setAttribute('disabled', 'true');
                }
                updateWizardCalculation();
            });
            priceInp.addEventListener('input', updateWizardCalculation);
            row.querySelector('.btn-remove-row').addEventListener('click', function() {
                row.remove();
                updateWizardCalculation();
            });

            updateWizardCalculation();
        });

        // Packaging
        document.getElementById('btn-add-custom-packaging').addEventListener('click', function() {
            const nameInput = document.getElementById('custom-packaging-name');
            const priceInput = document.getElementById('custom-packaging-price');
            const name = nameInput.value.trim();
            const price = parseFloat(priceInput.value) || 0;

            if (!name || price <= 0) return;

            const container = document.getElementById('packaging-rows-container');
            const row = document.createElement('div');
            row.className = 'packaging-row wizard-toggle-card active';
            row.setAttribute('data-name', name);
            row.innerHTML = `
                <div class="wizard-toggle-card-header">
                    <input type="checkbox" checked class="packaging-checkbox" id="pack-custom-${Date.now()}-active">
                    <label for="pack-custom-${Date.now()}-active">${name} (Maxsus)</label>
                </div>
                <div class="wizard-toggle-card-body">
                    <input type="number" class="packaging-price-input" value="${price}" min="0">
                    <span style="font-size: 0.75rem; color: var(--color-text-muted);">so'm</span>
                    <button type="button" class="btn-remove-row" style="background:none; border:none; color:var(--color-red); cursor:pointer; margin-left: 8px;"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            container.appendChild(row);

            nameInput.value = '';
            priceInput.value = '';

            // Setup listeners
            const checkbox = row.querySelector('.packaging-checkbox');
            const priceInp = row.querySelector('.packaging-price-input');
            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    row.classList.add('active');
                    priceInp.removeAttribute('disabled');
                } else {
                    row.classList.remove('active');
                    priceInp.setAttribute('disabled', 'true');
                }
                updateWizardCalculation();
            });
            priceInp.addEventListener('input', updateWizardCalculation);
            row.querySelector('.btn-remove-row').addEventListener('click', function() {
                row.remove();
                updateWizardCalculation();
            });

            updateWizardCalculation();
        });


        // Core Calculation Engine
        function updateWizardCalculation() {
            // Step 1: Fabrics
            let totalFabric = 0;
            document.querySelectorAll('.fabric-row').forEach(row => {
                const price = parseFloat(row.querySelector('.fabric-price-input').value) || 0;
                const consumption = parseFloat(row.querySelector('.fabric-consumption-input').value) || 0;
                totalFabric += (price * consumption) / 1000;
            });

            // Step 2: Decorations
            let totalDecor = 0;
            document.querySelectorAll('.decoration-row').forEach(row => {
                const active = row.querySelector('.decor-checkbox').checked;
                const price = parseFloat(row.querySelector('.decor-price-input').value) || 0;
                if (active) totalDecor += price;
            });

            // Step 3: Sewing
            let totalSewing = 0;
            document.querySelectorAll('.sewing-row').forEach(row => {
                const active = row.querySelector('.sewing-checkbox').checked;
                const price = parseFloat(row.querySelector('.sewing-price-input').value) || 0;
                if (active) totalSewing += price;
            });

            // Step 4: Accessories
            let totalAccessory = 0;
            document.querySelectorAll('.accessory-row').forEach(row => {
                const active = row.querySelector('.accessory-checkbox').checked;
                const price = parseFloat(row.querySelector('.accessory-price-input').value) || 0;
                const qty = parseFloat(row.querySelector('.accessory-qty-input').value) || 0;
                const unit = row.getAttribute('data-unit') || 'dona';
                if (active) {
                    if (unit === 'gr') {
                        totalAccessory += (price * qty) / 1000;
                    } else {
                        totalAccessory += (price * qty);
                    }
                }
            });

            // Step 5: Overheads
            let totalOverhead = 0;
            document.querySelectorAll('.overhead-row').forEach(row => {
                const active = row.querySelector('.overhead-checkbox').checked;
                const price = parseFloat(row.querySelector('.overhead-price-input').value) || 0;
                if (active) totalOverhead += price;
            });

            // Step 6: Packaging
            let totalPackaging = 0;
            document.querySelectorAll('.packaging-row').forEach(row => {
                const active = row.querySelector('.packaging-checkbox').checked;
                const price = parseFloat(row.querySelector('.packaging-price-input').value) || 0;
                if (active) totalPackaging += price;
            });

            // Totals
            const unitCost = totalFabric + totalDecor + totalSewing + totalAccessory + totalOverhead + totalPackaging;
            const qty = parseInt(document.getElementById('wizard-model-qty').value) || 100;
            const totalCost = unitCost * qty;

            // Update Live UI
            document.getElementById('live-total-tannarx').innerText = Math.round(unitCost).toLocaleString('uz-UZ') + " so'm";
            document.getElementById('live-step-fabric').innerText = Math.round(totalFabric).toLocaleString('uz-UZ') + " so'm";
            document.getElementById('live-step-decor').innerText = Math.round(totalDecor).toLocaleString('uz-UZ') + " so'm";
            document.getElementById('live-step-sewing').innerText = Math.round(totalSewing).toLocaleString('uz-UZ') + " so'm";
            document.getElementById('live-step-accessories').innerText = Math.round(totalAccessory).toLocaleString('uz-UZ') + " so'm";
            document.getElementById('live-step-overhead').innerText = Math.round(totalOverhead).toLocaleString('uz-UZ') + " so'm";
            document.getElementById('live-step-packaging').innerText = Math.round(totalPackaging).toLocaleString('uz-UZ') + " so'm";

            // Update Summary step
            const summaryTannarx = document.getElementById('wizard-summary-tannarx');
            const summaryTotal = document.getElementById('wizard-summary-total-cost');
            const summaryQtyLabel = document.getElementById('wizard-summary-qty-label');
            if (summaryTannarx) summaryTannarx.innerText = Math.round(unitCost).toLocaleString('uz-UZ') + " so'm";
            if (summaryTotal) summaryTotal.innerText = Math.round(totalCost).toLocaleString('uz-UZ') + " so'm";
            if (summaryQtyLabel) summaryQtyLabel.innerText = qty.toLocaleString('uz-UZ');

            // Suggested markups
            const recWholesale = Math.round(unitCost * 1.35);
            const recRetail = Math.round(unitCost * 1.60);
            
            const wsLabel = document.getElementById('wizard-rec-wholesale');
            const rtLabel = document.getElementById('wizard-rec-retail');
            if (wsLabel) wsLabel.innerText = recWholesale.toLocaleString('uz-UZ');
            if (rtLabel) rtLabel.innerText = recRetail.toLocaleString('uz-UZ');

            return {
                totalFabric,
                totalDecor,
                totalSewing,
                totalAccessory,
                totalOverhead,
                totalPackaging,
                unitCost,
                totalCost,
                qty,
                recWholesale,
                recRetail
            };
        }

        // Attach listeners to default elements
        document.getElementById('wizard-model-qty').addEventListener('input', updateWizardCalculation);
        document.querySelectorAll('.fabric-price-input, .fabric-consumption-input, .fabric-type-select, .packaging-price-input, .packaging-checkbox').forEach(input => {
            input.addEventListener('input', updateWizardCalculation);
            input.addEventListener('change', updateWizardCalculation);
        });

        // --- Premium Accordion Wizard Navigation & Interactions ---
        let activeStep = 0;
        const completedSteps = new Set();

        function goToStep(stepNum) {
            if (stepNum < 0 || stepNum > 6) return;

            // Update calculations first
            const calc = updateWizardCalculation();

            for (let idx = 0; idx <= 6; idx++) {
                const card = document.getElementById('step-card-' + idx);
                if (!card) continue;

                const statusEl = document.getElementById(`step-${idx}-status`);
                const summaryEl = document.getElementById(`step-${idx}-summary`);

                if (idx === stepNum) {
                    card.classList.remove('collapsed');
                    card.classList.add('active');
                    if (statusEl) {
                        statusEl.className = 'step-status-indicator status-filling';
                        statusEl.innerText = 'To\'ldirilmoqda';
                    }
                } else {
                    card.classList.remove('active');
                    card.classList.add('collapsed');
                    
                    if (statusEl) {
                        if (completedSteps.has(idx)) {
                            card.classList.add('completed');
                            statusEl.className = 'step-status-indicator status-completed';
                            statusEl.innerText = 'Bajarildi';
                        } else {
                            card.classList.remove('completed');
                            statusEl.className = 'step-status-indicator status-waiting';
                            statusEl.innerText = 'Kutilmoqda';
                        }
                    }
                }
            }
            activeStep = stepNum;
            updateStepSummaries(calc);

            // Suggested prices populating on step 6
            if (stepNum === 6) {
                const wsInput = document.getElementById('wizard-wholesale-price');
                const rtInput = document.getElementById('wizard-retail-price');
                if (wsInput && (!wsInput.value || parseFloat(wsInput.value) <= 0)) {
                    wsInput.value = calc.recWholesale;
                }
                if (rtInput && (!rtInput.value || parseFloat(rtInput.value) <= 0)) {
                    rtInput.value = calc.recRetail;
                }
            }
        }

        function validateStep(stepNum) {
            if (stepNum === 0) {
                const name = document.getElementById('wizard-model-name').value.trim();
                if (!name) {
                    showToast("Iltimos, model nomini kiriting (0-qadam).", "warning");
                    return false;
                }
            }
            if (stepNum === 6) {
                const wholesale = parseFloat(document.getElementById('wizard-wholesale-price').value) || 0;
                const retail = parseFloat(document.getElementById('wizard-retail-price').value) || 0;
                if (wholesale <= 0 || retail <= 0) {
                    showToast("Iltimos, ulgurji va chakana narxlarni kiriting.", "warning");
                    return false;
                }
            }
            return true;
        }

        function updateStepSummaries(calc) {
            if (!calc) calc = updateWizardCalculation();

            // 0-qadam
            const type = document.getElementById('wizard-product-type').value;
            const name = document.getElementById('wizard-model-name').value.trim();
            const qty = parseInt(document.getElementById('wizard-model-qty').value) || 100;
            const s0 = document.getElementById('step-0-summary');
            if (s0) {
                if (name) {
                    s0.innerText = `${type} | ${name} | ${qty} dona`;
                    s0.style.display = 'inline-block';
                } else {
                    s0.style.display = 'none';
                }
            }

            // 1-qadam (Matolar)
            const s1 = document.getElementById('step-1-summary');
            if (s1) {
                const fabricsCount = document.querySelectorAll('.fabric-row').length;
                if (calc.totalFabric > 0) {
                    s1.innerText = `Matolar: ${fabricsCount} ta - ${Math.round(calc.totalFabric).toLocaleString('uz-UZ')} so'm`;
                    s1.style.display = 'inline-block';
                } else {
                    s1.style.display = 'none';
                }
            }

            // 2-qadam (Bezaklar)
            const s2 = document.getElementById('step-2-summary');
            if (s2) {
                const decors = [];
                document.querySelectorAll('.decoration-row').forEach(row => {
                    const active = row.querySelector('.decor-checkbox').checked;
                    if (active) {
                        const label = row.querySelector('label').innerText.split('(')[0].trim();
                        decors.push(label);
                    }
                });
                if (decors.length > 0) {
                    s2.innerText = `Bezaklar: ${decors.join(', ')} - ${Math.round(calc.totalDecor).toLocaleString('uz-UZ')} so'm`;
                    s2.style.display = 'inline-block';
                } else {
                    s2.style.display = 'none';
                }
            }

            // 3-qadam (Tikuv)
            const s3 = document.getElementById('step-3-summary');
            if (s3) {
                const sewingList = [];
                document.querySelectorAll('.sewing-row').forEach(row => {
                    const active = row.querySelector('.sewing-checkbox').checked;
                    if (active) {
                        sewingList.push(row.getAttribute('data-name'));
                    }
                });
                if (sewingList.length > 0) {
                    s3.innerText = `Tikuv: ${sewingList.length} ta - ${Math.round(calc.totalSewing).toLocaleString('uz-UZ')} so'm`;
                    s3.style.display = 'inline-block';
                } else {
                    s3.style.display = 'none';
                }
            }

            // 4-qadam (Aksessuarlar va Ishxona)
            const s4 = document.getElementById('step-4-summary');
            if (s4) {
                const accCount = Array.from(document.querySelectorAll('.accessory-row')).filter(row => row.querySelector('.accessory-checkbox').checked).length;
                const ohCount = Array.from(document.querySelectorAll('.overhead-row')).filter(row => row.querySelector('.overhead-checkbox').checked).length;
                const totalAccOh = calc.totalAccessory + calc.totalOverhead;
                
                if (totalAccOh > 0) {
                    s4.innerText = `Aksessuar/Ishxona: ${accCount + ohCount} ta - ${Math.round(totalAccOh).toLocaleString('uz-UZ')} so'm`;
                    s4.style.display = 'inline-block';
                } else {
                    s4.style.display = 'none';
                }
            }

            // 5-qadam (Qadoqlash)
            const s5 = document.getElementById('step-5-summary');
            if (s5) {
                const packagingCount = Array.from(document.querySelectorAll('.packaging-row')).filter(row => row.querySelector('.packaging-checkbox').checked).length;
                if (calc.totalPackaging > 0) {
                    s5.innerText = `Qadoqlash: ${packagingCount} ta - ${Math.round(calc.totalPackaging).toLocaleString('uz-UZ')} so'm`;
                    s5.style.display = 'inline-block';
                } else {
                    s5.style.display = 'none';
                }
            }

            // 6-qadam (Yakun)
            const s6 = document.getElementById('step-6-summary');
            if (s6) {
                const wholesale = parseFloat(document.getElementById('wizard-wholesale-price').value) || 0;
                const retail = parseFloat(document.getElementById('wizard-retail-price').value) || 0;
                if (wholesale > 0 || retail > 0) {
                    s6.innerText = `Ulgurji: ${Math.round(wholesale).toLocaleString('uz-UZ')} / Chakana: ${Math.round(retail).toLocaleString('uz-UZ')} so'm`;
                    s6.style.display = 'inline-block';
                } else {
                    s6.style.display = 'none';
                }
            }
        }

        // Header click interaction to jump/toggle step
        document.querySelectorAll('.manual-section-header').forEach(header => {
            header.addEventListener('click', function() {
                const card = header.closest('.manual-section-card');
                if (!card) return;
                const targetStep = parseInt(card.getAttribute('data-step'));

                // Only allow jumping if step 0 is filled
                const name = document.getElementById('wizard-model-name').value.trim();
                if (!name && targetStep > 0) {
                    showToast("Iltimos, avval 0-bosqichda model nomini kiriting.", "warning");
                    return;
                }

                // If opening a step, validate current active step first (if going forward)
                if (targetStep > activeStep) {
                    // Validate all intermediate steps
                    for (let s = activeStep; s < targetStep; s++) {
                        if (!validateStep(s)) return;
                        completedSteps.add(s);
                    }
                }

                goToStep(targetStep);
            });
        });

        // Next / Prev button events
        document.querySelectorAll('.btn-next-step').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const nextStep = parseInt(btn.getAttribute('data-next'));
                
                // Validate current step
                if (validateStep(activeStep)) {
                    completedSteps.add(activeStep);
                    goToStep(nextStep);
                }
            });
        });

        document.querySelectorAll('.btn-prev-step').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const prevStep = parseInt(btn.getAttribute('data-prev'));
                goToStep(prevStep);
            });
        });

        // Listen for all input changes to update calculations and summaries in real-time
        document.getElementById('form-manual-model-wizard').addEventListener('input', function() {
            updateStepSummaries();
        });

        // Submit wizard - Save to showroom
        const submitBtn = document.getElementById('wizard-submit-btn');
        submitBtn.addEventListener('click', function(e) {
            e.stopPropagation();

            const name = document.getElementById('wizard-model-name').value.trim();
            const type = document.getElementById('wizard-product-type').value;
            const qty = parseInt(document.getElementById('wizard-model-qty').value) || 100;
            const imageBase64 = document.getElementById('wizard-model-image-base64').value.trim();
            const imageUrl = document.getElementById('wizard-model-image').value.trim();
            const imageSrc = imageBase64 || imageUrl || '';
            const wholesale = parseFloat(document.getElementById('wizard-wholesale-price').value) || 0;
            const retail = parseFloat(document.getElementById('wizard-retail-price').value) || 0;
            const note = document.getElementById('wizard-note').value.trim();

            if (!name) {
                showToast("Iltimos, model nomini kiriting (0-qadam).", "warning");
                goToStep(0);
                return;
            }
            if (wholesale <= 0 || retail <= 0) {
                showToast("Iltimos, narxlarni to'g'ri kiriting (6-qadam).", "warning");
                goToStep(6);
                return;
            }

            // Run final calculation
            const calc = updateWizardCalculation();

            // Build detailed fabrics array
            const fabricsData = [];
            document.querySelectorAll('.fabric-row').forEach(row => {
                const fType = row.querySelector('.fabric-type-select').value;
                const fPrice = parseFloat(row.querySelector('.fabric-price-input').value) || 0;
                const fConsumption = parseFloat(row.querySelector('.fabric-consumption-input').value) || 0;
                fabricsData.push({
                    type: fType,
                    pricePerKg: fPrice,
                    consumptionGrams: fConsumption,
                    costPerUnit: (fPrice * fConsumption) / 1000
                });
            });

            // Build detailed decorations array
            const decorData = [];
            document.querySelectorAll('.decoration-row').forEach(row => {
                const active = row.querySelector('.decor-checkbox').checked;
                const dName = row.querySelector('label').innerText.split('(')[0].trim();
                const dPrice = parseFloat(row.querySelector('.decor-price-input').value) || 0;
                if (active) {
                    decorData.push({
                        name: dName,
                        price: dPrice
                    });
                }
            });

            // Build detailed sewing array
            const sewingData = [];
            document.querySelectorAll('.sewing-row').forEach(row => {
                const active = row.querySelector('.sewing-checkbox').checked;
                const sName = row.getAttribute('data-name');
                const sPrice = parseFloat(row.querySelector('.sewing-price-input').value) || 0;
                if (active) {
                    sewingData.push({
                        name: sName,
                        price: sPrice
                    });
                }
            });

            // Build detailed accessories array
            const accessoryData = [];
            document.querySelectorAll('.accessory-row').forEach(row => {
                const active = row.querySelector('.accessory-checkbox').checked;
                const aName = row.getAttribute('data-name');
                const aPrice = parseFloat(row.querySelector('.accessory-price-input').value) || 0;
                const aQty = parseFloat(row.querySelector('.accessory-qty-input').value) || 0;
                const aUnit = row.getAttribute('data-unit') || 'dona';
                if (active) {
                    const aCost = aUnit === 'gr' ? (aPrice * aQty) / 1000 : (aPrice * aQty);
                    accessoryData.push({
                        name: aName,
                        price: aPrice,
                        qty: aQty,
                        unit: aUnit,
                        cost: aCost
                    });
                }
            });

            // Build detailed overheads array
            const overheadData = [];
            document.querySelectorAll('.overhead-row').forEach(row => {
                const active = row.querySelector('.overhead-checkbox').checked;
                const oName = row.getAttribute('data-name');
                const oPrice = parseFloat(row.querySelector('.overhead-price-input').value) || 0;
                if (active) {
                    overheadData.push({
                        name: oName,
                        price: oPrice
                    });
                }
            });

            // Build detailed packaging array
            const packagingData = [];
            document.querySelectorAll('.packaging-row').forEach(row => {
                const active = row.querySelector('.packaging-checkbox').checked;
                const pName = row.getAttribute('data-name') || row.querySelector('label').innerText.split('(')[0].trim();
                const pPrice = parseFloat(row.querySelector('.packaging-price-input').value) || 0;
                if (active) {
                    packagingData.push({
                        name: pName,
                        price: pPrice
                    });
                }
            });

            const newModel = {
                id: 'MANUAL-' + Date.now() + '-' + Math.floor(Math.random() * 10000),
                type: type,
                name: name,
                qty: qty,
                wholesalePrice: wholesale,
                retailPrice: retail,
                totalProductionCost: calc.totalCost,
                imageSrc: imageSrc || '',
                date: new Date().toISOString().split('T')[0],
                source: 'manual_calculation',
                note: note,
                calculationDetails: {
                    fabrics: fabricsData,
                    decorations: decorData,
                    sewing: sewingData,
                    accessories: accessoryData,
                    overheads: overheadData,
                    packaging: packagingData,
                    totals: {
                        fabrics: calc.totalFabric,
                        decorations: calc.totalDecor,
                        sewing: calc.totalSewing,
                        accessories: calc.totalAccessory,
                        overheads: calc.totalOverhead,
                        packaging: calc.totalPackaging,
                        unitCost: calc.unitCost,
                        totalCost: calc.totalCost
                    }
                }
            };

            if (!state.showroomCatalog) state.showroomCatalog = [];

            if (state.editingCatalogId) {
                // Find existing item index
                const idx = state.showroomCatalog.findIndex(i => i.id === state.editingCatalogId);
                if (idx !== -1) {
                    const originalItem = state.showroomCatalog[idx];
                    
                    // Build params object for backward compatibility with 3D or other views
                    const p = {
                        paramSew: sewingData.find(s => s.name === 'Chok') ? (sewingData.find(s => s.name === 'Chok').price > 0 ? Math.round(calc.totalSewing / (sewingData.find(s => s.name === 'Chok').price || 1)) : 0) : 0,
                        paramOverlock: sewingData.find(s => s.name === 'Overlok') ? 1 : 0,
                        paramFlatlock: sewingData.find(s => s.name === 'Raspashivalka') ? 1 : 0,
                        paramFolds: sewingData.find(s => s.name === 'Bostiriq') ? 1 : 0,
                        paramInserts: sewingData.find(s => s.name === 'Rangli detal ulash') ? 1 : 0,
                        paramPaints: decorData.length > 0 ? 1 : 0,
                        paramAccessories: accessoryData.length > 0 ? 1 : 0,
                        
                        costFabricQty: calc.totalFabric / (fabricsData[0]?.pricePerKg || 150000),
                        costSew: sewingData.find(s => s.name === 'Chok')?.price || 500,
                        costOverlock: sewingData.find(s => s.name === 'Overlok')?.price || 600,
                        costFlatlock: sewingData.find(s => s.name === 'Raspashivalka')?.price || 800,
                        costFolds: sewingData.find(s => s.name === 'Bostiriq')?.price || 400,
                        costInserts: sewingData.find(s => s.name === 'Rangli detal ulash')?.price || 1500,
                        costPaints: decorData[0]?.price || 3000,
                        costAccessories: accessoryData[0]?.price || 2500,
                        costFabricPrice: fabricsData[0]?.pricePerKg || 150000,
                        costElectricity: overheadData.find(o => o.name === 'Elektr energiya')?.price || 1000,
                        costPackaging: packagingData[0]?.price || 1500
                    };

                    const updatedModel = {
                        id: originalItem.id,
                        type: type,
                        name: name,
                        qty: qty,
                        wholesalePrice: wholesale,
                        retailPrice: retail,
                        totalProductionCost: calc.totalCost,
                        imageSrc: imageSrc || originalItem.imageSrc || '',
                        date: originalItem.date || new Date().toISOString().split('T')[0],
                        source: originalItem.source || 'manual_calculation',
                        note: note,
                        params: p,
                        calculationDetails: {
                            fabrics: fabricsData,
                            decorations: decorData,
                            sewing: sewingData,
                            accessories: accessoryData,
                            overheads: overheadData,
                            packaging: packagingData,
                            totals: {
                                fabrics: calc.totalFabric,
                                decorations: calc.totalDecor,
                                sewing: calc.totalSewing,
                                accessories: calc.totalAccessory,
                                overheads: calc.totalOverhead,
                                packaging: calc.totalPackaging,
                                unitCost: calc.unitCost,
                                totalCost: calc.totalCost
                            }
                        }
                    };

                    state.showroomCatalog[idx] = updatedModel;
                    showToast(`"${name}" modeli muvaffaqiyatli yangilandi!`, "success");
                }
            } else {
                const newModel = {
                    id: 'MANUAL-' + Date.now() + '-' + Math.floor(Math.random() * 10000),
                    type: type,
                    name: name,
                    qty: qty,
                    wholesalePrice: wholesale,
                    retailPrice: retail,
                    totalProductionCost: calc.totalCost,
                    imageSrc: imageSrc || '',
                    date: new Date().toISOString().split('T')[0],
                    source: 'manual_calculation',
                    note: note,
                    calculationDetails: {
                        fabrics: fabricsData,
                        decorations: decorData,
                        sewing: sewingData,
                        accessories: accessoryData,
                        overheads: overheadData,
                        packaging: packagingData,
                        totals: {
                            fabrics: calc.totalFabric,
                            decorations: calc.totalDecor,
                            sewing: calc.totalSewing,
                            accessories: calc.totalAccessory,
                            overheads: calc.totalOverhead,
                            packaging: calc.totalPackaging,
                            unitCost: calc.unitCost,
                            totalCost: calc.totalCost
                        }
                    }
                };

                state.showroomCatalog.push(newModel);
                showToast(`"${name}" modeli muvaffaqiyatli Showroom katalogiga saqlandi!`, "success");
            }
            
            // Reset showroom filter to 'All' to ensure the model is visible
            state.showroomFilter = 'All';
            saveState();
            setupShowroomFilter();

            // Reset Form and Wizard
            resetAccordionWizard();

            // Redirect to showroom
            setTimeout(function() {
                const btnShowroom = document.getElementById('sub-btn-showroom');
                if (btnShowroom) btnShowroom.click();
            }, 600);
        });

        // Reset wizard logic
        const resetBtn = document.getElementById('wizard-reset-all-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (state.editingCatalogId) {
                    state.editingCatalogId = null;
                    resetAccordionWizard();
                    showToast("Tahrirlash bekor qilindi.", "info");
                    
                    const btnShowroom = document.getElementById('sub-btn-showroom');
                    if (btnShowroom) btnShowroom.click();
                } else {
                    if (confirm("Rostdan ham barcha kiritilgan ma'lumotlarni o'chirib, formani tozalamoqchimisiz?")) {
                        resetAccordionWizard();
                        showToast("Forma tozalandi.", "info");
                    }
                }
            });
        }

        function resetAccordionWizard() {
            state.editingCatalogId = null;
            
            const submitBtn = document.getElementById('wizard-submit-btn');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Modelni Showroomga Saqlash';
                submitBtn.classList.remove('btn-edit-mode');
            }
            const resetBtn = document.getElementById('wizard-reset-all-btn');
            if (resetBtn) {
                resetBtn.innerHTML = '<i class="fa-solid fa-eraser"></i> Tozalash';
            }
            const wizardForm = document.getElementById('form-manual-model-wizard');
            if (wizardForm) wizardForm.reset();
            
            document.getElementById('wizard-model-name').value = '';
            document.getElementById('wizard-model-image').value = '';
            document.getElementById('wizard-model-image-base64').value = '';
            document.getElementById('wizard-wholesale-price').value = '';
            document.getElementById('wizard-retail-price').value = '';
            document.getElementById('wizard-note').value = '';
            
            // Clean up file picker previews
            const btnRemoveFile = document.getElementById('btn-remove-wizard-file');
            if (btnRemoveFile) btnRemoveFile.click();
            
            // Remove custom added rows
            document.querySelectorAll('.fabric-row').forEach((row, idx) => {
                if (idx > 0) row.remove();
            });
            document.querySelectorAll('.sewing-row, .accessory-row, .overhead-row, .packaging-row').forEach(row => {
                if (row.querySelector('.btn-remove-row')) row.remove();
                else {
                    const chk = row.querySelector('input[type="checkbox"]');
                    if (chk) {
                        const name = row.getAttribute('data-name');
                        if (name === 'Chok' || name === 'Overlok' || name === 'Elektr energiya' || name === 'Oziq-ovqat' || name === 'Yo\'l kira' || name === 'Yo\'l kira (Transport)' || name === 'Biodegradable paket' || name === 'Dazmollash xizmati' || name === 'Qadoqlash xizmati' || name === 'Etiketka') {
                            chk.checked = true;
                        } else {
                            chk.checked = false;
                        }
                        const pInp = row.querySelector('.sewing-price-input, .accessory-price-input, .overhead-price-input, .packaging-price-input');
                        const qInp = row.querySelector('.accessory-qty-input');
                        if (chk.checked) {
                            if (pInp) pInp.removeAttribute('disabled');
                            if (qInp) qInp.removeAttribute('disabled');
                        } else {
                            if (pInp) pInp.setAttribute('disabled', 'true');
                            if (qInp) qInp.setAttribute('disabled', 'true');
                        }
                    }
                }
            });

            completedSteps.clear();
            typeCards[0].click();
            goToStep(0);
            updateWizardCalculation();
        }

        // Initialize Wizard
        goToStep(0);
        updateWizardCalculation();
    }

    // Robust readyState check to avoid missing DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initManualModel);
    } else {
        initManualModel();
    }
})();


// --- VIEW MANUAL DETAILS MODAL LOGIC ---
window.openCalculationDetailsModal = function(id) {
    const item = state.showroomCatalog.find(i => i.id === id);
    if (!item || !item.calculationDetails) return;

    const calc = item.calculationDetails;
    const body = document.getElementById('manual-details-body');
    if (!body) return;

    let fabricsHtml = '';
    calc.fabrics.forEach(f => {
        fabricsHtml += `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 8px 0; color:#fff;">${f.type}</td>
                <td style="padding: 8px 0; text-align:right;">${Math.round(f.pricePerKg).toLocaleString('uz-UZ')} so'm</td>
                <td style="padding: 8px 0; text-align:right;">${f.consumptionGrams} gr</td>
                <td style="padding: 8px 0; text-align:right; font-weight:bold; color:var(--color-won);">${Math.round(f.costPerUnit).toLocaleString('uz-UZ')} so'm</td>
            </tr>
        `;
    });

    let decorHtml = '';
    if (calc.decorations && calc.decorations.length > 0) {
        calc.decorations.forEach(d => {
            decorHtml += `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 8px 0; color:#fff;">${d.name}</td>
                    <td style="padding: 8px 0; text-align:right; font-weight:bold; color:var(--color-won);">${Math.round(d.price).toLocaleString('uz-UZ')} so'm</td>
                </tr>
            `;
        });
    } else {
        decorHtml = '<tr><td colspan="2" style="padding: 8px 0; color:var(--color-text-muted); font-style:italic;">Bezaklar ishlatilmagan</td></tr>';
    }

    let sewingHtml = '';
    if (calc.sewing && calc.sewing.length > 0) {
        calc.sewing.forEach(s => {
            sewingHtml += `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 8px 0; color:#fff;">${s.name}</td>
                    <td style="padding: 8px 0; text-align:right; font-weight:bold; color:var(--color-won);">${Math.round(s.price).toLocaleString('uz-UZ')} so'm</td>
                </tr>
            `;
        });
    } else {
        sewingHtml = '<tr><td colspan="2" style="padding: 8px 0; color:var(--color-text-muted); font-style:italic;">Tikuv xizmatlari kiritilmagan</td></tr>';
    }

    let accHtml = '';
    if (calc.accessories && calc.accessories.length > 0) {
        calc.accessories.forEach(a => {
            const unitLabel = a.unit === 'gr' ? 'gr' : 'ta';
            const priceLabel = a.unit === 'gr' ? "so'm/kg" : "so'm";
            accHtml += `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 8px 0; color:#fff;">${a.name}</td>
                    <td style="padding: 8px 0; text-align:right;">${Math.round(a.price).toLocaleString('uz-UZ')} ${priceLabel}</td>
                    <td style="padding: 8px 0; text-align:right;">${a.qty} ${unitLabel}</td>
                    <td style="padding: 8px 0; text-align:right; font-weight:bold; color:var(--color-won);">${Math.round(a.cost).toLocaleString('uz-UZ')} so'm</td>
                </tr>
            `;
        });
    } else {
        accHtml = '<tr><td colspan="4" style="padding: 8px 0; color:var(--color-text-muted); font-style:italic;">Aksessuarlar kiritilmagan</td></tr>';
    }

    let overheadHtml = '';
    if (calc.overheads && calc.overheads.length > 0) {
        calc.overheads.forEach(o => {
            overheadHtml += `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 8px 0; color:#fff;">${o.name}</td>
                    <td style="padding: 8px 0; text-align:right; font-weight:bold; color:var(--color-won);">${Math.round(o.price).toLocaleString('uz-UZ')} so'm</td>
                </tr>
            `;
        });
    } else {
        overheadHtml = '<tr><td colspan="2" style="padding: 8px 0; color:var(--color-text-muted); font-style:italic;">Ishxona xarajatlari kiritilmagan</td></tr>';
    }

    let packagingHtml = '';
    if (calc.packaging && calc.packaging.length > 0) {
        calc.packaging.forEach(p => {
            packagingHtml += `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 8px 0; color:#fff;">${p.name}</td>
                    <td style="padding: 8px 0; text-align:right; font-weight:bold; color:var(--color-won);">${Math.round(p.price).toLocaleString('uz-UZ')} so'm</td>
                </tr>
            `;
        });
    } else {
        packagingHtml = '<tr><td colspan="2" style="padding: 8px 0; color:var(--color-text-muted); font-style:italic;">Qadoqlash xarajatlari kiritilmagan</td></tr>';
    }

    body.innerHTML = `
        <div style="margin-bottom: 16px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
            <div style="display:flex; justify-content:space-between; margin-bottom: 6px;">
                <span style="color:var(--color-text-muted);">Model:</span>
                <strong style="color:var(--color-prospect); font-size:1.05rem;">${item.name || item.type}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom: 6px;">
                <span style="color:var(--color-text-muted);">Mahsulot turi:</span>
                <strong>${item.type}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom: 6px;">
                <span style="color:var(--color-text-muted);">Buyurtma soni:</span>
                <strong>${item.qty} ta</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Sana:</span>
                <strong>${item.date}</strong>
            </div>
        </div>

        <div style="margin-bottom: 16px;">
            <h4 style="color:var(--color-prospect); margin: 0 0 8px; font-size:0.95rem; border-left: 3px solid var(--color-prospect); padding-left: 8px;"><i class="fa-solid fa-layer-group"></i> 1. Matolar xarajati: Jami ${Math.round(calc.totals.fabrics).toLocaleString('uz-UZ')} so'm</h4>
            <table style="width:100%; border-collapse:collapse; font-size:0.8rem;">
                <thead>
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color:var(--color-text-muted); text-align:left;">
                        <th style="padding: 4px 0;">Mato turi</th>
                        <th style="padding: 4px 0; text-align:right;">1kg narxi</th>
                        <th style="padding: 4px 0; text-align:right;">Sarf</th>
                        <th style="padding: 4px 0; text-align:right;">Summa</th>
                    </tr>
                </thead>
                <tbody>${fabricsHtml}</tbody>
            </table>
        </div>

        <div style="margin-bottom: 16px;">
            <h4 style="color:var(--color-prospect); margin: 0 0 8px; font-size:0.95rem; border-left: 3px solid var(--color-prospect); padding-left: 8px;"><i class="fa-solid fa-palette"></i> 2. Bezaklar xarajati: Jami ${Math.round(calc.totals.decor).toLocaleString('uz-UZ')} so'm</h4>
            <table style="width:100%; border-collapse:collapse; font-size:0.8rem;">
                <tbody>${decorHtml}</tbody>
            </table>
        </div>

        <div style="margin-bottom: 16px;">
            <h4 style="color:var(--color-prospect); margin: 0 0 8px; font-size:0.95rem; border-left: 3px solid var(--color-prospect); padding-left: 8px;"><i class="fa-solid fa-scissors"></i> 3. Tikuv xizmatlari: Jami ${Math.round(calc.totals.sewing).toLocaleString('uz-UZ')} so'm</h4>
            <table style="width:100%; border-collapse:collapse; font-size:0.8rem;">
                <tbody>${sewingHtml}</tbody>
            </table>
        </div>

        <div style="margin-bottom: 16px;">
            <h4 style="color:var(--color-prospect); margin: 0 0 8px; font-size:0.95rem; border-left: 3px solid var(--color-prospect); padding-left: 8px;"><i class="fa-solid fa-puzzle-piece"></i> 4. Aksessuarlar xarajati: Jami ${Math.round(calc.totals.accessories).toLocaleString('uz-UZ')} so'm</h4>
            <table style="width:100%; border-collapse:collapse; font-size:0.8rem;">
                <thead>
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color:var(--color-text-muted); text-align:left;">
                        <th style="padding: 4px 0;">Nomi</th>
                        <th style="padding: 4px 0; text-align:right;">Narxi</th>
                        <th style="padding: 4px 0; text-align:right;">Soni</th>
                        <th style="padding: 4px 0; text-align:right;">Summa</th>
                    </tr>
                </thead>
                <tbody>${accHtml}</tbody>
            </table>
        </div>

        <div style="margin-bottom: 16px;">
            <h4 style="color:var(--color-prospect); margin: 0 0 8px; font-size:0.95rem; border-left: 3px solid var(--color-prospect); padding-left: 8px;"><i class="fa-solid fa-building-user"></i> 5. Ishxona xarajatlari: Jami ${Math.round(calc.totals.overheads).toLocaleString('uz-UZ')} so'm</h4>
            <table style="width:100%; border-collapse:collapse; font-size:0.8rem;">
                <tbody>${overheadHtml}</tbody>
            </table>
        </div>

        <div style="margin-bottom: 16px;">
            <h4 style="color:var(--color-prospect); margin: 0 0 8px; font-size:0.95rem; border-left: 3px solid var(--color-prospect); padding-left: 8px;"><i class="fa-solid fa-box-open"></i> 6. Qadoqlash xarajatlari: Jami ${Math.round(calc.totals.packaging || 0).toLocaleString('uz-UZ')} so'm</h4>
            <table style="width:100%; border-collapse:collapse; font-size:0.8rem;">
                <tbody>${packagingHtml}</tbody>
            </table>
        </div>

        <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 8px; padding: 12px; margin-top: 20px;">
            <div style="display:flex; justify-content:space-between; margin-bottom: 4px;">
                <span><strong>1 dona uchun Tannarx:</strong></span>
                <strong style="color:var(--color-won); font-size:1.1rem;">${Math.round(calc.totals.unitCost).toLocaleString('uz-UZ')} so'm</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom: 4px;">
                <span><strong>Buyurtma Ulgurji Narxi:</strong></span>
                <strong style="color:var(--color-won);">${Math.round(item.wholesalePrice).toLocaleString('uz-UZ')} so'm</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom: 8px;">
                <span><strong>Chakana Narxi:</strong></span>
                <strong style="color:var(--color-blue);">${Math.round(item.retailPrice).toLocaleString('uz-UZ')} so'm</strong>
            </div>
            <div style="border-top:1px solid rgba(56, 189, 248, 0.2); padding-top: 8px; display:flex; justify-content:space-between;">
                <span><strong>Jami Tannarx (${item.qty} ta):</strong></span>
                <strong>${Math.round(calc.totals.totalCost).toLocaleString('uz-UZ')} so'm</strong>
            </div>
            ${item.note ? `<div style="margin-top: 10px; font-size: 0.8rem; color: var(--color-text-muted); border-top:1px dashed rgba(255,255,255,0.05); padding-top: 8px;">
                <strong>Izoh:</strong> ${item.note}
            </div>` : ''}
        </div>
    `;

    openModal('modal-manual-details');
};

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

    // Define setAnalysisMode globally so index.html onclick can access it
    window.setAnalysisMode = function(mode) {
        state.analysisMode = mode;
        saveState();

        const btnPartial = document.getElementById('mode-partial');
        const btnFull = document.getElementById('mode-full');
        const fInput = document.getElementById('ai-file-input');
        const dPrompt = document.getElementById('dropzone-prompt');

        if (!btnPartial || !btnFull) return;

        if (mode === 'partial') {
            btnPartial.classList.add('active');
            btnPartial.style.background = 'var(--color-prospect)';
            btnPartial.style.color = 'white';
            btnPartial.style.fontWeight = '600';

            btnFull.classList.remove('active');
            btnFull.style.background = 'transparent';
            btnFull.style.color = 'var(--color-text-muted)';
            btnFull.style.fontWeight = '500';

            if (fInput) {
                fInput.removeAttribute('multiple');
            }
            if (dPrompt) {
                const h4 = dPrompt.querySelector('h4');
                const p = dPrompt.querySelector('p');
                if (h4) h4.innerText = "Kiyimning old ko'rinishi rasmini bosing yoki sudrab yuklang (AI orqa va yon ko'rinishlarni chizadi)";
                if (p) p.innerText = "Formatlar: PNG, JPG, JPEG (Maks. 1 ta rasm, Qisman rejim)";
            }
        } else {
            btnFull.classList.add('active');
            btnFull.style.background = 'var(--color-prospect)';
            btnFull.style.color = 'white';
            btnFull.style.fontWeight = '600';

            btnPartial.classList.remove('active');
            btnPartial.style.background = 'transparent';
            btnPartial.style.color = 'var(--color-text-muted)';
            btnPartial.style.fontWeight = '500';

            if (fInput) {
                fInput.setAttribute('multiple', 'true');
            }
            if (dPrompt) {
                const h4 = dPrompt.querySelector('h4');
                const p = dPrompt.querySelector('p');
                if (h4) h4.innerText = "Kiyimning old, orqa, chap va o'ng ko'rinishlarini tanlab bosing yoki sudrab yuklang";
                if (p) p.innerText = "Formatlar: PNG, JPG, JPEG (Maks. 4 ta rasm, To'liq rejim)";
            }
        }
    };

    // Initialize state.analysisMode if undefined, and set initial UI state
    if (typeof state.analysisMode === 'undefined') {
        state.analysisMode = 'partial';
    }
    window.setAnalysisMode(state.analysisMode);

    // Canvas-based blueprint/CAD blueprint generator
    function generateTechnicalBlueprint(imgElement, type) {
        const canvas = document.createElement('canvas');
        canvas.width = imgElement.width || imgElement.naturalWidth || 400;
        canvas.height = imgElement.height || imgElement.naturalHeight || 500;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.save();
        if (type === 'back') {
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
        } else if (type === 'left') {
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
            const squishedWidth = canvas.width * 0.45;
            const offset = (canvas.width - squishedWidth) / 2;
            ctx.drawImage(imgElement, offset, 0, squishedWidth, canvas.height);
        } else if (type === 'right') {
            const squishedWidth = canvas.width * 0.45;
            const offset = (canvas.width - squishedWidth) / 2;
            ctx.drawImage(imgElement, offset, 0, squishedWidth, canvas.height);
        } else {
            ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
        }
        ctx.restore();
        
        const w = canvas.width;
        const h = canvas.height;
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;
        const blueprintData = ctx.createImageData(w, h);
        const bp = blueprintData.data;
        
        for (let y = 1; y < h - 1; y++) {
            for (let x = 1; x < w - 1; x++) {
                const idx = (y * w + x) * 4;
                const r = data[idx];
                const g = data[idx+1];
                const b = data[idx+2];
                const gray = r * 0.3 + g * 0.59 + b * 0.11;
                
                const idxRight = (y * w + (x + 1)) * 4;
                const rR = data[idxRight];
                const gR = data[idxRight+1];
                const bR = data[idxRight+2];
                const grayRight = rR * 0.3 + gR * 0.59 + bR * 0.11;
                
                const idxDown = ((y + 1) * w + x) * 4;
                const rD = data[idxDown];
                const gD = data[idxDown+1];
                const bD = data[idxDown+2];
                const grayDown = rD * 0.3 + gD * 0.59 + bD * 0.11;
                
                const diff = Math.abs(gray - grayRight) + Math.abs(gray - grayDown);
                
                if (diff > 18) {
                    bp[idx] = 0;
                    bp[idx+1] = 229;
                    bp[idx+2] = 255;
                    bp[idx+3] = 255;
                } else {
                    bp[idx] = 10;
                    bp[idx+1] = 25;
                    bp[idx+2] = 49;
                    bp[idx+3] = 255;
                }
            }
        }
        
        for (let x = 0; x < w; x++) {
            const idxTop = x * 4;
            const idxBottom = ((h - 1) * w + x) * 4;
            for (let c = 0; c < 3; c++) {
                bp[idxTop + c] = bp[idxBottom + c] = (c === 0 ? 10 : (c === 1 ? 25 : 49));
            }
            bp[idxTop + 3] = bp[idxBottom + 3] = 255;
        }
        for (let y = 0; y < h; y++) {
            const idxLeft = (y * w) * 4;
            const idxRight = (y * w + (w - 1)) * 4;
            for (let c = 0; c < 3; c++) {
                bp[idxLeft + c] = bp[idxRight + c] = (c === 0 ? 10 : (c === 1 ? 25 : 49));
            }
            bp[idxLeft + 3] = bp[idxRight + 3] = 255;
        }
        
        ctx.putImageData(blueprintData, 0, 0);
        
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.15)';
        ctx.lineWidth = 1;
        
        const gridSpacing = 40;
        ctx.beginPath();
        for (let x = gridSpacing; x < w; x += gridSpacing) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
        }
        for (let y = gridSpacing; y < h; y += gridSpacing) {
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
        }
        ctx.stroke();
        
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
        ctx.lineWidth = 1.5;
        const crossSize = 10;
        const margin = 15;
        const corners = [
            {x: margin, y: margin},
            {x: w - margin, y: margin},
            {x: margin, y: h - margin},
            {x: w - margin, y: h - margin}
        ];
        corners.forEach(c => {
            ctx.beginPath();
            ctx.moveTo(c.x - crossSize, c.y);
            ctx.lineTo(c.x + crossSize, c.y);
            ctx.moveTo(c.x, c.y - crossSize);
            ctx.lineTo(c.x, c.y + crossSize);
            ctx.stroke();
        });
        
        ctx.fillStyle = 'rgba(0, 229, 255, 0.1)';
        ctx.fillRect(w - 120, h - 35, 110, 25);
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.5)';
        ctx.strokeRect(w - 120, h - 35, 110, 25);
        
        ctx.fillStyle = '#00e5ff';
        ctx.font = '10px monospace';
        ctx.fillText("CAD: NANO BANANA", w - 115, h - 20);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px monospace';
        ctx.strokeStyle = '#0a1931';
        ctx.lineWidth = 3;
        
        let labelText = '';
        if (type === 'back') labelText = "NANO BANANA: ORQA KO'RINISH";
        else if (type === 'left') labelText = "NANO BANANA: CHAP PROFIL";
        else if (type === 'right') labelText = "NANO BANANA: O'NG PROFIL";
        else labelText = "NANO BANANA: CHIZMA";
        
        const textWidth = ctx.measureText(labelText).width;
        const textX = (w - textWidth) / 2;
        ctx.strokeText(labelText, textX, 30);
        ctx.fillText(labelText, textX, 30);
        
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.5)';
        ctx.beginPath();
        ctx.moveTo(w * 0.25, h * 0.15);
        ctx.lineTo(w * 0.75, h * 0.15);
        ctx.moveTo(w * 0.25, h * 0.15 - 5);
        ctx.lineTo(w * 0.25, h * 0.15 + 5);
        ctx.moveTo(w * 0.75, h * 0.15 - 5);
        ctx.lineTo(w * 0.75, h * 0.15 + 5);
        ctx.stroke();
        
        ctx.fillStyle = '#00e5ff';
        ctx.font = '9px monospace';
        const widthVal = Math.round(w * 0.15) + "cm";
        ctx.fillText(widthVal, w * 0.46, h * 0.13);
        
        return canvas.toDataURL('image/jpeg', 0.8);
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
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleUploadedFiles(e.dataTransfer.files);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleUploadedFiles(e.target.files);
        }
    });

    function handleUploadedFiles(files) {
        if (!files || files.length === 0) return;

        // Reset previews
        const imagesContainer = document.getElementById('ai-scan-images-container');
        if (imagesContainer) imagesContainer.innerHTML = '';

        // Start scanning animation
        dropPrompt.style.display = 'none';
        scanContainer.style.display = 'flex';
        scanContainer.style.flexDirection = 'column';
        scannerLine.style.display = 'block';
        scanStatus.innerText = "Rasmlar tayyorlanmoqda...";
        scanStatus.style.color = "var(--color-prospect)";

        detectedCard.style.display = 'none';
        worksheetCard.style.display = 'none';
        placeholder.style.display = 'flex';
        content.style.display = 'none';
        resultsCard.classList.remove('active');

        const GEMINI_API_KEY = localStorage.getItem('gemini_api_key') || '';

        if (!GEMINI_API_KEY || GEMINI_API_KEY.length < 10) {
            console.warn("[AI] Gemini API kaliti kiritilmagan yoki noto'g'ri. Standart ko'rsatkichlar yuklanmoqda...");
            
            // Fallback to manual defaults
            const selectedType = document.getElementById('param-type').value || 'Futbolka';
            populateAIParameters(selectedType);
            
            scannerLine.style.display = 'none';
            scanStatus.innerText = `⚠️ API Kalitsiz. Sozlamalar bo'limidan kalit kiriting!`;
            scanStatus.style.color = "var(--color-qualified)";
            
            detectedCard.style.display = 'block';
            worksheetCard.style.display = 'block';
            calculateVisualTannarx();
            return;
        }

        const mode = state.analysisMode || 'partial';

        if (mode === 'partial') {
            const file = files[0];
            if (!file.type.startsWith('image/')) {
                alert('Iltimos, faqat rasm faylini yuklang!');
                resetDropzone();
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const imgDataUrl = event.target.result;
                
                if (scanImg) {
                    scanImg.src = imgDataUrl;
                }

                if (imagesContainer) {
                    const imgPreview = document.createElement('img');
                    imgPreview.className = 'scan-img';
                    imgPreview.src = imgDataUrl;
                    imgPreview.style.cssText = 'width: 140px; height: 180px; object-fit: cover; border-radius: 8px; border: 2px solid rgba(255,255,255,0.1); box-shadow: 0 4px 12px rgba(0,0,0,0.5); margin: 5px;';
                    imagesContainer.appendChild(imgPreview);
                }

                resizeImageToBase64(imgDataUrl, 800, (resizedBase64, resizedMime) => {
                    const base64Data = resizedBase64.split(',')[1];
                    const imagesData = [{
                        mimeType: resizedMime,
                        base64: base64Data
                    }];

                    const tempImg = new Image();
                    tempImg.onload = async () => {
                        scanStatus.innerText = "Nano Banana AI orqa chizmasini yaratmoqda...";
                        await new Promise(r => setTimeout(r, 1200));

                        const backBlueprint = generateTechnicalBlueprint(tempImg, 'back');
                        if (imagesContainer) {
                            const imgPreview = document.createElement('img');
                            imgPreview.className = 'scan-img blueprint-animation';
                            imgPreview.src = backBlueprint;
                            imgPreview.style.cssText = 'width: 140px; height: 180px; object-fit: cover; border-radius: 8px; border: 2px solid var(--color-prospect); box-shadow: 0 4px 12px rgba(0, 229, 255, 0.3); margin: 5px;';
                            imagesContainer.appendChild(imgPreview);
                        }
                        imagesData.push({
                            mimeType: 'image/jpeg',
                            base64: backBlueprint.split(',')[1]
                        });

                        scanStatus.innerText = "Nano Banana AI yon chizmalarini yaratmoqda...";
                        await new Promise(r => setTimeout(r, 1200));

                        const leftBlueprint = generateTechnicalBlueprint(tempImg, 'left');
                        const rightBlueprint = generateTechnicalBlueprint(tempImg, 'right');

                        if (imagesContainer) {
                            const imgPreviewL = document.createElement('img');
                            imgPreviewL.className = 'scan-img blueprint-animation';
                            imgPreviewL.src = leftBlueprint;
                            imgPreviewL.style.cssText = 'width: 140px; height: 180px; object-fit: cover; border-radius: 8px; border: 2px solid var(--color-prospect); box-shadow: 0 4px 12px rgba(0, 229, 255, 0.3); margin: 5px;';
                            imagesContainer.appendChild(imgPreviewL);

                            const imgPreviewR = document.createElement('img');
                            imgPreviewR.className = 'scan-img blueprint-animation';
                            imgPreviewR.src = rightBlueprint;
                            imgPreviewR.style.cssText = 'width: 140px; height: 180px; object-fit: cover; border-radius: 8px; border: 2px solid var(--color-prospect); box-shadow: 0 4px 12px rgba(0, 229, 255, 0.3); margin: 5px;';
                            imagesContainer.appendChild(imgPreviewR);
                        }

                        imagesData.push({
                            mimeType: 'image/jpeg',
                            base64: leftBlueprint.split(',')[1]
                        });
                        imagesData.push({
                            mimeType: 'image/jpeg',
                            base64: rightBlueprint.split(',')[1]
                        });

                        scanStatus.innerText = "AI Chevar tahlilga kirishmoqda...";
                        await new Promise(r => setTimeout(r, 800));

                        sendApiRequest(imagesData);
                    };
                    tempImg.src = imgDataUrl;
                });
            };
            reader.readAsDataURL(file);

        } else {
            const filesArr = Array.from(files).slice(0, 4);
            const validFiles = filesArr.filter(f => f.type.startsWith('image/'));

            if (validFiles.length === 0) {
                alert('Iltimos, faqat rasm fayllarini yuklang!');
                resetDropzone();
                return;
            }

            let loadedCount = 0;
            const imagesData = [];

            validFiles.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const imgDataUrl = event.target.result;
                    
                    if (index === 0 && scanImg) {
                        scanImg.src = imgDataUrl;
                    }

                    if (imagesContainer) {
                        const imgPreview = document.createElement('img');
                        imgPreview.className = 'scan-img';
                        imgPreview.src = imgDataUrl;
                        imgPreview.style.cssText = 'width: 140px; height: 180px; object-fit: cover; border-radius: 8px; border: 2px solid rgba(255,255,255,0.1); box-shadow: 0 4px 12px rgba(0,0,0,0.5); margin: 5px;';
                        imagesContainer.appendChild(imgPreview);
                    }

                    resizeImageToBase64(imgDataUrl, 800, (resizedBase64, resizedMime) => {
                        imagesData.push({
                            mimeType: resizedMime,
                            base64: resizedBase64.split(',')[1]
                        });

                        loadedCount++;
                        if (loadedCount === validFiles.length) {
                            sendApiRequest(imagesData);
                        }
                    });
                };
                reader.readAsDataURL(file);
            });
        }
    }

    async function sendApiRequest(imagesData) {
        scanStatus.innerText = "AI Modelni Tahlil Qilmoqda...";

        // Countdown timer
        let secondsElapsed = 0;
        const countdownInterval = setInterval(() => {
            secondsElapsed++;
            scanStatus.innerText = `AI Modelni Tahlil Qilmoqda... (${secondsElapsed}s)`;
        }, 1000);

        // Build parts array: first element is prompt, subsequent are images
        const promptText = `Sen professional tikuvchilik va kiyim ishlab chiqarish bo'yicha 20 yillik tajribaga ega chevar-texnologssan. Sening vazifang — yuborilgan kiyimning rasm(lar)ini old, orqa, yon yoki yaqinlashtirilgan detallari bo'yicha sinchiklab tahlil qilib, ishlab chiqarish uchun zarur texnik parametrlarni ANIQ hisoblash.

MUHIM QOIDALAR:
1. FAQAT rasm(lar)da ko'rinayotgan narsalarni hisoblash — tasavvur qilma, yo'q narsani qo'shma.
2. Agar biror detalning bor-yo'qligini aniqlay olmasang — 0 yoz.
3. Rang kombinatsiyasi — FAQAT rasmda real ko'rinayotgan turli rangdagi mato bo'laklarini hisoblash. Bir xil rangdagi kiyimda rang kombinatsiyasi = 0.
4. Kraska/Print — FAQAT rasmda bosmachop, chop etilgan yozuv, logotip yoki rasm ko'rinsa hisoblash. Aks holda = 0.
5. Cho'ntaklar, zamoklar va barcha aksessuarlarni kiyimning oldi va orqa qismidan to'liq aniqlab hisobla.

MAHSULOT TURINI ANIQLASH:
- "Futbolka" — qisqa yengli, yoqasiz yoki kichik yoqali, engil trikotaj yuqori kiyim.
- "Trikotaj" — uzun yengli erkaklar trikotaj kiyimi (sviter, longsleeve, termobel).
- "Hudi" — kapyushonli, oldindan zamokli yoki quyma trikotaj kiyim.
- "Shim" — shimlar, shortlar, sport shim — oyoqqa kiyiladigan pastki kiyim.
- "Kurtka" — issiq ustki kiyim, plashch, vetrovka.
- "Sport Kiyim" — sport kostyumi, trayning kiyim.

PARAMETRLAR TA'RIFI:
- param_sew: TIKUV CHOKLARI soni — to'g'ri chiziqli tikuv mashinasida tikiladigan choklarning umumiy soni (yon choklar, yelka choklar, yoqa ulash, yeng ulash, kichik qismlar birlashtirilishi). Har bir alohida tikuv yo'nalishi = 1 chok.
- param_overlock: OVERLOK choklari — gazlamaning qirqilgan chetlariga overlok (serger) bilan ishlov berilgan joylar soni. Har bir alohida chet = 1 overlok.
- param_flatlock: RASPASHIVALKA soni — tekis tikuv (flatlock/coverstitch) bilan qilingan tikuvlar. Odatda yeng uchi, etak qismi va yoqa chetlarida ishlatiladi.
- param_folds: BOSTIRIQ va QAYIRILAR soni — buklanib tikib qo'yilgan joylar (etakning bukilishi, yeng uchining bukilishi, shimning pastki qismi).
- param_inserts: RANGLI MATO KOMBINATSIYALARI — bir kiyimda ishlatiladigan TURLI rangdagi mato bo'laklari soni. Bir xil rangda = 0. 2 xil rang = 1. 3 xil rang = 2.
- param_paints: KRASKA/PRINT soni — rasmda ko'rinadigan bosma (print, logotip, yozuv, rasm) joylarning soni.
- param_accessories: AKSESSUARLAR soni — zamoklar, tugmalar, etiketkalar, razmer belgilari, ip o'tkazgichlar, cho'ntaklar va boshqa qo'shimcha detallarning umumiy soni.

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
}`;

        const parts = [{ text: promptText }];
        imagesData.forEach(img => {
            parts.push({
                inlineData: {
                    mimeType: img.mimeType,
                    data: img.base64
                }
            });
        });

        const requestBody = {
            contents: [{ parts: parts }],
            generationConfig: {
                responseMimeType: "application/json"
            }
        };

        const AI_MODEL = localStorage.getItem('gemini_ai_model') || 'gemini-3.5-flash';
        const GEMINI_API_KEY = localStorage.getItem('gemini_api_key') || '';

        try {
            let res;
            let retries = 3;
            let delay = 1500;
            
            for (let attempt = 1; attempt <= retries; attempt++) {
                console.log(`[AI] Gemini API so'rov yuborilmoqda (Urinish: ${attempt})...`);
                res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                });
                
                if (res.ok) {
                    break;
                }
                
                const errorBody = await res.text();
                console.error(`[AI] API xato javobi (Urinish: ${attempt}, Status: ${res.status}):`, errorBody);
                
                let errDetail = '';
                try {
                    const parsed = JSON.parse(errorBody);
                    errDetail = parsed.error?.message || errorBody;
                } catch { errDetail = errorBody; }
                
                // Retry on temporary server errors (503, 429, 500)
                if (res.status === 503 || res.status === 429 || res.status === 500) {
                    if (attempt < retries) {
                        console.warn(`[AI] Vaqtinchalik xato (${res.status}). Qayta urinib ko'riladi...`);
                        if (scanStatus) {
                            scanStatus.innerText = `⏳ AI band (${res.status}). Qayta urinilmoqda... (${secondsElapsed}s)`;
                            scanStatus.style.color = "var(--color-qualified)";
                        }
                        await new Promise(resolve => setTimeout(resolve, delay));
                        delay *= 1.5;
                        continue;
                    }
                }
                
                throw new Error(`API rad etdi (${res.status}): ${errDetail}`);
            }

            clearInterval(countdownInterval);
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

            // Calculate exact token cost
            let callCost = 0;
            let inTokens = 0;
            let outTokens = 0;
            let inCost = 0;
            let outCost = 0;

            if (data.usageMetadata) {
                inTokens = data.usageMetadata.promptTokenCount || 0;
                outTokens = data.usageMetadata.candidatesTokenCount || 0;
                
                if (AI_MODEL === 'gemini-3.1-pro' || AI_MODEL === 'gemini-2.5-pro' || AI_MODEL === 'gemini-1.5-pro' || AI_MODEL === 'gemini-pro') {
                    inCost = (inTokens / 1000000) * 1.25;
                    outCost = (outTokens / 1000000) * 10.00;
                } else if (AI_MODEL === 'gemini-3.5-flash' || AI_MODEL === 'gemini-2.5-flash') {
                    inCost = (inTokens / 1000000) * 0.30;
                    outCost = (outTokens / 1000000) * 2.50;
                } else {
                    inCost = (inTokens / 1000000) * 0.075;
                    outCost = (outTokens / 1000000) * 0.30;
                }
                callCost = inCost + outCost;
            }

            state.lastAiUsage = {
                model: AI_MODEL,
                inTokens: inTokens,
                outTokens: outTokens,
                inCost: inCost,
                outCost: outCost,
                totalCost: callCost
            };

            if (typeof state.aiApiUsageCost === 'undefined') state.aiApiUsageCost = 0;
            state.aiApiUsageCost += callCost;

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
            
            const currentSew = parseFloat(document.getElementById('param-sew').value) || 0;
            const isFirstLoad = (currentSew === 0);

            if (isFirstLoad) {
                scanStatus.innerText = `⚠️ AI Band/Xato. Standartlar yuklandi!`;
                scanStatus.style.color = "var(--color-qualified)";
                const selectedType = document.getElementById('param-type').value || 'Futbolka';
                populateAIParameters(selectedType);
            } else {
                scanStatus.innerText = `⚠️ AI Band/Xato. Mavjud qiymatlar saqlandi!`;
                scanStatus.style.color = "var(--color-qualified)";
            }

            detectedCard.style.display = 'block';
            worksheetCard.style.display = 'block';
            calculateVisualTannarx();

            alert(`Sun'iy Idrok so'rovida xatolik yuz berdi (${err.message}).\n\nIltimos, sahifani yangilab qaytadan rasm yuklang yoki parametrlarni o'zingiz tahrirlang.`);
        }
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
            
            // Reset showroom filter to 'All' to ensure the new model is visible
            state.showroomFilter = 'All';
            saveState();
            setupShowroomFilter();
            
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
                    id: 'cut-' + Date.now() + '-' + Math.floor(Math.random()*1000),
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
                    id: 'buy-' + Date.now() + '-' + Math.floor(Math.random()*1000),
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

window.clearShowroom = function() {
    showConfirmModal(
        "Showroomni tozalash",
        "Rostdan ham showroomdagi barcha katalog mahsulotlari, zaxiralar va sotuvlar tarixini tozalab yubormoqchimisiz? Ushbu amalni ortga qaytarib bo'lmaydi.",
        function() {
            state.showroomCatalog = [];
            state.showroomStock = {};
            state.showroomSales = [];
            saveState();
            updateUI();
            showToast("Showroom muvaffaqiyatli tozalandi!", "success");
        },
        'danger'
    );
};

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
        card.className = 'showroom-card';

        const hasImage = !!item.imageSrc && item.imageSrc.trim() !== '';
        const imgSrc = item.imageSrc || '';
        const margin = (item.retailPrice || 0) - (item.wholesalePrice || 0);
        const marginPercent = item.wholesalePrice > 0 ? Math.round((margin / item.wholesalePrice) * 100) : 0;

        card.innerHTML = `
            <div class="showroom-card-img-wrap">
                ${hasImage ? `
                    <img src="${imgSrc}" class="showroom-card-img" alt="${item.type}">
                    <button type="button" onclick="deleteCatalogItemImage('${item.id}', event)" class="showroom-img-action-btn delete" title="Rasmni o'chirish">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                ` : `
                    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(255,255,255,0.01); color: var(--color-text-muted);">
                        <i class="fa-solid fa-shirt fa-3x" style="opacity: 0.15; margin-bottom: 10px;"></i>
                        <span style="font-size: 0.75rem; opacity: 0.4; font-weight: 500;">Rasm yuklanmagan</span>
                    </div>
                `}
                <label class="showroom-img-action-btn upload" title="Rasm yuklash / o'zgartirish" style="margin: 0;">
                    <i class="fa-solid fa-camera"></i>
                    <input type="file" accept="image/*" style="display: none;" onchange="changeCatalogItemImage('${item.id}', this)">
                </label>
            </div>
            <div style="padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px; gap: 8px;">
                        <h4 style="margin: 0; font-size: 1.15rem; font-weight: 800; color: #fff; line-height: 1.2;">${item.name || item.type}</h4>
                        <span style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); padding: 4px 8px; border-radius: 6px; font-size: 0.725rem; font-weight: 600; color: var(--color-text-muted); white-space: nowrap;">${item.date}</span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                        <span style="font-size: 0.8rem; color: var(--color-text-muted); font-weight: 500; display: flex; align-items: center; gap: 6px;">
                            <i class="fa-solid fa-industry" style="color: var(--color-negotiation);"></i> Quvvat: <strong>${item.qty || 0} ta</strong>
                        </span>
                        ${marginPercent > 0 ? `<span class="showroom-profit-tag"><i class="fa-solid fa-arrow-trend-up"></i> +${marginPercent}% foyda</span>` : ''}
                    </div>
                    
                    <div class="showroom-pricing-grid">
                        <div class="showroom-price-box">
                            <span>Tannarx</span>
                            <strong>${Math.round(item.wholesalePrice || 0).toLocaleString('uz-UZ')} so'm</strong>
                        </div>
                        <div class="showroom-price-box retail">
                            <span>Chakana</span>
                            <strong>${Math.round(item.retailPrice || 0).toLocaleString('uz-UZ')} so'm</strong>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 4px;">
                    ${item.calculationDetails ? `
                    <button class="showroom-card-btn details" onclick="openCalculationDetailsModal('${item.id}')">
                        <i class="fa-solid fa-calculator"></i> Tannarx Tafsilotlari
                    </button>
                    ` : ''}

                    <button class="showroom-card-btn edit" onclick="openEditCatalogModal('${item.id}')">
                        <i class="fa-solid fa-sliders"></i> To'liq Tahrirlash
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

window.changeCatalogItemImage = function(id, input) {
    const file = input.files[0];
    if (!file) return;

    const item = state.showroomCatalog.find(i => i.id === id);
    if (!item) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        item.imageSrc = e.target.result;
        saveState();
        renderShowroomCatalog();
        showToast("Mahsulot rasmi muvaffaqiyatli o'zgartirildi!", "success");
    };
    reader.readAsDataURL(file);
};

window.deleteCatalogItemImage = function(id, event) {
    if (event) event.stopPropagation();
    if (confirm("Rostdan ham ushbu mahsulot rasmini o'chirmoqchimisiz?")) {
        const item = state.showroomCatalog.find(i => i.id === id);
        if (item) {
            item.imageSrc = '';
            saveState();
            renderShowroomCatalog();
            showToast("Mahsulot rasmi o'chirildi.", "info");
        }
    }
};

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

        if (btn.dataset.listenerAdded) return;
        btn.dataset.listenerAdded = 'true';

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
// Open Edit Modal with full parameters (routed to 5-step wizard)
// Open Edit Modal with full parameters (routed to showroom modal)
function addEditFabricRow(type = 'Asosiy mato', price = 150000, consumption = 100) {
    const container = document.getElementById('edit-fabric-rows-container');
    if (!container) return;

    const row = document.createElement('div');
    row.className = 'edit-fabric-row';
    row.style.cssText = 'display: flex; gap: 8px; align-items: center; background: rgba(255,255,255,0.02); padding: 8px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.04);';
    
    row.innerHTML = `
        <select class="edit-fabric-type-select" style="flex: 2; padding: 6px; border-radius: 6px; border: 1px solid var(--border-color); background: #000; color: #fff; font-size: 0.8rem;">
            <option value="Asosiy mato">Asosiy mato</option>
            <option value="Qo'shimcha mato">Qo'shimcha mato</option>
            <option value="Lipa">Lipa</option>
            <option value="Kashkorse">Kashkorse</option>
            <option value="Ribana">Ribana</option>
            <option value="Ikki iplik">Ikki iplik</option>
            <option value="Uch iplik">Uch iplik</option>
            <option value="Boshqa">Boshqa</option>
        </select>
        <input type="number" class="edit-fabric-price-input" value="${price}" min="0" placeholder="Narxi/kg" style="flex: 1.5; padding: 6px; border-radius: 6px; border: 1px solid var(--border-color); background: #000; color: #fff; font-size: 0.8rem; text-align: right;">
        <span style="font-size: 0.75rem; color: var(--color-text-muted);">so'm</span>
        <input type="number" class="edit-fabric-consumption-input" value="${consumption}" min="0" placeholder="Sarf(gr)" style="flex: 1; padding: 6px; border-radius: 6px; border: 1px solid var(--border-color); background: #000; color: #fff; font-size: 0.8rem; text-align: right;">
        <span style="font-size: 0.75rem; color: var(--color-text-muted);">gr</span>
        <button type="button" class="btn-remove-edit-fabric-row" style="background: none; border: none; color: var(--color-red); cursor: pointer; padding: 4px 8px;"><i class="fa-solid fa-trash"></i></button>
    `;

    container.appendChild(row);
    row.querySelector('.edit-fabric-type-select').value = type;

    row.querySelectorAll('input, select').forEach(el => {
        el.addEventListener('input', updateEditModalCalculation);
        el.addEventListener('change', updateEditModalCalculation);
    });

    row.querySelector('.btn-remove-edit-fabric-row').addEventListener('click', function() {
        const rows = container.querySelectorAll('.edit-fabric-row');
        if (rows.length > 1) {
            row.remove();
            updateEditModalCalculation();
        } else {
            showToast("Kamida bitta mato bo'lishi shart!", "warning");
        }
    });

    updateEditModalCalculation();
}

function addEditAccessoryRow(name, price, qty, unit, checked = false, isCustom = false) {
    const container = document.getElementById('edit-accessory-rows-container');
    if (!container) return;

    const row = document.createElement('div');
    row.className = 'edit-accessory-row wizard-toggle-card' + (checked ? ' active' : '');
    row.setAttribute('data-name', name);
    row.setAttribute('data-unit', unit);
    row.setAttribute('data-custom', isCustom ? 'true' : 'false');

    const uniqueId = 'edit-acc-' + (isCustom ? 'custom-' + Date.now() + '-' + Math.floor(Math.random()*1000) : name.replace(/\s+/g, '-').toLowerCase());
    const isGr = unit === 'gr';
    
    row.innerHTML = `
        <div class="wizard-toggle-card-header">
            <input type="checkbox" ${checked ? 'checked' : ''} class="edit-accessory-checkbox" id="${uniqueId}">
            <label for="${uniqueId}">${name} ${isCustom ? '(Maxsus)' : ''}</label>
        </div>
        <div class="wizard-toggle-card-body" style="display: flex; gap: 4px; align-items: center;">
            <input type="number" class="edit-accessory-price-input" value="${price}" min="0" style="width: 80px; padding: 4px 6px; border-radius: 4px; border: 1px solid var(--border-color); background: #000; color: #fff; font-size: 0.8rem; text-align: right;" ${checked ? '' : 'disabled'}>
            <span style="font-size: 0.7rem; color: var(--color-text-muted);">${isGr ? "so'm/kg" : "so'm"}</span>
            <span style="font-size: 0.7rem; color: var(--color-text-muted);">x</span>
            <input type="number" class="edit-accessory-qty-input" value="${qty}" min="0" style="width: 50px; padding: 4px 6px; border-radius: 4px; border: 1px solid var(--border-color); background: #000; color: #fff; font-size: 0.8rem; text-align: center;" ${checked ? '' : 'disabled'}>
            <span style="font-size: 0.7rem; color: var(--color-text-muted);">${isGr ? 'gr' : 'ta'}</span>
            ${isCustom ? `<button type="button" class="btn-remove-edit-acc-row" style="background: none; border: none; color: var(--color-red); cursor: pointer; margin-left: 6px;"><i class="fa-solid fa-trash"></i></button>` : ''}
        </div>
    `;

    container.appendChild(row);

    const chk = row.querySelector('.edit-accessory-checkbox');
    const pInp = row.querySelector('.edit-accessory-price-input');
    const qInp = row.querySelector('.edit-accessory-qty-input');

    chk.addEventListener('change', function() {
        if (chk.checked) {
            row.classList.add('active');
            if (pInp) pInp.removeAttribute('disabled');
            if (qInp) qInp.removeAttribute('disabled');
        } else {
            row.classList.remove('active');
            if (pInp) pInp.setAttribute('disabled', 'true');
            if (qInp) qInp.setAttribute('disabled', 'true');
        }
        updateEditModalCalculation();
    });

    if (pInp) pInp.addEventListener('input', updateEditModalCalculation);
    if (qInp) qInp.addEventListener('input', updateEditModalCalculation);

    if (isCustom) {
        row.querySelector('.btn-remove-edit-acc-row').addEventListener('click', function() {
            row.remove();
            updateEditModalCalculation();
        });
    }
}

function addEditPackagingRow(name, price, checked = false, isCustom = false) {
    const container = document.getElementById('edit-packaging-rows-container');
    if (!container) return;

    const row = document.createElement('div');
    row.className = 'edit-packaging-row wizard-toggle-card' + (checked ? ' active' : '');
    row.setAttribute('data-name', name);
    row.setAttribute('data-custom', isCustom ? 'true' : 'false');

    const uniqueId = 'edit-pack-' + (isCustom ? 'custom-' + Date.now() + '-' + Math.floor(Math.random()*1000) : name.replace(/\s+/g, '-').toLowerCase());

    row.innerHTML = `
        <div class="wizard-toggle-card-header">
            <input type="checkbox" ${checked ? 'checked' : ''} class="edit-packaging-checkbox" id="${uniqueId}">
            <label for="${uniqueId}">${name} ${isCustom ? '(Maxsus)' : ''}</label>
        </div>
        <div class="wizard-toggle-card-body" style="display: flex; gap: 4px; align-items: center;">
            <input type="number" class="edit-packaging-price-input" value="${price}" min="0" style="width: 80px; padding: 4px 6px; border-radius: 4px; border: 1px solid var(--border-color); background: #000; color: #fff; font-size: 0.8rem; text-align: right;" ${checked ? '' : 'disabled'}>
            <span style="font-size: 0.7rem; color: var(--color-text-muted);">so'm</span>
            ${isCustom ? `<button type="button" class="btn-remove-edit-pack-row" style="background: none; border: none; color: var(--color-red); cursor: pointer; margin-left: 6px;"><i class="fa-solid fa-trash"></i></button>` : ''}
        </div>
    `;

    container.appendChild(row);

    const chk = row.querySelector('.edit-packaging-checkbox');
    const pInp = row.querySelector('.edit-packaging-price-input');

    chk.addEventListener('change', function() {
        if (chk.checked) {
            row.classList.add('active');
            if (pInp) pInp.removeAttribute('disabled');
        } else {
            row.classList.remove('active');
            if (pInp) pInp.setAttribute('disabled', 'true');
        }
        updateEditModalCalculation();
    });

    if (pInp) pInp.addEventListener('input', updateEditModalCalculation);

    if (isCustom) {
        row.querySelector('.btn-remove-edit-pack-row').addEventListener('click', function() {
            row.remove();
            updateEditModalCalculation();
        });
    }
}

function addEditDecorRow(name, price, checked = false) {
    const container = document.getElementById('edit-decor-rows-container');
    if (!container) return;

    const row = document.createElement('div');
    row.className = 'edit-decor-row wizard-toggle-card' + (checked ? ' active' : '');
    row.setAttribute('data-name', name);

    const uniqueId = 'edit-decor-' + name.replace(/\s+/g, '-').toLowerCase();

    row.innerHTML = `
        <div class="wizard-toggle-card-header">
            <input type="checkbox" ${checked ? 'checked' : ''} class="edit-decor-checkbox" id="${uniqueId}">
            <label for="${uniqueId}">${name}</label>
        </div>
        <div class="wizard-toggle-card-body" style="display: flex; gap: 4px; align-items: center;">
            <input type="number" class="edit-decor-price-input" value="${price}" min="0" style="width: 80px; padding: 4px 6px; border-radius: 4px; border: 1px solid var(--border-color); background: #000; color: #fff; font-size: 0.8rem; text-align: right;" ${checked ? '' : 'disabled'}>
            <span style="font-size: 0.7rem; color: var(--color-text-muted);">so'm</span>
        </div>
    `;

    container.appendChild(row);

    const chk = row.querySelector('.edit-decor-checkbox');
    const pInp = row.querySelector('.edit-decor-price-input');

    chk.addEventListener('change', function() {
        if (chk.checked) {
            row.classList.add('active');
            if (pInp) pInp.removeAttribute('disabled');
        } else {
            row.classList.remove('active');
            if (pInp) pInp.setAttribute('disabled', 'true');
        }
        updateEditModalCalculation();
    });

    if (pInp) pInp.addEventListener('input', updateEditModalCalculation);
}

function addEditSewingRow(name, price, checked = false) {
    const container = document.getElementById('edit-sewing-rows-container');
    if (!container) return;

    const row = document.createElement('div');
    row.className = 'edit-sewing-row wizard-toggle-card' + (checked ? ' active' : '');
    row.setAttribute('data-name', name);

    const uniqueId = 'edit-sew-' + name.replace(/\s+/g, '-').toLowerCase();

    row.innerHTML = `
        <div class="wizard-toggle-card-header">
            <input type="checkbox" ${checked ? 'checked' : ''} class="edit-sewing-checkbox" id="${uniqueId}">
            <label for="${uniqueId}">${name}</label>
        </div>
        <div class="wizard-toggle-card-body" style="display: flex; gap: 4px; align-items: center;">
            <input type="number" class="edit-sewing-price-input" value="${price}" min="0" style="width: 80px; padding: 4px 6px; border-radius: 4px; border: 1px solid var(--border-color); background: #000; color: #fff; font-size: 0.8rem; text-align: right;" ${checked ? '' : 'disabled'}>
            <span style="font-size: 0.7rem; color: var(--color-text-muted);">so'm</span>
        </div>
    `;

    container.appendChild(row);

    const chk = row.querySelector('.edit-sewing-checkbox');
    const pInp = row.querySelector('.edit-sewing-price-input');

    chk.addEventListener('change', function() {
        if (chk.checked) {
            row.classList.add('active');
            if (pInp) pInp.removeAttribute('disabled');
        } else {
            row.classList.remove('active');
            if (pInp) pInp.setAttribute('disabled', 'true');
        }
        updateEditModalCalculation();
    });

    if (pInp) pInp.addEventListener('input', updateEditModalCalculation);
}

function addEditOverheadRow(name, price, checked = false) {
    const container = document.getElementById('edit-overhead-rows-container');
    if (!container) return;

    const row = document.createElement('div');
    row.className = 'edit-overhead-row wizard-toggle-card' + (checked ? ' active' : '');
    row.setAttribute('data-name', name);

    const uniqueId = 'edit-oh-' + name.replace(/\s+/g, '-').toLowerCase();

    row.innerHTML = `
        <div class="wizard-toggle-card-header">
            <input type="checkbox" ${checked ? 'checked' : ''} class="edit-overhead-checkbox" id="${uniqueId}">
            <label for="${uniqueId}">${name}</label>
        </div>
        <div class="wizard-toggle-card-body" style="display: flex; gap: 4px; align-items: center;">
            <input type="number" class="edit-overhead-price-input" value="${price}" min="0" style="width: 80px; padding: 4px 6px; border-radius: 4px; border: 1px solid var(--border-color); background: #000; color: #fff; font-size: 0.8rem; text-align: right;" ${checked ? '' : 'disabled'}>
            <span style="font-size: 0.7rem; color: var(--color-text-muted);">so'm</span>
        </div>
    `;

    container.appendChild(row);

    const chk = row.querySelector('.edit-overhead-checkbox');
    const pInp = row.querySelector('.edit-overhead-price-input');

    chk.addEventListener('change', function() {
        if (chk.checked) {
            row.classList.add('active');
            if (pInp) pInp.removeAttribute('disabled');
        } else {
            row.classList.remove('active');
            if (pInp) pInp.setAttribute('disabled', 'true');
        }
        updateEditModalCalculation();
    });

    if (pInp) pInp.addEventListener('input', updateEditModalCalculation);
}

function updateEditModalCalculation() {
    let totalFabric = 0;
    document.querySelectorAll('.edit-fabric-row').forEach(row => {
        const price = parseFloat(row.querySelector('.edit-fabric-price-input').value) || 0;
        const consumption = parseFloat(row.querySelector('.edit-fabric-consumption-input').value) || 0;
        totalFabric += (price * (consumption / 1000));
    });

    let totalDecor = 0;
    document.querySelectorAll('.edit-decor-row').forEach(row => {
        const active = row.querySelector('.edit-decor-checkbox').checked;
        const price = parseFloat(row.querySelector('.edit-decor-price-input').value) || 0;
        if (active) totalDecor += price;
    });

    let totalSewing = 0;
    document.querySelectorAll('.edit-sewing-row').forEach(row => {
        const active = row.querySelector('.edit-sewing-checkbox').checked;
        const price = parseFloat(row.querySelector('.edit-sewing-price-input').value) || 0;
        if (active) totalSewing += price;
    });

    let totalAccessory = 0;
    document.querySelectorAll('.edit-accessory-row').forEach(row => {
        const active = row.querySelector('.edit-accessory-checkbox').checked;
        const price = parseFloat(row.querySelector('.edit-accessory-price-input').value) || 0;
        const qty = parseFloat(row.querySelector('.edit-accessory-qty-input').value) || 0;
        const unit = row.getAttribute('data-unit') || 'dona';
        if (active) {
            if (unit === 'gr') {
                totalAccessory += (price * (qty / 1000));
            } else {
                totalAccessory += (price * qty);
            }
        }
    });

    let totalOverhead = 0;
    document.querySelectorAll('.edit-overhead-row').forEach(row => {
        const active = row.querySelector('.edit-overhead-checkbox').checked;
        const price = parseFloat(row.querySelector('.edit-overhead-price-input').value) || 0;
        if (active) totalOverhead += price;
    });

    let totalPackaging = 0;
    document.querySelectorAll('.edit-packaging-row').forEach(row => {
        const active = row.querySelector('.edit-packaging-checkbox').checked;
        const price = parseFloat(row.querySelector('.edit-packaging-price-input').value) || 0;
        if (active) totalPackaging += price;
    });

    const unitCost = totalFabric + totalDecor + totalSewing + totalAccessory + totalOverhead + totalPackaging;
    const qty = parseInt(document.getElementById('edit-cat-qty').value) || 1;
    const totalCost = unitCost * qty;

    document.getElementById('edit-live-unit-cost').innerText = Math.round(unitCost).toLocaleString('uz-UZ') + " so'm";
    document.getElementById('edit-live-total-cost').innerText = Math.round(totalCost).toLocaleString('uz-UZ') + " so'm";

    document.getElementById('edit-summary-fabric').innerText = Math.round(totalFabric).toLocaleString('uz-UZ') + " so'm";
    document.getElementById('edit-summary-decor').innerText = Math.round(totalDecor).toLocaleString('uz-UZ') + " so'm";
    document.getElementById('edit-summary-sewing').innerText = Math.round(totalSewing).toLocaleString('uz-UZ') + " so'm";
    document.getElementById('edit-summary-acc').innerText = Math.round(totalAccessory).toLocaleString('uz-UZ') + " so'm";
    document.getElementById('edit-summary-pack').innerText = Math.round(totalPackaging + totalOverhead).toLocaleString('uz-UZ') + " so'm";
}

function initShowroomEditModalListeners() {
    if (state.showroomEditListenersBound) return;
    state.showroomEditListenersBound = true;

    document.querySelectorAll('.showroom-edit-tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.showroom-edit-tab-btn').forEach(b => {
                b.classList.remove('active');
                b.style.borderBottomColor = 'transparent';
                b.style.color = 'var(--color-text-muted)';
            });
            document.querySelectorAll('.showroom-edit-tab-content').forEach(c => {
                c.style.display = 'none';
            });

            btn.classList.add('active');
            btn.style.borderBottomColor = 'var(--color-prospect)';
            btn.style.color = '#fff';

            const tabId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.style.display = 'block';
            }
        });
    });

    const editFileInput = document.getElementById('edit-cat-file-input');
    const editImageUrlInput = document.getElementById('edit-cat-image-url');
    const editImagePreviewContainer = document.getElementById('edit-cat-image-preview-container');
    const editImagePreview = document.getElementById('edit-cat-image-preview');
    const editImageBase64 = document.getElementById('edit-cat-image-base64');
    const btnRemoveEditImage = document.getElementById('btn-remove-edit-cat-image');

    if (editFileInput) {
        editFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    if (editImagePreview) editImagePreview.src = evt.target.result;
                    if (editImagePreviewContainer) editImagePreviewContainer.style.display = 'flex';
                    if (editImageBase64) editImageBase64.value = evt.target.result;
                    if (editImageUrlInput) editImageUrlInput.value = '';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (btnRemoveEditImage) {
        btnRemoveEditImage.addEventListener('click', function(e) {
            e.stopPropagation();
            if (editFileInput) editFileInput.value = '';
            if (editImageBase64) editImageBase64.value = '';
            if (editImageUrlInput) editImageUrlInput.value = '';
            if (editImagePreview) editImagePreview.src = '';
            if (editImagePreviewContainer) editImagePreviewContainer.style.display = 'none';
        });
    }

    if (editImageUrlInput) {
        editImageUrlInput.addEventListener('input', function() {
            const url = editImageUrlInput.value.trim();
            if (url) {
                if (editImagePreview) editImagePreview.src = url;
                if (editImagePreviewContainer) editImagePreviewContainer.style.display = 'flex';
                if (editImageBase64) editImageBase64.value = '';
                if (editFileInput) editFileInput.value = '';
            } else {
                if (editImagePreview) editImagePreview.src = '';
                if (editImagePreviewContainer) editImagePreviewContainer.style.display = 'none';
            }
        });
    }

    const btnAddFabric = document.getElementById('btn-add-edit-fabric-row');
    if (btnAddFabric) {
        btnAddFabric.addEventListener('click', function() {
            addEditFabricRow('Qo\'shimcha mato', 150000, 100);
        });
    }

    const btnAddAcc = document.getElementById('btn-add-edit-custom-accessory');
    if (btnAddAcc) {
        btnAddAcc.addEventListener('click', function() {
            const nameInput = document.getElementById('edit-custom-accessory-name');
            const unitSelect = document.getElementById('edit-custom-accessory-unit');
            const priceInput = document.getElementById('edit-custom-accessory-price');
            const qtyInput = document.getElementById('edit-custom-accessory-qty');

            const name = nameInput.value.trim();
            const unit = unitSelect.value;
            const price = parseFloat(priceInput.value) || 0;
            const qty = parseFloat(qtyInput.value) || 0;

            if (!name || price <= 0 || qty <= 0) {
                showToast("Aksessuar nomi, narxi va miqdorini to'g'ri kiriting!", "warning");
                return;
            }

            addEditAccessoryRow(name, price, qty, unit, true, true);

            nameInput.value = '';
            priceInput.value = '';
            qtyInput.value = '';

            updateEditModalCalculation();
        });
    }

    const btnAddPack = document.getElementById('btn-add-edit-custom-packaging');
    if (btnAddPack) {
        btnAddPack.addEventListener('click', function() {
            const nameInput = document.getElementById('edit-custom-packaging-name');
            const priceInput = document.getElementById('edit-custom-packaging-price');

            const name = nameInput.value.trim();
            const price = parseFloat(priceInput.value) || 0;

            if (!name || price <= 0) {
                showToast("Qadoqlash xizmati nomi va narxini to'g'ri kiriting!", "warning");
                return;
            }

            addEditPackagingRow(name, price, true, true);

            nameInput.value = '';
            priceInput.value = '';

            updateEditModalCalculation();
        });
    }
}

window.saveShowroomEditedCatalogItem = function() {
    const id = document.getElementById('edit-cat-id').value;
    const itemIdx = state.showroomCatalog.findIndex(i => i.id === id);
    if (itemIdx === -1) return;

    const name = document.getElementById('edit-cat-name').value.trim();
    const type = document.getElementById('edit-cat-type').value;
    const qty = parseInt(document.getElementById('edit-cat-qty').value) || 1;
    const wholesale = parseFloat(document.getElementById('edit-cat-wholesale').value) || 0;
    const retail = parseFloat(document.getElementById('edit-cat-retail').value) || 0;
    const note = document.getElementById('edit-cat-note').value.trim();

    if (!name) {
        showToast("Model nomini kiriting!", "warning");
        return;
    }

    const base64Val = document.getElementById('edit-cat-image-base64').value;
    const urlVal = document.getElementById('edit-cat-image-url').value.trim();
    const imageSrc = base64Val || urlVal || '';

    const fabricsData = [];
    let totalFabric = 0;
    document.querySelectorAll('.edit-fabric-row').forEach(row => {
        const fType = row.querySelector('.edit-fabric-type-select').value;
        const fPrice = parseFloat(row.querySelector('.edit-fabric-price-input').value) || 0;
        const fConsumption = parseFloat(row.querySelector('.edit-fabric-consumption-input').value) || 0;
        const costPerUnit = fPrice * (fConsumption / 1000);
        
        fabricsData.push({
            type: fType,
            pricePerKg: fPrice,
            consumptionGrams: fConsumption,
            costPerUnit: costPerUnit
        });
        totalFabric += costPerUnit;
    });

    const decorData = [];
    let totalDecor = 0;
    document.querySelectorAll('.edit-decor-row').forEach(row => {
        const active = row.querySelector('.edit-decor-checkbox').checked;
        const dName = row.getAttribute('data-name');
        const dPrice = parseFloat(row.querySelector('.edit-decor-price-input').value) || 0;
        if (active) {
            decorData.push({
                name: dName,
                price: dPrice
            });
            totalDecor += dPrice;
        }
    });

    const sewingData = [];
    let totalSewing = 0;
    document.querySelectorAll('.edit-sewing-row').forEach(row => {
        const active = row.querySelector('.edit-sewing-checkbox').checked;
        const sName = row.getAttribute('data-name');
        const sPrice = parseFloat(row.querySelector('.edit-sewing-price-input').value) || 0;
        if (active) {
            sewingData.push({
                name: sName,
                price: sPrice
            });
            totalSewing += sPrice;
        }
    });

    const accessoryData = [];
    let totalAccessory = 0;
    document.querySelectorAll('.edit-accessory-row').forEach(row => {
        const active = row.querySelector('.edit-accessory-checkbox').checked;
        const aName = row.getAttribute('data-name');
        const aPrice = parseFloat(row.querySelector('.edit-accessory-price-input').value) || 0;
        const aQty = parseFloat(row.querySelector('.edit-accessory-qty-input').value) || 0;
        const aUnit = row.getAttribute('data-unit') || 'dona';
        if (active) {
            let cost = 0;
            if (aUnit === 'gr') {
                cost = aPrice * (aQty / 1000);
            } else {
                cost = aPrice * aQty;
            }
            accessoryData.push({
                name: aName,
                price: aPrice,
                qty: aQty,
                unit: aUnit,
                cost: cost
            });
            totalAccessory += cost;
        }
    });

    const overheadData = [];
    let totalOverhead = 0;
    document.querySelectorAll('.edit-overhead-row').forEach(row => {
        const active = row.querySelector('.edit-overhead-checkbox').checked;
        const oName = row.getAttribute('data-name');
        const oPrice = parseFloat(row.querySelector('.edit-overhead-price-input').value) || 0;
        if (active) {
            overheadData.push({
                name: oName,
                price: oPrice
            });
            totalOverhead += oPrice;
        }
    });

    const packagingData = [];
    let totalPackaging = 0;
    document.querySelectorAll('.edit-packaging-row').forEach(row => {
        const active = row.querySelector('.edit-packaging-checkbox').checked;
        const pName = row.getAttribute('data-name');
        const pPrice = parseFloat(row.querySelector('.edit-packaging-price-input').value) || 0;
        if (active) {
            packagingData.push({
                name: pName,
                price: pPrice
            });
            totalPackaging += pPrice;
        }
    });

    const unitCost = totalFabric + totalDecor + totalSewing + totalAccessory + totalOverhead + totalPackaging;
    const totalCost = unitCost * qty;

    const p = {
        paramSew: sewingData.find(s => s.name === 'Chok') ? (sewingData.find(s => s.name === 'Chok').price > 0 ? Math.round(totalSewing / (sewingData.find(s => s.name === 'Chok').price || 1)) : 0) : 0,
        paramOverlock: sewingData.find(s => s.name === 'Overlok') ? 1 : 0,
        paramFlatlock: sewingData.find(s => s.name === 'Raspashivalka') ? 1 : 0,
        paramFolds: sewingData.find(s => s.name === 'Bostiriq') ? 1 : 0,
        paramInserts: sewingData.find(s => s.name === 'Rangli detal ulash') ? 1 : 0,
        paramPaints: decorData.length > 0 ? 1 : 0,
        paramAccessories: accessoryData.length > 0 ? 1 : 0,
        
        costFabricQty: totalFabric / (fabricsData[0]?.pricePerKg || 150000),
        costSew: sewingData.find(s => s.name === 'Chok')?.price || 500,
        costOverlock: sewingData.find(s => s.name === 'Overlok')?.price || 600,
        costFlatlock: sewingData.find(s => s.name === 'Raspashivalka')?.price || 800,
        costFolds: sewingData.find(s => s.name === 'Bostiriq')?.price || 400,
        costInserts: sewingData.find(s => s.name === 'Rangli detal ulash')?.price || 1500,
        costPaints: decorData[0]?.price || 3000,
        costAccessories: accessoryData[0]?.price || 2500,
        costFabricPrice: fabricsData[0]?.pricePerKg || 150000,
        costElectricity: overheadData.find(o => o.name === 'Elektr energiya')?.price || 1000,
        costPackaging: packagingData[0]?.price || 1500
    };

    const originalItem = state.showroomCatalog[itemIdx];
    const updatedModel = {
        id: originalItem.id,
        type: type,
        name: name,
        qty: qty,
        wholesalePrice: wholesale,
        retailPrice: retail,
        totalProductionCost: totalCost,
        imageSrc: imageSrc || originalItem.imageSrc || '',
        date: originalItem.date || new Date().toISOString().split('T')[0],
        source: originalItem.source || 'manual_calculation',
        note: note,
        params: p,
        calculationDetails: {
            fabrics: fabricsData,
            decorations: decorData,
            sewing: sewingData,
            accessories: accessoryData,
            overheads: overheadData,
            packaging: packagingData,
            totals: {
                fabrics: totalFabric,
                decorations: totalDecor,
                sewing: totalSewing,
                accessories: totalAccessory,
                overheads: totalOverhead,
                packaging: totalPackaging,
                unitCost: unitCost,
                totalCost: totalCost
            }
        }
    };

    state.showroomCatalog[itemIdx] = updatedModel;
    saveState();
    
    renderShowroomCatalog();
    closeModal('modal-edit-catalog');
    showToast(`"${name}" modeli muvaffaqiyatli tahrirlandi va showroomda yangilandi!`, "success");
};

window.openEditCatalogModal = function(id) {
    const item = state.showroomCatalog.find(i => i.id === id);
    if (!item) return;

    initShowroomEditModalListeners();

    document.querySelectorAll('.showroom-edit-tab-btn').forEach((btn, idx) => {
        if (idx === 0) {
            btn.classList.add('active');
            btn.style.borderBottomColor = 'var(--color-prospect)';
            btn.style.color = '#fff';
        } else {
            btn.classList.remove('active');
            btn.style.borderBottomColor = 'transparent';
            btn.style.color = 'var(--color-text-muted)';
        }
    });
    document.querySelectorAll('.showroom-edit-tab-content').forEach((c, idx) => {
        c.style.display = idx === 0 ? 'block' : 'none';
    });

    document.getElementById('edit-cat-id').value = item.id;
    document.getElementById('edit-cat-name').value = item.name || '';
    document.getElementById('edit-cat-type').value = item.type || 'Futbolka';
    document.getElementById('edit-cat-qty').value = item.qty || 1;
    document.getElementById('edit-cat-wholesale').value = item.wholesalePrice || '';
    document.getElementById('edit-cat-retail').value = item.retailPrice || '';
    document.getElementById('edit-cat-note').value = item.note || '';

    const editImageUrlInput = document.getElementById('edit-cat-image-url');
    const editImagePreviewContainer = document.getElementById('edit-cat-image-preview-container');
    const editImagePreview = document.getElementById('edit-cat-image-preview');
    const editImageBase64 = document.getElementById('edit-cat-image-base64');
    
    if (editImageBase64) editImageBase64.value = '';
    if (item.imageSrc && item.imageSrc.trim() !== '') {
        if (item.imageSrc.startsWith('data:image')) {
            if (editImageBase64) editImageBase64.value = item.imageSrc;
            if (editImageUrlInput) editImageUrlInput.value = '';
        } else {
            if (editImageUrlInput) editImageUrlInput.value = item.imageSrc;
        }
        if (editImagePreview) editImagePreview.src = item.imageSrc;
        if (editImagePreviewContainer) editImagePreviewContainer.style.display = 'flex';
    } else {
        if (editImageUrlInput) editImageUrlInput.value = '';
        if (editImagePreview) editImagePreview.src = '';
        if (editImagePreviewContainer) editImagePreviewContainer.style.display = 'none';
    }

    const calcDetails = item.calculationDetails || {};

    const fabricContainer = document.getElementById('edit-fabric-rows-container');
    if (fabricContainer) fabricContainer.innerHTML = '';
    
    const fabrics = calcDetails.fabrics || [];
    if (fabrics.length > 0) {
        fabrics.forEach(f => {
            addEditFabricRow(f.type, f.pricePerKg, f.consumptionGrams);
        });
    } else {
        const fabricPrice = item.params?.costFabricPrice || 150000;
        const fabricQty = item.params?.costFabricQty ? Math.round(item.params.costFabricQty * 1000) : 450;
        addEditFabricRow('Asosiy mato', fabricPrice, fabricQty);
    }

    const decorContainer = document.getElementById('edit-decor-rows-container');
    if (decorContainer) decorContainer.innerHTML = '';
    
    const decors = calcDetails.decorations || [];
    const standardDecors = [
        { name: 'Kraska bosish', price: 3000 },
        { name: 'Nakleyka', price: 1000 },
        { name: 'Kashta', price: 2000 },
        { name: 'Sublimatsiya', price: 4000 }
    ];
    standardDecors.forEach(std => {
        const saved = decors.find(d => d.name.toLowerCase() === std.name.toLowerCase());
        const checked = saved ? true : (item.params?.paramPaints > 0 && (std.name.toLowerCase().includes('kraska') || std.name.toLowerCase().includes('pechat')));
        const price = saved ? saved.price : (checked ? (item.params?.costPaints || std.price) : std.price);
        addEditDecorRow(std.name, price, checked);
    });

    const sewingContainer = document.getElementById('edit-sewing-rows-container');
    if (sewingContainer) sewingContainer.innerHTML = '';
    
    const sewings = calcDetails.sewing || [];
    const standardSewing = [
        { name: 'Chok', price: 500, paramKey: 'paramSew', costKey: 'costSew' },
        { name: 'Overlok', price: 600, paramKey: 'paramOverlock', costKey: 'costOverlock' },
        { name: 'Raspashivalka', price: 800, paramKey: 'paramFlatlock', costKey: 'costFlatlock' },
        { name: 'Bostiriq', price: 400, paramKey: 'paramFolds', costKey: 'costFolds' },
        { name: 'Rangli detal ulash', price: 1500, paramKey: 'paramInserts', costKey: 'costInserts' }
    ];
    standardSewing.forEach(std => {
        const saved = sewings.find(s => s.name.toLowerCase() === std.name.toLowerCase());
        let checked = false;
        let price = std.price;
        if (saved) {
            checked = true;
            price = saved.price;
        } else if (item.params) {
            checked = item.params[std.paramKey] > 0;
            price = item.params[std.costKey] || std.price;
        }
        addEditSewingRow(std.name, price, checked);
    });

    const accContainer = document.getElementById('edit-accessory-rows-container');
    if (accContainer) accContainer.innerHTML = '';
    
    const accessories = calcDetails.accessories || [];
    const standardAccs = [
        { name: 'Zamok', price: 2500, unit: 'dona' },
        { name: 'Tugma', price: 500, unit: 'dona' },
        { name: 'Ip', price: 800, unit: 'dona' },
        { name: 'Rezinka', price: 45000, unit: 'gr' },
        { name: 'Etiketka', price: 500, unit: 'dona' }
    ];
    standardAccs.forEach(std => {
        const saved = accessories.find(a => a.name.toLowerCase() === std.name.toLowerCase());
        let checked = false;
        let price = std.price;
        let qty = (std.name === 'Rezinka' ? 3 : 1);
        if (saved) {
            checked = true;
            price = saved.price;
            qty = saved.qty;
        } else if (item.params?.paramAccessories > 0 && (std.name === 'Zamok' || std.name === 'Etiketka')) {
            checked = true;
            price = item.params.costAccessories || std.price;
            qty = 1;
        }
        addEditAccessoryRow(std.name, price, qty, std.unit, checked, false);
    });
    accessories.forEach(a => {
        const isStd = standardAccs.some(std => std.name.toLowerCase() === a.name.toLowerCase());
        if (!isStd) {
            addEditAccessoryRow(a.name, a.price, a.qty, a.unit || 'dona', true, true);
        }
    });

    const overheadContainer = document.getElementById('edit-overhead-rows-container');
    if (overheadContainer) overheadContainer.innerHTML = '';
    
    const overheads = calcDetails.overheads || [];
    const standardOverheads = [
        { name: 'Elektr energiya', price: 1000 },
        { name: 'Oziq-ovqat', price: 1500 },
        { name: 'Yo\'l kira', price: 1200 }
    ];
    standardOverheads.forEach(std => {
        const saved = overheads.find(o => o.name.toLowerCase() === std.name.toLowerCase());
        let checked = false;
        let price = std.price;
        if (saved) {
            checked = true;
            price = saved.price;
        } else if (item.params) {
            if (std.name === 'Elektr energiya') {
                checked = true;
                price = item.params.costElectricity || 1000;
            } else if (std.name === 'Oziq-ovqat') {
                checked = true;
                price = 1500;
            }
        }
        addEditOverheadRow(std.name, price, checked);
    });

    const packContainer = document.getElementById('edit-packaging-rows-container');
    if (packContainer) packContainer.innerHTML = '';
    
    const packings = calcDetails.packaging || [];
    const standardPackings = [
        { name: 'Biodegradable paket', price: 1500 },
        { name: 'Oddiy paket', price: 800 },
        { name: 'Brendlangan quti', price: 5000 },
        { name: 'Dazmollash xizmati', price: 1500 },
        { name: 'Qadoqlash xizmati', price: 1000 },
        { name: 'Etiketka', price: 500 }
    ];
    standardPackings.forEach(std => {
        const saved = packings.find(p => p.name.toLowerCase() === std.name.toLowerCase());
        let checked = false;
        let price = std.price;
        if (saved) {
            checked = true;
            price = saved.price;
        } else if (item.params) {
            if (std.name === 'Biodegradable paket') {
                checked = true;
                price = item.params.costPackaging || 1500;
            } else if (std.name === 'Dazmollash xizmati' || std.name === 'Qadoqlash xizmati' || std.name === 'Etiketka') {
                checked = true;
                price = std.price;
            }
        }
        addEditPackagingRow(std.name, price, checked, false);
    });
    packings.forEach(p => {
        const isStd = standardPackings.some(std => std.name.toLowerCase() === p.name.toLowerCase());
        if (!isStd) {
            addEditPackagingRow(p.name, p.price, true, true);
        }
    });

    const qtyInput = document.getElementById('edit-cat-qty');
    qtyInput.removeEventListener('input', updateEditModalCalculation);
    qtyInput.addEventListener('input', updateEditModalCalculation);

    updateEditModalCalculation();

    openModal('modal-edit-catalog');
};

// Edit Model in Wizard
window.editModelInWizard = function(id) {
    const item = state.showroomCatalog.find(i => i.id === id);
    if (!item) return;

    state.editingCatalogId = id;

    // Switch tab and subtab
    window.activateTab('sales');
    const btnManual = document.getElementById('sub-btn-manual-model');
    if (btnManual) btnManual.click();

    // Change titles and button labels
    const submitBtn = document.getElementById('wizard-submit-btn');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> O\'zgarishlarni Saqlash';
        submitBtn.classList.add('btn-edit-mode');
    }
    const resetBtn = document.getElementById('wizard-reset-all-btn');
    if (resetBtn) {
        resetBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Tahrirlashni Bekor Qilish';
    }

    // Populate Wizard Step 0: name, type, image, note
    document.getElementById('wizard-model-name').value = item.name || '';
    document.getElementById('wizard-product-type').value = item.type || '';
    document.getElementById('wizard-note').value = item.note || '';
    
    // Handle product type cards active style
    document.querySelectorAll('.product-type-card').forEach(card => {
        if (card.getAttribute('data-type') === item.type) {
            card.classList.add('active');
            const icon = card.querySelector('i');
            if (icon) icon.style.color = 'var(--color-prospect)';
        } else {
            card.classList.remove('active');
            const icon = card.querySelector('i');
            if (icon) icon.style.color = 'var(--color-text-muted)';
        }
    });

    document.getElementById('wizard-model-qty').value = item.qty || 1;

    // Image previews
    document.getElementById('wizard-model-image-base64').value = '';
    document.getElementById('wizard-model-image').value = item.imageSrc || '';
    const filePreviewContainer = document.getElementById('wizard-file-preview-container');
    const filePrompt = document.getElementById('wizard-file-prompt');
    const filePreview = document.getElementById('wizard-file-preview');
    const fileName = document.getElementById('wizard-file-name');
    
    if (item.imageSrc && item.imageSrc.trim() !== '') {
        if (filePreviewContainer) filePreviewContainer.style.display = 'flex';
        if (filePrompt) filePrompt.style.display = 'none';
        if (filePreview) filePreview.src = item.imageSrc;
        if (fileName) fileName.innerText = 'Yuklangan Rasm';
    } else {
        if (filePreviewContainer) filePreviewContainer.style.display = 'none';
        if (filePrompt) filePrompt.style.display = 'block';
    }

    // Clear existing dynamic fabric rows (except the first one)
    const fabricContainer = document.getElementById('fabric-rows-container');
    if (fabricContainer) {
        const rows = fabricContainer.querySelectorAll('.fabric-row');
        rows.forEach((row, index) => {
            if (index > 0) row.remove();
        });
    }

    // Populate Fabrics (Step 1)
    const calcDetails = item.calculationDetails || {};
    const fabrics = calcDetails.fabrics || [];
    
    if (fabrics.length > 0) {
        const firstRow = fabricContainer.querySelector('.fabric-row');
        if (firstRow) {
            firstRow.querySelector('.fabric-type-select').value = fabrics[0].type || 'Asosiy mato';
            firstRow.querySelector('.fabric-price-input').value = fabrics[0].pricePerKg || 150000;
            firstRow.querySelector('.fabric-consumption-input').value = fabrics[0].consumptionGrams || 100;
        }
        for (let i = 1; i < fabrics.length; i++) {
            const btnAddFabric = document.getElementById('btn-add-fabric-row');
            if (btnAddFabric) {
                btnAddFabric.click();
                const newRow = fabricContainer.querySelectorAll('.fabric-row')[i];
                if (newRow) {
                    newRow.querySelector('.fabric-type-select').value = fabrics[i].type || 'Asosiy mato';
                    newRow.querySelector('.fabric-price-input').value = fabrics[i].pricePerKg || 150000;
                    newRow.querySelector('.fabric-consumption-input').value = fabrics[i].consumptionGrams || 100;
                }
            }
        }
    } else {
        // Fallback for older saves
        const firstRow = fabricContainer.querySelector('.fabric-row');
        if (firstRow) {
            firstRow.querySelector('.fabric-type-select').value = 'Asosiy mato';
            firstRow.querySelector('.fabric-price-input').value = item.params?.costFabricPrice || 150000;
            firstRow.querySelector('.fabric-consumption-input').value = (item.params?.costFabricQty ? Math.round(item.params.costFabricQty * 1000) : 450);
        }
    }

    // Populate Decorations (Step 2)
    const decors = calcDetails.decorations || [];
    document.querySelectorAll('.decoration-row').forEach(row => {
        row.querySelector('.decor-checkbox').checked = false;
    });
    
    if (decors.length > 0) {
        decors.forEach(d => {
            document.querySelectorAll('.decoration-row').forEach(row => {
                const labelText = row.querySelector('label').innerText.split('(')[0].trim();
                if (labelText.toLowerCase() === d.name.toLowerCase()) {
                    row.querySelector('.decor-checkbox').checked = true;
                    row.querySelector('.decor-price-input').value = d.price || 0;
                }
            });
        });
    } else if (item.params?.paramPaints > 0) {
        document.querySelectorAll('.decoration-row').forEach(row => {
            const labelText = row.querySelector('label').innerText.split('(')[0].trim();
            if (labelText.toLowerCase().includes('kraska') || labelText.toLowerCase().includes('pechat')) {
                row.querySelector('.decor-checkbox').checked = true;
                row.querySelector('.decor-price-input').value = item.params.costPaints || 3000;
            }
        });
    }

    // Populate Sewing (Step 3)
    const sewings = calcDetails.sewing || [];
    document.querySelectorAll('.sewing-row').forEach(row => {
        row.querySelector('.sewing-checkbox').checked = false;
    });

    if (sewings.length > 0) {
        sewings.forEach(s => {
            document.querySelectorAll('.sewing-row').forEach(row => {
                const sName = row.getAttribute('data-name');
                if (sName.toLowerCase() === s.name.toLowerCase()) {
                    row.querySelector('.sewing-checkbox').checked = true;
                    row.querySelector('.sewing-price-input').value = s.price || 0;
                }
            });
        });
    } else if (item.params) {
        const p = item.params;
        document.querySelectorAll('.sewing-row').forEach(row => {
            const sName = row.getAttribute('data-name');
            if (sName === 'Chok' && p.paramSew > 0) {
                row.querySelector('.sewing-checkbox').checked = true;
                row.querySelector('.sewing-price-input').value = p.costSew || 500;
            }
            if (sName === 'Overlok' && p.paramOverlock > 0) {
                row.querySelector('.sewing-checkbox').checked = true;
                row.querySelector('.sewing-price-input').value = p.costOverlock || 600;
            }
            if (sName === 'Raspashivalka' && p.paramFlatlock > 0) {
                row.querySelector('.sewing-checkbox').checked = true;
                row.querySelector('.sewing-price-input').value = p.costFlatlock || 800;
            }
            if (sName === 'Bostiriq' && p.paramFolds > 0) {
                row.querySelector('.sewing-checkbox').checked = true;
                row.querySelector('.sewing-price-input').value = p.costFolds || 400;
            }
            if (sName === 'Rangli detal ulash' && p.paramInserts > 0) {
                row.querySelector('.sewing-checkbox').checked = true;
                row.querySelector('.sewing-price-input').value = p.costInserts || 1500;
            }
        });
    }

    // Populate Accessories & Overheads (Step 4)
    // Clear custom dynamic accessory rows first
    const accessoryContainer = document.getElementById('accessory-rows-container');
    if (accessoryContainer) {
        const customRows = accessoryContainer.querySelectorAll('.accessory-row');
        customRows.forEach(row => {
            const chkId = row.querySelector('.accessory-checkbox')?.id;
            if (chkId && chkId.startsWith('acc-custom-')) {
                row.remove();
            }
        });
    }

    const accessories = calcDetails.accessories || [];
    document.querySelectorAll('.accessory-row').forEach(row => {
        row.querySelector('.accessory-checkbox').checked = false;
    });
    
    if (accessories.length > 0) {
        accessories.forEach(a => {
            let matched = false;
            document.querySelectorAll('.accessory-row').forEach(row => {
                const aName = row.getAttribute('data-name');
                if (aName && aName.toLowerCase() === a.name.toLowerCase()) {
                    row.querySelector('.accessory-checkbox').checked = true;
                    row.querySelector('.accessory-price-input').value = a.price || 0;
                    row.querySelector('.accessory-qty-input').value = a.qty || 1;
                    matched = true;
                }
            });
            if (!matched) {
                // Add dynamic custom accessory row
                const container = document.getElementById('accessory-rows-container');
                const row = document.createElement('div');
                row.className = 'accessory-row wizard-toggle-card active';
                row.setAttribute('data-name', a.name);
                row.setAttribute('data-unit', a.unit || 'dona');
                const isGr = (a.unit || 'dona') === 'gr';
                row.innerHTML = `
                    <div class="wizard-toggle-card-header">
                        <input type="checkbox" checked class="accessory-checkbox" id="acc-custom-${Date.now()}-active">
                        <label for="acc-custom-${Date.now()}-active">${a.name} (Maxsus)</label>
                    </div>
                    <div class="wizard-toggle-card-body">
                        <input type="number" class="accessory-price-input" value="${a.price}" min="0" style="width: 80px;">
                        <span style="font-size: 0.75rem; color: var(--color-text-muted);">${isGr ? "so'm/kg" : "so'm"}</span>
                        <span style="font-size: 0.75rem; color: var(--color-text-muted);">x</span>
                        <input type="number" class="accessory-qty-input" value="${a.qty}" min="1" style="text-align: center; width: 55px;">
                        <span style="font-size: 0.75rem; color: var(--color-text-muted);">${isGr ? 'gr' : 'ta'}</span>
                        <button type="button" class="btn-remove-row" style="background:none; border:none; color:var(--color-red); cursor:pointer; margin-left: 8px;"><i class="fa-solid fa-trash"></i></button>
                    </div>
                `;
                container.appendChild(row);

                // Bind custom row events
                const checkbox = row.querySelector('.accessory-checkbox');
                const priceInp = row.querySelector('.accessory-price-input');
                const qtyInp = row.querySelector('.accessory-qty-input');
                checkbox.addEventListener('change', function() {
                    if (checkbox.checked) {
                        row.classList.add('active');
                        priceInp.removeAttribute('disabled');
                        qtyInp.removeAttribute('disabled');
                    } else {
                        row.classList.remove('active');
                        priceInp.setAttribute('disabled', 'true');
                        qtyInp.setAttribute('disabled', 'true');
                    }
                    updateWizardCalculation();
                });
                priceInp.addEventListener('input', updateWizardCalculation);
                qtyInp.addEventListener('input', updateWizardCalculation);
                row.querySelector('.btn-remove-row').addEventListener('click', function() {
                    row.remove();
                    updateWizardCalculation();
                });
            }
        });
    } else if (item.params?.paramAccessories > 0) {
        document.querySelectorAll('.accessory-row').forEach(row => {
            const aName = row.getAttribute('data-name');
            if (aName === 'Zamok' || aName === 'Etiketka') {
                row.querySelector('.accessory-checkbox').checked = true;
                row.querySelector('.accessory-price-input').value = item.params.costAccessories || 2500;
                row.querySelector('.accessory-qty-input').value = 1;
            }
        });
    }

    const overheads = calcDetails.overheads || [];
    document.querySelectorAll('.overhead-row').forEach(row => {
        row.querySelector('.overhead-checkbox').checked = false;
    });

    if (overheads.length > 0) {
        overheads.forEach(o => {
            document.querySelectorAll('.overhead-row').forEach(row => {
                const oName = row.getAttribute('data-name');
                if (oName.toLowerCase() === o.name.toLowerCase()) {
                    row.querySelector('.overhead-checkbox').checked = true;
                    row.querySelector('.overhead-price-input').value = o.price || 0;
                }
            });
        });
    } else if (item.params) {
        const p = item.params;
        document.querySelectorAll('.overhead-row').forEach(row => {
            const oName = row.getAttribute('data-name');
            if (oName === 'Elektr energiya') {
                row.querySelector('.overhead-checkbox').checked = true;
                row.querySelector('.overhead-price-input').value = p.costElectricity || 1000;
            }
            if (oName === 'Oziq-ovqat') {
                row.querySelector('.overhead-checkbox').checked = true;
                row.querySelector('.overhead-price-input').value = p.costPackaging || 1500;
            }
        });
    }

    // Populate Packaging (Step 5)
    // Clear existing custom packaging rows first
    const packagingContainer = document.getElementById('packaging-rows-container');
    if (packagingContainer) {
        const customRows = packagingContainer.querySelectorAll('.packaging-row');
        customRows.forEach(row => {
            const chkId = row.querySelector('.packaging-checkbox')?.id;
            if (chkId && chkId.startsWith('pack-custom-')) {
                row.remove();
            }
        });
    }

    const packings = calcDetails.packaging || [];
    document.querySelectorAll('.packaging-row').forEach(row => {
        row.querySelector('.packaging-checkbox').checked = false;
    });

    if (packings.length > 0) {
        packings.forEach(p => {
            let matched = false;
            document.querySelectorAll('.packaging-row').forEach(row => {
                const pName = row.getAttribute('data-name');
                if (pName && pName.toLowerCase() === p.name.toLowerCase()) {
                    row.querySelector('.packaging-checkbox').checked = true;
                    row.querySelector('.packaging-price-input').value = p.price || 0;
                    matched = true;
                }
            });
            if (!matched) {
                // Add custom packaging row dynamically
                const container = document.getElementById('packaging-rows-container');
                const row = document.createElement('div');
                row.className = 'packaging-row wizard-toggle-card active';
                row.setAttribute('data-name', p.name);
                row.innerHTML = `
                    <div class="wizard-toggle-card-header">
                        <input type="checkbox" checked class="packaging-checkbox" id="pack-custom-${Date.now()}-active">
                        <label for="pack-custom-${Date.now()}-active">${p.name} (Maxsus)</label>
                    </div>
                    <div class="wizard-toggle-card-body">
                        <input type="number" class="packaging-price-input" value="${p.price}" min="0">
                        <span style="font-size: 0.75rem; color: var(--color-text-muted);">so'm</span>
                        <button type="button" class="btn-remove-row" style="background:none; border:none; color:var(--color-red); cursor:pointer; margin-left: 8px;"><i class="fa-solid fa-trash"></i></button>
                    </div>
                `;
                container.appendChild(row);

                // Bind custom row events
                const checkbox = row.querySelector('.packaging-checkbox');
                const priceInp = row.querySelector('.packaging-price-input');
                checkbox.addEventListener('change', function() {
                    if (checkbox.checked) {
                        row.classList.add('active');
                        priceInp.removeAttribute('disabled');
                    } else {
                        row.classList.remove('active');
                        priceInp.setAttribute('disabled', 'true');
                    }
                    updateWizardCalculation();
                });
                priceInp.addEventListener('input', updateWizardCalculation);
                row.querySelector('.btn-remove-row').addEventListener('click', function() {
                    row.remove();
                    updateWizardCalculation();
                });
            }
        });
    } else {
        // Fallback for older saves
        document.querySelectorAll('.packaging-row').forEach(row => {
            const pName = row.getAttribute('data-name');
            if (pName === 'Biodegradable paket') {
                row.querySelector('.packaging-checkbox').checked = true;
                row.querySelector('.packaging-price-input').value = item.params?.costPackaging || 1500;
            } else if (pName === 'Dazmollash xizmati') {
                row.querySelector('.packaging-checkbox').checked = true;
                row.querySelector('.packaging-price-input').value = 1500;
            } else if (pName === 'Qadoqlash xizmati') {
                row.querySelector('.packaging-checkbox').checked = true;
                row.querySelector('.packaging-price-input').value = 1000;
            } else if (pName === 'Etiketka') {
                row.querySelector('.packaging-checkbox').checked = true;
                row.querySelector('.packaging-price-input').value = 500;
            }
        });
    }

    // Trigger checkbox state styles synchronization
    document.querySelectorAll('.decor-checkbox, .sewing-checkbox, .accessory-checkbox, .overhead-checkbox, .packaging-checkbox').forEach(chk => {
        const row = chk.closest('.decoration-row, .sewing-row, .accessory-row, .overhead-row, .packaging-row');
        if (row) {
            const priceInput = row.querySelector('.decor-price-input, .sewing-price-input, .accessory-price-input, .overhead-price-input, .packaging-price-input');
            const qtyInput = row.querySelector('.accessory-qty-input');
            if (chk.checked) {
                row.classList.add('active');
                if (priceInput) priceInput.removeAttribute('disabled');
                if (qtyInput) qtyInput.removeAttribute('disabled');
            } else {
                row.classList.remove('active');
                if (priceInput) priceInput.setAttribute('disabled', 'true');
                if (qtyInput) qtyInput.setAttribute('disabled', 'true');
            }
        }
    });

    // Step 5: Prices
    document.getElementById('wizard-wholesale-price').value = item.wholesalePrice || '';
    document.getElementById('wizard-retail-price').value = item.retailPrice || '';

    // Run calculation updates to update summaries and titles
    updateWizardCalculation();
    updateStepSummaries();

    // Expand step 0
    goToStep(0);
};

// Direct showroom edit save handler replacement (no longer legacy)

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

    // Subtab holatlarini to'g'irlash
    const activeSub = state.activeWarehouseSubTab || 'mato';
    const matoBtn = document.getElementById('btn-warehouse-mato');
    const aksBtn = document.getElementById('btn-warehouse-aksesuar');
    const tableTitle = document.getElementById('warehouse-table-title');

    if (matoBtn && aksBtn) {
        if (activeSub === 'mato') {
            matoBtn.classList.add('active');
            aksBtn.classList.remove('active');
            if (tableTitle) tableTitle.innerText = "Mato Ombori Zaxirasi";
        } else {
            aksBtn.classList.add('active');
            matoBtn.classList.remove('active');
            if (tableTitle) tableTitle.innerText = "Aksessuar Ombori Zaxirasi";
        }
    }

    tbody.innerHTML = '';
    lowStockContainer.innerHTML = '';

    state.materials.forEach(mat => {
        // Subtab bo'yicha filtrlash
        const isMatoType = mat.turi === 'Mato';
        if (activeSub === 'mato' && !isMatoType) return;
        if (activeSub === 'aksesuar' && isMatoType) return;

        if (query && !mat.nomi.toLowerCase().includes(query.toLowerCase()) && !mat.turi.toLowerCase().includes(query.toLowerCase())) {
            return;
        }

        let ecoBadgeClass = 'badge-eco-b';
        if (mat.ekologik_ball === 'A+') ecoBadgeClass = 'badge-eco-aplus';
        else if (mat.ekologik_ball === 'A') ecoBadgeClass = 'badge-eco-a';
        else if (mat.ekologik_ball === 'B+') ecoBadgeClass = 'badge-eco-bplus';

        const tr = document.createElement('tr');
        const locId = `${mat.zona || 'A'}-${String(mat.qator || 1).padStart(2, '0')}-${String(mat.tokcha || 1).padStart(2, '0')}`;
        tr.innerHTML = `
            <td><code>${mat.id}</code></td>
            <td><strong>${mat.nomi}</strong></td>
            <td><span class="badge-row" style="background:rgba(255,255,255,0.05);">${mat.turi}</span></td>
            <td>${mat.rangi || '-'}</td>
            <td><span class="badge-row" style="background:rgba(56, 189, 248, 0.1); color:var(--color-prospect); font-weight:bold; font-size:0.75rem;">${locId}</span></td>
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

    // Virtual yacheykalar xaritasini chizish
    renderWmsRacks();
}

window.switchWarehouseSubTab = function(subtabId) {
    state.activeWarehouseSubTab = subtabId;
    saveState();
    renderWarehouse();
};

function renderWmsRacks() {
    const grid = document.getElementById('wms-racks-grid');
    const activeSub = state.activeWarehouseSubTab || 'mato';
    const zone = activeSub === 'mato' ? 'A' : 'B';
    const zoneBadge = document.getElementById('wms-active-zone-badge');
    if (zoneBadge) {
        zoneBadge.innerText = `Zona ${zone} (${activeSub === 'mato' ? 'Matolar' : 'Aksessuarlar'})`;
    }

    if (!grid) return;
    grid.innerHTML = '';

    // Tokchalar (shelves) yuqoridan pastga (3 -> 2 -> 1)
    for (let shelf = 3; shelf >= 1; shelf--) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'rack-shelf-row';
        rowDiv.style.display = 'grid';
        rowDiv.style.gridTemplateColumns = 'repeat(4, 1fr)';
        rowDiv.style.gap = '10px';

        for (let col = 1; col <= 4; col++) {
            const locId = `${zone}-${String(col).padStart(2, '0')}-${String(shelf).padStart(2, '0')}`;
            // Ushbu yacheykadagi xomashyoni topamiz
            const mat = state.materials.find(m => m.zona === zone && parseInt(m.qator || 1) === col && parseInt(m.tokcha || 1) === shelf);

            const cell = document.createElement('div');
            cell.className = 'wms-rack-cell';
            cell.dataset.loc = locId;
            cell.style.padding = '10px 8px';
            cell.style.borderRadius = '8px';
            cell.style.fontSize = '0.72rem';
            cell.style.fontWeight = '600';
            cell.style.textAlign = 'center';
            cell.style.cursor = 'pointer';
            cell.style.transition = 'all 0.2s ease';

            if (mat) {
                const isLow = mat.miqdori < 15;
                cell.style.background = isLow 
                    ? 'linear-gradient(135deg, rgba(251, 146, 60, 0.15), rgba(251, 146, 60, 0.03))' 
                    : 'linear-gradient(135deg, rgba(52, 211, 153, 0.1), rgba(52, 211, 153, 0.02))';
                cell.style.border = isLow 
                    ? '1px solid rgba(251, 146, 60, 0.3)' 
                    : '1px solid rgba(52, 211, 153, 0.2)';
                cell.style.color = isLow ? 'var(--color-qualified)' : 'var(--color-won)';
                cell.innerHTML = `
                    <div style="font-size:0.58rem; opacity:0.6;">${locId}</div>
                    <div style="text-overflow:ellipsis; overflow:hidden; white-space:nowrap; margin-top:2px;">${mat.nomi}</div>
                    <div style="font-size:0.64rem; font-weight:bold; margin-top:1px;">${mat.miqdori} ${mat.birligi}</div>
                `;
                cell.onclick = () => showWmsRackDetails(mat, locId);
            } else {
                cell.style.background = 'rgba(255,255,255,0.01)';
                cell.style.border = '1px dashed rgba(255,255,255,0.1)';
                cell.style.color = 'var(--color-text-muted)';
                cell.innerHTML = `
                    <div style="font-size:0.58rem; opacity:0.4;">${locId}</div>
                    <div style="margin-top:6px; font-size:0.62rem; font-style:italic; opacity:0.5;">Bo'sh</div>
                `;
                cell.onclick = () => showWmsRackEmpty(locId);
            }
            rowDiv.appendChild(cell);
        }
        grid.appendChild(rowDiv);
    }
}

function showWmsRackDetails(mat, locId) {
    document.querySelectorAll('.wms-rack-cell').forEach(c => c.classList.remove('active'));
    const clickedCell = document.querySelector(`.wms-rack-cell[data-loc="${locId}"]`);
    if (clickedCell) clickedCell.classList.add('active');

    const detailCard = document.getElementById('wms-rack-details');
    if (!detailCard) return;

    let statusLabel = 'Etarli';
    let statusColor = 'var(--color-won)';
    if (mat.miqdori < 15) {
        statusLabel = 'Zaxira Kam';
        statusColor = 'var(--color-qualified)';
    }

    detailCard.style.textAlign = 'left';
    detailCard.style.alignItems = 'flex-start';
    detailCard.innerHTML = `
        <div style="display:flex; justify-content:space-between; width:100%; align-items:center; margin-bottom:12px;">
            <span class="badge" style="background:rgba(56, 189, 248, 0.1); color:var(--color-prospect); font-weight:bold; font-size:0.75rem;">Yacheyka: ${locId}</span>
            <span class="badge" style="background:rgba(255,255,255,0.05); color:${statusColor}; font-weight:bold; font-size:0.75rem;">${statusLabel}</span>
        </div>
        <h4 style="font-size:0.95rem; font-weight:700; color:white; margin-bottom:8px; line-height:1.2;">${mat.nomi}</h4>
        
        <div style="display:flex; flex-direction:column; gap:6px; width:100%; font-size:0.78rem; border-top:1px solid var(--border-color); border-bottom:1px solid var(--border-color); padding:8px 0; margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Zaxira Miqdori:</span>
                <strong style="color:white;">${mat.miqdori} ${mat.birligi}</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Mavjudligi:</span>
                <strong style="color:${statusColor};">${mat.miqdori > 0 ? 'Mavjud' : 'Tugagan'}</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Narxi:</span>
                <strong style="color:white;">$${mat.narxi.toFixed(2)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Qiymati:</span>
                <strong style="color:white;">$${(mat.miqdori * mat.narxi).toFixed(2)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Eco ball:</span>
                <strong style="color:var(--color-prospect);">${mat.ekologik_ball}</strong>
            </div>
        </div>
        
        <div style="display:flex; gap:8px; width:100%;">
            <button class="btn btn-xs btn-primary" onclick="openWmsAuditModal('${mat.id}')" style="flex:1; padding:6px 0; font-size:0.72rem;"><i class="fa-solid fa-calculator"></i> Audit</button>
            <button class="btn btn-xs btn-secondary" onclick="openWmsTransferModal('${mat.id}')" style="flex:1; padding:6px 0; font-size:0.72rem;"><i class="fa-solid fa-arrows-up-down-left-right"></i> Ko'chirish</button>
        </div>
    `;
}

function showWmsRackEmpty(locId) {
    document.querySelectorAll('.wms-rack-cell').forEach(c => c.classList.remove('active'));
    const clickedCell = document.querySelector(`.wms-rack-cell[data-loc="${locId}"]`);
    if (clickedCell) clickedCell.classList.add('active');

    const detailCard = document.getElementById('wms-rack-details');
    if (!detailCard) return;

    detailCard.style.textAlign = 'center';
    detailCard.style.alignItems = 'center';
    detailCard.innerHTML = `
        <i class="fa-solid fa-circle-plus" style="font-size: 2rem; color: var(--color-won); opacity: 0.8; margin-bottom: 12px;"></i>
        <h4 style="font-size: 0.85rem; margin-bottom: 4px; color: var(--color-text-main);">Yacheyka Bo'sh: ${locId}</h4>
        <p style="font-size: 0.72rem; color: var(--color-text-muted); margin-bottom: 12px;">Bu yacheykaga yangi xomashyo joylashingiz mumkin.</p>
        <button class="btn btn-xs btn-primary" onclick="openWmsAddAtLocation('${locId}')" style="font-size:0.72rem; padding:4px 10px;"><i class="fa-solid fa-plus"></i> Joylash</button>
    `;
}

window.openWmsAuditModal = function(id) {
    const mat = state.materials.find(m => m.id === id);
    if (!mat) return;
    const newQty = prompt(`[${mat.nomi}] yangi zaxira miqdori:`, mat.miqdori);
    if (newQty !== null) {
        const qtyVal = parseFloat(newQty);
        if (!isNaN(qtyVal)) {
            mat.miqdori = qtyVal;
            saveState();
            updateUI();
            showWmsRackDetails(mat, `${mat.zona}-${String(mat.qator).padStart(2, '0')}-${String(mat.tokcha).padStart(2, '0')}`);
        }
    }
};

window.openWmsTransferModal = function(id) {
    const mat = state.materials.find(m => m.id === id);
    if (!mat) return;
    const zone = prompt(`Yangi Zona (A yoki B):`, mat.zona);
    if (zone !== 'A' && zone !== 'B') return;
    const qator = prompt(`Yangi Qator (1-4):`, mat.qator);
    const colVal = parseInt(qator);
    if (colVal < 1 || colVal > 4) return;
    const tokcha = prompt(`Yangi Tokcha (1-3):`, mat.tokcha);
    const rowVal = parseInt(tokcha);
    if (rowVal < 1 || rowVal > 3) return;

    // Yacheyka bandligini tekshirish
    const occupied = state.materials.find(m => m.zona === zone && parseInt(m.qator) === colVal && parseInt(m.tokcha) === rowVal && m.id !== id);
    if (occupied) {
        alert(`Xatolik: Joylashuv band! Unda [${occupied.nomi}] joylashgan.`);
        return;
    }

    mat.zona = zone;
    mat.qator = colVal;
    mat.tokcha = rowVal;
    saveState();
    updateUI();
    showWmsRackDetails(mat, `${zone}-${String(colVal).padStart(2, '0')}-${String(rowVal).padStart(2, '0')}`);
};

window.openWmsAddAtLocation = function(locId) {
    const parts = locId.split('-');
    const zone = parts[0];
    const col = parseInt(parts[1]);
    const row = parseInt(parts[2]);

    openModal('modal-warehouse');

    document.getElementById('ware-zone').value = zone;
    document.getElementById('ware-rack-col').value = String(col);
    document.getElementById('ware-rack-row').value = String(row);
};

window.deleteMaterial = function(id) {
    if (confirm("Xomashyoni ro'yxatdan o'chirmoqchimisiz?")) {
        state.materials = state.materials.filter(m => m.id !== id);
        saveState();
        updateUI();
    }
};

window.deleteCuttingOrder = function(id) {
    if (confirm("Rostdan ham ushbu bichuv buyrug'ini o'chirmoqchimisiz?")) {
        state.cuts = state.cuts.filter(c => c.id !== id);
        saveState();
        updateUI();
        closeModal('modal-cutting-details');
    }
};



window.printCuttingOrder = function(cutId) {
    const cut = state.cuts.find(c => c.id === cutId);
    if (!cut) return;

    let colorWasteHtml = '';
    if (cut.color_waste && cut.color_waste.length > 0) {
        colorWasteHtml = cut.color_waste.map(cw => `
            <tr>
                <td>${cw.color}</td>
                <td>${cw.wasteKg} kg</td>
                <td>${cw.wastePct}%</td>
            </tr>
        `).join('');
    }

    let rollsHtml = '';
    if (cut.nastil_rolls && cut.nastil_rolls.length > 0) {
        rollsHtml = cut.nastil_rolls.map((r, i) => `
            <tr>
                <td>${i + 1}-Rulon</td>
                <td>${r.color || '-'}</td>
                <td>${r.weight} kg</td>
                <td>${r.qty || 0} dona</td>
            </tr>
        `).join('');
    }

    let modelsHtml = '';
    if (cut.models && cut.models.length > 0) {
        modelsHtml = cut.models.map((m, i) => `
            <tr>
                <td>${i + 1}</td>
                <td style="width: 80px; text-align: center;">${m.image_base64 ? `<img src="${m.image_base64}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; border: 1px solid #ccc;" />` : '-'}</td>
                <td>${m.name}</td>
                <td>${m.color}</td>
                <td><strong>${m.qty} ta</strong></td>
            </tr>
        `).join('');
    }

    const printWindow = window.open('', '', 'width=900,height=700');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>${cut.nomi} - Bichuv Buyrug'i</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #2c3e50; line-height: 1.5; }
                .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #34495e; padding-bottom: 15px; }
                .header h1 { margin: 0; font-size: 26px; text-transform: uppercase; letter-spacing: 1px; color: #2c3e50; }
                .header p { margin: 5px 0 0; font-size: 14px; color: #7f8c8d; }
                .details-grid { display: flex; justify-content: space-between; margin-bottom: 30px; gap: 20px; }
                .details-box { flex: 1; border: 1px solid #bdc3c7; border-radius: 8px; padding: 20px; background: #fafafa; }
                .details-box h3 { margin-top: 0; font-size: 16px; border-bottom: 1px solid #ecf0f1; padding-bottom: 8px; color: #2980b9; text-transform: uppercase; }
                .row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; border-bottom: 1px dashed #ecf0f1; padding-bottom: 5px; }
                .row strong { color: #2c3e50; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                th, td { border: 1px solid #bdc3c7; padding: 12px; text-align: left; font-size: 14px; vertical-align: middle; }
                th { background-color: #ecf0f1; font-weight: 600; color: #2c3e50; }
                .footer { margin-top: 60px; display: flex; justify-content: space-around; }
                .sign-box { width: 250px; text-align: center; }
                .sign-line { border-bottom: 1px solid #34495e; margin-top: 50px; }
                .sign-label { margin-top: 8px; font-size: 13px; color: #7f8c8d; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>ECO SPORTS MANUFACTURING</h1>
                <p>BICHUV BUYRUG'I VA XULOSASI (DALOLATNOMA)</p>
                <p><strong>Hujjat raqami:</strong> ${cut.id} &nbsp;|&nbsp; <strong>Sana:</strong> ${cut.sana}</p>
            </div>
            
            <div style="margin-bottom: 25px; padding: 15px; background: #ecf0f1; border-radius: 8px; border-left: 5px solid #2980b9;">
                <strong>Mahsulot nomi:</strong> <span style="font-size: 18px; color: #2980b9;">${cut.nomi}</span> 
                <span style="color: #7f8c8d; margin-left: 10px;">(${cut.turi})</span>
            </div>

            <div class="details-grid">
                <div class="details-box">
                    <h3>Asosiy Ko'rsatkichlar</h3>
                    <div class="row"><span>Ishlatilgan Mato:</span> <strong>${cut.mato_id}</strong></div>
                    <div class="row"><span>Umumiy Sarf:</span> <strong>${cut.ogirlik} kg</strong></div>
                    <div class="row"><span>Jami Chiqqan Dona:</span> <strong>${cut.bichilgan_dona} ta</strong></div>
                    <div class="row"><span>Jami Kroy (Chiqindi):</span> <strong>${cut.chiqindi_kg ? cut.chiqindi_kg + ' kg (' + cut.chiqindi_pct + '%)' : cut.chiqindi_pct + '%'}</strong></div>
                </div>
                <div class="details-box">
                    <h3>Nastil Parametrlari</h3>
                    <div class="row"><span>Nastil Uzunligi:</span> <strong>${cut.nastil_uzunlik || '-'} sm</strong></div>
                    <div class="row"><span>Matoning Eni:</span> <strong>${cut.nastil_eni || '-'} sm</strong></div>
                    <div class="row"><span>Rulonlar Soni:</span> <strong>${cut.nastil_rolls ? cut.nastil_rolls.length : 0} ta</strong></div>
                    <div class="row"><span>Mas'ul Bichuvchi:</span> <strong>${cut.masul}</strong></div>
                </div>
            </div>

            ${modelsHtml ? `
            <h3 style="color: #2980b9; text-transform: uppercase; font-size: 16px; margin-bottom: 10px;">Modellarga Taqsimot (Abrases)</h3>
            <table>
                <thead>
                    <tr>
                        <th style="width: 40px;">#</th>
                        <th>Namuna</th>
                        <th>Model Nomi</th>
                        <th>Rangi</th>
                        <th>Soni</th>
                    </tr>
                </thead>
                <tbody>
                    ${modelsHtml}
                </tbody>
            </table>
            ` : ''}

            ${colorWasteHtml ? `
            <h3 style="color: #2980b9; text-transform: uppercase; font-size: 16px; margin-bottom: 10px;">Ranglar Bo'yicha Chiqindi Kesimi</h3>
            <table>
                <thead>
                    <tr>
                        <th>Rang</th>
                        <th>Chiqindi (kg)</th>
                        <th>Chiqindi (%)</th>
                    </tr>
                </thead>
                <tbody>
                    ${colorWasteHtml}
                </tbody>
            </table>
            ` : ''}

            <h3 style="color: #2980b9; text-transform: uppercase; font-size: 16px; margin-bottom: 10px;">Rulonlar Kesimi</h3>
            <table>
                <thead>
                    <tr>
                        <th>Rulon</th>
                        <th>Rangi</th>
                        <th>Og'irligi (kg)</th>
                        <th>Chiqqan Dona</th>
                    </tr>
                </thead>
                <tbody>
                    ${rollsHtml}
                </tbody>
            </table>

            <div class="footer">
                <div class="sign-box">
                    <div class="sign-line"></div>
                    <div class="sign-label">Bichuvchi (${cut.masul})</div>
                </div>
                <div class="sign-box">
                    <div class="sign-line"></div>
                    <div class="sign-label">Ishlab chiqarish menejeri</div>
                </div>
            </div>
            
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(function() { window.close(); }, 1000);
                }
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
};


// --- BICHUV Rendering ---
function renderCutting(query = "") {
    const container = document.getElementById('container-cutting-cards');
    if (!container) return;
    container.innerHTML = '';

    let totalWeight = 0;
    let totalPieces = 0;

    state.cuts.forEach(cut => {
        if (query && !cut.nomi.toLowerCase().includes(query.toLowerCase()) && !cut.turi.toLowerCase().includes(query.toLowerCase())) {
            return;
        }

        totalWeight += cut.ogirlik;
        totalPieces += cut.bichilgan_dona;

        let rollsCount = 0;
        let colorStatsHtml = '';
        if (cut.nastil_rolls && cut.nastil_rolls.length > 0) {
            rollsCount = cut.nastil_rolls.length;
            const colorGroups = {};
            cut.nastil_rolls.forEach(r => {
                if(r.color) {
                    if(!colorGroups[r.color]) colorGroups[r.color] = { weight: 0, qty: 0 };
                    colorGroups[r.color].weight += r.weight;
                    colorGroups[r.color].qty += r.qty;
                }
            });
            for(let c in colorGroups) {
                colorStatsHtml += `<span style="display:inline-block; margin-right:5px; margin-bottom:5px; padding:4px 8px; background:rgba(255,255,255,0.05); border-radius:4px; font-size:0.75rem;">${c}: <strong style="color:var(--color-prospect);">${colorGroups[c].weight.toFixed(1)} kg</strong> (${colorGroups[c].qty} ta)</span>`;
            }
        }

        const card = document.createElement('div');
        card.className = 'card-glass';
        card.style = 'padding: 15px; display: flex; flex-direction: column; gap: 10px; cursor: pointer; transition: transform 0.2s;';
        card.onclick = () => openCuttingDetails(cut.id);
        
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                    <h4 style="margin: 0; color: var(--color-text);">${cut.nomi}</h4>
                    <small style="color: var(--color-text-muted);">${cut.sana}</small>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 5px; font-size: 0.9rem;">
                <div>
                    <div style="color: var(--color-text-muted); font-size: 0.75rem;">Mato ID</div>
                    <code style="font-size: 0.8rem;">${cut.mato_id}</code>
                </div>
                <div>
                    <div style="color: var(--color-text-muted); font-size: 0.75rem;">Umumiy Sarf</div>
                    <strong>${cut.ogirlik} kg</strong>
                </div>
                <div>
                    <div style="color: var(--color-text-muted); font-size: 0.75rem;">Rulonlar</div>
                    <span>${rollsCount} ta</span>
                </div>
                <div>
                    <div style="color: var(--color-text-muted); font-size: 0.75rem;">Jami Soni</div>
                    <strong style="color: var(--color-prospect);">${cut.bichilgan_dona} dona</strong>
                </div>
            </div>
            
            ${colorStatsHtml ? `<div style="margin-top: 5px; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 10px;">${colorStatsHtml}</div>` : ''}
        `;
        
        card.onmouseover = () => card.style.transform = 'translateY(-3px)';
        card.onmouseout = () => card.style.transform = 'translateY(0)';
        container.appendChild(card);
    });

    const _ctu = document.getElementById('cut-total-used'); if (_ctu) _ctu.innerText = `${totalWeight} kg`;
    const _ctp = document.getElementById('cut-total-pieces'); if (_ctp) _ctp.innerText = `${totalPieces} ta`;
}

window.addModelToCut = function(cutId) {
    const cut = state.cuts.find(c => c.id === cutId);
    if (!cut) return;
    
    const nameInput = document.getElementById('model-add-name');
    const colorInput = document.getElementById('model-add-color');
    const qtyInput = document.getElementById('model-add-qty');
    const imageInput = document.getElementById('model-add-image');
    
    const name = nameInput.value.trim();
    const color = colorInput.value.trim();
    const qty = parseInt(qtyInput.value) || 0;
    
    if (!name || !color || qty <= 0) {
        showToast("Iltimos, model nomi, rangi va sonini to'g'ri kiriting!", "warning");
        return;
    }
    
    let taqsimlangan = 0;
    if(cut.models) cut.models.forEach(m => taqsimlangan += parseInt(m.qty || 0));
    let qoldiq = cut.bichilgan_dona - taqsimlangan;
    
    if (qty > qoldiq) {
        showToast("Xato! Kiritilgan son qoldiqdan katta bo'lishi mumkin emas.", "error");
        return;
    }

    // Rang bo'yicha rulonlardagi jami donani hisoblash
    let colorTotal = 0;
    if (Array.isArray(cut.nastil_rolls)) {
        cut.nastil_rolls.forEach(r => {
            if (r.color === color) colorTotal += parseInt(r.qty || 0);
        });
    }

    // Allaqachon ajratilgan miqdorni hisoblash
    let colorAllocated = 0;
    if (cut.models) {
        cut.models.forEach(m => {
            if (m.color === color) colorAllocated += parseInt(m.qty || 0);
        });
    }

    const colorQoldiq = colorTotal - colorAllocated;

    if (qty > colorQoldiq) {
        showToast(`Xatolik: Ushbu rangdan (${color}) faqat ${colorQoldiq} dona qolgan! Rulonlarda jami: ${colorTotal} dona, ajratilgan: ${colorAllocated} dona.`, "error");
        return;
    }

    const addModelWithImage = (base64) => {
        if (!cut.models) cut.models = [];
        cut.models.push({
            id: 'mod-' + Date.now(),
            name: name,
            color: color,
            qty: qty,
            image_base64: base64
        });
        saveState();
        openCuttingDetails(cutId);
    };

    if (imageInput && imageInput.files && imageInput.files[0]) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 300;
                const MAX_HEIGHT = 300;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                addModelWithImage(canvas.toDataURL('image/jpeg', 0.6));
            }
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        addModelWithImage(null);
    }
};

window.removeModelFromCut = function(cutId, modelId) {
    const cut = state.cuts.find(c => c.id === cutId);
    if (!cut) return;
    showConfirmModal("Modelni o'chirish", "Ushbu modelni o'chirmoqchimisiz?", function() {
        cut.models = cut.models.filter(m => m.id !== modelId);
        saveState();
        openCuttingDetails(cutId);
        showToast("Model o'chirildi.", "info");
    }, 'danger');
};

window.sendCutToProduction = function(cutId) {
    const cut = state.cuts.find(c => c.id === cutId);
    if (!cut) return;
    
    if (!cut.models || cut.models.length === 0) {
        showToast("Ishlab chiqarishga yuborish uchun avval mahsulotni modellarga ajratishingiz kerak!", "warning");
        return;
    }
    
    // Hali ishlab chiqarishga yuborilmagan modellarni aniqlash
    const sentOrders = state.orders ? state.orders.filter(o => o.cut_id === cut.id) : [];
    const unsentModels = cut.models.filter(m => !sentOrders.some(o => o.mahsulot_nomi === m.name && o.model_color === m.color));
    
    if (unsentModels.length === 0) {
        showToast("Barcha modellar allaqachon ishlab chiqarishga yuborilgan!", "warning");
        return;
    }
    
    const confirmMessage = unsentModels.length === cut.models.length
        ? "Barcha ajratilgan modellarni alohida partiya (zayavka) sifatida Tikuv bo'limiga yubormoqchimisiz?"
        : `Yangi ajratilgan ${unsentModels.length} ta modelni partiya (zayavka) sifatida Tikuv bo'limiga yubormoqchimisiz? (Avvalgilar yuborilgan)`;
    
    showConfirmModal(
        "Tikuv bo'limiga yuborish",
        confirmMessage,
        function() {
            // Find and remove any existing unsplit order cards from the Kanban board (if sending for the first time)
            if (sentOrders.length === 0) {
                let relatedOrders = state.orders.filter(o => o.cut_id === cut.id);
                if (relatedOrders.length === 0) {
                    relatedOrders = state.orders.filter(o => o.mahsulot_nomi === cut.nomi && o.miqdori === cut.bichilgan_dona);
                }
                const relatedOrderIds = relatedOrders.map(o => o.id);
                if (relatedOrderIds.length > 0 && Array.isArray(state.kanban)) {
                    state.kanban = state.kanban.filter(k => !relatedOrderIds.includes(k.orderId));
                }
            }

            // Create an order and kanban card for each unsent model
            if (!Array.isArray(state.kanban)) state.kanban = [];

            unsentModels.forEach((m, i) => {
                const newOrderId = 'ord-' + String(state.orders.length + 1).padStart(3, '0') + '-' + Math.floor(Math.random()*1000);
                const newOrder = {
                    id: newOrderId,
                    mahsulot_nomi: m.name,
                    turi: cut.turi,
                    miqdori: m.qty,
                    liniya: "Liniya A", 
                    boshlangan_sana: new Date().toISOString().split('T')[0],
                    topshirish_sana: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
                    status: 'Tikilmoqda',
                    tayyorlandi: 0,
                    bichildi: m.qty,
                    cut_id: cut.id,
                    model_color: m.color,
                    model_image: m.image_base64
                };
                state.orders.push(newOrder);

                // Create Kanban card for this model
                state.kanban.push({
                    id: 'k-' + Date.now() + '-' + i,
                    orderId: newOrderId,
                    model: m.name + (m.color ? ' (' + m.color + ')' : ''),
                    turi: cut.turi,
                    miqdori: m.qty,
                    liniya: "Liniya A",
                    masul: '—',
                    deadline: newOrder.topshirish_sana,
                    prio: 'normal',
                    stage: getStages()[0].id
                });
            });
            
            cut.status = 'Ishlab chiqarishda';
            saveState();
            updateUI();
            closeModal('modal-cutting-details');
            showToast("Muvaffaqiyatli! Yangi modellar Tikuv bo'limiga faol jarayonga o'tkazildi.", "success");
        },
        'info'
    );
};

window.selectModelColor = function(color) {
    const modelAddColor = document.getElementById('model-add-color');
    const selectedText = document.getElementById('model-color-selected-text');
    const colorList = document.getElementById('model-color-list');
    if (modelAddColor) modelAddColor.value = color;
    if (selectedText) {
        selectedText.innerText = color;
        selectedText.style.color = 'white';
    }
    if (colorList) colorList.style.display = 'none';
};

window.openCuttingDetails = function(cutId) {
    const cut = state.cuts.find(c => c.id === cutId);
    if(!cut) return;
    
    // Ensure cut.models exists
    if (!cut.models) cut.models = [];
    
    // Build color options HTML for custom dropdown
    const uniqueColors = [...new Set((cut.nastil_rolls || []).map(r => r.color).filter(c => c))];
    const colorOptionsHtml = uniqueColors.map(c => {
        let cc = '#555';
        if(c === 'Qora') cc = '#111';
        if(c === 'Oq') cc = '#f5f5f5';
        if(c === "To'q Ko'k") cc = '#1a237e';
        if(c === 'Antra') cc = '#37474f';
        if(c === 'Melanj') cc = '#9e9e9e';
        const escapedColor = c.replace(/'/g, "\\'");
        return `
            <div onclick="selectModelColor('${escapedColor}')" style="padding: 10px 15px; cursor: pointer; color: white; font-size: 0.9rem; border-bottom: 1px solid rgba(255,255,255,0.05);" onmouseover="this.style.background='rgba(56, 189, 248, 0.1)'" onmouseout="this.style.background='transparent'">
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="width:14px; height:14px; border-radius:50%; background:${cc}; border:1px solid rgba(255,255,255,0.2);"></div>
                    ${c}
                </div>
            </div>
        `;
    }).join('');
    
    let taqsimlangan = 0;
    cut.models.forEach(m => taqsimlangan += parseInt(m.qty || 0));
    let qoldiq = cut.bichilgan_dona - taqsimlangan;
    let progressPct = Math.min((taqsimlangan / cut.bichilgan_dona) * 100, 100);

    const content = document.getElementById('cutting-details-content');
    if(!content) return;
    
    let rollsHtml = '';
    if(cut.nastil_rolls && cut.nastil_rolls.length > 0) {
        rollsHtml = cut.nastil_rolls.map((r, i) => {
            if(r.color) {
                return `
                <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(255,255,255,0.03); border-radius: 4px; margin-bottom: 5px;">
                    <span><strong>${i+1}-Rulon</strong> (${r.color})</span>
                    <span>${r.weight} kg &rarr; <strong style="color:var(--color-prospect);">${r.qty} dona</strong></span>
                </div>`;
            } else {
                return `<div style="padding: 8px; background: rgba(255,255,255,0.03); border-radius: 4px; margin-bottom: 5px;">${i+1}-Rulon: ${r} kg</div>`;
            }
        }).join('');
    } else {
        rollsHtml = '<p style="color: var(--color-text-muted);">Rulonlar biriktirilmagan.</p>';
    }

    let colorWasteHtml = '';
    if (cut.color_waste && cut.color_waste.length > 0) {
        colorWasteHtml = cut.color_waste.map(cw => `
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-top: 4px; padding-left: 10px; border-left: 2px solid rgba(255,255,255,0.1);">
                <span style="color: var(--color-text-muted);">${cw.color} rasxodi:</span>
                <span style="${cw.wasteKg < 0 ? 'color: #ef4444;' : 'color: var(--color-text);'}">${cw.wasteKg} kg (${cw.wastePct}%)</span>
            </div>
        `).join('');
    }

    let modelsHtml = '';
    if(cut.models.length > 0) {
        modelsHtml = cut.models.map(m => `
            <div style="display: flex; align-items: center; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px; margin-bottom: 10px;">
                <div style="width: 60px; height: 60px; border-radius: 6px; overflow: hidden; margin-right: 15px; border: 1px solid rgba(255,255,255,0.2); background: #1a1a1a;">
                    ${m.image_base64 ? `<img src="${m.image_base64}" style="width:100%; height:100%; object-fit:cover;" />` : `<div style="display:flex; align-items:center; justify-content:center; height:100%; color:#555; font-size:0.8rem; text-align:center;">Rasm yo'q</div>`}
                </div>
                <div style="flex: 1;">
                    <h5 style="margin: 0; font-size: 1rem;">${m.name}</h5>
                    <span style="font-size: 0.8rem; color: var(--color-text-muted);">Rang: ${m.color} | Ajratildi: <strong style="color:var(--color-prospect);">${m.qty} ta</strong></span>
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeModelFromCut('${cut.id}', '${m.id}')" style="padding: 5px 10px;"><i class="fa-solid fa-times"></i></button>
            </div>
        `).join('');
    } else {
        modelsHtml = '<p style="color: var(--color-text-muted); font-size: 0.85rem;">Hali modellarga ajratilmagan.</p>';
    }

    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; margin-bottom: 15px;">
            <div>
                <h2 style="margin: 0; color: var(--color-won);">${cut.nomi}</h2>
                <span style="color: var(--color-text-muted);">${cut.turi} | Sana: ${cut.sana}</span>
            </div>
            <span class="badge-row badge-status-bichildi" style="font-size: 1rem;">${cut.status}</span>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
            <div class="card-glass" style="padding: 15px;">
                <h4 style="margin-top: 0; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px;">Asosiy Ko'rsatkichlar</h4>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>Ishlatilgan Mato:</span> <code>${cut.mato_id}</code></div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>Umumiy Sarf:</span> <strong>${cut.ogirlik} kg</strong></div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>Jami Chiqqan Dona:</span> <strong style="color:var(--color-prospect);">${cut.bichilgan_dona} ta</strong></div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>Jami Kroy (Chiqindi):</span> <span style="color:var(--color-orange);">${cut.chiqindi_kg ? cut.chiqindi_kg + ' kg (' + cut.chiqindi_pct + '%)' : cut.chiqindi_pct + '%'}</span></div>
                ${colorWasteHtml}
                <div style="display: flex; justify-content: space-between; margin-top: 8px; padding-top: 8px; border-top: 1px dashed rgba(255,255,255,0.1);"><span>Mas'ul Shaxs:</span> <span>${cut.masul}</span></div>
            </div>
            
            <div class="card-glass" style="padding: 15px;">
                <h4 style="margin-top: 0; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px;">Nastil Parametrlari</h4>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>Uzunligi:</span> <strong>${cut.nastil_uzunlik || '-'} sm</strong></div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>Eni:</span> <strong>${cut.nastil_eni || '-'} sm</strong></div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>Rulonlar Soni:</span> <strong>${cut.nastil_rolls ? cut.nastil_rolls.length : 0} ta</strong></div>
            </div>
        </div>
        
        <!-- MODELLARGA AJRATISH SECTION -->
        <div class="card-glass" style="padding: 15px; margin-bottom: 15px; border-color: var(--color-prospect);">
            <h4 style="margin-top: 0; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px; color: var(--color-prospect);">Modellarga Taqsimlash</h4>
            
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 5px;">
                <span>Jami Soni: <strong>${cut.bichilgan_dona} ta</strong></span>
                <span>Taqsimlandi: <strong style="color: var(--color-prospect);">${taqsimlangan} ta</strong></span>
                <span>Qoldiq: <strong style="color: var(--color-orange);">${qoldiq} ta</strong></span>
            </div>
            <div style="width: 100%; background: rgba(0,0,0,0.3); height: 8px; border-radius: 4px; margin-bottom: 15px; overflow: hidden;">
                <div style="height: 100%; width: ${progressPct}%; background: var(--color-prospect); transition: width 0.3s;"></div>
            </div>

            ${qoldiq > 0 ? `
            <div style="background: rgba(0,0,0,0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 1px solid rgba(255,255,255,0.05);">
                <div style="display: grid; grid-template-columns: 100px 1fr; gap: 15px;">
                    <!-- Rasm yuklash -->
                    <div style="position: relative; width: 100px; height: 100px; border: 2px dashed rgba(255,255,255,0.2); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(0,0,0,0.2); cursor: pointer; transition: border-color 0.2s;" onmouseover="this.style.borderColor='var(--color-prospect)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.2)'">
                        <i class="fa-solid fa-camera" style="font-size: 24px; color: rgba(255,255,255,0.3); margin-bottom: 5px;"></i>
                        <span style="font-size: 0.65rem; color: var(--color-text-muted); text-align: center; line-height: 1.2;">Rasm<br>yuklash</span>
                        <input type="file" id="model-add-image" accept="image/*" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer;" onchange="
                            if(this.files && this.files[0]) {
                                const reader = new FileReader();
                                reader.onload = function(e) {
                                    const preview = document.getElementById('model-image-preview');
                                    preview.style.backgroundImage = 'url(' + e.target.result + ')';
                                    preview.style.display = 'block';
                                }
                                reader.readAsDataURL(this.files[0]);
                            }
                        ">
                        <div id="model-image-preview" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; border-radius: 6px; display: none;"></div>
                    </div>
                    
                    <!-- Kiritish maydonlari -->
                    <div style="display: flex; flex-direction: column; justify-content: space-between;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <input type="text" id="model-add-name" placeholder="Model Nomi (masalan: Polo)" class="form-control" style="padding: 8px 12px; font-size: 0.9rem;">
                            <div class="custom-dropdown" style="position: relative;" id="model-color-dropdown-container">
                                <div id="model-color-display" style="width: 100%; height: 100%; padding: 8px 12px; font-size: 0.9rem; background: rgba(0,0,0,0.3); color: var(--color-text-muted); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: border-color 0.2s;" onclick="const list = document.getElementById('model-color-list'); list.style.display = list.style.display === 'none' ? 'flex' : 'none';">
                                    <span id="model-color-selected-text">Rangni tanlang...</span>
                                    <i class="fa-solid fa-chevron-down" style="font-size: 0.8rem; color: var(--color-text-muted);"></i>
                                </div>
                                <div id="model-color-list" style="position: absolute; top: calc(100% + 5px); left: 0; width: 100%; background: #1a1a24; border: 1px solid var(--color-prospect); border-radius: 8px; overflow: hidden; z-index: 100; box-shadow: 0 10px 25px rgba(0,0,0,0.5); display: none; flex-direction: column;">
                                    ${colorOptionsHtml}
                                </div>
                                <input type="hidden" id="model-add-color" value="">
                            </div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 150px; gap: 10px; margin-top: 10px;">
                            <input type="number" id="model-add-qty" placeholder="Soni" max="${qoldiq}" class="form-control" style="padding: 8px 12px; font-size: 0.9rem;">
                            <button class="btn btn-primary" onclick="addModelToCut('${cut.id}')" style="background: var(--color-prospect); border:none; height: 100%; font-size: 0.9rem;"><i class="fa-solid fa-plus"></i> Model Qo'shish</button>
                        </div>
                    </div>
                </div>
            </div>
            ` : `<div style="padding: 10px; background: rgba(39, 174, 96, 0.1); color: var(--color-won); border-radius: 6px; margin-bottom: 15px; font-size: 0.85rem; text-align: center;">Barcha donalar modellarga taqsimlangan.</div>`}

            <div id="models-list-container">
                ${modelsHtml}
            </div>
        </div>
        
        <div style="margin-top: 15px;">
            <h4 style="margin-bottom: 10px;">Rulonlar Kesimi</h4>
            ${rollsHtml}
        </div>
        
        <div style="margin-top: 25px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
            <button class="btn btn-primary" onclick="printCuttingOrder('${cut.id}')" style="background: var(--color-prospect); border: none;"><i class="fa-solid fa-file-pdf"></i> Hujjat shaklida (PDF)</button>
            ${(function() {
                if (!cut.models || cut.models.length === 0) return '';
                const sentOrders = state.orders ? state.orders.filter(o => o.cut_id === cut.id) : [];
                const hasUnsent = cut.models.some(m => !sentOrders.some(o => o.mahsulot_nomi === m.name && o.model_color === m.color));
                if (hasUnsent || cut.status !== 'Ishlab chiqarishda') {
                    return `
                        <button class="btn btn-success" onclick="sendCutToProduction('${cut.id}')" style="background: var(--color-won); border: none;"><i class="fa-solid fa-industry"></i> Ishlab chiqarishga Yuborish</button>
                    `;
                }
                return '';
            })()}
            <button class="btn btn-danger" onclick="deleteCuttingOrder('${cut.id}')"><i class="fa-solid fa-trash"></i> Buyruqni O'chirish</button>
        </div>
    `;
    
    openModal('modal-cutting-details');
}

window.deleteCuttingOrder = function(cutId) {
    showConfirmModal(
        "Bichuv buyrug'ini o'chirish",
        "Ushbu bichuv buyrug'ini rostan ham o'chirmoqchimisiz? Ishlatilgan mato miqdori omborga qaytariladi.",
        function() {
            const cutIndex = state.cuts.findIndex(c => c.id === cutId);
            if(cutIndex === -1) return;
            
            const cut = state.cuts[cutIndex];
            
            // Check if production has already advanced
            const orderIndex = state.orders.findIndex(o => (o.cut_id === cutId) || (o.mahsulot_nomi === cut.nomi && o.boshlangan_sana === cut.sana));
            if (orderIndex !== -1) {
                const order = state.orders[orderIndex];
                if (order.status !== 'Bichildi') {
                    showToast("Ushbu bichuv asosida ishlab chiqarish/tikuv jarayoni boshlanib bo'lgan! Dastlab tikuv partiyasini bekor qilishingiz kerak.", "error");
                    return;
                }
                // Remove associated order
                state.orders.splice(orderIndex, 1);
            }
            
            // Restore fabric
            const mat = state.materials.find(m => m.id === cut.mato_id);
            if (mat) {
                mat.miqdori += cut.ogirlik;
            }
            
            // Remove cut
            state.cuts.splice(cutIndex, 1);
            
            saveState();
            updateUI();
            closeModal('modal-cutting-details');
            showToast("Bichuv buyrug'i o'chirildi.", "info");
        },
        'danger'
    );
};


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
                id: 'cut-' + Date.now() + '-' + Math.floor(Math.random()*1000),
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
            const zone = document.getElementById('ware-zone').value;
            const qator = parseInt(document.getElementById('ware-rack-col').value) || 1;
            const tokcha = parseInt(document.getElementById('ware-rack-row').value) || 1;

            // Yacheyka bandligini tekshirish
            const occupied = state.materials.find(m => m.zona === zone && parseInt(m.qator || 1) === qator && parseInt(m.tokcha || 1) === tokcha);
            if (occupied) {
                alert(`Xatolik: ${zone}-${String(qator).padStart(2, '0')}-${String(tokcha).padStart(2, '0')} yacheykasi band! Unda [${occupied.nomi}] joylashgan.`);
                return;
            }

            const newItem = {
                id: 'mat-' + String(state.materials.length + 1).padStart(3, '0'),
                nomi: name,
                turi: type,
                rangi: color,
                miqdori: qty,
                birligi: unit,
                narxi: price,
                ekologik_ball: eco,
                zona: zone,
                qator: qator,
                tokcha: tokcha
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

    // --- Nastil Rolls Logic ---
    const btnAddRoll = document.getElementById('btn-add-roll');
    const rollsContainer = document.getElementById('nastil-rolls-container');
    const cutWeightInput = document.getElementById('cut-weight');
    const cutQtyInput = document.getElementById('cut-qty');
    const colorQtyContainer = document.getElementById('color-qty-container');

    function updateNastilTotal() {
        let totalWeight = 0;
        let colorWeights = {};

        if(rollsContainer) {
            const rows = rollsContainer.querySelectorAll('.roll-input-row');
            rows.forEach(row => {
                const wInput = row.querySelector('.roll-weight-input');
                const cInput = row.querySelector('.roll-color-input');
                
                const w = parseFloat(wInput ? wInput.value : 0) || 0;
                totalWeight += w;
                
                if(cInput && cInput.value && w > 0) {
                    const c = cInput.value;
                    if(!colorWeights[c]) colorWeights[c] = 0;
                    colorWeights[c] += w;
                }
            });
        }
        if(cutWeightInput) cutWeightInput.value = totalWeight > 0 ? totalWeight.toFixed(1) : '';
        
        if (colorQtyContainer) {
            const currentColors = Object.keys(colorWeights);
            if (currentColors.length === 0) {
                colorQtyContainer.innerHTML = '<span style="font-size: 0.75rem; color: var(--color-text-muted);">Avval rulon va rangini tanlang...</span>';
            } else {
                if (colorQtyContainer.querySelector('span:not(.qty-label)')) {
                    colorQtyContainer.innerHTML = '';
                }
                
                currentColors.forEach(color => {
                    const safeColor = color.replace(/'/g, "\\'");
                    let colorDiv = colorQtyContainer.querySelector(`div[data-color-block="${safeColor}"]`);
                    
                    if (!colorDiv) {
                        colorDiv = document.createElement('div');
                        colorDiv.setAttribute('data-color-block', color);
                        colorDiv.style = 'display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-color);';
                        colorDiv.innerHTML = `
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <span class="qty-label" style="font-weight: 600; color: var(--color-text); min-width: 80px;">${color}</span>
                                <span style="font-size: 0.8rem; color: var(--color-text-muted);">Sarf: <strong class="color-weight-lbl" style="color: var(--color-prospect);"></strong></span>
                            </div>
                            <input type="number" data-color-qty="${color}" class="color-qty-val" min="0" placeholder="Necha dona chiqdi?" style="width: 140px; padding: 6px 10px; border-radius: 6px; border: 1px solid var(--border-color); background: rgba(0,0,0,0.3); color: white; font-size: 0.85rem;">
                        `;
                        colorDiv.querySelector('input').addEventListener('input', calculateTotalQty);
                        colorQtyContainer.appendChild(colorDiv);
                    }
                    colorDiv.querySelector('.color-weight-lbl').innerText = `${colorWeights[color].toFixed(1)} kg`;
                });
                
                colorQtyContainer.querySelectorAll('div[data-color-block]').forEach(div => {
                    const c = div.getAttribute('data-color-block');
                    if (!colorWeights[c]) {
                        div.remove();
                    }
                });
            }
        }
        calculateTotalQty();
    }
    
    function calculateTotalQty() {
        let totalQty = 0;
        if (colorQtyContainer) {
            colorQtyContainer.querySelectorAll('input.color-qty-val').forEach(input => {
                const qty = parseInt(input.value) || 0;
                totalQty += qty;
            });
        }
        if(cutQtyInput) cutQtyInput.value = totalQty > 0 ? totalQty : '';
        calculateWaste();
    }

    const cutUnitWeightInput = document.getElementById('cut-unit-weight');
    const cutWasteDisplay = document.getElementById('cut-waste-display');

    if (cutUnitWeightInput) {
        cutUnitWeightInput.addEventListener('input', calculateWaste);
    }
    if (cutQtyInput) {
        cutQtyInput.addEventListener('input', calculateWaste);
    }

    function calculateWaste() {
        if (!cutWasteDisplay || !cutUnitWeightInput || !cutWeightInput || !cutQtyInput) return;
        
        const totalWeight = parseFloat(cutWeightInput.value) || 0;
        const totalQty = parseInt(cutQtyInput.value) || 0;
        const unitWeight = parseFloat(cutUnitWeightInput.value) || 0;
        
        let htmlStr = '';
        if (totalWeight > 0 && totalQty > 0 && unitWeight > 0) {
            const netWeight = totalQty * unitWeight;
            const wasteKg = totalWeight - netWeight;
            const wastePct = (wasteKg / totalWeight) * 100;
            
            if (wasteKg < 0) {
                htmlStr = `<span style="color: #ef4444; font-size: 0.9rem;">Xato: Sarf noldan kichik! (Dona yoki sarf xato)</span>`;
            } else {
                htmlStr = `Jami: ${wasteKg.toFixed(2)} kg (${wastePct.toFixed(1)}%)`;
                
                // Color breakdown
                if (document.getElementById('color-qty-container')) {
                    let colorWasteHtml = '<div style="margin-top: 5px; font-size: 0.8rem; font-weight: normal; color: var(--color-text-muted); display: flex; flex-direction: column; gap: 2px;">';
                    document.getElementById('color-qty-container').querySelectorAll('div[data-color-block]').forEach(div => {
                        const colorName = div.getAttribute('data-color-block');
                        const weightLbl = div.querySelector('.color-weight-lbl');
                        const qtyInput = div.querySelector('.color-qty-val');
                        if (weightLbl && qtyInput) {
                            const cWeight = parseFloat(weightLbl.innerText) || 0;
                            const cQty = parseInt(qtyInput.value) || 0;
                            if (cWeight > 0 && cQty > 0) {
                                const cNet = cQty * unitWeight;
                                const cWaste = cWeight - cNet;
                                const cWastePct = (cWaste / cWeight) * 100;
                                let colorStyle = cWaste < 0 ? 'color: #ef4444;' : 'color: var(--color-text);';
                                colorWasteHtml += `<span style="${colorStyle}">${colorName}: ${cWaste.toFixed(2)} kg (${cWastePct.toFixed(1)}%)</span>`;
                            }
                        }
                    });
                    colorWasteHtml += '</div>';
                    htmlStr += colorWasteHtml;
                }
            }
        } else {
            htmlStr = `0.00 kg (0%)`;
        }
        cutWasteDisplay.innerHTML = htmlStr;
    }

    function bindSwatches(container) {
        if(!container) return;
        const swatches = container.querySelectorAll('.color-swatch');
        const hiddenInput = container.querySelector('.roll-color-input');
        if(!hiddenInput) return;
        
        swatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                swatches.forEach(s => s.classList.remove('selected'));
                swatch.classList.add('selected');
                hiddenInput.value = swatch.dataset.color;
                updateNastilTotal();
            });
        });
    }

    if (btnAddRoll && rollsContainer) {
        btnAddRoll.addEventListener('click', () => {
            const rowCount = rollsContainer.querySelectorAll('.roll-input-row').length + 1;
            const div = document.createElement('div');
            div.className = 'roll-input-row';
            div.style = 'display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-top: 8px;';
            div.innerHTML = `
                <span class="roll-label" style="font-size: 0.8rem; color: var(--color-text-muted); width: 60px;">${rowCount}-Rulon:</span>
                <input type="number" class="roll-weight-input" min="0.1" step="0.1" required placeholder="Og'irlik (kg)" style="flex: 1; min-width: 80px; max-width: 120px;">
                <div class="color-swatch-container">
                    <div class="color-swatch" data-color="Qora" style="background: #111;" title="Qora"></div>
                    <div class="color-swatch" data-color="To'q Ko'k" style="background: #1a237e;" title="To'q Ko'k"></div>
                    <div class="color-swatch" data-color="Antra" style="background: #37474f;" title="Antra"></div>
                    <div class="color-swatch" data-color="Melanj" style="background: #9e9e9e;" title="Melanj"></div>
                    <div class="color-swatch" data-color="Oq" style="background: #f5f5f5;" title="Oq"></div>
                </div>
                <input type="hidden" class="roll-color-input" required>
                <button type="button" class="btn btn-xs btn-danger btn-remove-roll" style="padding: 4px 8px;"><i class="fa-solid fa-trash"></i></button>
            `;
            rollsContainer.appendChild(div);
            
            bindSwatches(div);
            
            div.querySelector('.roll-weight-input').addEventListener('input', updateNastilTotal);
            div.querySelector('.btn-remove-roll').addEventListener('click', (e) => {
                div.remove();
                rollsContainer.querySelectorAll('.roll-input-row').forEach((row, index) => {
                    row.querySelector('.roll-label').innerText = `${index + 1}-Rulon:`;
                });
                updateNastilTotal();
            });
        });
        
        const initialWInput = rollsContainer.querySelector('.roll-weight-input');
        if (initialWInput) initialWInput.addEventListener('input', updateNastilTotal);
        
        // Bind swatches for the initial row
        const initialRow = rollsContainer.querySelector('.roll-input-row');
        if(initialRow) bindSwatches(initialRow);
    }
    // --- End Nastil Rolls Logic ---

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
                    showToast(`Omborda yetarli mato yo'q! Zaxirada: ${mat.miqdori} kg. Kerakli: ${weight} kg.`, "error");
                    return;
                }
                mat.miqdori -= weight;
            }

            const nastilLen = parseFloat(document.getElementById('cut-nastil-len').value) || 0;
            const nastilWidth = parseFloat(document.getElementById('cut-nastil-width').value) || 0;

            // Gather rolls
            const rollRows = document.querySelectorAll('#nastil-rolls-container .roll-input-row');
            const rolls = [];
            rollRows.forEach(row => {
                const w = parseFloat(row.querySelector('.roll-weight-input').value);
                const c = row.querySelector('.roll-color-input') ? row.querySelector('.roll-color-input').value : 'N/A';
                if (w) rolls.push({ weight: w, color: c, qty: 0 });
            });
            
            const colorQtyContainer = document.getElementById('color-qty-container');
            if (colorQtyContainer) {
                colorQtyContainer.querySelectorAll('input.color-qty-val').forEach(input => {
                    const color = input.getAttribute('data-color-qty');
                    const totalColorQty = parseInt(input.value) || 0;
                    
                    // Rulonlarga ularning og'irligiga proporsional ravishda bo'lib berish (kroy va donani to'g'ri hisoblash uchun)
                    const colorRolls = rolls.filter(r => r.color === color);
                    const totalColorWeight = colorRolls.reduce((sum, r) => sum + r.weight, 0);
                    
                    if (totalColorWeight > 0 && totalColorQty > 0) {
                        let remainingQty = totalColorQty;
                        for (let i = 0; i < colorRolls.length; i++) {
                            const r = colorRolls[i];
                            if (i === colorRolls.length - 1) {
                                // Oxirgi rulonga qoldiqni berish (yaxlitlashdagi yo'qotishlarni qoplash uchun)
                                r.qty = remainingQty;
                            } else {
                                const rollQty = Math.round(totalColorQty * (r.weight / totalColorWeight));
                                r.qty = rollQty;
                                remainingQty -= rollQty;
                            }
                        }
                    }
                });
            }

            const unitWeight = parseFloat(document.getElementById('cut-unit-weight').value) || 0;
            let wasteKg = 0;
            let wastePct = 0;
            let colorWasteDetails = [];
            
            if (weight > 0 && qty > 0 && unitWeight > 0) {
                const netWeight = qty * unitWeight;
                wasteKg = weight - netWeight;
                wastePct = (wasteKg / weight) * 100;
                
                if (colorQtyContainer) {
                    colorQtyContainer.querySelectorAll('div[data-color-block]').forEach(div => {
                        const c = div.getAttribute('data-color-block');
                        const cWeightLbl = div.querySelector('.color-weight-lbl');
                        const cQtyInput = div.querySelector('.color-qty-val');
                        if (cWeightLbl && cQtyInput) {
                            const cW = parseFloat(cWeightLbl.innerText) || 0;
                            const cQ = parseInt(cQtyInput.value) || 0;
                            if (cW > 0 && cQ > 0) {
                                const cNet = cQ * unitWeight;
                                const cWaste = cW - cNet;
                                const cWastePct = (cWaste / cW) * 100;
                                colorWasteDetails.push({
                                    color: c,
                                    wasteKg: +(cWaste).toFixed(2),
                                    wastePct: +(cWastePct).toFixed(1)
                                });
                            }
                        }
                    });
                }
            }

            // Create Cutting Log
            const newCut = {
                id: 'cut-' + Date.now() + '-' + Math.floor(Math.random()*1000),
                sana: new Date().toISOString().split('T')[0],
                nomi: name,
                turi: type,
                mato_id: fabricId,
                ogirlik: weight,
                nastil_uzunlik: nastilLen,
                nastil_eni: nastilWidth,
                nastil_rolls: rolls,
                bichilgan_dona: qty,
                unit_weight: unitWeight,
                chiqindi_kg: +(wasteKg).toFixed(2),
                chiqindi_pct: +(wastePct).toFixed(1),
                color_waste: colorWasteDetails,
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
                id: 'buy-' + Date.now() + '-' + Math.floor(Math.random()*1000),
                cut_id: newCut.id,
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
            // Reset rolls dynamically added inputs except the first one
            const extraRolls = rollsContainer.querySelectorAll('.roll-input-row:not(:first-child)');
            extraRolls.forEach(r => r.remove());
            rollsContainer.querySelector('.roll-weight-input').value = '';
            
            const firstRowSwatches = rollsContainer.querySelector('.roll-input-row').querySelectorAll('.color-swatch');
            firstRowSwatches.forEach(s => s.classList.remove('selected'));
            rollsContainer.querySelector('.roll-input-row').querySelector('.roll-color-input').value = '';
            
            document.getElementById('cut-weight').value = '';
            document.getElementById('cut-qty').value = '';
            if(document.getElementById('color-qty-container')) {
                document.getElementById('color-qty-container').innerHTML = '<span style="font-size: 0.75rem; color: var(--color-text-muted);">Avval rulon va rangini tanlang...</span>';
            }
            if(document.getElementById('cut-waste-display')) {
                document.getElementById('cut-waste-display').innerText = '0.00 kg (0%)';
            }
            
            // Re-trigger update to custom selects if any
            ['cut-type', 'cut-fabric-id', 'cut-staff'].forEach(id => {
                const el = document.getElementById(id);
                if(el && el.nextElementSibling && el.nextElementSibling.classList.contains('custom-select-wrapper')) {
                    el.nextElementSibling.querySelector('span').textContent = el.options[el.selectedIndex]?.text || 'Tanlang...';
                }
            });
            
            showToast("Bichuv buyrug'i muvaffaqiyatli saqlandi!", "success");
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

    // Apply Premium Custom UI to Selects
    ['cut-type', 'cut-fabric-id', 'cut-staff'].forEach(id => applyCustomSelect(id));
}

// --- Custom Premium Select UI Logic ---
function applyCustomSelect(selectId) {
    const selectEl = document.getElementById(selectId);
    if (!selectEl) return;

    let wrapper = selectEl.nextElementSibling;
    if (wrapper && wrapper.classList.contains('custom-select-wrapper')) {
        wrapper.remove();
    }

    wrapper = document.createElement('div');
    wrapper.className = 'custom-select-wrapper';
    
    const trigger = document.createElement('div');
    trigger.className = 'custom-select-trigger';
    
    const triggerText = document.createElement('span');
    triggerText.textContent = selectEl.options[selectEl.selectedIndex]?.text || 'Tanlang...';
    trigger.appendChild(triggerText);
    
    const arrow = document.createElement('i');
    arrow.className = 'fa-solid fa-chevron-down';
    arrow.style.transition = 'transform 0.3s';
    trigger.appendChild(arrow);
    
    wrapper.appendChild(trigger);
    
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'custom-options';
    
    Array.from(selectEl.options).forEach((option, index) => {
        const customOpt = document.createElement('div');
        customOpt.className = 'custom-option' + (option.selected ? ' selected' : '');
        customOpt.textContent = option.text;
        customOpt.dataset.value = option.value;
        
        customOpt.addEventListener('click', (e) => {
            e.stopPropagation();
            selectEl.value = option.value;
            selectEl.dispatchEvent(new Event('change'));
            
            triggerText.textContent = option.text;
            optionsContainer.querySelectorAll('.custom-option').forEach(o => o.classList.remove('selected'));
            customOpt.classList.add('selected');
            
            wrapper.classList.remove('open');
            arrow.style.transform = 'rotate(0deg)';
        });
        
        optionsContainer.appendChild(customOpt);
    });
    
    wrapper.appendChild(optionsContainer);
    
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close others
        document.querySelectorAll('.custom-select-wrapper').forEach(w => {
            if (w !== wrapper) {
                w.classList.remove('open');
                const otherArrow = w.querySelector('.fa-chevron-down');
                if(otherArrow) otherArrow.style.transform = 'rotate(0deg)';
            }
        });
        
        const isOpen = wrapper.classList.contains('open');
        if(isOpen) {
            wrapper.classList.remove('open');
            arrow.style.transform = 'rotate(0deg)';
        } else {
            wrapper.classList.add('open');
            arrow.style.transform = 'rotate(180deg)';
        }
    });
    
    // Hide original but keep it focusable for forms (optional)
    selectEl.style.cssText = 'position: absolute; opacity: 0; pointer-events: none; height: 0; width: 0;';
    selectEl.parentNode.insertBefore(wrapper, selectEl.nextSibling);
}

// Global click to close custom selects
document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select-wrapper').forEach(w => {
        w.classList.remove('open');
        const arrow = w.querySelector('.fa-chevron-down');
        if(arrow) arrow.style.transform = 'rotate(0deg)';
    });
});

// Start the application
window.addEventListener('DOMContentLoaded', init);

// --- PWA (Progressive Web App) Setup ---
let deferredPrompt;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker muvaffaqiyatli ro\'yxatdan o\'tdi. Qamrov (scope): ', registration.scope);
            }, (err) => {
                console.log('ServiceWorker ro\'yxatdan o\'tishda xatolik: ', err);
            });
    });

    // Yangi service worker faollashganda sahifani avtomatik yangilash
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
            refreshing = true;
            window.location.reload();
        }
    });
}

window.addEventListener('beforeinstallprompt', (e) => {
    // Brauzerning standart so'rovini to'xtatish
    e.preventDefault();
    // Hodisani saqlab qolish
    deferredPrompt = e;
});

// O'rnatish tugmasi bosilganda (tugma index.html da har doim ochiq bo'ladi)
const installBtn = document.getElementById('btn-install-app');
if (installBtn) {
    installBtn.addEventListener('click', () => {
        if (deferredPrompt) {
            // O'rnatish oynasini chiqarish
            deferredPrompt.prompt();
            
            // Foydalanuvchi qarorini kutish
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Foydalanuvchi PWA o\'rnatishga ruxsat berdi');
                    installBtn.style.display = 'none';
                } else {
                    console.log('Foydalanuvchi PWA o\'rnatishni bekor qildi');
                }
                deferredPrompt = null;
            });
        } else {
            // Agar avtomatik o'rnatish imkoni bo'lmasa, qo'llanmani ko'rsatish
            if (typeof window.openModal === 'function') {
                window.openModal('modal-install-guide');
            }
        }
    });
}

// Agar ilova allaqachon o'rnatilgan bo'lsa (Standalone rejimda ishlayotgan bo'lsa)
window.addEventListener('appinstalled', (evt) => {
    console.log('Eco Sports muvaffaqiyatli o\'rnatildi!');
    const installBtn = document.getElementById('btn-install-app');
    if (installBtn) {
        installBtn.style.display = 'none';
    }
});
