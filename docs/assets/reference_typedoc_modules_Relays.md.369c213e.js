import{_ as e,o as t,c as s,X as a}from"./chunks/framework.a3669fa7.js";const h=JSON.parse('{"title":"Module: Relays","description":"","frontmatter":{},"headers":[],"relativePath":"reference/typedoc/modules/Relays.md","filePath":"reference/typedoc/modules/Relays.md","pages":["CHANGELOG","basics/video","basics/video/2021/03-02","basics/video/2021/11-19","basics/video/2021/11-27","basics/video/2022/01-12","basics/video/2022/01-22","basics/video/2022/02-09","basics/video/2022/03-26","basics/video/2022/04-13","basics/video/2022/07-08","basics/video/2022/07-21","basics/video/2022/07-23","basics/video/2022/08-01","basics/video/2022/08-05","basics/video/2023/02-03","basics/video/2023/03-06","basics/video/2023/04-15","basics/video/2023/04-17","basics/video/2023/04-21","basics/video/2023/04-27","basics/video/2023/05-02","basics/what-is","explanations/crdt","explanations/qna","explanations/stack","how-to/use-components","index","packages/components","packages/composables","packages/","packages/relay","reference/components","reference/","reference/typedoc/README","reference/typedoc/interfaces/Account.Account","reference/typedoc/interfaces/Account.Profile","reference/typedoc/interfaces/Auth.Auth","reference/typedoc/interfaces/Auth.useAuth","reference/typedoc/interfaces/Certificates.CertOptions","reference/typedoc/interfaces/Certificates.Policy","reference/typedoc/interfaces/Chat.Message","reference/typedoc/interfaces/Crypto.Entity","reference/typedoc/interfaces/Dict.DictRecord","reference/typedoc/interfaces/File.PictureUploadData","reference/typedoc/interfaces/File.PictureUploadOptions","reference/typedoc/interfaces/File.UploadState","reference/typedoc/interfaces/Gift.Gift","reference/typedoc/interfaces/Gifts.GiftList","reference/typedoc/interfaces/Guests.Guest","reference/typedoc/interfaces/Mates.Mate","reference/typedoc/interfaces/Md.MdContent","reference/typedoc/interfaces/Mouse.Mouse","reference/typedoc/interfaces/Mouse.useMouse","reference/typedoc/interfaces/Post.Post","reference/typedoc/interfaces/Post.PostContent","reference/typedoc/interfaces/PrivateChat.Chat","reference/typedoc/interfaces/Project.ProjectItem","reference/typedoc/interfaces/Reaction.Reaction","reference/typedoc/interfaces/Reaction.ReactionVector","reference/typedoc/interfaces/Reactions.AuthorList","reference/typedoc/interfaces/Relay.Relay","reference/typedoc/interfaces/Space.Arrow","reference/typedoc/interfaces/Space.Pos","reference/typedoc/interfaces/Space.SpaceGuest","reference/typedoc/interfaces/User.User","reference/typedoc/interfaces/room_useRoom.CurrentRoom","reference/typedoc/modules","reference/typedoc/modules/Account","reference/typedoc/modules/Auth","reference/typedoc/modules/Background","reference/typedoc/modules/Cast","reference/typedoc/modules/Certificates","reference/typedoc/modules/Chat","reference/typedoc/modules/Color","reference/typedoc/modules/Crypto","reference/typedoc/modules/Dict","reference/typedoc/modules/Draw","reference/typedoc/modules/File","reference/typedoc/modules/Gift","reference/typedoc/modules/Gifts","reference/typedoc/modules/Guests","reference/typedoc/modules/Gun","reference/typedoc/modules/GunWorker","reference/typedoc/modules/Languages","reference/typedoc/modules/Mates","reference/typedoc/modules/Md","reference/typedoc/modules/Mouse","reference/typedoc/modules/Post","reference/typedoc/modules/Posts","reference/typedoc/modules/PrivateChat","reference/typedoc/modules/Project","reference/typedoc/modules/Projects","reference/typedoc/modules/QR","reference/typedoc/modules/Reaction","reference/typedoc/modules/Reactions","reference/typedoc/modules/Relay","reference/typedoc/modules/Relays","reference/typedoc/modules/Room","reference/typedoc/modules/Space","reference/typedoc/modules/Tags","reference/typedoc/modules/Theme","reference/typedoc/modules/Torrent","reference/typedoc/modules/User","reference/typedoc/modules/Zip","reference/typedoc/modules/room_useRoom","reference/typedoc/modules/useProject","reference/typedoc/modules/user_useAvatar","tutorials/first-app","tutorials/getting-started","tutorials/vue-app"]}'),o={name:"reference/typedoc/modules/Relays.md"},r=a(`<p><a href="./../README.html">Gun-Vue docs - v0.18.1</a> / <a href="./../modules.html">Exports</a> / Relays</p><h1 id="module-relays" tabindex="-1">Module: Relays <a class="header-anchor" href="#module-relays" aria-label="Permalink to &quot;Module: Relays&quot;">​</a></h1><p>Loads the <a href="https://github.com/amark/gun/wiki/volunteer.dht" target="_blank" rel="noreferrer">list of active volunteer DHT gun nodes</a> and benchmarks ping for them</p><h2 id="table-of-contents" tabindex="-1">Table of contents <a class="header-anchor" href="#table-of-contents" aria-label="Permalink to &quot;Table of contents&quot;">​</a></h2><h3 id="functions" tabindex="-1">Functions <a class="header-anchor" href="#functions" aria-label="Permalink to &quot;Functions&quot;">​</a></h3><ul><li><a href="./Relays.html#loadrelays">loadRelays</a></li><li><a href="./Relays.html#userelays">useRelays</a></li></ul><h2 id="functions-1" tabindex="-1">Functions <a class="header-anchor" href="#functions-1" aria-label="Permalink to &quot;Functions&quot;">​</a></h2><h3 id="loadrelays" tabindex="-1">loadRelays <a class="header-anchor" href="#loadrelays" aria-label="Permalink to &quot;loadRelays&quot;">​</a></h3><p>▸ <strong>loadRelays</strong>(<code>«destructured»?</code>): <code>Promise</code>&lt;{}&gt;</p><p>Load the list of the relays</p><h4 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h4><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>«destructured»</code></td><td style="text-align:left;"><code>Object</code></td></tr><tr><td style="text-align:left;">› <code>source</code></td><td style="text-align:left;"><code>string</code></td></tr></tbody></table><h4 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>Promise</code>&lt;{}&gt;</p><h4 id="defined-in" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/DeFUCC/gun-vue/blob/47caaefb/src/gun/useRelays.ts#L27" target="_blank" rel="noreferrer">src/gun/useRelays.ts:27</a></p><hr><h3 id="userelays" tabindex="-1">useRelays <a class="header-anchor" href="#userelays" aria-label="Permalink to &quot;useRelays&quot;">​</a></h3><p>▸ <strong>useRelays</strong>(): <code>Object</code></p><p>Gets the list of actual gun relays and tool to update the list</p><p><strong><code>Example</code></strong></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">useRelays</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@gun-vue/composables</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> relays</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> errors</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> loadRelays </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">useRelays</span><span style="color:#A6ACCD;">()</span></span></code></pre></div><h4 id="returns-1" tabindex="-1">Returns <a class="header-anchor" href="#returns-1" aria-label="Permalink to &quot;Returns&quot;">​</a></h4><p><code>Object</code></p><table><thead><tr><th style="text-align:left;">Name</th><th style="text-align:left;">Type</th></tr></thead><tbody><tr><td style="text-align:left;"><code>errors</code></td><td style="text-align:left;">{}</td></tr><tr><td style="text-align:left;"><code>loadRelays</code></td><td style="text-align:left;">() =&gt; <code>void</code></td></tr><tr><td style="text-align:left;"><code>relays</code></td><td style="text-align:left;">{}</td></tr></tbody></table><h4 id="defined-in-1" tabindex="-1">Defined in <a class="header-anchor" href="#defined-in-1" aria-label="Permalink to &quot;Defined in&quot;">​</a></h4><p><a href="https://github.com/DeFUCC/gun-vue/blob/47caaefb/src/gun/useRelays.ts#L73" target="_blank" rel="noreferrer">src/gun/useRelays.ts:73</a></p>`,27),c=[r];function n(l,d,i,p,f,u){return t(),s("div",null,c)}const m=e(o,[["render",n]]);export{h as __pageData,m as default};
