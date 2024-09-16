import { CarbonMeter } from "../node_modules/website-carbon-meter/dist/esm/carbon.js"
const template = document.createElement('template');
template.innerHTML = `
        <div>            
            <slot name="carbon-emission">
            <div class='carbon-meter'></div>
            </slot>            
        </div>

`
// ....

export class CM extends HTMLElement {
    static get observedAttributes() {
        return ['session', 'request', 'text'];
    }
    constructor() {
        super();
        // attach to the Shadow DOM
        const root = this.attachShadow({ mode: 'closed' });
        root.appendChild(template.content.cloneNode(true));
        this.element = root.querySelector('div');
        const slot = this.element.querySelector('slot');
        this.slotNode = slot.querySelector('div');
        slot.addEventListener('slotchange', event => {
            const node = slot.assignedNodes()[0];
            if (node) {
                this.slotNode = node;
                this.render();
            }
        });
        this.cm = new CarbonMeter('de');
        this.cm.onMetering(
            (sessionTotalCo2, lastRequestCo2) => {
                this.session = sessionTotalCo2;
                this.request = lastRequestCo2;
                this.render();
            }
        );
        this.cm.start();
    }
    connectedCallback() {
        console.log("connectedCallback")        
        // set default value for emission
        if (!this.session) {
            this.session = 0;
        } else if (this.session < 0) {
            throw new Error('The emissions must be higher than zero.');
        }
        this.dispatchEvent(new CustomEvent('sessionChanged', { detail: this.session }));
        this.render();
    }

    attributeChangedCallback(name, oldVal, newVal) {
        console.log("attributeChangedCallback")
        if (oldVal === newVal) {
            return;
        }

        switch (name) {
            case 'text':
                this.text = newVal;
                this.updateSession();
                break;
            case 'session':
                this.session = newVal;
                this.updateSession();
                break;
            case 'request':
                this.request = newVal;
                this.render();
                break;
        }
    }
    get text() {
        return this.getAttribute('text');
    }
    set text(value) {
        if (!value) {
            value = 'Carbon emissions: Session {{session}} (Last request {{request}})';
        }
        this.setAttribute('text', value);
    }
    get session() {
        return +this.getAttribute('session');
    }

    set session(value) {
        if (value < 0) {
            throw new Error('The emissions must be higher than zero.');
        }
        value = parseFloat(value);
        this.setAttribute('session', value);
    }
    get request() {
        return +this.getAttribute('request');
    }

    set request(value) {
        if (value < 0) {
            throw new Error('The emissions must be higher than zero.');
        }
        value = parseFloat(value);
        this.setAttribute('request', value);
    }

    clear() {
        const nodes = this.element.getElementsByClassName('carbon-meter');
        if (nodes) {
            while (nodes.length > 0) {
                nodes[0].parentNode.removeChild(nodes[0]);
            }
        }
    }
    render() {
        console.log("render");
        this.clear();
        const sessionTemplate = document.createElement('div');
        sessionTemplate.setAttribute('class', 'carbon-meter');
        let sessionValue = this.session ? this.session.toFixed(2) : '0';
        let requestValue = this.request ? this.request.toFixed(2) : '0';
        let textValue = this.text.replace('{{session}}', sessionValue).replace('{{request}}', requestValue);
        sessionTemplate.innerHTML = textValue;
        sessionTemplate.appendChild(this.slotNode.cloneNode(true));
        this.element.appendChild(sessionTemplate);
    }

    changeSession(event) {
        this.session = event;
        this.updateSession();
        this.dispatchEvent(new CustomEvent('sessionChanged', { detail: this.session }));
    }
    updateSession() {
        console.log("update session");
    }
}

window.customElements.define('carbon-meter', CM);