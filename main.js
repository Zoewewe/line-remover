const { Plugin, Notice, MarkdownView, PluginSettingTab, Setting } = require("obsidian");

const DEFAULT_SETTINGS = {
  searchText: "<!--SR:!", // any line CONTAINING this text gets deleted
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
      .setName("Text to search for")
      .setDesc(
        "Any line containing this text ANYWHERE in it will be deleted when you run the command. Example: \"<!--SR:!\""
      )
      .addText((text) =>
        text
          .setPlaceholder("<!--SR:!")
          .setValue(this.plugin.settings.searchText)
          .onChange(async (value) => {
            this.plugin.settings.searchText = value;
            await this.plugin.saveSettings();
          })
      );
  }
}

module.exports = class LineRemoverPlugin extends Plugin {
  async onload() {
    await this.loadSettings();

    this.addRibbonIcon("scissors", "Delete lines containing search text", () => {
      this.removeLines();
    });

    this.addCommand({
      id: "remove-lines",
      name: "Delete lines containing search text",
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

    const searchText = this.settings.searchText;
    if (!searchText) {
      new Notice("Set the search text in Line Remover settings first.");
      return;
    }

    const editor = view.editor;
    const lines = editor.getValue().split("\n");

    let removedCount = 0;
    const kept = lines.filter((line) => {
      const shouldRemove = line.includes(searchText);
      if (shouldRemove) removedCount++;
      return !shouldRemove;
    });

    editor.setValue(kept.join("\n"));
    new Notice(`Removed ${removedCount} line(s) containing "${searchText}".`);
  }
};
