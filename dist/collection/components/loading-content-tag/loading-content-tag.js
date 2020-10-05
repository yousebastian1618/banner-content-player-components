export class LoadingContentTag {
    constructor() {
        this.current = 0;
        this.total = 0;
        this.containerWidth = 0;
        this.containerHeight = 0;
        this.changeState = (event) => {
            let { state, progress, current, total, containerWidth, containerHeight, } = event.detail;
            this.state = state;
            this.progress = progress;
            this.current = current;
            this.total = total;
            if (containerWidth !== undefined) {
                this.containerWidth = containerWidth;
            }
            if (containerHeight !== undefined) {
                this.containerHeight = containerHeight;
            }
        };
    }
    componentDidLoad() {
        window.addEventListener("CONTENT_STATUS", this.changeState);
    }
    render() {
        let min = this.containerWidth < this.containerHeight
            ? this.containerWidth
            : this.containerHeight;
        return (h("div", { class: "loading-content" },
            h("div", { class: "loader-wrapper", style: {
                    display: this.state === "loading" ? "block" : "none",
                    width: `${this.containerWidth}px`,
                    height: `${this.containerHeight}px`,
                } },
                h("div", { class: "lds-ellipsis", style: { width: `${min * 0.9}px`, height: `${min * 0.9}px` } },
                    h("div", null),
                    h("div", null),
                    h("div", null),
                    h("div", null))),
            h("div", { class: "progress-bar-wrapper", style: { display: this.state === "downloading" ? "flex" : "none" } },
                h("span", { style: {
                        "font-size": `${this.containerWidth * 0.8 * 0.041 * 0.6}px`,
                    } },
                    "Downloading contents ",
                    `(${this.current}/${this.total})`,
                    " "),
                h("br", null),
                h("progress-bar-tag", { progress: this.progress, visible: true, "base-color": "#00ACC2", "secondary-color": "#407C84", "container-width": this.containerWidth })),
            h("content-player-tag", { style: { display: this.state === "playing" ? "block" : "none" } })));
    }
    static get is() { return "loading-content-tag"; }
    static get properties() { return {
        "containerHeight": {
            "type": Number,
            "attr": "container-height",
            "mutable": true
        },
        "containerWidth": {
            "type": Number,
            "attr": "container-width",
            "mutable": true
        },
        "current": {
            "type": Number,
            "attr": "current",
            "mutable": true
        },
        "progress": {
            "type": Number,
            "attr": "progress",
            "mutable": true
        },
        "state": {
            "type": String,
            "attr": "state",
            "mutable": true
        },
        "total": {
            "type": Number,
            "attr": "total",
            "mutable": true
        },
        "visible": {
            "type": Boolean,
            "attr": "visible",
            "mutable": true
        }
    }; }
    static get style() { return "/**style-placeholder:loading-content-tag:**/"; }
}
