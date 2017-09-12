// console.log("teste ----");

// class AppDrawer extends HTMLElement {

// 	// A getter/setter for an open property.
// 	get open() {
// 		return this.hasAttribute('open');
// 	}

// 	set open(val) {
// 		// Reflect the value of the open property as an HTML attribute.
// 		if (val) {
// 			this.setAttribute('open', '');
// 		} else {
// 			this.removeAttribute('open');
// 		}
// 		this.toggleDrawer();
// 	}

// 	// A getter/setter for a disabled property.
// 	get disabled() {
// 		return this.hasAttribute('disabled');
// 	}

// 	set disabled(val) {
// 		// Reflect the value of the disabled property as an HTML attribute.
// 		if (val) {
// 			this.setAttribute('disabled', '');
// 		} else {
// 			this.removeAttribute('disabled');
// 		}
// 	}

// 	// Can define constructor arguments if you wish.
// 	constructor() {
// 		// If you define a ctor, always call super() first!
// 		// This is specific to CE and required by the spec.
// 		super();

// 		// Setup a click listener on <app-drawer> itself.
// 		this.addEventListener('click', e => {
// 			// Don't toggle the drawer if it's disabled.
// 			if (this.disabled) {
// 				return;
// 			}
// 			this.toggleDrawer();
// 		});
// 	}

// 	toggleDrawer() {
// 		console.log("toggleDrawer");
// 	}
// }

// window.customElements.define('app-drawer', AppDrawer);

// class MyElement extends HTMLElement {
// 	// these are standard hooks, called on certain events
// 	define(name: string, constructor: Function, options?: ElementDefinitionOptions): void {

// 	}
// 	get(name: string): any {
// 		return "ok";
// 	};
// 	whenDefined(name: string): PromiseLike<void> {
// 		return new Promise(() => {
// 			console.log('ok');
// 		});
// 	};
// 	constructor() {
// 		super();
// 		console.log("novo element criado");
// 	}
// 	connectedCallback() {

// 	}
// 	disconnectedCallback() {

// 	}
// 	adoptedCallback() {

// 	}
// 	attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
// 		console.log(attrName);
// 	}

// 	// these are custom methods and properties
// 	get myProp() {
// 		return "ok";
// 	}
// 	set myProp(value: string) {
// 		console.log(value);
// 	}
// 	myMethod() {
// 		console.log("method teste");
// 	}
// }

// // this registers the Custom Element
// customElements.define('my-element', MyElement)


// class FancyDrawer extends HTMLElement {

// 	constructor() {
// 		super(); // always call super() first in the ctor. This also calls the extended class' ctor.
// 		console.log("created");
// 		this.innerHTML = " okok";
// 	}

// 	toggleDrawer() {
// 		// Possibly different toggle implementation?
// 		// Use ES2015 if you need to call the parent method.
// 		// super.toggleDrawer()
// 	}

// 	anotherMethod() {
// 	}
// }
// var FancyDrawer2 = function () {

// 	return FancyDrawer;
// 	// new() {
// 	// 	console.log("ok");
// 	// }
// }

// customElements.define('fancy-app-drawer', class extends HTMLElement {
// 	constructor() {
// 		super(); // always call super() first in the ctor.

// 		// Attach a shadow root to <fancy-tabs>.
// 		const shadowRoot = this.attachShadow({ mode: 'open' });
// 		shadowRoot.innerHTML = `
// 		<style>#tabs { ... }</style> <!-- styles are scoped to fancy-tabs! -->
// 		<div id="tabs">...</div>
// 		<div id="panels">...</div>
// 	  `;
// 	}
// });
// // window.customElements.define('fancy-app-drawer', FancyDrawer);
// var item = window.customElements.whenDefined("fancy-app-drawer");
// item.then(() => {
// 	console.log("fancy-app-drawer defined ok");
// });
// // var novoElement = {
// // 	new() {

// // 	}
// // }


// setTimeout(function () {
// 	// var d = document.createElement("app-drawer");
// 	// var item = Reflect.construct(HTMLElement, [], FancyDrawer);
// 	// console.log(item);

// 	// document.body.innerHTML = "<fancy-app-drawer />"
// }, 300);
// // div.innerHTML = "-- okok --";

// // document.body.appendChild(div);