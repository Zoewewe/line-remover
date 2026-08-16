# Line Remover (Obsidian Plugin)

Adds a scissors icon to the left ribbon. Click it and it removes lines from
the currently open note based on two settings you configure yourself:

- **Start line** — which line to start counting from (1 = first line).
- **Remove every Nth line** — e.g. set to 3 and it removes every 3rd line
  after the start line.

Example: Start line = 1, interval = 3 → keeps line 1, removes line 4, keeps
2 and 3, removes line 7, and so on (every 3rd line counting from the start
line is removed; the start line itself is always kept).

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
settings). Set your **Start line** and **Remove every Nth line** values
there — they're saved automatically and used every time you click the
ribbon icon or run the command.

## Install (manual, no build step needed)

1. In your vault, go to `.obsidian/plugins/` (enable "Show hidden files"
   in your file manager if you don't see the `.obsidian` folder).
2. Create a new folder called `line-remover` inside `plugins/`.
3. Copy `manifest.json` and `main.js` from this package into that folder.
4. In Obsidian: Settings → Community plugins → make sure "Restricted mode"
   is off → find "Line Remover" in the list → toggle it on.
5. You should now see a scissors icon in the left ribbon, and a "Line
   Remover" entry under plugin settings where you can set Start line and
   interval.

No npm install or build required — this plugin is plain JS that Obsidian
loads directly.

## Uninstall

Delete the `line-remover` folder from `.obsidian/plugins/` and reload
Obsidian (or disable it first from Settings → Community plugins).
