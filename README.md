# Line Remover (Obsidian Plugin)

One job: delete every line in the currently open note that contains a
piece of text you type into the settings — anywhere in the line, not just
at the start.

## Configure

Settings → Community plugins → Line Remover → set **Text to search for**
(e.g. `<!--SR:!`). This is saved automatically.

## Run it

Either:
- Click the scissors icon in the left ribbon, or
- Run the command "Delete lines containing search text" from the command
  palette, or
- Use the hotkey **Shift + Backspace** (change it in Settings → Hotkeys
  if it conflicts with anything).

Every line containing your search text anywhere in it gets deleted from
the note. A notice at the bottom tells you how many lines were removed.

## Install (manual, no build step needed)

1. In your vault, go to `.obsidian/plugins/` (enable "Show hidden files"
   in your file manager if you don't see the `.obsidian` folder).
2. Create a folder called `line-remover` inside `plugins/` (or reuse the
   existing one if you're upgrading).
3. Copy `manifest.json`, `main.js`, and `data.json` from this package
   into that folder, overwriting what's there.
4. In Obsidian: Settings → Community plugins → make sure "Restricted
   mode" is off → find "Line Remover" in the list → toggle it on (or
   reload Obsidian if it was already enabled).
5. Open the plugin settings and confirm your search text is set.

No npm install or build required — this plugin is plain JS that Obsidian
loads directly.

## Uninstall

Delete the `line-remover` folder from `.obsidian/plugins/` and reload
Obsidian (or disable it first from Settings → Community plugins).
