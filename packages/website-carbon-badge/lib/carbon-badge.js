import CarbonMeter from "website-carbon-meter";

/**
 * @tag carbon-badge
 * @tagname carbon-badge
 */
export class CarbonBadge extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.theme = 'light';
        this.link = 'https://bluehands.de';
        this.label = 'Emissions'
        this.renderTooltip = (total, lastRequest) => {
            return `This is the total amount of CO2 emissions produced by this website.`;
        }
        this.carbonData = {
            total: 0,
            lastRequest: 0
        }
        this.meter = new CarbonMeter();
    }

    static get observedAttributes() {
        return ['theme', 'link', 'label', 'renderTooltip'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
        if (name === 'theme') {
            this.theme = newValue;
            this.updateView();
        }
        if (name === 'link') {
            this.link = newValue;
            this.updateView();
        }
        if (name === 'label') {
            this.label = newValue;
            this.updateView();
        }
        if (name === 'renderTooltip') {
            this.renderTooltip = newValue;
            this.updateView();
        }
    }

    connectedCallback() {
        this.meter.onMetering((total, lastRequest) => {
            this.carbonData = {
                total: total.toFixed(3),
                lastRequest: lastRequest.toFixed(3)
            }
            this.updateView();
        })
        this.updateView();
        this.meter.start();
    }

    updateView = () => {
        this.shadowRoot.innerHTML = this.render(this.carbonData.total, this.carbonData.lastRequest);
    }

    /**
     * Renders the HTML content of the component.
     * @param {number} total - The session carbon data.
     * @param {number} lastRequest - The request carbon data.
     * @returns {string} The HTML content.
     */
    render = (total, lastRequest) => {
        return `
        <style>
            .badge-container {
                display: flex;
                flex-direction: column;
            }
            .badge {
                display: flex;
                border-radius: 8px;
                overflow: hidden;
                font-family: Arial, sans-serif;
            }
            .badge + .badge {
                margin-top: 5px; /* Add margin between badges */
            }
            .key {
                padding: 5px 10px;
                position: relative;
            }
            .value {
                padding: 5px 10px;
                flex-grow: 1;
                max-width: 100%;
            }
            .light-theme .key {
                background-color: #f0f0f0;
                color: #333;
            }
            .light-theme .value {
                background-color: #fff;
                color: #333;
            }
            .dark-theme .key {
                background-color: #333;
                color: #fff;
            }
            .dark-theme .value {
                background-color: #555;
                color: #fff;
            }
            .tooltip {
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background-color: #333;
                color: #fff;
                padding: 5px;
                border-radius: 4px;
                white-space: nowrap;
                z-index: 10;
                opacity: 0;
                transition: opacity 0.3s;
            }
            .key:hover .tooltip {
                opacity: 1;
            }
            .key a {
                text-decoration: none;
                color: inherit;
            }
        </style>
        <div class="badge-container ${this.theme}-theme">
            <div class="badge">
                <div class="key" title="${this.renderTooltip(total, lastRequest)}">
                    <a href="${this.link}">${this.label}</a>
                </div>
                <div class="value">${total}g</div>
            </div>

        </div>
        `;
    }
}

customElements.define('carbon-badge', CarbonBadge);