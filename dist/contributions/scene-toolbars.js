"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../element/scene-record-list");
const TAG_NAME = 'scene-record-list';
function initSceneRecordList(root) {
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
        async ready($window) {
            initSceneRecordList(this.$.root);
            const $icon = this.$.icon;
            const $root = this.$.root;
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
        close() {
            this.$.icon.removeEventListener('click', this.onConfirm);
        }
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NlbmUtdG9vbGJhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zb3VyY2UvY29udHJpYnV0aW9ucy9zY2VuZS10b29sYmFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLHdDQUFzQztBQUV0QyxNQUFNLFFBQVEsR0FBRyxtQkFBbUIsQ0FBQztBQUVyQyxTQUFTLG1CQUFtQixDQUFDLElBQW9CO0lBQzdDLElBQUksZUFBZSxDQUFDO0lBQ3BCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3ZCLGVBQWUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUNsQixlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ3JDO0tBQ0o7U0FDSTtRQUNELGVBQWUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakM7SUFDRCxPQUFPLGVBQWUsQ0FBQztBQUMzQixDQUFDO0FBRUQsT0FBTyxDQUFDLFFBQVEsR0FBRztJQUNmO1FBQ0ksUUFBUSxFQUFFLE9BQU87UUFDakIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0E4QlQ7UUFDRCxDQUFDLEVBQUU7WUFDQyxJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSxPQUFPO1NBQ2hCO1FBRUQsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUF1QjtZQUMvQixtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBd0IsQ0FBQztZQUM5QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQXNCLENBQUM7WUFDNUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7WUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLElBQUksRUFBRTtnQkFDeEIsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2xELElBQUksT0FBTyxFQUFFO29CQUNULEtBQUssQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO2lCQUNqQztxQkFDSTtvQkFDRCxLQUFLLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQztpQkFDakM7WUFDTCxDQUFDLENBQUM7WUFDRixLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBQ0QsS0FBSztZQUNELElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0QsQ0FBQztLQUNKO0NBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuZGVjbGFyZSBjb25zdCBFZGl0b3I6IGFueTtcblxuaW1wb3J0ICcuLi9lbGVtZW50L3NjZW5lLXJlY29yZC1saXN0JztcblxuY29uc3QgVEFHX05BTUUgPSAnc2NlbmUtcmVjb3JkLWxpc3QnO1xuXG5mdW5jdGlvbiBpbml0U2NlbmVSZWNvcmRMaXN0KHJvb3Q6IEhUTUxEaXZFbGVtZW50KSB7XG4gICAgbGV0IHNjZW5lUmVjb3JkTGlzdDtcbiAgICBsZXQgZWxlbWVudHMgPSByb290LmdldEVsZW1lbnRzQnlUYWdOYW1lKFRBR19OQU1FKTtcbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHNjZW5lUmVjb3JkTGlzdCA9IGVsZW1lbnRzWzBdO1xuICAgICAgICBpZiAoIXNjZW5lUmVjb3JkTGlzdCkge1xuICAgICAgICAgICAgc2NlbmVSZWNvcmRMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChUQUdfTkFNRSk7XG4gICAgICAgICAgICByb290LmFwcGVuZENoaWxkKHNjZW5lUmVjb3JkTGlzdCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHNjZW5lUmVjb3JkTGlzdCA9IGVsZW1lbnRzWzBdO1xuICAgIH1cbiAgICByZXR1cm4gc2NlbmVSZWNvcmRMaXN0O1xufVxuXG5leHBvcnRzLnRvb2xiYXJzID0gW1xuICAgIHtcbiAgICAgICAgcG9zaXRpb246ICdyaWdodCcsXG4gICAgICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICA8c3R5bGU+XG4gICAgICAgICAgICAgICAgLmljb24uZW5hYmxlZCB7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuNztcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICNmNDlhMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC5yb290IHtcbiAgICAgICAgICAgICAgICAgICAgei1pbmRleDogOTk4O1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAtMzAwcHg7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogOTUlO1xuICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzogYXV0bztcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDI1MHB4O1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1jb2xvci1ub3JtYWwtYm9yZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3Itbm9ybWFsLWZpbGwtZW1waGFzaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAucm9vdC5oaWRlIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogcmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24tZHVyYXRpb246IDAuNHM7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAtMzAwcHg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC5yb290LnNob3cge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiByaWdodDtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC40cztcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDBweDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L3N0eWxlPlxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICA8dWktaWNvbiB2YWx1ZT0nbGlzdCcgY2xhc3M9XCJpY29uXCIgdG9vbHRpcD1cImkxOG46c2NlbmUtaGlzdG9yeS5zaG93X3RpcHNcIj48L3VpLWljb24+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm9vdFwiPjwvZGl2PlxuICAgICAgICBgLFxuICAgICAgICAkOiB7XG4gICAgICAgICAgICBpY29uOiAnLmljb24nLFxuICAgICAgICAgICAgcm9vdDogJy5yb290JyxcbiAgICAgICAgfSxcblxuICAgICAgICBhc3luYyByZWFkeSgkd2luZG93OiBIVE1MRGl2RWxlbWVudCkge1xuICAgICAgICAgICAgaW5pdFNjZW5lUmVjb3JkTGlzdCh0aGlzLiQucm9vdCk7XG4gICAgICAgICAgICBjb25zdCAkaWNvbiA9IHRoaXMuJC5pY29uIGFzIEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCAkcm9vdCA9IHRoaXMuJC5yb290IGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICAgICAgJHJvb3QuY2xhc3NOYW1lID0gJ3Jvb3QgaGlkZSc7XG4gICAgICAgICAgICB0aGlzLm9uQ29uZmlybSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmFibGVkID0gJGljb24uY2xhc3NMaXN0LnRvZ2dsZSgnZW5hYmxlZCcpO1xuICAgICAgICAgICAgICAgIGlmIChlbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICRyb290LmNsYXNzTmFtZSA9ICdyb290IHNob3cnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHJvb3QuY2xhc3NOYW1lID0gJ3Jvb3QgaGlkZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICRpY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNvbmZpcm0pO1xuICAgICAgICB9LFxuICAgICAgICBjbG9zZSAoKSB7XG4gICAgICAgICAgICB0aGlzLiQuaWNvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Db25maXJtKTtcbiAgICAgICAgfVxuICAgIH1cbl07XG4iXX0=