// ====================================================================
//  3D VIRTUAL SEX (Workshop) — Three.js bilan tikuv sexining 3D modeli
//  Har bir bosqich = bitta tikuv mashina stansiyasi.
//  Mashinani bossangiz — qaysi ishlar bajarilayotgani ko'rinadi.
// ====================================================================

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let inited = false;
let scene, camera, renderer, controls, raycaster, pointer;
let machinesGroup, stationMap = [];   // {group, stageId, light, head, worker, active}
let hovered = null;
let canvas, wrap;
let infoBoard, boardCanvas, boardCtx, boardTex;  // katta jonli doska
let currentBoardPage = 0;                          // 0..3
let vMoveStation = null;                            // "V"/sudrash bilan ko'chirilayotgan STANSIYA (dastgoh+tikuvchi)
let grabOffset = { x: 0, z: 0 };                    // kursor bilan stansiya orasidagi farq
let lastPointerEvt = null;                          // oxirgi sichqoncha holati (V uchun)
let beltGroup, beltNodesGroup;                      // konveyer lentasi va uning burilish nuqtalari
let beltPaths = [];                                 // [[{x,z}...], ...] — bir nechta lenta yo'li
let activePath = 0;                                 // hozir tahrirlanayotgan yo'l
let hoveredNode = null;                             // kursor ostidagi nuqta {pi,pj}
let vMoveNode = null;                               // "V" bilan ko'chirilayotgan nuqta {pi,pj}
let beltAddMode = false;                            // "nuqta qo'shish" rejimi
let connectMode = false;                            // "ulash" rejimi
let connectFirst = null;                            // ulash uchun tanlangan 1-nuqta {pi,pj}
const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const planePoint = new THREE.Vector3();
let workerLayout = {};                              // { stageId: {x, z} }
const DEFAULT_TARIF = 4000;

// app.js dan ma'lumot olish
function getData() {
    if (typeof window.getWorkshopData === 'function') return window.getWorkshopData();
    return { stages: [], kanban: [], workers: [], layout: {} };
}

// --- Matnli yorliq (sprite) ---
function makeLabel(title, sub, hex) {
    const cw = 320, ch = 150;
    const cv = document.createElement('canvas');
    cv.width = cw; cv.height = ch;
    const ctx = cv.getContext('2d');

    // fon
    ctx.fillStyle = 'rgba(18,19,30,0.92)';
    roundRect(ctx, 6, 6, cw - 12, ch - 12, 22); ctx.fill();
    ctx.lineWidth = 5; ctx.strokeStyle = hex; ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#f1f3f9';
    ctx.font = 'bold 40px Outfit, Arial';
    ctx.fillText(title, cw / 2, 64, cw - 30);

    ctx.fillStyle = hex;
    ctx.font = '600 30px Outfit, Arial';
    ctx.fillText(sub, cw / 2, 110, cw - 30);

    const tex = new THREE.CanvasTexture(cv);
    tex.anisotropy = 4;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
    sprite.scale.set(3.0, 1.4, 1);
    return sprite;
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

// --- Realistik sanoat tikuv dastgohi (stol + mashina + kursi) ---
function makeSewingMachine(hex) {
    const g = new THREE.Group();
    const accent = new THREE.Color(hex);

    const matSteel = new THREE.MeshStandardMaterial({ color: 0xb6bdc9, metalness: 0.95, roughness: 0.3 });
    const matDark  = new THREE.MeshStandardMaterial({ color: 0x1c1f29, metalness: 0.7, roughness: 0.4 });
    const matCream = new THREE.MeshStandardMaterial({ color: 0xeceff5, metalness: 0.35, roughness: 0.45 }); // klassik mashina korpusi
    const matWood  = new THREE.MeshStandardMaterial({ color: 0x7a5a3a, metalness: 0.1, roughness: 0.85 });
    const matAccent = new THREE.MeshStandardMaterial({ color: accent, metalness: 0.45, roughness: 0.4, emissive: accent, emissiveIntensity: 0.18 });
    const matChrome = new THREE.MeshStandardMaterial({ color: 0xdfe4ee, metalness: 1.0, roughness: 0.18 });

    // === Stol ===
    const top = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.12, 1.35), matWood);
    top.position.y = 1.0; top.castShadow = true; top.receiveShadow = true; g.add(top);
    const edge = new THREE.Mesh(new THREE.BoxGeometry(2.64, 0.04, 1.39), matAccent);
    edge.position.y = 0.95; g.add(edge);
    // metall oyoqlar
    const legGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.0, 12);
    [[-1.18, -0.58], [1.18, -0.58], [-1.18, 0.58], [1.18, 0.58]].forEach(([x, z]) => {
        const l = new THREE.Mesh(legGeo, matSteel); l.position.set(x, 0.5, z); l.castShadow = true; g.add(l);
    });
    // bog'lovchi planka + oyoq pedali
    const bar = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.04, 0.04), matSteel); bar.position.set(0, 0.22, 0.5); g.add(bar);
    const pedal = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.04, 0.32), matDark); pedal.position.set(-0.25, 0.08, 0.7); pedal.rotation.x = 0.1; g.add(pedal);

    // === Mashina korpusi (flatbed) ===
    const bed = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.2, 0.52), matCream);
    bed.position.set(-0.1, 1.17, -0.1); bed.castShadow = true; g.add(bed);
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.8, 0.48), matCream);
    pillar.position.set(0.56, 1.55, -0.1); pillar.castShadow = true; g.add(pillar);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.3, 0.4), matCream);
    arm.position.set(-0.05, 1.9, -0.1); arm.castShadow = true; g.add(arm);
    const headBlock = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.46, 0.44), matCream);
    headBlock.position.set(-0.66, 1.78, -0.1); headBlock.castShadow = true; g.add(headBlock);
    // rangli aksent chiziq + brend plitasi
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(1.37, 0.06, 0.42), matAccent);
    stripe.position.set(-0.05, 1.79, -0.1); g.add(stripe);
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.16, 0.02), matAccent);
    plate.position.set(0.56, 1.55, 0.15); g.add(plate);

    // === Igna mexanizmi (harakatlanadi) ===
    const head = new THREE.Group();   // animatsiyada tebranadi
    const needleBar = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.28, 10), matChrome);
    needleBar.position.set(0, -0.18, 0); head.add(needleBar);
    const presser = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.1, 0.07), matSteel);
    presser.position.set(0, -0.3, 0.02); head.add(presser);
    head.position.set(-0.66, 1.66, 0.12); g.add(head);

    // === Hand wheel (o'ng) ===
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.05, 28), matDark);
    wheel.rotation.z = Math.PI / 2; wheel.position.set(0.82, 1.58, -0.1); g.add(wheel);
    const wheelHub = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.09, 14), matAccent);
    wheelHub.rotation.z = Math.PI / 2; wheelHub.position.set(0.86, 1.58, -0.1); g.add(wheelHub);

    // === Ip stoyka + konus ===
    const standRod = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.55, 8), matChrome);
    standRod.position.set(0.28, 2.22, -0.28); g.add(standRod);
    const spoolPin = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.22, 8), matChrome);
    spoolPin.position.set(0.28, 2.05, -0.18); g.add(spoolPin);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.085, 0.26, 18), matAccent);
    cone.position.set(0.28, 2.02, -0.18); g.add(cone);

    // === Mato bo'lagi (bed ustida) ===
    const fabric = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.02, 0.38),
        new THREE.MeshStandardMaterial({ color: 0xeaedf3, roughness: 0.95 }));
    fabric.position.set(-0.45, 1.28, 0.05); fabric.rotation.y = 0.22; g.add(fabric);

    // === Holat chirog'i ===
    const light = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16),
        new THREE.MeshStandardMaterial({ color: accent, emissive: accent, emissiveIntensity: 1.2 }));
    light.position.set(0.56, 2.0, -0.1); g.add(light);

    // === Kursi (orqa suyanchiqli) ===
    const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.08, 20), matDark);
    seat.position.set(-0.2, 0.6, 0.95); seat.castShadow = true; g.add(seat);
    const seatBack = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.36, 0.06), matDark);
    seatBack.position.set(-0.2, 0.82, 1.16); g.add(seatBack);
    const seatPost = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.5, 8), matSteel);
    seatPost.position.set(-0.2, 0.34, 0.95); g.add(seatPost);
    const seatBase = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.03, 16), matSteel);
    seatBase.position.set(-0.2, 0.08, 0.95); g.add(seatBase);

    return { group: g, head, light };
}

// --- Realistik virtual tikuvchi (o'tirgan operator) ---
function makeWorker(accentHex) {
    const w = new THREE.Group();
    const skin = new THREE.MeshStandardMaterial({ color: 0xe8b98e, roughness: 0.72 });
    const shirt = new THREE.MeshStandardMaterial({ color: 0x39414f, roughness: 0.6 });
    const apronMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(accentHex), roughness: 0.55 });
    const pants = new THREE.MeshStandardMaterial({ color: 0x24262f, roughness: 0.8 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x140f08, roughness: 0.9 });
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0x101117, roughness: 0.7 });

    // Tos + sonlar (o'tirgan)
    const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.2, 0.3), pants);
    pelvis.position.set(0, 0.72, 0.92); pelvis.castShadow = true; w.add(pelvis);
    const thighGeo = new THREE.CapsuleGeometry(0.1, 0.32, 6, 10);
    [-0.12, 0.12].forEach(x => {
        const th = new THREE.Mesh(thighGeo, pants); th.position.set(x, 0.74, 0.62);
        th.rotation.x = Math.PI / 2; th.castShadow = true; w.add(th);
    });
    // boldirlar + oyoq kiyim
    const shinGeo = new THREE.CapsuleGeometry(0.085, 0.34, 6, 10);
    [-0.12, 0.12].forEach(x => {
        const sh = new THREE.Mesh(shinGeo, pants); sh.position.set(x, 0.44, 0.42); sh.castShadow = true; w.add(sh);
        const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.08, 0.26), shoeMat); shoe.position.set(x, 0.22, 0.52); w.add(shoe);
    });

    // Tana (oldinga egilgan) + fartuk
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.19, 0.4, 6, 12), shirt);
    torso.position.set(0, 1.1, 0.82); torso.rotation.x = -0.3; torso.castShadow = true; w.add(torso);
    const apron = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.42, 0.05), apronMat);
    apron.position.set(0, 1.05, 0.64); apron.rotation.x = -0.3; w.add(apron);

    // Bo'yin + bosh + soch
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.07, 0.1, 10), skin);
    neck.position.set(0, 1.36, 0.72); neck.rotation.x = -0.2; w.add(neck);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.165, 20, 20), skin);
    head.position.set(0, 1.5, 0.66); head.castShadow = true; w.add(head);
    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.175, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.62), hairMat);
    hair.position.copy(head.position); hair.rotation.x = -0.35; w.add(hair);
    const bun = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), hairMat);
    bun.position.set(0, 1.55, 0.78); w.add(bun);

    // Qo'llar (yelka -> tirsak -> kaft), mashina tomon cho'zilgan
    const hands = new THREE.Group();
    const upperGeo = new THREE.CapsuleGeometry(0.058, 0.24, 6, 10);
    const foreGeo = new THREE.CapsuleGeometry(0.05, 0.24, 6, 10);
    [-0.2, 0.2].forEach(x => {
        const up = new THREE.Mesh(upperGeo, shirt); up.position.set(x, 1.18, 0.66); up.rotation.x = -0.65; up.castShadow = true; hands.add(up);
        const fore = new THREE.Mesh(foreGeo, skin); fore.position.set(x * 0.85, 0.98, 0.4); fore.rotation.x = -1.15; hands.add(fore);
        const hand = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 10), skin); hand.position.set(x * 0.7, 0.92, 0.2); hands.add(hand);
    });
    w.add(hands);

    // Kursi oldida o'tiradi (dastgoh kursisi z~0.95)
    w.position.set(-0.2, 0, 0);
    return { group: w, hands, head };
}

// --- Tayyor mahsulot OMBORI (javon) + mahsulot qutilari ---
const SHELF_Y = [0.55, 1.3, 2.05];
function makeWarehouse(hex, works) {
    const g = new THREE.Group();
    const accent = new THREE.Color(hex);
    const matFrame = new THREE.MeshStandardMaterial({ color: 0x3a3f52, metalness: 0.7, roughness: 0.45 });
    const matShelf = new THREE.MeshStandardMaterial({ color: 0x6b4f33, metalness: 0.1, roughness: 0.85 });
    const matAccent = new THREE.MeshStandardMaterial({ color: accent, metalness: 0.4, roughness: 0.4, emissive: accent, emissiveIntensity: 0.2 });

    const Wd = 2.4, Dp = 1.0;
    // Tik ustunlar (4 ta)
    const postGeo = new THREE.BoxGeometry(0.1, 2.5, 0.1);
    [[-Wd / 2, -Dp / 2], [Wd / 2, -Dp / 2], [-Wd / 2, Dp / 2], [Wd / 2, Dp / 2]].forEach(([x, z]) => {
        const p = new THREE.Mesh(postGeo, matFrame); p.position.set(x, 1.25, z); p.castShadow = true; g.add(p);
    });
    // Javon taxtalari
    SHELF_Y.forEach(y => {
        const sh = new THREE.Mesh(new THREE.BoxGeometry(Wd + 0.1, 0.07, Dp), matShelf);
        sh.position.set(0, y, 0); sh.castShadow = true; sh.receiveShadow = true; g.add(sh);
        const lip = new THREE.Mesh(new THREE.BoxGeometry(Wd + 0.1, 0.05, 0.05), matAccent);
        lip.position.set(0, y + 0.05, Dp / 2); g.add(lip);
    });
    // Tepa lavha (belgi)
    const sign = new THREE.Mesh(new THREE.BoxGeometry(Wd + 0.2, 0.28, 0.08), matAccent);
    sign.position.set(0, 2.65, 0); g.add(sign);

    // Holat chirog'i
    const light = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16),
        new THREE.MeshStandardMaterial({ color: accent, emissive: accent, emissiveIntensity: 1.2 }));
    light.position.set(Wd / 2 - 0.1, 2.65, 0.1); g.add(light);

    // Mahsulot qutilari (har bir tayyor partiya = bitta quti)
    (works || []).forEach((wk, idx) => {
        const box = makeProductBox(hex, wk, idx);
        g.add(box);
    });

    return { group: g, light };
}

function makeProductBox(hex, item, index) {
    const grp = new THREE.Group();
    const kraft = new THREE.MeshStandardMaterial({ color: 0xc69a6b, roughness: 0.85, metalness: 0.05 });
    const accent = new THREE.MeshStandardMaterial({ color: new THREE.Color(hex), roughness: 0.6 });
    const tape = new THREE.MeshStandardMaterial({ color: 0xe8d9b8, roughness: 0.7 });

    const bw = 0.46, bh = 0.34, bd = 0.42;
    const body = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), kraft);
    body.castShadow = true; grp.add(body);
    // skotch chizig'i
    const t = new THREE.Mesh(new THREE.BoxGeometry(0.08, bh + 0.01, bd + 0.01), tape);
    grp.add(t);
    // rangli yorliq (old yuza)
    const lbl = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 0.01), accent);
    lbl.position.set(-0.08, 0.02, bd / 2 + 0.006); grp.add(lbl);

    // Javon slotiga joylash
    const cols = 4;
    const shelf = Math.min(SHELF_Y.length - 1, Math.floor(index / cols));
    const col = index % cols;
    const depthRow = Math.floor(index / (cols * SHELF_Y.length));
    grp.position.set(-0.72 + col * 0.48, SHELF_Y[shelf] + 0.04 + bh / 2, 0.22 - depthRow * 0.34);

    // Mahsulot ma'lumoti (hover/click uchun)
    grp.traverse(o => {
        o.userData.productId = item.id;
        o.userData.productName = item.model;
        o.userData.productSub = (item.turi || '') + ' · ' + (item.miqdori || 0) + ' dona';
    });
    return grp;
}

function buildScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0d14);
    scene.fog = new THREE.Fog(0x0c0d14, 70, 200);

    camera = new THREE.PerspectiveCamera(48, 1, 0.1, 200);
    camera.position.set(0, 9, 18);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 6;
    controls.maxDistance = 45;
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.target.set(0, 1.6, 0);

    // Yorug'lik
    scene.add(new THREE.AmbientLight(0x556074, 0.75));
    const hemi = new THREE.HemisphereLight(0x8899ff, 0x202028, 0.5);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 1.1);
    dir.position.set(8, 16, 10);
    dir.castShadow = true;
    dir.shadow.mapSize.set(2048, 2048);
    dir.shadow.camera.left = -30; dir.shadow.camera.right = 30;
    dir.shadow.camera.top = 30; dir.shadow.camera.bottom = -30;
    dir.shadow.camera.far = 60;
    scene.add(dir);

    // Pol
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(120, 80),
        new THREE.MeshStandardMaterial({ color: 0x14151f, metalness: 0.2, roughness: 0.9 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const grid = new THREE.GridHelper(120, 60, 0x2a2d44, 0x1b1d2c);
    grid.position.y = 0.01;
    scene.add(grid);

    // Orqa devor (xona hissi)
    const wall = new THREE.Mesh(
        new THREE.PlaneGeometry(120, 30),
        new THREE.MeshStandardMaterial({ color: 0x101220, metalness: 0.1, roughness: 1 })
    );
    wall.position.set(0, 15, -18);
    wall.receiveShadow = true;
    scene.add(wall);

    beltGroup = new THREE.Group();
    beltNodesGroup = new THREE.Group();
    scene.add(beltGroup);
    scene.add(beltNodesGroup);

    machinesGroup = new THREE.Group();
    scene.add(machinesGroup);

    makeInfoBoard();

    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    bindEvents();

    // Konteyner o'lchami o'zgarsa avtomatik moslashtirish (ishonchli render)
    if (window.ResizeObserver && wrap) {
        const ro = new ResizeObserver(() => resize());
        ro.observe(wrap);
    }

    animate();
}

function rebuildMachines() {
    if (!machinesGroup) return;
    // tozalash
    for (let i = machinesGroup.children.length - 1; i >= 0; i--) {
        machinesGroup.remove(machinesGroup.children[i]);
    }
    stationMap = [];

    const { stages, kanban, layout } = getData();
    workerLayout = layout || {};
    if (!stages.length) return;

    const spacing = 4.3;
    const startX = -((stages.length - 1) * spacing) / 2;

    // Konveyer lentalari (bir nechta yo'l, ulanadigan)
    loadBeltPaths(stages);
    buildBelt();

    const UNIT_GAP = 3.2;  // bitta bosqichdagi mashinalar orasidagi masofa (chuqurlik bo'yicha)

    stages.forEach((stage, i) => {
        const works = (kanban || []).filter(k => k.stage === stage.id);
        const totalDona = works.reduce((s, w) => s + (Number(w.miqdori) || 0), 0);
        const isLast = (i === stages.length - 1);   // Tayyor mahsulot = OMBOR
        const saved = workerLayout[stage.id];

        // === Bosqich klasteri (joy + burilish butun klasterga taalluqli) ===
        const cluster = new THREE.Group();
        if (saved) cluster.position.set(saved.x, 0, saved.z);
        else cluster.position.set(startX + i * spacing, 0, 0);
        if (saved && saved.ry) cluster.rotation.y = saved.ry;
        cluster.userData.stageId = stage.id;

        const units = [];

        if (isLast) {
            // OMBOR — bitta javon, har partiya = quti
            const m = makeWarehouse(stage.color, works);
            cluster.add(m.group);
            if (!works.length) { m.light.material.emissiveIntensity = 0.15; m.light.material.color.set(0x555a6e); }
            units.push({ head: null, light: m.light, worker: null, active: works.length > 0, headBase: 0, workerHeadBase: 0 });
        } else {
            // TIKUV — har bir model uchun ALOHIDA mashina + tikuvchi
            const count = Math.max(1, works.length);
            for (let j = 0; j < count; j++) {
                const wk = works[j];          // undefined bo'lsa — bo'sh mashina
                const active = !!wk;
                const m = makeSewingMachine(stage.color);
                m.group.position.z = j * UNIT_GAP;

                let worker = null;
                if (active) {
                    worker = makeWorker(stage.color);
                    m.group.add(worker.group);
                    const name = (wk.masul && wk.masul !== '—') ? wk.masul : 'Tikuvchi';
                    const tag = makeLabel(name, wk.turi || '', stage.color);
                    tag.scale.set(2.1, 1.0, 1);
                    tag.position.set(-0.2, 2.7, 0.9);
                    m.group.add(tag);
                    // Bosish/hover uchun ish ma'lumoti
                    m.group.userData.productId = wk.id;
                    m.group.userData.productName = wk.model;
                    m.group.userData.productSub = (wk.turi ? wk.turi + ' · ' : '') + name;
                } else {
                    m.light.material.emissiveIntensity = 0.15;
                    m.light.material.color.set(0x555a6e);
                }
                cluster.add(m.group);
                units.push({
                    head: m.head, light: m.light, worker, active,
                    headBase: m.head.position.y, workerHeadBase: worker ? worker.head.position.y : 0
                });
            }
        }

        // Bolalarga stageId (mavjud productId saqlanadi)
        cluster.traverse(o => { if (o.userData.stageId === undefined) o.userData.stageId = stage.id; });

        // Bosqich nomi yorlig'i (klaster ustida, markazda)
        const midZ = isLast ? -0.1 : (Math.max(1, works.length) - 1) * UNIT_GAP / 2;
        const sub = (isLast ? works.length + ' partiya · ' : works.length + ' mashina · ') + totalDona + ' dona';
        const label = makeLabel(stage.nomi, sub, stage.color);
        label.position.set(0, isLast ? 3.15 : 3.7, midZ);
        cluster.add(label);

        machinesGroup.add(cluster);
        stationMap.push({ group: cluster, stageId: stage.id, light: units[0] ? units[0].light : null, units, active: works.length > 0 });
    });

    updateBoard();
}

// === KONVEYER LENTASI (temir yo'l rejimi) ===
function defaultBeltPath(stages) {
    const n = (stages && stages.length) || 1;
    const spacing = 4.3;
    const startX = -((n - 1) * spacing) / 2;
    return [
        { x: startX - 1.2, z: -1.6 },
        { x: startX + (n - 1) * spacing + 1.2, z: -1.6 }
    ];
}

function loadBeltPaths(stages) {
    const data = getData();
    if (Array.isArray(data.beltPaths) && data.beltPaths.length) {
        beltPaths = data.beltPaths.map(p => (p || []).map(q => ({ x: +q.x, z: +q.z })));
    } else if (Array.isArray(data.beltPath) && data.beltPath.length >= 2) {  // eski format
        beltPaths = [data.beltPath.map(q => ({ x: +q.x, z: +q.z }))];
    } else {
        beltPaths = [defaultBeltPath(stages)];
    }
    if (activePath >= beltPaths.length) activePath = beltPaths.length - 1;
    if (activePath < 0) activePath = 0;
}

function clearGroup(grp) {
    if (!grp) return;
    for (let i = grp.children.length - 1; i >= 0; i--) grp.remove(grp.children[i]);
}

function buildBelt() {
    if (!beltGroup) return;
    clearGroup(beltGroup);
    clearGroup(beltNodesGroup);
    if (!beltPaths || !beltPaths.length) return;

    const W = 0.9, Y = 0.42;
    const beltMat = new THREE.MeshStandardMaterial({ color: 0x2a2e3e, metalness: 0.5, roughness: 0.6 });
    const railMat = new THREE.MeshStandardMaterial({ color: 0x9aa3b2, metalness: 0.9, roughness: 0.3 });
    const stripeMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0x4a3500, emissiveIntensity: 0.4, roughness: 0.6 });

    beltPaths.forEach((path, pi) => {
        const isActive = (pi === activePath);
        const nodeMat = new THREE.MeshStandardMaterial({ color: isActive ? 0x4a5168 : 0x33384a, metalness: 0.7, roughness: 0.45 });
        const knobMat = new THREE.MeshStandardMaterial({ color: isActive ? 0xfb923c : 0x7a8194, emissive: isActive ? 0xfb923c : 0x000000, emissiveIntensity: isActive ? 0.5 : 0, roughness: 0.4 });

        // Segmentlar
        for (let i = 0; i < path.length - 1; i++) {
            const a = path[i], b = path[i + 1];
            const dx = b.x - a.x, dz = b.z - a.z;
            const len = Math.hypot(dx, dz);
            if (len < 0.01) continue;
            const ang = Math.atan2(-dz, dx);
            const mx = (a.x + b.x) / 2, mz = (a.z + b.z) / 2;

            const seg = new THREE.Mesh(new THREE.BoxGeometry(len, 0.12, W), beltMat);
            seg.position.set(mx, Y, mz); seg.rotation.y = ang; seg.receiveShadow = true; beltGroup.add(seg);
            [-W / 2 + 0.08, W / 2 - 0.08].forEach(off => {
                const rail = new THREE.Mesh(new THREE.BoxGeometry(len, 0.05, 0.06), railMat);
                rail.position.set(mx - Math.sin(ang) * off, Y + 0.08, mz - Math.cos(ang) * off);
                rail.rotation.y = ang; beltGroup.add(rail);
            });
            const stripe = new THREE.Mesh(new THREE.BoxGeometry(len * 0.85, 0.02, 0.1), stripeMat);
            stripe.position.set(mx, Y + 0.07, mz); stripe.rotation.y = ang; beltGroup.add(stripe);
            const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.3, 4), stripeMat);
            arrow.rotation.z = -Math.PI / 2;
            const ag = new THREE.Group(); ag.add(arrow);
            ag.position.set(mx, Y + 0.1, mz); ag.rotation.y = ang; beltGroup.add(ag);
        }
        // Burchak to'ldirgichlari
        for (let i = 1; i < path.length - 1; i++) {
            const c = new THREE.Mesh(new THREE.BoxGeometry(W, 0.12, W), beltMat);
            c.position.set(path[i].x, Y, path[i].z); c.receiveShadow = true; beltGroup.add(c);
        }
        // Burilish nuqtalari (ko'chiriladigan/o'chiriladigan belgilar)
        path.forEach((p, j) => {
            const node = new THREE.Group();
            const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.55, 10), nodeMat);
            post.position.y = Y + 0.28; node.add(post);
            const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.05, 16), nodeMat);
            ring.position.y = Y + 0.02; node.add(ring);
            const knob = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), knobMat);
            knob.position.y = Y + 0.62; node.add(knob);
            node.position.set(p.x, 0, p.z);
            node.traverse(o => { o.userData.bp = pi; o.userData.bpt = j; });
            beltNodesGroup.add(node);
        });
    });
}

// Kamerani butun konveyer ko'rinadigan qilib joylash (barcha mashinalar sig'sin)
function fitCamera() {
    if (!machinesGroup || machinesGroup.children.length === 0) return;
    const box = new THREE.Box3().setFromObject(machinesGroup);
    if (infoBoard) box.expandByObject(infoBoard);  // doska ham kadrga sig'sin
    if (beltGroup && beltGroup.children.length) box.expandByObject(beltGroup);  // lenta ham
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const fov = THREE.MathUtils.degToRad(camera.fov);
    const aspect = camera.aspect || 1;
    // gorizontal va vertikal bo'yicha kerakli masofani hisoblaymiz
    const distV = (size.y / 2) / Math.tan(fov / 2);
    const distH = (size.x / 2) / Math.tan(fov / 2) / aspect;
    const dist = Math.max(distV, distH) * 1.18 + 4;
    camera.position.set(center.x, center.y + size.y * 0.45 + 2.5, center.z + dist);
    controls.target.set(center.x, Math.max(1.2, center.y - 0.5), center.z);
    controls.minDistance = 6;
    controls.maxDistance = dist * 2.6;
    controls.update();
}

// --- Katta jonli doska (ishchilar nima tikayotgani) ---
function makeInfoBoard() {
    infoBoard = new THREE.Group();

    boardCanvas = document.createElement('canvas');
    boardCanvas.width = 1500; boardCanvas.height = 760;
    boardCtx = boardCanvas.getContext('2d');
    boardTex = new THREE.CanvasTexture(boardCanvas);
    boardTex.anisotropy = 8;

    const W = 19, H = 9.6;
    const panel = new THREE.Mesh(
        new THREE.PlaneGeometry(W, H),
        new THREE.MeshBasicMaterial({ map: boardTex, toneMapped: false })
    );
    const frame = new THREE.Mesh(
        new THREE.BoxGeometry(W + 0.6, H + 0.6, 0.25),
        new THREE.MeshStandardMaterial({ color: 0x0a0b12, metalness: 0.5, roughness: 0.5 })
    );
    frame.position.z = -0.16;
    panel.position.z = 0.001;
    infoBoard.add(frame, panel);

    // Ushlagich oyoqlar
    const postMat = new THREE.MeshStandardMaterial({ color: 0x1b1d2c, metalness: 0.6, roughness: 0.5 });
    [-W / 2.6, W / 2.6].forEach(x => {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 6.5, 12), postMat);
        post.position.set(x, -H / 2 - 3.2, 0);
        post.castShadow = true;
        infoBoard.add(post);
    });

    infoBoard.position.set(0, 8.4, -9.5);
    scene.add(infoBoard);
}

// === MONITOR (DOSKA) — 4 sahifa ===
function updateBoard() { drawBoard(); }

function money(n) { return (Math.round(n) || 0).toLocaleString('uz-UZ') + " so'm"; }
function tarifFor(workers, name, turi) {
    const w = (workers || []).find(x => x.ism === name);
    if (!w || !w.tariflar) return DEFAULT_TARIF;
    return (w.tariflar[turi] != null) ? w.tariflar[turi] : (w.tariflar['Futbolka'] || DEFAULT_TARIF);
}
function trunc(s, n) {
    s = String(s == null ? '' : s);
    return s.length > n ? s.slice(0, n - 1) + '…' : s;
}
function isToday(iso) { if (!iso) return false; const d = new Date(iso); return d.toDateString() === new Date().toDateString(); }
function inThisMonth(iso) { if (!iso) return false; const d = new Date(iso), n = new Date(); return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth(); }

function drawBoard() {
    if (!boardCtx) return;
    const ctx = boardCtx, W = boardCanvas.width, H = boardCanvas.height;
    const data = getData();

    // fon
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#12131e'); grad.addColorStop(1, '#0c0d14');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#25283b'; ctx.lineWidth = 6; ctx.strokeRect(8, 8, W - 16, H - 16);

    const pages = [
        { title: 'UMUMIY HOLAT — BUGUN', color: '#34d399', fn: drawPageOverview },
        { title: 'CHEVARLAR VA MODELLAR', color: '#818cf8', fn: drawPageModels },
        { title: "CHEVAR BO'YICHA ISH SUMMASI", color: '#fb923c', fn: drawPageMoney },
        { title: 'OYLIK HISOBOT VA MAOSH', color: '#22d3ee', fn: drawPageMonthly }
    ];
    const p = pages[currentBoardPage] || pages[0];
    drawHeader(ctx, W, p.title, p.color);
    p.fn(ctx, W, H, data);
    drawFooter(ctx, W, H, p.title);

    boardTex.needsUpdate = true;
}

function drawHeader(ctx, W, title, accent) {
    ctx.fillStyle = accent; ctx.fillRect(8, 8, W - 16, 92);
    ctx.fillStyle = '#06120e'; ctx.textBaseline = 'middle';
    ctx.textAlign = 'left'; ctx.font = 'bold 42px Outfit, Arial';
    ctx.fillText(title, 36, 56);
    ctx.textAlign = 'right'; ctx.font = '600 26px Outfit, Arial';
    ctx.fillText(new Date().toLocaleDateString('uz-UZ'), W - 36, 56);
}
function drawFooter(ctx, W, H) {
    ctx.fillStyle = '#0e0f18'; ctx.fillRect(8, H - 54, W - 16, 46);
    ctx.textBaseline = 'middle'; ctx.fillStyle = '#8c93a8'; ctx.font = '600 22px Outfit, Arial';
    ctx.textAlign = 'left'; ctx.fillText('Eco Sports · Jonli monitoring', 36, H - 31);
    ctx.textAlign = 'right'; ctx.fillText('Sahifa ' + (currentBoardPage + 1) + ' / 4', W - 36, H - 31);
}

// Umumiy KPI jadval chizg'ich
function drawKpiGrid(ctx, W, topY, cards) {
    const m = 36, gap = 22, cols = 3;
    const cw = (W - 2 * m - (cols - 1) * gap) / cols, ch = 205;
    ctx.textBaseline = 'alphabetic';
    cards.forEach((c, i) => {
        const cx = m + (i % cols) * (cw + gap);
        const cy = topY + Math.floor(i / cols) * (ch + gap);
        ctx.fillStyle = '#181926'; roundRect(ctx, cx, cy, cw, ch, 16); ctx.fill();
        ctx.strokeStyle = '#25283b'; ctx.lineWidth = 2; roundRect(ctx, cx, cy, cw, ch, 16); ctx.stroke();
        ctx.fillStyle = c.color; roundRect(ctx, cx, cy, cw, 9, 5); ctx.fill();
        ctx.textAlign = 'left';
        ctx.fillStyle = c.color; ctx.font = 'bold 82px Outfit, Arial';
        ctx.fillText(String(c.val), cx + 28, cy + 115);
        ctx.fillStyle = '#e3e7f0'; ctx.font = '600 28px Outfit, Arial';
        ctx.fillText(c.label, cx + 28, cy + 158);
        ctx.fillStyle = '#8c93a8'; ctx.font = '400 22px Outfit, Arial';
        ctx.fillText(c.sub, cx + 28, cy + 190);
    });
}

// Umumiy jadval chizg'ich (sahifa 2-4)
function drawTable(ctx, W, topY, headers, rows, colX, opts) {
    opts = opts || {};
    const left = 30, right = W - 30, rowH = 50;
    const lastIdx = headers.length - 1;
    ctx.textBaseline = 'middle'; ctx.font = 'bold 25px Outfit, Arial'; ctx.fillStyle = '#8c93a8';
    headers.forEach((h, i) => {
        ctx.textAlign = (i === lastIdx) ? 'right' : 'left';
        ctx.fillText(h, (i === lastIdx) ? right - 12 : colX[i], topY);
    });
    ctx.strokeStyle = '#25283b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(left + 6, topY + 24); ctx.lineTo(right - 6, topY + 24); ctx.stroke();

    let y = topY + 60;
    const maxRows = Math.floor((boardCanvas.height - y - 100) / rowH);
    if (!rows.length) {
        ctx.textAlign = 'center'; ctx.fillStyle = '#8c93a8'; ctx.font = "500 26px Outfit, Arial";
        ctx.fillText("Ma'lumot yo'q.", W / 2, y + 20);
        return;
    }
    rows.slice(0, maxRows).forEach((r, ri) => {
        if (ri % 2 === 0) { ctx.fillStyle = 'rgba(255,255,255,0.025)'; ctx.fillRect(left, y - 28, right - left, rowH); }
        r.forEach((cell, ci) => {
            const isLast = ci === lastIdx;
            ctx.textAlign = isLast ? 'right' : 'left';
            ctx.fillStyle = ci === 0 ? '#f1f3f9' : (isLast ? '#fbbf24' : '#b9c0d4');
            ctx.font = (ci === 0 ? '600 ' : (isLast ? 'bold ' : '500 ')) + '25px Outfit, Arial';
            const nextX = colX[ci + 1] || right;
            const maxChars = isLast ? 18 : Math.max(8, Math.floor((nextX - colX[ci]) / 13));
            ctx.fillText(trunc(String(cell), maxChars), isLast ? right - 12 : colX[ci], y);
        });
        y += rowH;
    });
    if (opts.totalLabel) {
        y += 4; ctx.fillStyle = '#0e1a14'; ctx.fillRect(left, y - 28, right - left, rowH);
        ctx.textAlign = 'left'; ctx.fillStyle = '#34d399'; ctx.font = 'bold 27px Outfit, Arial';
        ctx.fillText(opts.totalLabel, colX[0], y);
        ctx.textAlign = 'right'; ctx.fillText(opts.totalVal, right - 12, y);
    }
}

// --- Sahifa 1: Umumiy holat (bugun) ---
function drawPageOverview(ctx, W, H, data) {
    const { stages, kanban } = data;
    const lastId = stages.length ? stages[stages.length - 1].id : null;
    const total = kanban.length;
    const tayyor = kanban.filter(k => k.stage === lastId);
    const tayyorDona = tayyor.reduce((s, k) => s + (+k.miqdori || 0), 0);
    const jamiDona = kanban.reduce((s, k) => s + (+k.miqdori || 0), 0);
    const jarayonda = total - tayyor.length;
    let bugunTayyor = 0, bugunTopshirildi = 0;
    kanban.forEach(k => {
        (k.history || []).forEach(h => { if (isToday(h.start)) bugunTopshirildi++; });
        if (k.stage === lastId) {
            const cur = (k.history || []).find(x => x.stageId === lastId);
            if (cur && isToday(cur.start)) bugunTayyor++;
        }
    });
    drawKpiGrid(ctx, W, 130, [
        { label: 'Jami partiya', val: total, sub: 'barcha modellar', color: '#38bdf8' },
        { label: 'Jarayonda', val: jarayonda, sub: (jamiDona - tayyorDona).toLocaleString('uz-UZ') + ' dona', color: '#c084fc' },
        { label: 'Tayyor mahsulot', val: tayyor.length, sub: tayyorDona.toLocaleString('uz-UZ') + ' dona', color: '#34d399' },
        { label: 'Jami dona', val: jamiDona.toLocaleString('uz-UZ'), sub: 'ishlab chiqarishda', color: '#fb923c' },
        { label: 'Bugun tayyor', val: bugunTayyor, sub: 'bugungi kun', color: '#22d3ee' },
        { label: 'Bugun topshirildi', val: bugunTopshirildi, sub: "bosqich o'tkazmalari", color: '#fbbf24' }
    ]);
}

// --- Sahifa 2: Qaysi chevarda qaysi model ---
function drawPageModels(ctx, W, H, data) {
    const { stages, kanban } = data;
    const rows = kanban.map(k => {
        const cur = (k.history || []).find(h => h.end === null) || (k.history && k.history[k.history.length - 1]);
        const st = stages.find(s => s.id === k.stage);
        return [cur ? cur.worker : '—', (k.turi ? k.turi + ' · ' : '') + k.model, st ? st.nomi : '—', (k.miqdori || 0) + ' dona'];
    }).sort((a, b) => a[0].localeCompare(b[0]));
    drawTable(ctx, W, 132, ['CHEVAR (ISHCHI)', 'MODEL', 'BOSQICH', 'DONA'], rows, [36, 470, 990, 1300]);
}

// --- Sahifa 3: Chevar bo'yicha bajarilgan ish summasi ---
function drawPageMoney(ctx, W, H, data) {
    const { kanban, workers } = data;
    const map = {};
    kanban.forEach(k => (k.history || []).forEach(h => {
        if (h.end) {
            const m = map[h.worker] || (map[h.worker] = { qty: 0, sum: 0, cnt: 0 });
            m.qty += (+h.qty || 0); m.cnt++;
            m.sum += (+h.qty || 0) * tarifFor(workers, h.worker, k.turi);
        }
    }));
    const entries = Object.entries(map).sort((a, b) => b[1].sum - a[1].sum);
    const rows = entries.map(([name, v]) => [name, v.cnt + ' ta bosqich', v.qty.toLocaleString('uz-UZ') + ' dona', money(v.sum)]);
    const totalSum = entries.reduce((s, [, v]) => s + v.sum, 0);
    drawTable(ctx, W, 132, ['CHEVAR', 'BAJARGAN', 'DONA', 'JAMI SUMMA'], rows, [36, 520, 900, 1230],
        { totalLabel: 'JAMI', totalVal: money(totalSum) });
}

// --- Sahifa 4: Oylik hisobot va to'lanadigan maosh ---
function drawPageMonthly(ctx, W, H, data) {
    const { kanban, workers } = data;
    const map = {};
    kanban.forEach(k => (k.history || []).forEach(h => {
        if (h.end && inThisMonth(h.end)) {
            const m = map[h.worker] || (map[h.worker] = { qty: 0, sum: 0 });
            m.qty += (+h.qty || 0);
            m.sum += (+h.qty || 0) * tarifFor(workers, h.worker, k.turi);
        }
    }));
    const entries = Object.entries(map).sort((a, b) => b[1].sum - a[1].sum);
    const rows = entries.map(([name, v]) => [name, v.qty.toLocaleString('uz-UZ') + ' dona', money(v.sum)]);
    const totalSum = entries.reduce((s, [, v]) => s + v.sum, 0);

    // oy nomi
    ctx.fillStyle = '#8c93a8'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.font = '600 26px Outfit, Arial';
    ctx.fillText('Davr: ' + new Date().toLocaleDateString('uz-UZ', { month: 'long', year: 'numeric' }), 36, 124);
    drawTable(ctx, W, 168, ['ISHCHI (CHEVAR)', 'OYLIK ISHLAB CHIQARDI', "TO'LANADIGAN MAOSH"], rows, [36, 660, 1130],
        { totalLabel: 'JAMI MAOSH FONDI', totalVal: money(totalSum) });
}

let clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Har bir faol mashinada igna tebranadi + chiroq pulsatsiya + tikuvchi tikadi
    stationMap.forEach((st, si) => {
        (st.units || []).forEach((u, ui) => {
            if (!u.active) return;
            const ph = si * 1.7 + ui;
            if (u.head) u.head.position.y = u.headBase + Math.abs(Math.sin(t * 8 + ph)) * -0.05;
            if (u.light) u.light.material.emissiveIntensity = 0.9 + Math.sin(t * 3 + ph) * 0.5;
            if (u.worker) {
                u.worker.hands.rotation.x = Math.sin(t * 7 + ph) * 0.1;
                u.worker.head.position.y = u.workerHeadBase + Math.sin(t * 7 + ph) * 0.015;
            }
        });
    });

    if (controls) controls.update();
    if (renderer && scene && camera) renderer.render(scene, camera);
}

// --- Hodisalar: stansiyani ko'chirish (V), hover, click, resize ---
let downX = 0, downY = 0, downT = 0;
function bindEvents() {
    const el = renderer.domElement;
    el.addEventListener('pointerdown', (e) => {
        downX = e.clientX; downY = e.clientY; downT = Date.now();
    });
    el.addEventListener('pointermove', (e) => {
        lastPointerEvt = e;
        if (vMoveNode !== null) { moveNodeTo(e); return; }  // lenta nuqtasi kursorga ergashadi
        if (vMoveStation) { moveStationTo(e); return; }     // V-rejim: butun dastgoh kursorga ergashadi
        onHover(e);
    });
    el.addEventListener('pointerup', (e) => {
        if (vMoveNode !== null) { dropNode(); return; }
        if (vMoveStation) { dropVMove(); return; }        // V-rejimda bosib qo'yish
        const moved = Math.hypot(e.clientX - downX, e.clientY - downY);
        if (moved < 6 && Date.now() - downT < 500) handleClick(e);
    });
    el.addEventListener('pointerleave', () => showTooltip(null, null));
    window.addEventListener('resize', resize);

    // Klaviatura: dastgoh/tikuvchi ustida "V" bosib ko'chirish
    window.addEventListener('keydown', onKeyDown);
}

function onKeyDown(e) {
    if (!inited) return;
    const view = document.getElementById('prodview-workshop');
    if (!view || !view.classList.contains('active')) return;
    if (e.target && /^(input|textarea|select)$/i.test(e.target.tagName)) return;

    // Fizik tugmalar (klaviatura tili — kirill/lotin — ahamiyatsiz)
    const isV = (e.code === 'KeyV') || ((e.key || '').toLowerCase() === 'v') || e.key === 'В' || e.key === 'в';
    const isR = (e.code === 'KeyR') || ((e.key || '').toLowerCase() === 'r') || e.key === 'К' || e.key === 'к';
    const isEsc = (e.code === 'Escape') || (e.key === 'Escape');

    if (isR) {
        // Gorizontal burish: ko'chirilayotgan yoki kursor ostidagi stansiyani 45° buramiz
        const target = vMoveStation || hovered || (lastPointerEvt ? pickStation(lastPointerEvt) : null);
        if (target) { e.preventDefault(); rotateStation(target, Math.PI / 4); }
        return;
    }

    if (isV) {
        e.preventDefault();
        if (vMoveNode !== null) { dropNode(); return; }
        if (vMoveStation) { dropVMove(); return; }   // qo'yish

        // 1-navbat: lenta burilish nuqtasi
        const node = hoveredNode || (lastPointerEvt ? pickNode(lastPointerEvt) : null);
        if (node) {
            vMoveNode = node;
            activePath = node.pi;   // shu yo'l faollashadi
            controls.enabled = false;
            showMoveHint(true);
            return;
        }
        // 2-navbat: stansiya (dastgoh + tikuvchi birga)
        const st = hovered || (lastPointerEvt ? pickStation(lastPointerEvt) : null);
        if (st) {
            vMoveStation = st;
            controls.enabled = false;
            grabOffset = { x: 0, z: 0 };
            if (lastPointerEvt) {
                setPointer(lastPointerEvt);
                raycaster.setFromCamera(pointer, camera);
                if (raycaster.ray.intersectPlane(dragPlane, planePoint)) {
                    grabOffset = { x: st.group.position.x - planePoint.x, z: st.group.position.z - planePoint.z };
                }
            }
            showMoveHint(true);
        }
    } else if (isEsc) {
        if (connectMode) setConnectMode(false);
        else if (beltAddMode) setBeltAddMode(false);
        else if (vMoveNode) dropNode();
        else if (vMoveStation) dropVMove();
    }
}

function moveNodeTo(e) {
    if (!vMoveNode) return;
    const path = beltPaths[vMoveNode.pi];
    if (!path || !path[vMoveNode.pj]) return;
    setPointer(e);
    raycaster.setFromCamera(pointer, camera);
    if (!raycaster.ray.intersectPlane(dragPlane, planePoint)) return;
    path[vMoveNode.pj] = {
        x: Math.max(-45, Math.min(45, planePoint.x)),
        z: Math.max(-8, Math.min(8, planePoint.z))
    };
    buildBelt();
}

function dropNode() {
    if (!vMoveNode) return;
    vMoveNode = null;
    controls.enabled = true;
    showMoveHint(false);
    saveBelts();
}

// Nuqtani topish -> {pi, pj}
function pickNode(e) {
    if (!beltNodesGroup) return null;
    setPointer(e);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(beltNodesGroup.children, true);
    for (const h of hits) {
        let o = h.object;
        while (o && o.userData.bp === undefined) o = o.parent;
        if (o && o.userData.bp !== undefined) return { pi: o.userData.bp, pj: o.userData.bpt };
    }
    return null;
}

function saveBelts() {
    if (typeof window.saveBeltPaths === 'function') window.saveBeltPaths(beltPaths);
}
function persistBelt() {
    buildBelt();
    saveBelts();
}

// Nuqta qo'shish rejimini yoqish/o'chirish
function setBeltAddMode(on) {
    beltAddMode = !!on;
    if (beltAddMode) setConnectMode(false);
    const btn = document.getElementById('belt-add');
    if (btn) btn.classList.toggle('active', beltAddMode);
    const hint = document.getElementById('belt-add-hint');
    if (hint) hint.classList.toggle('show', beltAddMode);
    if (renderer) renderer.domElement.style.cursor = beltAddMode ? 'crosshair' : 'default';
}

// Ulash rejimi (2 nuqtani bosib lentalar ulanadi)
function setConnectMode(on) {
    connectMode = !!on;
    connectFirst = null;
    if (connectMode) setBeltAddMode(false);
    const btn = document.getElementById('belt-connect');
    if (btn) btn.classList.toggle('active', connectMode);
    const hint = document.getElementById('belt-connect-hint');
    if (hint) hint.classList.toggle('show', connectMode);
    if (renderer) renderer.domElement.style.cursor = connectMode ? 'crosshair' : 'default';
}

// Yangi (bo'sh) lenta yo'li boshlash — keyingi bosishlar shu yo'lga nuqta qo'yadi
function newBeltLine() {
    beltPaths.push([]);
    activePath = beltPaths.length - 1;
    setBeltAddMode(true);
    buildBelt();
}

function bDist(a, b) { return Math.hypot(a.x - b.x, a.z - b.z); }

// Yerning istalgan joyiga nuqta qo'shish (FAOL yo'lga, eng mos joyga)
function addBeltPointAt(x, z) {
    const p = { x: Math.max(-45, Math.min(45, x)), z: Math.max(-8, Math.min(8, z)) };
    if (!beltPaths[activePath]) beltPaths[activePath] = [];
    const path = beltPaths[activePath];
    if (path.length < 2) {
        path.push(p);
    } else {
        let best = Infinity, idx = path.length;
        for (let i = 0; i < path.length - 1; i++) {
            const a = path[i], b = path[i + 1];
            const c = bDist(p, a) + bDist(p, b) - bDist(a, b);
            if (c < best) { best = c; idx = i + 1; }
        }
        const endCost = bDist(p, path[path.length - 1]);
        if (endCost < best) { best = endCost; idx = path.length; }
        const startCost = bDist(p, path[0]);
        if (startCost < best) { best = startCost; idx = 0; }
        path.splice(idx, 0, p);
    }
    persistBelt();
}

// Nuqtani o'chirish
function deleteNode(node) {
    const path = beltPaths[node.pi];
    if (!path) return;
    path.splice(node.pj, 1);
    if (path.length === 0 && beltPaths.length > 1) {
        beltPaths.splice(node.pi, 1);
        if (activePath >= beltPaths.length) activePath = beltPaths.length - 1;
    }
    persistBelt();
}

// Ikki nuqtani ulash — orasiga yangi lenta yo'li chiziladi
function connectNodes(a, b) {
    const pa = beltPaths[a.pi] && beltPaths[a.pi][a.pj];
    const pb = beltPaths[b.pi] && beltPaths[b.pi][b.pj];
    if (!pa || !pb) return;
    beltPaths.push([{ x: pa.x, z: pa.z }, { x: pb.x, z: pb.z }]);
    persistBelt();
}
function wireBeltBtn(id, fn) {
    const b = document.getElementById(id);
    if (b && !b._wired) { b._wired = true; b.addEventListener('click', fn); }
}

function rotateStation(st, delta) {
    if (!st) return;
    st.group.rotation.y += delta;
    const cur = workerLayout[st.stageId] || { x: st.group.position.x, z: st.group.position.z };
    workerLayout[st.stageId] = {
        x: +st.group.position.x.toFixed(3),
        z: +st.group.position.z.toFixed(3),
        ry: +st.group.rotation.y.toFixed(4)
    };
    // Ko'chirish davom etmayotgan bo'lsa darhol saqlaymiz
    if (!vMoveStation && typeof window.saveWorkshopLayout === 'function') window.saveWorkshopLayout(workerLayout);
}

function moveStationTo(e) {
    if (!vMoveStation) return;
    setPointer(e);
    raycaster.setFromCamera(pointer, camera);
    if (!raycaster.ray.intersectPlane(dragPlane, planePoint)) return;
    const x = Math.max(-45, Math.min(45, planePoint.x + grabOffset.x));
    const z = Math.max(-8, Math.min(8, planePoint.z + grabOffset.z));
    vMoveStation.group.position.set(x, 0, z);
}

function dropVMove() {
    if (!vMoveStation) return;
    const g = vMoveStation.group;
    workerLayout[vMoveStation.stageId] = {
        x: +g.position.x.toFixed(3), z: +g.position.z.toFixed(3), ry: +g.rotation.y.toFixed(4)
    };
    if (typeof window.saveWorkshopLayout === 'function') window.saveWorkshopLayout(workerLayout);
    vMoveStation = null;
    controls.enabled = true;
    showMoveHint(false);
}

function showMoveHint(on) {
    const h = document.getElementById('workshop-move-hint');
    if (h) h.classList.toggle('show', !!on);
}

// Monitor sahifasini almashtirish (HTML tugmalar shu orqali)
window.setBoardPage = function (i) {
    currentBoardPage = Math.max(0, Math.min(3, i | 0));
    drawBoard();
};

function setPointer(e) {
    const r = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1;
}

function pickStation(e) {
    setPointer(e);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(machinesGroup.children, true);
    for (const h of hits) {
        let o = h.object;
        while (o && !o.userData.stageId) o = o.parent;
        if (o && o.userData.stageId) {
            return stationMap.find(s => s.stageId === o.userData.stageId);
        }
    }
    return null;
}

function pickProduct(e) {
    setPointer(e);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(machinesGroup.children, true);
    for (const h of hits) {
        let o = h.object;
        while (o && !o.userData.productId) o = o.parent;
        if (o && o.userData.productId) return o.userData;
    }
    return null;
}

function showTooltip(e, data) {
    const tip = document.getElementById('workshop-tooltip');
    if (!tip) return;
    if (data) {
        tip.innerHTML = `<div class="wt-name">${data.productName}</div><div class="wt-sub">${data.productSub} · bosib ko'ring</div>`;
        tip.style.left = (e.clientX + 16) + 'px';
        tip.style.top = (e.clientY + 16) + 'px';
        tip.classList.add('show');
    } else {
        tip.classList.remove('show');
    }
}

function onHover(e) {
    // Tayyor mahsulot ombori: quti ustida bo'lsa tooltip
    const prod = pickProduct(e);
    showTooltip(e, prod);

    // Lenta burilish nuqtasi
    hoveredNode = prod ? null : pickNode(e);

    const st = pickStation(e);
    if (hovered && hovered !== st) { hovered.group.scale.setScalar(1); hovered = null; }
    if (st && st !== hovered) {
        st.group.scale.setScalar(1.04);
        hovered = st;
    }
    // Kursor
    if (beltAddMode || connectMode) { renderer.domElement.style.cursor = 'crosshair'; return; }
    renderer.domElement.style.cursor = (hoveredNode || st) ? 'grab'
        : (prod ? 'pointer' : 'default');
}

function handleClick(e) {
    // Ulash rejimi: 2 nuqtani bosib lentalarni ulaymiz
    if (connectMode) {
        const node = pickNode(e);
        if (!node) return;
        if (!connectFirst) { connectFirst = node; }
        else { connectNodes(connectFirst, node); setConnectMode(false); }
        return;
    }
    // Nuqta qo'shish rejimi: nuqtani bosib o'chiramiz, bo'sh joyni bosib qo'shamiz
    if (beltAddMode) {
        const node = pickNode(e);
        if (node) { deleteNode(node); return; }
        setPointer(e);
        raycaster.setFromCamera(pointer, camera);
        if (raycaster.ray.intersectPlane(dragPlane, planePoint)) addBeltPointAt(planePoint.x, planePoint.z);
        return;
    }
    // Avval mahsulot/mashina: bosilsa o'sha mahsulot pasporti/tarixi ochiladi
    const prod = pickProduct(e);
    if (prod && typeof window.openHistory === 'function') { window.openHistory(prod.productId); return; }
    const st = pickStation(e);
    if (st) showInfo(st.stageId);
}

function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function showInfo(stageId) {
    const { stages, kanban } = getData();
    const stage = stages.find(s => s.id === stageId);
    if (!stage) return;
    const works = (kanban || []).filter(k => k.stage === stageId);

    const panel = document.getElementById('workshop-info');
    document.getElementById('wi-title').textContent = stage.nomi;
    document.getElementById('wi-dot').style.background = stage.color;

    const body = document.getElementById('wi-body');
    if (!works.length) {
        body.innerHTML = `<div class="wi-empty"><i class="fa-solid fa-mug-hot"></i> Hozircha bu bosqichda ish yo'q — mashina bo'sh.</div>`;
    } else {
        const totalQty = works.reduce((s, w) => s + (Number(w.miqdori) || 0), 0);
        body.innerHTML = `
            <div class="wi-sum">Jami <b>${works.length}</b> partiya · <b>${totalQty.toLocaleString('uz-UZ')}</b> dona ishlanmoqda</div>
            ${works.map(w => `
                <div class="wi-card" style="--c:${stage.color}">
                    <div class="wi-card-top">
                        <span class="wi-type">${escapeHtml(w.turi)}</span>
                        ${w.prio === 'high' ? '<span class="wi-prio">Shoshilinch</span>' : ''}
                    </div>
                    <div class="wi-model">${escapeHtml(w.model)}</div>
                    <div class="wi-meta">
                        <span><i class="fa-solid fa-shirt"></i> ${w.miqdori} dona</span>
                        <span><i class="fa-solid fa-diagram-project"></i> ${escapeHtml(w.liniya)}</span>
                    </div>
                    <div class="wi-meta">
                        <span><i class="fa-solid fa-user"></i> ${escapeHtml(w.masul || '—')}</span>
                        <span><i class="fa-regular fa-clock"></i> ${escapeHtml(w.deadline || '—')}</span>
                    </div>
                </div>
            `).join('')}
        `;
    }
    panel.classList.add('open');
}

function resize() {
    if (!renderer || !wrap) return;
    const w = wrap.clientWidth || 800;
    const h = wrap.clientHeight || 500;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
}

// --- Tashqi API (app.js chaqiradi) ---
window.initWorkshop3D = function () {
    canvas = document.getElementById('workshop-canvas');
    wrap = document.getElementById('workshop-canvas-wrap');
    if (!canvas || !wrap) return;

    const loading = document.getElementById('workshop-loading');
    try {
        if (!inited) {
            buildScene();
            // close button
            const closeBtn = document.getElementById('wi-close');
            if (closeBtn) closeBtn.addEventListener('click', () =>
                document.getElementById('workshop-info').classList.remove('open'));

            // Monitor sahifa navigatsiyasi
            const nav = document.getElementById('board-nav');
            if (nav && !nav._wired) {
                nav._wired = true;
                nav.addEventListener('click', (e) => {
                    const b = e.target.closest('.bn-btn');
                    if (!b) return;
                    nav.querySelectorAll('.bn-btn').forEach(x => x.classList.remove('active'));
                    b.classList.add('active');
                    window.setBoardPage(parseInt(b.dataset.page, 10) || 0);
                });
            }

            // Konveyer lentasi qurish tugmalari (temir yo'l rejimi)
            wireBeltBtn('belt-add', () => setBeltAddMode(!beltAddMode));
            wireBeltBtn('belt-new', () => newBeltLine());                  // yangi yo'l boshlash
            wireBeltBtn('belt-connect', () => setConnectMode(!connectMode)); // ulash rejimi
            wireBeltBtn('belt-undo', () => {
                const path = beltPaths[activePath];
                if (path && path.length) {
                    path.pop();
                    if (path.length === 0 && beltPaths.length > 1) {
                        beltPaths.splice(activePath, 1);
                        activePath = Math.max(0, activePath - 1);
                    }
                    persistBelt();
                }
            });
            wireBeltBtn('belt-reset', () => {
                beltPaths = [defaultBeltPath(getData().stages)];
                activePath = 0;
                setBeltAddMode(false); setConnectMode(false);
                persistBelt(); fitCamera();
            });

            // Burish ikoni (ko'chirish paytida stansiyani 45° buradi)
            const rotBtn = document.getElementById('rotate-btn');
            if (rotBtn && !rotBtn._wired) {
                rotBtn._wired = true;
                rotBtn.addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    if (vMoveStation) rotateStation(vMoveStation, Math.PI / 4);
                });
            }
            inited = true;
        }
        rebuildMachines();
        // ko'rinish ochilganda o'lcham 0 bo'lmasligi uchun keyingi freymda resize + kadrlash
        requestAnimationFrame(() => { resize(); fitCamera(); });
        setTimeout(() => { resize(); fitCamera(); }, 80);
        setTimeout(() => { resize(); fitCamera(); }, 300);
        if (loading) loading.style.display = 'none';
    } catch (err) {
        console.error('3D sex xatosi:', err);
        if (loading) loading.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> 3D yuklanmadi: ' + err.message;
    }
};

window.refreshWorkshop = function () {
    if (inited) { rebuildMachines(); resize(); fitCamera(); }
};
