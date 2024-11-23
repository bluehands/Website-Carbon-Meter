import CarbonMeter from 'website-carbon-meter';

/**
 * @tag carbon-meter-badge
 * @tagname carbon-meter-badge
 */
export class CarbonMeterBadge extends HTMLElement {

    location: "de";
    theme: "light" | "dark";
    link: string;
    label: string;
    labelDarkTheme: string;
    labelLightTheme: string;
    appearance: "compact" | "inherit"
    carbonData: {
        total: string,
        lastRequest: string
    }
    meter: CarbonMeter;
    tooltip: string;
    numberFormat: Intl.NumberFormat;


    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.location = 'de';
        this.theme = 'light';
        this.appearance = 'compact'
        this.link = 'https://github.com/bluehands/Website-Carbon-Meter';
        this.label = ''
        this.labelDarkTheme = '🌡️🌍'
        this.labelLightTheme = '👣🌍'
        this.carbonData = {
            total: "0",
            lastRequest: "0"
        }
        this.numberFormat = new Intl.NumberFormat();
        this.numberFormat = new Intl.NumberFormat(this.numberFormat.resolvedOptions().locale, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
        this.tooltip = 'Total CO&#8322;e emissions of this website while surfing (cumulated).';
        this.meter = new CarbonMeter();
    }

    static get observedAttributes() {
        return ['theme', 'link', 'label', 'tooltip', 'location', 'appearance'];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        console.log(`${name}: ${newValue}`);
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
        if (name === 'tooltip') {
            this.tooltip = newValue;
            this.updateView();
        }
        if (name === 'appearance') {
            this.appearance = newValue;
            this.updateView();
        }
    }

    connectedCallback() {
        this.meter = new CarbonMeter(this.location);
        this.meter.onMetering((total: number, lastRequest: number) => {
            this.carbonData = {
                total: this.numberFormat.format(total),
                lastRequest: this.numberFormat.format(lastRequest)
            }
            this.updateView();
        })
        this.updateView();
        this.meter.start();
    }

    updateView = () => {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = this.render(this.carbonData.total, this.carbonData.lastRequest);
        }
    }

    render = (total: string, lastRequest: string) => {
        let badgeLabel = this.label;
        if (this.label === '') {
            badgeLabel = this.theme === 'dark' ? this.labelDarkTheme : this.labelLightTheme;
        }
        return `
        <style>
            a:link { 
                text-decoration: none; 
                color: inherit;
            } 
            a:visited { 
                text-decoration: none; 
                color: inherit;
            } 
            a:hover { 
                text-decoration: none; 
                color: inherit;
            } 
            a:active { 
                text-decoration: none; 
                color: inherit;
            }
            .badge-container {
                display: flex;                
            }
            .compact {
                font-size:x-small;             
                line-height:16px   
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
                padding: 3px 8px;
                position: relative;
            }
            .value {
                padding: 3px 8px;
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
        <div class="badge-container ${this.appearance} ${this.theme}-theme">
            <div class="badge">
                <div class="key" title="${this.tooltip}">
                    <a href="${this.link}" target="_blank" rel="noreferrer noopener">${badgeLabel}</a>
                </div>
                <div class="value"><a href="${this.link}" target="_blank" rel="noreferrer noopener">${total} g CO&#8322;</a></div>
            </div>

        </div>
        `;
    }
}

customElements.define('carbon-meter-badge', CarbonMeterBadge);