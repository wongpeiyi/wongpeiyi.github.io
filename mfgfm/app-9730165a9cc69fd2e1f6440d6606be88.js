(function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("markdown-it")):"function"==typeof define&&define.amd?define(["markdown-it"],t):t(e.markdownit)})(this,function(e){"use strict"
function t(e="unreachable"){return new Error(e)}function s(e,t){if(!e)throw new Error(t||"assertion failure")}e="default"in e?e.default:e
const n=Object.keys
function i(e){for(let t=1;t<arguments.length;t++){let s=arguments[t]
if(null===s||"object"!=typeof s)continue
let i=n(s)
for(let t=0;t<i.length;t++){let n=i[t]
e[n]=s[n]}}return e}let r=0
function a(e){return e._guid=++r}function o(){return Object.create(null)}class l{constructor(){this.stack=[],this.current=null}get size(){return this.stack.length}push(e){this.current=e,this.stack.push(e)}pop(){let e=this.stack.pop(),t=this.stack.length
return this.current=0===t?null:this.stack[t-1],void 0===e?null:e}isEmpty(){return 0===this.stack.length}}class h{constructor(e){this.next=null,this.prev=null,this.value=e}}class c{constructor(){this.clear()}head(){return this._head}tail(){return this._tail}clear(){this._head=this._tail=null}toArray(){let e=[]
return this.forEachNode(t=>e.push(t)),e}nextNode(e){return e.next}forEachNode(e){let t=this._head
for(;null!==t;)e(t),t=t.next}insertBefore(e,t=null){return null===t?this.append(e):(t.prev?t.prev.next=e:this._head=e,e.prev=t.prev,e.next=t,t.prev=e,e)}append(e){let t=this._tail
return t?(t.next=e,e.prev=t,e.next=null):this._head=e,this._tail=e}remove(e){return e.prev?e.prev.next=e.next:this._head=e.next,e.next?e.next.prev=e.prev:this._tail=e.prev,e}}class u{constructor(e,t){this._head=e,this._tail=t}forEachNode(e){let t=this._head
for(;null!==t;)e(t),t=this.nextNode(t)}head(){return this._head}tail(){return this._tail}toArray(){let e=[]
return this.forEachNode(t=>e.push(t)),e}nextNode(e){return e===this._tail?null:e.next}}new u(null,null)
const p=Object.freeze([]),d=1
class m{validate(e){return this.value()===e}}m.id=0
const f=[],g=[]
class b{constructor(e,t){this.type=e,this.inner=t}value(){return(0,f[this.type])(this.inner)}validate(e){return(0,g[this.type])(this.inner,e)}}function y(e){let t=f.length
f.push(e=>e.value()),g.push((e,t)=>e.validate(t)),e.id=t}f.push(()=>0),g.push((e,t)=>0===t)
const v=new b(0,null)
f.push(()=>NaN),g.push((e,t)=>NaN===t)
const k=new b(1,null)
f.push(()=>E),g.push((e,t)=>t===E)
new b(2,null)
function w({tag:e}){return e===v}function S(e){return e===v}let E=d
class C extends m{static create(e=E){return new b(this.id,new C(e))}constructor(e=E){super(),this.revision=e}value(){return this.revision}dirty(){this.revision=++E}}function _(e){let t=[]
for(let s=0,n=e.length;s<n;s++){let n=e[s].tag
if(n===k)return k
n!==v&&t.push(n)}return O(t)}function x(e){let t=[],s=e.head()
for(;null!==s;){let n=s.tag
if(n===k)return k
n!==v&&t.push(n),s=e.nextNode(s)}return O(t)}function A(e){let t=[]
for(let s=0,n=e.length;s<n;s++){let n=e[s]
if(n===k)return k
n!==v&&t.push(n)}return O(t)}function O(e){switch(e.length){case 0:return v
case 1:return e[0]
case 2:return T.create(e[0],e[1])
default:return L.create(e)}}y(C)
class N extends m{constructor(){super(...arguments),this.lastChecked=null,this.lastValue=null}value(){let e=this.lastChecked,t=this.lastValue
return e!==E&&(this.lastChecked=E,this.lastValue=t=this.compute()),this.lastValue}invalidate(){this.lastChecked=null}}class T extends N{static create(e,t){return new b(this.id,new T(e,t))}constructor(e,t){super(),this.first=e,this.second=t}compute(){return Math.max(this.first.value(),this.second.value())}}y(T)
class L extends N{static create(e){return new b(this.id,new L(e))}constructor(e){super(),this.tags=e}compute(){let e=this.tags,t=-1
for(let s=0;s<e.length;s++){let n=e[s].value()
t=Math.max(n,t)}return t}}y(L)
class M extends N{static create(e){return new b(this.id,new M(e))}constructor(e){super(),this.tag=e,this.lastUpdated=d}compute(){return Math.max(this.lastUpdated,this.tag.value())}update(e){e!==this.tag&&(this.tag=e,this.lastUpdated=E,this.invalidate())}}y(M)
class B{constructor(){this.lastRevision=null,this.lastValue=null}value(){let e=this.tag,t=this.lastRevision,s=this.lastValue
return null!==t&&e.validate(t)||(s=this.lastValue=this.compute(),this.lastRevision=e.value()),s}invalidate(){this.lastRevision=null}}class D{constructor(e){this.lastValue=null,this.lastRevision=null,this.initialized=!1,this.tag=e.tag,this.reference=e}peek(){return this.initialized?this.lastValue:this.initialize()}revalidate(){if(!this.initialized)return this.initialize()
let e=this.reference,t=this.lastRevision,s=e.tag
if(s.validate(t))return R
this.lastRevision=s.value()
let n=this.lastValue,i=e.value()
return i===n?R:(this.lastValue=i,i)}initialize(){let e=this.reference,t=this.lastValue=e.value()
return this.lastRevision=e.tag.value(),this.initialized=!0,t}}const R="adb3b78e-3d22-4e4b-877a-6317c2c5c145"
class I{constructor(e){this.inner=e,this.tag=v}value(){return this.inner}}class P extends h{constructor(e,t){super(e.valueReferenceFor(t)),this.retained=!1,this.seen=!1,this.key=t.key,this.iterable=e,this.memo=e.memoReferenceFor(t)}update(e){this.retained=!0,this.iterable.updateValueReference(this.value,e),this.iterable.updateMemoReference(this.memo,e)}shouldRemove(){return!this.retained}reset(){this.retained=!1,this.seen=!1}}class F{constructor(e){this.iterator=null,this.map=o(),this.list=new c,this.tag=e.tag,this.iterable=e}isEmpty(){return(this.iterator=this.iterable.iterate()).isEmpty()}iterate(){let e
return e=null===this.iterator?this.iterable.iterate():this.iterator,this.iterator=null,e}has(e){return!!this.map[e]}get(e){return this.map[e]}wasSeen(e){let t=this.map[e]
return void 0!==t&&t.seen}append(e){let t=this.map,s=this.list,n=this.iterable,i=t[e.key]=new P(n,e)
return s.append(i),i}insertBefore(e,t){let s=this.map,n=this.list,i=this.iterable,r=s[e.key]=new P(i,e)
return r.retained=!0,n.insertBefore(r,t),r}move(e,t){let s=this.list
e.retained=!0,s.remove(e),s.insertBefore(e,t)}remove(e){this.list.remove(e),delete this.map[e.key]}nextNode(e){return this.list.nextNode(e)}head(){return this.list.head()}}var j;(function(e){e[e.Append=0]="Append",e[e.Prune=1]="Prune",e[e.Done=2]="Done"})(j||(j={}))
class H{constructor({target:e,artifacts:t}){this.target=e,this.artifacts=t,this.iterator=t.iterate(),this.current=t.head()}sync(){let e=j.Append
for(;;)switch(e){case j.Append:e=this.nextAppend()
break
case j.Prune:e=this.nextPrune()
break
case j.Done:return void this.nextDone()}}advanceToKey(e){let t=this.current,s=this.artifacts,n=t
for(;null!==n&&n.key!==e;)n.seen=!0,n=s.nextNode(n)
null!==n&&(this.current=s.nextNode(n))}nextAppend(){let e=this.iterator,t=this.current,s=this.artifacts,n=e.next()
if(null===n)return this.startPrune()
let i=n.key
return null!==t&&t.key===i?this.nextRetain(n):s.has(i)?this.nextMove(n):this.nextInsert(n),j.Append}nextRetain(e){let t=this.artifacts,s=this.current;(s=s).update(e),this.current=t.nextNode(s),this.target.retain(e.key,s.value,s.memo)}nextMove(e){let t=this.current,s=this.artifacts,n=this.target,i=e.key,r=s.get(e.key)
r.update(e),s.wasSeen(e.key)?(s.move(r,t),n.move(r.key,r.value,r.memo,t?t.key:null)):this.advanceToKey(i)}nextInsert(e){let t=this.artifacts,s=this.target,n=this.current,i=t.insertBefore(e,n)
s.insert(i.key,i.value,i.memo,n?n.key:null)}startPrune(){return this.current=this.artifacts.head(),j.Prune}nextPrune(){let e=this.artifacts,t=this.target,s=this.current
if(null===s)return j.Done
let n=s
return this.current=e.nextNode(n),n.shouldRemove()?(e.remove(n),t.delete(n.key)):n.reset(),j.Prune}nextDone(){this.target.done()}}function z(...e){let t=e[0],s=e[1],n=e[2]
return"string"==typeof t?function(t,s,n){return V(t,s,n,e)}:n?V(t,s,n,[]):void function(e,t){let s,n=Symbol(t)
q(e).trackedProperties[t]=!0,void 0!==e[t]&&(s=e[t])
Object.defineProperty(e,t,{configurable:!0,get(){return this[n]},set(e){q(this).dirtyableTagFor(t).inner.dirty(),this[n]=e,Y()}})}(t,s)}function V(e,t,s,n){let i=q(e)
return i.trackedProperties[t]=!0,i.trackedPropertyDependencies[t]=n||[],{enumerable:!0,configurable:!1,get:s.get,set:function(){q(this).dirtyableTagFor(t).inner.dirty(),s.set.apply(this,arguments),Y()}}}class U{constructor(e){this.tags=o(),this.computedPropertyTags=o(),this.trackedProperties=e?Object.create(e.trackedProperties):o(),this.trackedPropertyDependencies=e?Object.create(e.trackedPropertyDependencies):o()}tagFor(e){let t,s=this.tags[e]
return s||((t=this.trackedPropertyDependencies[e])?this.tags[e]=function(e,t,s){let n=[e.dirtyableTagFor(t)]
if(s&&s.length)for(let i=0;i<s.length;i++)n.push(e.tagFor(s[i]))
return A(n)}(this,e,t):this.tags[e]=C.create())}dirtyableTagFor(e){let t
return this.trackedPropertyDependencies[e]?(t=this.computedPropertyTags[e])||(this.computedPropertyTags[e]=C.create()):(t=this.tags[e])||(this.tags[e]=C.create())}}let $=Symbol("ember-object")
function q(e){let t=e[$]
return t&&function(e,t){return G.call(e,t)}(e,$)?t:e[$]=new U(t)}let G=Object.prototype.hasOwnProperty
let Y=function(){}
class K extends Error{constructor(e,t,s){super(s),this.target=e,this.key=t}static for(e,t){return new K(e,t,`The property '${t}' on ${e} was changed after being rendered. If you want to change a property used in a template after the component has rendered, mark the property as a tracked property with the @tracked decorator.`)}}function W(e,t,s=function(e,t){throw K.for(e,t)}){if("object"==typeof e&&e){return q(e).tagFor(t)}return v}class X{constructor(e){this.debugName=null,this.__args__=null,Object.assign(this,e)}get element(){let e=this.bounds
return s(e&&e.firstNode===e.lastNode,"The 'element' property can only be accessed on components that contain a single root element in their template. Try using 'bounds' instead to access the first and last nodes."),e.firstNode}get args(){return this.__args__}set args(e){this.__args__=e,q(this).dirtyableTagFor("args").inner.dirty()}static create(e){return new this(e)}didInsertElement(){}didUpdate(){}willDestroy(){}destroy(){this.willDestroy()}toString(){return`${this.debugName} component`}}const J={dynamicLayout:!1,dynamicTag:!0,prepareArgs:!1,createArgs:!0,attributeHook:!0,elementHook:!0}
class Q{constructor(e,t,s,n){this.name=e,this.manager=t,this.ComponentClass=s,this.handle=n,this.state={name:e,capabilities:J,ComponentClass:s,handle:n}}toJSON(){return{GlimmerDebug:`<component-definition name="${this.name}">`}}}class Z{constructor(e,t=null){this._registry=e,this._resolver=t,this._lookups={},this._factoryDefinitionLookups={}}factoryFor(e){let t=this._factoryDefinitionLookups[e]
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
return t.create(n)}}}}class ee{constructor(e){this._registrations={},this._registeredOptions={},this._registeredInjections={},e&&e.fallback&&(this._fallback=e.fallback)}register(e,t,s){this._registrations[e]=t,s&&(this._registeredOptions[e]=s)}registration(e){let t=this._registrations[e]
return void 0===t&&this._fallback&&(t=this._fallback.registration(e)),t}unregister(e){delete this._registrations[e],delete this._registeredOptions[e],delete this._registeredInjections[e]}registerOption(e,t,s){let n=this._registeredOptions[e]
n||(n={},this._registeredOptions[e]=n),n[t]=s}registeredOption(e,t){let s,n=this.registeredOptions(e)
return n&&(s=n[t]),void 0===s&&void 0!==this._fallback&&(s=this._fallback.registeredOption(e,t)),s}registeredOptions(e){let t=this._registeredOptions[e]
if(void 0===t){let s=e.split(":")[0]
t=this._registeredOptions[s]}return t}unregisterOption(e,t){let s=this._registeredOptions[e]
s&&delete s[t]}registerInjection(e,t,s){let n=this._registeredInjections[e]
void 0===n&&(this._registeredInjections[e]=n=[]),n.push({property:t,source:s})}registeredInjections(e){let t=e.split(":")[0],s=this._fallback?this._fallback.registeredInjections(e):[]
return Array.prototype.push.apply(s,this._registeredInjections[t]),Array.prototype.push.apply(s,this._registeredInjections[e]),s}}const te="__owner__"
function se(e){return e[te]}function ne(e,t){e[te]=t}class ie{constructor(e){this._bounds=e}get firstNode(){return this._bounds.firstNode()}get lastNode(){return this._bounds.lastNode()}}const re=new class{constructor(){this.evaluateOpcode=function(e){let t=new Array(e)
for(let s=0;s<e;s++)t[s]=null
return t}(82).slice()}add(e,t,s="syscall"){this.evaluateOpcode[e]={syscall:"syscall"===s,evaluate:t}}debugBefore(e,t,s){return{sp:void 0,state:void 0}}debugAfter(e,t,s,n){n.sp
n.state,e.stack.sp}evaluate(e,t,s){let n=this.evaluateOpcode[s]
n.syscall?n.evaluate(e,t):n.evaluate(e.inner,t)}}
class ae{constructor(){a(this)}}class oe extends ae{constructor(){super(...arguments),this.next=null,this.prev=null}}var le;(function(e){e[e.pc=0]="pc",e[e.ra=1]="ra",e[e.fp=2]="fp",e[e.sp=3]="sp",e[e.s0=4]="s0",e[e.s1=5]="s1",e[e.t0=6]="t0",e[e.t1=7]="t1",e[e.v0=8]="v0"})(le||(le={}))
class he extends I{constructor(e){super(e)}static create(e){return void 0===e?pe:null===e?de:!0===e?me:!1===e?fe:"number"==typeof e?new ue(e):new ce(e)}get(e){return pe}}class ce extends he{constructor(){super(...arguments),this.lengthReference=null}get(e){if("length"===e){let e=this.lengthReference
return null===e&&(e=this.lengthReference=new ue(this.inner.length)),e}return super.get(e)}}class ue extends he{constructor(e){super(e)}}const pe=new ue(void 0),de=new ue(null),me=new ue(!0),fe=new ue(!1)
class ge{constructor(e){this.inner=e,this.tag=e.tag}value(){return this.toBool(this.inner.value())}toBool(e){return!!e}}var be
function ye(e){return function(t){return Array.isArray(t)&&t[0]===e}}re.add(1,(e,{op1:t})=>{let s=e.stack,n=e.constants.resolveHandle(t)(e,s.pop())
e.loadValue(le.v0,n)}),re.add(4,(e,{op1:t})=>{let s=e.referenceForSymbol(t)
e.stack.push(s)}),re.add(2,(e,{op1:t})=>{let s=e.stack.pop()
e.scope().bindSymbol(t,s)}),re.add(3,(e,{op1:t})=>{let s=e.stack.pop(),n=e.stack.pop(),i=e.stack.pop(),r=i?[s,n,i]:null
e.scope().bindBlock(t,r)}),re.add(80,(e,{op1:t})=>{let s=e.constants.getString(t),n=e.scope().getPartialMap()[s]
void 0===n&&(n=e.getSelf().get(s)),e.stack.push(n)}),re.add(17,(e,{op1:t,op2:s})=>{e.pushRootScope(t,!!s)}),re.add(5,(e,{op1:t})=>{let s=e.constants.getString(t),n=e.stack.pop()
e.stack.push(n.get(s))}),re.add(6,(e,{op1:t})=>{let s=e.stack,n=e.scope().getBlock(t)
n?(s.push(n[2]),s.push(n[1]),s.push(n[0])):(s.push(null),s.push(null),s.push(null))}),re.add(7,(e,{op1:t})=>{let s=!!e.scope().getBlock(t)
e.stack.push(s?me:fe)}),re.add(8,e=>{e.stack.pop(),e.stack.pop()
let t=e.stack.pop(),s=t&&t.parameters.length
e.stack.push(s?me:fe)}),re.add(9,(e,{op1:t})=>{let s=new Array(t)
for(let n=t;n>0;n--){s[n-1]=e.stack.pop()}e.stack.push(new class extends B{constructor(e){super(),this.parts=e,this.tag=_(e)}compute(){let e=new Array
for(let s=0;s<this.parts.length;s++){let t=this.parts[s].value()
null!==t&&void 0!==t&&(e[s]="function"!=typeof(t=t).toString?"":String(t))}var t
return e.length>0?e.join(""):null}}(s))}),function(e){e[e.Text=0]="Text",e[e.Append=1]="Append",e[e.Comment=2]="Comment",e[e.Modifier=3]="Modifier",e[e.Block=4]="Block",e[e.Component=5]="Component",e[e.OpenElement=6]="OpenElement",e[e.OpenSplattedElement=7]="OpenSplattedElement",e[e.FlushElement=8]="FlushElement",e[e.CloseElement=9]="CloseElement",e[e.StaticAttr=10]="StaticAttr",e[e.DynamicAttr=11]="DynamicAttr",e[e.AttrSplat=12]="AttrSplat",e[e.Yield=13]="Yield",e[e.Partial=14]="Partial",e[e.DynamicArg=15]="DynamicArg",e[e.StaticArg=16]="StaticArg",e[e.TrustingAttr=17]="TrustingAttr",e[e.Debugger=18]="Debugger",e[e.ClientSideStatement=19]="ClientSideStatement",e[e.Unknown=20]="Unknown",e[e.Get=21]="Get",e[e.MaybeLocal=22]="MaybeLocal",e[e.HasBlock=23]="HasBlock",e[e.HasBlockParams=24]="HasBlockParams",e[e.Undefined=25]="Undefined",e[e.Helper=26]="Helper",e[e.Concat=27]="Concat",e[e.ClientSideExpression=28]="ClientSideExpression"}(be||(be={}))
const ve=ye(be.Get),ke=ye(be.MaybeLocal)
var we,Se;(Se=we||(we={}))[Se.OpenComponentElement=0]="OpenComponentElement",Se[Se.DidCreateElement=1]="DidCreateElement",Se[Se.SetComponentAttrs=2]="SetComponentAttrs",Se[Se.DidRenderLayout=3]="DidRenderLayout",Se[Se.Debugger=4]="Debugger"
var Ee=be
const Ce="&attrs"
class _e{constructor(e=0){this.offset=e,this.names=o(),this.funcs=[]}add(e,t){this.funcs.push(t),this.names[e]=this.funcs.length-1}compile(e,t){let s=e[this.offset],n=this.names[s],i=this.funcs[n]
i(e,t)}}let xe,Ae
function Oe(e,t,s){let n=e[1],i=e[2],r=e[3]
s.expr(i),r?s.dynamicAttr(n,r,t):s.dynamicAttr(n,null,t)}class Ne{constructor(){var e=function(e=new Te,t=new Le){return e.add("if",(e,t,s,n,i)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #if requires a single argument")
i.startLabels(),i.pushFrame(),i.returnTo("END"),i.expr(e[0]),i.toBoolean(),i.enter(1),i.jumpUnless("ELSE"),i.invokeStaticBlock(s),n?(i.jump("EXIT"),i.label("ELSE"),i.invokeStaticBlock(n),i.label("EXIT"),i.exit(),i.return()):(i.label("ELSE"),i.exit(),i.return()),i.label("END"),i.popFrame(),i.stopLabels()}),e.add("unless",(e,t,s,n,i)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #unless requires a single argument")
i.startLabels(),i.pushFrame(),i.returnTo("END"),i.expr(e[0]),i.toBoolean(),i.enter(1),i.jumpIf("ELSE"),i.invokeStaticBlock(s),n?(i.jump("EXIT"),i.label("ELSE"),i.invokeStaticBlock(n),i.label("EXIT"),i.exit(),i.return()):(i.label("ELSE"),i.exit(),i.return()),i.label("END"),i.popFrame(),i.stopLabels()}),e.add("with",(e,t,s,n,i)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #with requires a single argument")
i.startLabels(),i.pushFrame(),i.returnTo("END"),i.expr(e[0]),i.dup(),i.toBoolean(),i.enter(2),i.jumpUnless("ELSE"),i.invokeStaticBlock(s,1),n?(i.jump("EXIT"),i.label("ELSE"),i.invokeStaticBlock(n),i.label("EXIT"),i.exit(),i.return()):(i.label("ELSE"),i.exit(),i.return()),i.label("END"),i.popFrame(),i.stopLabels()}),e.add("each",(e,t,s,n,i)=>{i.startLabels(),i.pushFrame(),i.returnTo("END"),t&&"key"===t[0][0]?i.expr(t[1][0]):i.pushPrimitiveReference(null),i.expr(e[0]),i.enter(2),i.putIterator(),i.jumpUnless("ELSE"),i.pushFrame(),i.returnTo("ITER"),i.dup(le.fp,1),i.enterList("BODY"),i.label("ITER"),i.iterate("BREAK"),i.label("BODY"),i.invokeStaticBlock(s,2),i.pop(2),i.exit(),i.return(),i.label("BREAK"),i.exitList(),i.popFrame(),n?(i.jump("EXIT"),i.label("ELSE"),i.invokeStaticBlock(n),i.label("EXIT"),i.exit(),i.return()):(i.label("ELSE"),i.exit(),i.return()),i.label("END"),i.popFrame(),i.stopLabels()}),e.add("in-element",(e,t,s,n,i)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #in-element requires a single argument")
i.startLabels(),i.pushFrame(),i.returnTo("END")
let r=t[0],a=t[1]
for(let o=0;o<r.length;o++){let e=r[o]
if("nextSibling"!==e&&"guid"!==e)throw new Error(`SYNTAX ERROR: #in-element does not take a \`${r[0]}\` option`)
i.expr(a[o])}i.expr(e[0]),i.dup(),i.enter(4),i.jumpUnless("ELSE"),i.pushRemoteElement(),i.invokeStaticBlock(s),i.popRemoteElement(),i.label("ELSE"),i.exit(),i.return(),i.label("END"),i.popFrame(),i.stopLabels()}),e.add("-with-dynamic-vars",(e,t,s,n,i)=>{if(t){let e=t[0],n=t[1]
i.compileParams(n),i.pushDynamicScope(),i.bindDynamicScope(e),i.invokeStaticBlock(s),i.popDynamicScope()}else i.invokeStaticBlock(s)}),e.add("component",(e,t,s,n,i)=>{if("string"==typeof e[0]&&i.staticComponentHelper(e[0],t,s))return
let r=e[0],a=e.slice(1)
i.dynamicComponent(r,a,t,!0,s,n)}),t.add("component",(e,t,s,n)=>{let i=t&&t[0]
if("string"==typeof i&&n.staticComponentHelper(i,s,null))return!0
let r=t[0],a=t.slice(1)
return n.dynamicComponent(r,a,s,!0,null,null),!0}),{blocks:e,inlines:t}}()
let t=e.blocks,s=e.inlines
this.blocks=t,this.inlines=s}}class Te{constructor(){this.names=o(),this.funcs=[]}add(e,t){this.funcs.push(t),this.names[e]=this.funcs.length-1}addMissing(e){this.missing=e}compile(e,t,s,n,i,r){let a=this.names[e]
if(void 0===a){(0,this.missing)(e,t,s,n,i,r)}else{(0,this.funcs[a])(t,s,n,i,r)}}}class Le{constructor(){this.names=o(),this.funcs=[]}add(e,t){this.funcs.push(t),this.names[e]=this.funcs.length-1}addMissing(e){this.missing=e}compile(e,t){let s,n,i,r=e[1]
if(!Array.isArray(r))return["expr",r]
if(r[0]===Ee.Helper)s=r[1],n=r[2],i=r[3]
else{if(r[0]!==Ee.Unknown)return["expr",r]
s=r[1],n=i=null}let a=this.names[s]
if(void 0===a&&this.missing){let e=(0,this.missing)(s,n,i,t)
return!1===e?["expr",r]:e}if(void 0!==a){let e=(0,this.funcs[a])(s,n,i,t)
return!1===e?["expr",r]:e}return["expr",r]}}const Me=-1
class Be{constructor(e,t,s,n){this.statements=e,this.containingLayout=t,this.options=s,this.symbolTable=n,this.compiled=null,this.statementCompiler=function(){if(xe)return xe
const e=xe=new _e
e.add(Ee.Text,(e,t)=>{t.text(e[1])}),e.add(Ee.Comment,(e,t)=>{t.comment(e[1])}),e.add(Ee.CloseElement,(e,t)=>{t.closeElement()}),e.add(Ee.FlushElement,(e,t)=>{t.flushElement()}),e.add(Ee.Modifier,(e,t)=>{let s=t.resolver,n=t.referrer,i=e[1],r=e[2],a=e[3],o=s.lookupModifier(i,n)
if(!o)throw new Error(`Compile Error ${i} is not a modifier: Helpers may not be used in the element form.`)
t.modifier(o,r,a)}),e.add(Ee.StaticAttr,(e,t)=>{let s=e[1],n=e[2],i=e[3]
t.staticAttr(s,i,n)}),e.add(Ee.DynamicAttr,(e,t)=>{Oe(e,!1,t)}),e.add(Ee.TrustingAttr,(e,t)=>{Oe(e,!0,t)}),e.add(Ee.OpenElement,(e,t)=>{t.openPrimitiveElement(e[1])}),e.add(Ee.OpenSplattedElement,(e,t)=>{t.setComponentAttrs(!0),t.putComponentOperations(),t.openPrimitiveElement(e[1])}),e.add(Ee.Component,(e,t)=>{let s=e[1],n=e[2],i=e[3],r=e[4],a=t.resolver,o=t.referrer,l=a.lookupComponentDefinition(s,o)
if(null===l)throw new Error(`Compile Error: Cannot find component ${s}`)
{let e=a.getCapabilities(l),s=[[Ee.ClientSideStatement,we.SetComponentAttrs,!0],...n,[Ee.ClientSideStatement,we.SetComponentAttrs,!1]],o=t.inlineBlock({statements:s,parameters:p}),h=t.template(r)
if(!1===e.dynamicLayout){let s=a.getLayout(l)
t.pushComponentDefinition(l),t.invokeStaticComponent(e,s,o,null,i,!1,h&&h)}else t.pushComponentDefinition(l),t.invokeComponent(o,null,i,!1,h&&h)}}),e.add(Ee.Partial,(e,t)=>{let s=e[1],n=e[2],i=t.referrer
t.startLabels(),t.pushFrame(),t.returnTo("END"),t.expr(s),t.dup(),t.enter(2),t.jumpUnless("ELSE"),t.invokePartial(i,t.evalSymbols(),n),t.popScope(),t.popFrame(),t.label("ELSE"),t.exit(),t.return(),t.label("END"),t.popFrame(),t.stopLabels()}),e.add(Ee.Yield,(e,t)=>{let s=e[1],n=e[2]
t.yield(s,n)}),e.add(Ee.AttrSplat,(e,t)=>{let s=e[1]
t.yield(s,[]),t.didCreateElement(le.s0),t.setComponentAttrs(!1)}),e.add(Ee.Debugger,(e,t)=>{let s=e[1]
t.debugger(t.evalSymbols(),s)}),e.add(Ee.ClientSideStatement,(e,s)=>{t.compile(e,s)}),e.add(Ee.Append,(e,t)=>{let s=e[1],n=e[2]
if(!0===(t.macros.inlines.compile(e,t)||s))return
let i=ve(s),r=ke(s)
n?t.guardedAppend(s,!0):i||r?t.guardedAppend(s,!1):(t.expr(s),t.primitive(!1),t.load(le.t0),t.dynamicContent())}),e.add(Ee.Block,(e,t)=>{let s=e[1],n=e[2],i=e[3],r=e[4],a=e[5],o=t.template(r),l=t.template(a),h=o&&o,c=l&&l
t.macros.blocks.compile(s,n,i,h,c,t)})
const t=new _e(1)
return t.add(we.OpenComponentElement,(e,t)=>{t.putComponentOperations(),t.openPrimitiveElement(e[2])}),t.add(we.DidCreateElement,(e,t)=>{t.didCreateElement(le.s0)}),t.add(we.SetComponentAttrs,(e,t)=>{t.setComponentAttrs(e[2])}),t.add(we.Debugger,()=>{}),t.add(we.DidRenderLayout,(e,t)=>{t.didRenderLayout(le.s0)}),e}()}static topLevel(e,t){return new Be(e.statements,{block:e,referrer:t.referrer},t,{referrer:t.referrer,hasEval:e.hasEval,symbols:e.symbols})}compile(e){let t=this.compiled
if(null!==t)return t
this.compiled=Me
let s=this.options,n=this.statements,i=this.containingLayout,r=i.referrer,a=s.program,o=s.resolver,l=s.macros,h=s.asPartial,c=new(0,s.Builder)(a,o,r,l,i,h,e)
for(let p=0;p<n.length;p++)this.statementCompiler.compile(n[p],c)
let u=c.commit(a.heap,i.block.symbols.length)
return this.compiled=u}}class De{constructor(e){this.builder=e}static(e,t){let s=t[0],n=t[1],i=t[2],r=t[3],a=this.builder,o=a.resolver
if(null!==e){let t=o.getCapabilities(e)
if(!1===t.dynamicLayout){let l=o.getLayout(e)
a.pushComponentDefinition(e),a.invokeStaticComponent(t,l,null,s,n,!1,i,r)}else a.pushComponentDefinition(e),a.invokeComponent(null,s,n,!1,i,r)}}}class Re{constructor(e){this.buffer=e,this.typePos=0,this.size=0}encode(e,t){if(e>255)throw new Error(`Opcode type over 8-bits. Got ${e}.`)
this.buffer.push(e|t|arguments.length-2<<8),this.typePos=this.buffer.length-1
for(let s=2;s<arguments.length;s++){let e=arguments[s]
if("number"==typeof e&&e>65535)throw new Error(`Operand over 16-bits. Got ${e}.`)
this.buffer.push(e)}this.size=this.buffer.length}patch(e,t){if(-1!==this.buffer[e+1])throw new Error("Trying to patch operand in populated slot instead of a reserved slot.")
this.buffer[e+1]=t}}class Ie{constructor(){this.labels=o(),this.targets=[]}label(e,t){this.labels[e]=t}target(e,t){this.targets.push({at:e,target:t})}patch(e){let t=this.targets,s=this.labels
for(let i=0;i<t.length;i++){var n=t[i]
let r=n.at,a=s[n.target]-r
e.patch(r,a)}}}class Pe{constructor(){this.encoder=new Re([])}push(e){switch(arguments.length){case 1:return this.encoder.encode(e,0)
case 2:return this.encoder.encode(e,0,arguments[1])
case 3:return this.encoder.encode(e,0,arguments[1],arguments[2])
default:return this.encoder.encode(e,0,arguments[1],arguments[2],arguments[3])}}pushMachine(e){switch(arguments.length){case 1:return this.encoder.encode(e,1024)
case 2:return this.encoder.encode(e,1024,arguments[1])
case 3:return this.encoder.encode(e,1024,arguments[1],arguments[2])
default:return this.encoder.encode(e,1024,arguments[1],arguments[2],arguments[3])}}commit(e,t){this.pushMachine(20)
let s=this.encoder.buffer,n=e.malloc()
for(let i=0;i<s.length;i++){let t=s[i]
"function"==typeof t?e.pushPlaceholder(t):e.push(t)}return e.finishMalloc(n,t),n}reserve(e){this.encoder.encode(e,0,-1)}reserveMachine(e){this.encoder.encode(e,1024,-1)}main(){this.push(56,le.s0),this.invokePreparedComponent(!1)}dynamicContent(){this.push(24)}beginComponentTransaction(){this.push(75)}commitComponentTransaction(){this.push(76)}pushDynamicScope(){this.push(36)}popDynamicScope(){this.push(37)}pushRemoteElement(){this.push(33)}popRemoteElement(){this.push(34)}pushRootScope(e,t){this.push(17,e,t?1:0)}pushChildScope(){this.push(18)}popScope(){this.push(19)}prepareArgs(e){this.push(65,e)}createComponent(e,t){let s=0|t
this.push(67,s,e)}registerComponentDestructor(e){this.push(68,e)}putComponentOperations(){this.push(69)}getComponentSelf(e){this.push(70,e)}getComponentTagName(e){this.push(71,e)}getComponentLayout(e){this.push(72,e)}invokeComponentLayout(e){this.push(74,e)}didCreateElement(e){this.push(77,e)}didRenderLayout(e){this.push(78,e)}pushFrame(){this.pushMachine(47)}popFrame(){this.pushMachine(48)}invokeVirtual(){this.pushMachine(41)}invokeYield(){this.push(43)}toBoolean(){this.push(51)}invokePreparedComponent(e,t=null){this.beginComponentTransaction(),this.pushDynamicScope(),this.createComponent(le.s0,e),t&&t(),this.registerComponentDestructor(le.s0),this.getComponentSelf(le.s0),this.invokeComponentLayout(le.s0),this.didRenderLayout(le.s0),this.popFrame(),this.popScope(),this.popDynamicScope(),this.commitComponentTransaction()}get pos(){return this.encoder.typePos}get nextPos(){return this.encoder.size}}class Fe extends Pe{constructor(e,t,s,n,i,r,a){super(),this.program=e,this.resolver=t,this.referrer=s,this.macros=n,this.containingLayout=i,this.asPartial=r,this.stdLib=a,this.component=new De(this),this.expressionCompiler=function(){if(Ae)return Ae
const e=Ae=new _e
return e.add(Ee.Unknown,(e,t)=>{let s=t.resolver,n=t.asPartial,i=t.referrer,r=e[1],a=s.lookupHelper(r,i)
null!==a?t.helper(a,null,null):n?t.resolveMaybeLocal(r):(t.getVariable(0),t.getProperty(r))}),e.add(Ee.Concat,(e,t)=>{let s=e[1]
for(let n=0;n<s.length;n++)t.expr(s[n])
t.concat(s.length)}),e.add(Ee.Helper,(e,t)=>{let s=t.resolver,n=t.referrer,i=e[1],r=e[2],a=e[3]
if("component"===i){let e=r[0],s=r.slice(1)
return void t.curryComponent(e,s,a,!0)}let o=s.lookupHelper(i,n)
if(null===o)throw new Error(`Compile Error: ${i} is not a helper`)
t.helper(o,r,a)}),e.add(Ee.Get,(e,t)=>{let s=e[1],n=e[2]
t.getVariable(s)
for(let i=0;i<n.length;i++)t.getProperty(n[i])}),e.add(Ee.MaybeLocal,(e,t)=>{let s=e[1]
if(t.asPartial){let e=s[0]
s=s.slice(1),t.resolveMaybeLocal(e)}else t.getVariable(0)
for(let n=0;n<s.length;n++)t.getProperty(s[n])}),e.add(Ee.Undefined,(e,t)=>t.pushPrimitiveReference(void 0)),e.add(Ee.HasBlock,(e,t)=>{t.hasBlock(e[1])}),e.add(Ee.HasBlockParams,(e,t)=>{t.hasBlockParams(e[1])}),e}(),this.labelsStack=new l,this.isComponentAttrs=!1,this.constants=e.constants}label(e){this.labels.label(e,this.nextPos)}setComponentAttrs(e){this.isComponentAttrs=e}expr(e){Array.isArray(e)?this.expressionCompiler.compile(e,this):this.pushPrimitiveReference(e)}pushArgs(e,t){let s=this.constants.stringArray(e)
this.push(63,s,t)}get labels(){return this.labelsStack.current}startLabels(){this.labelsStack.push(new Ie)}stopLabels(){this.labelsStack.pop().patch(this.encoder)}pushComponentDefinition(e){this.push(59,this.constants.handle(e))}pushCurriedComponent(){this.push(61)}pushDynamicComponentInstance(){this.push(60)}resolveDynamicComponent(e){this.push(62,this.constants.serializable(e))}staticComponentHelper(e,t,s){let n=this.resolver.lookupComponentDefinition(e,this.referrer)
if(n){let e=this.resolver.getCapabilities(n)
if(!1===e.dynamicLayout){if(t)for(let e=0;e<t.length;e+=2)t[e][0]=`@${t[e][0]}`
let i=this.resolver.getLayout(n)
return this.pushComponentDefinition(n),this.invokeStaticComponent(e,i,null,null,t,!1,s&&s),!0}}return!1}invokePartial(e,t,s){let n=this.constants.serializable(e),i=this.constants.stringArray(t),r=this.constants.array(s)
this.push(79,n,i,r)}resolveMaybeLocal(e){this.push(80,this.string(e))}debugger(e,t){this.push(81,this.constants.stringArray(e),this.constants.array(t))}text(e){this.push(22,this.constants.string(e))}openPrimitiveElement(e){this.push(25,this.constants.string(e))}openDynamicElement(){this.push(26)}flushElement(){this.push(30)}closeElement(){this.push(31)}staticAttr(e,t,s){let n=this.constants.string(e),i=t?this.constants.string(t):0
if(this.isComponentAttrs)this.pushPrimitiveReference(s),this.push(29,n,1,i)
else{let e=this.constants.string(s)
this.push(27,n,e,i)}}dynamicAttr(e,t,s){let n=this.constants.string(e),i=t?this.constants.string(t):0
this.isComponentAttrs?this.push(29,n,!0===s?1:0,i):this.push(28,n,!0===s?1:0,i)}comment(e){let t=this.constants.string(e)
this.push(23,t)}modifier(e,t,s){this.pushFrame(),this.compileArgs(t,s,null,!0),this.push(32,this.constants.handle(e)),this.popFrame()}putIterator(){this.push(54)}enterList(e){this.reserve(52),this.labels.target(this.pos,e)}exitList(){this.push(53)}iterate(e){this.reserve(55),this.labels.target(this.pos,e)}setVariable(e){this.push(2,e)}setBlock(e){this.push(3,e)}getVariable(e){this.push(4,e)}getProperty(e){this.push(5,this.string(e))}getBlock(e){this.push(6,e)}hasBlock(e){this.push(7,e)}hasBlockParams(e){this.getBlock(e),this.resolveBlock(),this.push(8)}concat(e){this.push(9,e)}load(e){this.push(15,e)}fetch(e){this.push(16,e)}dup(e=le.sp,t=0){return this.push(13,e,t)}pop(e=1){return this.push(14,e)}returnTo(e){this.reserveMachine(21),this.labels.target(this.pos,e)}primitive(e){let t,s=0
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
default:throw new Error("Invalid primitive passed to pushPrimitive")}this.push(11,t<<3|s)}float(e){return this.constants.float(e)}negative(e){return this.constants.negative(e)}pushPrimitiveReference(e){this.primitive(e),this.primitiveReference()}primitiveReference(){this.push(12)}helper(e,t,s){this.pushFrame(),this.compileArgs(t,s,null,!0),this.push(1,this.constants.handle(e)),this.popFrame(),this.fetch(le.v0)}bindDynamicScope(e){this.push(35,this.names(e))}enter(e){this.push(49,e)}exit(){this.push(50)}return(){this.pushMachine(20)}jump(e){this.reserveMachine(44),this.labels.target(this.pos,e)}jumpIf(e){this.reserve(45),this.labels.target(this.pos,e)}jumpUnless(e){this.reserve(46),this.labels.target(this.pos,e)}string(e){return this.constants.string(e)}names(e){let t=[]
for(let s=0;s<e.length;s++){let n=e[s]
t[s]=this.constants.string(n)}return this.constants.array(t)}symbols(e){return this.constants.array(e)}inlineBlock(e){let t=e.parameters,s=e.statements,n={parameters:t,referrer:this.containingLayout.referrer},i={program:this.program,macros:this.macros,Builder:this.constructor,resolver:this.resolver,asPartial:this.asPartial,referrer:this.referrer}
return new Be(s,this.containingLayout,i,n)}evalSymbols(){let e=this.containingLayout.block
return e.hasEval?e.symbols:null}compileParams(e){if(!e)return 0
for(let t=0;t<e.length;t++)this.expr(e[t])
return e.length}compileArgs(e,t,s,n){s&&(this.pushYieldableBlock(s.main),this.pushYieldableBlock(s.else),this.pushYieldableBlock(s.attrs))
let i=this.compileParams(e)<<4
n&&(i|=8),s&&(i|=7)
let r=p
if(t){r=t[0]
let e=t[1]
for(let t=0;t<e.length;t++)this.expr(e[t])}this.pushArgs(r,i)}invokeStaticBlock(e,t=0){let s=e.symbolTable.parameters,n=s.length,i=Math.min(t,n)
if(this.pushFrame(),i){this.pushChildScope()
for(let e=0;e<i;e++)this.dup(le.fp,t-e),this.setVariable(s[e])}this.pushBlock(e),this.resolveBlock(),this.invokeVirtual(),i&&this.popScope(),this.popFrame()}builtInGuardedAppend(){this.dup(),this.startLabels(),this.isComponent(),this.enter(2),this.jumpUnless("ELSE"),this.pushCurriedComponent(),this.pushDynamicComponentInstance(),this.invokeComponent(null,null,null,!1,null,null),this.exit(),this.return(),this.label("ELSE"),this.dynamicContent(),this.exit(),this.return(),this.stopLabels()}guardedAppend(e,t){this.startLabels(),this.pushFrame(),this.returnTo("END"),this.stdLib?(this.primitive(!!t),this.load(le.t0),this.expr(e),this.primitive(this.stdLib.guardedAppend),this.invokeVirtual()):(this.expr(e),this.dup(),this.isComponent(),this.enter(2),this.jumpUnless("ELSE"),this.pushCurriedComponent(),this.pushDynamicComponentInstance(),this.invokeComponent(null,null,null,!1,null,null),this.exit(),this.return(),this.label("ELSE"),this.primitive(!!t),this.load(le.t0),this.dynamicContent(),this.exit(),this.return()),this.label("END"),this.popFrame(),this.stopLabels()}yield(e,t){this.compileArgs(t,null,null,!1),this.getBlock(e),this.resolveBlock(),this.invokeYield(),this.popScope(),this.popFrame()}populateLayout(e){this.push(73,e)}invokeComponent(e,t,s,n,i,r=null,a){this.fetch(le.s0),this.dup(le.sp,1),this.load(le.s0),this.pushFrame()
let o={main:i,else:r,attrs:e}
this.compileArgs(t,s,o,n),this.prepareArgs(le.s0),this.invokePreparedComponent(null!==i,()=>{a?(this.pushSymbolTable(a.symbolTable),this.pushLayout(a),this.resolveLayout()):this.getComponentLayout(le.s0),this.populateLayout(le.s0)}),this.load(le.s0)}invokeStaticComponent(e,s,n,i,r,a,o,l=null){let h=s.symbolTable
if(h.hasEval||e.prepareArgs)return void this.invokeComponent(n,i,r,a,o,l,s)
this.fetch(le.s0),this.dup(le.sp,1),this.load(le.s0)
let c=h.symbols
e.createArgs&&(this.pushFrame(),this.compileArgs(null,r,null,a)),this.beginComponentTransaction(),this.pushDynamicScope(),this.createComponent(le.s0,null!==o),e.createArgs&&this.popFrame(),this.registerComponentDestructor(le.s0)
let u=[]
this.getComponentSelf(le.s0),u.push({symbol:0,isBlock:!1})
for(let d=0;d<c.length;d++){let e=c[d]
switch(e.charAt(0)){case"&":let s=null
if("&default"===e)s=o
else if("&inverse"===e)s=l
else{if(e!==Ce)throw t()
s=n}s?(this.pushYieldableBlock(s),u.push({symbol:d+1,isBlock:!0})):(this.pushYieldableBlock(null),u.push({symbol:d+1,isBlock:!0}))
break
case"@":if(!r)break
let i=r[0],h=r[1],c=e
a&&(c=e.slice(1))
let p=i.indexOf(c);-1!==p&&(this.expr(h[p]),u.push({symbol:d+1,isBlock:!1}))}}this.pushRootScope(c.length+1,!!(o||l||n))
for(let t=u.length-1;t>=0;t--){var p=u[t]
let e=p.symbol
p.isBlock?this.setBlock(e):this.setVariable(e)}this.pushFrame(),this.invokeStatic(s),this.didRenderLayout(le.s0),this.popFrame(),this.popScope(),this.popDynamicScope(),this.commitComponentTransaction(),this.load(le.s0)}dynamicComponent(e,t,s,n,i,r=null){this.startLabels(),this.pushFrame(),this.returnTo("END"),this.expr(e),this.dup(),this.enter(2),this.jumpUnless("ELSE"),this.resolveDynamicComponent(this.referrer),this.pushDynamicComponentInstance(),this.invokeComponent(null,t,s,n,i,r),this.label("ELSE"),this.exit(),this.return(),this.label("END"),this.popFrame(),this.stopLabels()}isComponent(){this.push(57)}curryComponent(e,t,s,n){let i=this.referrer
this.pushFrame(),this.compileArgs(t,s,null,n),this.push(66),this.expr(e),this.push(58,this.constants.serializable(i)),this.popFrame(),this.fetch(le.v0)}pushSymbolTable(e){if(e){let t=this.constants.serializable(e)
this.push(40,t)}else this.primitive(null)}pushBlockScope(){this.push(39)}pushYieldableBlock(e){this.pushSymbolTable(e&&e.symbolTable),this.pushBlockScope(),this.pushBlock(e)}template(e){return e?this.inlineBlock(e):null}}class je extends Fe{pushBlock(e){e?this.pushOther(e):this.primitive(null)}resolveBlock(){this.push(38)}pushLayout(e){e?this.pushOther(e):this.primitive(null)}resolveLayout(){this.push(38)}invokeStatic(e){this.pushOther(e),this.push(38),this.pushMachine(41)}pushOther(e){this.push(10,this.other(e))}other(e){return this.constants.other(e)}}class He{constructor(){this.base=0,this.length=0,this.stack=null,this._tag=null,this._references=null}setup(e,t,s){this.stack=e,this.base=t,this.length=s,0===s?(this._tag=v,this._references=p):(this._tag=null,this._references=null)}get tag(){let e=this._tag
return e||(e=this._tag=_(this.references)),e}at(e){let t=this.base,s=this.length,n=this.stack
return e<0||e>=s?pe:n.get(e,t)}capture(){return new ze(this.tag,this.references)}prepend(e){let t=e.length
if(t>0){let s=this.base,n=this.length,i=this.stack
this.base=s-=t,this.length=n+t
for(let r=0;r<t;r++)i.set(e.at(r),r,s)
this._tag=null,this._references=null}}get references(){let e=this._references
if(!e){let t=this.stack,s=this.base,n=this.length
e=this._references=t.sliceArray(s,s+n)}return e}}class ze{constructor(e,t,s=t.length){this.tag=e,this.references=t,this.length=s}static empty(){return new ze(v,p,0)}at(e){return this.references[e]}value(){return this.references.map(this.valueOf)}get(e){let t=this.references,s=this.length
if("length"===e)return he.create(s)
{let n=parseInt(e,10)
return n<0||n>=s?pe:t[n]}}valueOf(e){return e.value()}}class Ve{constructor(){this.base=0,this.length=0,this._references=null,this._names=p,this._atNames=p}setup(e,t,s,n,i){this.stack=e,this.base=t,this.length=s,0===s?(this._references=p,this._names=p,this._atNames=p):(this._references=null,i?(this._names=n,this._atNames=null):(this._names=null,this._atNames=n))}get tag(){return _(this.references)}get names(){let e=this._names
return e||(e=this._names=this._atNames.map(this.toSyntheticName)),e}get atNames(){let e=this._atNames
return e||(e=this._atNames=this._names.map(this.toAtName)),e}has(e){return-1!==this.names.indexOf(e)}get(e,t=!0){let s=this.base,n=this.stack,i=(t?this.names:this.atNames).indexOf(e)
return-1===i?pe:n.get(i,s)}capture(){return new Ue(this.tag,this.names,this.references)}merge(e){let t=e.length
if(t>0){let s=this.names,n=this.length,i=this.stack,r=e.names
Object.isFrozen(s)&&0===s.length&&(s=[])
for(let a=0;a<t;a++){let t=r[a];-1===s.indexOf(t)&&(n=s.push(t),i.push(e.references[a]))}this.length=n,this._references=null,this._names=s,this._atNames=null}}get references(){let e=this._references
if(!e){let t=this.base,s=this.length,n=this.stack
e=this._references=n.sliceArray(t,t+s)}return e}toSyntheticName(e){return e.slice(1)}toAtName(e){return`@${e}`}}class Ue{constructor(e,t,s){this.tag=e,this.names=t,this.references=s,this.length=t.length,this._map=null}get map(){let e=this._map
if(!e){let t=this.names,s=this.references
e=this._map=o()
for(let n=0;n<t.length;n++){e[t[n]]=s[n]}}return e}has(e){return-1!==this.names.indexOf(e)}get(e){let t=this.names,s=this.references,n=t.indexOf(e)
return-1===n?pe:s[n]}value(){let e=this.names,t=this.references,s=o()
for(let n=0;n<e.length;n++){s[e[n]]=t[n].value()}return s}}class $e{constructor(){this.internalValues=null,this.internalTag=null,this.names=p,this.length=0,this.base=0}setup(e,t,s,n){this.stack=e,this.names=n,this.base=t,this.length=s,0===s?(this.internalTag=v,this.internalValues=p):(this.internalTag=null,this.internalValues=null)}get values(){let e=this.internalValues
if(!e){let t=this.base,s=this.length,n=this.stack
e=this.internalValues=n.sliceArray(t,t+3*s)}return e}has(e){return-1!==this.names.indexOf(e)}get(e){let t=this.base,s=this.stack,n=this.names,i=n.indexOf(e)
if(-1===n.indexOf(e))return null
let r=s.get(3*i,t),a=s.get(3*i+1,t),o=s.get(3*i+2,t)
return null===o?null:[o,a,r]}capture(){return new qe(this.names,this.values)}}class qe{constructor(e,t){this.names=e,this.values=t,this.length=e.length}has(e){return-1!==this.names.indexOf(e)}get(e){let t=this.names.indexOf(e)
return-1===t?null:[this.values[3*t+2],this.values[3*t+1],this.values[3*t]]}}const Ge=new Ue(v,p,p),Ye=new ze(v,p),Ke={tag:v,length:0,positional:Ye,named:Ge},We="CURRIED COMPONENT DEFINITION [id=6f00feb9-a0ef-4547-99ea-ac328f80acea]"
function Xe(e){return!(!e||!e[We])}class Je{constructor(e,t){this.inner=e,this.args=t,this[We]=!0}unwrap(e){e.realloc(this.offset)
let t=this
for(;;){var s=t
let n=s.args,i=s.inner
if(n&&(e.positional.prepend(n.positional),e.named.merge(n.named)),!Xe(i))return i
t=i}}get offset(){let e=this.inner,t=this.args,s=t?t.positional.length:0
return Xe(e)?s+e.offset:s}}class Qe extends ge{static create(e){return new Qe(e)}toBool(e){return Xe(e)}}re.add(24,e=>{let t,s=e.stack.pop(),n=e.fetchValue(le.t0),i=s.value()
t=n?e.elements().appendTrustingDynamicContent(i):e.elements().appendCautiousDynamicContent(i),w(s)||e.updateWith(new class extends oe{constructor(e,t){super(),this.reference=e,this.content=t,this.tag=e.tag}evaluate(e){let t=this.content,s=this.reference
t.update(e.env,s.value())}}(s,t)),e.loadValue(le.t0,null)})
re.add(18,e=>e.pushChildScope()),re.add(19,e=>e.popScope()),re.add(36,e=>e.pushDynamicScope()),re.add(37,e=>e.popDynamicScope()),re.add(10,(e,{op1:t})=>{e.stack.push(e.constants.getOther(t))}),re.add(11,(e,{op1:t})=>{let s=e.stack,n=t>>3
switch(7&t){case 0:s.push(n)
break
case 1:s.push(e.constants.getFloat(n))
break
case 2:s.push(e.constants.getString(n))
break
case 3:s.pushEncodedImmediate(t)
break
case 4:s.push(e.constants.getNegative(n))}}),re.add(12,e=>{let t=e.stack
t.push(he.create(t.pop()))}),re.add(13,(e,{op1:t,op2:s})=>{let n=e.fetchValue(t)-s
e.stack.dup(n)}),re.add(14,(e,{op1:t})=>{e.stack.pop(t)}),re.add(15,(e,{op1:t})=>{e.load(t)}),re.add(16,(e,{op1:t})=>{e.fetch(t)}),re.add(35,(e,{op1:t})=>{let s=e.constants.getArray(t)
e.bindDynamicScope(s)}),re.add(49,(e,{op1:t})=>{e.enter(t)}),re.add(50,e=>{e.exit()}),re.add(40,(e,{op1:t})=>{e.stack.push(e.constants.getSerializable(t))}),re.add(39,e=>{e.stack.push(e.scope())}),re.add(38,e=>{let t=e.stack,s=t.pop()
s?t.pushSmi(s.compile()):t.pushNull()}),re.add(43,e=>{let t=e.stack,s=t.pop(),n=t.pop(),i=t.pop(),r=t.pop()
if(null===i)return e.pushFrame(),void e.pushScope(n)
let a=n
{let e=i.parameters,t=e.length
if(t>0){a=a.child()
for(let s=0;s<t;s++)a.bindSymbol(e[s],r.at(s))}}e.pushFrame(),e.pushScope(a),e.call(s)}),re.add(45,(e,{op1:t})=>{let s=e.stack.pop()
if(w(s))s.value()&&e.goto(t)
else{let n=new D(s)
n.peek()&&e.goto(t),e.updateWith(new Ze(n))}}),re.add(46,(e,{op1:t})=>{let s=e.stack.pop()
if(w(s))s.value()||e.goto(t)
else{let n=new D(s)
n.peek()||e.goto(t),e.updateWith(new Ze(n))}}),re.add(51,e=>{let t=e.env,s=e.stack
s.push(t.toConditionalReference(s.pop()))})
class Ze extends oe{constructor(e){super(),this.type="assert",this.tag=e.tag,this.cache=e}evaluate(e){let t=this.cache
t.revalidate()!==R&&e.throw()}}class et extends oe{constructor(e,t){super(),this.target=t,this.type="jump-if-not-modified",this.tag=e,this.lastRevision=e.value()}evaluate(e){let t=this.tag,s=this.target,n=this.lastRevision
!e.alwaysRevalidate&&t.validate(n)&&e.goto(s)}didModify(){this.lastRevision=this.tag.value()}}class tt extends oe{constructor(e){super(),this.target=e,this.type="did-modify",this.tag=v}evaluate(){this.target.didModify()}}class st{constructor(e){this.tag=v,this.type="label",this.label=null,this.prev=null,this.next=null,a(this),this.label=e}evaluate(){}inspect(){return`${this.label} [${this._guid}]`}}re.add(22,(e,{op1:t})=>{e.elements().appendText(e.constants.getString(t))}),re.add(23,(e,{op1:t})=>{e.elements().appendComment(e.constants.getString(t))}),re.add(25,(e,{op1:t})=>{e.elements().openElement(e.constants.getString(t))}),re.add(26,e=>{let t=e.stack.pop().value()
e.elements().openElement(t)}),re.add(33,e=>{let t,s,n=e.stack.pop(),i=e.stack.pop(),r=e.stack.pop().value()
if(w(n))t=n.value()
else{let s=new D(n)
t=s.peek(),e.updateWith(new Ze(s))}if(w(i))s=i.value()
else{let t=new D(i)
s=t.peek(),e.updateWith(new Ze(t))}e.elements().pushRemoteElement(t,r,s)}),re.add(34,e=>{e.elements().popRemoteElement()}),re.add(30,e=>{let t=e.fetchValue(le.t0)
t&&(t.flush(e),e.loadValue(le.t0,null)),e.elements().flushElement()}),re.add(31,e=>{e.elements().closeElement()}),re.add(32,(e,{op1:t})=>{let s=e.constants.resolveHandle(t),n=e.stack.pop()
var i=e.elements()
let r=i.constructing,a=i.updateOperations,o=e.dynamicScope(),l=s.create(r,n,o,a)
e.env.scheduleInstallModifier(l,s)
let h=s.getDestructor(l)
h&&e.newDestroyable(h)
let c=s.getTag(l)
S(c)||e.updateWith(new class extends oe{constructor(e,t,s){super(),this.tag=e,this.manager=t,this.modifier=s,this.type="update-modifier",this.lastUpdated=e.value()}evaluate(e){let t=this.manager,s=this.modifier,n=this.tag,i=this.lastUpdated
n.validate(i)||(e.env.scheduleUpdateModifier(s,t),this.lastUpdated=n.value())}}(c,s,l))})
re.add(27,(e,{op1:t,op2:s,op3:n})=>{let i=e.constants.getString(t),r=e.constants.getString(s),a=n?e.constants.getString(n):null
e.elements().setStaticAttribute(i,r,a)}),re.add(28,(e,{op1:t,op2:s,op3:n})=>{let i=e.constants.getString(t),r=e.stack.pop(),a=r.value(),o=n?e.constants.getString(n):null,l=e.elements().setDynamicAttribute(i,a,!!s,o)
w(r)||e.updateWith(new nt(r,l))})
class nt extends oe{constructor(e,t){super(),this.reference=e,this.attribute=t,this.type="patch-element",this.tag=e.tag,this.lastRevision=this.tag.value()}evaluate(e){let t=this.attribute,s=this.reference,n=this.tag
n.validate(this.lastRevision)||(this.lastRevision=n.value(),t.update(s.value(),e.env))}}function it(e,t,s){let n=e.lookupComponent(t,s)
return n}function rt(e){return at(e)?"":String(e)}function at(e){return null===e||void 0===e||"function"!=typeof e.toString}function ot(e){return"object"==typeof e&&null!==e&&"function"==typeof e.toHTML}function lt(e){return"object"==typeof e&&null!==e&&"number"==typeof e.nodeType}function ht(e){return lt(e)&&11===e.nodeType}function ct(e){return"string"==typeof e}class ut{constructor(e){this.list=e,this.tag=_(e),this.list=e}value(){let e=[],t=this.list
for(let s=0;s<t.length;s++){let n=rt(t[s].value())
n&&e.push(n)}return 0===e.length?null:e.join(" ")}}function pt(e){return 0|(e.dynamicLayout?1:0)|(e.dynamicTag?2:0)|(e.prepareArgs?4:0)|(e.createArgs?8:0)|(e.attributeHook?16:0)|(e.elementHook?32:0)}function dt(e,t){return!!(e&t)}const mt=new class{constructor(){this.stack=null,this.positional=new He,this.named=new Ve,this.blocks=new $e}setup(e,t,s,n,i){this.stack=e
let r=this.named,a=t.length,o=e.sp-a+1
r.setup(e,o,a,t,i)
let l=o-n
this.positional.setup(e,l,n)
let h=this.blocks,c=s.length,u=l-3*c
h.setup(e,u,c,s)}get tag(){return _([this.positional,this.named])}get base(){return this.blocks.base}get length(){return this.positional.length+this.named.length+3*this.blocks.length}at(e){return this.positional.at(e)}realloc(e){if(e>0){let t=this.positional,s=this.named,n=this.stack,i=t.base+e
for(let e=t.length+s.length-1;e>=0;e--)n.copy(e+t.base,e+i)
t.base+=e,s.base+=e,n.sp+=e}}capture(){let e=0===this.positional.length?Ye:this.positional.capture(),t=0===this.named.length?Ge:this.named.capture()
return{tag:this.tag,length:this.length,positional:e,named:t}}clear(){let e=this.stack,t=this.length
e.pop(t)}}
re.add(57,e=>{let t=e.stack,s=t.pop()
t.push(Qe.create(s))}),re.add(58,(e,{op1:t})=>{let s=e.stack,n=s.pop(),i=s.pop(),r=e.constants.getSerializable(t),a=e.constants.resolver
e.loadValue(le.v0,new class{constructor(e,t,s,n){this.inner=e,this.resolver=t,this.meta=s,this.args=n,this.tag=e.tag,this.lastValue=null,this.lastDefinition=null}value(){let e=this.inner,t=this.lastValue,s=e.value()
if(s===t)return this.lastDefinition
let n=null
return Xe(s)?n=s:"string"==typeof s&&s&&(n=it(this.resolver,s,this.meta)),n=this.curry(n),this.lastValue=s,this.lastDefinition=n,n}get(){return pe}curry(e){let t=this.args
return!t&&Xe(e)?e:e?new Je(e,t):null}}(n,a,r,i))}),re.add(59,(e,{op1:t})=>{let s=e.constants.resolveHandle(t),n=s.manager,i={definition:s,manager:n,capabilities:pt(n.getCapabilities(s.state)),state:null,handle:null,table:null}
e.stack.push(i)}),re.add(62,(e,{op1:s})=>{let n,i=e.stack,r=i.pop().value(),a=e.constants.getSerializable(s)
if(e.loadValue(le.t1,null),"string"==typeof r){n=it(e.constants.resolver,r,a)}else{if(!Xe(r))throw t()
n=r}i.push(n)}),re.add(60,e=>{let t,s,n=e.stack,i=n.pop()
Xe(i)?s=t=null:t=pt((s=i.manager).getCapabilities(i.state)),n.push({definition:i,capabilities:t,manager:s,state:null,handle:null,table:null})}),re.add(61,(e,{op1:s})=>{let n,i=e.stack,r=i.pop().value()
if(!Xe(r))throw t()
n=r,i.push(n)}),re.add(63,(e,{op1:t,op2:s})=>{let n=e.stack,i=e.constants.getStringArray(t),r=s>>4,a=8&s,o=[]
4&s&&o.push("main"),2&s&&o.push("else"),1&s&&o.push("attrs"),mt.setup(n,i,o,r,!!a),n.push(mt)}),re.add(66,e=>{let t=e.stack,s=t.pop().capture()
t.push(s)}),re.add(65,(e,{op1:t})=>{let s=e.stack,n=e.fetchValue(t),i=s.pop(),r=n.definition
Xe(r)&&(r=function(e,t,s){let n=e.definition=t.unwrap(s),i=n.manager,r=n.state
return e.manager=i,e.capabilities=pt(i.getCapabilities(r)),n}(n,r,i))
var a=r
let o=a.manager,l=a.state
if(!0!==dt(n.capabilities,4))return void s.push(i)
let h=i.blocks.values,c=i.blocks.names,u=o.prepareArgs(l,i)
if(u){i.clear()
for(let i=0;i<h.length;i++)s.push(h[i])
let e=u.positional,t=u.named,n=e.length
for(let i=0;i<n;i++)s.push(e[i])
let r=Object.keys(t)
for(let i=0;i<r.length;i++)s.push(t[r[i]])
i.setup(s,r,c,n,!0)}s.push(i)}),re.add(67,(e,{op1:t,op2:s})=>{let n=e.dynamicScope(),i=e.fetchValue(s),r=i.definition,a=i.manager,o=1&t,l=null
dt(i.capabilities=pt(a.getCapabilities(r.state)),8)&&(l=e.stack.peek())
let h=a.create(e.env,r.state,l,n,e.getSelf(),!!o)
i.state=h
let c=a.getTag(h)
S(c)||e.updateWith(new class extends oe{constructor(e,t,s,n){super(),this.tag=e,this.component=t,this.manager=s,this.dynamicScope=n,this.type="update-component"}evaluate(e){let t=this.component,s=this.manager,n=this.dynamicScope
s.update(t,n)}}(c,h,a,n))}),re.add(68,(e,{op1:t})=>{var s=e.fetchValue(t)
let n=s.manager,i=s.state,r=n.getDestructor(i)
r&&e.newDestroyable(r)}),re.add(75,e=>{e.beginCacheGroup(),e.elements().pushSimpleBlock()}),re.add(69,e=>{e.loadValue(le.t0,new class{constructor(){this.attributes=o(),this.classes=[]}setAttribute(e,t,s,n){let i={value:t,namespace:n,trusting:s}
"class"===e&&this.classes.push(t),this.attributes[e]=i}flush(e){for(let t in this.attributes){let s=this.attributes[t],n=s.value,i=s.namespace,r=s.trusting
"class"===t&&(n=new ut(this.classes))
let a=e.elements().setDynamicAttribute(t,n.value(),r,i)
w(n)||e.updateWith(new nt(n,a))}}})}),re.add(29,(e,{op1:t,op2:s,op3:n})=>{let i=e.constants.getString(t),r=e.stack.pop(),a=n?e.constants.getString(n):null
e.fetchValue(le.t0).setAttribute(i,r,!!s,a)})
re.add(77,(e,{op1:t})=>{var s=e.fetchValue(t)
let n=s.definition,i=s.state,r=n.manager,a=e.fetchValue(le.t0)
r.didCreateElement(i,e.elements().expectConstructing("DidCreateElementOpcode#evaluate"),a)}),re.add(70,(e,{op1:t})=>{var s=e.fetchValue(t)
let n=s.definition,i=s.state,r=n.manager
e.stack.push(r.getSelf(i))}),re.add(71,(e,{op1:t})=>{var s=e.fetchValue(t)
let n=s.definition,i=s.state,r=n.manager
e.stack.push(r.getTagName(i))}),re.add(72,(e,{op1:s})=>{let n,i=e.fetchValue(s),r=i.manager,a=i.definition,o=e.constants.resolver,l=e.stack,h=i.state,c=i.capabilities,u=a.state
if(!1===dt(c,1))n=r.getLayout(u,o)
else{if(!function(e,t){return!0===dt(e,1)}(c))throw t()
n=r.getDynamicLayout(h,o)}l.push(n.symbolTable),l.push(n.handle)}),re.add(56,(e,{op1:t})=>{let s=e.stack.pop(),n=e.stack.pop(),i=s.manager,r={definition:s,manager:i,capabilities:pt(i.getCapabilities(s.state)),state:null,handle:n.handle,table:n.symbolTable}
e.loadValue(t,r)}),re.add(73,(e,{op1:t})=>{let s=e.stack,n=s.pop(),i=s.pop(),r=e.fetchValue(t)
r.handle=n,r.table=i}),re.add(74,(e,{op1:t})=>{let s=e.stack
var n=e.fetchValue(t)
let i=n.handle
var r=n.table
let a=r.symbols,l=r.hasEval
{let t=s.pop(),n=e.pushRootScope(a.length+1,!0)
n.bindSelf(t)
let r=e.stack.pop(),h=null
l&&(h=o())
let c=r.named.atNames
for(let e=c.length-1;e>=0;e--){let t=c[e],s=a.indexOf(c[e]),i=r.named.get(t,!1);-1!==s&&n.bindSymbol(s+1,i),l&&(h[t]=i)}let u=(e,t)=>{let s=a.indexOf(e),i=p.get(t);-1!==s&&n.bindBlock(s+1,i),h&&(h[e]=i)},p=r.blocks
u(Ce,"attrs"),u("&inverse","else"),u("&default","main"),h&&n.bindEvalScope(h),e.call(i)}}),re.add(78,(e,{op1:t})=>{var s=e.fetchValue(t)
let n=s.manager,i=s.state,r=e.elements().popBlock()
n.didRenderLayout(i,r),e.env.didCreate(i,n),e.updateWith(new class extends oe{constructor(e,t,s){super(),this.manager=e,this.component=t,this.bounds=s,this.type="did-update-layout",this.tag=v}evaluate(e){let t=this.manager,s=this.component,n=this.bounds
t.didUpdateLayout(s,n),e.env.didUpdate(s,t)}}(n,i,r))}),re.add(76,e=>{e.commitCacheGroup()})
let ft=function(e,t){console.info("Use `context`, and `get(<path>)` to debug this template."),t("this")}
re.add(81,(e,{op1:t,op2:s})=>{let n=e.constants.getStringArray(t),i=e.constants.getArray(s),r=new class{constructor(e,t,s){this.scope=e,this.locals=o()
for(let n=0;n<s.length;n++){let i=s[n],r=t[i-1],a=e.getSymbol(i)
this.locals[r]=a}}get(e){let t=this.scope,s=this.locals,n=e.split(".")
var i=e.split(".")
let r,a=i[0],o=i.slice(1),l=t.getEvalScope()
return"this"===a?r=t.getSelf():s[a]?r=s[a]:0===a.indexOf("@")&&l[a]?r=l[a]:(r=this.scope.getSelf(),o=n),o.reduce((e,t)=>e.get(t),r)}}(e.scope(),n,i)
ft(e.getSelf().value(),e=>r.get(e).value())}),re.add(79,(e,{op1:t,op2:s,op3:n})=>{let i=e.constants,r=e.constants.resolver,a=e.stack.pop().value(),o=i.getSerializable(t),l=i.getStringArray(s),h=i.getArray(n),c=r.lookupPartial(a,o)
var u=r.resolve(c).getPartial()
let p=u.symbolTable,d=u.handle
{let t=p.symbols,s=e.scope(),n=e.pushRootScope(t.length,!1),i=s.getEvalScope()
n.bindCallerScope(s.getCallerScope()),n.bindEvalScope(i),n.bindSelf(s.getSelf())
let r=Object.create(s.getPartialMap())
for(let e=0;e<h.length;e++){let t=h[e],n=l[t-1],i=s.getSymbol(t)
r[n]=i}if(i)for(let e=0;e<t.length;e++){let s=e+1,r=i[t[e]]
void 0!==r&&n.bind(s,r)}n.bindPartialMap(r),e.pushFrame(),e.call(d)}})
re.add(54,e=>{let t=e.stack,s=t.pop(),n=t.pop(),i=new class{constructor(e){this.iterator=null
let t=new F(e)
this.artifacts=t}next(){let e=this.artifacts,t=(this.iterator=this.iterator||e.iterate()).next()
return null===t?null:e.append(t)}}(e.env.iterableFor(s,n.value()))
t.push(i),t.push(new class{constructor(e){this.tag=e.tag,this.artifacts=e}value(){return!this.artifacts.isEmpty()}}(i.artifacts))}),re.add(52,(e,{op1:t})=>{e.enterList(t)}),re.add(53,e=>{e.exitList()}),re.add(55,(e,{op1:t})=>{let s=e.stack.peek().next()
if(s){let t=e.iterate(s.memo,s.value)
e.enterItem(s.key,t)}else e.goto(t)})
class gt{constructor(e,t){this.element=e,this.nextSibling=t}}class bt{constructor(e,t,s){this.parentNode=e,this.first=t,this.last=s}parentElement(){return this.parentNode}firstNode(){return this.first}lastNode(){return this.last}}class yt{constructor(e,t){this.parentNode=e,this.node=t}parentElement(){return this.parentNode}firstNode(){return this.node}lastNode(){return this.node}}function vt(e,t){return new yt(e,t)}function kt(e,t){let s=e.parentElement(),n=e.firstNode(),i=e.lastNode(),r=n
for(;r;){let e=r.nextSibling
if(s.insertBefore(r,t),r===i)return e
r=e}return null}function wt(e){let t=e.parentElement(),s=e.firstNode(),n=e.lastNode(),i=s
for(;i;){let e=i.nextSibling
if(t.removeChild(i),i===n)return e
i=e}return null}const St="http://www.w3.org/2000/svg"
function Et(e,t,s){if(!e)return t
if(!function(e,t){let s=e.createElementNS(t,"svg")
try{s.insertAdjacentHTML("beforeend","<circle></circle>")}catch(e){}finally{return 1!==s.childNodes.length||s.firstChild.namespaceURI!==St}}(e,s))return t
let n=e.createElement("div")
return class extends t{insertHTMLBefore(e,t,i){return null===i||""===i?super.insertHTMLBefore(e,t,i):e.namespaceURI!==s?super.insertHTMLBefore(e,t,i):function(e,t,s,n){let i="<svg>"+s+"</svg>"
t.innerHTML=i
var r=function(e,t,s){let n=e.firstChild,i=null,r=n
for(;r;)i=r,r=r.nextSibling,t.insertBefore(i,s)
return[n,i]}(t.firstChild,e,n)
let a=r[0],o=r[1]
return new bt(e,a,o)}(e,n,i,t)}}}function Ct(e,t){return e&&function(e){let t=e.createElement("div")
if(t.innerHTML="first",t.insertAdjacentHTML("beforeend","second"),2===t.childNodes.length)return!1
return!0}(e)?class extends t{constructor(e){super(e),this.uselessComment=e.createComment("")}insertHTMLBefore(e,t,s){if(null===s)return super.insertHTMLBefore(e,t,s)
let n=!1,i=t?t.previousSibling:e.lastChild
i&&i instanceof Text&&(n=!0,e.insertBefore(this.uselessComment,t))
let r=super.insertHTMLBefore(e,t,s)
return n&&e.removeChild(this.uselessComment),r}}:t}const _t="http://www.w3.org/2000/svg",xt={foreignObject:1,desc:1,title:1},At=Object.create(null);["b","big","blockquote","body","br","center","code","dd","div","dl","dt","em","embed","h1","h2","h3","h4","h5","h6","head","hr","i","img","li","listing","main","meta","nobr","ol","p","pre","ruby","s","small","span","strong","strike","sub","sup","table","tt","u","ul","var"].forEach(e=>At[e]=1)
let Ot="undefined"==typeof document?null:document
class Nt{constructor(e){this.document=e,this.setupUselessElement()}setupUselessElement(){this.uselessElement=this.document.createElement("div")}createElement(e,t){let s,n
if(t?(s=t.namespaceURI===_t||"svg"===e,n=xt[t.tagName]):(s="svg"===e,n=!1),s&&!n){if(At[e])throw new Error(`Cannot create a ${e} inside an SVG context`)
return this.document.createElementNS(_t,e)}return this.document.createElement(e)}insertBefore(e,t,s){e.insertBefore(t,s)}insertHTMLBefore(e,t,s){return function(e,t,s,n){let i,r=t,a=s,o=a?a.previousSibling:r.lastChild
if(null===n||""===n)return new bt(r,null,null)
null===a?(r.insertAdjacentHTML("beforeend",n),i=r.lastChild):a instanceof HTMLElement?(a.insertAdjacentHTML("beforebegin",n),i=a.previousSibling):(r.insertBefore(e,a),e.insertAdjacentHTML("beforebegin",n),i=e.previousSibling,r.removeChild(e))
let l=o?o.nextSibling:r.firstChild
return new bt(r,l,i)}(this.uselessElement,e,t,s)}createTextNode(e){return this.document.createTextNode(e)}createComment(e){return this.document.createComment(e)}}var Tt;(function(e){class t extends Nt{createElementNS(e,t){return this.document.createElementNS(e,t)}setAttribute(e,t,s,n=null){n?e.setAttributeNS(n,t,s):e.setAttribute(t,s)}}e.TreeConstruction=t
let s=t
s=Ct(Ot,s),s=Et(Ot,s,_t),e.DOMTreeConstruction=s})(Tt||(Tt={}))
let Lt=class extends Nt{constructor(e){super(e),this.document=e,this.namespace=null}setAttribute(e,t,s){e.setAttribute(t,s)}removeAttribute(e,t){e.removeAttribute(t)}insertAfter(e,t,s){this.insertBefore(e,t,s.nextSibling)}}
Lt=Ct(Ot,Lt)
var Mt=Lt=Et(Ot,Lt,_t)
const Bt=Tt.DOMTreeConstruction,Dt=["javascript:","vbscript:"],Rt=["A","BODY","LINK","IMG","IFRAME","BASE","FORM"],It=["EMBED"],Pt=["href","src","background","action"],Ft=["src"]
function jt(e,t){return-1!==e.indexOf(t)}function Ht(e,t){return(null===e||jt(Rt,e))&&jt(Pt,t)}function zt(e,t){return null!==e&&(jt(It,e)&&jt(Ft,t))}function Vt(e,t){return Ht(e,t)||zt(e,t)}function Ut(e,t,s,n){let i=null
if(null===n||void 0===n)return n
if(ot(n))return n.toHTML()
i=t?t.tagName.toUpperCase():null
let r=rt(n)
if(Ht(i,s)){let t=e.protocolForURL(r)
if(jt(Dt,t))return`unsafe:${r}`}return zt(i,s)?`unsafe:${r}`:r}function $t(e,t){let s,n
if(t in e)n=t,s="prop"
else{let i=t.toLowerCase()
i in e?(s="prop",n=i):(s="attr",n=t)}return"prop"!==s||"style"!==n.toLowerCase()&&!function(e,t){let s=qt[e.toUpperCase()]
return s&&s[t.toLowerCase()]||!1}(e.tagName,n)||(s="attr"),{normalized:n,type:s}}const qt={INPUT:{form:!0,autocorrect:!0,list:!0},SELECT:{form:!0},OPTION:{form:!0},TEXTAREA:{form:!0},LABEL:{form:!0},FIELDSET:{form:!0},LEGEND:{form:!0},OBJECT:{form:!0}}
function Gt(e,t){let s=e.tagName
if(e.namespaceURI===_t)return Yt(s,t)
var n=$t(e,t)
let i=n.type,r=n.normalized
return"attr"===i?Yt(s,r):function(e,t){if(Vt(e,t))return Jt
if(function(e,t){return("INPUT"===e||"TEXTAREA"===e)&&"value"===t}(e,t))return Zt
if(function(e,t){return"OPTION"===e&&"selected"===t}(e,t))return es
return Xt}(s,r)}function Yt(e,t){return Vt(e,t)?Qt:Wt}class Kt{constructor(e){this.attribute=e}}class Wt extends Kt{set(e,t,s){let n=ts(t)
if(null!==n){var i=this.attribute
let t=i.name,s=i.namespace
e.__setAttribute(t,n,s)}}update(e,t){let s=ts(e)
var n=this.attribute
let i=n.element,r=n.name
null===s?i.removeAttribute(r):i.setAttribute(r,s)}}class Xt extends Kt{set(e,t,s){if(null!==t&&void 0!==t){let s=this.attribute.name
this.value=t,e.__setProperty(s,t)}}update(e,t){var s=this.attribute
let n=s.element,i=s.name
this.value!==e&&(n[i]=this.value=e,null!==e&&void 0!==e||this.removeAttribute())}removeAttribute(){var e=this.attribute
let t=e.element,s=e.name,n=e.namespace
n?t.removeAttributeNS(n,s):t.removeAttribute(s)}}class Jt extends Xt{set(e,t,s){var n=this.attribute
let i=Ut(s,n.element,n.name,t)
super.set(e,i,s)}update(e,t){var s=this.attribute
let n=Ut(t,s.element,s.name,e)
super.update(n,t)}}class Qt extends Wt{set(e,t,s){var n=this.attribute
let i=Ut(s,n.element,n.name,t)
super.set(e,i,s)}update(e,t){var s=this.attribute
let n=Ut(t,s.element,s.name,e)
super.update(n,t)}}class Zt extends Xt{set(e,t){e.__setProperty("value",rt(t))}update(e){let t=this.attribute.element,s=t.value,n=rt(e)
s!==n&&(t.value=n)}}class es extends Xt{set(e,t){null!==t&&void 0!==t&&!1!==t&&e.__setProperty("selected",!0)}update(e){let t=this.attribute.element
t.selected=!!e}}function ts(e){return!1===e||void 0===e||null===e||void 0===e.toString?null:!0===e?"":"function"==typeof e?null:String(e)}class ss{constructor(e,t,s,n){this.slots=e,this.callerScope=t,this.evalScope=s,this.partialMap=n}static root(e,t=0){let s=new Array(t+1)
for(let n=0;n<=t;n++)s[n]=pe
return new ss(s,null,null,null).init({self:e})}static sized(e=0){let t=new Array(e+1)
for(let s=0;s<=e;s++)t[s]=pe
return new ss(t,null,null,null)}init({self:e}){return this.slots[0]=e,this}getSelf(){return this.get(0)}getSymbol(e){return this.get(e)}getBlock(e){return this.get(e)}getEvalScope(){return this.evalScope}getPartialMap(){return this.partialMap}bind(e,t){this.set(e,t)}bindSelf(e){this.set(0,e)}bindSymbol(e,t){this.set(e,t)}bindBlock(e,t){this.set(e,t)}bindEvalScope(e){this.evalScope=e}bindPartialMap(e){this.partialMap=e}bindCallerScope(e){this.callerScope=e}getCallerScope(){return this.callerScope}child(){return new ss(this.slots.slice(),this.callerScope,this.evalScope,this.partialMap)}get(e){if(e>=this.slots.length)throw new RangeError(`BUG: cannot get $${e} from scope; length=${this.slots.length}`)
return this.slots[e]}set(e,t){if(e>=this.slots.length)throw new RangeError(`BUG: cannot get $${e} from scope; length=${this.slots.length}`)
this.slots[e]=t}}class ns{constructor(){this.scheduledInstallManagers=[],this.scheduledInstallModifiers=[],this.scheduledUpdateModifierManagers=[],this.scheduledUpdateModifiers=[],this.createdComponents=[],this.createdManagers=[],this.updatedComponents=[],this.updatedManagers=[],this.destructors=[]}didCreate(e,t){this.createdComponents.push(e),this.createdManagers.push(t)}didUpdate(e,t){this.updatedComponents.push(e),this.updatedManagers.push(t)}scheduleInstallModifier(e,t){this.scheduledInstallManagers.push(t),this.scheduledInstallModifiers.push(e)}scheduleUpdateModifier(e,t){this.scheduledUpdateModifierManagers.push(t),this.scheduledUpdateModifiers.push(e)}didDestroy(e){this.destructors.push(e)}commit(){let e=this.createdComponents,t=this.createdManagers
for(let h=0;h<e.length;h++){let s=e[h]
t[h].didCreate(s)}let s=this.updatedComponents,n=this.updatedManagers
for(let h=0;h<s.length;h++){let e=s[h]
n[h].didUpdate(e)}let i=this.destructors
for(let h=0;h<i.length;h++)i[h].destroy()
let r=this.scheduledInstallManagers,a=this.scheduledInstallModifiers
for(let h=0;h<r.length;h++){let e=r[h],t=a[h]
e.install(t)}let o=this.scheduledUpdateModifierManagers,l=this.scheduledUpdateModifiers
for(let h=0;h<o.length;h++){let e=o[h],t=l[h]
e.update(t)}}}class is{constructor({appendOperations:e,updateOperations:t}){this._transaction=null,this.appendOperations=e,this.updateOperations=t}toConditionalReference(e){return new ge(e)}getAppendOperations(){return this.appendOperations}getDOM(){return this.updateOperations}getIdentity(e){return function(e){return e._guid||a(e)}(e)+""}begin(){this._transaction=new ns}get transaction(){return this._transaction}didCreate(e,t){this.transaction.didCreate(e,t)}didUpdate(e,t){this.transaction.didUpdate(e,t)}scheduleInstallModifier(e,t){this.transaction.scheduleInstallModifier(e,t)}scheduleUpdateModifier(e,t){this.transaction.scheduleUpdateModifier(e,t)}didDestroy(e){this.transaction.didDestroy(e)}commit(){let e=this.transaction
this._transaction=null,e.commit()}attributeFor(e,t,s,n=null){return Gt(e,t)}}class rs{constructor(e,t,s,n,i=-1,r=-1){this.stack=e,this.heap=t,this.program=s,this.externs=n,this.pc=i,this.ra=r,this.currentOpSize=0}pushFrame(){this.stack.pushSmi(this.ra),this.stack.pushSmi(this.stack.fp),this.stack.fp=this.stack.sp-1}popFrame(){this.stack.sp=this.stack.fp-1,this.ra=this.stack.getSmi(0),this.stack.fp=this.stack.getSmi(1)}goto(e){let t=this.pc+e-this.currentOpSize
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
case 21:return this.returnTo(e.op1)}}evaluateSyscall(e,t){re.evaluate(t,e,e.type)}}class as{constructor(e){this.trusting=e}retry(e,t){let s=this.bounds,n=s.parentElement(),i=wt(s),r=ms.forInitialRender(e,{element:n,nextSibling:i})
return this.trusting?r.__appendTrustingDynamicContent(t):r.__appendCautiousDynamicContent(t)}}class os{constructor(e){this.inner=e,this.bounds=e.bounds}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}update(e,t){let s=this.inner=this.inner.update(e,t)
return this.bounds=s.bounds,this}}class ls extends as{constructor(e,t,s){super(s),this.bounds=e,this.lastValue=t}update(e,t){let s,n=this.lastValue
if(t===n)return this
if(lt(t)||ot(t))return this.retry(e,t)
if((s=at(t)?"":ct(t)?t:String(t))!==n){this.bounds.firstNode().nodeValue=this.lastValue=s}return this}}class hs extends as{constructor(e,t,s){super(s),this.bounds=e,this.lastValue=t}update(e,t){return t===this.lastValue?this:this.retry(e,t)}}class cs extends as{constructor(e,t,s){super(s),this.bounds=e,this.lastValue=t}update(e,t){let s=this.lastValue
return t===s?this:ot(t)&&t.toHTML()===s.toHTML()?(this.lastValue=t,this):this.retry(e,t)}}class us extends as{constructor(e,t,s){super(s),this.bounds=e,this.lastValue=t}update(e,t){let s=this.lastValue
return t===s?this:function(e){return at(e)?"":ct(e)?e:ot(e)?e.toHTML():lt(e)?e:String(e)}(t)===s?this:this.retry(e,t)}}class ps{constructor(e){this.node=e}firstNode(){return this.node}}class ds{constructor(e){this.node=e}lastNode(){return this.node}}class ms{constructor(e,t,s){this.constructing=null,this.operations=null,this.cursorStack=new l,this.blockStack=new l,this.pushElement(t,s),this.env=e,this.dom=e.getAppendOperations(),this.updateOperations=e.getDOM()}static forInitialRender(e,t){let s=new this(e,t.element,t.nextSibling)
return s.pushSimpleBlock(),s}static resume(e,t,s){let n=new this(e,t.parentElement(),s)
return n.pushSimpleBlock(),n.pushBlockTracker(t),n}get element(){return this.cursorStack.current.element}get nextSibling(){return this.cursorStack.current.nextSibling}expectConstructing(e){return this.constructing}block(){return this.blockStack.current}popElement(){this.cursorStack.pop(),this.cursorStack.current}pushSimpleBlock(){return this.pushBlockTracker(new fs(this.element))}pushUpdatableBlock(){return this.pushBlockTracker(new bs(this.element))}pushBlockList(e){return this.pushBlockTracker(new ys(this.element,e))}pushBlockTracker(e,t=!1){let s=this.blockStack.current
return null!==s&&(s.newDestroyable(e),t||s.didAppendBounds(e)),this.__openBlock(),this.blockStack.push(e),e}popBlock(){return this.block().finalize(this),this.__closeBlock(),this.blockStack.pop()}__openBlock(){}__closeBlock(){}openElement(e){let t=this.__openElement(e)
return this.constructing=t,t}__openElement(e){return this.dom.createElement(e,this.element)}flushElement(){let e=this.element,t=this.constructing
this.__flushElement(e,t),this.constructing=null,this.operations=null,this.pushElement(t,null),this.didOpenElement(t)}__flushElement(e,t){this.dom.insertBefore(e,t,this.nextSibling)}closeElement(){this.willCloseElement(),this.popElement()}pushRemoteElement(e,t,s=null){this.__pushRemoteElement(e,t,s)}__pushRemoteElement(e,t,s){this.pushElement(e,s)
let n=new gs(e)
this.pushBlockTracker(n,!0)}popRemoteElement(){this.popBlock(),this.popElement()}pushElement(e,t){this.cursorStack.push(new gt(e,t))}didAddDestroyable(e){this.block().newDestroyable(e)}didAppendBounds(e){return this.block().didAppendBounds(e),e}didAppendNode(e){return this.block().didAppendNode(e),e}didOpenElement(e){return this.block().openElement(e),e}willCloseElement(){this.block().closeElement()}appendText(e){return this.didAppendNode(this.__appendText(e))}__appendText(e){let t=this.dom,s=this.element,n=this.nextSibling,i=t.createTextNode(e)
return t.insertBefore(s,i,n),i}__appendNode(e){return this.dom.insertBefore(this.element,e,this.nextSibling),e}__appendFragment(e){let t=e.firstChild
if(t){let s=function(e,t,s){return new bt(e,t,s)}(this.element,t,e.lastChild)
return this.dom.insertBefore(this.element,e,this.nextSibling),s}return vt(this.element,this.__appendComment(""))}__appendHTML(e){return this.dom.insertHTMLBefore(this.element,this.nextSibling,e)}appendTrustingDynamicContent(e){let t=new os(this.__appendTrustingDynamicContent(e))
return this.didAppendBounds(t),t}__appendTrustingDynamicContent(e){if(ct(e))return this.trustedContent(e)
if(at(e))return this.trustedContent("")
if(ot(e))return this.trustedContent(e.toHTML())
if(ht(e)){let t=this.__appendFragment(e)
return new hs(t,e,!0)}if(lt(e)){let t=this.__appendNode(e)
return new hs(vt(this.element,t),t,!0)}return this.trustedContent(String(e))}appendCautiousDynamicContent(e){let t=new os(this.__appendCautiousDynamicContent(e))
return this.didAppendBounds(t.bounds),t}__appendCautiousDynamicContent(e){if(ct(e))return this.untrustedContent(e)
if(at(e))return this.untrustedContent("")
if(ht(e)){let t=this.__appendFragment(e)
return new hs(t,e,!1)}if(lt(e)){let t=this.__appendNode(e)
return new hs(vt(this.element,t),t,!1)}if(ot(e)){let t=e.toHTML(),s=this.__appendHTML(t)
return new cs(s,e,!1)}return this.untrustedContent(String(e))}trustedContent(e){let t=this.__appendHTML(e)
return new us(t,e,!0)}untrustedContent(e){let t=this.__appendText(e),s=vt(this.element,t)
return new ls(s,e,!1)}appendComment(e){return this.didAppendNode(this.__appendComment(e))}__appendComment(e){let t=this.dom,s=this.element,n=this.nextSibling,i=t.createComment(e)
return t.insertBefore(s,i,n),i}__setAttribute(e,t,s){this.dom.setAttribute(this.constructing,e,t,s)}__setProperty(e,t){this.constructing[e]=t}setStaticAttribute(e,t,s){this.__setAttribute(e,t,s)}setDynamicAttribute(e,t,s,n){let i=this.constructing,r=new(this.env.attributeFor(i,e,s,n))({element:i,name:e,namespace:n||null})
return r.set(this,t,this.env),r}}class fs{constructor(e){this.parent=e,this.first=null,this.last=null,this.destroyables=null,this.nesting=0}destroy(){let e=this.destroyables
if(e&&e.length)for(let t=0;t<e.length;t++)e[t].destroy()}parentElement(){return this.parent}firstNode(){return this.first&&this.first.firstNode()}lastNode(){return this.last&&this.last.lastNode()}openElement(e){this.didAppendNode(e),this.nesting++}closeElement(){this.nesting--}didAppendNode(e){0===this.nesting&&(this.first||(this.first=new ps(e)),this.last=new ds(e))}didAppendBounds(e){0===this.nesting&&(this.first||(this.first=e),this.last=e)}newDestroyable(e){this.destroyables=this.destroyables||[],this.destroyables.push(e)}finalize(e){this.first||e.appendComment("")}}class gs extends fs{destroy(){super.destroy(),wt(this)}}class bs extends fs{reset(e){let t=this.destroyables
if(t&&t.length)for(let n=0;n<t.length;n++)e.didDestroy(t[n])
let s=wt(this)
return this.first=null,this.last=null,this.destroyables=null,this.nesting=0,s}}class ys{constructor(e,t){this.parent=e,this.boundList=t,this.parent=e,this.boundList=t}destroy(){this.boundList.forEachNode(e=>e.destroy())}parentElement(){return this.parent}firstNode(){let e=this.boundList.head()
return e&&e.firstNode()}lastNode(){let e=this.boundList.tail()
return e&&e.lastNode()}openElement(e){}closeElement(){}didAppendNode(e){}didAppendBounds(e){}newDestroyable(e){}finalize(e){}}class vs{constructor(e=[]){this.vec=e}clone(){return new vs(this.vec.slice())}sliceFrom(e){return new vs(this.vec.slice(e))}slice(e,t){return new vs(this.vec.slice(e,t))}copy(e,t){this.vec[t]=this.vec[e]}writeRaw(e,t){this.vec[e]=t}writeSmi(e,t){var s
this.vec[e]=(s=t)<0?Math.abs(s)<<3|4:s<<3|0}getRaw(e){return this.vec[e]}getSmi(e){return function(e){switch(7&e){case 0:return e>>3
case 4:return-(e>>3)
default:throw new Error("unreachable")}}(this.vec[e])}reset(){this.vec.length=0}len(){return this.vec.length}}const ks=2147483648,ws=2147483647
class Ss{constructor(e=new vs,t=[]){this.inner=e,this.js=t}slice(e,t){let s
return s="number"==typeof e&&"number"==typeof t?this.inner.slice(e,t):"number"==typeof e&&void 0===t?this.inner.sliceFrom(e):this.inner.clone(),new Ss(s,this.js.slice(e,t))}sliceInner(e,t){let s=[]
for(let n=e;n<t;n++)s.push(this.get(n))
return s}copy(e,t){this.inner.copy(e,t)}write(e,t){if(function(e){let t=typeof e
if(null===e||void 0===e)return!0
switch(t){case"boolean":case"undefined":return!0
case"number":if(e%1!=0)return!1
let s=Math.abs(e)
return!(s&ks)
default:return!1}}(t))this.inner.writeRaw(e,Cs(t))
else{let s=this.js.length
this.js.push(t),this.inner.writeRaw(e,s|ks)}}writeSmi(e,t){this.inner.writeSmi(e,t)}writeImmediate(e,t){this.inner.writeRaw(e,t)}get(e){let s=this.inner.getRaw(e)
return s&ks?this.js[s&ws]:function(e){switch(e){case 3:return!1
case 11:return!0
case 19:return null
case 27:return
default:return function(e){switch(7&e){case 0:return e>>3
case 4:return-(e>>3)
default:throw t()}}(e)}}(s)}getSmi(e){return this.inner.getSmi(e)}reset(){this.inner.reset()}get length(){return this.inner.len()}}class Es{constructor(e,t,s){this.stack=e,this.fp=t,this.sp=s}static empty(){return new this(new Ss,0,-1)}static restore(e){let t=new Ss
for(let s=0;s<e.length;s++)t.write(s,e[s])
return new this(t,0,e.length-1)}push(e){this.stack.write(++this.sp,e)}pushSmi(e){this.stack.writeSmi(++this.sp,e)}pushImmediate(e){this.stack.writeImmediate(++this.sp,Cs(e))}pushEncodedImmediate(e){this.stack.writeImmediate(++this.sp,e)}pushNull(){this.stack.writeImmediate(++this.sp,19)}dup(e=this.sp){this.stack.copy(e,++this.sp)}copy(e,t){this.stack.copy(e,t)}pop(e=1){let t=this.stack.get(this.sp)
return this.sp-=e,t}popSmi(){return this.stack.getSmi(this.sp--)}peek(e=0){return this.stack.get(this.sp-e)}peekSmi(e=0){return this.stack.getSmi(this.sp-e)}get(e,t=this.fp){return this.stack.get(t+e)}getSmi(e,t=this.fp){return this.stack.getSmi(t+e)}set(e,t,s=this.fp){this.stack.write(s+t,e)}slice(e,t){return this.stack.slice(e,t)}sliceArray(e,t){return this.stack.sliceInner(e,t)}capture(e){let t=this.sp+1,s=t-e
return this.stack.sliceInner(s,t)}reset(){this.stack.reset()}toArray(){return this.stack.sliceInner(this.fp,this.sp+1)}}function Cs(e){switch(typeof e){case"number":return function(e){return e<0?Math.abs(e)<<3|4:e<<3|0}(e)
case"boolean":return e?11:3
case"object":return 19
case"undefined":return 27
default:throw t()}}class _s{constructor(e,t,{alwaysRevalidate:s=!1}){this.frameStack=new l,this.env=e,this.constants=t.constants,this.dom=e.getDOM(),this.alwaysRevalidate=s}execute(e,t){let s=this.frameStack
for(this.try(e,t);!s.isEmpty();){let e=this.frame.nextStatement()
null!==e?e.evaluate(this):this.frameStack.pop()}}get frame(){return this.frameStack.current}goto(e){this.frame.goto(e)}try(e,t){this.frameStack.push(new Ts(e,t))}throw(){this.frame.handleException(),this.frameStack.pop()}}class xs extends oe{constructor(e,t,s,n){super(),this.start=e,this.state=t,this.type="block",this.next=null,this.prev=null,this.children=n,this.bounds=s}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}evaluate(e){e.try(this.children,null)}destroy(){this.bounds.destroy()}didDestroy(){this.state.env.didDestroy(this.bounds)}}class As extends xs{constructor(e,t,s,n){super(e,t,s,n),this.type="try",this.tag=this._tag=M.create(v)}didInitializeChildren(){this._tag.inner.update(x(this.children))}evaluate(e){e.try(this.children,this)}handleException(){let e=this.state,t=this.bounds,s=this.children,n=this.start,i=this.prev,r=this.next
s.clear()
let a=ms.resume(e.env,t,t.reset(e.env)),o=Ms.resume(e,a),l=new c
o.execute(n,t=>{t.stack=Es.restore(e.stack),t.updatingOpcodeStack.push(l),t.updateWith(this),t.updatingOpcodeStack.push(s)}),this.prev=i,this.next=r}}class Os{constructor(e,t){this.opcode=e,this.marker=t,this.didInsert=!1,this.didDelete=!1,this.map=e.map,this.updating=e.children}insert(e,t,s,n){let i=this.map,r=this.opcode,a=this.updating,o=null,l=null
o=n?(l=i[n]).bounds.firstNode():this.marker
let h=r.vmForInsertion(o),u=null,p=r.start
h.execute(p,n=>{i[e]=u=n.iterate(s,t),n.updatingOpcodeStack.push(new c),n.updateWith(u),n.updatingOpcodeStack.push(u.children)}),a.insertBefore(u,l),this.didInsert=!0}retain(e,t,s){}move(e,t,s,n){let i=this.map,r=this.updating,a=i[e],o=i[n]||null
kt(a,n?o.firstNode():this.marker),r.remove(a),r.insertBefore(a,o)}delete(e){let t=this.map,s=t[e]
s.didDestroy(),wt(s),this.updating.remove(s),delete t[e],this.didDelete=!0}done(){this.opcode.didInitializeChildren(this.didInsert||this.didDelete)}}class Ns extends xs{constructor(e,t,s,n,i){super(e,t,s,n),this.type="list-block",this.map=o(),this.lastIterated=d,this.artifacts=i
let r=this._tag=M.create(v)
this.tag=A([i.tag,r])}didInitializeChildren(e=!0){this.lastIterated=this.artifacts.tag.value(),e&&this._tag.inner.update(x(this.children))}evaluate(e){let t=this.artifacts,s=this.lastIterated
if(!t.tag.validate(s)){let s=this.bounds,n=e.dom,i=n.createComment("")
n.insertAfter(s.parentElement(),i,s.lastNode())
let r=new Os(this,i)
new H({target:r,artifacts:t}).sync(),this.parentElement().removeChild(i)}super.evaluate(e)}vmForInsertion(e){let t=this.bounds,s=this.state,n=ms.forInitialRender(s.env,{element:t.parentElement(),nextSibling:e})
return Ms.resume(s,n)}}class Ts{constructor(e,t){this.ops=e,this.exceptionHandler=t,this.current=e.head()}goto(e){this.current=e}nextStatement(){let e=this.current,t=this.ops
return e&&(this.current=t.nextNode(e)),e}handleException(){this.exceptionHandler&&this.exceptionHandler.handleException()}}class Ls{constructor(e,t,s,n){this.env=e,this.program=t,this.updating=s,this.bounds=n}rerender({alwaysRevalidate:e=!1}={alwaysRevalidate:!1}){let t=this.env,s=this.program,n=this.updating
new _s(t,s,{alwaysRevalidate:e}).execute(n,this)}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}handleException(){throw"this should never happen"}destroy(){this.bounds.destroy(),wt(this.bounds)}}class Ms{constructor(e,t,s,n,i){this.program=e,this.env=t,this.elementStack=i,this.dynamicScopeStack=new l,this.scopeStack=new l,this.updatingOpcodeStack=new l,this.cacheGroups=new l,this.listBlockStack=new l,this.s0=null,this.s1=null,this.t0=null,this.t1=null,this.v0=null,this.env=t,this.heap=e.heap,this.constants=e.constants,this.elementStack=i,this.scopeStack.push(s),this.dynamicScopeStack.push(n),this.inner=new rs(Es.empty(),this.heap,e,{debugBefore:e=>re.debugBefore(this,e,e.type),debugAfter:(e,t)=>{re.debugAfter(this,e,e.type,t)}})}get stack(){return this.inner.stack}set stack(e){this.inner.stack=e}set currentOpSize(e){this.inner.currentOpSize=e}get currentOpSize(){return this.inner.currentOpSize}get pc(){return this.inner.pc}set pc(e){this.inner.pc=e}get ra(){return this.inner.ra}set ra(e){this.inner.ra=e}get fp(){return this.stack.fp}set fp(e){this.stack.fp=e}get sp(){return this.stack.sp}set sp(e){this.stack.sp=e}fetch(e){this.stack.push(this[le[e]])}load(e){this[le[e]]=this.stack.pop()}fetchValue(e){return this[le[e]]}loadValue(e,t){this[le[e]]=t}pushFrame(){this.inner.pushFrame()}popFrame(){this.inner.popFrame()}goto(e){this.inner.goto(e)}call(e){this.inner.call(e)}returnTo(e){this.inner.returnTo(e)}return(){this.inner.return()}static initial(e,t,s,n,i,r,a){let o=e.heap.scopesizeof(a),l=ss.root(s,o),h=new Ms(e,t,l,i,r)
return h.pc=h.heap.getaddr(a),h.updatingOpcodeStack.push(new c),h}static empty(e,t,s){let n={get:()=>pe,set:()=>pe,child:()=>n},i=new Ms(e,t,ss.root(pe,0),n,s)
return i.updatingOpcodeStack.push(new c),i}static resume({program:e,env:t,scope:s,dynamicScope:n},i){return new Ms(e,t,s,n,i)}capture(e){return{env:this.env,program:this.program,dynamicScope:this.dynamicScope(),scope:this.scope(),stack:this.stack.capture(e)}}beginCacheGroup(){this.cacheGroups.push(this.updating().tail())}commitCacheGroup(){let e=new st("END"),t=this.updating(),s=this.cacheGroups.pop(),n=s?t.nextNode(s):t.head(),i=t.tail(),r=x(new u(n,i)),a=new et(r,e)
t.insertBefore(a,n),t.append(new tt(a)),t.append(e)}enter(e){let t=new c,s=this.capture(e),n=this.elements().pushUpdatableBlock(),i=new As(this.heap.gethandle(this.pc),s,n,t)
this.didEnter(i)}iterate(e,t){let s=this.stack
s.push(t),s.push(e)
let n=this.capture(2),i=this.elements().pushUpdatableBlock()
return new As(this.heap.gethandle(this.pc),n,i,new c)}enterItem(e,t){this.listBlock().map[e]=t,this.didEnter(t)}enterList(e){let t=new c,s=this.capture(0),n=this.elements().pushBlockList(t),i=this.stack.peek().artifacts,r=this.pc+e-this.currentOpSize,a=this.heap.gethandle(r),o=new Ns(a,s,n,t,i)
this.listBlockStack.push(o),this.didEnter(o)}didEnter(e){this.updateWith(e),this.updatingOpcodeStack.push(e.children)}exit(){this.elements().popBlock(),this.updatingOpcodeStack.pop(),this.updating().tail().didInitializeChildren()}exitList(){this.exit(),this.listBlockStack.pop()}updateWith(e){this.updating().append(e)}listBlock(){return this.listBlockStack.current}updating(){return this.updatingOpcodeStack.current}elements(){return this.elementStack}scope(){return this.scopeStack.current}dynamicScope(){return this.dynamicScopeStack.current}pushChildScope(){this.scopeStack.push(this.scope().child())}pushDynamicScope(){let e=this.dynamicScope().child()
return this.dynamicScopeStack.push(e),e}pushRootScope(e,t){let s=ss.sized(e)
return t&&s.bindCallerScope(this.scope()),this.scopeStack.push(s),s}pushScope(e){this.scopeStack.push(e)}popScope(){this.scopeStack.pop()}popDynamicScope(){this.dynamicScopeStack.pop()}newDestroyable(e){this.elements().didAddDestroyable(e)}getSelf(){return this.scope().getSelf()}referenceForSymbol(e){return this.scope().getSymbol(e)}execute(e,t){let s
for(this.pc=this.heap.getaddr(e),t&&t(this);!(s=this.next()).done;);return s.value}next(){let e,t=this.env,s=this.program,n=this.updatingOpcodeStack,i=this.elementStack,r=this.inner.nextStatement()
return null!==r?(this.inner.evaluateOuter(r,this),e={done:!1,value:null}):(this.stack.reset(),e={done:!0,value:new Ls(t,s,n.pop(),i.popBlock())}),e}bindDynamicScope(e){let t=this.dynamicScope()
for(let s=e.length-1;s>=0;s--){let n=this.constants.getString(e[s])
t.set(n,this.stack.pop())}}}class Bs{constructor(e){this.vm=e}next(){return this.vm.next()}}let Ds=0
class Rs{constructor(e,t){this.options=e,this.parsedLayout=t,this.layout=null,this.partial=null
let s=t.block
this.symbols=s.symbols,this.hasEval=s.hasEval,this.statements=s.statements,this.referrer=t.referrer,this.id=t.id||`client-${Ds++}`}renderLayout(e){let t=e.env,s=e.self,n=e.dynamicScope
var i=e.args
let r=void 0===i?Ke:i,a=e.builder,o=this.asLayout().compile(),l=Ms.initial(this.options.program,t,s,r,n,a,o)
return new Bs(l)}asLayout(){return this.layout?this.layout:this.layout=Is(this.parsedLayout,this.options,!1)}asPartial(){return this.partial?this.partial:this.partial=Is(this.parsedLayout,this.options,!0)}}function Is(e,t,s){let n=e.block,r=e.referrer,a=n.hasEval,o=n.symbols,l=i({},t,{asPartial:s,referrer:r})
return new Be(n.statements,e,l,{referrer:r,hasEval:a,symbols:o})}class Ps{get(e){return Hs.create(this,e)}}class Fs extends Ps{constructor(){super(...arguments),this._lastRevision=null,this._lastValue=null}value(){let e=this.tag,t=this._lastRevision,s=this._lastValue
return t&&e.validate(t)||(s=this._lastValue=this.compute(),this._lastRevision=e.value()),s}}class js extends I{constructor(){super(...arguments),this.children=o()}get(e){let t=this.children[e]
return t||(t=this.children[e]=new zs(this.inner,e)),t}}class Hs extends Fs{static create(e,t){return w(e)?new zs(e.value(),t):new Vs(e,t)}get(e){return new Vs(this,e)}}class zs extends Hs{constructor(e,t){super(),this._parentValue=e,this._propertyKey=t,this.tag=W(e,t)}compute(){return this._parentValue[this._propertyKey]}}class Vs extends Hs{constructor(e,t){super()
let s=e.tag,n=M.create(v)
this._parentReference=e,this._parentObjectTag=n,this._propertyKey=t,this.tag=A([s,n])}compute(){let e=this._parentReference,t=this._parentObjectTag,s=this._propertyKey,n=e.value()
return t.inner.update(W(n,s)),"string"==typeof n&&"length"===s?n.length:"object"==typeof n&&n?n[s]:void 0}}class Us extends Ps{constructor(e){super(),this.tag=C.create(),this._value=e}value(){return this._value}update(e){e!==this._value&&(this.tag.inner.dirty(),this._value=e)}}class $s{constructor(e,t,s){let n=e.ComponentClass,i=e.name
this.args=t
let r={debugName:i,args:this.namedArgsSnapshot()}
ne(r,s),n&&(this.component=n.create(r))}get tag(){return this.args.tag}namedArgsSnapshot(){return Object.freeze(this.args.named.value())}}const qs=new js(null)
class Gs{static create(e){return new Gs(e)}constructor(e){this.env=e.env}prepareArgs(e,t){return null}getCapabilities(e){return e.capabilities}getLayout({name:e,handle:t,symbolTable:s},n){return t&&s?{handle:t,symbolTable:s}:n.compileTemplate(e,t)}create(e,t,s,n,i,r){if(t.ComponentClass){let e=se(this.env)
return new $s(t,s.capture(),e)}}getSelf(e){return e?new js(e.component):qs}didCreateElement(e,t){}didRenderLayout(e,t){e&&(e.component.bounds=new ie(t))}didCreate(e){e&&e.component.didInsertElement()}getTag(e){return e?e.tag:v}update(e,t){e&&(e.component.args=e.namedArgsSnapshot())}didUpdateLayout(){}didUpdate(e){e&&e.component.didUpdate()}getDestructor(e){return e?e.component:Ys}}const Ys={destroy(){}}
class Ks{constructor(e,t){this._registry=e,this._resolver=t}register(e,t,s){let n=this._toAbsoluteSpecifier(e)
this._registry.register(n,t,s)}registration(e){let t=this._toAbsoluteSpecifier(e)
return this._registry.registration(t)}unregister(e){let t=this._toAbsoluteSpecifier(e)
this._registry.unregister(t)}registerOption(e,t,s){let n=this._toAbsoluteOrTypeSpecifier(e)
this._registry.registerOption(n,t,s)}registeredOption(e,t){let s=this._toAbsoluteOrTypeSpecifier(e)
return this._registry.registeredOption(s,t)}registeredOptions(e){let t=this._toAbsoluteOrTypeSpecifier(e)
return this._registry.registeredOptions(t)}unregisterOption(e,t){let s=this._toAbsoluteOrTypeSpecifier(e)
this._registry.unregisterOption(s,t)}registerInjection(e,t,s){let n=this._toAbsoluteOrTypeSpecifier(e),i=this._toAbsoluteSpecifier(s)
this._registry.registerInjection(n,t,i)}registeredInjections(e){let t=this._toAbsoluteOrTypeSpecifier(e)
return this._registry.registeredInjections(t)}_toAbsoluteSpecifier(e,t){return this._resolver.identify(e,t)}_toAbsoluteOrTypeSpecifier(e){return function(e){return-1===e.indexOf(":")}(e)?e:this._toAbsoluteSpecifier(e)}}class Ws{constructor(e=null){this.bucket=e?i({},e):{}}get(e){return this.bucket[e]}set(e,t){return this.bucket[e]=t}child(){return new Ws(this.bucket)}}class Xs{constructor(e,t){this.position=0,this.array=e,this.keyFor=t}isEmpty(){return 0===this.array.length}next(){let e=this.position,t=this.array,s=this.keyFor
if(e>=t.length)return null
let n=t[e],i=s(n,e),r=e
return this.position++,{key:i,value:n,memo:r}}}class Js{constructor(e,t,s){this.position=0,this.keys=e,this.values=t,this.keyFor=s}isEmpty(){return 0===this.keys.length}next(){let e=this.position,t=this.keys,s=this.values,n=this.keyFor
if(e>=t.length)return null
let i=s[e],r=t[e],a=n(i,r)
return this.position++,{key:a,value:i,memo:r}}}const Qs=new class{isEmpty(){return!0}next(){throw new Error("Cannot call next() on an empty iterator")}}
class Zs{constructor(e,t){this.tag=e.tag,this.ref=e,this.keyFor=t}iterate(){let e=this.ref,t=this.keyFor,s=e.value()
if(Array.isArray(s))return s.length>0?new Xs(s,t):Qs
if(void 0===s||null===s)return Qs
if(void 0!==s.forEach){let e=[]
return s.forEach(function(t){e.push(t)}),e.length>0?new Xs(e,t):Qs}if("object"==typeof s){let e=Object.keys(s)
return e.length>0?new Js(e,e.map(e=>s[e]),t):Qs}throw new Error(`Don't know how to {{#each ${s}}}`)}valueReferenceFor(e){return new Us(e.value)}updateValueReference(e,t){e.update(t.value)}memoReferenceFor(e){return new Us(e.memo)}updateMemoReference(e,t){e.update(t.memo)}}class en extends is{static create(e={}){return e.document=e.document||self.document,e.appendOperations=e.appendOperations||new Bt(e.document),new en(e)}constructor(e){super({appendOperations:e.appendOperations,updateOperations:new Mt(e.document||document)}),ne(this,se(e)),this.uselessAnchor=e.document.createElement("a")}protocolForURL(e){return this.uselessAnchor.href=e,this.uselessAnchor.protocol}iterableFor(e,t){let s
if(!t)throw new Error("Must specify a key for #each")
switch(t){case"@index":s=((e,t)=>String(t))
break
case"@primitive":s=(e=>String(e))
break
default:s=(e=>e[t])}return new Zs(e,s)}}const tn="object"==typeof document?document:null
class sn{constructor(e){this._roots=[],this._rootsIndex=0,this._initializers=[],this._initialized=!1,this._rendering=!1,this._rendered=!1,this._scheduled=!1,this._notifiers=[],this.rootName=e.rootName,this.resolver=e.resolver,s(e.loader,"Must provide a Loader for preparing templates and other metadata required for a Glimmer Application."),s(e.renderer,"Must provide a Renderer to render the templates produced by the Loader."),s(e.builder,"Must provide a Builder that is responsible to building DOM."),this.document=e.document||tn,this.loader=e.loader,this.renderer=e.renderer,this.builder=e.builder}renderComponent(e,t,s=null){let n=this._roots,i=this._self
n.push({id:this._rootsIndex++,component:e,parent:t,nextSibling:s}),i&&(i.update({roots:n}),this.scheduleRerender())}async boot(){this.initialize(),this.env=this.lookup(`environment:/${this.rootName}/main/main`),await this._render()}scheduleRerender(){!this._scheduled&&this._rendered&&(this._rendering=!0,this._scheduled=!0,setTimeout(()=>{this._scheduled=!1,this._rerender(),this._rendering=!1},0))}initialize(){this.initRegistry(),this.initContainer()}registerInitializer(e){this._initializers.push(e)}initRegistry(){let e=this._registry=new ee,t=new Ks(this._registry,this.resolver)
e.register(`environment:/${this.rootName}/main/main`,en),e.registerOption("helper","instantiate",!1),e.registerOption("template","instantiate",!1),e.register(`document:/${this.rootName}/main/main`,this.document),e.registerOption("document","instantiate",!1),e.registerInjection("environment","document",`document:/${this.rootName}/main/main`),e.registerInjection("component-manager","env",`environment:/${this.rootName}/main/main`)
let s=this._initializers
for(let n=0;n<s.length;n++)s[n].initialize(t)
this._initialized=!0}initContainer(){this._container=new Z(this._registry,this.resolver),this._container.defaultInjections=(e=>{let t={}
return ne(t,this),t})}async _render(){let e=this.env,t=this._self=new Us({roots:this._roots}),s=new Ws,n=this.builder.getBuilder(e),i=await this.loader.getTemplateIterator(this,e,n,s,t)
try{e.begin(),await this.renderer.render(i),e.commit(),this._didRender()}catch(e){throw this._didError(e),e}}async _rerender(){let e=this.env
try{e.begin(),await this.renderer.rerender(),e.commit(),this._didRender()}catch(e){throw this._didError(e),e}}_didRender(){this._rendered=!0
let e=this._notifiers
this._notifiers=[],e.forEach(e=>e[0]())}_didError(e){let t=this._notifiers
this._notifiers=[],t.forEach(t=>t[1](e))}identify(e,t){return this.resolver.identify(e,t)}factoryFor(e,t){return this._container.factoryFor(this.identify(e,t))}lookup(e,t){return this._container.lookup(this.identify(e,t))}}class nn{constructor(){this.byName=o(),this.byHandle=o()}hasName(e){return e in this.byName}getHandle(e){return this.byName[e]}hasHandle(e){return e in this.byHandle}getByHandle(e){return this.byHandle[e]}register(e,t,s){this.byHandle[e]=s,this.byName[t]=e}}class rn{constructor(e,t){this.helper=e,this.tag=t.tag,this.args=t.capture()}value(){let e=this.helper,t=this.args
return e(t.positional.value(),t.named.value())}get(){return new js(this)}}class an{constructor(e){this.owner=e,this.handleLookup=[],this.cache={component:new nn,template:new nn,compiledTemplate:new nn,helper:new nn,manager:new nn,modifier:new nn}}setCompileOptions(e){this.templateOptions=e}lookup(e,t,s){return this.cache[e].hasName(t)?this.cache[e].getHandle(t):null}register(e,t,s){let n=this.cache[e],i=this.handleLookup.length
return this.handleLookup.push(n),this.cache[e].register(i,t,s),i}lookupModifier(e,t){let s=this.lookup("modifier",e)
if(null===s)throw new Error(`Modifier for ${e} not found.`)
return s}compileTemplate(e,t){if(!this.cache.compiledTemplate.hasName(e)){let s=this.resolve(t),n=s.block,i=s.meta,r=s.id,a=JSON.parse(n),o=new Rs(this.templateOptions,{id:r,block:a,referrer:i}).asLayout(),l={handle:o.compile(),symbolTable:o.symbolTable}
return this.register("compiledTemplate",e,l),l}let s=this.lookup("compiledTemplate",e)
return this.resolve(s)}registerHelper(e,t){return this.register("helper",e,(e,s)=>new rn(t,s))}registerInternalHelper(e,t){this.register("helper",e,t)}registerComponent(e,t,s,n){let i=this.registerTemplate(t,n),r=this.managerFor(i.meta.managerId),a=new Q(e,r,s,i.handle)
return this.register("component",e,a)}lookupComponentHandle(e,t){return this.cache.component.hasName(e)||this.lookupComponent(e,t),this.lookup("component",e,t)}managerFor(e="main"){let t
if(this.cache.manager.hasName(e)){let t=this.cache.manager.getHandle(e)
return this.cache.manager.getByHandle(t)}{let s=this.owner.rootName
if(!(t=this.owner.lookup(`component-manager:/${s}/component-managers/${e}`)))throw new Error(`No component manager found for ID ${e}.`)
return this.register("manager",e,t),t}}registerTemplate(e,t){return{name:e,handle:this.register("template",e,t),meta:t.meta}}lookupComponent(e,t){let s
if(this.cache.component.hasName(e))s=this.lookup("component",e,t)
else{let n=function(e,t){if(null===e||void 0===e)throw new Error(t)
return e}(this.identifyComponent(e,t),`Could not find the component '${e}'`),i=this.owner.lookup("template",n),r=this.owner.identify("component",n),a=null
void 0!==r&&(a=this.owner.factoryFor(r)),s=this.registerComponent(e,n,a,i)}return this.resolve(s)}lookupHelper(e,t){if(!this.cache.helper.hasName(e)){let s=this.owner,n=`helper:${e}`,i=t.specifier,r=s.identify(n,i)
if(void 0===r)return null
let a=this.owner.lookup(r,t.specifier)
return this.registerHelper(e,a)}return this.lookup("helper",e,t)}lookupPartial(e,t){throw new Error("Partials are not available in Glimmer applications.")}resolve(e){return this.handleLookup[e].getByHandle(e)}identifyComponent(e,t){let s=this.owner,n=`template:${e}`,i=t.specifier,r=s.identify(n,i)
if(void 0===r&&s.identify(`component:${e}`,i))throw new Error(`The component '${e}' is missing a template. All components must have a template. Make sure there is a template.hbs in the component directory.`)
return r}}const on={},ln=0,hn=Object.freeze([])
class cn{constructor(){this.strings=[],this.arrays=[hn],this.tables=[],this.handles=[],this.resolved=[],this.floats=[],this.negatives=[]}float(e){let t=this.floats.indexOf(e)
return t>-1?t:this.floats.push(e)-1}negative(e){return this.negatives.push(e)-1}string(e){let t=this.strings.indexOf(e)
return t>-1?t:this.strings.push(e)-1}stringArray(e){let t=new Array(e.length)
for(let s=0;s<e.length;s++)t[s]=this.string(e[s])
return this.array(t)}array(e){if(0===e.length)return ln
let t=this.arrays.indexOf(e)
return t>-1?t:this.arrays.push(e)-1}handle(e){let t=this.handles.indexOf(e)
return t>-1?t:(this.resolved.push(on),this.handles.push(e)-1)}serializable(e){let t=JSON.stringify(e),s=this.strings.indexOf(t)
return s>-1?s:this.strings.push(t)-1}toPool(){return{strings:this.strings,arrays:this.arrays,handles:this.handles,floats:this.floats,negatives:this.negatives}}}class un extends cn{constructor(e,t){super(),this.resolver=e,t&&(this.strings=t.strings,this.arrays=t.arrays,this.handles=t.handles,this.floats=t.floats,this.negatives=t.negatives,this.resolved=this.handles.map(()=>on))}getFloat(e){return this.floats[e]}getNegative(e){return this.negatives[e]}getString(e){return this.strings[e]}getStringArray(e){let t=this.getArray(e),s=new Array(t.length)
for(let n=0;n<t.length;n++){let e=t[n]
s[n]=this.getString(e)}return s}getArray(e){return this.arrays[e]}resolveHandle(e){let t=this.resolved[e]
if(t===on){let s=this.handles[e]
t=this.resolved[e]=this.resolver.resolve(s)}return t}getSerializable(e){return JSON.parse(this.strings[e])}}class pn extends un{constructor(){super(...arguments),this.others=[],this.serializables=[]}serializable(e){let t=this.serializables.indexOf(e)
return t>-1?t:this.serializables.push(e)-1}getSerializable(e){return this.serializables[e]}getOther(e){return this.others[e-1]}other(e){return this.others.push(e)}}class dn{constructor(e){this.heap=e,this.offset=0}get size(){return 1+((768&this.heap.getbyaddr(this.offset))>>8)}get isMachine(){return 1024&this.heap.getbyaddr(this.offset)}get type(){return 255&this.heap.getbyaddr(this.offset)}get op1(){return this.heap.getbyaddr(this.offset+1)}get op2(){return this.heap.getbyaddr(this.offset+2)}get op3(){return this.heap.getbyaddr(this.offset+3)}}function mn(e,t,s){return e|t<<16|s<<30}function fn(e,t){return e|t<<30}class gn{constructor(e){if(this.placeholders=[],this.offset=0,this.handle=0,e){let t=e.buffer,s=e.table,n=e.handle
this.heap=new Uint16Array(t),this.table=s,this.offset=this.heap.length,this.handle=n}else this.heap=new Uint16Array(1048576),this.table=[]}push(e){this.heap[this.offset++]=e}getbyaddr(e){return this.heap[e]}setbyaddr(e,t){this.heap[e]=t}malloc(){this.table.push(this.offset,0)
let e=this.handle
return this.handle+=2,e}finishMalloc(e,t){let s=this.table[e],n=mn(this.offset-s,t,0)
this.table[e+1]=n}size(){return this.offset}getaddr(e){return this.table[e]}gethandle(e){this.table.push(e,mn(0,0,3))
let t=this.handle
return this.handle+=2,t}sizeof(e){return-1}scopesizeof(e){return(1073676288&this.table[e+1])>>16}free(e){let t=this.table[e+1]
this.table[e+1]=fn(t,1)}compact(){let e=0,t=this.table,s=this.table.length,n=this.heap
for(let i=0;i<s;i+=2){let s=t[i],r=t[i+1],a=65535&r,o=-1&r
if(2!==o)if(1===o)t[i+1]=fn(r,2),e+=a
else if(0===o){for(let t=s;t<=i+a;t++)n[t-e]=n[t]
t[i]=s-e}else 3===o&&(t[i]=s-e)}this.offset=this.offset-e}pushPlaceholder(e){let t=this.offset++
this.heap[t]=65535,this.placeholders.push([t,e])}patchPlaceholders(){let e=this.placeholders
for(let s=0;s<e.length;s++){var t=e[s]
let n=t[0],i=t[1]
this.setbyaddr(n,i())}}capture(){this.patchPlaceholders()
let e=function(e,t,s){if(e instanceof Uint16Array){if(void 0!==e.slice)return e.slice(t,s).buffer
let n=new Uint16Array(s)
for(;t<s;t++)n[t]=e[t]
return n.buffer}return null}(this.heap,0,this.offset)
return{handle:this.handle,table:this.table,buffer:e}}}class bn{constructor(e=new cn,t=new gn){this.constants=e,this.heap=t,this._opcode=new dn(this.heap)}opcode(e){return this._opcode.offset=e,this._opcode}}class yn extends bn{}var vn={id:"j7SGa6Pm",block:'{"symbols":["root"],"statements":[[4,"each",[[22,["roots"]]],[["key"],["id"]],{"statements":[[4,"in-element",[[21,1,["parent"]]],[["guid","nextSibling"],["%cursor:0%",[21,1,["nextSibling"]]]],{"statements":[[1,[26,"component",[[21,1,["component"]]],null],false]],"parameters":[]},null]],"parameters":[1]},null]],"hasEval":false}',meta:{specifier:"template:/-application/application/src/templates/main"}}
function kn(e,t){let s=e.getSelf(),n=t.capture(),i=n.positional.at(0).value()
return"function"!=typeof i&&function(e,t){let s=function(e){let t,s,n=""
if(null===e||void 0===e)return n
"parent"in e&&"property"in e?(t=e.parent.value(),s=e.property):"_parentValue"in e&&"_propertyKey"in e&&(t=e._parentValue,s=e._propertyKey)
void 0!==s&&(n+=`('${s}' on ${function(e){let t=typeof e
if(null===e||void 0===e)return t
if("number"===t||"boolean"===t)return e.toString()
if(e.debugName)return e.debugName
try{return JSON.stringify(e)}catch(e){}return e.toString()}(t)}) `)
return n}(t)
throw new Error(`You tried to create an action with the {{action}} helper, but the first argument ${s}was ${typeof e} instead of a function.`)}(i,n.positional.at(0)),new Us(function(...e){let t=n.positional.value()
t.shift(),t.push(...e),i.apply(s&&s.value(),t)})}function wn(e){return e[0]?e[1]:e[2]}class Sn{constructor(e){this.resolver=e}getComponentDefinition(e){let t=this.resolver.resolve(e)
return s(!!t,`Couldn't find a template for ${e}`),t}getCapabilities(e){let t=this.getComponentDefinition(e),s=t.manager,n=t.state
return s.getCapabilities(n)}getLayout(e){let t=this.getComponentDefinition(e),s=t.manager.getLayout(t,this.resolver)
return{compile:()=>s.handle,symbolTable:s.symbolTable}}lookupHelper(e,t){return this.resolver.lookupHelper(e,t)}lookupModifier(e,t){return this.resolver.lookupModifier(e,t)}lookupComponentDefinition(e,t){return this.resolver.lookupComponentHandle(e,t)}lookupPartial(e,t){return this.resolver.lookupPartial(e,t)}}class En{constructor(e){this.resolver=e}async getTemplateIterator(e,t,s,n,r){let a=new an(e),o={program:new yn(new pn(a)),macros:new Ne,resolver:new Sn(a),Builder:je}
a.setCompileOptions(o),a.registerTemplate("main",vn),a.registerInternalHelper("action",kn),a.registerHelper("if",wn)
let l=function({id:e,meta:t,block:s}){let n,r=e||`client-${Ds++}`
return{id:r,meta:t,create:(e,a)=>{let o=a?i({},a,t):t
return n||(n=JSON.parse(s)),new Rs(e,{id:r,block:n,referrer:o})}}}(vn).create(o)
return Promise.resolve(l.renderLayout({env:t,builder:s,dynamicScope:n,self:r}))}}class Cn{constructor({element:e,nextSibling:t=null}){this.cursor={element:e,nextSibling:t}}getBuilder(e){return function(e,t){return ms.forInitialRender(e,t)}(e,this.cursor)}}class _n{render(e){let t
do{t=e.next()}while(!t.done)
this.result=t.value}rerender(){if(!this.result)throw new Error("Cannot re-render before initial render has completed")
this.result.rerender()}}function xn(e){return void 0!==e.rootName&&void 0!==e.collection&&void 0!==e.name&&void 0!==e.type}function An(e){let t=e.type,s=function(e){let t=[]
e.rootName&&t.push(e.rootName)
e.collection&&t.push(e.collection)
e.namespace&&t.push(e.namespace)
e.name&&t.push(e.name)
if(t.length>0){let s=t.join("/")
return xn(e)&&(s="/"+s),s}}(e)
return s?t+":"+s:t}function On(e){let t={}
if(e.indexOf(":")>-1){var s=e.split(":")
let n,i=s[0],r=s[1]
t.type=i,0===r.indexOf("/")?(n=r.substr(1).split("/"),t.rootName=n.shift(),t.collection=n.shift()):n=r.split("/"),n.length>0&&(t.name=n.pop(),n.length>0&&(t.namespace=n.join("/")))}else t.type=e
return t}function Nn(e,t){if(!t)throw new Error("Assertion Failed: "+e)}class Tn{constructor(e,t){this.config=e,this.registry=t}identify(e,t){if(function(e){var t=e.split(":")
let s=t[0],n=t[1]
return!!(s&&n&&0===n.indexOf("/")&&n.split("/").length>3)}(e))return e
let s,n=On(e)
if(t){let e=On(t)
if(xn(e)){Nn("Specifier must not include a rootName, collection, or namespace when combined with an absolute referrer",void 0===n.rootName&&void 0===n.collection&&void 0===n.namespace),n.rootName=e.rootName,n.collection=e.collection
let t=this._definitiveCollection(n.type)
if(!n.name)return n.namespace=e.namespace,n.name=e.name,this._serializeAndVerify(n)
if(n.namespace=e.namespace?e.namespace+"/"+e.name:e.name,function(e){let t=e.namespace,s=e.collection,n=t.lastIndexOf("/-")
if(n>-1){n+=2
let e=t.indexOf("/",n)
s=t.slice(n,e>-1?e:void 0)}return s}(n)===t&&(s=this._serializeAndVerify(n)))return s
if(t&&(n.namespace+="/-"+t,s=this._serializeAndVerify(n)))return s
n.rootName=n.collection=n.namespace=void 0}else Nn('Referrer must either be "absolute" or include a `type` to determine the associated type',e.type),n.collection=this._definitiveCollection(e.type),n.namespace||(n.namespace=e.rootName),Nn(`'${e.type}' does not have a definitive collection`,n.collection)}if(n.collection||(n.collection=this._definitiveCollection(n.type),Nn(`'${n.type}' does not have a definitive collection`,n.collection)),!n.rootName){if(n.rootName=this.config.app.rootName||"app",s=this._serializeAndVerify(n))return s
n.namespace?(n.rootName=n.namespace,n.namespace=void 0):(n.rootName=n.name,n.name="main")}return(s=this._serializeAndVerify(n))?s:void 0}retrieve(e){return this.registry.get(e)}resolve(e,t){let s=this.identify(e,t)
if(s)return this.retrieve(s)}_definitiveCollection(e){let t=this.config.types[e]
return Nn(`'${e}' is not a recognized type`,t),t.definitiveCollection}_serializeAndVerify(e){let t=An(e)
if(this.registry.has(t))return t}}class Ln{constructor(e={}){this._entries=e}has(e){return e in this._entries}get(e){return this._entries[e]}}function Mn(e){return e.replace(/  /g,"  ").replace(/^ /," ").replace(/ $/," ")}function Bn(e=""){return e.charAt(0).toUpperCase()+e.slice(1)}const Dn=Date.now||(()=>(new Date).getTime())
var Rn=function(e,t,s,n){var i,r=arguments.length,a=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,s,n)
else for(var o=e.length-1;o>=0;o--)(i=e[o])&&(a=(r<3?i(a):r>3?i(t,s,a):i(t,s))||a)
return r>3&&a&&Object.defineProperty(t,s,a),a}
class In extends X{constructor(){super(...arguments),this.setFocussed=function(e,t,{leading:s=!0,trailing:n=!0}={}){let i,r,a,o,l=0
function h(){l=s?Dn():0,i=null,o=e.apply(r,a),i||(r=a=null)}function c(){const c=Dn()
l||s||(l=c)
const u=t-(c-l)
return r=this,a=arguments,u<=0||u>t?(i&&(clearTimeout(i),i=null),l=c,o=e.apply(r,a),i||(r=a=null)):!i&&n&&(i=setTimeout(h,u)),o}return c.cancel=(()=>{clearTimeout(i),l=0,i=r=a=null}),c}(()=>{var e=this.args
const t=e.token,s=e.selectionOffset,n=e.selectionLength
this.focussed=void 0!==typeof s&&t.offset+t.length>=s&&t.offset<=s+n},1e3/60)}get content(){return Mn(this.args.token.content)}didUpdate(){this.setFocussed()}}Rn([z],In.prototype,"focussed",void 0),Rn([z("args")],In.prototype,"content",null)
class Pn{constructor({type:e="",tag:t="",content:s="",markup:n=""}={}){this.baseChildren=[],this.tag="",this.type="",this.content="",this.absorbed=!1,this.leadingMarkup=[],this.trailingMarkup=[],this.tag=t,this.type=e.replace(/_open/,""),this.componentName="whitespace"===this.type?"Text":function(e=""){return e.split(/[_-]/).map(Bn).join("")}(this.type),n&&!this.type.match(/_list$/)&&this.setMarkupTokens(n),s&&(this.content=s)}get hasClosingMarkup(){return void 0!==this.trailingMarkup}get prevSibling(){const e=this.parent.children
return e[e.indexOf(this)-1]}get nextSibling(){const e=this.parent.children
return e[e.indexOf(this)+1]}get firstChild(){return this.children[0]}get lastChild(){return this.children[this.children.length-1]}get ancestors(){let e=[],t=this
for(;t.parent&&"container"!==t.parent.type;)e.push(t.parent),t=t.parent
return e}get children(){this.type
const e=this.leadingMarkup,t=this.baseChildren,s=this.trailingMarkup
return[...e,...t,...s]}get offset(){return this.parent?this.prevSibling?this.prevSibling.tail:this.parent.offset:0}get tail(){return this.offset+this.length}get length(){if(this.absorbed)return 0
const e=this.children
this.parent
return this.content.length+e.reduce((e,t)=>e+t.length,0)}didAddToParent(){this.absorbParentMarkup(),this.removePreviousWhiteSpace()}addChild(e,t=null){const s=this.baseChildren,n=new Pn(e)
return n.parent=this,t?s.splice(t,0,n):s.push(n),n.didAddToParent(),n}addAdditionalMarkup(e){const t=this.parent,s=this.prevSibling,n=this.type,i=this.offset,r=t.baseChildren
"text"===n&&s&&t.leadingMarkup.forEach(s=>{const n=s.absorbedFrom
if(n&&"blockquote"===n.parent.type){const s=e.slice(i).match(/^>\s*/)
if(s){const e=t.markupToken(s[0],{absorbedFrom:n})
r.splice(r.indexOf(this),0,e)}}})}remove(){const e=this.parent,t=e.baseChildren,s=e.leadingMarkup,n=e.trailingMarkup
let i=t.indexOf(this)
if(i>=0)return void t.splice(i,1)
let r=s.indexOf(this)
if(r>=0)return void s.splice(r,1)
let a=n.indexOf(this)
a>=0&&n.splice(a,1)}optimizeChildren(){this.children.forEach(e=>e.optimizeChildren()),this.children.forEach(e=>e.optimize())}markupToken(e,{absorbedFrom:t=null}={}){const s=new Pn({content:e,type:"markup"})
return s.parent=this,t&&(s.absorbedFrom=t),s}setMarkupTokens(e){switch(this.type){case"heading":case"blockquote":case"list_item":this.leadingMarkup.push(this.markupToken(e))
break
case"strong":case"em":case"code_inline":this.leadingMarkup.push(this.markupToken(e)),this.trailingMarkup.push(this.markupToken(e))}}removePreviousWhiteSpace(){const e=this.type,t=this.prevSibling
"text"===e&&t&&"whitespace"===t.type&&t.remove()}absorbParentMarkup(){const e=["paragraph","heading",...["list_item","blockquote"]],t=this.parent,s=this.type
if(e.indexOf(s)<0)return
const n=t.type.match(/_list/)?t.parent:t
e.indexOf(n.type)>=0&&this.absorbMarkupFrom(n.leadingMarkup)}absorbMarkupFrom(e){this.type,this.leadingMarkup
e.forEach(e=>e.absorbed=!0)
const t=e.map(e=>this.markupToken(e.content,{absorbedFrom:e.absorbedFrom||e}))
this.leadingMarkup.unshift(...t)}optimize(){this.pushUpTrailingWhitespace(),this.concatText()}pushUpTrailingWhitespace(){const e=this.parent,t=this.type,s=this.content
if("whitespace"!==t||this!==e.lastChild||"container"===e.type)return
const n=e.parent
if("container"!==n.type&&e!==n.lastChild)return
const i="container"===n.type?n.baseChildren.indexOf(e)+1:null
n.addChild({type:t,content:s},i),this.remove()}concatText(){const e=this.type,t=this.prevSibling
t&&e.match(/text|whitespace/)&&"text"===t.type&&(t.content+=this.content,this.remove())}}const Fn=" \t\r ​"
function jn(e,t,s=new Pn({type:"container"})){t=t.replace(/&nbsp;/g," ")
for(let n of e){const e=n.type,i=n.nesting
e.match(/_open$/)?s=Hn(n,t,s):e.match(/_close$/)?s=zn(n,t,s):"inline"===e?Vn(n,t,s):e.match(/break$/)?Un(n,t,s):0===i&&"text"!==e?$n(n,t,s):qn(n,t,s)}return"container"===s.type&&s.optimizeChildren(),s.children}function Hn(e,t,s){var n=e=Gn(e,t,s)
const i=n.tag,r=n.type,a=n.markup
return s.addChild({tag:i,type:r,markup:a})}function zn(e,t,s){return Yn(e,t,s.parent),s.parent}function Vn(e,t,s){jn(e.children,t,s)}function Un(e,t,s){return e.content="\n",qn(e,t,s)}function $n(e,t,s){const n=qn(e,t,s)
n.addChild({type:"text",content:n.content}),n.content="",Yn(e,t,s)}function qn(e,t,s){var n=e=Gn(e,t,s)
let i=n.type,r=n.markup,a=n.content
if(a.length){const e=s.addChild({type:i,markup:r,content:a})
return e.addAdditionalMarkup(t),e}}function Gn(e,t,s){const n="text"===e.type?"content":"markup",i=e[n]
if(i.length){const r=s.lastChild,a=s.offset
t=t.slice(r?r.tail:a)
const o=`^([${Fn}]*)${function(e){if(!e.replace)return e
return e.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")}(i)}([${Fn}]*)`,l=t.match(new RegExp(o))
l&&(e[n]=l[1]+i+(l[2]||""))}return e}function Yn(e,t,s){const n=s.lastChild,i=s.offset
t=t.slice(n?n.tail:i)
const r=new RegExp(`^([${Fn}]*)(\n*)`),a=t.match(r)
a&&a.slice(1).forEach(e=>{e.length&&"​"!==e&&s.addChild({content:e.replace(/ /g," "),type:"whitespace"})})}const Kn="  ​",Wn=new e
class Xn{constructor(e){this.component=e}get markdown(){return this.component.markdown}set markdown(e){const t=new RegExp(`([^\\s][${Kn}]+)[${Kn}]`,"g")
this.component.markdown=e.replace(t,"$1").replace(/^(\s*\n)+/,"").replace(/\n\n\n/g,"\n\n")}get modifiedMarkdown(){return this.markdown.replace("\t","&nbsp;&nbsp;").replace(new RegExp(`([^#>\\-\\.])([${Kn}]+)\n`),e=>e[0]+new Array(e[1].length+1).join("&nbsp;")+"\n").replace(/\u00A0/,"&nbsp;").replace(/(\s)$/,"$1​")}parseTokens(){const e=this.modifiedMarkdown,t=Wn.parse(e)
this.tokens=jn(t,e.replace("​",""))}stringAt(e,t=1){return this.markdown.slice(e,e+t)}spliceString(e,t,s=""){const n=this.markdown
return this.markdown=n.slice(0,e)+s+n.slice(e+t),this.parseTokens(),this.markdown.length-n.length}topLevelTokenAt(e){return this.tokens.find(({offset:t,length:s})=>e>=t&&e<t+s)}}class Jn{constructor(){this.boundHandlers={}}setupListeners(e,t){for(let s of e)this.setupListener(s,t)}setupListener(e,t){const s=this[`on${Bn(e)}`]
s&&(this.boundHandlers[e]=s.bind(this),t.addEventListener(e,this.boundHandlers[e]))}}class Qn extends Jn{constructor(e){super(),this.EVENTS=["keydown","keypress","paste"],this.component=e}get selection(){return this.component.selectionController}get dom(){return this.component.domController}get history(){return this.component.historyController}editorInitialized(e){this.setupListeners(this.EVENTS,e)}onKeydown(e){const t=e.key,s=e.keyCode
var n=this.selection
let i=n.offset,r=n.length
"Backspace"===t||8===s?(e.preventDefault(),r||(r=1,i-=1),this.deleteString(i,r)):"Delete"===t||46===s?(e.preventDefault(),r||(r=1),this.deleteString(i,r)):Zn(e)&&"z"===t&&90===s&&(e.preventDefault(),this.history[e.shiftKey?"redo":"undo"]())}onKeypress(e){if(e.preventDefault(),Zn(e))return
var t=this.selection
let s=t.offset,n=t.length,i=function({key:e,keyCode:t}){if(e&&e.codePointAt(0)===t)return e}(e)
i?this.insertString(s,n,i):"Enter"!==e.key&&13!==e.keyCode||this.insertReturn(s,n,{isSoft:e.shiftKey})}onPaste(e){e.preventDefault()
const t=(e.clipboardData||window.clipboardData).getData("Text")
var s=this.selection
const n=s.offset,i=s.length
this.insertString(n,i,t),this.history.newEntry()}insertString(e,t,s){this.history.entry(e,t,s,this.dom.stringAt(e,t))
const n=this.dom.spliceString(e,t,s);(t||n>0)&&this.selection.queueSelect(e+s.length)}insertReturn(e,t,{isSoft:s}){if(0===e)return
const n=this.dom.stringAt(e),i=this.dom.stringAt(e-1),r=this.dom.topLevelTokenAt(e-1),a="\n"===n||"\n"===i
let o="\n"
if(r&&r.type.match(/paragraph|blockquote|_list/))if(a||s){if(a&&s)return}else o+="\n"
else if(a)return
this.history.entry(e,t,o,this.dom.stringAt(e,t))
const l=this.dom.spliceString(e,t,o);(t||l>0)&&this.selection.queueSelect(e+o.length)}deleteString(e,t){const s=this.dom.stringAt(e-1,2),n=this.dom.stringAt(e+t-1,2)
"\n\n"===s&&(e-=1,t+=1),"\n\n"===n&&(t+=1),this.history.entry(e,t,"",this.dom.stringAt(e,t)),this.dom.spliceString(e,t)===-t&&this.selection.queueSelect(e)}}function Zn({metaKey:e,ctrlKey:t}){return/Mac|^iP/.test(navigator.platform)?e:t}class ei{constructor(e){this.history=[],this.future=[],this.component=e}get selection(){return this.component.selectionController}get dom(){return this.component.domController}get lastHistoryEntry(){return this.history[this.history.length-1]}newEntry(){this.lastHistoryEntry&&!this.lastHistoryEntry.actions.length||this.history.push({actions:[]})}entry(...e){this.history.length||this.newEntry(),this.lastHistoryEntry.actions.push(e)}undo(){const e=this.lastFrom("history")
if(!e)return
let t,s=0
for(let n of e){const e=n[0],i=(n[1],n[2]),r=n[3]
this.dom.spliceString(e,i.length,r),t=t?Math.min(t,e):e,s+=r.length}this.selection.queueSelect(t,s)}redo(){const e=this.lastFrom("future")
if(!e)return
let t
for(let s of e){const e=s[0],n=s[1],i=s[2]
s[3]
this.dom.spliceString(e,n,i),t=t?Math.max(t,e):e}this.selection.queueSelect(t)}lastFrom(e){const t=this[e],s=t[t.length-1]
if(s&&s.actions.length)return t.pop(),this["history"===e?"future":"history"].push(s),s.actions.reverse()}}function ti(e,t){let s,n=e.nodeType,i=e.nodeValue,r=e.length
e.tagName
if(3===n){if(t<=r&&!i.match(/\n+/))return[e,t]
t=Math.max(0,t-r)}else for(let o of e.childNodes){var a=ti(o,t)
if(s=a[0],t=a[1],s)return[s,t]}return[s,t]}class si extends Jn{constructor(e){super(),this.isRepositioningCursor=!1,this.component=e,this.setupListener("selectionchange",document)}get dom(){return this.component.domController}get history(){return this.component.historyController}get editor(){return this.component.editor}get offset(){return this.component.selectionOffset}set offset(e){this.component.selectionOffset=e}get length(){return this.component.selectionLength}set length(e){this.component.selectionLength=e}select(e,t=0){const s=window.getSelection(),n=document.createRange()
var i=ti(this.editor,e)
let r,a,o=i[0],l=i[1]
if(o||(o=function e(t){let s
for(let n=t.length;n--;){if(3===t[n].nodeType)return t[n]
if(t[n].childNodes&&(s=e(t[n].childNodes)))return s}}(this.editor.childNodes)||this.editor),l=Math.min(o.length,l),n.setStart(o,l),t){var h=ti(this.editor,e+t)
r=h[0],a=h[1],r?n.setEnd(r,a):n.setEnd(this.editor,1)}return this.isRepositioningCursor=!0,s.removeAllRanges(),s.addRange(n),setTimeout(()=>this.isRepositioningCursor=!1,1),r?[o,r]:[o]}didUpdate(){if(this.queuedSelect){var e=this.queuedSelect
const t=e[0],s=e[1]
this.select(t,s),this.queuedSelect=null}}queueSelect(e,t=0){this.queuedSelect=[e,t]}onSelectionchange(e){if(!this.dom.markdown)return
const t=window.getSelection(),s=t.anchorNode,n=t.rangeCount
if(this.editor.contains(s)&&n>0){const e=t.getRangeAt(0),s=e.startContainer,n=e.startOffset,i=e.endContainer,r=e.endOffset,a=(e.collapsed,3===s.nodeType?s.parentNode:s),o=3===i.nodeType?i.parentNode:i,l=a.dataset.offset,h=o.dataset.offset
let c=+l+n,u=+h+r-c
c+u>this.component.markdown.length&&(u?u-=1:c-=1),this.offset=c,this.length=u,this.isRepositioningCursor||this.history.newEntry()}}}var ni="\n# Hello world!\nMF.GFM is a prototype _Markdown_ editor that parses and formats text in **real-time**!\n\n### Some quick notes:\n- It's still in very early-stage development, so there will be bugs\n\n- Not every Markdown tag has been implemented yet\n\n- It's built with Glimmer.js\n\n> But... why another Markdown editor?\n\nSimply speaking, I got tired of most web Markdown editors that utilise two side-by-side panes,\nor require you to toggle between a `Write` tab and a `Preview` tab :(\n".trim()+"\n\n",ii=function(e,t,s,n){var i,r=arguments.length,a=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,s,n)
else for(var o=e.length-1;o>=0;o--)(i=e[o])&&(a=(r<3?i(a):r>3?i(t,s,a):i(t,s))||a)
return r>3&&a&&Object.defineProperty(t,s,a),a}
class ri extends X{constructor(){super(...arguments),this.markdown=ni||"",this.selectionOffset=0,this.selectionLength=0,this.firstLoad=!0,this.selectionController=new si(this),this.inputController=new Qn(this),this.historyController=new ei(this),this.domController=new Xn(this)}didInsertElement(){this.editor=document.getElementById("editor"),this.inputController.editorInitialized(this.editor),this.editor.focus(),this.domController.parseTokens(),this.markdown=this.markdown}didUpdate(){this.firstLoad&&(this.firstLoad=!1,this.selectionController.queueSelect(this.markdown.length)),this.selectionController.didUpdate()}get tokens(){return this.domController.tokens}}ii([z],ri.prototype,"markdown",void 0),ii([z],ri.prototype,"selectionOffset",void 0),ii([z],ri.prototype,"selectionLength",void 0),ii([z("markdown")],ri.prototype,"tokens",null)
class ai extends In{get headingComponentName(){return`Heading${+this.args.token.tag.replace("h","")}`}}(function(e,t,s,n){var i,r=arguments.length,a=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,s,n)
else for(var o=e.length-1;o>=0;o--)(i=e[o])&&(a=(r<3?i(a):r>3?i(t,s,a):i(t,s))||a)
r>3&&a&&Object.defineProperty(t,s,a)})([z("args")],ai.prototype,"headingComponentName",null)
class oi extends X{get content(){return Mn(this.args.token.content)}}(function(e,t,s,n){var i,r=arguments.length,a=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,s,n)
else for(var o=e.length-1;o>=0;o--)(i=e[o])&&(a=(r<3?i(a):r>3?i(t,s,a):i(t,s))||a)
r>3&&a&&Object.defineProperty(t,s,a)})([z("args")],oi.prototype,"content",null)
class li extends In{get content(){return super.content.replace("\n","<br/>\n")}}(function(e,t,s,n){var i,r=arguments.length,a=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,s,n)
else for(var o=e.length-1;o>=0;o--)(i=e[o])&&(a=(r<3?i(a):r>3?i(t,s,a):i(t,s))||a)
r>3&&a&&Object.defineProperty(t,s,a)})([z("args")],li.prototype,"content",null)
var hi={"component:/emdee/components/Base":In,"component:/emdee/components/Blockquote":class extends In{},"template:/emdee/components/Blockquote":{id:"pRuYCBAJ",block:'{"symbols":["@token"],"statements":[[6,"blockquote"],[11,"data-offset",[21,1,["offset"]],null],[11,"class",[27,[[26,"if",[[22,["focussed"]],"focus"],null]]]],[8],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Blockquote"}},"component:/emdee/components/BulletList":class extends In{},"template:/emdee/components/BulletList":{id:"eIbvMcux",block:'{"symbols":["@token"],"statements":[[6,"ul"],[11,"data-offset",[21,1,["offset"]],null],[11,"class",[27,[[26,"if",[[22,["focussed"]],"focus"],null]]]],[8],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/BulletList"}},"component:/emdee/components/CodeInline":class extends In{},"template:/emdee/components/CodeInline":{id:"slpDQnMH",block:'{"symbols":["@token"],"statements":[[6,"code"],[11,"data-offset",[21,1,["offset"]],null],[8],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/CodeInline"}},"template:/emdee/components/Elements":{id:"lrtQT0fN",block:'{"symbols":["token","index","&default","@selectionLength","@selectionOffset","@tokens"],"statements":[[4,"each",[[21,6,[]]],[["key"],["@index"]],{"statements":[[4,"component",[[21,1,["componentName"]]],[["token","selectionOffset","selectionLength"],[[21,1,[]],[21,5,[]],[21,4,[]]]],{"statements":[[4,"unless",[[21,2,[]]],null,{"statements":[[13,3]],"parameters":[]},null]],"parameters":[]},null]],"parameters":[1,2]},null]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Elements"}},"component:/emdee/components/Em":class extends In{},"template:/emdee/components/Em":{id:"uXgJqzXx",block:'{"symbols":["@token"],"statements":[[6,"em"],[11,"data-offset",[21,1,["offset"]],null],[8],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Em"}},"component:/emdee/components/Emdee":ri,"template:/emdee/components/Emdee":{id:"3wjPjNje",block:'{"symbols":[],"statements":[[6,"div"],[10,"id","editor"],[10,"class","markdown-body"],[10,"contenteditable","true"],[10,"spellcheck","false"],[8],[5,"Elements",[],[["@tokens","@selectionOffset","@selectionLength"],[[20,"tokens"],[20,"selectionOffset"],[20,"selectionLength"]]],{"statements":[],"parameters":[]}],[9],[0,"\\n"]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Emdee"}},"component:/emdee/components/Heading":ai,"template:/emdee/components/Heading":{id:"VcCg4tat",block:'{"symbols":["@token"],"statements":[[4,"component",[[22,["headingComponentName"]]],[["offset","focussed"],[[21,1,["offset"]],[22,["focussed"]]]],{"statements":[[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}]],"parameters":[]},null]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Heading"}},"template:/emdee/components/Heading1":{id:"6umOAl+6",block:'{"symbols":["@offset","@focussed","&default"],"statements":[[6,"h1"],[11,"data-offset",[21,1,[]],null],[11,"class",[27,[[26,"if",[[21,2,[]],"focus"],null]]]],[8],[13,3],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Heading1"}},"template:/emdee/components/Heading2":{id:"8kXyE7sL",block:'{"symbols":["@offset","@focussed","&default"],"statements":[[6,"h2"],[11,"data-offset",[21,1,[]],null],[11,"class",[27,[[26,"if",[[21,2,[]],"focus"],null]]]],[8],[13,3],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Heading2"}},"template:/emdee/components/Heading3":{id:"ihc6BPAn",block:'{"symbols":["@offset","@focussed","&default"],"statements":[[6,"h3"],[11,"data-offset",[21,1,[]],null],[11,"class",[27,[[26,"if",[[21,2,[]],"focus"],null]]]],[8],[13,3],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Heading3"}},"template:/emdee/components/Heading4":{id:"ae37FSLX",block:'{"symbols":["@offset","@focussed","&default"],"statements":[[6,"h4"],[11,"data-offset",[21,1,[]],null],[11,"class",[27,[[26,"if",[[21,2,[]],"focus"],null]]]],[8],[13,3],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Heading4"}},"template:/emdee/components/Heading5":{id:"zTDTeQPu",block:'{"symbols":["@offset","@focussed","&default"],"statements":[[6,"h5"],[11,"data-offset",[21,1,[]],null],[11,"class",[27,[[26,"if",[[21,2,[]],"focus"],null]]]],[8],[13,3],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Heading5"}},"template:/emdee/components/Heading6":{id:"YKoGkfDC",block:'{"symbols":["@offset","@focussed","&default"],"statements":[[6,"h6"],[11,"data-offset",[21,1,[]],null],[11,"class",[27,[[26,"if",[[21,2,[]],"focus"],null]]]],[8],[13,3],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Heading6"}},"component:/emdee/components/ListItem":class extends In{},"template:/emdee/components/ListItem":{id:"vsrZktep",block:'{"symbols":["@token"],"statements":[[6,"li"],[11,"data-offset",[21,1,["offset"]],null],[11,"class",[27,[[26,"if",[[22,["focussed"]],"focus"],null]]]],[8],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/ListItem"}},"component:/emdee/components/Markup":oi,"template:/emdee/components/Markup":{id:"OhFMbkFF",block:'{"symbols":["@token","@classNames"],"statements":[[4,"unless",[[21,1,["absorbed"]]],null,{"statements":[[6,"mark"],[11,"data-offset",[21,1,["offset"]],null],[11,"class",[21,2,[]],null],[8],[1,[20,"content"],false],[9]],"parameters":[]},null]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Markup"}},"component:/emdee/components/Paragraph":class extends In{},"template:/emdee/components/Paragraph":{id:"a2QbxQfj",block:'{"symbols":["@token"],"statements":[[6,"p"],[11,"data-offset",[21,1,["offset"]],null],[11,"class",[27,[[26,"if",[[22,["focussed"]],"focus"],null]]]],[8],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Paragraph"}},"component:/emdee/components/Softbreak":li,"template:/emdee/components/Softbreak":{id:"TOAoMkGR",block:'{"symbols":["@token"],"statements":[[6,"span"],[11,"data-offset",[21,1,["offset"]],null],[8],[1,[20,"content"],true],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Softbreak"}},"component:/emdee/components/Strong":class extends In{},"template:/emdee/components/Strong":{id:"GaIuy7UP",block:'{"symbols":["@token"],"statements":[[6,"strong"],[11,"data-offset",[21,1,["offset"]],null],[8],[5,"Elements",[],[["@tokens"],[[21,1,["children"]]]],{"statements":[],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Strong"}},"component:/emdee/components/Text":class extends In{},"template:/emdee/components/Text":{id:"MIKNR4ZB",block:'{"symbols":["@token"],"statements":[[6,"span"],[11,"data-offset",[21,1,["offset"]],null],[8],[1,[20,"content"],false],[9]],"hasEval":false}',meta:{specifier:"template:/emdee/components/Text"}}},ci={app:{name:"emdee",rootName:"emdee"},types:{application:{definitiveCollection:"main"},component:{definitiveCollection:"components"},"component-test":{unresolvable:!0},helper:{definitiveCollection:"components"},"helper-test":{unresolvable:!0},renderer:{definitiveCollection:"main"},template:{definitiveCollection:"components"}},collections:{main:{types:["application","renderer"]},components:{group:"ui",types:["component","component-test","template","helper","helper-test"],defaultType:"component",privateCollections:["utils"]},styles:{group:"ui",unresolvable:!0},utils:{unresolvable:!0}}}
const ui=new class extends sn{constructor(){let e=new Ln(hi),t=new Tn(ci,e)
const s=document.body
super({builder:new Cn({element:s,nextSibling:null}),loader:new En(t),renderer:new _n,resolver:t,rootName:ci.app.rootName})}},pi=document.getElementById("app")
Y=(()=>{ui.scheduleRerender()}),ui.registerInitializer({initialize(e){e.register(`component-manager:/${ui.rootName}/component-managers/main`,Gs)}}),ui.renderComponent("Emdee",pi,null),ui.boot()})
