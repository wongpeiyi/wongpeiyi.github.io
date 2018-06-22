(function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("markdown-it"),require("markdown-it-emoji"),require("markdown-it-task-lists")):"function"==typeof define&&define.amd?define(["markdown-it","markdown-it-emoji","markdown-it-task-lists"],t):e.mfgfm=t(e.markdownit,e.markdownitEmoji,e.markdownitTaskLists)})(this,function(e,t,s){"use strict"
function n(e="unreachable"){return new Error(e)}function i(e,t){if(!e)throw new Error(t||"assertion failure")}e="default"in e?e.default:e,t="default"in t?t.default:t,s="default"in s?s.default:s
const r=Object.keys
function o(e){for(let t=1;t<arguments.length;t++){let s=arguments[t]
if(null===s||"object"!=typeof s)continue
let n=r(s)
for(let t=0;t<n.length;t++){let i=n[t]
e[i]=s[i]}}return e}let a=0
function l(e){return e._guid=++a}function h(){return Object.create(null)}class c{constructor(){this.stack=[],this.current=null}get size(){return this.stack.length}push(e){this.current=e,this.stack.push(e)}pop(){let e=this.stack.pop(),t=this.stack.length
return this.current=0===t?null:this.stack[t-1],void 0===e?null:e}isEmpty(){return 0===this.stack.length}}class u{constructor(e){this.next=null,this.prev=null,this.value=e}}class p{constructor(){this.clear()}head(){return this._head}tail(){return this._tail}clear(){this._head=this._tail=null}toArray(){let e=[]
return this.forEachNode(t=>e.push(t)),e}nextNode(e){return e.next}forEachNode(e){let t=this._head
for(;null!==t;)e(t),t=t.next}insertBefore(e,t=null){return null===t?this.append(e):(t.prev?t.prev.next=e:this._head=e,e.prev=t.prev,e.next=t,t.prev=e,e)}append(e){let t=this._tail
return t?(t.next=e,e.prev=t,e.next=null):this._head=e,this._tail=e}remove(e){return e.prev?e.prev.next=e.next:this._head=e.next,e.next?e.next.prev=e.prev:this._tail=e.prev,e}}class d{constructor(e,t){this._head=e,this._tail=t}forEachNode(e){let t=this._head
for(;null!==t;)e(t),t=this.nextNode(t)}head(){return this._head}tail(){return this._tail}toArray(){let e=[]
return this.forEachNode(t=>e.push(t)),e}nextNode(e){return e===this._tail?null:e.next}}new d(null,null)
const m=Object.freeze([]),f=1
class g{validate(e){return this.value()===e}}g.id=0
const b=[],y=[]
class k{constructor(e,t){this.type=e,this.inner=t}value(){return(0,b[this.type])(this.inner)}validate(e){return(0,y[this.type])(this.inner,e)}}function v(e){let t=b.length
b.push(e=>e.value()),y.push((e,t)=>e.validate(t)),e.id=t}b.push(()=>0),y.push((e,t)=>0===t)
const w=new k(0,null)
b.push(()=>NaN),y.push((e,t)=>NaN===t)
const S=new k(1,null)
b.push(()=>x),y.push((e,t)=>t===x)
new k(2,null)
function C({tag:e}){return e===w}function E(e){return e===w}let x=f
class _ extends g{static create(e=x){return new k(this.id,new _(e))}constructor(e=x){super(),this.revision=e}value(){return this.revision}dirty(){this.revision=++x}}function A(e){let t=[]
for(let s=0,n=e.length;s<n;s++){let n=e[s].tag
if(n===S)return S
n!==w&&t.push(n)}return N(t)}function M(e){let t=[],s=e.head()
for(;null!==s;){let n=s.tag
if(n===S)return S
n!==w&&t.push(n),s=e.nextNode(s)}return N(t)}function O(e){let t=[]
for(let s=0,n=e.length;s<n;s++){let n=e[s]
if(n===S)return S
n!==w&&t.push(n)}return N(t)}function N(e){switch(e.length){case 0:return w
case 1:return e[0]
case 2:return T.create(e[0],e[1])
default:return D.create(e)}}v(_)
class L extends g{constructor(){super(...arguments),this.lastChecked=null,this.lastValue=null}value(){let e=this.lastChecked,t=this.lastValue
return e!==x&&(this.lastChecked=x,this.lastValue=t=this.compute()),this.lastValue}invalidate(){this.lastChecked=null}}class T extends L{static create(e,t){return new k(this.id,new T(e,t))}constructor(e,t){super(),this.first=e,this.second=t}compute(){return Math.max(this.first.value(),this.second.value())}}v(T)
class D extends L{static create(e){return new k(this.id,new D(e))}constructor(e){super(),this.tags=e}compute(){let e=this.tags,t=-1
for(let s=0;s<e.length;s++){let n=e[s].value()
t=Math.max(n,t)}return t}}v(D)
class R extends L{static create(e){return new k(this.id,new R(e))}constructor(e){super(),this.tag=e,this.lastUpdated=f}compute(){return Math.max(this.lastUpdated,this.tag.value())}update(e){e!==this.tag&&(this.tag=e,this.lastUpdated=x,this.invalidate())}}v(R)
class B{constructor(){this.lastRevision=null,this.lastValue=null}value(){let e=this.tag,t=this.lastRevision,s=this.lastValue
return null!==t&&e.validate(t)||(s=this.lastValue=this.compute(),this.lastRevision=e.value()),s}invalidate(){this.lastRevision=null}}class I{constructor(e){this.lastValue=null,this.lastRevision=null,this.initialized=!1,this.tag=e.tag,this.reference=e}peek(){return this.initialized?this.lastValue:this.initialize()}revalidate(){if(!this.initialized)return this.initialize()
let e=this.reference,t=this.lastRevision,s=e.tag
if(s.validate(t))return j
this.lastRevision=s.value()
let n=this.lastValue,i=e.value()
return i===n?j:(this.lastValue=i,i)}initialize(){let e=this.reference,t=this.lastValue=e.value()
return this.lastRevision=e.tag.value(),this.initialized=!0,t}}const j="adb3b78e-3d22-4e4b-877a-6317c2c5c145"
class P{constructor(e){this.inner=e,this.tag=w}value(){return this.inner}}class F extends u{constructor(e,t){super(e.valueReferenceFor(t)),this.retained=!1,this.seen=!1,this.key=t.key,this.iterable=e,this.memo=e.memoReferenceFor(t)}update(e){this.retained=!0,this.iterable.updateValueReference(this.value,e),this.iterable.updateMemoReference(this.memo,e)}shouldRemove(){return!this.retained}reset(){this.retained=!1,this.seen=!1}}class H{constructor(e){this.iterator=null,this.map=h(),this.list=new p,this.tag=e.tag,this.iterable=e}isEmpty(){return(this.iterator=this.iterable.iterate()).isEmpty()}iterate(){let e
return e=null===this.iterator?this.iterable.iterate():this.iterator,this.iterator=null,e}has(e){return!!this.map[e]}get(e){return this.map[e]}wasSeen(e){let t=this.map[e]
return void 0!==t&&t.seen}append(e){let t=this.map,s=this.list,n=this.iterable,i=t[e.key]=new F(n,e)
return s.append(i),i}insertBefore(e,t){let s=this.map,n=this.list,i=this.iterable,r=s[e.key]=new F(i,e)
return r.retained=!0,n.insertBefore(r,t),r}move(e,t){let s=this.list
e.retained=!0,s.remove(e),s.insertBefore(e,t)}remove(e){this.list.remove(e),delete this.map[e.key]}nextNode(e){return this.list.nextNode(e)}head(){return this.list.head()}}var z;(function(e){e[e.Append=0]="Append",e[e.Prune=1]="Prune",e[e.Done=2]="Done"})(z||(z={}))
class V{constructor({target:e,artifacts:t}){this.target=e,this.artifacts=t,this.iterator=t.iterate(),this.current=t.head()}sync(){let e=z.Append
for(;;)switch(e){case z.Append:e=this.nextAppend()
break
case z.Prune:e=this.nextPrune()
break
case z.Done:return void this.nextDone()}}advanceToKey(e){let t=this.current,s=this.artifacts,n=t
for(;null!==n&&n.key!==e;)n.seen=!0,n=s.nextNode(n)
null!==n&&(this.current=s.nextNode(n))}nextAppend(){let e=this.iterator,t=this.current,s=this.artifacts,n=e.next()
if(null===n)return this.startPrune()
let i=n.key
return null!==t&&t.key===i?this.nextRetain(n):s.has(i)?this.nextMove(n):this.nextInsert(n),z.Append}nextRetain(e){let t=this.artifacts,s=this.current;(s=s).update(e),this.current=t.nextNode(s),this.target.retain(e.key,s.value,s.memo)}nextMove(e){let t=this.current,s=this.artifacts,n=this.target,i=e.key,r=s.get(e.key)
r.update(e),s.wasSeen(e.key)?(s.move(r,t),n.move(r.key,r.value,r.memo,t?t.key:null)):this.advanceToKey(i)}nextInsert(e){let t=this.artifacts,s=this.target,n=this.current,i=t.insertBefore(e,n)
s.insert(i.key,i.value,i.memo,n?n.key:null)}startPrune(){return this.current=this.artifacts.head(),z.Prune}nextPrune(){let e=this.artifacts,t=this.target,s=this.current
if(null===s)return z.Done
let n=s
return this.current=e.nextNode(n),n.shouldRemove()?(e.remove(n),t.delete(n.key)):n.reset(),z.Prune}nextDone(){this.target.done()}}function $(...e){let t=e[0],s=e[1],n=e[2]
return"string"==typeof t?function(t,s,n){return U(t,s,n,e)}:n?U(t,s,n,[]):void function(e,t){let s,n=Symbol(t)
X(e).trackedProperties[t]=!0,void 0!==e[t]&&(s=e[t])
Object.defineProperty(e,t,{configurable:!0,get(){return this[n]},set(e){X(this).dirtyableTagFor(t).inner.dirty(),this[n]=e,W()}})}(t,s)}function U(e,t,s,n){let i=X(e)
return i.trackedProperties[t]=!0,i.trackedPropertyDependencies[t]=n||[],{enumerable:!0,configurable:!1,get:s.get,set:function(){X(this).dirtyableTagFor(t).inner.dirty(),s.set.apply(this,arguments),W()}}}class q{constructor(e){this.tags=h(),this.computedPropertyTags=h(),this.trackedProperties=e?Object.create(e.trackedProperties):h(),this.trackedPropertyDependencies=e?Object.create(e.trackedPropertyDependencies):h()}tagFor(e){let t,s=this.tags[e]
return s||((t=this.trackedPropertyDependencies[e])?this.tags[e]=function(e,t,s){let n=[e.dirtyableTagFor(t)]
if(s&&s.length)for(let i=0;i<s.length;i++)n.push(e.tagFor(s[i]))
return O(n)}(this,e,t):this.tags[e]=_.create())}dirtyableTagFor(e){let t
return this.trackedPropertyDependencies[e]?(t=this.computedPropertyTags[e])||(this.computedPropertyTags[e]=_.create()):(t=this.tags[e])||(this.tags[e]=_.create())}}let G=Symbol("ember-object")
function X(e){let t=e[G]
return t&&function(e,t){return Y.call(e,t)}(e,G)?t:e[G]=new q(t)}let Y=Object.prototype.hasOwnProperty
let W=function(){}
class K extends Error{constructor(e,t,s){super(s),this.target=e,this.key=t}static for(e,t){return new K(e,t,`The property '${t}' on ${e} was changed after being rendered. If you want to change a property used in a template after the component has rendered, mark the property as a tracked property with the @tracked decorator.`)}}function J(e,t,s=function(e,t){throw K.for(e,t)}){if("object"==typeof e&&e){return X(e).tagFor(t)}return w}class Q{constructor(e){this.debugName=null,this.__args__=null,Object.assign(this,e)}get element(){let e=this.bounds
return i(e&&e.firstNode===e.lastNode,"The 'element' property can only be accessed on components that contain a single root element in their template. Try using 'bounds' instead to access the first and last nodes."),e.firstNode}get args(){return this.__args__}set args(e){this.__args__=e,X(this).dirtyableTagFor("args").inner.dirty()}static create(e){return new this(e)}didInsertElement(){}didUpdate(){}willDestroy(){}destroy(){this.willDestroy()}toString(){return`${this.debugName} component`}}const Z={dynamicLayout:!1,dynamicTag:!0,prepareArgs:!1,createArgs:!0,attributeHook:!0,elementHook:!0}
class ee{constructor(e,t,s,n){this.name=e,this.manager=t,this.ComponentClass=s,this.handle=n,this.state={name:e,capabilities:Z,ComponentClass:s,handle:n}}toJSON(){return{GlimmerDebug:`<component-definition name="${this.name}">`}}}class te{constructor(e,t=null){this._registry=e,this._resolver=t,this._lookups={},this._factoryDefinitionLookups={}}factoryFor(e){let t=this._factoryDefinitionLookups[e]
if(t||(this._resolver&&(t=this._resolver.retrieve(e)),t||(t=this._registry.registration(e)),t&&(this._factoryDefinitionLookups[e]=t)),t)return this.buildFactory(e,t)}lookup(e){let t=!1!==this._registry.registeredOption(e,"singleton")
if(t&&this._lookups[e])return this._lookups[e]
let s=this.factoryFor(e)
if(!s)return
if(!1===this._registry.registeredOption(e,"instantiate"))return s.class
let n=s.create()
return t&&n&&(this._lookups[e]=n),n}defaultInjections(e){return{}}buildInjections(e){let t,s=this.defaultInjections(e),n=this._registry.registeredInjections(e)
for(let i=0;i<n.length;i++)s[(t=n[i]).property]=this.lookup(t.source)
return s}buildFactory(e,t){let s=this.buildInjections(e)
return{class:t,create(e){let n=Object.assign({},s,e)
return t.create(n)}}}}class se{constructor(e){this._registrations={},this._registeredOptions={},this._registeredInjections={},e&&e.fallback&&(this._fallback=e.fallback)}register(e,t,s){this._registrations[e]=t,s&&(this._registeredOptions[e]=s)}registration(e){let t=this._registrations[e]
return void 0===t&&this._fallback&&(t=this._fallback.registration(e)),t}unregister(e){delete this._registrations[e],delete this._registeredOptions[e],delete this._registeredInjections[e]}registerOption(e,t,s){let n=this._registeredOptions[e]
n||(n={},this._registeredOptions[e]=n),n[t]=s}registeredOption(e,t){let s,n=this.registeredOptions(e)
return n&&(s=n[t]),void 0===s&&void 0!==this._fallback&&(s=this._fallback.registeredOption(e,t)),s}registeredOptions(e){let t=this._registeredOptions[e]
if(void 0===t){let s=e.split(":")[0]
t=this._registeredOptions[s]}return t}unregisterOption(e,t){let s=this._registeredOptions[e]
s&&delete s[t]}registerInjection(e,t,s){let n=this._registeredInjections[e]
void 0===n&&(this._registeredInjections[e]=n=[]),n.push({property:t,source:s})}registeredInjections(e){let t=e.split(":")[0],s=this._fallback?this._fallback.registeredInjections(e):[]
return Array.prototype.push.apply(s,this._registeredInjections[t]),Array.prototype.push.apply(s,this._registeredInjections[e]),s}}const ne="__owner__"
function ie(e){return e[ne]}function re(e,t){e[ne]=t}class oe{constructor(e){this._bounds=e}get firstNode(){return this._bounds.firstNode()}get lastNode(){return this._bounds.lastNode()}}const ae=new class{constructor(){this.evaluateOpcode=function(e){let t=new Array(e)
for(let s=0;s<e;s++)t[s]=null
return t}(82).slice()}add(e,t,s="syscall"){this.evaluateOpcode[e]={syscall:"syscall"===s,evaluate:t}}debugBefore(e,t,s){return{sp:void 0,state:void 0}}debugAfter(e,t,s,n){n.sp
n.state,e.stack.sp}evaluate(e,t,s){let n=this.evaluateOpcode[s]
n.syscall?n.evaluate(e,t):n.evaluate(e.inner,t)}}
class le{constructor(){l(this)}}class he extends le{constructor(){super(...arguments),this.next=null,this.prev=null}}var ce;(function(e){e[e.pc=0]="pc",e[e.ra=1]="ra",e[e.fp=2]="fp",e[e.sp=3]="sp",e[e.s0=4]="s0",e[e.s1=5]="s1",e[e.t0=6]="t0",e[e.t1=7]="t1",e[e.v0=8]="v0"})(ce||(ce={}))
class ue extends P{constructor(e){super(e)}static create(e){return void 0===e?me:null===e?fe:!0===e?ge:!1===e?be:"number"==typeof e?new de(e):new pe(e)}get(e){return me}}class pe extends ue{constructor(){super(...arguments),this.lengthReference=null}get(e){if("length"===e){let e=this.lengthReference
return null===e&&(e=this.lengthReference=new de(this.inner.length)),e}return super.get(e)}}class de extends ue{constructor(e){super(e)}}const me=new de(void 0),fe=new de(null),ge=new de(!0),be=new de(!1)
class ye{constructor(e){this.inner=e,this.tag=e.tag}value(){return this.toBool(this.inner.value())}toBool(e){return!!e}}var ke
function ve(e){return function(t){return Array.isArray(t)&&t[0]===e}}ae.add(1,(e,{op1:t})=>{let s=e.stack,n=e.constants.resolveHandle(t)(e,s.pop())
e.loadValue(ce.v0,n)}),ae.add(4,(e,{op1:t})=>{let s=e.referenceForSymbol(t)
e.stack.push(s)}),ae.add(2,(e,{op1:t})=>{let s=e.stack.pop()
e.scope().bindSymbol(t,s)}),ae.add(3,(e,{op1:t})=>{let s=e.stack.pop(),n=e.stack.pop(),i=e.stack.pop(),r=i?[s,n,i]:null
e.scope().bindBlock(t,r)}),ae.add(80,(e,{op1:t})=>{let s=e.constants.getString(t),n=e.scope().getPartialMap()[s]
void 0===n&&(n=e.getSelf().get(s)),e.stack.push(n)}),ae.add(17,(e,{op1:t,op2:s})=>{e.pushRootScope(t,!!s)}),ae.add(5,(e,{op1:t})=>{let s=e.constants.getString(t),n=e.stack.pop()
e.stack.push(n.get(s))}),ae.add(6,(e,{op1:t})=>{let s=e.stack,n=e.scope().getBlock(t)
n?(s.push(n[2]),s.push(n[1]),s.push(n[0])):(s.push(null),s.push(null),s.push(null))}),ae.add(7,(e,{op1:t})=>{let s=!!e.scope().getBlock(t)
e.stack.push(s?ge:be)}),ae.add(8,e=>{e.stack.pop(),e.stack.pop()
let t=e.stack.pop(),s=t&&t.parameters.length
e.stack.push(s?ge:be)}),ae.add(9,(e,{op1:t})=>{let s=new Array(t)
for(let n=t;n>0;n--){s[n-1]=e.stack.pop()}e.stack.push(new class extends B{constructor(e){super(),this.parts=e,this.tag=A(e)}compute(){let e=new Array
for(let s=0;s<this.parts.length;s++){let t=this.parts[s].value()
null!==t&&void 0!==t&&(e[s]="function"!=typeof(t=t).toString?"":String(t))}var t
return e.length>0?e.join(""):null}}(s))}),function(e){e[e.Text=0]="Text",e[e.Append=1]="Append",e[e.Comment=2]="Comment",e[e.Modifier=3]="Modifier",e[e.Block=4]="Block",e[e.Component=5]="Component",e[e.OpenElement=6]="OpenElement",e[e.OpenSplattedElement=7]="OpenSplattedElement",e[e.FlushElement=8]="FlushElement",e[e.CloseElement=9]="CloseElement",e[e.StaticAttr=10]="StaticAttr",e[e.DynamicAttr=11]="DynamicAttr",e[e.AttrSplat=12]="AttrSplat",e[e.Yield=13]="Yield",e[e.Partial=14]="Partial",e[e.DynamicArg=15]="DynamicArg",e[e.StaticArg=16]="StaticArg",e[e.TrustingAttr=17]="TrustingAttr",e[e.Debugger=18]="Debugger",e[e.ClientSideStatement=19]="ClientSideStatement",e[e.Unknown=20]="Unknown",e[e.Get=21]="Get",e[e.MaybeLocal=22]="MaybeLocal",e[e.HasBlock=23]="HasBlock",e[e.HasBlockParams=24]="HasBlockParams",e[e.Undefined=25]="Undefined",e[e.Helper=26]="Helper",e[e.Concat=27]="Concat",e[e.ClientSideExpression=28]="ClientSideExpression"}(ke||(ke={}))
const we=ve(ke.Get),Se=ve(ke.MaybeLocal)
var Ce,Ee;(Ee=Ce||(Ce={}))[Ee.OpenComponentElement=0]="OpenComponentElement",Ee[Ee.DidCreateElement=1]="DidCreateElement",Ee[Ee.SetComponentAttrs=2]="SetComponentAttrs",Ee[Ee.DidRenderLayout=3]="DidRenderLayout",Ee[Ee.Debugger=4]="Debugger"
var xe=ke
const _e="&attrs"
class Ae{constructor(e=0){this.offset=e,this.names=h(),this.funcs=[]}add(e,t){this.funcs.push(t),this.names[e]=this.funcs.length-1}compile(e,t){let s=e[this.offset],n=this.names[s],i=this.funcs[n]
i(e,t)}}let Me,Oe
function Ne(e,t,s){let n=e[1],i=e[2],r=e[3]
s.expr(i),r?s.dynamicAttr(n,r,t):s.dynamicAttr(n,null,t)}class Le{constructor(){var e=function(e=new Te,t=new De){return e.add("if",(e,t,s,n,i)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #if requires a single argument")
i.startLabels(),i.pushFrame(),i.returnTo("END"),i.expr(e[0]),i.toBoolean(),i.enter(1),i.jumpUnless("ELSE"),i.invokeStaticBlock(s),n?(i.jump("EXIT"),i.label("ELSE"),i.invokeStaticBlock(n),i.label("EXIT"),i.exit(),i.return()):(i.label("ELSE"),i.exit(),i.return()),i.label("END"),i.popFrame(),i.stopLabels()}),e.add("unless",(e,t,s,n,i)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #unless requires a single argument")
i.startLabels(),i.pushFrame(),i.returnTo("END"),i.expr(e[0]),i.toBoolean(),i.enter(1),i.jumpIf("ELSE"),i.invokeStaticBlock(s),n?(i.jump("EXIT"),i.label("ELSE"),i.invokeStaticBlock(n),i.label("EXIT"),i.exit(),i.return()):(i.label("ELSE"),i.exit(),i.return()),i.label("END"),i.popFrame(),i.stopLabels()}),e.add("with",(e,t,s,n,i)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #with requires a single argument")
i.startLabels(),i.pushFrame(),i.returnTo("END"),i.expr(e[0]),i.dup(),i.toBoolean(),i.enter(2),i.jumpUnless("ELSE"),i.invokeStaticBlock(s,1),n?(i.jump("EXIT"),i.label("ELSE"),i.invokeStaticBlock(n),i.label("EXIT"),i.exit(),i.return()):(i.label("ELSE"),i.exit(),i.return()),i.label("END"),i.popFrame(),i.stopLabels()}),e.add("each",(e,t,s,n,i)=>{i.startLabels(),i.pushFrame(),i.returnTo("END"),t&&"key"===t[0][0]?i.expr(t[1][0]):i.pushPrimitiveReference(null),i.expr(e[0]),i.enter(2),i.putIterator(),i.jumpUnless("ELSE"),i.pushFrame(),i.returnTo("ITER"),i.dup(ce.fp,1),i.enterList("BODY"),i.label("ITER"),i.iterate("BREAK"),i.label("BODY"),i.invokeStaticBlock(s,2),i.pop(2),i.exit(),i.return(),i.label("BREAK"),i.exitList(),i.popFrame(),n?(i.jump("EXIT"),i.label("ELSE"),i.invokeStaticBlock(n),i.label("EXIT"),i.exit(),i.return()):(i.label("ELSE"),i.exit(),i.return()),i.label("END"),i.popFrame(),i.stopLabels()}),e.add("in-element",(e,t,s,n,i)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #in-element requires a single argument")
i.startLabels(),i.pushFrame(),i.returnTo("END")
let r=t[0],o=t[1]
for(let a=0;a<r.length;a++){let e=r[a]
if("nextSibling"!==e&&"guid"!==e)throw new Error(`SYNTAX ERROR: #in-element does not take a \`${r[0]}\` option`)
i.expr(o[a])}i.expr(e[0]),i.dup(),i.enter(4),i.jumpUnless("ELSE"),i.pushRemoteElement(),i.invokeStaticBlock(s),i.popRemoteElement(),i.label("ELSE"),i.exit(),i.return(),i.label("END"),i.popFrame(),i.stopLabels()}),e.add("-with-dynamic-vars",(e,t,s,n,i)=>{if(t){let e=t[0],n=t[1]
i.compileParams(n),i.pushDynamicScope(),i.bindDynamicScope(e),i.invokeStaticBlock(s),i.popDynamicScope()}else i.invokeStaticBlock(s)}),e.add("component",(e,t,s,n,i)=>{if("string"==typeof e[0]&&i.staticComponentHelper(e[0],t,s))return
let r=e[0],o=e.slice(1)
i.dynamicComponent(r,o,t,!0,s,n)}),t.add("component",(e,t,s,n)=>{let i=t&&t[0]
if("string"==typeof i&&n.staticComponentHelper(i,s,null))return!0
let r=t[0],o=t.slice(1)
return n.dynamicComponent(r,o,s,!0,null,null),!0}),{blocks:e,inlines:t}}()
let t=e.blocks,s=e.inlines
this.blocks=t,this.inlines=s}}class Te{constructor(){this.names=h(),this.funcs=[]}add(e,t){this.funcs.push(t),this.names[e]=this.funcs.length-1}addMissing(e){this.missing=e}compile(e,t,s,n,i,r){let o=this.names[e]
if(void 0===o){(0,this.missing)(e,t,s,n,i,r)}else{(0,this.funcs[o])(t,s,n,i,r)}}}class De{constructor(){this.names=h(),this.funcs=[]}add(e,t){this.funcs.push(t),this.names[e]=this.funcs.length-1}addMissing(e){this.missing=e}compile(e,t){let s,n,i,r=e[1]
if(!Array.isArray(r))return["expr",r]
if(r[0]===xe.Helper)s=r[1],n=r[2],i=r[3]
else{if(r[0]!==xe.Unknown)return["expr",r]
s=r[1],n=i=null}let o=this.names[s]
if(void 0===o&&this.missing){let e=(0,this.missing)(s,n,i,t)
return!1===e?["expr",r]:e}if(void 0!==o){let e=(0,this.funcs[o])(s,n,i,t)
return!1===e?["expr",r]:e}return["expr",r]}}const Re=-1
class Be{constructor(e,t,s,n){this.statements=e,this.containingLayout=t,this.options=s,this.symbolTable=n,this.compiled=null,this.statementCompiler=function(){if(Me)return Me
const e=Me=new Ae
e.add(xe.Text,(e,t)=>{t.text(e[1])}),e.add(xe.Comment,(e,t)=>{t.comment(e[1])}),e.add(xe.CloseElement,(e,t)=>{t.closeElement()}),e.add(xe.FlushElement,(e,t)=>{t.flushElement()}),e.add(xe.Modifier,(e,t)=>{let s=t.resolver,n=t.referrer,i=e[1],r=e[2],o=e[3],a=s.lookupModifier(i,n)
if(!a)throw new Error(`Compile Error ${i} is not a modifier: Helpers may not be used in the element form.`)
t.modifier(a,r,o)}),e.add(xe.StaticAttr,(e,t)=>{let s=e[1],n=e[2],i=e[3]
t.staticAttr(s,i,n)}),e.add(xe.DynamicAttr,(e,t)=>{Ne(e,!1,t)}),e.add(xe.TrustingAttr,(e,t)=>{Ne(e,!0,t)}),e.add(xe.OpenElement,(e,t)=>{t.openPrimitiveElement(e[1])}),e.add(xe.OpenSplattedElement,(e,t)=>{t.setComponentAttrs(!0),t.putComponentOperations(),t.openPrimitiveElement(e[1])}),e.add(xe.Component,(e,t)=>{let s=e[1],n=e[2],i=e[3],r=e[4],o=t.resolver,a=t.referrer,l=o.lookupComponentDefinition(s,a)
if(null===l)throw new Error(`Compile Error: Cannot find component ${s}`)
{let e=o.getCapabilities(l),s=[[xe.ClientSideStatement,Ce.SetComponentAttrs,!0],...n,[xe.ClientSideStatement,Ce.SetComponentAttrs,!1]],a=t.inlineBlock({statements:s,parameters:m}),h=t.template(r)
if(!1===e.dynamicLayout){let s=o.getLayout(l)
t.pushComponentDefinition(l),t.invokeStaticComponent(e,s,a,null,i,!1,h&&h)}else t.pushComponentDefinition(l),t.invokeComponent(a,null,i,!1,h&&h)}}),e.add(xe.Partial,(e,t)=>{let s=e[1],n=e[2],i=t.referrer
t.startLabels(),t.pushFrame(),t.returnTo("END"),t.expr(s),t.dup(),t.enter(2),t.jumpUnless("ELSE"),t.invokePartial(i,t.evalSymbols(),n),t.popScope(),t.popFrame(),t.label("ELSE"),t.exit(),t.return(),t.label("END"),t.popFrame(),t.stopLabels()}),e.add(xe.Yield,(e,t)=>{let s=e[1],n=e[2]
t.yield(s,n)}),e.add(xe.AttrSplat,(e,t)=>{let s=e[1]
t.yield(s,[]),t.didCreateElement(ce.s0),t.setComponentAttrs(!1)}),e.add(xe.Debugger,(e,t)=>{let s=e[1]
t.debugger(t.evalSymbols(),s)}),e.add(xe.ClientSideStatement,(e,s)=>{t.compile(e,s)}),e.add(xe.Append,(e,t)=>{let s=e[1],n=e[2]
if(!0===(t.macros.inlines.compile(e,t)||s))return
let i=we(s),r=Se(s)
n?t.guardedAppend(s,!0):i||r?t.guardedAppend(s,!1):(t.expr(s),t.primitive(!1),t.load(ce.t0),t.dynamicContent())}),e.add(xe.Block,(e,t)=>{let s=e[1],n=e[2],i=e[3],r=e[4],o=e[5],a=t.template(r),l=t.template(o),h=a&&a,c=l&&l
t.macros.blocks.compile(s,n,i,h,c,t)})
const t=new Ae(1)
return t.add(Ce.OpenComponentElement,(e,t)=>{t.putComponentOperations(),t.openPrimitiveElement(e[2])}),t.add(Ce.DidCreateElement,(e,t)=>{t.didCreateElement(ce.s0)}),t.add(Ce.SetComponentAttrs,(e,t)=>{t.setComponentAttrs(e[2])}),t.add(Ce.Debugger,()=>{}),t.add(Ce.DidRenderLayout,(e,t)=>{t.didRenderLayout(ce.s0)}),e}()}static topLevel(e,t){return new Be(e.statements,{block:e,referrer:t.referrer},t,{referrer:t.referrer,hasEval:e.hasEval,symbols:e.symbols})}compile(e){let t=this.compiled
if(null!==t)return t
this.compiled=Re
let s=this.options,n=this.statements,i=this.containingLayout,r=i.referrer,o=s.program,a=s.resolver,l=s.macros,h=s.asPartial,c=new(0,s.Builder)(o,a,r,l,i,h,e)
for(let p=0;p<n.length;p++)this.statementCompiler.compile(n[p],c)
let u=c.commit(o.heap,i.block.symbols.length)
return this.compiled=u}}class Ie{constructor(e){this.builder=e}static(e,t){let s=t[0],n=t[1],i=t[2],r=t[3],o=this.builder,a=o.resolver
if(null!==e){let t=a.getCapabilities(e)
if(!1===t.dynamicLayout){let l=a.getLayout(e)
o.pushComponentDefinition(e),o.invokeStaticComponent(t,l,null,s,n,!1,i,r)}else o.pushComponentDefinition(e),o.invokeComponent(null,s,n,!1,i,r)}}}class je{constructor(e){this.buffer=e,this.typePos=0,this.size=0}encode(e,t){if(e>255)throw new Error(`Opcode type over 8-bits. Got ${e}.`)
this.buffer.push(e|t|arguments.length-2<<8),this.typePos=this.buffer.length-1
for(let s=2;s<arguments.length;s++){let e=arguments[s]
if("number"==typeof e&&e>65535)throw new Error(`Operand over 16-bits. Got ${e}.`)
this.buffer.push(e)}this.size=this.buffer.length}patch(e,t){if(-1!==this.buffer[e+1])throw new Error("Trying to patch operand in populated slot instead of a reserved slot.")
this.buffer[e+1]=t}}class Pe{constructor(){this.labels=h(),this.targets=[]}label(e,t){this.labels[e]=t}target(e,t){this.targets.push({at:e,target:t})}patch(e){let t=this.targets,s=this.labels
for(let i=0;i<t.length;i++){var n=t[i]
let r=n.at,o=s[n.target]-r
e.patch(r,o)}}}class Fe{constructor(){this.encoder=new je([])}push(e){switch(arguments.length){case 1:return this.encoder.encode(e,0)
case 2:return this.encoder.encode(e,0,arguments[1])
case 3:return this.encoder.encode(e,0,arguments[1],arguments[2])
default:return this.encoder.encode(e,0,arguments[1],arguments[2],arguments[3])}}pushMachine(e){switch(arguments.length){case 1:return this.encoder.encode(e,1024)
case 2:return this.encoder.encode(e,1024,arguments[1])
case 3:return this.encoder.encode(e,1024,arguments[1],arguments[2])
default:return this.encoder.encode(e,1024,arguments[1],arguments[2],arguments[3])}}commit(e,t){this.pushMachine(20)
let s=this.encoder.buffer,n=e.malloc()
for(let i=0;i<s.length;i++){let t=s[i]
"function"==typeof t?e.pushPlaceholder(t):e.push(t)}return e.finishMalloc(n,t),n}reserve(e){this.encoder.encode(e,0,-1)}reserveMachine(e){this.encoder.encode(e,1024,-1)}main(){this.push(56,ce.s0),this.invokePreparedComponent(!1)}dynamicContent(){this.push(24)}beginComponentTransaction(){this.push(75)}commitComponentTransaction(){this.push(76)}pushDynamicScope(){this.push(36)}popDynamicScope(){this.push(37)}pushRemoteElement(){this.push(33)}popRemoteElement(){this.push(34)}pushRootScope(e,t){this.push(17,e,t?1:0)}pushChildScope(){this.push(18)}popScope(){this.push(19)}prepareArgs(e){this.push(65,e)}createComponent(e,t){let s=0|t
this.push(67,s,e)}registerComponentDestructor(e){this.push(68,e)}putComponentOperations(){this.push(69)}getComponentSelf(e){this.push(70,e)}getComponentTagName(e){this.push(71,e)}getComponentLayout(e){this.push(72,e)}invokeComponentLayout(e){this.push(74,e)}didCreateElement(e){this.push(77,e)}didRenderLayout(e){this.push(78,e)}pushFrame(){this.pushMachine(47)}popFrame(){this.pushMachine(48)}invokeVirtual(){this.pushMachine(41)}invokeYield(){this.push(43)}toBoolean(){this.push(51)}invokePreparedComponent(e,t=null){this.beginComponentTransaction(),this.pushDynamicScope(),this.createComponent(ce.s0,e),t&&t(),this.registerComponentDestructor(ce.s0),this.getComponentSelf(ce.s0),this.invokeComponentLayout(ce.s0),this.didRenderLayout(ce.s0),this.popFrame(),this.popScope(),this.popDynamicScope(),this.commitComponentTransaction()}get pos(){return this.encoder.typePos}get nextPos(){return this.encoder.size}}class He extends Fe{constructor(e,t,s,n,i,r,o){super(),this.program=e,this.resolver=t,this.referrer=s,this.macros=n,this.containingLayout=i,this.asPartial=r,this.stdLib=o,this.component=new Ie(this),this.expressionCompiler=function(){if(Oe)return Oe
const e=Oe=new Ae
return e.add(xe.Unknown,(e,t)=>{let s=t.resolver,n=t.asPartial,i=t.referrer,r=e[1],o=s.lookupHelper(r,i)
null!==o?t.helper(o,null,null):n?t.resolveMaybeLocal(r):(t.getVariable(0),t.getProperty(r))}),e.add(xe.Concat,(e,t)=>{let s=e[1]
for(let n=0;n<s.length;n++)t.expr(s[n])
t.concat(s.length)}),e.add(xe.Helper,(e,t)=>{let s=t.resolver,n=t.referrer,i=e[1],r=e[2],o=e[3]
if("component"===i){let e=r[0],s=r.slice(1)
return void t.curryComponent(e,s,o,!0)}let a=s.lookupHelper(i,n)
if(null===a)throw new Error(`Compile Error: ${i} is not a helper`)
t.helper(a,r,o)}),e.add(xe.Get,(e,t)=>{let s=e[1],n=e[2]
t.getVariable(s)
for(let i=0;i<n.length;i++)t.getProperty(n[i])}),e.add(xe.MaybeLocal,(e,t)=>{let s=e[1]
if(t.asPartial){let e=s[0]
s=s.slice(1),t.resolveMaybeLocal(e)}else t.getVariable(0)
for(let n=0;n<s.length;n++)t.getProperty(s[n])}),e.add(xe.Undefined,(e,t)=>t.pushPrimitiveReference(void 0)),e.add(xe.HasBlock,(e,t)=>{t.hasBlock(e[1])}),e.add(xe.HasBlockParams,(e,t)=>{t.hasBlockParams(e[1])}),e}(),this.labelsStack=new c,this.isComponentAttrs=!1,this.constants=e.constants}label(e){this.labels.label(e,this.nextPos)}setComponentAttrs(e){this.isComponentAttrs=e}expr(e){Array.isArray(e)?this.expressionCompiler.compile(e,this):this.pushPrimitiveReference(e)}pushArgs(e,t){let s=this.constants.stringArray(e)
this.push(63,s,t)}get labels(){return this.labelsStack.current}startLabels(){this.labelsStack.push(new Pe)}stopLabels(){this.labelsStack.pop().patch(this.encoder)}pushComponentDefinition(e){this.push(59,this.constants.handle(e))}pushCurriedComponent(){this.push(61)}pushDynamicComponentInstance(){this.push(60)}resolveDynamicComponent(e){this.push(62,this.constants.serializable(e))}staticComponentHelper(e,t,s){let n=this.resolver.lookupComponentDefinition(e,this.referrer)
if(n){let e=this.resolver.getCapabilities(n)
if(!1===e.dynamicLayout){if(t)for(let e=0;e<t.length;e+=2)t[e][0]=`@${t[e][0]}`
let i=this.resolver.getLayout(n)
return this.pushComponentDefinition(n),this.invokeStaticComponent(e,i,null,null,t,!1,s&&s),!0}}return!1}invokePartial(e,t,s){let n=this.constants.serializable(e),i=this.constants.stringArray(t),r=this.constants.array(s)
this.push(79,n,i,r)}resolveMaybeLocal(e){this.push(80,this.string(e))}debugger(e,t){this.push(81,this.constants.stringArray(e),this.constants.array(t))}text(e){this.push(22,this.constants.string(e))}openPrimitiveElement(e){this.push(25,this.constants.string(e))}openDynamicElement(){this.push(26)}flushElement(){this.push(30)}closeElement(){this.push(31)}staticAttr(e,t,s){let n=this.constants.string(e),i=t?this.constants.string(t):0
if(this.isComponentAttrs)this.pushPrimitiveReference(s),this.push(29,n,1,i)
else{let e=this.constants.string(s)
this.push(27,n,e,i)}}dynamicAttr(e,t,s){let n=this.constants.string(e),i=t?this.constants.string(t):0
this.isComponentAttrs?this.push(29,n,!0===s?1:0,i):this.push(28,n,!0===s?1:0,i)}comment(e){let t=this.constants.string(e)
this.push(23,t)}modifier(e,t,s){this.pushFrame(),this.compileArgs(t,s,null,!0),this.push(32,this.constants.handle(e)),this.popFrame()}putIterator(){this.push(54)}enterList(e){this.reserve(52),this.labels.target(this.pos,e)}exitList(){this.push(53)}iterate(e){this.reserve(55),this.labels.target(this.pos,e)}setVariable(e){this.push(2,e)}setBlock(e){this.push(3,e)}getVariable(e){this.push(4,e)}getProperty(e){this.push(5,this.string(e))}getBlock(e){this.push(6,e)}hasBlock(e){this.push(7,e)}hasBlockParams(e){this.getBlock(e),this.resolveBlock(),this.push(8)}concat(e){this.push(9,e)}load(e){this.push(15,e)}fetch(e){this.push(16,e)}dup(e=ce.sp,t=0){return this.push(13,e,t)}pop(e=1){return this.push(14,e)}returnTo(e){this.reserveMachine(21),this.labels.target(this.pos,e)}primitive(e){let t,s=0
switch(typeof e){case"number":e%1==0?e>-1?t=e:(t=this.negative(e),s=4):(t=this.float(e),s=1)
break
case"string":t=this.string(e),s=2
break
case"boolean":t=0|e,s=3
break
case"object":t=2,s=3
break
case"undefined":t=3,s=3
break
default:throw new Error("Invalid primitive passed to pushPrimitive")}this.push(11,t<<3|s)}float(e){return this.constants.float(e)}negative(e){return this.constants.negative(e)}pushPrimitiveReference(e){this.primitive(e),this.primitiveReference()}primitiveReference(){this.push(12)}helper(e,t,s){this.pushFrame(),this.compileArgs(t,s,null,!0),this.push(1,this.constants.handle(e)),this.popFrame(),this.fetch(ce.v0)}bindDynamicScope(e){this.push(35,this.names(e))}enter(e){this.push(49,e)}exit(){this.push(50)}return(){this.pushMachine(20)}jump(e){this.reserveMachine(44),this.labels.target(this.pos,e)}jumpIf(e){this.reserve(45),this.labels.target(this.pos,e)}jumpUnless(e){this.reserve(46),this.labels.target(this.pos,e)}string(e){return this.constants.string(e)}names(e){let t=[]
for(let s=0;s<e.length;s++){let n=e[s]
t[s]=this.constants.string(n)}return this.constants.array(t)}symbols(e){return this.constants.array(e)}inlineBlock(e){let t=e.parameters,s=e.statements,n={parameters:t,referrer:this.containingLayout.referrer},i={program:this.program,macros:this.macros,Builder:this.constructor,resolver:this.resolver,asPartial:this.asPartial,referrer:this.referrer}
return new Be(s,this.containingLayout,i,n)}evalSymbols(){let e=this.containingLayout.block
return e.hasEval?e.symbols:null}compileParams(e){if(!e)return 0
for(let t=0;t<e.length;t++)this.expr(e[t])
return e.length}compileArgs(e,t,s,n){s&&(this.pushYieldableBlock(s.main),this.pushYieldableBlock(s.else),this.pushYieldableBlock(s.attrs))
let i=this.compileParams(e)<<4
n&&(i|=8),s&&(i|=7)
let r=m
if(t){r=t[0]
let e=t[1]
for(let t=0;t<e.length;t++)this.expr(e[t])}this.pushArgs(r,i)}invokeStaticBlock(e,t=0){let s=e.symbolTable.parameters,n=s.length,i=Math.min(t,n)
if(this.pushFrame(),i){this.pushChildScope()
for(let e=0;e<i;e++)this.dup(ce.fp,t-e),this.setVariable(s[e])}this.pushBlock(e),this.resolveBlock(),this.invokeVirtual(),i&&this.popScope(),this.popFrame()}builtInGuardedAppend(){this.dup(),this.startLabels(),this.isComponent(),this.enter(2),this.jumpUnless("ELSE"),this.pushCurriedComponent(),this.pushDynamicComponentInstance(),this.invokeComponent(null,null,null,!1,null,null),this.exit(),this.return(),this.label("ELSE"),this.dynamicContent(),this.exit(),this.return(),this.stopLabels()}guardedAppend(e,t){this.startLabels(),this.pushFrame(),this.returnTo("END"),this.stdLib?(this.primitive(!!t),this.load(ce.t0),this.expr(e),this.primitive(this.stdLib.guardedAppend),this.invokeVirtual()):(this.expr(e),this.dup(),this.isComponent(),this.enter(2),this.jumpUnless("ELSE"),this.pushCurriedComponent(),this.pushDynamicComponentInstance(),this.invokeComponent(null,null,null,!1,null,null),this.exit(),this.return(),this.label("ELSE"),this.primitive(!!t),this.load(ce.t0),this.dynamicContent(),this.exit(),this.return()),this.label("END"),this.popFrame(),this.stopLabels()}yield(e,t){this.compileArgs(t,null,null,!1),this.getBlock(e),this.resolveBlock(),this.invokeYield(),this.popScope(),this.popFrame()}populateLayout(e){this.push(73,e)}invokeComponent(e,t,s,n,i,r=null,o){this.fetch(ce.s0),this.dup(ce.sp,1),this.load(ce.s0),this.pushFrame()
let a={main:i,else:r,attrs:e}
this.compileArgs(t,s,a,n),this.prepareArgs(ce.s0),this.invokePreparedComponent(null!==i,()=>{o?(this.pushSymbolTable(o.symbolTable),this.pushLayout(o),this.resolveLayout()):this.getComponentLayout(ce.s0),this.populateLayout(ce.s0)}),this.load(ce.s0)}invokeStaticComponent(e,t,s,i,r,o,a,l=null){let h=t.symbolTable
if(h.hasEval||e.prepareArgs)return void this.invokeComponent(s,i,r,o,a,l,t)
this.fetch(ce.s0),this.dup(ce.sp,1),this.load(ce.s0)
let c=h.symbols
e.createArgs&&(this.pushFrame(),this.compileArgs(null,r,null,o)),this.beginComponentTransaction(),this.pushDynamicScope(),this.createComponent(ce.s0,null!==a),e.createArgs&&this.popFrame(),this.registerComponentDestructor(ce.s0)
let u=[]
this.getComponentSelf(ce.s0),u.push({symbol:0,isBlock:!1})
for(let d=0;d<c.length;d++){let e=c[d]
switch(e.charAt(0)){case"&":let t=null
if("&default"===e)t=a
else if("&inverse"===e)t=l
else{if(e!==_e)throw n()
t=s}t?(this.pushYieldableBlock(t),u.push({symbol:d+1,isBlock:!0})):(this.pushYieldableBlock(null),u.push({symbol:d+1,isBlock:!0}))
break
case"@":if(!r)break
let i=r[0],h=r[1],c=e
o&&(c=e.slice(1))
let p=i.indexOf(c);-1!==p&&(this.expr(h[p]),u.push({symbol:d+1,isBlock:!1}))}}this.pushRootScope(c.length+1,!!(a||l||s))
for(let n=u.length-1;n>=0;n--){var p=u[n]
let e=p.symbol
p.isBlock?this.setBlock(e):this.setVariable(e)}this.pushFrame(),this.invokeStatic(t),this.didRenderLayout(ce.s0),this.popFrame(),this.popScope(),this.popDynamicScope(),this.commitComponentTransaction(),this.load(ce.s0)}dynamicComponent(e,t,s,n,i,r=null){this.startLabels(),this.pushFrame(),this.returnTo("END"),this.expr(e),this.dup(),this.enter(2),this.jumpUnless("ELSE"),this.resolveDynamicComponent(this.referrer),this.pushDynamicComponentInstance(),this.invokeComponent(null,t,s,n,i,r),this.label("ELSE"),this.exit(),this.return(),this.label("END"),this.popFrame(),this.stopLabels()}isComponent(){this.push(57)}curryComponent(e,t,s,n){let i=this.referrer
this.pushFrame(),this.compileArgs(t,s,null,n),this.push(66),this.expr(e),this.push(58,this.constants.serializable(i)),this.popFrame(),this.fetch(ce.v0)}pushSymbolTable(e){if(e){let t=this.constants.serializable(e)
this.push(40,t)}else this.primitive(null)}pushBlockScope(){this.push(39)}pushYieldableBlock(e){this.pushSymbolTable(e&&e.symbolTable),this.pushBlockScope(),this.pushBlock(e)}template(e){return e?this.inlineBlock(e):null}}class ze extends He{pushBlock(e){e?this.pushOther(e):this.primitive(null)}resolveBlock(){this.push(38)}pushLayout(e){e?this.pushOther(e):this.primitive(null)}resolveLayout(){this.push(38)}invokeStatic(e){this.pushOther(e),this.push(38),this.pushMachine(41)}pushOther(e){this.push(10,this.other(e))}other(e){return this.constants.other(e)}}class Ve{constructor(){this.base=0,this.length=0,this.stack=null,this._tag=null,this._references=null}setup(e,t,s){this.stack=e,this.base=t,this.length=s,0===s?(this._tag=w,this._references=m):(this._tag=null,this._references=null)}get tag(){let e=this._tag
return e||(e=this._tag=A(this.references)),e}at(e){let t=this.base,s=this.length,n=this.stack
return e<0||e>=s?me:n.get(e,t)}capture(){return new $e(this.tag,this.references)}prepend(e){let t=e.length
if(t>0){let s=this.base,n=this.length,i=this.stack
this.base=s-=t,this.length=n+t
for(let r=0;r<t;r++)i.set(e.at(r),r,s)
this._tag=null,this._references=null}}get references(){let e=this._references
if(!e){let t=this.stack,s=this.base,n=this.length
e=this._references=t.sliceArray(s,s+n)}return e}}class $e{constructor(e,t,s=t.length){this.tag=e,this.references=t,this.length=s}static empty(){return new $e(w,m,0)}at(e){return this.references[e]}value(){return this.references.map(this.valueOf)}get(e){let t=this.references,s=this.length
if("length"===e)return ue.create(s)
{let n=parseInt(e,10)
return n<0||n>=s?me:t[n]}}valueOf(e){return e.value()}}class Ue{constructor(){this.base=0,this.length=0,this._references=null,this._names=m,this._atNames=m}setup(e,t,s,n,i){this.stack=e,this.base=t,this.length=s,0===s?(this._references=m,this._names=m,this._atNames=m):(this._references=null,i?(this._names=n,this._atNames=null):(this._names=null,this._atNames=n))}get tag(){return A(this.references)}get names(){let e=this._names
return e||(e=this._names=this._atNames.map(this.toSyntheticName)),e}get atNames(){let e=this._atNames
return e||(e=this._atNames=this._names.map(this.toAtName)),e}has(e){return-1!==this.names.indexOf(e)}get(e,t=!0){let s=this.base,n=this.stack,i=(t?this.names:this.atNames).indexOf(e)
return-1===i?me:n.get(i,s)}capture(){return new qe(this.tag,this.names,this.references)}merge(e){let t=e.length
if(t>0){let s=this.names,n=this.length,i=this.stack,r=e.names
Object.isFrozen(s)&&0===s.length&&(s=[])
for(let o=0;o<t;o++){let t=r[o];-1===s.indexOf(t)&&(n=s.push(t),i.push(e.references[o]))}this.length=n,this._references=null,this._names=s,this._atNames=null}}get references(){let e=this._references
if(!e){let t=this.base,s=this.length,n=this.stack
e=this._references=n.sliceArray(t,t+s)}return e}toSyntheticName(e){return e.slice(1)}toAtName(e){return`@${e}`}}class qe{constructor(e,t,s){this.tag=e,this.names=t,this.references=s,this.length=t.length,this._map=null}get map(){let e=this._map
if(!e){let t=this.names,s=this.references
e=this._map=h()
for(let n=0;n<t.length;n++){e[t[n]]=s[n]}}return e}has(e){return-1!==this.names.indexOf(e)}get(e){let t=this.names,s=this.references,n=t.indexOf(e)
return-1===n?me:s[n]}value(){let e=this.names,t=this.references,s=h()
for(let n=0;n<e.length;n++){s[e[n]]=t[n].value()}return s}}class Ge{constructor(){this.internalValues=null,this.internalTag=null,this.names=m,this.length=0,this.base=0}setup(e,t,s,n){this.stack=e,this.names=n,this.base=t,this.length=s,0===s?(this.internalTag=w,this.internalValues=m):(this.internalTag=null,this.internalValues=null)}get values(){let e=this.internalValues
if(!e){let t=this.base,s=this.length,n=this.stack
e=this.internalValues=n.sliceArray(t,t+3*s)}return e}has(e){return-1!==this.names.indexOf(e)}get(e){let t=this.base,s=this.stack,n=this.names,i=n.indexOf(e)
if(-1===n.indexOf(e))return null
let r=s.get(3*i,t),o=s.get(3*i+1,t),a=s.get(3*i+2,t)
return null===a?null:[a,o,r]}capture(){return new Xe(this.names,this.values)}}class Xe{constructor(e,t){this.names=e,this.values=t,this.length=e.length}has(e){return-1!==this.names.indexOf(e)}get(e){let t=this.names.indexOf(e)
return-1===t?null:[this.values[3*t+2],this.values[3*t+1],this.values[3*t]]}}const Ye=new qe(w,m,m),We=new $e(w,m),Ke={tag:w,length:0,positional:We,named:Ye},Je="CURRIED COMPONENT DEFINITION [id=6f00feb9-a0ef-4547-99ea-ac328f80acea]"
function Qe(e){return!(!e||!e[Je])}class Ze{constructor(e,t){this.inner=e,this.args=t,this[Je]=!0}unwrap(e){e.realloc(this.offset)
let t=this
for(;;){var s=t
let n=s.args,i=s.inner
if(n&&(e.positional.prepend(n.positional),e.named.merge(n.named)),!Qe(i))return i
t=i}}get offset(){let e=this.inner,t=this.args,s=t?t.positional.length:0
return Qe(e)?s+e.offset:s}}class et extends ye{static create(e){return new et(e)}toBool(e){return Qe(e)}}ae.add(24,e=>{let t,s=e.stack.pop(),n=e.fetchValue(ce.t0),i=s.value()
t=n?e.elements().appendTrustingDynamicContent(i):e.elements().appendCautiousDynamicContent(i),C(s)||e.updateWith(new class extends he{constructor(e,t){super(),this.reference=e,this.content=t,this.tag=e.tag}evaluate(e){let t=this.content,s=this.reference
t.update(e.env,s.value())}}(s,t)),e.loadValue(ce.t0,null)})
ae.add(18,e=>e.pushChildScope()),ae.add(19,e=>e.popScope()),ae.add(36,e=>e.pushDynamicScope()),ae.add(37,e=>e.popDynamicScope()),ae.add(10,(e,{op1:t})=>{e.stack.push(e.constants.getOther(t))}),ae.add(11,(e,{op1:t})=>{let s=e.stack,n=t>>3
switch(7&t){case 0:s.push(n)
break
case 1:s.push(e.constants.getFloat(n))
break
case 2:s.push(e.constants.getString(n))
break
case 3:s.pushEncodedImmediate(t)
break
case 4:s.push(e.constants.getNegative(n))}}),ae.add(12,e=>{let t=e.stack
t.push(ue.create(t.pop()))}),ae.add(13,(e,{op1:t,op2:s})=>{let n=e.fetchValue(t)-s
e.stack.dup(n)}),ae.add(14,(e,{op1:t})=>{e.stack.pop(t)}),ae.add(15,(e,{op1:t})=>{e.load(t)}),ae.add(16,(e,{op1:t})=>{e.fetch(t)}),ae.add(35,(e,{op1:t})=>{let s=e.constants.getArray(t)
e.bindDynamicScope(s)}),ae.add(49,(e,{op1:t})=>{e.enter(t)}),ae.add(50,e=>{e.exit()}),ae.add(40,(e,{op1:t})=>{e.stack.push(e.constants.getSerializable(t))}),ae.add(39,e=>{e.stack.push(e.scope())}),ae.add(38,e=>{let t=e.stack,s=t.pop()
s?t.pushSmi(s.compile()):t.pushNull()}),ae.add(43,e=>{let t=e.stack,s=t.pop(),n=t.pop(),i=t.pop(),r=t.pop()
if(null===i)return e.pushFrame(),void e.pushScope(n)
let o=n
{let e=i.parameters,t=e.length
if(t>0){o=o.child()
for(let s=0;s<t;s++)o.bindSymbol(e[s],r.at(s))}}e.pushFrame(),e.pushScope(o),e.call(s)}),ae.add(45,(e,{op1:t})=>{let s=e.stack.pop()
if(C(s))s.value()&&e.goto(t)
else{let n=new I(s)
n.peek()&&e.goto(t),e.updateWith(new tt(n))}}),ae.add(46,(e,{op1:t})=>{let s=e.stack.pop()
if(C(s))s.value()||e.goto(t)
else{let n=new I(s)
n.peek()||e.goto(t),e.updateWith(new tt(n))}}),ae.add(51,e=>{let t=e.env,s=e.stack
s.push(t.toConditionalReference(s.pop()))})
class tt extends he{constructor(e){super(),this.type="assert",this.tag=e.tag,this.cache=e}evaluate(e){let t=this.cache
t.revalidate()!==j&&e.throw()}}class st extends he{constructor(e,t){super(),this.target=t,this.type="jump-if-not-modified",this.tag=e,this.lastRevision=e.value()}evaluate(e){let t=this.tag,s=this.target,n=this.lastRevision
!e.alwaysRevalidate&&t.validate(n)&&e.goto(s)}didModify(){this.lastRevision=this.tag.value()}}class nt extends he{constructor(e){super(),this.target=e,this.type="did-modify",this.tag=w}evaluate(){this.target.didModify()}}class it{constructor(e){this.tag=w,this.type="label",this.label=null,this.prev=null,this.next=null,l(this),this.label=e}evaluate(){}inspect(){return`${this.label} [${this._guid}]`}}ae.add(22,(e,{op1:t})=>{e.elements().appendText(e.constants.getString(t))}),ae.add(23,(e,{op1:t})=>{e.elements().appendComment(e.constants.getString(t))}),ae.add(25,(e,{op1:t})=>{e.elements().openElement(e.constants.getString(t))}),ae.add(26,e=>{let t=e.stack.pop().value()
e.elements().openElement(t)}),ae.add(33,e=>{let t,s,n=e.stack.pop(),i=e.stack.pop(),r=e.stack.pop().value()
if(C(n))t=n.value()
else{let s=new I(n)
t=s.peek(),e.updateWith(new tt(s))}if(C(i))s=i.value()
else{let t=new I(i)
s=t.peek(),e.updateWith(new tt(t))}e.elements().pushRemoteElement(t,r,s)}),ae.add(34,e=>{e.elements().popRemoteElement()}),ae.add(30,e=>{let t=e.fetchValue(ce.t0)
t&&(t.flush(e),e.loadValue(ce.t0,null)),e.elements().flushElement()}),ae.add(31,e=>{e.elements().closeElement()}),ae.add(32,(e,{op1:t})=>{let s=e.constants.resolveHandle(t),n=e.stack.pop()
var i=e.elements()
let r=i.constructing,o=i.updateOperations,a=e.dynamicScope(),l=s.create(r,n,a,o)
e.env.scheduleInstallModifier(l,s)
let h=s.getDestructor(l)
h&&e.newDestroyable(h)
let c=s.getTag(l)
E(c)||e.updateWith(new class extends he{constructor(e,t,s){super(),this.tag=e,this.manager=t,this.modifier=s,this.type="update-modifier",this.lastUpdated=e.value()}evaluate(e){let t=this.manager,s=this.modifier,n=this.tag,i=this.lastUpdated
n.validate(i)||(e.env.scheduleUpdateModifier(s,t),this.lastUpdated=n.value())}}(c,s,l))})
ae.add(27,(e,{op1:t,op2:s,op3:n})=>{let i=e.constants.getString(t),r=e.constants.getString(s),o=n?e.constants.getString(n):null
e.elements().setStaticAttribute(i,r,o)}),ae.add(28,(e,{op1:t,op2:s,op3:n})=>{let i=e.constants.getString(t),r=e.stack.pop(),o=r.value(),a=n?e.constants.getString(n):null,l=e.elements().setDynamicAttribute(i,o,!!s,a)
C(r)||e.updateWith(new rt(r,l))})
class rt extends he{constructor(e,t){super(),this.reference=e,this.attribute=t,this.type="patch-element",this.tag=e.tag,this.lastRevision=this.tag.value()}evaluate(e){let t=this.attribute,s=this.reference,n=this.tag
n.validate(this.lastRevision)||(this.lastRevision=n.value(),t.update(s.value(),e.env))}}function ot(e,t,s){let n=e.lookupComponent(t,s)
return n}function at(e){return lt(e)?"":String(e)}function lt(e){return null===e||void 0===e||"function"!=typeof e.toString}function ht(e){return"object"==typeof e&&null!==e&&"function"==typeof e.toHTML}function ct(e){return"object"==typeof e&&null!==e&&"number"==typeof e.nodeType}function ut(e){return ct(e)&&11===e.nodeType}function pt(e){return"string"==typeof e}class dt{constructor(e){this.list=e,this.tag=A(e),this.list=e}value(){let e=[],t=this.list
for(let s=0;s<t.length;s++){let n=at(t[s].value())
n&&e.push(n)}return 0===e.length?null:e.join(" ")}}function mt(e){return 0|(e.dynamicLayout?1:0)|(e.dynamicTag?2:0)|(e.prepareArgs?4:0)|(e.createArgs?8:0)|(e.attributeHook?16:0)|(e.elementHook?32:0)}function ft(e,t){return!!(e&t)}const gt=new class{constructor(){this.stack=null,this.positional=new Ve,this.named=new Ue,this.blocks=new Ge}setup(e,t,s,n,i){this.stack=e
let r=this.named,o=t.length,a=e.sp-o+1
r.setup(e,a,o,t,i)
let l=a-n
this.positional.setup(e,l,n)
let h=this.blocks,c=s.length,u=l-3*c
h.setup(e,u,c,s)}get tag(){return A([this.positional,this.named])}get base(){return this.blocks.base}get length(){return this.positional.length+this.named.length+3*this.blocks.length}at(e){return this.positional.at(e)}realloc(e){if(e>0){let t=this.positional,s=this.named,n=this.stack,i=t.base+e
for(let e=t.length+s.length-1;e>=0;e--)n.copy(e+t.base,e+i)
t.base+=e,s.base+=e,n.sp+=e}}capture(){let e=0===this.positional.length?We:this.positional.capture(),t=0===this.named.length?Ye:this.named.capture()
return{tag:this.tag,length:this.length,positional:e,named:t}}clear(){let e=this.stack,t=this.length
e.pop(t)}}
ae.add(57,e=>{let t=e.stack,s=t.pop()
t.push(et.create(s))}),ae.add(58,(e,{op1:t})=>{let s=e.stack,n=s.pop(),i=s.pop(),r=e.constants.getSerializable(t),o=e.constants.resolver
e.loadValue(ce.v0,new class{constructor(e,t,s,n){this.inner=e,this.resolver=t,this.meta=s,this.args=n,this.tag=e.tag,this.lastValue=null,this.lastDefinition=null}value(){let e=this.inner,t=this.lastValue,s=e.value()
if(s===t)return this.lastDefinition
let n=null
return Qe(s)?n=s:"string"==typeof s&&s&&(n=ot(this.resolver,s,this.meta)),n=this.curry(n),this.lastValue=s,this.lastDefinition=n,n}get(){return me}curry(e){let t=this.args
return!t&&Qe(e)?e:e?new Ze(e,t):null}}(n,o,r,i))}),ae.add(59,(e,{op1:t})=>{let s=e.constants.resolveHandle(t),n=s.manager,i={definition:s,manager:n,capabilities:mt(n.getCapabilities(s.state)),state:null,handle:null,table:null}
e.stack.push(i)}),ae.add(62,(e,{op1:t})=>{let s,i=e.stack,r=i.pop().value(),o=e.constants.getSerializable(t)
if(e.loadValue(ce.t1,null),"string"==typeof r){s=ot(e.constants.resolver,r,o)}else{if(!Qe(r))throw n()
s=r}i.push(s)}),ae.add(60,e=>{let t,s,n=e.stack,i=n.pop()
Qe(i)?s=t=null:t=mt((s=i.manager).getCapabilities(i.state)),n.push({definition:i,capabilities:t,manager:s,state:null,handle:null,table:null})}),ae.add(61,(e,{op1:t})=>{let s,i=e.stack,r=i.pop().value()
if(!Qe(r))throw n()
s=r,i.push(s)}),ae.add(63,(e,{op1:t,op2:s})=>{let n=e.stack,i=e.constants.getStringArray(t),r=s>>4,o=8&s,a=[]
4&s&&a.push("main"),2&s&&a.push("else"),1&s&&a.push("attrs"),gt.setup(n,i,a,r,!!o),n.push(gt)}),ae.add(66,e=>{let t=e.stack,s=t.pop().capture()
t.push(s)}),ae.add(65,(e,{op1:t})=>{let s=e.stack,n=e.fetchValue(t),i=s.pop(),r=n.definition
Qe(r)&&(r=function(e,t,s){let n=e.definition=t.unwrap(s),i=n.manager,r=n.state
return e.manager=i,e.capabilities=mt(i.getCapabilities(r)),n}(n,r,i))
var o=r
let a=o.manager,l=o.state
if(!0!==ft(n.capabilities,4))return void s.push(i)
let h=i.blocks.values,c=i.blocks.names,u=a.prepareArgs(l,i)
if(u){i.clear()
for(let i=0;i<h.length;i++)s.push(h[i])
let e=u.positional,t=u.named,n=e.length
for(let i=0;i<n;i++)s.push(e[i])
let r=Object.keys(t)
for(let i=0;i<r.length;i++)s.push(t[r[i]])
i.setup(s,r,c,n,!0)}s.push(i)}),ae.add(67,(e,{op1:t,op2:s})=>{let n=e.dynamicScope(),i=e.fetchValue(s),r=i.definition,o=i.manager,a=1&t,l=null
ft(i.capabilities=mt(o.getCapabilities(r.state)),8)&&(l=e.stack.peek())
let h=o.create(e.env,r.state,l,n,e.getSelf(),!!a)
i.state=h
let c=o.getTag(h)
E(c)||e.updateWith(new class extends he{constructor(e,t,s,n){super(),this.tag=e,this.component=t,this.manager=s,this.dynamicScope=n,this.type="update-component"}evaluate(e){let t=this.component,s=this.manager,n=this.dynamicScope
s.update(t,n)}}(c,h,o,n))}),ae.add(68,(e,{op1:t})=>{var s=e.fetchValue(t)
let n=s.manager,i=s.state,r=n.getDestructor(i)
r&&e.newDestroyable(r)}),ae.add(75,e=>{e.beginCacheGroup(),e.elements().pushSimpleBlock()}),ae.add(69,e=>{e.loadValue(ce.t0,new class{constructor(){this.attributes=h(),this.classes=[]}setAttribute(e,t,s,n){let i={value:t,namespace:n,trusting:s}
"class"===e&&this.classes.push(t),this.attributes[e]=i}flush(e){for(let t in this.attributes){let s=this.attributes[t],n=s.value,i=s.namespace,r=s.trusting
"class"===t&&(n=new dt(this.classes))
let o=e.elements().setDynamicAttribute(t,n.value(),r,i)
C(n)||e.updateWith(new rt(n,o))}}})}),ae.add(29,(e,{op1:t,op2:s,op3:n})=>{let i=e.constants.getString(t),r=e.stack.pop(),o=n?e.constants.getString(n):null
e.fetchValue(ce.t0).setAttribute(i,r,!!s,o)})
ae.add(77,(e,{op1:t})=>{var s=e.fetchValue(t)
let n=s.definition,i=s.state,r=n.manager,o=e.fetchValue(ce.t0)
r.didCreateElement(i,e.elements().expectConstructing("DidCreateElementOpcode#evaluate"),o)}),ae.add(70,(e,{op1:t})=>{var s=e.fetchValue(t)
let n=s.definition,i=s.state,r=n.manager
e.stack.push(r.getSelf(i))}),ae.add(71,(e,{op1:t})=>{var s=e.fetchValue(t)
let n=s.definition,i=s.state,r=n.manager
e.stack.push(r.getTagName(i))}),ae.add(72,(e,{op1:t})=>{let s,i=e.fetchValue(t),r=i.manager,o=i.definition,a=e.constants.resolver,l=e.stack,h=i.state,c=i.capabilities,u=o.state
if(!1===ft(c,1))s=r.getLayout(u,a)
else{if(!function(e,t){return!0===ft(e,1)}(c))throw n()
s=r.getDynamicLayout(h,a)}l.push(s.symbolTable),l.push(s.handle)}),ae.add(56,(e,{op1:t})=>{let s=e.stack.pop(),n=e.stack.pop(),i=s.manager,r={definition:s,manager:i,capabilities:mt(i.getCapabilities(s.state)),state:null,handle:n.handle,table:n.symbolTable}
e.loadValue(t,r)}),ae.add(73,(e,{op1:t})=>{let s=e.stack,n=s.pop(),i=s.pop(),r=e.fetchValue(t)
r.handle=n,r.table=i}),ae.add(74,(e,{op1:t})=>{let s=e.stack
var n=e.fetchValue(t)
let i=n.handle
var r=n.table
let o=r.symbols,a=r.hasEval
{let t=s.pop(),n=e.pushRootScope(o.length+1,!0)
n.bindSelf(t)
let r=e.stack.pop(),l=null
a&&(l=h())
let c=r.named.atNames
for(let e=c.length-1;e>=0;e--){let t=c[e],s=o.indexOf(c[e]),i=r.named.get(t,!1);-1!==s&&n.bindSymbol(s+1,i),a&&(l[t]=i)}let u=(e,t)=>{let s=o.indexOf(e),i=p.get(t);-1!==s&&n.bindBlock(s+1,i),l&&(l[e]=i)},p=r.blocks
u(_e,"attrs"),u("&inverse","else"),u("&default","main"),l&&n.bindEvalScope(l),e.call(i)}}),ae.add(78,(e,{op1:t})=>{var s=e.fetchValue(t)
let n=s.manager,i=s.state,r=e.elements().popBlock()
n.didRenderLayout(i,r),e.env.didCreate(i,n),e.updateWith(new class extends he{constructor(e,t,s){super(),this.manager=e,this.component=t,this.bounds=s,this.type="did-update-layout",this.tag=w}evaluate(e){let t=this.manager,s=this.component,n=this.bounds
t.didUpdateLayout(s,n),e.env.didUpdate(s,t)}}(n,i,r))}),ae.add(76,e=>{e.commitCacheGroup()})
let bt=function(e,t){console.info("Use `context`, and `get(<path>)` to debug this template."),t("this")}
ae.add(81,(e,{op1:t,op2:s})=>{let n=e.constants.getStringArray(t),i=e.constants.getArray(s),r=new class{constructor(e,t,s){this.scope=e,this.locals=h()
for(let n=0;n<s.length;n++){let i=s[n],r=t[i-1],o=e.getSymbol(i)
this.locals[r]=o}}get(e){let t=this.scope,s=this.locals,n=e.split(".")
var i=e.split(".")
let r,o=i[0],a=i.slice(1),l=t.getEvalScope()
return"this"===o?r=t.getSelf():s[o]?r=s[o]:0===o.indexOf("@")&&l[o]?r=l[o]:(r=this.scope.getSelf(),a=n),a.reduce((e,t)=>e.get(t),r)}}(e.scope(),n,i)
bt(e.getSelf().value(),e=>r.get(e).value())}),ae.add(79,(e,{op1:t,op2:s,op3:n})=>{let i=e.constants,r=e.constants.resolver,o=e.stack.pop().value(),a=i.getSerializable(t),l=i.getStringArray(s),h=i.getArray(n),c=r.lookupPartial(o,a)
var u=r.resolve(c).getPartial()
let p=u.symbolTable,d=u.handle
{let t=p.symbols,s=e.scope(),n=e.pushRootScope(t.length,!1),i=s.getEvalScope()
n.bindCallerScope(s.getCallerScope()),n.bindEvalScope(i),n.bindSelf(s.getSelf())
let r=Object.create(s.getPartialMap())
for(let e=0;e<h.length;e++){let t=h[e],n=l[t-1],i=s.getSymbol(t)
r[n]=i}if(i)for(let e=0;e<t.length;e++){let s=e+1,r=i[t[e]]
void 0!==r&&n.bind(s,r)}n.bindPartialMap(r),e.pushFrame(),e.call(d)}})
ae.add(54,e=>{let t=e.stack,s=t.pop(),n=t.pop(),i=new class{constructor(e){this.iterator=null
let t=new H(e)
this.artifacts=t}next(){let e=this.artifacts,t=(this.iterator=this.iterator||e.iterate()).next()
return null===t?null:e.append(t)}}(e.env.iterableFor(s,n.value()))
t.push(i),t.push(new class{constructor(e){this.tag=e.tag,this.artifacts=e}value(){return!this.artifacts.isEmpty()}}(i.artifacts))}),ae.add(52,(e,{op1:t})=>{e.enterList(t)}),ae.add(53,e=>{e.exitList()}),ae.add(55,(e,{op1:t})=>{let s=e.stack.peek().next()
if(s){let t=e.iterate(s.memo,s.value)
e.enterItem(s.key,t)}else e.goto(t)})
class yt{constructor(e,t){this.element=e,this.nextSibling=t}}class kt{constructor(e,t,s){this.parentNode=e,this.first=t,this.last=s}parentElement(){return this.parentNode}firstNode(){return this.first}lastNode(){return this.last}}class vt{constructor(e,t){this.parentNode=e,this.node=t}parentElement(){return this.parentNode}firstNode(){return this.node}lastNode(){return this.node}}function wt(e,t){return new vt(e,t)}function St(e,t){let s=e.parentElement(),n=e.firstNode(),i=e.lastNode(),r=n
for(;r;){let e=r.nextSibling
if(s.insertBefore(r,t),r===i)return e
r=e}return null}function Ct(e){let t=e.parentElement(),s=e.firstNode(),n=e.lastNode(),i=s
for(;i;){let e=i.nextSibling
if(t.removeChild(i),i===n)return e
i=e}return null}const Et="http://www.w3.org/2000/svg"
function xt(e,t,s){if(!e)return t
if(!function(e,t){let s=e.createElementNS(t,"svg")
try{s.insertAdjacentHTML("beforeend","<circle></circle>")}catch(e){}finally{return 1!==s.childNodes.length||s.firstChild.namespaceURI!==Et}}(e,s))return t
let n=e.createElement("div")
return class extends t{insertHTMLBefore(e,t,i){return null===i||""===i?super.insertHTMLBefore(e,t,i):e.namespaceURI!==s?super.insertHTMLBefore(e,t,i):function(e,t,s,n){let i="<svg>"+s+"</svg>"
t.innerHTML=i
var r=function(e,t,s){let n=e.firstChild,i=null,r=n
for(;r;)i=r,r=r.nextSibling,t.insertBefore(i,s)
return[n,i]}(t.firstChild,e,n)
let o=r[0],a=r[1]
return new kt(e,o,a)}(e,n,i,t)}}}function _t(e,t){return e&&function(e){let t=e.createElement("div")
if(t.innerHTML="first",t.insertAdjacentHTML("beforeend","second"),2===t.childNodes.length)return!1
return!0}(e)?class extends t{constructor(e){super(e),this.uselessComment=e.createComment("")}insertHTMLBefore(e,t,s){if(null===s)return super.insertHTMLBefore(e,t,s)
let n=!1,i=t?t.previousSibling:e.lastChild
i&&i instanceof Text&&(n=!0,e.insertBefore(this.uselessComment,t))
let r=super.insertHTMLBefore(e,t,s)
return n&&e.removeChild(this.uselessComment),r}}:t}const At="http://www.w3.org/2000/svg",Mt={foreignObject:1,desc:1,title:1},Ot=Object.create(null);["b","big","blockquote","body","br","center","code","dd","div","dl","dt","em","embed","h1","h2","h3","h4","h5","h6","head","hr","i","img","li","listing","main","meta","nobr","ol","p","pre","ruby","s","small","span","strong","strike","sub","sup","table","tt","u","ul","var"].forEach(e=>Ot[e]=1)
let Nt="undefined"==typeof document?null:document
class Lt{constructor(e){this.document=e,this.setupUselessElement()}setupUselessElement(){this.uselessElement=this.document.createElement("div")}createElement(e,t){let s,n
if(t?(s=t.namespaceURI===At||"svg"===e,n=Mt[t.tagName]):(s="svg"===e,n=!1),s&&!n){if(Ot[e])throw new Error(`Cannot create a ${e} inside an SVG context`)
return this.document.createElementNS(At,e)}return this.document.createElement(e)}insertBefore(e,t,s){e.insertBefore(t,s)}insertHTMLBefore(e,t,s){return function(e,t,s,n){let i,r=t,o=s,a=o?o.previousSibling:r.lastChild
if(null===n||""===n)return new kt(r,null,null)
null===o?(r.insertAdjacentHTML("beforeend",n),i=r.lastChild):o instanceof HTMLElement?(o.insertAdjacentHTML("beforebegin",n),i=o.previousSibling):(r.insertBefore(e,o),e.insertAdjacentHTML("beforebegin",n),i=e.previousSibling,r.removeChild(e))
let l=a?a.nextSibling:r.firstChild
return new kt(r,l,i)}(this.uselessElement,e,t,s)}createTextNode(e){return this.document.createTextNode(e)}createComment(e){return this.document.createComment(e)}}var Tt;(function(e){class t extends Lt{createElementNS(e,t){return this.document.createElementNS(e,t)}setAttribute(e,t,s,n=null){n?e.setAttributeNS(n,t,s):e.setAttribute(t,s)}}e.TreeConstruction=t
let s=t
s=_t(Nt,s),s=xt(Nt,s,At),e.DOMTreeConstruction=s})(Tt||(Tt={}))
let Dt=class extends Lt{constructor(e){super(e),this.document=e,this.namespace=null}setAttribute(e,t,s){e.setAttribute(t,s)}removeAttribute(e,t){e.removeAttribute(t)}insertAfter(e,t,s){this.insertBefore(e,t,s.nextSibling)}}
Dt=_t(Nt,Dt)
var Rt=Dt=xt(Nt,Dt,At)
const Bt=Tt.DOMTreeConstruction,It=["javascript:","vbscript:"],jt=["A","BODY","LINK","IMG","IFRAME","BASE","FORM"],Pt=["EMBED"],Ft=["href","src","background","action"],Ht=["src"]
function zt(e,t){return-1!==e.indexOf(t)}function Vt(e,t){return(null===e||zt(jt,e))&&zt(Ft,t)}function $t(e,t){return null!==e&&(zt(Pt,e)&&zt(Ht,t))}function Ut(e,t){return Vt(e,t)||$t(e,t)}function qt(e,t,s,n){let i=null
if(null===n||void 0===n)return n
if(ht(n))return n.toHTML()
i=t?t.tagName.toUpperCase():null
let r=at(n)
if(Vt(i,s)){let t=e.protocolForURL(r)
if(zt(It,t))return`unsafe:${r}`}return $t(i,s)?`unsafe:${r}`:r}function Gt(e,t){let s,n
if(t in e)n=t,s="prop"
else{let i=t.toLowerCase()
i in e?(s="prop",n=i):(s="attr",n=t)}return"prop"!==s||"style"!==n.toLowerCase()&&!function(e,t){let s=Xt[e.toUpperCase()]
return s&&s[t.toLowerCase()]||!1}(e.tagName,n)||(s="attr"),{normalized:n,type:s}}const Xt={INPUT:{form:!0,autocorrect:!0,list:!0},SELECT:{form:!0},OPTION:{form:!0},TEXTAREA:{form:!0},LABEL:{form:!0},FIELDSET:{form:!0},LEGEND:{form:!0},OBJECT:{form:!0}}
function Yt(e,t){let s=e.tagName
if(e.namespaceURI===At)return Wt(s,t)
var n=Gt(e,t)
let i=n.type,r=n.normalized
return"attr"===i?Wt(s,r):function(e,t){if(Ut(e,t))return Zt
if(function(e,t){return("INPUT"===e||"TEXTAREA"===e)&&"value"===t}(e,t))return ts
if(function(e,t){return"OPTION"===e&&"selected"===t}(e,t))return ss
return Qt}(s,r)}function Wt(e,t){return Ut(e,t)?es:Jt}class Kt{constructor(e){this.attribute=e}}class Jt extends Kt{set(e,t,s){let n=ns(t)
if(null!==n){var i=this.attribute
let t=i.name,s=i.namespace
e.__setAttribute(t,n,s)}}update(e,t){let s=ns(e)
var n=this.attribute
let i=n.element,r=n.name
null===s?i.removeAttribute(r):i.setAttribute(r,s)}}class Qt extends Kt{set(e,t,s){if(null!==t&&void 0!==t){let s=this.attribute.name
this.value=t,e.__setProperty(s,t)}}update(e,t){var s=this.attribute
let n=s.element,i=s.name
this.value!==e&&(n[i]=this.value=e,null!==e&&void 0!==e||this.removeAttribute())}removeAttribute(){var e=this.attribute
let t=e.element,s=e.name,n=e.namespace
n?t.removeAttributeNS(n,s):t.removeAttribute(s)}}class Zt extends Qt{set(e,t,s){var n=this.attribute
let i=qt(s,n.element,n.name,t)
super.set(e,i,s)}update(e,t){var s=this.attribute
let n=qt(t,s.element,s.name,e)
super.update(n,t)}}class es extends Jt{set(e,t,s){var n=this.attribute
let i=qt(s,n.element,n.name,t)
super.set(e,i,s)}update(e,t){var s=this.attribute
let n=qt(t,s.element,s.name,e)
super.update(n,t)}}class ts extends Qt{set(e,t){e.__setProperty("value",at(t))}update(e){let t=this.attribute.element,s=t.value,n=at(e)
s!==n&&(t.value=n)}}class ss extends Qt{set(e,t){null!==t&&void 0!==t&&!1!==t&&e.__setProperty("selected",!0)}update(e){let t=this.attribute.element
t.selected=!!e}}function ns(e){return!1===e||void 0===e||null===e||void 0===e.toString?null:!0===e?"":"function"==typeof e?null:String(e)}class is{constructor(e,t,s,n){this.slots=e,this.callerScope=t,this.evalScope=s,this.partialMap=n}static root(e,t=0){let s=new Array(t+1)
for(let n=0;n<=t;n++)s[n]=me
return new is(s,null,null,null).init({self:e})}static sized(e=0){let t=new Array(e+1)
for(let s=0;s<=e;s++)t[s]=me
return new is(t,null,null,null)}init({self:e}){return this.slots[0]=e,this}getSelf(){return this.get(0)}getSymbol(e){return this.get(e)}getBlock(e){return this.get(e)}getEvalScope(){return this.evalScope}getPartialMap(){return this.partialMap}bind(e,t){this.set(e,t)}bindSelf(e){this.set(0,e)}bindSymbol(e,t){this.set(e,t)}bindBlock(e,t){this.set(e,t)}bindEvalScope(e){this.evalScope=e}bindPartialMap(e){this.partialMap=e}bindCallerScope(e){this.callerScope=e}getCallerScope(){return this.callerScope}child(){return new is(this.slots.slice(),this.callerScope,this.evalScope,this.partialMap)}get(e){if(e>=this.slots.length)throw new RangeError(`BUG: cannot get $${e} from scope; length=${this.slots.length}`)
return this.slots[e]}set(e,t){if(e>=this.slots.length)throw new RangeError(`BUG: cannot get $${e} from scope; length=${this.slots.length}`)
this.slots[e]=t}}class rs{constructor(){this.scheduledInstallManagers=[],this.scheduledInstallModifiers=[],this.scheduledUpdateModifierManagers=[],this.scheduledUpdateModifiers=[],this.createdComponents=[],this.createdManagers=[],this.updatedComponents=[],this.updatedManagers=[],this.destructors=[]}didCreate(e,t){this.createdComponents.push(e),this.createdManagers.push(t)}didUpdate(e,t){this.updatedComponents.push(e),this.updatedManagers.push(t)}scheduleInstallModifier(e,t){this.scheduledInstallManagers.push(t),this.scheduledInstallModifiers.push(e)}scheduleUpdateModifier(e,t){this.scheduledUpdateModifierManagers.push(t),this.scheduledUpdateModifiers.push(e)}didDestroy(e){this.destructors.push(e)}commit(){let e=this.createdComponents,t=this.createdManagers
for(let h=0;h<e.length;h++){let s=e[h]
t[h].didCreate(s)}let s=this.updatedComponents,n=this.updatedManagers
for(let h=0;h<s.length;h++){let e=s[h]
n[h].didUpdate(e)}let i=this.destructors
for(let h=0;h<i.length;h++)i[h].destroy()
let r=this.scheduledInstallManagers,o=this.scheduledInstallModifiers
for(let h=0;h<r.length;h++){let e=r[h],t=o[h]
e.install(t)}let a=this.scheduledUpdateModifierManagers,l=this.scheduledUpdateModifiers
for(let h=0;h<a.length;h++){let e=a[h],t=l[h]
e.update(t)}}}class os{constructor({appendOperations:e,updateOperations:t}){this._transaction=null,this.appendOperations=e,this.updateOperations=t}toConditionalReference(e){return new ye(e)}getAppendOperations(){return this.appendOperations}getDOM(){return this.updateOperations}getIdentity(e){return function(e){return e._guid||l(e)}(e)+""}begin(){this._transaction=new rs}get transaction(){return this._transaction}didCreate(e,t){this.transaction.didCreate(e,t)}didUpdate(e,t){this.transaction.didUpdate(e,t)}scheduleInstallModifier(e,t){this.transaction.scheduleInstallModifier(e,t)}scheduleUpdateModifier(e,t){this.transaction.scheduleUpdateModifier(e,t)}didDestroy(e){this.transaction.didDestroy(e)}commit(){let e=this.transaction
this._transaction=null,e.commit()}attributeFor(e,t,s,n=null){return Yt(e,t)}}class as{constructor(e,t,s,n,i=-1,r=-1){this.stack=e,this.heap=t,this.program=s,this.externs=n,this.pc=i,this.ra=r,this.currentOpSize=0}pushFrame(){this.stack.pushSmi(this.ra),this.stack.pushSmi(this.stack.fp),this.stack.fp=this.stack.sp-1}popFrame(){this.stack.sp=this.stack.fp-1,this.ra=this.stack.getSmi(0),this.stack.fp=this.stack.getSmi(1)}goto(e){let t=this.pc+e-this.currentOpSize
this.pc=t}call(e){this.ra=this.pc,this.pc=this.heap.getaddr(e)}returnTo(e){let t=this.pc+e-this.currentOpSize
this.ra=t}return(){this.pc=this.ra}nextStatement(){let e=this.pc,t=this.program
if(-1===e)return null
let s=this.program.opcode(e).size,n=this.currentOpSize=s
return this.pc+=n,t.opcode(e)}evaluateOuter(e,t){this.evaluateInner(e,t)}evaluateInner(e,t){e.isMachine?this.evaluateMachine(e):this.evaluateSyscall(e,t)}evaluateMachine(e){switch(e.type){case 47:return this.pushFrame()
case 48:return this.popFrame()
case 42:return this.call(e.op1)
case 41:return this.call(this.stack.popSmi())
case 44:return this.goto(e.op1)
case 20:return this.return()
case 21:return this.returnTo(e.op1)}}evaluateSyscall(e,t){ae.evaluate(t,e,e.type)}}class ls{constructor(e){this.trusting=e}retry(e,t){let s=this.bounds,n=s.parentElement(),i=Ct(s),r=gs.forInitialRender(e,{element:n,nextSibling:i})
return this.trusting?r.__appendTrustingDynamicContent(t):r.__appendCautiousDynamicContent(t)}}class hs{constructor(e){this.inner=e,this.bounds=e.bounds}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}update(e,t){let s=this.inner=this.inner.update(e,t)
return this.bounds=s.bounds,this}}class cs extends ls{constructor(e,t,s){super(s),this.bounds=e,this.lastValue=t}update(e,t){let s,n=this.lastValue
if(t===n)return this
if(ct(t)||ht(t))return this.retry(e,t)
if((s=lt(t)?"":pt(t)?t:String(t))!==n){this.bounds.firstNode().nodeValue=this.lastValue=s}return this}}class us extends ls{constructor(e,t,s){super(s),this.bounds=e,this.lastValue=t}update(e,t){return t===this.lastValue?this:this.retry(e,t)}}class ps extends ls{constructor(e,t,s){super(s),this.bounds=e,this.lastValue=t}update(e,t){let s=this.lastValue
return t===s?this:ht(t)&&t.toHTML()===s.toHTML()?(this.lastValue=t,this):this.retry(e,t)}}class ds extends ls{constructor(e,t,s){super(s),this.bounds=e,this.lastValue=t}update(e,t){let s=this.lastValue
return t===s?this:function(e){return lt(e)?"":pt(e)?e:ht(e)?e.toHTML():ct(e)?e:String(e)}(t)===s?this:this.retry(e,t)}}class ms{constructor(e){this.node=e}firstNode(){return this.node}}class fs{constructor(e){this.node=e}lastNode(){return this.node}}class gs{constructor(e,t,s){this.constructing=null,this.operations=null,this.cursorStack=new c,this.blockStack=new c,this.pushElement(t,s),this.env=e,this.dom=e.getAppendOperations(),this.updateOperations=e.getDOM()}static forInitialRender(e,t){let s=new this(e,t.element,t.nextSibling)
return s.pushSimpleBlock(),s}static resume(e,t,s){let n=new this(e,t.parentElement(),s)
return n.pushSimpleBlock(),n.pushBlockTracker(t),n}get element(){return this.cursorStack.current.element}get nextSibling(){return this.cursorStack.current.nextSibling}expectConstructing(e){return this.constructing}block(){return this.blockStack.current}popElement(){this.cursorStack.pop(),this.cursorStack.current}pushSimpleBlock(){return this.pushBlockTracker(new bs(this.element))}pushUpdatableBlock(){return this.pushBlockTracker(new ks(this.element))}pushBlockList(e){return this.pushBlockTracker(new vs(this.element,e))}pushBlockTracker(e,t=!1){let s=this.blockStack.current
return null!==s&&(s.newDestroyable(e),t||s.didAppendBounds(e)),this.__openBlock(),this.blockStack.push(e),e}popBlock(){return this.block().finalize(this),this.__closeBlock(),this.blockStack.pop()}__openBlock(){}__closeBlock(){}openElement(e){let t=this.__openElement(e)
return this.constructing=t,t}__openElement(e){return this.dom.createElement(e,this.element)}flushElement(){let e=this.element,t=this.constructing
this.__flushElement(e,t),this.constructing=null,this.operations=null,this.pushElement(t,null),this.didOpenElement(t)}__flushElement(e,t){this.dom.insertBefore(e,t,this.nextSibling)}closeElement(){this.willCloseElement(),this.popElement()}pushRemoteElement(e,t,s=null){this.__pushRemoteElement(e,t,s)}__pushRemoteElement(e,t,s){this.pushElement(e,s)
let n=new ys(e)
this.pushBlockTracker(n,!0)}popRemoteElement(){this.popBlock(),this.popElement()}pushElement(e,t){this.cursorStack.push(new yt(e,t))}didAddDestroyable(e){this.block().newDestroyable(e)}didAppendBounds(e){return this.block().didAppendBounds(e),e}didAppendNode(e){return this.block().didAppendNode(e),e}didOpenElement(e){return this.block().openElement(e),e}willCloseElement(){this.block().closeElement()}appendText(e){return this.didAppendNode(this.__appendText(e))}__appendText(e){let t=this.dom,s=this.element,n=this.nextSibling,i=t.createTextNode(e)
return t.insertBefore(s,i,n),i}__appendNode(e){return this.dom.insertBefore(this.element,e,this.nextSibling),e}__appendFragment(e){let t=e.firstChild
if(t){let s=function(e,t,s){return new kt(e,t,s)}(this.element,t,e.lastChild)
return this.dom.insertBefore(this.element,e,this.nextSibling),s}return wt(this.element,this.__appendComment(""))}__appendHTML(e){return this.dom.insertHTMLBefore(this.element,this.nextSibling,e)}appendTrustingDynamicContent(e){let t=new hs(this.__appendTrustingDynamicContent(e))
return this.didAppendBounds(t),t}__appendTrustingDynamicContent(e){if(pt(e))return this.trustedContent(e)
if(lt(e))return this.trustedContent("")
if(ht(e))return this.trustedContent(e.toHTML())
if(ut(e)){let t=this.__appendFragment(e)
return new us(t,e,!0)}if(ct(e)){let t=this.__appendNode(e)
return new us(wt(this.element,t),t,!0)}return this.trustedContent(String(e))}appendCautiousDynamicContent(e){let t=new hs(this.__appendCautiousDynamicContent(e))
return this.didAppendBounds(t.bounds),t}__appendCautiousDynamicContent(e){if(pt(e))return this.untrustedContent(e)
if(lt(e))return this.untrustedContent("")
if(ut(e)){let t=this.__appendFragment(e)
return new us(t,e,!1)}if(ct(e)){let t=this.__appendNode(e)
return new us(wt(this.element,t),t,!1)}if(ht(e)){let t=e.toHTML(),s=this.__appendHTML(t)
return new ps(s,e,!1)}return this.untrustedContent(String(e))}trustedContent(e){let t=this.__appendHTML(e)
return new ds(t,e,!0)}untrustedContent(e){let t=this.__appendText(e),s=wt(this.element,t)
return new cs(s,e,!1)}appendComment(e){return this.didAppendNode(this.__appendComment(e))}__appendComment(e){let t=this.dom,s=this.element,n=this.nextSibling,i=t.createComment(e)
return t.insertBefore(s,i,n),i}__setAttribute(e,t,s){this.dom.setAttribute(this.constructing,e,t,s)}__setProperty(e,t){this.constructing[e]=t}setStaticAttribute(e,t,s){this.__setAttribute(e,t,s)}setDynamicAttribute(e,t,s,n){let i=this.constructing,r=new(this.env.attributeFor(i,e,s,n))({element:i,name:e,namespace:n||null})
return r.set(this,t,this.env),r}}class bs{constructor(e){this.parent=e,this.first=null,this.last=null,this.destroyables=null,this.nesting=0}destroy(){let e=this.destroyables
if(e&&e.length)for(let t=0;t<e.length;t++)e[t].destroy()}parentElement(){return this.parent}firstNode(){return this.first&&this.first.firstNode()}lastNode(){return this.last&&this.last.lastNode()}openElement(e){this.didAppendNode(e),this.nesting++}closeElement(){this.nesting--}didAppendNode(e){0===this.nesting&&(this.first||(this.first=new ms(e)),this.last=new fs(e))}didAppendBounds(e){0===this.nesting&&(this.first||(this.first=e),this.last=e)}newDestroyable(e){this.destroyables=this.destroyables||[],this.destroyables.push(e)}finalize(e){this.first||e.appendComment("")}}class ys extends bs{destroy(){super.destroy(),Ct(this)}}class ks extends bs{reset(e){let t=this.destroyables
if(t&&t.length)for(let n=0;n<t.length;n++)e.didDestroy(t[n])
let s=Ct(this)
return this.first=null,this.last=null,this.destroyables=null,this.nesting=0,s}}class vs{constructor(e,t){this.parent=e,this.boundList=t,this.parent=e,this.boundList=t}destroy(){this.boundList.forEachNode(e=>e.destroy())}parentElement(){return this.parent}firstNode(){let e=this.boundList.head()
return e&&e.firstNode()}lastNode(){let e=this.boundList.tail()
return e&&e.lastNode()}openElement(e){}closeElement(){}didAppendNode(e){}didAppendBounds(e){}newDestroyable(e){}finalize(e){}}class ws{constructor(e=[]){this.vec=e}clone(){return new ws(this.vec.slice())}sliceFrom(e){return new ws(this.vec.slice(e))}slice(e,t){return new ws(this.vec.slice(e,t))}copy(e,t){this.vec[t]=this.vec[e]}writeRaw(e,t){this.vec[e]=t}writeSmi(e,t){var s
this.vec[e]=(s=t)<0?Math.abs(s)<<3|4:s<<3|0}getRaw(e){return this.vec[e]}getSmi(e){return function(e){switch(7&e){case 0:return e>>3
case 4:return-(e>>3)
default:throw new Error("unreachable")}}(this.vec[e])}reset(){this.vec.length=0}len(){return this.vec.length}}const Ss=2147483648,Cs=2147483647
class Es{constructor(e=new ws,t=[]){this.inner=e,this.js=t}slice(e,t){let s
return s="number"==typeof e&&"number"==typeof t?this.inner.slice(e,t):"number"==typeof e&&void 0===t?this.inner.sliceFrom(e):this.inner.clone(),new Es(s,this.js.slice(e,t))}sliceInner(e,t){let s=[]
for(let n=e;n<t;n++)s.push(this.get(n))
return s}copy(e,t){this.inner.copy(e,t)}write(e,t){if(function(e){let t=typeof e
if(null===e||void 0===e)return!0
switch(t){case"boolean":case"undefined":return!0
case"number":if(e%1!=0)return!1
let s=Math.abs(e)
return!(s&Ss)
default:return!1}}(t))this.inner.writeRaw(e,_s(t))
else{let s=this.js.length
this.js.push(t),this.inner.writeRaw(e,s|Ss)}}writeSmi(e,t){this.inner.writeSmi(e,t)}writeImmediate(e,t){this.inner.writeRaw(e,t)}get(e){let t=this.inner.getRaw(e)
return t&Ss?this.js[t&Cs]:function(e){switch(e){case 3:return!1
case 11:return!0
case 19:return null
case 27:return
default:return function(e){switch(7&e){case 0:return e>>3
case 4:return-(e>>3)
default:throw n()}}(e)}}(t)}getSmi(e){return this.inner.getSmi(e)}reset(){this.inner.reset()}get length(){return this.inner.len()}}class xs{constructor(e,t,s){this.stack=e,this.fp=t,this.sp=s}static empty(){return new this(new Es,0,-1)}static restore(e){let t=new Es
for(let s=0;s<e.length;s++)t.write(s,e[s])
return new this(t,0,e.length-1)}push(e){this.stack.write(++this.sp,e)}pushSmi(e){this.stack.writeSmi(++this.sp,e)}pushImmediate(e){this.stack.writeImmediate(++this.sp,_s(e))}pushEncodedImmediate(e){this.stack.writeImmediate(++this.sp,e)}pushNull(){this.stack.writeImmediate(++this.sp,19)}dup(e=this.sp){this.stack.copy(e,++this.sp)}copy(e,t){this.stack.copy(e,t)}pop(e=1){let t=this.stack.get(this.sp)
return this.sp-=e,t}popSmi(){return this.stack.getSmi(this.sp--)}peek(e=0){return this.stack.get(this.sp-e)}peekSmi(e=0){return this.stack.getSmi(this.sp-e)}get(e,t=this.fp){return this.stack.get(t+e)}getSmi(e,t=this.fp){return this.stack.getSmi(t+e)}set(e,t,s=this.fp){this.stack.write(s+t,e)}slice(e,t){return this.stack.slice(e,t)}sliceArray(e,t){return this.stack.sliceInner(e,t)}capture(e){let t=this.sp+1,s=t-e
return this.stack.sliceInner(s,t)}reset(){this.stack.reset()}toArray(){return this.stack.sliceInner(this.fp,this.sp+1)}}function _s(e){switch(typeof e){case"number":return function(e){return e<0?Math.abs(e)<<3|4:e<<3|0}(e)
case"boolean":return e?11:3
case"object":return 19
case"undefined":return 27
default:throw n()}}class As{constructor(e,t,{alwaysRevalidate:s=!1}){this.frameStack=new c,this.env=e,this.constants=t.constants,this.dom=e.getDOM(),this.alwaysRevalidate=s}execute(e,t){let s=this.frameStack
for(this.try(e,t);!s.isEmpty();){let e=this.frame.nextStatement()
null!==e?e.evaluate(this):this.frameStack.pop()}}get frame(){return this.frameStack.current}goto(e){this.frame.goto(e)}try(e,t){this.frameStack.push(new Ts(e,t))}throw(){this.frame.handleException(),this.frameStack.pop()}}class Ms extends he{constructor(e,t,s,n){super(),this.start=e,this.state=t,this.type="block",this.next=null,this.prev=null,this.children=n,this.bounds=s}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}evaluate(e){e.try(this.children,null)}destroy(){this.bounds.destroy()}didDestroy(){this.state.env.didDestroy(this.bounds)}}class Os extends Ms{constructor(e,t,s,n){super(e,t,s,n),this.type="try",this.tag=this._tag=R.create(w)}didInitializeChildren(){this._tag.inner.update(M(this.children))}evaluate(e){e.try(this.children,this)}handleException(){let e=this.state,t=this.bounds,s=this.children,n=this.start,i=this.prev,r=this.next
s.clear()
let o=gs.resume(e.env,t,t.reset(e.env)),a=Rs.resume(e,o),l=new p
a.execute(n,t=>{t.stack=xs.restore(e.stack),t.updatingOpcodeStack.push(l),t.updateWith(this),t.updatingOpcodeStack.push(s)}),this.prev=i,this.next=r}}class Ns{constructor(e,t){this.opcode=e,this.marker=t,this.didInsert=!1,this.didDelete=!1,this.map=e.map,this.updating=e.children}insert(e,t,s,n){let i=this.map,r=this.opcode,o=this.updating,a=null,l=null
a=n?(l=i[n]).bounds.firstNode():this.marker
let h=r.vmForInsertion(a),c=null,u=r.start
h.execute(u,n=>{i[e]=c=n.iterate(s,t),n.updatingOpcodeStack.push(new p),n.updateWith(c),n.updatingOpcodeStack.push(c.children)}),o.insertBefore(c,l),this.didInsert=!0}retain(e,t,s){}move(e,t,s,n){let i=this.map,r=this.updating,o=i[e],a=i[n]||null
St(o,n?a.firstNode():this.marker),r.remove(o),r.insertBefore(o,a)}delete(e){let t=this.map,s=t[e]
s.didDestroy(),Ct(s),this.updating.remove(s),delete t[e],this.didDelete=!0}done(){this.opcode.didInitializeChildren(this.didInsert||this.didDelete)}}class Ls extends Ms{constructor(e,t,s,n,i){super(e,t,s,n),this.type="list-block",this.map=h(),this.lastIterated=f,this.artifacts=i
let r=this._tag=R.create(w)
this.tag=O([i.tag,r])}didInitializeChildren(e=!0){this.lastIterated=this.artifacts.tag.value(),e&&this._tag.inner.update(M(this.children))}evaluate(e){let t=this.artifacts,s=this.lastIterated
if(!t.tag.validate(s)){let s=this.bounds,n=e.dom,i=n.createComment("")
n.insertAfter(s.parentElement(),i,s.lastNode())
let r=new Ns(this,i)
new V({target:r,artifacts:t}).sync(),this.parentElement().removeChild(i)}super.evaluate(e)}vmForInsertion(e){let t=this.bounds,s=this.state,n=gs.forInitialRender(s.env,{element:t.parentElement(),nextSibling:e})
return Rs.resume(s,n)}}class Ts{constructor(e,t){this.ops=e,this.exceptionHandler=t,this.current=e.head()}goto(e){this.current=e}nextStatement(){let e=this.current,t=this.ops
return e&&(this.current=t.nextNode(e)),e}handleException(){this.exceptionHandler&&this.exceptionHandler.handleException()}}class Ds{constructor(e,t,s,n){this.env=e,this.program=t,this.updating=s,this.bounds=n}rerender({alwaysRevalidate:e=!1}={alwaysRevalidate:!1}){let t=this.env,s=this.program,n=this.updating
new As(t,s,{alwaysRevalidate:e}).execute(n,this)}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}handleException(){throw"this should never happen"}destroy(){this.bounds.destroy(),Ct(this.bounds)}}class Rs{constructor(e,t,s,n,i){this.program=e,this.env=t,this.elementStack=i,this.dynamicScopeStack=new c,this.scopeStack=new c,this.updatingOpcodeStack=new c,this.cacheGroups=new c,this.listBlockStack=new c,this.s0=null,this.s1=null,this.t0=null,this.t1=null,this.v0=null,this.env=t,this.heap=e.heap,this.constants=e.constants,this.elementStack=i,this.scopeStack.push(s),this.dynamicScopeStack.push(n),this.inner=new as(xs.empty(),this.heap,e,{debugBefore:e=>ae.debugBefore(this,e,e.type),debugAfter:(e,t)=>{ae.debugAfter(this,e,e.type,t)}})}get stack(){return this.inner.stack}set stack(e){this.inner.stack=e}set currentOpSize(e){this.inner.currentOpSize=e}get currentOpSize(){return this.inner.currentOpSize}get pc(){return this.inner.pc}set pc(e){this.inner.pc=e}get ra(){return this.inner.ra}set ra(e){this.inner.ra=e}get fp(){return this.stack.fp}set fp(e){this.stack.fp=e}get sp(){return this.stack.sp}set sp(e){this.stack.sp=e}fetch(e){this.stack.push(this[ce[e]])}load(e){this[ce[e]]=this.stack.pop()}fetchValue(e){return this[ce[e]]}loadValue(e,t){this[ce[e]]=t}pushFrame(){this.inner.pushFrame()}popFrame(){this.inner.popFrame()}goto(e){this.inner.goto(e)}call(e){this.inner.call(e)}returnTo(e){this.inner.returnTo(e)}return(){this.inner.return()}static initial(e,t,s,n,i,r,o){let a=e.heap.scopesizeof(o),l=is.root(s,a),h=new Rs(e,t,l,i,r)
return h.pc=h.heap.getaddr(o),h.updatingOpcodeStack.push(new p),h}static empty(e,t,s){let n={get:()=>me,set:()=>me,child:()=>n},i=new Rs(e,t,is.root(me,0),n,s)
return i.updatingOpcodeStack.push(new p),i}static resume({program:e,env:t,scope:s,dynamicScope:n},i){return new Rs(e,t,s,n,i)}capture(e){return{env:this.env,program:this.program,dynamicScope:this.dynamicScope(),scope:this.scope(),stack:this.stack.capture(e)}}beginCacheGroup(){this.cacheGroups.push(this.updating().tail())}commitCacheGroup(){let e=new it("END"),t=this.updating(),s=this.cacheGroups.pop(),n=s?t.nextNode(s):t.head(),i=t.tail(),r=M(new d(n,i)),o=new st(r,e)
t.insertBefore(o,n),t.append(new nt(o)),t.append(e)}enter(e){let t=new p,s=this.capture(e),n=this.elements().pushUpdatableBlock(),i=new Os(this.heap.gethandle(this.pc),s,n,t)
this.didEnter(i)}iterate(e,t){let s=this.stack
s.push(t),s.push(e)
let n=this.capture(2),i=this.elements().pushUpdatableBlock()
return new Os(this.heap.gethandle(this.pc),n,i,new p)}enterItem(e,t){this.listBlock().map[e]=t,this.didEnter(t)}enterList(e){let t=new p,s=this.capture(0),n=this.elements().pushBlockList(t),i=this.stack.peek().artifacts,r=this.pc+e-this.currentOpSize,o=this.heap.gethandle(r),a=new Ls(o,s,n,t,i)
this.listBlockStack.push(a),this.didEnter(a)}didEnter(e){this.updateWith(e),this.updatingOpcodeStack.push(e.children)}exit(){this.elements().popBlock(),this.updatingOpcodeStack.pop(),this.updating().tail().didInitializeChildren()}exitList(){this.exit(),this.listBlockStack.pop()}updateWith(e){this.updating().append(e)}listBlock(){return this.listBlockStack.current}updating(){return this.updatingOpcodeStack.current}elements(){return this.elementStack}scope(){return this.scopeStack.current}dynamicScope(){return this.dynamicScopeStack.current}pushChildScope(){this.scopeStack.push(this.scope().child())}pushDynamicScope(){let e=this.dynamicScope().child()
return this.dynamicScopeStack.push(e),e}pushRootScope(e,t){let s=is.sized(e)
return t&&s.bindCallerScope(this.scope()),this.scopeStack.push(s),s}pushScope(e){this.scopeStack.push(e)}popScope(){this.scopeStack.pop()}popDynamicScope(){this.dynamicScopeStack.pop()}newDestroyable(e){this.elements().didAddDestroyable(e)}getSelf(){return this.scope().getSelf()}referenceForSymbol(e){return this.scope().getSymbol(e)}execute(e,t){let s
for(this.pc=this.heap.getaddr(e),t&&t(this);!(s=this.next()).done;);return s.value}next(){let e,t=this.env,s=this.program,n=this.updatingOpcodeStack,i=this.elementStack,r=this.inner.nextStatement()
return null!==r?(this.inner.evaluateOuter(r,this),e={done:!1,value:null}):(this.stack.reset(),e={done:!0,value:new Ds(t,s,n.pop(),i.popBlock())}),e}bindDynamicScope(e){let t=this.dynamicScope()
for(let s=e.length-1;s>=0;s--){let n=this.constants.getString(e[s])
t.set(n,this.stack.pop())}}}class Bs{constructor(e){this.vm=e}next(){return this.vm.next()}}let Is=0
class js{constructor(e,t){this.options=e,this.parsedLayout=t,this.layout=null,this.partial=null
let s=t.block
this.symbols=s.symbols,this.hasEval=s.hasEval,this.statements=s.statements,this.referrer=t.referrer,this.id=t.id||`client-${Is++}`}renderLayout(e){let t=e.env,s=e.self,n=e.dynamicScope
var i=e.args
let r=void 0===i?Ke:i,o=e.builder,a=this.asLayout().compile(),l=Rs.initial(this.options.program,t,s,r,n,o,a)
return new Bs(l)}asLayout(){return this.layout?this.layout:this.layout=Ps(this.parsedLayout,this.options,!1)}asPartial(){return this.partial?this.partial:this.partial=Ps(this.parsedLayout,this.options,!0)}}function Ps(e,t,s){let n=e.block,i=e.referrer,r=n.hasEval,a=n.symbols,l=o({},t,{asPartial:s,referrer:i})
return new Be(n.statements,e,l,{referrer:i,hasEval:r,symbols:a})}class Fs{get(e){return Vs.create(this,e)}}class Hs extends Fs{constructor(){super(...arguments),this._lastRevision=null,this._lastValue=null}value(){let e=this.tag,t=this._lastRevision,s=this._lastValue
return t&&e.validate(t)||(s=this._lastValue=this.compute(),this._lastRevision=e.value()),s}}class zs extends P{constructor(){super(...arguments),this.children=h()}get(e){let t=this.children[e]
return t||(t=this.children[e]=new $s(this.inner,e)),t}}class Vs extends Hs{static create(e,t){return C(e)?new $s(e.value(),t):new Us(e,t)}get(e){return new Us(this,e)}}class $s extends Vs{constructor(e,t){super(),this._parentValue=e,this._propertyKey=t,this.tag=J(e,t)}compute(){return this._parentValue[this._propertyKey]}}class Us extends Vs{constructor(e,t){super()
let s=e.tag,n=R.create(w)
this._parentReference=e,this._parentObjectTag=n,this._propertyKey=t,this.tag=O([s,n])}compute(){let e=this._parentReference,t=this._parentObjectTag,s=this._propertyKey,n=e.value()
return t.inner.update(J(n,s)),"string"==typeof n&&"length"===s?n.length:"object"==typeof n&&n?n[s]:void 0}}class qs extends Fs{constructor(e){super(),this.tag=_.create(),this._value=e}value(){return this._value}update(e){e!==this._value&&(this.tag.inner.dirty(),this._value=e)}}class Gs{constructor(e,t,s){let n=e.ComponentClass,i=e.name
this.args=t
let r={debugName:i,args:this.namedArgsSnapshot()}
re(r,s),n&&(this.component=n.create(r))}get tag(){return this.args.tag}namedArgsSnapshot(){return Object.freeze(this.args.named.value())}}const Xs=new zs(null)
class Ys{static create(e){return new Ys(e)}constructor(e){this.env=e.env}prepareArgs(e,t){return null}getCapabilities(e){return e.capabilities}getLayout({name:e,handle:t,symbolTable:s},n){return t&&s?{handle:t,symbolTable:s}:n.compileTemplate(e,t)}create(e,t,s,n,i,r){if(t.ComponentClass){let e=ie(this.env)
return new Gs(t,s.capture(),e)}}getSelf(e){return e?new zs(e.component):Xs}didCreateElement(e,t){}didRenderLayout(e,t){e&&(e.component.bounds=new oe(t))}didCreate(e){e&&e.component.didInsertElement()}getTag(e){return e?e.tag:w}update(e,t){e&&(e.component.args=e.namedArgsSnapshot())}didUpdateLayout(){}didUpdate(e){e&&e.component.didUpdate()}getDestructor(e){return e?e.component:Ws}}const Ws={destroy(){}}
class Ks{constructor(e,t){this._registry=e,this._resolver=t}register(e,t,s){let n=this._toAbsoluteSpecifier(e)
this._registry.register(n,t,s)}registration(e){let t=this._toAbsoluteSpecifier(e)
return this._registry.registration(t)}unregister(e){let t=this._toAbsoluteSpecifier(e)
this._registry.unregister(t)}registerOption(e,t,s){let n=this._toAbsoluteOrTypeSpecifier(e)
this._registry.registerOption(n,t,s)}registeredOption(e,t){let s=this._toAbsoluteOrTypeSpecifier(e)
return this._registry.registeredOption(s,t)}registeredOptions(e){let t=this._toAbsoluteOrTypeSpecifier(e)
return this._registry.registeredOptions(t)}unregisterOption(e,t){let s=this._toAbsoluteOrTypeSpecifier(e)
this._registry.unregisterOption(s,t)}registerInjection(e,t,s){let n=this._toAbsoluteOrTypeSpecifier(e),i=this._toAbsoluteSpecifier(s)
this._registry.registerInjection(n,t,i)}registeredInjections(e){let t=this._toAbsoluteOrTypeSpecifier(e)
return this._registry.registeredInjections(t)}_toAbsoluteSpecifier(e,t){return this._resolver.identify(e,t)}_toAbsoluteOrTypeSpecifier(e){return function(e){return-1===e.indexOf(":")}(e)?e:this._toAbsoluteSpecifier(e)}}class Js{constructor(e=null){this.bucket=e?o({},e):{}}get(e){return this.bucket[e]}set(e,t){return this.bucket[e]=t}child(){return new Js(this.bucket)}}class Qs{constructor(e,t){this.position=0,this.array=e,this.keyFor=t}isEmpty(){return 0===this.array.length}next(){let e=this.position,t=this.array,s=this.keyFor
if(e>=t.length)return null
let n=t[e],i=s(n,e),r=e
return this.position++,{key:i,value:n,memo:r}}}class Zs{constructor(e,t,s){this.position=0,this.keys=e,this.values=t,this.keyFor=s}isEmpty(){return 0===this.keys.length}next(){let e=this.position,t=this.keys,s=this.values,n=this.keyFor
if(e>=t.length)return null
let i=s[e],r=t[e],o=n(i,r)
return this.position++,{key:o,value:i,memo:r}}}const en=new class{isEmpty(){return!0}next(){throw new Error("Cannot call next() on an empty iterator")}}
class tn{constructor(e,t){this.tag=e.tag,this.ref=e,this.keyFor=t}iterate(){let e=this.ref,t=this.keyFor,s=e.value()
if(Array.isArray(s))return s.length>0?new Qs(s,t):en
if(void 0===s||null===s)return en
if(void 0!==s.forEach){let e=[]
return s.forEach(function(t){e.push(t)}),e.length>0?new Qs(e,t):en}if("object"==typeof s){let e=Object.keys(s)
return e.length>0?new Zs(e,e.map(e=>s[e]),t):en}throw new Error(`Don't know how to {{#each ${s}}}`)}valueReferenceFor(e){return new qs(e.value)}updateValueReference(e,t){e.update(t.value)}memoReferenceFor(e){return new qs(e.memo)}updateMemoReference(e,t){e.update(t.memo)}}class sn extends os{static create(e={}){return e.document=e.document||self.document,e.appendOperations=e.appendOperations||new Bt(e.document),new sn(e)}constructor(e){super({appendOperations:e.appendOperations,updateOperations:new Rt(e.document||document)}),re(this,ie(e)),this.uselessAnchor=e.document.createElement("a")}protocolForURL(e){return this.uselessAnchor.href=e,this.uselessAnchor.protocol}iterableFor(e,t){let s
if(!t)throw new Error("Must specify a key for #each")
switch(t){case"@index":s=((e,t)=>String(t))
break
case"@primitive":s=(e=>String(e))
break
default:s=(e=>e[t])}return new tn(e,s)}}const nn="object"==typeof document?document:null
class rn{constructor(e){this._roots=[],this._rootsIndex=0,this._initializers=[],this._initialized=!1,this._rendering=!1,this._rendered=!1,this._scheduled=!1,this._notifiers=[],this.rootName=e.rootName,this.resolver=e.resolver,i(e.loader,"Must provide a Loader for preparing templates and other metadata required for a Glimmer Application."),i(e.renderer,"Must provide a Renderer to render the templates produced by the Loader."),i(e.builder,"Must provide a Builder that is responsible to building DOM."),this.document=e.document||nn,this.loader=e.loader,this.renderer=e.renderer,this.builder=e.builder}renderComponent(e,t,s=null){let n=this._roots,i=this._self
n.push({id:this._rootsIndex++,component:e,parent:t,nextSibling:s}),i&&(i.update({roots:n}),this.scheduleRerender())}async boot(){this.initialize(),this.env=this.lookup(`environment:/${this.rootName}/main/main`),await this._render()}scheduleRerender(){!this._scheduled&&this._rendered&&(this._rendering=!0,this._scheduled=!0,setTimeout(()=>{this._scheduled=!1,this._rerender(),this._rendering=!1},0))}initialize(){this.initRegistry(),this.initContainer()}registerInitializer(e){this._initializers.push(e)}initRegistry(){let e=this._registry=new se,t=new Ks(this._registry,this.resolver)
e.register(`environment:/${this.rootName}/main/main`,sn),e.registerOption("helper","instantiate",!1),e.registerOption("template","instantiate",!1),e.register(`document:/${this.rootName}/main/main`,this.document),e.registerOption("document","instantiate",!1),e.registerInjection("environment","document",`document:/${this.rootName}/main/main`),e.registerInjection("component-manager","env",`environment:/${this.rootName}/main/main`)
let s=this._initializers
for(let n=0;n<s.length;n++)s[n].initialize(t)
this._initialized=!0}initContainer(){this._container=new te(this._registry,this.resolver),this._container.defaultInjections=(e=>{let t={}
return re(t,this),t})}async _render(){let e=this.env,t=this._self=new qs({roots:this._roots}),s=new Js,n=this.builder.getBuilder(e),i=await this.loader.getTemplateIterator(this,e,n,s,t)
try{e.begin(),await this.renderer.render(i),e.commit(),this._didRender()}catch(e){throw this._didError(e),e}}async _rerender(){let e=this.env
try{e.begin(),await this.renderer.rerender(),e.commit(),this._didRender()}catch(e){throw this._didError(e),e}}_didRender(){this._rendered=!0
let e=this._notifiers
this._notifiers=[],e.forEach(e=>e[0]())}_didError(e){let t=this._notifiers
this._notifiers=[],t.forEach(t=>t[1](e))}identify(e,t){return this.resolver.identify(e,t)}factoryFor(e,t){return this._container.factoryFor(this.identify(e,t))}lookup(e,t){return this._container.lookup(this.identify(e,t))}}class on{constructor(){this.byName=h(),this.byHandle=h()}hasName(e){return e in this.byName}getHandle(e){return this.byName[e]}hasHandle(e){return e in this.byHandle}getByHandle(e){return this.byHandle[e]}register(e,t,s){this.byHandle[e]=s,this.byName[t]=e}}class an{constructor(e,t){this.helper=e,this.tag=t.tag,this.args=t.capture()}value(){let e=this.helper,t=this.args
return e(t.positional.value(),t.named.value())}get(){return new zs(this)}}class ln{constructor(e){this.owner=e,this.handleLookup=[],this.cache={component:new on,template:new on,compiledTemplate:new on,helper:new on,manager:new on,modifier:new on}}setCompileOptions(e){this.templateOptions=e}lookup(e,t,s){return this.cache[e].hasName(t)?this.cache[e].getHandle(t):null}register(e,t,s){let n=this.cache[e],i=this.handleLookup.length
return this.handleLookup.push(n),this.cache[e].register(i,t,s),i}lookupModifier(e,t){let s=this.lookup("modifier",e)
if(null===s)throw new Error(`Modifier for ${e} not found.`)
return s}compileTemplate(e,t){if(!this.cache.compiledTemplate.hasName(e)){let s=this.resolve(t),n=s.block,i=s.meta,r=s.id,o=JSON.parse(n),a=new js(this.templateOptions,{id:r,block:o,referrer:i}).asLayout(),l={handle:a.compile(),symbolTable:a.symbolTable}
return this.register("compiledTemplate",e,l),l}let s=this.lookup("compiledTemplate",e)
return this.resolve(s)}registerHelper(e,t){return this.register("helper",e,(e,s)=>new an(t,s))}registerInternalHelper(e,t){this.register("helper",e,t)}registerComponent(e,t,s,n){let i=this.registerTemplate(t,n),r=this.managerFor(i.meta.managerId),o=new ee(e,r,s,i.handle)
return this.register("component",e,o)}lookupComponentHandle(e,t){return this.cache.component.hasName(e)||this.lookupComponent(e,t),this.lookup("component",e,t)}managerFor(e="main"){let t
if(this.cache.manager.hasName(e)){let t=this.cache.manager.getHandle(e)
return this.cache.manager.getByHandle(t)}{let s=this.owner.rootName
if(!(t=this.owner.lookup(`component-manager:/${s}/component-managers/${e}`)))throw new Error(`No component manager found for ID ${e}.`)
return this.register("manager",e,t),t}}registerTemplate(e,t){return{name:e,handle:this.register("template",e,t),meta:t.meta}}lookupComponent(e,t){let s
if(this.cache.component.hasName(e))s=this.lookup("component",e,t)
else{let n=function(e,t){if(null===e||void 0===e)throw new Error(t)
return e}(this.identifyComponent(e,t),`Could not find the component '${e}'`),i=this.owner.lookup("template",n),r=this.owner.identify("component",n),o=null
void 0!==r&&(o=this.owner.factoryFor(r)),s=this.registerComponent(e,n,o,i)}return this.resolve(s)}lookupHelper(e,t){if(!this.cache.helper.hasName(e)){let s=this.owner,n=`helper:${e}`,i=t.specifier,r=s.identify(n,i)
if(void 0===r)return null
let o=this.owner.lookup(r,t.specifier)
return this.registerHelper(e,o)}return this.lookup("helper",e,t)}lookupPartial(e,t){throw new Error("Partials are not available in Glimmer applications.")}resolve(e){return this.handleLookup[e].getByHandle(e)}identifyComponent(e,t){let s=this.owner,n=`template:${e}`,i=t.specifier,r=s.identify(n,i)
if(void 0===r&&s.identify(`component:${e}`,i))throw new Error(`The component '${e}' is missing a template. All components must have a template. Make sure there is a template.hbs in the component directory.`)
return r}}const hn={},cn=0,un=Object.freeze([])
class pn{constructor(){this.strings=[],this.arrays=[un],this.tables=[],this.handles=[],this.resolved=[],this.floats=[],this.negatives=[]}float(e){let t=this.floats.indexOf(e)
return t>-1?t:this.floats.push(e)-1}negative(e){return this.negatives.push(e)-1}string(e){let t=this.strings.indexOf(e)
return t>-1?t:this.strings.push(e)-1}stringArray(e){let t=new Array(e.length)
for(let s=0;s<e.length;s++)t[s]=this.string(e[s])
return this.array(t)}array(e){if(0===e.length)return cn
let t=this.arrays.indexOf(e)
return t>-1?t:this.arrays.push(e)-1}handle(e){let t=this.handles.indexOf(e)
return t>-1?t:(this.resolved.push(hn),this.handles.push(e)-1)}serializable(e){let t=JSON.stringify(e),s=this.strings.indexOf(t)
return s>-1?s:this.strings.push(t)-1}toPool(){return{strings:this.strings,arrays:this.arrays,handles:this.handles,floats:this.floats,negatives:this.negatives}}}class dn extends pn{constructor(e,t){super(),this.resolver=e,t&&(this.strings=t.strings,this.arrays=t.arrays,this.handles=t.handles,this.floats=t.floats,this.negatives=t.negatives,this.resolved=this.handles.map(()=>hn))}getFloat(e){return this.floats[e]}getNegative(e){return this.negatives[e]}getString(e){return this.strings[e]}getStringArray(e){let t=this.getArray(e),s=new Array(t.length)
for(let n=0;n<t.length;n++){let e=t[n]
s[n]=this.getString(e)}return s}getArray(e){return this.arrays[e]}resolveHandle(e){let t=this.resolved[e]
if(t===hn){let s=this.handles[e]
t=this.resolved[e]=this.resolver.resolve(s)}return t}getSerializable(e){return JSON.parse(this.strings[e])}}class mn extends dn{constructor(){super(...arguments),this.others=[],this.serializables=[]}serializable(e){let t=this.serializables.indexOf(e)
return t>-1?t:this.serializables.push(e)-1}getSerializable(e){return this.serializables[e]}getOther(e){return this.others[e-1]}other(e){return this.others.push(e)}}class fn{constructor(e){this.heap=e,this.offset=0}get size(){return 1+((768&this.heap.getbyaddr(this.offset))>>8)}get isMachine(){return 1024&this.heap.getbyaddr(this.offset)}get type(){return 255&this.heap.getbyaddr(this.offset)}get op1(){return this.heap.getbyaddr(this.offset+1)}get op2(){return this.heap.getbyaddr(this.offset+2)}get op3(){return this.heap.getbyaddr(this.offset+3)}}function gn(e,t,s){return e|t<<16|s<<30}function bn(e,t){return e|t<<30}class yn{constructor(e){if(this.placeholders=[],this.offset=0,this.handle=0,e){let t=e.buffer,s=e.table,n=e.handle
this.heap=new Uint16Array(t),this.table=s,this.offset=this.heap.length,this.handle=n}else this.heap=new Uint16Array(1048576),this.table=[]}push(e){this.heap[this.offset++]=e}getbyaddr(e){return this.heap[e]}setbyaddr(e,t){this.heap[e]=t}malloc(){this.table.push(this.offset,0)
let e=this.handle
return this.handle+=2,e}finishMalloc(e,t){let s=this.table[e],n=gn(this.offset-s,t,0)
this.table[e+1]=n}size(){return this.offset}getaddr(e){return this.table[e]}gethandle(e){this.table.push(e,gn(0,0,3))
let t=this.handle
return this.handle+=2,t}sizeof(e){return-1}scopesizeof(e){return(1073676288&this.table[e+1])>>16}free(e){let t=this.table[e+1]
this.table[e+1]=bn(t,1)}compact(){let e=0,t=this.table,s=this.table.length,n=this.heap
for(let i=0;i<s;i+=2){let s=t[i],r=t[i+1],o=65535&r,a=-1&r
if(2!==a)if(1===a)t[i+1]=bn(r,2),e+=o
else if(0===a){for(let t=s;t<=i+o;t++)n[t-e]=n[t]
t[i]=s-e}else 3===a&&(t[i]=s-e)}this.offset=this.offset-e}pushPlaceholder(e){let t=this.offset++
this.heap[t]=65535,this.placeholders.push([t,e])}patchPlaceholders(){let e=this.placeholders
for(let s=0;s<e.length;s++){var t=e[s]
let n=t[0],i=t[1]
this.setbyaddr(n,i())}}capture(){this.patchPlaceholders()
let e=function(e,t,s){if(e instanceof Uint16Array){if(void 0!==e.slice)return e.slice(t,s).buffer
let n=new Uint16Array(s)
for(;t<s;t++)n[t]=e[t]
return n.buffer}return null}(this.heap,0,this.offset)
return{handle:this.handle,table:this.table,buffer:e}}}class kn{constructor(e=new pn,t=new yn){this.constants=e,this.heap=t,this._opcode=new fn(this.heap)}opcode(e){return this._opcode.offset=e,this._opcode}}class vn extends kn{}var wn={id:"j7SGa6Pm",block:'{"symbols":["root"],"statements":[[4,"each",[[22,["roots"]]],[["key"],["id"]],{"statements":[[4,"in-element",[[21,1,["parent"]]],[["guid","nextSibling"],["%cursor:0%",[21,1,["nextSibling"]]]],{"statements":[[1,[26,"component",[[21,1,["component"]]],null],false]],"parameters":[]},null]],"parameters":[1]},null]],"hasEval":false}',meta:{specifier:"template:/-application/application/src/templates/main"}}
function Sn(e,t){let s=e.getSelf(),n=t.capture(),i=n.positional.at(0).value()
return"function"!=typeof i&&function(e,t){let s=function(e){let t,s,n=""
if(null===e||void 0===e)return n
"parent"in e&&"property"in e?(t=e.parent.value(),s=e.property):"_parentValue"in e&&"_propertyKey"in e&&(t=e._parentValue,s=e._propertyKey)
void 0!==s&&(n+=`('${s}' on ${function(e){let t=typeof e
if(null===e||void 0===e)return t
if("number"===t||"boolean"===t)return e.toString()
if(e.debugName)return e.debugName
try{return JSON.stringify(e)}catch(e){}return e.toString()}(t)}) `)
return n}(t)
throw new Error(`You tried to create an action with the {{action}} helper, but the first argument ${s}was ${typeof e} instead of a function.`)}(i,n.positional.at(0)),new qs(function(...e){let t=n.positional.value()
t.shift(),t.push(...e),i.apply(s&&s.value(),t)})}function Cn(e){return e[0]?e[1]:e[2]}class En{constructor(e){this.resolver=e}getComponentDefinition(e){let t=this.resolver.resolve(e)
return i(!!t,`Couldn't find a template for ${e}`),t}getCapabilities(e){let t=this.getComponentDefinition(e),s=t.manager,n=t.state
return s.getCapabilities(n)}getLayout(e){let t=this.getComponentDefinition(e),s=t.manager.getLayout(t,this.resolver)
return{compile:()=>s.handle,symbolTable:s.symbolTable}}lookupHelper(e,t){return this.resolver.lookupHelper(e,t)}lookupModifier(e,t){return this.resolver.lookupModifier(e,t)}lookupComponentDefinition(e,t){return this.resolver.lookupComponentHandle(e,t)}lookupPartial(e,t){return this.resolver.lookupPartial(e,t)}}class xn{constructor(e){this.resolver=e}async getTemplateIterator(e,t,s,n,i){let r=new ln(e),a={program:new vn(new mn(r)),macros:new Le,resolver:new En(r),Builder:ze}
r.setCompileOptions(a),r.registerTemplate("main",wn),r.registerInternalHelper("action",Sn),r.registerHelper("if",Cn)
let l=function({id:e,meta:t,block:s}){let n,i=e||`client-${Is++}`
return{id:i,meta:t,create:(e,r)=>{let a=r?o({},r,t):t
return n||(n=JSON.parse(s)),new js(e,{id:i,block:n,referrer:a})}}}(wn).create(a)
return Promise.resolve(l.renderLayout({env:t,builder:s,dynamicScope:n,self:i}))}}class _n{constructor({element:e,nextSibling:t=null}){this.cursor={element:e,nextSibling:t}}getBuilder(e){return function(e,t){return gs.forInitialRender(e,t)}(e,this.cursor)}}class An{render(e){let t
do{t=e.next()}while(!t.done)
this.result=t.value}rerender(){if(!this.result)throw new Error("Cannot re-render before initial render has completed")
this.result.rerender()}}function Mn(e){return void 0!==e.rootName&&void 0!==e.collection&&void 0!==e.name&&void 0!==e.type}function On(e){let t=e.type,s=function(e){let t=[]
e.rootName&&t.push(e.rootName)
e.collection&&t.push(e.collection)
e.namespace&&t.push(e.namespace)
e.name&&t.push(e.name)
if(t.length>0){let s=t.join("/")
return Mn(e)&&(s="/"+s),s}}(e)
return s?t+":"+s:t}function Nn(e){let t={}
if(e.indexOf(":")>-1){var s=e.split(":")
let n,i=s[0],r=s[1]
t.type=i,0===r.indexOf("/")?(n=r.substr(1).split("/"),t.rootName=n.shift(),t.collection=n.shift()):n=r.split("/"),n.length>0&&(t.name=n.pop(),n.length>0&&(t.namespace=n.join("/")))}else t.type=e
return t}function Ln(e,t){if(!t)throw new Error("Assertion Failed: "+e)}class Tn{constructor(e,t){this.config=e,this.registry=t}identify(e,t){if(function(e){var t=e.split(":")
let s=t[0],n=t[1]
return!!(s&&n&&0===n.indexOf("/")&&n.split("/").length>3)}(e))return e
let s,n=Nn(e)
if(t){let e=Nn(t)
if(Mn(e)){Ln("Specifier must not include a rootName, collection, or namespace when combined with an absolute referrer",void 0===n.rootName&&void 0===n.collection&&void 0===n.namespace),n.rootName=e.rootName,n.collection=e.collection
let t=this._definitiveCollection(n.type)
if(!n.name)return n.namespace=e.namespace,n.name=e.name,this._serializeAndVerify(n)
if(n.namespace=e.namespace?e.namespace+"/"+e.name:e.name,function(e){let t=e.namespace,s=e.collection,n=t.lastIndexOf("/-")
if(n>-1){n+=2
let e=t.indexOf("/",n)
s=t.slice(n,e>-1?e:void 0)}return s}(n)===t&&(s=this._serializeAndVerify(n)))return s
if(t&&(n.namespace+="/-"+t,s=this._serializeAndVerify(n)))return s
n.rootName=n.collection=n.namespace=void 0}else Ln('Referrer must either be "absolute" or include a `type` to determine the associated type',e.type),n.collection=this._definitiveCollection(e.type),n.namespace||(n.namespace=e.rootName),Ln(`'${e.type}' does not have a definitive collection`,n.collection)}if(n.collection||(n.collection=this._definitiveCollection(n.type),Ln(`'${n.type}' does not have a definitive collection`,n.collection)),!n.rootName){if(n.rootName=this.config.app.rootName||"app",s=this._serializeAndVerify(n))return s
n.namespace?(n.rootName=n.namespace,n.namespace=void 0):(n.rootName=n.name,n.name="main")}return(s=this._serializeAndVerify(n))?s:void 0}retrieve(e){return this.registry.get(e)}resolve(e,t){let s=this.identify(e,t)
if(s)return this.retrieve(s)}_definitiveCollection(e){let t=this.config.types[e]
return Ln(`'${e}' is not a recognized type`,t),t.definitiveCollection}_serializeAndVerify(e){let t=On(e)
if(this.registry.has(t))return t}}class Dn{constructor(e={}){this._entries=e}has(e){return e in this._entries}get(e){return this._entries[e]}}function Rn(e=""){return e.charAt(0).toUpperCase()+e.slice(1)}function Bn(e){return e.replace(/  /g,"  ").replace(/\u00AD/g," ").replace(/^ | $/g," ")}function In(e){return e.replace?e.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&"):e}var jn=function(e,t,s,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,s,n)
else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(r<3?i(o):r>3?i(t,s,o):i(t,s))||o)
return r>3&&o&&Object.defineProperty(t,s,o),o}
class Pn extends Q{get content(){return Bn(this.args.token.content)}didInsertElement(){this.setEditor()}didUpdate(){var e=this.args
const t=e.selectionOffset,s=e.selectionLength
this.setFocussed(t,s)}didChangeFocus(){}setFocussed(e,t){const s=this.args.token,n=void 0!==typeof e&&s.editorOffset+s.length>=e&&s.editorOffset<=e+t
this.focussed!==n&&(this.focussed=n,this.didChangeFocus())}setEditor(){let e=this.element
for(;e.parentNode;)if((e=e.parentNode).classList&&e.classList.contains("mfgfm-editor"))return void(this.editor=e.__component__)}}jn([$],Pn.prototype,"focussed",void 0),jn([$("args")],Pn.prototype,"content",null)
class Fn extends Pn{didInsertElement(){super.didInsertElement(),this.boundOnSelectionchange=this.onSelectionchange.bind(this),document.addEventListener("selectionchange",this.boundOnSelectionchange)}willDestroy(){super.willDestroy(),document.removeEventListener("selectionchange",this.boundOnSelectionchange)}didUpdate(){}onSelectionchange(){var e=this.editor.selectionController
const t=e.offset,s=e.length
this.setFocussed(t,s)}}var Hn=function(e,t,s,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,s,n)
else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(r<3?i(o):r>3?i(t,s,o):i(t,s))||o)
return r>3&&o&&Object.defineProperty(t,s,o),o}
const zn=window.hljs
class Vn extends Fn{constructor(){super(...arguments),this.raw=!1}get codeEl(){return this.element.querySelectorAll("code")[1]}get highlighted(){return this.codeEl.classList.contains("hljs")}get language(){return this.args.token.info}didInsertElement(){super.didInsertElement(),setTimeout(()=>this.highlight(),1)}didChangeFocus(){this.highlight()}highlight(){this.editor.hljsController.loadLanguage(this.language,()=>this.changeHighlight())}changeHighlight(){var e=this.editor
const t=e.selectionController,s=e.inputController,n=t.offset,i=t.length
this.raw=this.focussed,setTimeout(()=>{this.raw&&!s.mouseIsSelecting?t.select(n,i):this.highlighted||zn.highlightBlock(this.codeEl)},1)}}Hn([$],Vn.prototype,"raw",void 0),Hn([$("args")],Vn.prototype,"language",null)
class $n extends Pn{get headingComponentName(){return`Heading${+this.args.token.tag.replace("h","")}`}}(function(e,t,s,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,s,n)
else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(r<3?i(o):r>3?i(t,s,o):i(t,s))||o)
r>3&&o&&Object.defineProperty(t,s,o)})([$("args")],$n.prototype,"headingComponentName",null)
var Un=function(e,t,s,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,s,n)
else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(r<3?i(o):r>3?i(t,s,o):i(t,s))||o)
return r>3&&o&&Object.defineProperty(t,s,o),o}
class qn extends Pn{didInsertElement(){super.didInsertElement(),setTimeout(()=>this.loadImg(),1)}get imgController(){return this.editor.imgController}get img(){return this.element.querySelector("img")}get backgroundStyle(){let e
return"loaded"===this.state?e=this.img.src:"error"===this.state&&(e="noimg-560ccacfa3771ffd7ca81dd89920ee56.png"),e?`background-image: url(${e})`:""}get alt(){return this.args.token.attrs.alt||" "}selectAll(){var e=this.args.token
const t=e.editorOffset,s=e.length
this.editor.selectionController.select(t,s)}loadImg(){const e=this.args.token.attrs.src
e&&this.imgController.load(e,e=>{this.state=e,"loaded"===e&&(this.img.src=this.args.token.attrs.src)})}}Un([$],qn.prototype,"state",void 0),Un([$("state")],qn.prototype,"backgroundStyle",null),Un([$("args")],qn.prototype,"alt",null)
const Gn=300
function Xn(e,t,s={fence:!1,emoji:!1}){let n,i=e.nodeType,r=e.nodeName,o=e.nodeValue,a=e.length,l=e.classList,h=e.parentNode
if("PRE"===r?s=Object.assign({},s,{fence:!0}):l&&l.contains("emoji")&&(s=Object.assign({},s,{emoji:!0})),3===i){if(s.emoji&&"SPAN"===h.tagName)return[n,t]
const i=o.match(/\n+/)
if(t<=a&&(!i||s.fence))return[e,t]
t=Math.max(0,t-a)}else for(let u of e.childNodes){var c=Xn(u,t,s)
if(n=c[0],t=c[1],n)return[n,t]}return[n,t]}function Yn(e){const t=e.dataset,s=e.parentNode,n=e.classList
if(n&&n.contains("mfgfm-editor"))return 0
if(t&&t.hasOwnProperty("offset")){const s=Wn(e,e=>"SECTION"===e.tagName)[0]
return+t.offset+ +s.dataset.offset}{let t=0
for(let n of s.childNodes){if(n===e)break
t+=n.textContent.length}return Yn(s)+t}}function Wn(e,t){const s=[]
for(;e.parentNode&&(!(e=e.parentNode).classList||!e.classList.contains("mfgfm-editor"));)t(e)&&s.push(e)
return s}function Kn(e){const t=e.querySelector("mark"),s=e.querySelector(".task-list-wrapper mark")
let n=t.getBoundingClientRect().width
if(s){Wn(s,e=>"LI"===e.tagName)[0]===e&&(n+=s.getBoundingClientRect().width,n+=Jn(e,"  "))}return" "!==t.textContent.slice(-1)&&(n+=Jn(e," ")),n}function Jn(e,t){const s=document.createElement("mark")
s.textContent=t,e.appendChild(s)
const n=s.getBoundingClientRect().width
return e.removeChild(s),n}const Qn=" ­"
class Zn{constructor({type:e="",tag:t="",content:s="",markup:n="",markdown:i="",info:r="",attrs:o=null}={}){this.baseChildren=[],this.tag="",this.type="",this.content="",this.markup="",this.markdown="",this.info="",this.absorbed=!1,this.leadingMarkup=[],this.trailingMarkup=[],e=e.replace(/_open/,""),this.tag=t,this.content=s,this.markdown=i,this.info=r,this.attrs=o,this.type=e,this.markup=n,this.componentName="whitespace"===e?"Text":function(e=""){return e.split(/[_-]/).map(Rn).join("")}(e),"emoji"===e&&(this.info=s,this.content=""),this.setMarkupTokens()}get prevSibling(){if(!this.parent)return
const e=this.parent.children
return e[e.indexOf(this)-1]}get nextSibling(){if(!this.parent)return
const e=this.parent.children
return e[e.indexOf(this)+1]}get firstChild(){return this.children[0]}get lastChild(){return this.children[this.children.length-1]}get ancestors(){let e=[],t=this
for(;t.parent&&"container"!==t.parent.type;)e.push(t.parent),t=t.parent
return e}get children(){const e=this.leadingMarkup,t=this.baseChildren,s=this.trailingMarkup
return[...e,...t,...s]}get offset(){return this.parent?this.prevSibling?this.prevSibling.tail:this.parent.offset:0}get tail(){return this.offset+this.length}get innerOffset(){const e=this.offset,t=this.leadingMarkup
return t.length?t[t.length-1].tail:e}get innerTail(){const e=this.tail,t=this.trailingMarkup
return t.length?t[t.length-1].offset:e}get editorOffset(){return(this.segment?this.segment.offset:0)+this.offset}get editorTail(){return this.editorOffset+this.length}get length(){if(this.absorbed)return 0
const e=this.children
return this.content.length+e.reduce((e,t)=>e+t.length,0)}get isAlternateHeadingSyntax(){return"heading"===this.type&&!this.markup.match("#")}didAddToParent(){this.absorbParentMarkup(),this.removePreviousWhiteSpace()
const e=this.type,t=this.content
switch(e){case"text":return this.addAdditionalMarkup()
case"image":return this.attrs.alt=t,this.content=""
case"fence":case"code_block":return this.content="",this.didCreateFence(t)}}traverseDownTree(e){const t=[this,...this.ancestors].reverse()
return e?t.find(t=>t.type===e):t[0]}traverseUpTree(e){const t=[this,...this.ancestors]
return e?t.find(t=>t.type===e):t[0]}addChild(e,t=null){const s=this.baseChildren,n=new Zn(e)
return n.parent=this,t?s.splice(t,0,n):s.push(n),n.didAddToParent(),n}addAdditionalMarkup(){const e=this.parent,t=this.prevSibling,s=this.offset,n=e.baseChildren
t&&e.leadingMarkup.forEach(t=>{const i=t.absorbedFrom
if(i&&"blockquote"===i.parent.type){const t=this.markdown.slice(s).match(/^>\s*/)
if(t){const s=e.markupToken(t[0],{absorbedFrom:i})
n.splice(n.indexOf(this),0,s)}}})}remove(){const e=this.parent,t=e.baseChildren,s=e.leadingMarkup,n=e.trailingMarkup
let i=t.indexOf(this)
if(i>=0)return void t.splice(i,1)
let r=s.indexOf(this)
if(r>=0)return void s.splice(r,1)
let o=n.indexOf(this)
o>=0&&n.splice(o,1)}optimizeChildren(e){this.children.forEach(t=>t.optimizeChildren(e)),this.children.forEach(t=>{t.segment=e,t.optimize()})}markupToken(e,{absorbedFrom:t=null}={}){const s=new Zn({content:e,type:"markup"})
return s.parent=this,t&&(s.absorbedFrom=t),s}setMarkupTokens(){if(!this.type.match(/_list$/)){if(this.isAlternateHeadingSyntax)return this.addClosingMarkup()
switch(this.addOpeningMarkup(),this.type){case"strong":case"em":case"s":case"code_inline":case"link":this.addClosingMarkup()}}}addOpeningMarkup(){const e=this.markup,t=this.type,s=this.info
switch(t){case"fence":return this.addMarkup("leading",e+s+"\n")
case"link":return this.addMarkup("leading","[")
case"image":{var n=this.attrs
const e=n.src,t=n.title,s=this.content
return this.addMarkup("leading","!["),this.addMarkup("leading",s),this.addMarkup("leading","]("),this.addMarkup("leading",e),t&&(this.addMarkup("leading",' "'),this.addMarkup("leading",t),this.addMarkup("leading",'"')),void this.addMarkup("leading",")")}case"emoji":return this.addMarkup("leading",`:${e}:`)
default:e&&this.addMarkup("leading",e)}}addClosingMarkup(){let e=this.markup,t=this.type,s=this.attrs
switch(t){case"link":return this.addMarkup("trailing","]("),this.addMarkup("trailing",s.href),void this.addMarkup("trailing",")")
default:this.addMarkup("trailing",e)}}addMarkup(e,t){this[`${e}Markup`].push(this.markupToken(t))}removePreviousWhiteSpace(){const e=this.type,t=this.prevSibling
"text"===e&&t&&"whitespace"===t.type&&t.remove()}absorbParentMarkup(){const e=["paragraph","heading",...["list_item","blockquote"]],t=this.parent,s=this.type
if(e.indexOf(s)<0)return
let n=t
t.type.match(/_list/)&&(n=t.parent)&&"list_item"===n.type||e.indexOf(n.type)>=0&&this.absorbMarkupFrom(n.leadingMarkup)}absorbMarkupFrom(e){e.forEach(e=>e.absorbed=!0)
const t=e.map(e=>this.markupToken(e.content,{absorbedFrom:e.absorbedFrom||e}))
this.leadingMarkup.unshift(...t)}optimize(){this.pushUpTrailingNewlines(),this.concatText(),this.removeDuplicateNewlines()}pushUpTrailingNewlines(){const e=this.parent,t=this.type,s=this.content
if("whitespace"!==t||this!==e.lastChild||"container"===e.type||!s.match(/^\n+$/))return
const n=e.parent
if("container"!==n.type&&e!==n.lastChild)return
const i="container"===n.type?n.baseChildren.indexOf(e)+1:null
n.addChild({type:t,content:s},i),this.remove()}concatText(){const e=this.type,t=this.prevSibling
t&&e.match(/text|whitespace/)&&"text"===t.type&&(t.content+=this.content,this.remove())}removeDuplicateNewlines(){const e=this.type,t=this.prevSibling
"softbreak"===e&&t&&"whitespace"===t.type&&"\n"===t.content&&t.remove()}didCreateFence(e){let t=this.markdown.slice(this.offset+this.length)
e.split(/(\n)/g).forEach(e=>{const s=`^([${Qn}]*)${In(e)}`,n=t.match(new RegExp(s))
n&&n[1]&&(this.baseChildren.push(this.markupToken(n[1])),t=t.slice(n[1].length)),e&&(this.addChild({type:"text",content:e}),t=t.slice(e.length))}),t.match(/^```/)&&this.addClosingMarkup()}}const ei=new e
ei.disable("entity"),ei.use(t,{shortcuts:!1}),ei.use(s)
const ti=" ­"
function si(e,t,s=null,n=new Zn({type:"container"})){for(let i of e){const e=i.type,s=i.nesting
i.attrs=(i.attrs||[]).reduce((e,[t,s])=>(e[t]=s,e),{}),e.match(/_open$/)?n=ni(i,t,n):e.match(/_close$/)?n=ii(i,t,n):"inline"===e?ri(i,t,n):e.match(/break$/)?oi(i,t,n):"html_inline"===e?ai(i,t,n):0===s&&"text"!==e?li(i,t,n):hi(i,t,n)}return"container"===n.type&&n.optimizeChildren(s),n.children}function ni(e,t,s){if("ordered_list"===s.type&&(e.markup=function({markup:e},t,s){t=t.slice(s.tail)
const n=new RegExp(`^.*?\\d+${In(e)}`),i=t.match(n)
return i?i[0]:e}(e,t,s)),"heading_open"!==e.type||e.markup.match("#"))e.type.match(/_list/)&&s.lastChild&&"markup"===s.lastChild.type&&ui(e,t,s)
else{const n=new RegExp(`.+?\\n([${ti}]*[-=]+[${ti}]*)`),i=t.slice(s.tail).match(n)
e.markup=i[1].replace(/ /g,"­")}var n=e=ci(e,t,s)
let i=n.tag,r=n.type,o=n.markup,a=n.attrs
return s.addChild({tag:i,type:r,markup:o,markdown:t,attrs:a})}function ii(e,t,s){return"heading_close"!==e.type||e.markup.match("#")||oi({type:"softbreak",markup:""},t,s),ui(e,t,s.parent),s.parent}function ri(e,t,s){si(e.children,t,null,s)}function oi(e,t,s){return e.content="\n",hi(e,t,s)}function ai(e,t,s){let n=e.type,i=e.markup,r=e.content,o=e.info,a=e.attrs
const l=r.match(/^<input class="task-list-item-checkbox" (checked="")?/)
l&&(n="task-list-item",r="",a.checked=!!l[1],i=`[${e.attrs.checked?"x":" "}]`),s.addChild({type:n,markup:i,markdown:t,content:r,info:o,attrs:a})}function li(e,t,s){const n=e.type,i=e.markup,r=e.content,o=e.info,a=e.attrs,l=s.addChild({type:n,markup:i,markdown:t,content:r,info:o,attrs:a})
if("code_inline"===n){l.content=""
let e={content:r,type:"text"}
e=ci(e,t,l),l.addChild({type:e.type,content:e.content})}ui(e,t,s)}function hi(e,t,s){var n=e=ci(e,t,s)
let i=n.type,r=n.markup,o=n.content
if(o.length){return s.addChild({type:i,markup:r,markdown:t,content:o})}}function ci(e,t,s){const n="text"===e.type?"content":"markup",i=e[n]
if(i.length){t=t.slice(s.innerTail)
const r=`^([${ti}]*)${In(i)}([${ti}]*)`,o=t.match(new RegExp(r))
o&&(e[n]=o[1]+i+(o[2]||""))}return e}function ui(e,t,s){var n=s
const i=n.tail,r=n.type,o=n.lastChild
t=t.slice(i)
const a=new RegExp(`^([${ti}]*)(\n*)`),l=t.match(a)
if(!l)return
var h=l.slice(1)
let c=h[0],u=h[1]
c&&("markup"===o.type||r.match(/list/)||"container"===r&&"paragraph"!==o.type)||[c,u].forEach(e=>{e.length&&(e===c&&"paragraph"===o.type&&(s=o),s.addChild({content:e.replace(/ /g,"­"),type:"whitespace"}))})}var pi=function(e,t,s,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,s,n)
else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(r<3?i(o):r>3?i(t,s,o):i(t,s))||o)
return r>3&&o&&Object.defineProperty(t,s,o),o}
class di{constructor(e=0,t=""){this.markdown=t,this.offset=e}get guidString(){return`${this.guid}`}get length(){return this.markdown.length}get modifiedMarkdown(){let e=this.markdown
if(!e.match(/^```/)){let t=!1
e=(e=e.replace(/(^|\n)([ \u00A0]+)(\n|$)/g,(e,t,s,n)=>t+new Array(s.length+1).join("­")+n).replace(/(^|\n)([ ]{4,}\S*\n)([\u00AD]{4,})/g,(e,t,s,n)=>t+s+new Array(n.length+1).join(" "))).split(/(`)/).map(e=>("`"===e&&(t=!t),t?e:e.replace(/\\/g,"\\\\"))).join("")}return e.replace(/\u00A0/g,"­")}parseTokens(){if("\n\n"===this.markdown){const e=new Zn({content:"\n\n",type:"whitespace"})
return e.segment=this,this.tokens=[e]}const e=this.modifiedMarkdown,t=si(ei.parse(e,{}),e.replace(/\\\\/g,"\\"),this)
return this.tokens=t}}pi([$],di.prototype,"offset",void 0),pi([$],di.prototype,"tokens",void 0)
const mi="\n\n# Hello World!\n\nMF.GFM is a prototype _Markdown_ editor that parses and formats text **as you type!**\n\n### But... why another Markdown editor?\n\nI simply wanted to use a web Markdown editor that doesn't feature two ugly side-by-side panes or `Write` and `Preview` tabs that are troublesome to switch between. Sorry GitHub, but that's you!\n\n### Some quick features:\n\n- Still in very early-stage development, so there will be bugs :beetle:\n- Built with [Glimmer.js](https://glimmerjs.com/)\n\n- #### GitHub Flavored Markdown\n  - [x] Clickable tasks lists\n  - [x] Emoji :boom::tada::star2:\n  - [ ] Tables (coming soon!)\n\n```js\nfunction evenHasCodeFences(level = 9000) {\n  console.log('syntaxHighlighting' === true); // although color theme differs\n}\n```\n\n> This is **awesome**, said ~~nobody~~ everybody ever\n\n![Markdown](https://github.com/dcurtis/markdown-mark/blob/master/png/66x40.png?raw=true \"Markdown Logo\")\n\n---\n\n### Issues & Feedback\n\nFound a bug? Have a suggestion? I'd love to [hear it](https://github.com/wongpeiyi/mfgfm/issues/new)!\n\n".replace(/^\n+|\n+$/g,"")
class fi{constructor(e){this.guid=0,this.component=e}get history(){return this.component.historyController}get markdown(){return this.component.markdown}set markdown(e){const t=/([^\s] ) +/g,s=/\n{3,}/g
e=function(e,t){let s=!1
return e.split(/(\n?```\S*\n?)/g).map((e,n)=>(e.match(/```\S*\n|\n```/)&&(s=!s),s?e:t(e))).join("")}(e=e.replace(/\u00A0|\u00AD/g," ").replace(/\t/g,"  ").replace(/^(\s*\n)+|\n+$/g,""),e=>e.replace(t,"$1").replace(s,"\n\n")),this.component.setMarkdown(e),this.parseMarkdown()}setInitialMarkdown(){let e=mi
const t=this.component.editor.parentNode
if(t&&t.textContent.trim().length){e=t.textContent.trim()
for(let e of t.childNodes)3===e.nodeType&&t.removeChild(e)}this.markdown=e}stringAt(e,t=1){return e<0&&(t+=e,e=0),this.markdown.slice(e,e+t)}spliceString(e,t,s,{history:n=!1,selectionModifier:i=0}={}){const r=this.markdown
return n&&this.history.entry({offset:e,length:t,str:s,selectionModifier:i,original:this.stringAt(e,t)}),this.markdown=r.slice(0,e)+s+r.slice(e+t),this.markdown.length-r.length}tokenAt(e,t){t||(t=this.segments.reduce((e,t)=>[...e,...t.tokens],[]))
const s=t.find(({editorOffset:t,length:s})=>e>=t&&e<t+s)
return s?s.children.length?this.tokenAt(e,s.children):s:null}isStartOfLine(e){for(;e>0;){e-=1
const t=this.stringAt(e)
if(" "!==t)return"\n"===t}return!0}parseMarkdown(){const e=this.segmentizeMarkdown(this.markdown)
if(!this.segments)return e.forEach((e,t)=>{e.parseTokens(),e.guid=t}),e.length&&(this.guid=e[e.length-1].guid+1),void(this.segments=e)
const t=Math.min(this.segments.length,e.length)
let s=0,n=0
for(;s<t;){const t=this.segments[s],n=e[s]
if(t.markdown!==n.markdown)break
s+=1}for(;n<t-s;){const t=this.segments[this.segments.length-n-1],s=e[e.length-n-1]
if(t.markdown!==s.markdown)break
t.offset=s.offset,n+=1}const i=e.slice(s,e.length-n),r=this.segments.slice(s,this.segments.length-n)
i.length,r.length
i.forEach((e,t)=>{e.parseTokens(),r[t]?e.guid=r[t].guid:(e.guid=this.guid,this.guid+=1)}),this.segments.splice(s,this.segments.length-n-s,...i)}segmentizeMarkdown(e){const t=e.split(/(```|\n\n)/g),s=[]
let n=0,i=!1
for(let r of t){if(!r)continue
const e=s[s.length-1],t=e?e.markdown:""
i||t.match(/^ *\d+[.)] /)&&r.match(/^( *\d+[.)] )|\n/)||t.match(/^ *[-+\*] /)&&r.match(/^( *[-+\*] )|\n/)?e.markdown+=r:s.push(new di(n,r)),"```"===r&&(i=!i),n+=r.length}return s}}class gi{constructor(){this.boundHandlers={}}setupListeners(e,t){for(let s of e)this.setupListener(s,t)}setupListener(e,t){const s=this[`on${Rn(e)}`]
s&&(this.boundHandlers[e]=s.bind(this),t.addEventListener(e,this.boundHandlers[e]))}}class bi extends gi{constructor(e){super(),this.mouseIsSelecting=!1,this.EVENTS=["keydown","keypress","mousedown","mousemove","mouseup","copy","cut","paste"],this.mouseIsDown=!1,this.component=e}get selection(){return this.component.selectionController}get dom(){return this.component.domController}get history(){return this.component.historyController}editorInitialized(){this.setupListeners(this.EVENTS,this.component.editor)}onKeydown(e){const t=e.key,s=e.keyCode,n=e.shiftKey,i=e.altKey
var r=this.selection
let o=r.offset,a=r.length
if("Backspace"===t||8===s){if(e.preventDefault(),!o&&!a)return
const t=this.selection.isAtTemporaryNewline(o)
t?(a=t+1,o-=t):a||(a=1,o-=1),this.deleteString(o,a)}else if("Delete"===t||46===s){e.preventDefault()
const t=this.selection.isAtTemporaryNewline(o)
t?a=t+1:a||(a=1),this.deleteString(o,a)}else!yi(e)||"z"!==t&&90!==s?!i||"ArrowLeft"!==t&&37!==s?!i||"ArrowRight"!==t&&39!==s||(e.preventDefault(),this.altMove(1,n)):(e.preventDefault(),this.altMove(-1,n)):(e.preventDefault(),this.history[n?"redo":"undo"]())}onKeypress(e){if(e.preventDefault(),yi(e))return
var t=this.selection
let s=t.offset,n=t.length,i=function({key:e,keyCode:t}){if(e&&e.codePointAt(0)===t)return e
return String.fromCharCode(t)}(e)
if("Enter"===e.key||13===e.keyCode)this.insertReturn(s,n,{isSoft:e.shiftKey})
else if(i){if(32===e.keyCode&&" "===this.dom.stringAt(s)&&!this.dom.isStartOfLine(s))return this.selection.select(s+1)
this.insertString(s,n,i)}}onMousedown(){this.mouseIsDown=!0}onMousemove(){this.mouseIsDown&&(this.mouseIsSelecting=!0)}onMouseup(){this.mouseIsDown=!1,this.mouseIsSelecting=!1}onCopy(e){e.preventDefault(),(e.clipboardData||window.clipboardData).setData("text/plain",this.component.markdown)}onCut(e){e.preventDefault()
var t=this.selection
const s=t.offset,n=t.length
n&&(this.onCopy(e),this.history.finalize(),this.deleteString(s,n),this.history.finalize())}onPaste(e){e.preventDefault()
const t=(e.clipboardData||window.clipboardData).getData("Text")
var s=this.selection
const n=s.offset,i=s.length
this.history.finalize(),this.insertString(n,i,t),this.history.finalize()}insertString(e,t,s){this.selection.isAtTemporaryNewline(e)&&(t+=1)
const n=this.dom.spliceString(e,t,s,{history:!0});(t||n>0)&&this.selection.queueSelect(e+s.length)}insertReturn(e,t,{isSoft:s}){const n=this.dom.stringAt(e+t,2),i=this.dom.stringAt(e-2,2),r=n.slice(0,1),o=i.slice(1)
let a=s?"\n":"\n\n",l=0
const h=this.dom.tokenAt(e-1),c=h&&h.traverseDownTree("fence"),u=h&&h.traverseDownTree("code_block")
if(c&&e>=c.innerOffset-1&&e<=c.innerTail){const s=c.ancestors,n=c.leadingMarkup,i=c.trailingMarkup,r=s.filter(e=>"list_item"===e.type).map(()=>"  ").join("")
return a=`\n${r}`,h!==n[0]||c.content||i.length||(a+=`\n${r}\`\`\``,l-=r.length+4),this.spliceReturn(e,t,a,l)}if(s&&u&&"markup"!==h.type)return a+=u.baseChildren[0].content,this.spliceReturn(e,t,a)
if(i.match(/[^\n]\n$/))a="\n"
else{if(this.selection.isAtTemporaryNewline(e))return
0===e||"\n"===o?(l-=(a=`​${a}`).length,this.history.finalize()):(this.selection.isAtEOF(e+t)||"\n"===r)&&(a=`${a}​`,l-=1,this.history.finalize())}this.spliceReturn(e,t,a,l)}spliceReturn(e,t,s,n=0){const i=this.dom.spliceString(e,t,s,{selectionModifier:n,history:!0});(t||i>0)&&this.selection.queueSelect(e+s.length+n)}deleteString(e,t){let s=""
const n=this.dom.tokenAt(e),i=n&&n.traverseDownTree("fence")
if(i)"markup"===n.type&&n!==i.leadingMarkup[0]&&(e-=n.length,t+=n.length)
else{const n=this.dom.stringAt(e-2,3),i=this.dom.stringAt(e+t-1,3),r=n.slice(-2),o=n.slice(-2,-1),a=(n.slice(-3,-1),i.slice(0,2)),l=i.slice(1,2)
i.slice(1,3)
" "===o&&" "===l?t+=1:!(e>0||t<this.component.markdown.length)||"\n"!==l&&""!==l||"\n"!==o&&""!==o?("\n\n"===r&&(e-=1,t+=1),"\n\n"===a&&(t+=1)):s="​"}this.dom.spliceString(e,t,s,{history:!0})===s.length-t&&this.selection.queueSelect(e)}altMove(e,t){var s=this.selection
let n=s.offset,i=s.length,r=s.isReverse,o=this.component.markdown
const a=1===e,l=r?n:n+i
let h=a?o.slice(l):o.slice(0,l).split("").reverse().join("")
h=h.match(/^([\W_]*[^\W\s_]*)/)[1]
const c=this.dom.tokenAt(l+(a?0:-1))
let u=1
for(;u<h.length;){const t=this.dom.tokenAt(l+e*u+(a?0:-1))
if(t!==c&&("markup"===t.type||"whitespace"===t.type)){h=(a?o.slice(l,t.editorTail):o.slice(t.editorOffset,l)).slice(0,h.length)
break}u+=1}let p=e*h.length
const d=t&&r&&(!a||p<=i)
r&&!d&&(n+=i,p-=i,i=0),t?d?(n+=p,i-=p):i+=p:(n+=i+p,i=0),this.selection.select(n,i,d)}}function yi({metaKey:e,ctrlKey:t}){return/Mac|^iP/.test(navigator.platform)?e:t}class ki{constructor(e){this.undos=[],this.redos=[],this.component=e}get selection(){return this.component.selectionController}get dom(){return this.component.domController}entry(e){const t=e.offset,s=e.length,n=e.str,i=e.original,r=e.selectionModifier,o=this.undos[0]
e.type=n.length&&"​"!==n?"insert":"delete",o&&!o.finalized&&e.type===o.type?(n&&(o.str+=n),"delete"===e.type&&(t<o.offset?(o.original=i+o.original,o.length+=s):(o.original+=i,o.length+=s)),o.offset=Math.min(t,o.offset),o.selectionModifier=r):(this.finalize(),this.undos.unshift(e),this.redos=[])}finalize(){this.undos.length&&(this.undos[0].finalized=!0)}undo({redo:e=!0,select:t=!0}={}){if(!this.undos.length)return
const s=this.undos.shift(),n=s.offset,i=s.length,r=s.str,o=s.original
this.dom.spliceString(n,r.length,o),t&&("insert"===s.type?this.selection.queueSelect(n,i):this.selection.queueSelect(n,o.length)),e&&this.redos.unshift(s)}redo({undo:e=!0,select:t=!0}={}){if(!this.redos.length)return
const s=this.redos.shift(),n=s.offset,i=s.length,r=s.str,o=(s.original,s.selectionModifier)
this.dom.spliceString(n,i,r),t&&this.selection.queueSelect(n+r.length+o),e&&this.undos.unshift(s)}}class vi extends gi{constructor(e){super(),this.isRepositioningCursor=!1,this.component=e,this.setupListener("selectionchange",document)}get dom(){return this.component.domController}get input(){return this.component.inputController}get history(){return this.component.historyController}get editor(){return this.component.editor}get offset(){return this.component.selectionOffset}set offset(e){this.component.selectionOffset=e}get length(){return this.component.selectionLength}set length(e){this.component.selectionLength=e}get isReverse(){const e=window.getSelection()
if(0===e.rangeCount)return!1
const t=e.getRangeAt(0)
return e.anchorNode!==t.startContainer||e.anchorOffset!==t.startOffset}select(e,t=0,s=this.isReverse){const n=window.getSelection(),i=document.createRange()
var r=Xn(this.editor,e)
let o,a,l=r[0],h=r[1]
if(l||(l=function e(t){let s
for(let n=t.length;n--;){if(3===t[n].nodeType)return t[n]
if(t[n].childNodes&&(s=e(t[n].childNodes)))return s}}(this.editor.childNodes)||this.editor),h=Math.min(l.length,h),i.setStart(l,h),t){var c=Xn(this.editor,e+t)
if(o=c[0],a=c[1],!o){var u=[this.editor,1]
o=u[0],a=u[1]}}const p=s&&t>0?[o,a,l,h]:[l,h,o,a]
return this.isRepositioningCursor=!0,n.removeAllRanges(),n.setBaseAndExtent.apply(n,p),setTimeout(()=>this.isRepositioningCursor=!1,1),o?[l,o]:[l]}didUpdate(){if(this.queuedSelect){var e=this.queuedSelect
const t=e[0],s=e[1]
this.select(t,s),this.queuedSelect=null}}queueSelect(e,t=0){this.queuedSelect=[e,t]}isAtEOF(e){return e>=this.component.markdown.length}isAtTemporaryNewline(e){if(!("​"===this.dom.stringAt(e)))return!1
const t=this.dom.stringAt(e-2,5).match(/(\n*)\u200B(\n*)/)
return!(!t||!t[1]&&!t[2])&&Math.min(t[1].length||1/0,t[2].length||1/0)}onSelectionchange(e){if(!this.component.markdown)return this.offset=0,void(this.length=0)
const t=window.getSelection(),s=t.anchorNode,n=t.rangeCount
if(this.editor.contains(s)&&n>0){const e=t.getRangeAt(0),s=e.startContainer,n=e.startOffset,i=e.endContainer,r=e.endOffset,o=Yn(s),a=Yn(i)
let l=o+n,h=a+r-l
if(!!!Wn(s,e=>e.classList&&e.classList.contains("focus")).length&&!this.input.mouseIsSelecting){const e=s.classList
if(e&&e.contains("hr-wrapper"))return this.select(o,h)
if(e&&e.contains("img")&&1===n)return l=o+s.textContent.length,h=Math.max(0,a+r-l),this.select(l,h)}this.isRepositioningCursor||this.willMoveCaretTo(l,h),this.isAtTemporaryNewline(l+h-1)&&this.isAtEOF(l+h)&&(h?h-=1:l-=1),this.offset=l,this.length=h,this.isRepositioningCursor||this.history.finalize()}}willMoveCaretTo(e,t){const s=this.isAtTemporaryNewline(this.offset)
s&&this.removeTNL(s,e,t)}removeTNL(e,t,s){if(this.isAtEOF(t)&&t===this.offset+1)return
let n=[],i=!1
const r=t-this.offset
r<-e?n=[t,s]:r>=-e&&r<0?i=!0:r>=0&&r<=e+1?n=[this.offset,Math.max(0,s-e-1)]:r>e+1&&(n=[t-e-1,s])
const o=this.history.undos.slice(-1)[0]
if(o&&o.str.match(/\u200B/)&&this.history.undos.pop(),this.dom.spliceString(Math.max(0,this.offset-e),e+1,""),n.length){var a=n
t=a[0],(s=a[1])&&(s=Math.min(s,this.component.markdown.length-t)),this.queueSelect(t,s)}}}class wi{constructor(){this.imgs={}}state(e){return this.imgs[e]}load(e,t){const s=this.state(e)
if(s)return t(s)
const n=document.createElement("img")
n.onload=(()=>{this.imgs[e]="loaded",t("loaded")}),n.onerror=(()=>{this.imgs[e]="error",t("error")}),n.src=e}}const Si="["+"\n+-------------------------+---------------------------------------------------+\n| 1C                      | 1c                                                |\n+-------------------------+---------------------------------------------------+\n| ABNF                    | abnf                                              |\n+-------------------------+---------------------------------------------------+\n| Access logs             | accesslog                                         |\n+-------------------------+---------------------------------------------------+\n| Ada                     | ada                                               |\n+-------------------------+---------------------------------------------------+\n| ARM assembler           | armasm, arm                                       |\n+-------------------------+---------------------------------------------------+\n| AVR assembler           | avrasm                                            |\n+-------------------------+---------------------------------------------------+\n| ActionScript            | actionscript, as                                  |\n+-------------------------+---------------------------------------------------+\n| AngelScript             | angelscript, asc                                  |\n+-------------------------+---------------------------------------------------+\n| Apache                  | apache, apacheconf                                |\n+-------------------------+---------------------------------------------------+\n| AppleScript             | applescript, osascript                            |\n+-------------------------+---------------------------------------------------+\n| Arcade                  | arcade                                            |\n+-------------------------+---------------------------------------------------+\n| AsciiDoc                | asciidoc, adoc                                    |\n+-------------------------+---------------------------------------------------+\n| AspectJ                 | aspectj                                           |\n+-------------------------+---------------------------------------------------+\n| AutoHotkey              | autohotkey                                        |\n+-------------------------+---------------------------------------------------+\n| AutoIt                  | autoit                                            |\n+-------------------------+---------------------------------------------------+\n| Awk                     | awk, mawk, nawk, gawk                             |\n+-------------------------+---------------------------------------------------+\n| Axapta                  | axapta                                            |\n+-------------------------+---------------------------------------------------+\n| Bash                    | bash, sh, zsh                                     |\n+-------------------------+---------------------------------------------------+\n| Basic                   | basic                                             |\n+-------------------------+---------------------------------------------------+\n| BNF                     | bnf                                               |\n+-------------------------+---------------------------------------------------+\n| Brainfuck               | brainfuck, bf                                     |\n+-------------------------+---------------------------------------------------+\n| C#                      | cs, csharp                                        |\n+-------------------------+---------------------------------------------------+\n| C++                     | cpp, c, cc, h, c++, h++, hpp                      |\n+-------------------------+---------------------------------------------------+\n| C/AL                    | cal                                               |\n+-------------------------+---------------------------------------------------+\n| Cache Object Script     | cos, cls                                          |\n+-------------------------+---------------------------------------------------+\n| CMake                   | cmake, cmake.in                                   |\n+-------------------------+---------------------------------------------------+\n| Coq                     | coq                                               |\n+-------------------------+---------------------------------------------------+\n| CSP                     | csp                                               |\n+-------------------------+---------------------------------------------------+\n| CSS                     | css                                               |\n+-------------------------+---------------------------------------------------+\n| Cap’n Proto             | capnproto, capnp                                  |\n+-------------------------+---------------------------------------------------+\n| Clojure                 | clojure, clj                                      |\n+-------------------------+---------------------------------------------------+\n| CoffeeScript            | coffeescript, coffee, cson, iced                  |\n+-------------------------+---------------------------------------------------+\n| Crmsh                   | crmsh, crm, pcmk                                  |\n+-------------------------+---------------------------------------------------+\n| Crystal                 | crystal, cr                                       |\n+-------------------------+---------------------------------------------------+\n| D                       | d                                                 |\n+-------------------------+---------------------------------------------------+\n| DNS Zone file           | dns, zone, bind                                   |\n+-------------------------+---------------------------------------------------+\n| DOS                     | dos, bat, cmd                                     |\n+-------------------------+---------------------------------------------------+\n| Dart                    | dart                                              |\n+-------------------------+---------------------------------------------------+\n| Delphi                  | delphi, dpr, dfm, pas, pascal, freepascal,        |\n|                         | lazarus, lpr, lfm                                 |\n+-------------------------+---------------------------------------------------+\n| Diff                    | diff, patch                                       |\n+-------------------------+---------------------------------------------------+\n| Django                  | django, jinja                                     |\n+-------------------------+---------------------------------------------------+\n| Dockerfile              | dockerfile, docker                                |\n+-------------------------+---------------------------------------------------+\n| dsconfig                | dsconfig                                          |\n+-------------------------+---------------------------------------------------+\n| DTS (Device Tree)       | dts                                               |\n+-------------------------+---------------------------------------------------+\n| Dust                    | dust, dst                                         |\n+-------------------------+---------------------------------------------------+\n| EBNF                    | ebnf                                              |\n+-------------------------+---------------------------------------------------+\n| Elixir                  | elixir                                            |\n+-------------------------+---------------------------------------------------+\n| Elm                     | elm                                               |\n+-------------------------+---------------------------------------------------+\n| Erlang                  | erlang, erl                                       |\n+-------------------------+---------------------------------------------------+\n| Excel                   | excel, xls, xlsx                                  |\n+-------------------------+---------------------------------------------------+\n| F#                      | fsharp, fs                                        |\n+-------------------------+---------------------------------------------------+\n| FIX                     | fix                                               |\n+-------------------------+---------------------------------------------------+\n| Fortran                 | fortran, f90, f95                                 |\n+-------------------------+---------------------------------------------------+\n| G-Code                  | gcode, nc                                         |\n+-------------------------+---------------------------------------------------+\n| Gams                    | gams, gms                                         |\n+-------------------------+---------------------------------------------------+\n| GAUSS                   | gauss, gss                                        |\n+-------------------------+---------------------------------------------------+\n| Gherkin                 | gherkin                                           |\n+-------------------------+---------------------------------------------------+\n| Go                      | go, golang                                        |\n+-------------------------+---------------------------------------------------+\n| Golo                    | golo, gololang                                    |\n+-------------------------+---------------------------------------------------+\n| Gradle                  | gradle                                            |\n+-------------------------+---------------------------------------------------+\n| Groovy                  | groovy                                            |\n+-------------------------+---------------------------------------------------+\n| HTML, XML               | xml, html, xhtml, rss, atom, xjb, xsd, xsl, plist |\n+-------------------------+---------------------------------------------------+\n| HTTP                    | http, https                                       |\n+-------------------------+---------------------------------------------------+\n| Haml                    | haml                                              |\n+-------------------------+---------------------------------------------------+\n| Handlebars              | handlebars, hbs, html.hbs, html.handlebars        |\n+-------------------------+---------------------------------------------------+\n| Haskell                 | haskell, hs                                       |\n+-------------------------+---------------------------------------------------+\n| Haxe                    | haxe, hx                                          |\n+-------------------------+---------------------------------------------------+\n| Hy                      | hy, hylang                                        |\n+-------------------------+---------------------------------------------------+\n| Ini                     | ini                                               |\n+-------------------------+---------------------------------------------------+\n| Inform7                 | inform7, i7                                       |\n+-------------------------+---------------------------------------------------+\n| IRPF90                  | irpf90                                            |\n+-------------------------+---------------------------------------------------+\n| JSON                    | json                                              |\n+-------------------------+---------------------------------------------------+\n| Java                    | java, jsp                                         |\n+-------------------------+---------------------------------------------------+\n| JavaScript              | javascript, js, jsx                               |\n+-------------------------+---------------------------------------------------+\n| Leaf                    | leaf                                              |\n+-------------------------+---------------------------------------------------+\n| Lasso                   | lasso, ls, lassoscript                            |\n+-------------------------+---------------------------------------------------+\n| Less                    | less                                              |\n+-------------------------+---------------------------------------------------+\n| LDIF                    | ldif                                              |\n+-------------------------+---------------------------------------------------+\n| Lisp                    | lisp                                              |\n+-------------------------+---------------------------------------------------+\n| LiveCode Server         | livecodeserver                                    |\n+-------------------------+---------------------------------------------------+\n| LiveScript              | livescript, ls                                    |\n+-------------------------+---------------------------------------------------+\n| Lua                     | lua                                               |\n+-------------------------+---------------------------------------------------+\n| Makefile                | makefile, mk, mak                                 |\n+-------------------------+---------------------------------------------------+\n| Markdown                | markdown, md, mkdown, mkd                         |\n+-------------------------+---------------------------------------------------+\n| Mathematica             | mathematica, mma                                  |\n+-------------------------+---------------------------------------------------+\n| Matlab                  | matlab                                            |\n+-------------------------+---------------------------------------------------+\n| Maxima                  | maxima                                            |\n+-------------------------+---------------------------------------------------+\n| Maya Embedded Language  | mel                                               |\n+-------------------------+---------------------------------------------------+\n| Mercury                 | mercury                                           |\n+-------------------------+---------------------------------------------------+\n| Mizar                   | mizar                                             |\n+-------------------------+---------------------------------------------------+\n| Mojolicious             | mojolicious                                       |\n+-------------------------+---------------------------------------------------+\n| Monkey                  | monkey                                            |\n+-------------------------+---------------------------------------------------+\n| Moonscript              | moonscript, moon                                  |\n+-------------------------+---------------------------------------------------+\n| N1QL                    | n1ql                                              |\n+-------------------------+---------------------------------------------------+\n| NSIS                    | nsis                                              |\n+-------------------------+---------------------------------------------------+\n| Nginx                   | nginx, nginxconf                                  |\n+-------------------------+---------------------------------------------------+\n| Nimrod                  | nimrod, nim                                       |\n+-------------------------+---------------------------------------------------+\n| Nix                     | nix                                               |\n+-------------------------+---------------------------------------------------+\n| OCaml                   | ocaml, ml                                         |\n+-------------------------+---------------------------------------------------+\n| Objective C             | objectivec, mm, objc, obj-c                       |\n+-------------------------+---------------------------------------------------+\n| OpenGL Shading Language | glsl                                              |\n+-------------------------+---------------------------------------------------+\n| OpenSCAD                | openscad, scad                                    |\n+-------------------------+---------------------------------------------------+\n| Oracle Rules Language   | ruleslanguage                                     |\n+-------------------------+---------------------------------------------------+\n| Oxygene                 | oxygene                                           |\n+-------------------------+---------------------------------------------------+\n| PF                      | pf, pf.conf                                       |\n+-------------------------+---------------------------------------------------+\n| PHP                     | php, php3, php4, php5, php6                       |\n+-------------------------+---------------------------------------------------+\n| Parser3                 | parser3                                           |\n+-------------------------+---------------------------------------------------+\n| Perl                    | perl, pl, pm                                      |\n+-------------------------+---------------------------------------------------+\n| Pony                    | pony                                              |\n+-------------------------+---------------------------------------------------+\n| PostgreSQL & PL/pgSQL   | pgsql, postgres, postgresql                       |\n+-------------------------+---------------------------------------------------+\n| PowerShell              | powershell, ps                                    |\n+-------------------------+---------------------------------------------------+\n| Processing              | processing                                        |\n+-------------------------+---------------------------------------------------+\n| Prolog                  | prolog                                            |\n+-------------------------+---------------------------------------------------+\n| Protocol Buffers        | protobuf                                          |\n+-------------------------+---------------------------------------------------+\n| Puppet                  | puppet, pp                                        |\n+-------------------------+---------------------------------------------------+\n| Python                  | python, py, gyp                                   |\n+-------------------------+---------------------------------------------------+\n| Python profiler results | profile                                           |\n+-------------------------+---------------------------------------------------+\n| Q                       | k, kdb                                            |\n+-------------------------+---------------------------------------------------+\n| QML                     | qml                                               |\n+-------------------------+---------------------------------------------------+\n| R                       | r                                                 |\n+-------------------------+---------------------------------------------------+\n| ReasonML                | reasonml, re                                      |\n+-------------------------+---------------------------------------------------+\n| RenderMan RIB           | rib                                               |\n+-------------------------+---------------------------------------------------+\n| RenderMan RSL           | rsl                                               |\n+-------------------------+---------------------------------------------------+\n| Roboconf                | graph, instances                                  |\n+-------------------------+---------------------------------------------------+\n| Ruby                    | ruby, rb, gemspec, podspec, thor, irb             |\n+-------------------------+---------------------------------------------------+\n| Rust                    | rust, rs                                          |\n+-------------------------+---------------------------------------------------+\n| SCSS                    | scss                                              |\n+-------------------------+---------------------------------------------------+\n| SQL                     | sql                                               |\n+-------------------------+---------------------------------------------------+\n| STEP Part 21            | p21, step, stp                                    |\n+-------------------------+---------------------------------------------------+\n| Scala                   | scala                                             |\n+-------------------------+---------------------------------------------------+\n| Scheme                  | scheme                                            |\n+-------------------------+---------------------------------------------------+\n| Scilab                  | scilab, sci                                       |\n+-------------------------+---------------------------------------------------+\n| Shell                   | shell, console                                    |\n+-------------------------+---------------------------------------------------+\n| Smali                   | smali                                             |\n+-------------------------+---------------------------------------------------+\n| Smalltalk               | smalltalk, st                                     |\n+-------------------------+---------------------------------------------------+\n| Stan                    | stan                                              |\n+-------------------------+---------------------------------------------------+\n| Stata                   | stata                                             |\n+-------------------------+---------------------------------------------------+\n| SAS                     | SAS, sas                                          |\n+-------------------------+---------------------------------------------------+\n| Stylus                  | stylus, styl                                      |\n+-------------------------+---------------------------------------------------+\n| SubUnit                 | subunit                                           |\n+-------------------------+---------------------------------------------------+\n| Swift                   | swift                                             |\n+-------------------------+---------------------------------------------------+\n| Test Anything Protocol  | tap                                               |\n+-------------------------+---------------------------------------------------+\n| Tcl                     | tcl, tk                                           |\n+-------------------------+---------------------------------------------------+\n| TeX                     | tex                                               |\n+-------------------------+---------------------------------------------------+\n| Thrift                  | thrift                                            |\n+-------------------------+---------------------------------------------------+\n| TP                      | tp                                                |\n+-------------------------+---------------------------------------------------+\n| Twig                    | twig, craftcms                                    |\n+-------------------------+---------------------------------------------------+\n| TypeScript              | typescript, ts                                    |\n+-------------------------+---------------------------------------------------+\n| VB.Net                  | vbnet, vb                                         |\n+-------------------------+---------------------------------------------------+\n| VBScript                | vbscript, vbs                                     |\n+-------------------------+---------------------------------------------------+\n| VHDL                    | vhdl                                              |\n+-------------------------+---------------------------------------------------+\n| Vala                    | vala                                              |\n+-------------------------+---------------------------------------------------+\n| Verilog                 | verilog, v                                        |\n+-------------------------+---------------------------------------------------+\n| Vim Script              | vim                                               |\n+-------------------------+---------------------------------------------------+\n| x86 Assembly            | x86asm                                            |\n+-------------------------+---------------------------------------------------+\n| XL                      | xl, tao                                           |\n+-------------------------+---------------------------------------------------+\n| XQuery                  | xpath, xq                                         |\n+-------------------------+---------------------------------------------------+\n| Zephir                  | zephir, zep                                       |\n+-------------------------+---------------------------------------------------+\n".replace(/\+-+\+-+\+\n?/g,"").replace(/\|.+?\| (.+?)\s+\|(\n|$)/g,'["$1"]\n').replace(/\, /g,'", "').trim().replace(/\]\n/g,"],\n")+"]"
var Ci=JSON.parse(Si).reduce((e,[t,...s])=>(s.forEach(s=>{e[s]=t}),e),{})
const Ei="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0",xi=window.hljs
class _i{constructor(){this.themes=["atom-one-light"],this.themes.forEach(e=>this.loadCss(e))}loadLanguage(e,t){!e||xi.getLanguage(e)?t():this.loadScript(e,t)}dealiased(e){return Ci[e]||e}scriptLoaded(e){return document.querySelector(`script[data-name=${e}]`)}loadScript(e,t){if(e=this.dealiased(e),this.scriptLoaded(e))return t()
const s=document.createElement("script")
s.type="text/javascript",s.src=`${Ei}/languages/${e}.min.js`,s.dataset.name=e,s.onload=t,document.body.appendChild(s)}cssLoaded(e){return document.querySelector(`link[data-name=${e}]`)}loadCss(e){if(this.cssLoaded(e))return
const t=document.createElement("link")
t.rel="stylesheet",t.href=`${Ei}/styles/${e}.min.css`,t.dataset.name=e,document.head.appendChild(t)}}var Ai=function(e,t,s,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,s,n)
else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(r<3?i(o):r>3?i(t,s,o):i(t,s))||o)
return r>3&&o&&Object.defineProperty(t,s,o),o}
class Mi extends Q{constructor(){super(...arguments),this.selectionOffset=0,this.selectionLength=0,this.selectionController=new vi(this),this.inputController=new bi(this),this.historyController=new ki(this),this.domController=new fi(this),this.imgController=new wi,this.hljsController=new _i,this.eventHooks=[],this.api={_changeHooks:[],_controller:null,onChange(e){this._changeHooks.push(e)},getMarkdown(){return this._controller.markdown},setMarkdown(e){this._controller.markdown=e}}}didInsertElement(){window.e=this,this.editor=this.bounds.firstNode,this.editor.__component__=this,this.editor.parentNode.mfgfm=this.api,this.api._controller=this.domController,this.inputController.editorInitialized(),this.domController.setInitialMarkdown(),this.editor.focus()}didUpdate(){this.selectionController.didUpdate(),this.eventHooks.forEach(e=>{"didUpdate"===e.eventName&&e.fn.call(this)})}on(e,t){this.eventHooks.push({eventName:e,fn:t})}setMarkdown(e){e!==this.markdown&&this.api._changeHooks.forEach(t=>t(e)),this.markdown=e}get segments(){return this.domController.segments}}Ai([$],Mi.prototype,"markdown",void 0),Ai([$],Mi.prototype,"selectionOffset",void 0),Ai([$],Mi.prototype,"selectionLength",void 0),Ai([$("markdown")],Mi.prototype,"segments",null)
var Oi=function(e,t,s,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,s,n)
else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(r<3?i(o):r>3?i(t,s,o):i(t,s))||o)
return r>3&&o&&Object.defineProperty(t,s,o),o}
class Ni extends Q{get content(){return Bn(this.args.token.content)}get classNames(){const e=this.args.token.nextSibling
let t=[]
return e&&"fence"===e.type&&t.push("before-fence"),this.content.match(/^\s+$/)&&t.push("whitespace"),t.length?t.join(" "):null}}Oi([$("args")],Ni.prototype,"content",null),Oi([$("args")],Ni.prototype,"classNames",null)
class Li extends Pn{get content(){return super.content.replace("\n","<br/>\n")}}(function(e,t,s,n){var i,r=arguments.length,o=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,s,n)
else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(o=(r<3?i(o):r>3?i(t,s,o):i(t,s))||o)
r>3&&o&&Object.defineProperty(t,s,o)})([$("args")],Li.prototype,"content",null)
var Ti={"component:/emdee/components/Base":Pn,"component:/emdee/components/BaseWithFocus":Fn,"component:/emdee/components/Blockquote":class extends Pn{},"template:/emdee/components/Blockquote":{id:"pRuYCBAJ",block:'{"symbols":["@token"],"statements":[[6,"blockquote"],[11,"data-offset",[21,1,["offset"]],null],[11,"class",[27,[[26,"if",[[22,["focussed"]],"focus"],null]]]],[8],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Blockquote"}},"component:/emdee/components/BulletList":class extends Pn{},"template:/emdee/components/BulletList":{id:"PncdgHc4",block:'{"symbols":["@token"],"statements":[[6,"ul"],[11,"data-offset",[21,1,["offset"]],null],[11,"class",[27,[[21,1,["attrs","class"]]," ",[26,"if",[[22,["focussed"]],"focus"],null]]]],[8],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/BulletList"}},"component:/emdee/components/CodeBlock":class extends Pn{},"template:/emdee/components/CodeBlock":{id:"Yso3SPCP",block:'{"symbols":["@token"],"statements":[[6,"pre"],[11,"data-offset",[21,1,["offset"]],null],[11,"class",[27,["code-block ",[26,"if",[[22,["focussed"]],"focus"],null]]]],[8],[6,"code"],[8],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/CodeBlock"}},"component:/emdee/components/CodeInline":class extends Pn{},"template:/emdee/components/CodeInline":{id:"slpDQnMH",block:'{"symbols":["@token"],"statements":[[6,"code"],[11,"data-offset",[21,1,["offset"]],null],[8],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/CodeInline"}},"template:/emdee/components/Elements":{id:"lrtQT0fN",block:'{"symbols":["token","index","&default","@selectionLength","@selectionOffset","@tokens"],"statements":[[4,"each",[[21,6,[]]],[["key"],["@index"]],{"statements":[[4,"component",[[21,1,["componentName"]]],[["token","selectionOffset","selectionLength"],[[21,1,[]],[21,5,[]],[21,4,[]]]],{"statements":[[4,"unless",[[21,2,[]]],null,{"statements":[[13,3]],"parameters":[]},null]],"parameters":[]},null]],"parameters":[1,2]},null]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Elements"}},"component:/emdee/components/Em":class extends Pn{},"template:/emdee/components/Em":{id:"uXgJqzXx",block:'{"symbols":["@token"],"statements":[[6,"em"],[11,"data-offset",[21,1,["offset"]],null],[8],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Em"}},"component:/emdee/components/Emoji":class extends Pn{},"template:/emdee/components/Emoji":{id:"VGJuMZsQ",block:'{"symbols":["@token"],"statements":[[6,"span"],[10,"class","emoji"],[8],[6,"span"],[11,"data-offset",[21,1,["offset"]],null],[8],[1,[21,1,["info"]],false],[9],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Emoji"}},"component:/emdee/components/Fence":Vn,"template:/emdee/components/Fence":{id:"pinsKL5j",block:'{"symbols":["@token"],"statements":[[6,"pre"],[11,"data-offset",[21,1,["offset"]],null],[11,"class",[27,["fence ",[26,"if",[[22,["focussed"]],"focus"],null]]]],[8],[6,"code"],[8],[5,"Elements",[],[["@tokens"],[[21,1,["leadingMarkup"]]]],{"statements":[],"parameters":[]}],[9],[4,"if",[[22,["raw"]]],null,{"statements":[[6,"code"],[8],[5,"Elements",[],[["@tokens"],[[21,1,["baseChildren"]]]],{"statements":[],"parameters":[]}],[9]],"parameters":[]},{"statements":[[6,"code"],[11,"class",[27,[[20,"language"]]]],[8],[5,"Elements",[],[["@tokens"],[[21,1,["baseChildren"]]]],{"statements":[],"parameters":[]}],[9]],"parameters":[]}],[6,"code"],[8],[5,"Elements",[],[["@tokens"],[[21,1,["trailingMarkup"]]]],{"statements":[],"parameters":[]}],[9],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Fence"}},"component:/emdee/components/Heading":$n,"template:/emdee/components/Heading":{id:"VcCg4tat",block:'{"symbols":["@token"],"statements":[[4,"component",[[22,["headingComponentName"]]],[["offset","focussed"],[[21,1,["offset"]],[22,["focussed"]]]],{"statements":[[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}]],"parameters":[]},null]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Heading"}},"template:/emdee/components/Heading1":{id:"6umOAl+6",block:'{"symbols":["@offset","@focussed","&default"],"statements":[[6,"h1"],[11,"data-offset",[21,1,[]],null],[11,"class",[27,[[26,"if",[[21,2,[]],"focus"],null]]]],[8],[13,3],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Heading1"}},"template:/emdee/components/Heading2":{id:"8kXyE7sL",block:'{"symbols":["@offset","@focussed","&default"],"statements":[[6,"h2"],[11,"data-offset",[21,1,[]],null],[11,"class",[27,[[26,"if",[[21,2,[]],"focus"],null]]]],[8],[13,3],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Heading2"}},"template:/emdee/components/Heading3":{id:"ihc6BPAn",block:'{"symbols":["@offset","@focussed","&default"],"statements":[[6,"h3"],[11,"data-offset",[21,1,[]],null],[11,"class",[27,[[26,"if",[[21,2,[]],"focus"],null]]]],[8],[13,3],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Heading3"}},"template:/emdee/components/Heading4":{id:"ae37FSLX",block:'{"symbols":["@offset","@focussed","&default"],"statements":[[6,"h4"],[11,"data-offset",[21,1,[]],null],[11,"class",[27,[[26,"if",[[21,2,[]],"focus"],null]]]],[8],[13,3],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Heading4"}},"template:/emdee/components/Heading5":{id:"zTDTeQPu",block:'{"symbols":["@offset","@focussed","&default"],"statements":[[6,"h5"],[11,"data-offset",[21,1,[]],null],[11,"class",[27,[[26,"if",[[21,2,[]],"focus"],null]]]],[8],[13,3],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Heading5"}},"template:/emdee/components/Heading6":{id:"YKoGkfDC",block:'{"symbols":["@offset","@focussed","&default"],"statements":[[6,"h6"],[11,"data-offset",[21,1,[]],null],[11,"class",[27,[[26,"if",[[21,2,[]],"focus"],null]]]],[8],[13,3],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Heading6"}},"component:/emdee/components/Hr":class extends Pn{},"template:/emdee/components/Hr":{id:"PAs2xf0a",block:'{"symbols":["@token"],"statements":[[6,"div"],[11,"data-offset",[21,1,["offset"]],null],[11,"class",[27,["hr ",[26,"if",[[22,["focussed"]],"focus"],null]]]],[8],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[6,"span"],[10,"class","hr-wrapper"],[8],[6,"hr"],[8],[9],[9],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Hr"}},"component:/emdee/components/Image":qn,"template:/emdee/components/Image":{id:"2b9FjBsI",block:'{"symbols":["@token"],"statements":[[6,"div"],[11,"class",[27,["img ",[20,"state"]," ",[26,"if",[[22,["focussed"]],"focus"],null]]]],[11,"data-offset",[21,1,["offset"]],null],[11,"style",[20,"backgroundStyle"],null],[8],[6,"img"],[11,"alt",[27,[[20,"alt"]]]],[11,"title",[27,[[21,1,["attrs","title"]]]]],[11,"onclick",[26,"action",[[22,["selectAll"]]],null],null],[8],[9],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Image"}},"component:/emdee/components/Link":class extends Pn{didInsertElement(){super.didInsertElement(),this.boundClearMousedown=this.clearMousedown.bind(this)}mousedown({button:e}){if(e>1)return
var t=this.editor.selectionController
const s=t.offset,n=t.length
this.offset=s,this.length=n,this.boundMouseup=this.mouseup.bind(this,+new Date),document.addEventListener("mouseup",this.boundMouseup),document.addEventListener("mousemove",this.boundClearMousedown),setTimeout(()=>this.clearMousedown(),Gn)}willDestroy(){this.clearMousedown()}mouseup(e){this.clearMousedown(),+new Date-e<Gn&&this.openLink()}clearMousedown(){document.removeEventListener("mouseup",this.boundMouseup),document.removeEventListener("mousemove",this.boundClearMousedown)}openLink(){window.open(this.args.token.attrs.href,"_blank"),this.editor.selectionController.select(this.offset,this.length)}},"template:/emdee/components/Link":{id:"mjgQw+oe",block:'{"symbols":["@token"],"statements":[[6,"a"],[11,"href",[27,[[21,1,["attrs","href"]]]]],[10,"target","_blank"],[11,"data-offset",[21,1,["offset"]],null],[11,"class",[27,[[26,"if",[[22,["focussed"]],"focus"],null]]]],[11,"onmousedown",[26,"action",[[22,["mousedown"]]],null],null],[8],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Link"}},"component:/emdee/components/ListItem":class extends Pn{didInsertElement(){super.didInsertElement(),this.setMargin()}didUpdate(){super.didUpdate(),this.setMargin()}setMargin(){let e=this.element,t=Kn(e)
Wn(e,e=>"LI"===e.tagName).forEach(e=>{t-=Kn(e)}),this.element.style.marginLeft=`-${t}px`}},"template:/emdee/components/ListItem":{id:"wzR93u3P",block:'{"symbols":["@token"],"statements":[[6,"li"],[11,"data-offset",[21,1,["offset"]],null],[11,"class",[27,[[21,1,["attrs","class"]]," ",[26,"if",[[22,["focussed"]],"focus"],null]]]],[8],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/ListItem"}},"component:/emdee/components/MFGFM":Mi,"template:/emdee/components/MFGFM":{id:"OeYT82z8",block:'{"symbols":["segment"],"statements":[[6,"div"],[10,"class","mfgfm-editor markdown-body"],[10,"contenteditable","true"],[10,"spellcheck","false"],[8],[4,"each",[[22,["segments"]]],[["key"],["guidString"]],{"statements":[[6,"section"],[11,"data-offset",[21,1,["offset"]],null],[8],[5,"Elements",[],[["@tokens","@selectionOffset","@selectionLength"],[[21,1,["tokens"]],[20,"selectionOffset"],[20,"selectionLength"]]],{"statements":[],"parameters":[]}],[9]],"parameters":[1]},null],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/emdee/components/MFGFM"}},"component:/emdee/components/Markup":Ni,"template:/emdee/components/Markup":{id:"ZE/trvsk",block:'{"symbols":["@token"],"statements":[[4,"unless",[[21,1,["absorbed"]]],null,{"statements":[[6,"mark"],[11,"data-offset",[21,1,["offset"]],null],[11,"class",[20,"classNames"],null],[8],[1,[20,"content"],false],[9]],"parameters":[]},null]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Markup"}},"component:/emdee/components/OrderedList":class extends Pn{},"template:/emdee/components/OrderedList":{id:"B/6Zc6vW",block:'{"symbols":["@token"],"statements":[[6,"ol"],[11,"data-offset",[21,1,["offset"]],null],[11,"start",[21,1,["attrs","start"]],null],[11,"class",[27,[[26,"if",[[22,["focussed"]],"focus"],null]]]],[8],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/OrderedList"}},"component:/emdee/components/Paragraph":class extends Pn{},"template:/emdee/components/Paragraph":{id:"a2QbxQfj",block:'{"symbols":["@token"],"statements":[[6,"p"],[11,"data-offset",[21,1,["offset"]],null],[11,"class",[27,[[26,"if",[[22,["focussed"]],"focus"],null]]]],[8],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Paragraph"}},"component:/emdee/components/S":class extends Pn{},"template:/emdee/components/S":{id:"QqWMpbLk",block:'{"symbols":["@token"],"statements":[[6,"s"],[11,"data-offset",[21,1,["offset"]],null],[8],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/S"}},"component:/emdee/components/Softbreak":Li,"template:/emdee/components/Softbreak":{id:"TOAoMkGR",block:'{"symbols":["@token"],"statements":[[6,"span"],[11,"data-offset",[21,1,["offset"]],null],[8],[1,[20,"content"],true],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Softbreak"}},"component:/emdee/components/Strong":class extends Pn{},"template:/emdee/components/Strong":{id:"GaIuy7UP",block:'{"symbols":["@token"],"statements":[[6,"strong"],[11,"data-offset",[21,1,["offset"]],null],[8],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Strong"}},"component:/emdee/components/TaskListItem":class extends Pn{didToggle(){const e=this.editor.domController
var t=this.args.token
const s=t.attrs,n=t.editorOffset
e.spliceString(n+1,1,s.checked?" ":"x")}},"template:/emdee/components/TaskListItem":{id:"XR07O3zc",block:'{"symbols":["@token"],"statements":[[6,"span"],[10,"class","task-list-wrapper"],[11,"data-offset",[21,1,["offset"]],null],[8],[6,"input"],[10,"type","checkbox"],[10,"class","task-list-item-checkbox"],[11,"checked",[21,1,["attrs","checked"]],null],[11,"onclick",[26,"action",[[22,["didToggle"]]],null],null],[8],[9],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/TaskListItem"}},"component:/emdee/components/Text":class extends Pn{},"template:/emdee/components/Text":{id:"MIKNR4ZB",block:'{"symbols":["@token"],"statements":[[6,"span"],[11,"data-offset",[21,1,["offset"]],null],[8],[1,[20,"content"],false],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Text"}}},Di={app:{name:"emdee",rootName:"emdee"},types:{application:{definitiveCollection:"main"},component:{definitiveCollection:"components"},"component-test":{unresolvable:!0},helper:{definitiveCollection:"components"},"helper-test":{unresolvable:!0},renderer:{definitiveCollection:"main"},template:{definitiveCollection:"components"}},collections:{main:{types:["application","renderer"]},components:{group:"ui",types:["component","component-test","template","helper","helper-test"],defaultType:"component",privateCollections:["utils"]},styles:{group:"ui",unresolvable:!0},utils:{unresolvable:!0}}}
class Ri extends rn{constructor(){let e=new Dn(Ti),t=new Tn(Di,e)
const s=document.body
super({builder:new _n({element:s,nextSibling:null}),loader:new xn(t),renderer:new An,resolver:t,rootName:Di.app.rootName})}}return function(e){const t=new Ri
return W=(()=>{t.scheduleRerender()}),t.registerInitializer({initialize(e){e.register(`component-manager:/${t.rootName}/component-managers/main`,Ys)}}),t.renderComponent("MFGFM",e,null),t.boot()}})
