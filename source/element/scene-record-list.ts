'use strict';

declare const Editor: any;

const { readFileSync } = require('fs');
const { join, basename, extname } = require('path');

const STYLE = `<style>${readFileSync(join(__dirname, '../../statics/element/style.css'), 'utf8')}</style>`;
let HTML = `${readFileSync(join(__dirname, '../../statics/element/panel.html'), 'utf8')}`;

let onSceneReady: any;
let onAssetDbReady: any;
let onAssetChange: any;
class SceneHistroy extends HTMLElement {

    $content: HTMLElement | undefined;

    _list: Map<string, HTMLElement> = new Map();
    _lastTarget: HTMLElement | undefined;
    _noChange = false;
    _init = false;

    constructor () {
        super();
        this.attachShadow({
            mode: 'open'
        });

        if (!this.shadowRoot) {
            return;
        }
        HTML = HTML.replace(/\{\{t\(\'(\S+)\'\)\}\}/g, (str, subStr) => {
            return Editor.I18n.t(`scene-record.${subStr}`);
        });
        this.shadowRoot.innerHTML = `${STYLE}${HTML}`;
        this.$content = this.shadowRoot.querySelector('.content') as HTMLElement;
    }

    async addItem (uuid: string) {
        let url = await Editor.Message.request('asset-db', 'query-url', uuid);
        if (!url) {
            console.log(`Can't get the url by ${uuid}`);
            return;
        }
        const div: HTMLElement = document.createElement('div');
        div.className = 'item';
        // @ts-ignore
        div.uuid = uuid;
        const icon: any = document.createElement('ui-icon');
        div.appendChild(icon);
        if (url.endsWith('.scene')) {
            icon.value = 'scene';
        }
        else if (url.endsWith('.prefab')) {
            icon.value = 'prefab';
        }
        icon.setAttribute('color', '#f0ad4e');
        const label: any = document.createElement('ui-label');
        label.value = basename(url);
        div.appendChild(label);
        const icon_del = document.createElement('ui-icon');
        icon_del.setAttribute('value', 'del');
        icon_del.className = 'del';
        div.appendChild(icon_del);
        if (this.$content) {
            this.$content.insertBefore(div, this.$content.firstChild);
        }
        icon_del.addEventListener('click', this._onDel.bind(this, div));
        div.addEventListener('mousedown', this._onMouseDown.bind(this));
        this._list.set(uuid, label);
        return div;
    }

    async onSceneReady(uuid: string) {
        if (this._noChange) {
            this._noChange = false;
            return;
        }
        let list: string[] = await Editor.Profile.getConfig('scene-record', 'list') || [];
        const index = list.indexOf(uuid);
        if (index !== -1) {
            list.splice(index, 1);
            const label = this._list.get(uuid);
            if (this.$content && label && label.parentElement) {
                this.$content.removeChild(label.parentElement);
            }
        }
        list.push(uuid);
        const item = await this.addItem(uuid);
        await Editor.Profile.setConfig('scene-record', 'list', list);
        this.changeState(item);
        this.parentElement.scrollTop = 0;
    }

    async onAssetChange(uuid: string) {
        let item: any = this._list.get(uuid);
        if (item) {
            let url = await Editor.Message.request('asset-db', 'query-url', uuid);
            item.value = basename(url);
        }
    }

    async onAssetDbReady() {
        await this.updateList();
    }

    async connectedCallback() {
        await this.updateList();
        onSceneReady = this.onSceneReady.bind(this);
        Editor.Message.addBroadcastListener(`scene:ready`, onSceneReady);
        onAssetDbReady = this.onAssetDbReady.bind(this);
        Editor.Message.addBroadcastListener('asset-db:ready', onAssetDbReady);
        onAssetChange = this.onAssetChange.bind(this);
        Editor.Message.addBroadcastListener('asset-db:asset-change', onAssetChange);
    }

    disconnectedCallback() {
        Editor.Message.removeBroadcastListener(`scene:ready`, onSceneReady);
        Editor.Message.removeBroadcastListener(`scene:ready`, onAssetDbReady);
        Editor.Message.removeBroadcastListener('asset-db:asset-change', onAssetChange);
    }

    async _onDel(div: HTMLElement, event: Event) {
        if (this.$content) {
            this.$content.removeChild(div);
            // @ts-ignore
            const uuid = div.uuid;
            this._list.delete(uuid);
            let list: string[] = await Editor.Profile.getConfig('scene-record', 'list') || [];
            const index = list.indexOf(uuid);
            if (index !== -1) {
                list.splice(index, 1);
            }
            await Editor.Profile.setConfig('scene-record', 'list', list);
        }
    }

    _onMouseDown(event: Event) {
        // @ts-ignore
        if (event.target.className === 'del') {
            return;
        }
        // @ts-ignore
        let div: HTMLDivElement = event.target.className === 'item' ? event.target : event.target.parentElement;
        div.classList.toggle('press');
        const mouseUp = async () => {
            this._noChange = true;
            // @ts-ignore
            await Editor.Message.send('scene', 'open-scene', div.uuid);
            div.classList.toggle('press');
            document.removeEventListener('mouseup', mouseUp, true);
            this.changeState(div);
        };
        document.addEventListener('mouseup', mouseUp, true);
    }

    async updateList() {
        if (this._init) {
            return;
        }
        this._init = true;
        const list = await Editor.Profile.getConfig('scene-record', 'list') || [];
        for (let uuid of list) {
            await this.addItem(uuid);
        }
    }

    changeState(div: HTMLElement) {
        if (this._lastTarget) {
            this._lastTarget.classList.toggle('select');
        }
        div.classList.toggle('select');
        this._lastTarget = div;
    }
}

module.exports = SceneHistroy;

window.customElements.define('scene-record-list', SceneHistroy);
