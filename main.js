const { Plugin, Notice, MarkdownView, PluginSettingTab, Setting } = require("obsidian");

const DEFAULT_SETTINGS = {
  prefix: "<!--SR:!", // any line starting with this text gets removed
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
      .setName("Line prefix to remove")
      .setDesc(
        'Any line that starts with this text (leading whitespace is ignored when matching) will be deleted. Example: "<!--SR:!"'
      )
      .addText((text) =>
        text
          .setPlaceholder("<!--SR:!")
          .setValue(this.plugin.settings.prefix)
          .onChange(async (value) => {
            this.plugin.settings.prefix = value;
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

    const prefix = this.settings.prefix;
    if (!prefix) {
      new Notice("Set a line prefix in Line Remover settings first.");
      return;
    }

    const editor = view.editor;
    const lines = editor.getValue().split("\n");

    let removedCount = 0;
    const kept = lines.filter((line) => {
      const shouldRemove = line.trimStart().startsWith(prefix);
      if (shouldRemove) removedCount++;
      return !shouldRemove;
    });

    editor.setValue(kept.join("\n"));
    new Notice(`Removed ${removedCount} line(s) starting with "${prefix}".`);
  }
};
