# Discord Game Presence

An unofficial Discord desktop presence experiment forked from [everyoneexe/discord-game-badge-presence](https://github.com/everyoneexe/discord-game-badge-presence). This fork is maintained as `game-presence.js`.

The current fork-specific interface, game rotation, playback controls, configuration work were created and integrated with assistance from OpenAI Codex. The upstream project remains credited for the original foundation.

## Important educational disclaimer

**This project is provided strictly for education, research, and experimentation. We do not endorse, encourage, or condone using it to manipulate Discord badges, activity history, account metrics, or any platform feature.**

This is not an official Discord feature or API. It modifies undocumented in-memory Discord client internals and may violate Discord's Terms of Service. Running it can cause activity removal, badge loss, client instability, warnings, suspension, or permanent account termination. It is not guaranteed to be safe, undetectable, or compatible with any account.

Use it only where you accept those risks. The authors and contributors are not responsible for bans, suspensions, lost data, purchases, progress, or any other consequence. By using, modifying, or distributing this project, you accept full responsibility for your actions.

## Fork attribution

This repository is a modified continuation of [everyoneexe/discord-game-badge-presence](https://github.com/everyoneexe/discord-game-badge-presence). Please consult the upstream project for its original context and licensing information.

## Features

- Main script: `game-presence.js` (~120 KB, down from ~980 KB).
- Compact embedded catalogue: 1 846 games stored as `[name, discord_application_id]`.
- Large shuffled catalogue of popular games, including Minecraft, Fortnite, Roblox, CS:GO, GTA, Valorant, League of Legends, and many more.
- Official game icons loaded from Discord's own CDN (`/applications/{id}/rpc`), with an emoji fallback.
- Search panel to pick any game directly (ignores accents and punctuation).
- Purple interface using `#7d54d9`, isolated in a Shadow DOM so its styles never leak into Discord.
- Playback controls: previous, pause/resume, and next (wraps around the list).
- Pause keeps the current game active indefinitely.
- Configurable minimum and maximum rotation intervals.
- Drag the panel and snap it to any screen corner.
- Pause state, minimized state, corner and intervals are remembered between runs.
- Clean shutdown that restores patched store methods. Discord is only patched once the panel is ready.

## Requirements

- Discord desktop, not Discord Web.
- Access to the Discord developer console.
- A Discord version exposing the required internal Webpack modules.

Discord can change these undocumented internals at any time. Compatibility is not guaranteed for Discord updates, Vencord, Flatpak, Snap, or other modified clients.

## Quick start

1. Open Discord desktop.
2. Open the developer console.
3. Open `game-presence.js`.
4. Copy and execute the complete file in the console.
5. Use the popup controls to navigate, pause, resume, or change intervals.

Run only one copy at a time. To stop an existing instance:

```js
window.__gamePresence.stop()
```

## Controls

- `⏮ Previous`: go to the previous game (wraps to the end of the list).
- `⏸ Pause`: keep the current game active forever and stop the rotation timer.
- `▶ Play`: resume automatic rotation.
- `⏭ Next`: advance to the next game.
- `🔍 Search`: type a game name, press Enter or click a result to play it.
- `⚙ Settings`: change the minimum and maximum interval (in minutes).
- `_ Minimize`: collapse the panel into a small round button.
- Drag the header: move the panel and snap it to one of four corners.
- `✕ Stop`: restore Discord's original in-memory store methods and remove the synthetic activity.

## Console commands

```js
window.__gamePresence.next()
window.__gamePresence.previous()
window.__gamePresence.play("minecraft")
window.__gamePresence.togglePause()
window.__gamePresence.setIntervals(20, 40)
window.__gamePresence.current
window.__gamePresence.games
window.__gamePresence.stop()
```

## How it works

The script locates Discord's Webpack module registry, resolves `RunningGameStore` and the Flux dispatcher, and injects one synthetic running-game record. It dispatches local game-state events while changing the displayed game according to the playback state. Each activity includes the matching catalogue entry's public `application_id` when Discord accepts it.

It does not launch games, modify Steam playtime, attach to game processes, access Discord tokens, read passwords, or send project telemetry to an external server. Synthetic executable paths are metadata only.

## Catalogue data and Rich Presence

The embedded catalogue only keeps the fields the script actually uses:

- the game name;
- `discord_application_id`: the public Discord application ID associated with the game;

The source catalogue is [this public list](https://gist.github.com/1271/cf4b6a3b562532988fa5b0688102b2cc). The local Rich Presence payload sends the game name, type, timestamps, and matching `application_id`.

## Limitations

- Discord displays one primary activity, not every game simultaneously.
- Badge progression and account recognition are not guaranteed.
- Discord restarts and reloads clear the in-memory changes.
- Game icons come from Discord's public application endpoint; if it fails, an emoji is shown instead.
- Discord may change internal modules without notice.

## Troubleshooting

If the activity is not visible, verify that Discord activity status is enabled, only one script copy is running, and the developer console shows no error. Stop the script and restart Discord before retrying.

If the Webpack registry or game store cannot be found, the current Discord build may not expose the expected undocumented modules.

## Privacy

The script does not intentionally collect or transmit tokens, passwords, session storage, or telemetry. Always inspect the source before running code in a privileged application console.

## License and trademarks

This project is independent and is not affiliated with, endorsed by, or sponsored by Discord, Valve, Steam, Vencord, or any referenced game publisher. Discord and all game names and logos are trademarks of their respective owners.

This project is provided **AS IS**, without warranties or guarantees. The educational disclaimer above applies to all use of this repository.
