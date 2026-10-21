(() => {
    "use strict";

    const LOCK = "__multiGamePresence";
    const MIN_CHANGE_MS = 23 * 60 * 1000;
    const MAX_CHANGE_MS = 38 * 60 * 1000;
    const SETTINGS_KEY = "mgp-settings";
    const savedSettings = (() => { try { return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}"); } catch (_) { return {}; } })();
    const settings = {
        minMinutes: Math.max(1, Number(savedSettings.minMinutes) || 23),
        maxMinutes: Math.max(1, Number(savedSettings.maxMinutes) || 38),
        rotation: true,
        corner: ["top-left", "top-right", "bottom-left", "bottom-right"].includes(savedSettings.corner) ? savedSettings.corner : "bottom-right"
    };
    if (settings.maxMinutes < settings.minMinutes) settings.maxMinutes = settings.minMinutes;
    const GAMES = (() => {
        const games = [
        "Counter-Strike 2", "Dota 2", "Team Fortress 2", "Half-Life 2", "Portal 2",
        "Left 4 Dead 2", "Apex Legends", "Fortnite", "Roblox", "VALORANT", "Overwatch 2",
        "Minecraft", "Terraria", "Stardew Valley", "Rust", "DayZ", "League of Legends", "Teamfight Tactics",
        "ARK: Survival Ascended", "Palworld", "PUBG: BATTLEGROUNDS", "Grand Theft Auto V", "Grand Theft Auto IV", "Grand Theft Auto: San Andreas", "Red Dead Redemption 2", "Red Dead Online",
        "Cyberpunk 2077", "The Witcher 3: Wild Hunt", "Elden Ring", "Dark Souls III", "Sekiro: Shadows Die Twice", "Genshin Impact", "Honkai: Star Rail", "Wuthering Waves", "Zenless Zone Zero",
        "Baldur's Gate 3", "Divinity: Original Sin 2", "Diablo IV", "Diablo III", "Path of Exile", "Path of Exile 2", "Last Epoch",
        "The Elder Scrolls V: Skyrim", "Fallout 4", "Fallout 76", "Starfield", "Dragon Age: The Veilguard", "Dragon's Dogma 2", "Kingdom Come: Deliverance II",
        "World of Warcraft", "FINAL FANTASY XIV", "Guild Wars 2", "The Elder Scrolls Online", "Lost Ark", "Black Desert Online", "New World: Aeternum", "RuneScape",
        "Warframe", "Destiny 2", "The First Descendant", "Helldivers 2", "Deep Rock Galactic", "War Thunder", "Enshrouded", "V Rising", "Valheim",
        "World of Tanks", "World of Warships", "Tom Clancy's Rainbow Six Siege", "Escape from Tarkov", "Hunt: Showdown 1896",
        "Call of Duty", "Call of Duty: Warzone", "Battlefield 2042", "Halo Infinite", "Halo: The Master Chief Collection", "DOOM Eternal", "Quake Champions",
        "PAYDAY 2", "PAYDAY 3", "Ready or Not", "Insurgency: Sandstorm", "Squad", "Arma 3", "BattleBit Remastered", "The Finals",
        "Foxhole", "Hell Let Loose", "Garry's Mod", "Among Us", "Fall Guys",
        "Rocket League", "EA SPORTS FC 26", "eFootball 2026", "NBA 2K26", "Madden NFL 26", "WWE 2K26", "Forza Horizon 5", "Gran Turismo 7", "Assetto Corsa Competizione",
        "Euro Truck Simulator 2", "American Truck Simulator", "F1 26", "BeamNG.drive", "Need for Speed Unbound",
        "The Crew Motorfest", "Trackmania", "Dirt Rally 2.0", "WRC Generations", "Cities: Skylines II", "Factorio", "Satisfactory",
        "RimWorld", "Oxygen Not Included", "Frostpunk 2", "The Sims 4", "The Sims 5", "Sid Meier's Civilization VI", "Age of Empires IV",
        "Total War: WARHAMMER III", "Crusader Kings III", "Europa Universalis IV", "Hearts of Iron IV", "Stellaris",
        "StarCraft II", "Warcraft III", "Command & Conquer Remastered Collection", "XCOM 2", "Into the Breach",
        "Hades II", "Hades", "Dead Cells", "Hollow Knight", "Silksong", "Celeste", "Cuphead", "Lies of P",
        "Ori and the Will of the Wisps", "The Binding of Isaac: Rebirth", "Vampire Survivors", "Risk of Rain 2", "Slay the Spire",
        "Balatro", "Dave the Diver", "Disco Elysium", "Undertale", "Deltarune",
        "Resident Evil 4", "Resident Evil Village", "Silent Hill 2", "Dead Space", "Alan Wake 2", "Control", "Phasmophobia", "Lethal Company",
        "The Last of Us Part I", "God of War Ragnarök", "Horizon Forbidden West", "Ghost of Tsushima", "Marvel's Spider-Man 2",
        "Assassin's Creed Shadows", "Far Cry 6", "Death Stranding", "No Man's Sky", "Subnautica",
        "Sea of Thieves", "Monster Hunter Wilds", "Monster Hunter: World", "Hogwarts Legacy", "Black Myth: Wukong", "METAL GEAR SOLID Δ: SNAKE EATER"
        ];
        for (let i = games.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [games[i], games[j]] = [games[j], games[i]];
        }
        return Object.freeze(games);
    })();
    const iconFor = name => ({
        "Minecraft": "🟩", "Roblox": "◇", "Fortnite": "🔷", "Counter-Strike 2": "🎯",
        "Grand Theft Auto V": "🚘", "League of Legends": "⚔️", "Valorant": "🎯", "VALORANT": "🎯",
        "Rocket League": "🚗", "Among Us": "🚀", "The Sims 4": "🏠", "Fall Guys": "🫘"
    }[name] ?? "🎮");
    const logoFor = name => ({
        "Counter-Strike 2": "https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_64x64.jpg",
        "Dota 2": "https://cdn.cloudflare.steamstatic.com/steam/apps/570/capsule_64x64.jpg",
        "Team Fortress 2": "https://cdn.cloudflare.steamstatic.com/steam/apps/440/capsule_64x64.jpg",
        "Portal 2": "https://cdn.cloudflare.steamstatic.com/steam/apps/620/capsule_64x64.jpg",
        "Left 4 Dead 2": "https://cdn.cloudflare.steamstatic.com/steam/apps/550/capsule_64x64.jpg",
        "Apex Legends": "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/capsule_64x64.jpg",
        "Terraria": "https://cdn.cloudflare.steamstatic.com/steam/apps/105600/capsule_64x64.jpg",
        "Stardew Valley": "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/capsule_64x64.jpg",
        "Rust": "https://cdn.cloudflare.steamstatic.com/steam/apps/252490/capsule_64x64.jpg",
        "Grand Theft Auto V": "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/capsule_64x64.jpg",
        "The Witcher 3: Wild Hunt": "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/capsule_64x64.jpg",
        "Cyberpunk 2077": "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/capsule_64x64.jpg",
        "Elden Ring": "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/capsule_64x64.jpg",
        "Baldur's Gate 3": "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/capsule_64x64.jpg",
        "Diablo IV": "https://cdn.cloudflare.steamstatic.com/steam/apps/2344520/capsule_64x64.jpg",
        "Warframe": "https://cdn.cloudflare.steamstatic.com/steam/apps/230410/capsule_64x64.jpg",
        "Destiny 2": "https://cdn.cloudflare.steamstatic.com/steam/apps/1085660/capsule_64x64.jpg",
        "Helldivers 2": "https://cdn.cloudflare.steamstatic.com/steam/apps/553850/capsule_64x64.jpg",
        "Deep Rock Galactic": "https://cdn.cloudflare.steamstatic.com/steam/apps/548430/capsule_64x64.jpg",
        "PUBG: BATTLEGROUNDS": "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/capsule_64x64.jpg",
        "Call of Duty: Warzone": "https://cdn.cloudflare.steamstatic.com/steam/apps/1962663/capsule_64x64.jpg",
        "Battlefield 2042": "https://cdn.cloudflare.steamstatic.com/steam/apps/1517290/capsule_64x64.jpg",
        "Among Us": "https://cdn.cloudflare.steamstatic.com/steam/apps/945360/capsule_64x64.jpg",
        "Fall Guys": "https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/capsule_64x64.jpg",
        "Rocket League": "https://cdn.cloudflare.steamstatic.com/steam/apps/252950/capsule_64x64.jpg",
        "Hades": "https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/capsule_64x64.jpg",
        "Hades II": "https://cdn.cloudflare.steamstatic.com/steam/apps/1145350/capsule_64x64.jpg",
        "Hollow Knight": "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/capsule_64x64.jpg",
        "Dead Cells": "https://cdn.cloudflare.steamstatic.com/steam/apps/588650/capsule_64x64.jpg",
        "Phasmophobia": "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/capsule_64x64.jpg",
        "Lethal Company": "https://cdn.cloudflare.steamstatic.com/steam/apps/1966720/capsule_64x64.jpg",
        "Minecraft": "https://cdn.simpleicons.org/minecraft/7d54d9",
        "Roblox": "https://cdn.simpleicons.org/roblox/7d54d9",
        "Fortnite": "https://cdn.simpleicons.org/fortnite/7d54d9",
        "VALORANT": "https://cdn.simpleicons.org/valorant/7d54d9",
        "League of Legends": "https://cdn.simpleicons.org/leagueoflegends/7d54d9",
        "Teamfight Tactics": "https://cdn.simpleicons.org/teamfighttactics/7d54d9",
        "Genshin Impact": "https://cdn.simpleicons.org/genshinimpact/7d54d9",
        "Honkai: Star Rail": "https://cdn.simpleicons.org/honkaistar/7d54d9",
        "Wuthering Waves": "https://cdn.simpleicons.org/wutheringwaves/7d54d9",
        "Zenless Zone Zero": "https://cdn.simpleicons.org/zenlesszonezero/7d54d9",
        "World of Warcraft": "https://cdn.simpleicons.org/worldofwarcraft/7d54d9",
        "FINAL FANTASY XIV": "https://cdn.simpleicons.org/finalfantasy/7d54d9",
        "The Sims 4": "https://cdn.simpleicons.org/thesims/7d54d9",
        "Madden NFL 26": "https://cdn.simpleicons.org/easports/7d54d9",
        "EA SPORTS FC 26": "https://cdn.simpleicons.org/easports/7d54d9"
    }[name] ?? null);

    const GAME_METADATA = Object.freeze({
        "Counter-Strike 2": {
            linux: {
                exeName: "cs2",
                exePath: "/home/user/.local/share/Steam/steamapps/common/Counter-Strike Global Offensive/game/bin/linuxsteamrt64/cs2",
                cmdLine: "/home/user/.local/share/Steam/steamapps/common/Counter-Strike Global Offensive/game/bin/linuxsteamrt64/cs2"
            },
            win32: {
                exeName: "cs2.exe",
                exePath: "c:/program files (x86)/steam/steamapps/common/counter-strike global offensive/game/bin/win64/cs2.exe",
                cmdLine: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\game\\bin\\win64\\cs2.exe"
            }
        }
    });

    if (window[LOCK]?.stop) {
        console.warn("[Multi Game Presence] Already running. To stop: window.__multiGamePresence.stop()");
        return;
    }
    if (GAMES.length < 100) throw new Error("[Multi Game Presence] Game list must contain at least 100 entries.");

    function getWebpackRequire() {
        if (window.Vencord?.Webpack?.wreq?.c) return window.Vencord.Webpack.wreq;
        if (typeof webpackChunkdiscord_app === "undefined") return null;
        let req;
        webpackChunkdiscord_app.push([[Symbol("multi-game-presence")], {}, incoming => {
            if (Object.keys(incoming?.c ?? {}).length > Object.keys(req?.c ?? {}).length) req = incoming;
        }]);
        webpackChunkdiscord_app.pop();
        return req;
    }

    function collectExports(req) {
        return Object.values(req?.c ?? {}).flatMap(module => {
            try {
                const exp = module?.exports;
                if (!exp) return [];
                return [exp, exp.default, ...(typeof exp === "object" ? Object.values(exp) : [])];
            } catch (_) {
                return [];
            }
        }).filter(Boolean);
    }

    function findStore(exports, name) {
        return exports.find(value => {
            try {
                return value && typeof value === "object" &&
                    (value.getName?.() === name || value.__proto__?.constructor?.displayName === name);
            } catch (_) {
                return false;
            }
        });
    }

    function findDispatcher(exports) {
        return exports.find(value => value && typeof value.dispatch === "function" &&
            typeof value.subscribe === "function" && value._subscriptions);
    }

    const req = getWebpackRequire();
    if (!req?.c) throw new Error("[Multi Game Presence] Discord webpack instance not found.");
    const exports = collectExports(req);
    const runStore = findStore(exports, "RunningGameStore");
    const dispatcher = findDispatcher(exports);
    if (!runStore || !dispatcher) throw new Error("[Multi Game Presence] RunningGameStore or Dispatcher not found.");

    const original = {};
    const patchable = ["getRunningGames", "getGameForPID", "getVisibleGame", "getVisibleRunningGames", "getCandidateGames", "getRunningDiscordApplicationIds"];
    for (const key of patchable) {
        if (typeof runStore[key] === "function") original[key] = runStore[key];
    }
    if (!original.getRunningGames || !original.getGameForPID) {
        throw new Error("[Multi Game Presence] Required RunningGameStore methods not found.");
    }

    const pid = 45000 + Math.floor(Math.random() * 10000);
    let index = 0;
    let current = null;
    let timer = null;
    let uiTimer = null;
    let nextSwitchTime = 0;
    let currentDuration = 0;

    const UI = (() => {
        const styleId = "mgp-styles";
        if (!document.getElementById(styleId)) {
            const style = document.createElement("style");
            style.id = styleId;
            style.textContent = `
                #mgp-widget {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    width: 310px;
                    background: rgba(18, 19, 24, 0.88);
                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 14px;
                    padding: 14px 16px;
                    color: #f2f3f5;
                    font-family: "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
                    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(88, 101, 242, 0.2);
                    z-index: 999999;
                    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                    user-select: none;
                    overflow: hidden;
                }
                #mgp-widget.mgp-top-left { top: 24px; left: 24px; right: auto; bottom: auto; }
                #mgp-widget.mgp-top-right { top: 24px; right: 24px; left: auto; bottom: auto; }
                #mgp-widget.mgp-bottom-left { bottom: 24px; left: 24px; right: auto; top: auto; }
                #mgp-widget.mgp-bottom-right { bottom: 24px; right: 24px; left: auto; top: auto; }
                #mgp-widget.mgp-dragging { transition: none; opacity: 0.82; cursor: grabbing; }
                .mgp-header { cursor: grab; }
                .mgp-settings { display: none; margin: 12px 0 2px; padding: 12px; background: linear-gradient(145deg, rgba(35,37,48,.96), rgba(19,20,26,.96)); border: 1px solid rgba(255,255,255,.1); border-radius: 12px; box-shadow: inset 0 1px 0 rgba(255,255,255,.04), 0 8px 20px rgba(0,0,0,.18); }
                .mgp-settings.mgp-open { display: block; }
                .mgp-settings-title { margin-bottom: 10px; color: #fff; font-size: 12px; font-weight: 700; letter-spacing: .2px; }
                .mgp-settings-row { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 10px; margin: 8px 0; font-size: 11px; color: #b5bac1; }
                .mgp-settings-row label { font-weight: 600; }
                .mgp-settings-row:has(#mgp-corner-select) { display: none; }
                .mgp-switch { position: relative; width: 38px; height: 22px; cursor: pointer; }
                .mgp-switch input { position: absolute; width: 0; height: 0; opacity: 0; }
                .mgp-switch-track { position: absolute; inset: 0; border-radius: 20px; background: rgba(255,255,255,.14); transition: .2s; }
                .mgp-switch-track::after { content: ""; position: absolute; width: 16px; height: 16px; top: 3px; left: 3px; border-radius: 50%; background: #b5bac1; transition: .2s; }
                .mgp-switch input:checked + .mgp-switch-track { background: #7d54d9; box-shadow: 0 0 12px rgba(125,84,217,.45); }
                .mgp-switch input:checked + .mgp-switch-track::after { transform: translateX(16px); background: #fff; }
                .mgp-settings input, .mgp-settings select { box-sizing: border-box; height: 30px; border: 1px solid rgba(255,255,255,.13); border-radius: 7px; background: rgba(8,9,13,.58); color: #fff; outline: none; transition: border-color .15s, box-shadow .15s, background .15s; }
                .mgp-settings input { width: 76px; padding: 5px 9px; text-align: right; font-size: 12px; font-weight: 600; }
                .mgp-settings input:focus, .mgp-settings select:focus { border-color: #5865f2; background: rgba(8,9,13,.82); box-shadow: 0 0 0 3px rgba(88,101,242,.2); }
                .mgp-settings input::-webkit-inner-spin-button, .mgp-settings input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
                .mgp-settings input { -moz-appearance: textfield; }
                .mgp-select { position: relative; width: 132px; }
                .mgp-select-trigger { display: flex; align-items: center; justify-content: space-between; box-sizing: border-box; width: 100%; height: 30px; padding: 5px 9px; border: 1px solid rgba(255,255,255,.13); border-radius: 7px; background: rgba(8,9,13,.58); color: #fff; cursor: pointer; font-size: 11px; text-align: left; }
                .mgp-select-trigger:hover, .mgp-select.mgp-open .mgp-select-trigger { border-color: #5865f2; background: rgba(8,9,13,.82); }
                .mgp-select-chevron { color: #949ba4; font-size: 13px; transition: transform .15s; }
                .mgp-select.mgp-open .mgp-select-chevron { transform: rotate(180deg); }
                .mgp-select-menu { position: absolute; z-index: 3; top: calc(100% + 5px); left: 0; right: 0; display: none; padding: 4px; border: 1px solid rgba(255,255,255,.13); border-radius: 8px; background: #20222b; box-shadow: 0 10px 24px rgba(0,0,0,.45); }
                .mgp-select.mgp-open .mgp-select-menu { display: block; }
                .mgp-select-option { display: block; width: 100%; padding: 7px 8px; border: 0; border-radius: 5px; background: transparent; color: #b5bac1; cursor: pointer; font-size: 11px; text-align: left; }
                .mgp-select-option:hover, .mgp-select-option.mgp-selected { background: rgba(88,101,242,.28); color: #fff; }
                .mgp-settings .mgp-btn { width: 100%; margin-top: 11px; padding: 7px 10px; background: linear-gradient(135deg, #5865f2, #4752c4); color: #fff; box-shadow: 0 4px 12px rgba(88,101,242,.25); }
                .mgp-settings .mgp-btn:hover { background: linear-gradient(135deg, #936ff0, #7d54d9); }
                .mgp-settings .mgp-btn { background: linear-gradient(135deg, #7d54d9, #5d3eaa); color: #fff; }
                #mgp-widget .mgp-icon-box { background: linear-gradient(135deg, #7d54d9, #5639a0); box-shadow: 0 4px 10px rgba(125,84,217,.38); }
                #mgp-widget .mgp-btn:hover { background: #7d54d9; }
                #mgp-widget .mgp-progress-bar { background: linear-gradient(90deg, #7d54d9, #b18cff); }
                #mgp-widget .mgp-settings input:focus { border-color: #7d54d9; box-shadow: 0 0 0 3px rgba(125,84,217,.2); }
                #mgp-widget.mgp-pulse { border-color: rgba(125,84,217,.85); box-shadow: 0 12px 32px rgba(125,84,217,.3), 0 0 20px rgba(125,84,217,.35); }
                #mgp-widget { box-shadow: 0 12px 32px rgba(0,0,0,.55), 0 0 0 1px rgba(125,84,217,.32); }
                .mgp-player-controls { display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; margin: 12px 0 2px; }
                .mgp-player-btn { flex: 0 0 28px; display: grid; place-items: center; box-sizing: border-box; width: 28px; height: 28px; min-width: 28px; max-width: 28px; min-height: 28px; max-height: 28px; aspect-ratio: 1; padding: 0; border: 0; border-radius: 50%; background: transparent; color: #b5bac1; cursor: pointer; font-family: Arial, sans-serif; font-size: 15px; line-height: 1; text-align: center; transition: color .15s, background .15s, transform .15s; }
                .mgp-player-btn:hover:not(:disabled) { color: #fff; background: rgba(125,84,217,.28); transform: scale(1.08); }
                .mgp-player-btn:disabled { opacity: .28; cursor: not-allowed; }
                .mgp-player-btn.mgp-play { flex: 0 0 36px; width: 36px; height: 36px; min-width: 36px; max-width: 36px; min-height: 36px; max-height: 36px; display: grid; place-items: center; padding: 0; background: #7d54d9; color: #fff; font-size: 16px; box-shadow: 0 4px 12px rgba(125,84,217,.42); }
                .mgp-player-btn.mgp-play:hover:not(:disabled) { background: #936ff0; }
                #mgp-widget { background: rgba(18,19,24,.58); border: 1px solid #7d54d9; box-shadow: 0 12px 32px rgba(0,0,0,.42), 0 0 0 1px rgba(125,84,217,.22); }
                #mgp-widget .mgp-settings { background: rgba(25,22,35,.58); border-color: rgba(125,84,217,.58); }
                #mgp-widget.mgp-pulse {
                    border-color: rgba(88, 101, 242, 0.85);
                    box-shadow: 0 12px 32px rgba(88, 101, 242, 0.3), 0 0 20px rgba(88, 101, 242, 0.35);
                    transform: translateY(-4px) scale(1.015);
                }
                #mgp-widget.mgp-minimized {
                    width: 48px;
                    height: 48px;
                    padding: 0;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                #mgp-widget.mgp-minimized .mgp-content { display: none; }
                #mgp-widget .mgp-mini-icon { display: none; font-size: 20px; }
                #mgp-widget.mgp-minimized .mgp-mini-icon { display: block; }
                .mgp-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 8px;
                }
                .mgp-badge {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.6px;
                    color: #949ba4;
                }
                .mgp-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #23a55a;
                    box-shadow: 0 0 8px #23a55a;
                    animation: mgp-blink 2s infinite ease-in-out;
                }
                @keyframes mgp-blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
                .mgp-controls {
                    display: flex;
                    gap: 6px;
                }
                .mgp-btn {
                    background: rgba(255, 255, 255, 0.06);
                    border: none;
                    color: #b5bac1;
                    border-radius: 6px;
                    padding: 4px 8px;
                    font-size: 11px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.15s, color 0.15s;
                }
                .mgp-btn:hover {
                    background: rgba(88, 101, 242, 0.8);
                    color: #fff;
                }
                .mgp-btn.mgp-stop:hover {
                    background: #da373c;
                    color: #fff;
                }
                .mgp-game-row {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 10px;
                }
                .mgp-icon-box {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #5865f2, #4752c4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    flex-shrink: 0;
                    box-shadow: 0 4px 10px rgba(88, 101, 242, 0.35);
                }
                .mgp-game-info {
                    overflow: hidden;
                    flex: 1;
                }
                .mgp-icon-box img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    border-radius: inherit;
                    object-fit: cover;
                }
                .mgp-game-title {
                    font-size: 14px;
                    font-weight: 700;
                    color: #ffffff;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    transition: opacity 0.2s, transform 0.2s;
                }
                .mgp-sub {
                    font-size: 11px;
                    color: #949ba4;
                    margin-top: 2px;
                }
                .mgp-progress-bg {
                    width: 100%;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.08);
                    border-radius: 2px;
                    overflow: hidden;
                }
                .mgp-progress-bar {
                    height: 100%;
                    width: 0%;
                    background: linear-gradient(90deg, #5865f2, #8ea1e1);
                    transition: width 1s linear;
                }
                #mgp-widget { background: rgba(18,19,24,.58); border-color: #7d54d9; }
                #mgp-widget.mgp-pulse { border-color: #7d54d9; box-shadow: 0 12px 32px rgba(125,84,217,.3), 0 0 20px rgba(125,84,217,.35); }
            `;
            document.head.appendChild(style);
        }

        const root = document.createElement("div");
        root.id = "mgp-widget";
        root.innerHTML = `
            <div class="mgp-mini-icon" title="Expand Multi Game Presence">🎮</div>
            <div class="mgp-content">
                <div class="mgp-header">
                    <div class="mgp-badge">
                        <span class="mgp-dot"></span>
                        <span id="mgp-index">Game Presence (1/${GAMES.length})</span>
                    </div>
                    <div class="mgp-controls">
                        <button class="mgp-btn" id="mgp-settings-btn" title="Settings">⚙</button>
                        <button class="mgp-btn" id="mgp-min" title="Minimize">_</button>
                        <button class="mgp-btn mgp-stop" id="mgp-stop" title="Stop Script">✕</button>
                    </div>
                </div>
                <div class="mgp-game-row">
                    <div class="mgp-icon-box" id="mgp-icon">🎮</div>
                    <div class="mgp-game-info">
                        <div class="mgp-game-title" id="mgp-title">Loading...</div>
                        <div class="mgp-sub" id="mgp-timer">Next switch in --m --s</div>
                    </div>
                </div>
                <div class="mgp-progress-bg">
                    <div class="mgp-progress-bar" id="mgp-bar"></div>
                </div>
                <div class="mgp-player-controls" aria-label="Playback controls">
                    <button class="mgp-player-btn" id="mgp-previous" title="Previous game" aria-label="Previous game">⏮</button>
                    <button class="mgp-player-btn mgp-play" id="mgp-play" title="Pause rotation" aria-label="Pause rotation">⏸</button>
                    <button class="mgp-player-btn" id="mgp-next" title="Next game" aria-label="Next game">⏭</button>
                </div>
                <div class="mgp-settings" id="mgp-settings">
                    <div class="mgp-settings-title">Display & interval settings</div>
                    <div class="mgp-settings-row"><label>Minimum</label><input id="mgp-minutes-min" type="number" min="1" max="1440"></div>
                    <div class="mgp-settings-row"><label>Maximum</label><input id="mgp-minutes-max" type="number" min="1" max="1440"></div>
                    <div class="mgp-settings-row"><label>Corner</label><input id="mgp-corner" type="hidden"><div class="mgp-select" id="mgp-corner-select"><button class="mgp-select-trigger" type="button"><span class="mgp-select-label">Bottom right</span><span class="mgp-select-chevron">⌄</span></button><div class="mgp-select-menu"><button class="mgp-select-option" type="button" data-value="top-left">Top left</button><button class="mgp-select-option" type="button" data-value="top-right">Top right</button><button class="mgp-select-option" type="button" data-value="bottom-left">Bottom left</button><button class="mgp-select-option" type="button" data-value="bottom-right">Bottom right</button></div></div></div>
                    <button class="mgp-btn" id="mgp-apply-settings">Apply</button>
                </div>
            </div>
        `;
        document.body.appendChild(root);
        const setCorner = corner => {
            root.classList.remove("mgp-top-left", "mgp-top-right", "mgp-bottom-left", "mgp-bottom-right");
            root.classList.add(`mgp-${corner}`);
            root.style.left = "";
            root.style.top = "";
            root.style.right = "";
            root.style.bottom = "";
            settings.corner = corner;
            try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (_) {}
        };
        setCorner(settings.corner);
        root.querySelector("#mgp-minutes-min").value = settings.minMinutes;
        root.querySelector("#mgp-minutes-max").value = settings.maxMinutes;

        let dragStart = null;
        root.querySelector(".mgp-header").addEventListener("pointerdown", e => {
            if (e.target.closest("button")) return;
            const rect = root.getBoundingClientRect();
            dragStart = { offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top };
            root.classList.add("mgp-dragging");
            e.currentTarget.setPointerCapture?.(e.pointerId);
        });
        root.addEventListener("pointermove", e => {
            if (!dragStart) return;
            root.style.left = `${Math.max(8, Math.min(window.innerWidth - root.offsetWidth - 8, e.clientX - dragStart.offsetX))}px`;
            root.style.top = `${Math.max(8, Math.min(window.innerHeight - root.offsetHeight - 8, e.clientY - dragStart.offsetY))}px`;
            root.style.right = "auto";
            root.style.bottom = "auto";
        });
        root.addEventListener("pointerup", e => {
            if (!dragStart) return;
            dragStart = null;
            root.classList.remove("mgp-dragging");
            const horizontal = e.clientX < window.innerWidth / 2 ? "left" : "right";
            const vertical = e.clientY < window.innerHeight / 2 ? "top" : "bottom";
            setCorner(`${vertical}-${horizontal}`);
        });
        root.addEventListener("pointercancel", () => { dragStart = null; root.classList.remove("mgp-dragging"); });

        root.addEventListener("click", e => {
            if (root.classList.contains("mgp-minimized")) {
                root.classList.remove("mgp-minimized");
            }
        });

        root.querySelector("#mgp-min").addEventListener("click", e => {
            e.stopPropagation();
            root.classList.add("mgp-minimized");
        });

        root.querySelector("#mgp-previous").addEventListener("click", e => {
            e.stopPropagation();
            window[LOCK]?.previous();
        });
        root.querySelector("#mgp-play").addEventListener("click", e => {
            e.stopPropagation();
            window[LOCK]?.togglePlayback();
        });
        root.querySelector("#mgp-next").addEventListener("click", e => {
            e.stopPropagation();
            window[LOCK]?.next();
        });

        root.querySelector("#mgp-settings-btn").addEventListener("click", e => {
            e.stopPropagation();
            root.querySelector("#mgp-settings").classList.toggle("mgp-open");
        });
        root.querySelector("#mgp-apply-settings").addEventListener("click", e => {
            e.stopPropagation();
            const minMinutes = Math.max(1, Number(root.querySelector("#mgp-minutes-min").value) || 1);
            const maxMinutes = Math.max(minMinutes, Number(root.querySelector("#mgp-minutes-max").value) || minMinutes);
            settings.minMinutes = minMinutes;
            settings.maxMinutes = maxMinutes;
            try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (_) {}
            window[LOCK]?.applySettings();
            root.querySelector("#mgp-settings").classList.remove("mgp-open");
        });

        root.querySelector("#mgp-stop").addEventListener("click", e => {
            e.stopPropagation();
            window[LOCK]?.stop();
        });

        return {
            update(gameName, idx, total) {
                const titleEl = root.querySelector("#mgp-title");
                const indexEl = root.querySelector("#mgp-index");
                const iconEl = root.querySelector("#mgp-icon");
                if (!titleEl || !indexEl) return;

                root.classList.add("mgp-pulse");
                titleEl.style.opacity = "0";
                titleEl.style.transform = "translateY(4px)";

                setTimeout(() => {
                    titleEl.textContent = gameName;
                    if (iconEl) {
                        const logo = logoFor(gameName);
                        iconEl.textContent = iconFor(gameName);
                        if (logo) {
                            const image = new Image();
                            image.alt = "";
                            image.onload = () => iconEl.replaceChildren(image);
                            image.onerror = () => { image.remove(); };
                            image.src = logo;
                        }
                    }
                    titleEl.title = gameName;
                    indexEl.textContent = `Game Presence (${idx + 1}/${total})`;
                    titleEl.style.opacity = "1";
                    titleEl.style.transform = "translateY(0)";
                }, 150);

                setTimeout(() => root.classList.remove("mgp-pulse"), 900);
            },
            tick() {
                const timerEl = root.querySelector("#mgp-timer");
                const barEl = root.querySelector("#mgp-bar");
                if (!timerEl || !barEl) return;
                if (!nextSwitchTime) {
                    timerEl.textContent = "Rotation paused";
                    barEl.style.width = "0%";
                    return;
                }

                const remaining = Math.max(0, nextSwitchTime - Date.now());
                const totalSec = Math.floor(remaining / 1000);
                const mins = Math.floor(totalSec / 60);
                const secs = totalSec % 60;

                timerEl.textContent = `Next switch in ${mins}m ${String(secs).padStart(2, "0")}s`;
                const percent = currentDuration > 0
                    ? Math.min(100, Math.max(0, ((currentDuration - remaining) / currentDuration) * 100))
                    : 0;
                barEl.style.width = `${percent.toFixed(1)}%`;
            },
            setPlayback(playing, canGoBack) {
                const playEl = root.querySelector("#mgp-play");
                const previousEl = root.querySelector("#mgp-previous");
                if (!playEl || !previousEl) return;
                playEl.textContent = playing ? "⏸" : "▶";
                playEl.title = playing ? "Pause rotation" : "Resume rotation";
                playEl.setAttribute("aria-label", playEl.title);
                previousEl.disabled = !canGoBack;
            },
            destroy() {
                root.remove();
                document.getElementById(styleId)?.remove();
            }
        };
    })();

    const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const buildGame = name => {
        const isLinux = /Linux/i.test(navigator.userAgent);
        const os = isLinux ? "linux" : "win32";
        const metadata = GAME_METADATA[name]?.[os];
        const executable = metadata?.exeName ?? (isLinux ? slug(name) : `${slug(name)}.exe`);
        const exePath = metadata?.exePath ?? `/synthetic/games/${slug(name)}/${executable}`;
        const cmdLine = metadata?.cmdLine ?? exePath;
        return {
            id: null,
            name,
            pid,
            pidPath: [pid],
            processName: name,
            start: Date.now(),
            exeName: executable,
            exePath,
            cmdLine,
            executables: [{ os, name: executable, is_launcher: false }],
            windowHandle: 0,
            fullscreenType: 0,
            overlay: Boolean(metadata),
            sandboxed: false,
            hidden: false,
            isLauncher: false
        };
    };

    const realGames = () => (original.getRunningGames.call(runStore) ?? []).filter(game => game?.pid !== pid);
    runStore.getRunningGames = () => current ? [...realGames(), current] : realGames();
    runStore.getGameForPID = value => value === pid && current ? current : original.getGameForPID.call(runStore, value);
    if (original.getVisibleGame) runStore.getVisibleGame = () => current ?? original.getVisibleGame.call(runStore);
    if (original.getVisibleRunningGames) {
        runStore.getVisibleRunningGames = () => current
            ? [...(original.getVisibleRunningGames.call(runStore) ?? []).filter(game => game?.pid !== pid), current]
            : original.getVisibleRunningGames.call(runStore);
    }
    if (original.getCandidateGames) {
        runStore.getCandidateGames = () => current
            ? [...(original.getCandidateGames.call(runStore) ?? []).filter(game => game?.pid !== pid), current]
            : original.getCandidateGames.call(runStore);
    }

    const dispatchRemoval = game => {
        if (!game) return;
        dispatcher.dispatch({ type: "RUNNING_GAMES_CHANGE", added: [], removed: [game], games: realGames() });
        dispatcher.dispatch({ type: "LOCAL_ACTIVITY_UPDATE", socketId: null, pid, activity: null });
    };

    const activate = name => {
        const previous = current;
        if (previous) dispatchRemoval(previous);
        current = buildGame(name);
        dispatcher.dispatch({
            type: "RUNNING_GAMES_CHANGE",
            added: [current],
            removed: [],
            games: runStore.getRunningGames()
        });
        dispatcher.dispatch({
            type: "LOCAL_ACTIVITY_UPDATE",
            socketId: null,
            pid,
            activity: {
                name: current.name,
                type: 0,
                details: null,
                state: null,
                timestamps: { start: current.start },
                assets: null
            }
        });
        UI.update(current.name, index, GAMES.length);
        console.log(`[Multi Game Presence] Now playing (${index + 1}/${GAMES.length}): ${current.name}`);
    };

    const scheduleNext = () => {
        if (timer) clearTimeout(timer);
        if (!settings.rotation) {
            timer = null;
            nextSwitchTime = 0;
            UI.tick();
            return;
        }
        const minMs = settings.minMinutes * 60 * 1000;
        const maxMs = settings.maxMinutes * 60 * 1000;
        currentDuration = minMs + Math.floor(Math.random() * (maxMs - minMs + 1));
        nextSwitchTime = Date.now() + currentDuration;
        UI.tick();

        timer = setTimeout(() => {
            next(false);
            scheduleNext();
        }, currentDuration);
        console.log(`[Multi Game Presence] Next switch in ~${(currentDuration / 60000).toFixed(1)} minutes.`);
    };

    const next = (resetSchedule = true) => {
        index = (index + 1) % GAMES.length;
        activate(GAMES[index]);
        if (settings.rotation && resetSchedule) scheduleNext();
        UI.setPlayback(settings.rotation, index > 0);
    };

    const previous = () => {
        if (index <= 0) return;
        index -= 1;
        activate(GAMES[index]);
        if (settings.rotation) scheduleNext();
        UI.setPlayback(settings.rotation, index > 0);
    };

    const togglePlayback = () => {
        settings.rotation = !settings.rotation;
        if (settings.rotation) {
            scheduleNext();
        } else {
            if (timer) clearTimeout(timer);
            timer = null;
            nextSwitchTime = 0;
            UI.tick();
        }
        try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (_) {}
        UI.setPlayback(settings.rotation, index > 0);
    };

    const applySettings = () => {
        scheduleNext();
        UI.setPlayback(settings.rotation, index > 0);
    };

    const stop = () => {
        if (timer) clearTimeout(timer);
        if (uiTimer) clearInterval(uiTimer);
        timer = null;
        uiTimer = null;

        const previous = current;
        current = null;
        for (const [key, fn] of Object.entries(original)) runStore[key] = fn;
        dispatchRemoval(previous);
        UI.destroy();
        delete window[LOCK];
        console.log("[Multi Game Presence] Stopped and restored original RunningGameStore.");
    };

    window[LOCK] = {
        stop,
        next: () => next(true),
        previous,
        togglePlayback,
        applySettings,
        games: GAMES,
        get current() { return current?.name ?? null; }
    };

    window.addEventListener("pagehide", stop, { once: true });
    activate(GAMES[index]);
    scheduleNext();
    UI.setPlayback(settings.rotation, index > 0);
    uiTimer = setInterval(() => UI.tick(), 1000);

    console.log(`[Multi Game Presence] Loaded ${GAMES.length} games. Manual skip: window.__multiGamePresence.next()`);
})();
