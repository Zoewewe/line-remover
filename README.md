# Line Remover (Obsidian Plugin)

Adds a scissors icon to the left ribbon. Click it and it removes every line
in the currently open note that starts with a text snippet you configure.

- **Line prefix to remove** — any line whose content (after ignoring
  leading whitespace) starts with this text gets deleted. Example:
  `<!--SR:!` would delete every Spaced Repetition scheduling comment line.

Matching is case-sensitive and only checks the beginning of the line — the
rest of the line's content doesn't matter.

Also adds a command palette entry: "Remove lines (per settings)", with a
default hotkey of **Shift + Backspace**.

## Change the hotkey

Obsidian handles hotkeys through its own Hotkeys settings pane, not through
the plugin itself. To change it:

1. Settings → Hotkeys.
2. Search for "Line Remover" (or "Remove lines").
3. Click the existing Shift+Backspace binding to remove it, then click the
   `+` to record whatever key combo you want instead.

If Shift+Backspace conflicts with another command on your system, Obsidian
will flag it in that same pane — just reassign it there.

## Configure

Settings → Community plugins → Line Remover (click the gear icon next to
it, or find "Line Remover Settings" in the left sidebar under plugin
settings). Set your **Line prefix to remove** value there — it's saved
automatically and used every time you click the ribbon icon or run the
command.

## Install (manual, no build step needed)

1. In your vault, go to `.obsidian/plugins/` (enable "Show hidden files"
   in your file manager if you don't see the `.obsidian` folder).
2. Create a new folder called `line-remover` inside `plugins/`.
3. Copy `manifest.json` and `main.js` from this package into that folder.
4. In Obsidian: Settings → Community plugins → make sure "Restricted mode"
   is off → find "Line Remover" in the list → toggle it on.
5. You should now see a scissors icon in the left ribbon, and a "Line
   Remover" entry under plugin settings where you can set the prefix.

No npm install or build required — this plugin is plain JS that Obsidian
loads directly.

## Upgrading from the interval-based version (1.x)

The settings schema changed: `startLine` and `interval` are no longer used,
replaced by a single `prefix` string. After updating `main.js`, open the
plugin settings and set your prefix (e.g. `<!--SR:!`) — old settings data
is simply ignored.

## Uninstall

Delete the `line-remover` folder from `.obsidian/plugins/` and reload
Obsidian (or disable it first from Settings → Community plugins).
