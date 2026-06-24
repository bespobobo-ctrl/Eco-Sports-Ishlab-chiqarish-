function renderNavbar(activeTab) {
    const container = document.getElementById('navbar-container');
    if (!container) return;

    // We calculate root path depending on where the user is
    // If they are in /pages/settings/index.html, root is ../../
    const depth = window.location.pathname.split('/').length - 2;
    const rootPath = depth > 0 ? '../'.repeat(depth) : './';

    container.innerHTML = `
        <header class="navbar">
            <div class="navbar-left">
                <a href="${rootPath}index.html?tab=sales" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 10px;">
                    <div class="brand-logo">
                        <i class="fa-solid fa-leaf"></i>
                    </div>
                    <div class="brand-text">
                        <h2>Eco Sports</h2>
                        <span>CRM & Ishlab Chiqarish</span>
                    </div>
                </a>
            </div>
            
            <nav class="navbar-menu" id="main-nav">
                <a href="${rootPath}index.html?tab=sales" class="nav-link ${activeTab === 'sales' ? 'active' : ''}" data-tab="sales">
                    <i class="fa-solid fa-square-poll-vertical"></i> Sotuv
                </a>
                <a href="${rootPath}index.html?tab=warehouse" class="nav-link ${activeTab === 'warehouse' ? 'active' : ''}" data-tab="warehouse">
                    <i class="fa-solid fa-warehouse"></i> Ombor-Ta'minot
                </a>
                <a href="${rootPath}index.html?tab=cutting" class="nav-link ${activeTab === 'cutting' ? 'active' : ''}" data-tab="cutting">
                    <i class="fa-solid fa-scissors"></i> Bichuv
                </a>
                <a href="${rootPath}index.html?tab=production" class="nav-link ${activeTab === 'production' ? 'active' : ''}" data-tab="production">
                    <i class="fa-solid fa-shirt"></i> Ishlab Chiqarish
                </a>
                <a href="${rootPath}index.html?tab=paint" class="nav-link ${activeTab === 'paint' ? 'active' : ''}" data-tab="paint">
                    <i class="fa-solid fa-palette"></i> Pres-Kraska
                </a>
                <a href="${rootPath}index.html?tab=pack" class="nav-link ${activeTab === 'pack' ? 'active' : ''}" data-tab="pack">
                    <i class="fa-solid fa-box-open"></i> Dazmon-Qadoqlash
                </a>
                <a href="${rootPath}index.html?tab=workers" class="nav-link ${activeTab === 'workers' ? 'active' : ''}" data-tab="workers">
                    <i class="fa-solid fa-users"></i> Xodimlar
                </a>
                <a href="${rootPath}index.html?tab=services" class="nav-link ${activeTab === 'services' ? 'active' : ''}" data-tab="services">
                    <i class="fa-solid fa-handshake"></i> Uslugi
                </a>
                <a href="${rootPath}pages/settings/index.html" class="nav-link ${activeTab === 'settings' ? 'active' : ''}" data-tab="settings">
                    <i class="fa-solid fa-gear"></i> Sozlamalar
                </a>
            </nav>

            <div class="navbar-right">
                <div class="nav-search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Qidiruv..." id="global-search">
                </div>
                <div class="sys-time" id="clock">11:00:21</div>
                <div class="status-dot-wrapper" id="sync-status-container" title="Supabase Sinxronizatsiya holati. SQL skriptini ko'rish uchun bosing." style="cursor: pointer; display: flex; align-items: center; gap: 6px; padding: 4px 8px; background: rgba(255,255,255,0.03); border-radius: 6px;" onclick="openSupabaseSetupModal()">
                    <span class="status-dot" id="sync-status-dot"></span>
                    <span id="sync-status-text" style="font-size: 0.75rem; color: var(--color-text-muted);">Bulut: Kutilmoqda</span>
                </div>
                <button class="btn btn-icon-reset" id="btn-system-reset" title="Tizimni tozalash (LocalStorage)">
                    <i class="fa-solid fa-arrows-rotate"></i>
                </button>
                <div class="user-avatar-wrapper">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" class="user-avatar">
                </div>
            </div>
        </header>
    `;
}
