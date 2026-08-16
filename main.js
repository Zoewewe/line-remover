const { Plugin, Notice, MarkdownView, PluginSettingTab, Setting } = require("obsidian");

const DEFAULT_SETTINGS = {
  startLine: 1,   // 1-indexed line to start counting from
  interval: 3,    // remove every Nth line counting from startLine
};

class LineRemoverSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "Line Remover Settings" });

    new Setting(containerEl)
      .setName("Start line")
      .setDesc("Line number to start counting from (1 = first line of the note).")
      .addText((text) =>
        text
          .setPlaceholder("1")
          .setValue(String(this.plugin.settings.startLine))
          .onChange(async (value) => {
            const n = parseInt(value, 10);
            this.plugin.settings.startLine = isNaN(n) || n < 1 ? 1 : n;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Remove every Nth line")
      .setDesc(
        "E.g. 3 removes every 3rd line counting from the start line (the start line itself is kept, then every 3rd line after it is removed)."
      )
      .addText((text) =>
        text
          .setPlaceholder("3")
          .setValue(String(this.plugin.settings.interval))
          .onChange(async (value) => {
            const n = parseInt(value, 10);
            this.plugin.settings.interval = isNaN(n) || n < 1 ? 1 : n;
            await this.plugin.saveSettings();
          })
      );
  }
}

module.exports = class LineRemoverPlugin extends Plugin {
  async onload() {
    await this.loadSettings();

    this.addRibbonIcon("scissors", "Line Remover: remove lines", () => {
      this.removeLines();
    });

    this.addCommand({
      id: "remove-lines",
      name: "Remove lines (per settings)",
      hotkeys: [{ modifiers: ["Shift"], key: "Backspace" }],
      callback: () => this.removeLines(),
    });

    this.addSettingTab(new LineRemoverSettingTab(this.app, this));
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  removeLines() {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view) {
      new Notice("Open a note first.");
      return;
    }

    const { startLine, interval } = this.settings;
    const editor = view.editor;
    const lines = editor.getValue().split("\n");

    let removedCount = 0;
    const kept = lines.filter((_, idx) => {
      const lineNumber = idx + 1; // 1-indexed
      if (lineNumber < startLine) return true; // untouched before start line
      const offset = lineNumber - startLine; // 0 at startLine
      const shouldRemove = offset % interval === 0 && offset !== 0;
      // offset === 0 is the start line itself -> always kept
      if (shouldRemove) removedCount++;
      return !shouldRemove;
    });

    editor.setValue(kept.join("\n"));
    new Notice(
      `Removed ${removedCount} line(s) (every ${interval} line(s) starting after line ${startLine}).`
    );
  }
};
