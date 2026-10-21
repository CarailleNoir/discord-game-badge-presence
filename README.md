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

- Main script: `game-presence.js`.
- Large shuffled catalogue of popular games, including Minecraft, Fortnite, Roblox, CS2, GTA, Valorant, League of Legends, and many more.
- Purple interface using `#7d54d9`.
- Playback controls: previous, pause/resume, and next.
- Pause keeps the current game active indefinitely.
- Configurable minimum and maximum rotation intervals.
- Drag the panel and snap it to any screen corner.
- Game-logo loading with a safe fallback when an image is unavailable.
- Linux and Windows executable metadata selection.
- Clean shutdown that restores patched store methods.

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
window.__multiGamePresence.stop()
```

## Controls

- `Previous`: go to the previous game; disabled at the beginning of the shuffled list.
- `Pause`: keep the current game active forever and stop the rotation timer.
- `Play`: resume automatic rotation.
- `Next`: advance to the next game.
- `Settings`: change the minimum and maximum interval.
- Drag the header: move the panel and snap it to one of four corners.
- `Stop`: restore Discord's original in-memory store methods and remove the synthetic activity.

## Console commands

```js
window.__multiGamePresence.next()
window.__multiGamePresence.current
window.__multiGamePresence.games
window.__multiGamePresence.stop()
```

## How it works

The script locates Discord's Webpack module registry, resolves `RunningGameStore` and the Flux dispatcher, and injects one synthetic running-game record. It dispatches local game-state events while changing the displayed game according to the playback state.

It does not launch games, modify Steam playtime, attach to game processes, access Discord tokens, read passwords, or send project telemetry to an external server. Synthetic executable paths are metadata only.

## Limitations

- Discord displays one primary activity, not every game simultaneously.
- Badge progression and account recognition are not guaranteed.
- Discord restarts and reloads clear the in-memory changes.
- External logo URLs may be blocked by Discord's content-security policy; the interface falls back automatically.
- Discord may change internal modules without notice.

## Troubleshooting

If the activity is not visible, verify that Discord activity status is enabled, only one script copy is running, and the developer console shows no error. Stop the script and restart Discord before retrying.

If the Webpack registry or game store cannot be found, the current Discord build may not expose the expected undocumented modules.

## Privacy

The script does not intentionally collect or transmit tokens, passwords, session storage, or telemetry. Always inspect the source before running code in a privileged application console.

## License and trademarks

This project is independent and is not affiliated with, endorsed by, or sponsored by Discord, Valve, Steam, Vencord, or any referenced game publisher. Discord and all game names and logos are trademarks of their respective owners.

This project is provided **AS IS**, without warranties or guarantees. The educational disclaimer above applies to all use of this repository.
