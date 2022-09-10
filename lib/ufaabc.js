'use babel';

import UfaabcView from './ufaabc-view';
import { CompositeDisposable } from 'atom';

export default {

  ufaabcView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ufaabcView = new UfaabcView(state.ufaabcViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ufaabcView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ufaabc:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ufaabcView.destroy();
  },

  serialize() {
    return {
      ufaabcViewState: this.ufaabcView.serialize()
    };
  },

  toggle() {
    console.log('Ufaabc was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
