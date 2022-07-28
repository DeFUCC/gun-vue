import { resolveComponent, openBlock, createBlock } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
var block0 = (Comp) => {
  Comp.doc = `<p><img src="/components.svg" alt=""></p>
<h1 id="gun-vue-is-a-library-of-reusable-components-for-gun-built-with-vue" tabindex="-1">Gun-Vue is a library of reusable components for Gun built with Vue. <a class="header-anchor" href="#gun-vue-is-a-library-of-reusable-components-for-gun-built-with-vue" aria-hidden="true">#</a></h1>
<p>It enables eager web developers to build p2p apps for their communities all over the world, free and open source.</p>
<h2 id="how-to-install" tabindex="-1">How to install? <a class="header-anchor" href="#how-to-install" aria-hidden="true">#</a></h2>
<p>Gun-Vue is distributed as a regular NPM package and may be used in any Vue 3 project.</p>
<ol>
<li>You may start by <a href="https://vuejs.org/guide/quick-start.html" target="_blank">creating a new Vue project</a>.</li>
</ol>
<pre><code class="language-shell"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">shell</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #C9D1D9">pnpm init vue@latest</span></span>
<span class="line"><span style="color: #79C0FF">cd</span><span style="color: #C9D1D9"> </span><span style="color: #FF7B72">&lt;</span><span style="color: #C9D1D9">your-project-name</span><span style="color: #FF7B72">&gt;</span></span>
<span class="line"><span style="color: #C9D1D9">pnpm install</span></span>
<span class="line"><span style="color: #C9D1D9">pnpm run dev</span></span>
<span class="line"></span></code></pre></div></code></pre>
<ol start="2">
<li>Install the Gun-Vue plugin and it's styles in your app <code>main.js</code> file</li>
</ol>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> { createApp } </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;vue&#39;</span></span>
<span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> App </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;./App.vue&#39;</span></span>
<span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> router </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;./router&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;./assets/main.css&#39;</span></span>
<span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;@gun-vue/components/dist/style.css&#39;</span></span>
<span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> { GunVuePlugin } </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;@gun-vue/components&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">app</span><span style="color: #C9D1D9"> </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">createApp</span><span style="color: #C9D1D9">(App)</span></span>
<span class="line"><span style="color: #C9D1D9">app.</span><span style="color: #D2A8FF">use</span><span style="color: #C9D1D9">(router)</span></span>
<span class="line"><span style="color: #C9D1D9">app.</span><span style="color: #D2A8FF">use</span><span style="color: #C9D1D9">(GunVuePlugin)</span></span>
<span class="line"><span style="color: #C9D1D9">app.</span><span style="color: #D2A8FF">mount</span><span style="color: #C9D1D9">(</span><span style="color: #A5D6FF">&#39;#app&#39;</span><span style="color: #C9D1D9">)</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div></code></pre>
<ol start="3">
<li>You can use any of the Gun-Vue components in any SFC in your app.</li>
</ol>
<pre><code class="language-html"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">html</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #C9D1D9">&lt;</span><span style="color: #7EE787">template</span><span style="color: #C9D1D9">&gt;</span></span>
<span class="line"><span style="color: #C9D1D9">  &lt;</span><span style="color: #FFA198; font-style: italic">ChatRoom</span><span style="color: #C9D1D9"> /&gt;</span></span>
<span class="line"><span style="color: #C9D1D9">&lt;/</span><span style="color: #7EE787">template</span><span style="color: #C9D1D9">&gt;</span></span>
<span class="line"></span></code></pre></div></code></pre>
<ol start="4">
<li>Or you can use Gun-Vue components as routes directly in your <code>./router/index.js</code>.</li>
</ol>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> { createRouter, createWebHistory } </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;vue-router&#39;</span></span>
<span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> HomeView </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;../views/HomeView.vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> { RoomList } </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;@gun-vue/components&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">router</span><span style="color: #C9D1D9"> </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">createRouter</span><span style="color: #C9D1D9">({</span></span>
<span class="line"><span style="color: #C9D1D9">  history: </span><span style="color: #D2A8FF">createWebHistory</span><span style="color: #C9D1D9">(</span><span style="color: #FF7B72">import</span><span style="color: #C9D1D9">.</span><span style="color: #79C0FF">meta</span><span style="color: #C9D1D9">.env.</span><span style="color: #79C0FF">BASE_URL</span><span style="color: #C9D1D9">),</span></span>
<span class="line"><span style="color: #C9D1D9">  routes: [</span></span>
<span class="line"><span style="color: #C9D1D9">    {</span></span>
<span class="line"><span style="color: #C9D1D9">      path: </span><span style="color: #A5D6FF">&#39;/&#39;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #C9D1D9">      name: </span><span style="color: #A5D6FF">&#39;home&#39;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #C9D1D9">      component: HomeView</span></span>
<span class="line"><span style="color: #C9D1D9">    },</span></span>
<span class="line"><span style="color: #C9D1D9">    {</span></span>
<span class="line"><span style="color: #C9D1D9">      path: </span><span style="color: #A5D6FF">&#39;/rooms&#39;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #C9D1D9">      name: </span><span style="color: #A5D6FF">&#39;rooms&#39;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #C9D1D9">      component: RoomList</span></span>
<span class="line"><span style="color: #C9D1D9">    }</span></span>
<span class="line"><span style="color: #C9D1D9">  ]</span></span>
<span class="line"><span style="color: #C9D1D9">})</span></span>
<span class="line"></span>
<span class="line"><span style="color: #FF7B72">export</span><span style="color: #FFA657"> </span><span style="color: #FF7B72">default</span><span style="color: #FFA657"> </span><span style="color: #C9D1D9">router</span></span>
<span class="line"></span></code></pre></div></code></pre>
`;
};
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "Components",
    "docs-only": "",
    icon: "la:book-open",
    group: "docs"
  });
}
if (typeof block0 === "function")
  block0(_sfc_main);
_sfc_main.__file = "src/docs/Components.story.vue";
var Components_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/docs/Components.story.vue"]]);
export { Components_story as default };
