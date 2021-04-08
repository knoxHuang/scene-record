
declare const Editor: any;

import '../element/scene-record-list';

const TAG_NAME = 'scene-record-list';

function initSceneRecordList(root: HTMLDivElement) {
    let sceneRecordList;
    let elements = root.getElementsByTagName(TAG_NAME);
    if (elements.length === 0) {
        sceneRecordList = elements[0];
        if (!sceneRecordList) {
            sceneRecordList = document.createElement(TAG_NAME);
            root.appendChild(sceneRecordList);
        }
    }
    else {
        sceneRecordList = elements[0];
    }
    return sceneRecordList;
}

exports.toolbars = [
    {
        position: 'right',
        template: `
            <style>
                .icon.enabled {
                    opacity: 0.7;
                    color: #f49a00;
                }
                .root {
                    z-index: 998;
                    position: absolute;
                    right: -300px;
                    height: 95%;
                    overflow: auto;
                    width: 250px;
                    border: 2px solid var(--color-normal-border);
                    background-color: var(--color-normal-fill-emphasis);
                }
                .root.hide {
                    transition-property: right;
                    transition-duration: 0.4s;
                    right: -300px;
                }
                .root.show {
                    transition-property: right;
                    transition-duration: 0.4s;
                    right: 0px;
                }
            </style>
               
            <ui-icon value='list' class="icon" tooltip="i18n:scene-history.show_tips"></ui-icon>
            <div class="root"></div>
        `,
        $: {
            icon: '.icon',
            root: '.root',
        },

        async ready($window: HTMLDivElement) {
            initSceneRecordList(this.$.root);
            const $icon = this.$.icon as HTMLImageElement;
            const $root = this.$.root as HTMLDivElement;
            $root.className = 'root hide';
            this.onConfirm = async () => {
                const enabled = $icon.classList.toggle('enabled');
                if (enabled) {
                    $root.className = 'root show';
                }
                else {
                    $root.className = 'root hide';
                }
            };
            $icon.addEventListener('click', this.onConfirm);
        },
        close () {
            this.$.icon.removeEventListener('click', this.onConfirm);
        }
    }
];
