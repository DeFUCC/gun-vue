import { resolveComponent, openBlock, createBlock } from "./vendor.es.js";
import { _export_sfc } from "./plugin-vue_export-helper.es.js";
var Composables_story_vue_vue_type_style_index_0_scoped_true_lang = "";
var block0 = (Comp) => {
  Comp.doc = `<p><img src="/composables.svg" alt=""></p>
<h2 id="gun-vue-composables" tabindex="-1">@gun-vue/composables <a class="header-anchor" href="#gun-vue-composables" aria-hidden="true">#</a></h2>
<p>GunVue Composables is a collection of utility functions based on <a href="https://v3.vuejs.org/guide/composition-api-introduction.html" target="_blank">Vue 3 Composition API</a>. We assume you are already familiar with the basic ideas of Composition API and <a href="https://learnvue.co/2021/05/explaining-the-new-script-setup-type-in-vue-3-major-takeaways-from-the-rfc/#using-script-setup-with-a-normal-script" target="_blank">script setup</a> before you continue.</p>
<h3 id="how-to-install" tabindex="-1">How to install? <a class="header-anchor" href="#how-to-install" aria-hidden="true">#</a></h3>
<pre><code class="language-shell"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">shell</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #C9D1D9">pnpm i @gun-vue/composables</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="how-to-use" tabindex="-1">How to use? <a class="header-anchor" href="#how-to-use" aria-hidden="true">#</a></h3>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> { useUser } </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&quot;@gun-vue/composables&quot;</span><span style="color: #C9D1D9">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">user</span><span style="color: #C9D1D9"> </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">useUser</span><span style="color: #C9D1D9">();</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h2 id="modules" tabindex="-1">Modules <a class="header-anchor" href="#modules" aria-hidden="true">#</a></h2>
<table>
  <thead>
    <tr>
      <th>Module</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td><a href="#useaccount" >useAccount</a></td>
    <td><p>Basic user management</p>
</td>
    </tr>
<tr>
    <td><a href="#usechat" >useChat</a></td>
    <td><p>Basic public chat</p>
</td>
    </tr>
<tr>
    <td><a href="#useprivatechat" >usePrivateChat</a></td>
    <td><p>Basic private chat</p>
</td>
    </tr>
<tr>
    <td><a href="#usecrypto" >useCrypto</a></td>
    <td><p>SEA cryptography abstraction</p>
</td>
    </tr>
<tr>
    <td><a href="#usedictionary" >useDictionary</a></td>
    <td></td>
    </tr>
<tr>
    <td><a href="#usefile" >useFile</a></td>
    <td><p>File handling functions</p>
</td>
    </tr>
<tr>
    <td><a href="#usemd" >useMd</a></td>
    <td><p>Handle Markdown files</p>
</td>
    </tr>
<tr>
    <td><a href="#usezip" >useZip</a></td>
    <td><p>Read and write zip files</p>
</td>
    </tr>
<tr>
    <td><a href="#usegun" >useGun</a></td>
    <td><p>Gun DB initialization and basic methods</p>
</td>
    </tr>
<tr>
    <td><a href="#userelay" >useRelay</a></td>
    <td><p>Relay connection management</p>
</td>
    </tr>
<tr>
    <td><a href="#userelays" >useRelays</a></td>
    <td><p>Loads the <a href="https://github.com/amark/gun/wiki/volunteer.dht">list of active volunteer DHT gun nodes</a>  and benchmarks ping for them</p>
</td>
    </tr>
<tr>
    <td><a href="#uselog" >useLog</a></td>
    <td><p>Reactive version of <code>gun-util</code> Date tree</p>
</td>
    </tr>
<tr>
    <td><a href="#useworker" >useWorker</a></td>
    <td><p>Worker wrapper for heavy functions</p>
</td>
    </tr>
<tr>
    <td><a href="#usepost" >usePost</a></td>
    <td><p>Get and handle a particular post by it&#39;s tag and hash</p>
</td>
    </tr>
<tr>
    <td><a href="#useposts" >usePosts</a></td>
    <td><p>Get and handle a particular post by it&#39;s tag and hash</p>
</td>
    </tr>
<tr>
    <td><a href="#usereaction" >useReaction</a></td>
    <td><p>React to posts with emojis</p>
</td>
    </tr>
<tr>
    <td><a href="#usereactions" >useReactions</a></td>
    <td><p>Reactions to posts with emojis</p>
</td>
    </tr>
<tr>
    <td><a href="#usetags" >useTags</a></td>
    <td><p>Get and handle a particular post by it&#39;s tag and hash</p>
</td>
    </tr>
<tr>
    <td><a href="#projects" >Projects</a></td>
    <td></td>
    </tr>
<tr>
    <td><a href="#useroom" >useRoom</a></td>
    <td></td>
    </tr>
<tr>
    <td><a href="#usespace" >useSpace</a></td>
    <td><p>A 2D-space</p>
</td>
    </tr>
<tr>
    <td><a href="#usecolor" >useColor</a></td>
    <td><p>Deterministic colors derived from oub keys, hashes or any other string data</p>
</td>
    </tr>
<tr>
    <td><a href="#usemouse" >useMouse</a></td>
    <td><p>Handle mouse movement inside an SVG</p>
</td>
    </tr>
<tr>
    <td><a href="#usemates" >useMates</a></td>
    <td><p>Connections between accounts</p>
</td>
    </tr>
<tr>
    <td><a href="#usepass" >usePass</a></td>
    <td><p>Manage user&#39;s password and credentials</p>
</td>
    </tr>
<tr>
    <td><a href="#useuser" >useUser</a></td>
    <td><p>Basic user management</p>
</td>
    </tr>
</tbody>
</table>
<p><a name="module_useAccount"></a></p>
<h2 id="useaccount" tabindex="-1">useAccount <a class="header-anchor" href="#useaccount" aria-hidden="true">#</a></h2>
<p>Basic user management</p>
<ul>
<li><a href="#module_useAccount" target="_blank">useAccount</a>
<ul>
<li><em>static</em>
<ul>
<li><a href="#module_useAccount.useAccount" target="_blank">.useAccount(pub)</a> \u21D2 <code>account</code></li>
</ul>
</li>
<li><em>inner</em>
<ul>
<li><a href="#module_useAccount..account" target="_blank">~account</a> : <code>computed(object)</code></li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="useaccount-pub-\u21D2-account" tabindex="-1">useAccount(pub) \u21D2 <code>account</code> <a class="header-anchor" href="#useaccount-pub-\u21D2-account" aria-hidden="true">#</a></h3>
<p>Load and handle user's account by a public key</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>pub</td>
<td><code>ref(string)</code> | <code>string</code></td>
<td>The public key of a user as a string or a ref</td>
</tr>
</tbody>
</table>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> { ref } </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;vue&#39;</span></span>
<span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> { useAccount, SEA } </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;@gun-vue/composables&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">pub</span><span style="color: #C9D1D9"> </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">ref</span><span style="color: #C9D1D9">()</span></span>
<span class="line"></span>
<span class="line"><span style="color: #FF7B72">async</span><span style="color: #C9D1D9"> </span><span style="color: #FF7B72">function</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">generatePair</span><span style="color: #C9D1D9">() {</span></span>
<span class="line"><span style="color: #C9D1D9"> pub.value </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #FF7B72">await</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">SEA</span><span style="color: #C9D1D9">.</span><span style="color: #D2A8FF">pair</span><span style="color: #C9D1D9">()</span></span>
<span class="line"><span style="color: #C9D1D9">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> { </span><span style="color: #79C0FF">account</span><span style="color: #C9D1D9"> } </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">useAccount</span><span style="color: #C9D1D9">(pub)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #D2A8FF">generatePair</span><span style="color: #C9D1D9">()</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="account-computed-object" tabindex="-1">account : <code>computed(object)</code> <a class="header-anchor" href="#account-computed-object" aria-hidden="true">#</a></h3>
<p>Reactive account data</p>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>pub</td>
<td><code>string</code></td>
<td>the pub key</td>
</tr>
<tr>
<td>color</td>
<td><code>string</code></td>
<td>the color hash of the pub key</td>
</tr>
<tr>
<td>profile</td>
<td><code>object</code></td>
<td>all the profile fields of the account</td>
</tr>
<tr>
<td>pulse</td>
<td><code>number</code></td>
<td>the recent presence timestamp</td>
</tr>
<tr>
<td>blink</td>
<td><code>boolean</code></td>
<td>on/off switching pulse</td>
</tr>
<tr>
<td>lastSeen</td>
<td><code>'online'</code> | <code>string</code></td>
<td>a human readable last seen status ('online' if less than TIMEOUT)</td>
</tr>
</tbody>
</table>
<hr />
<p><a name="module_useChat"></a></p>
<h2 id="usechat" tabindex="-1">useChat <a class="header-anchor" href="#usechat" aria-hidden="true">#</a></h2>
<p>Basic public chat</p>
<hr />
<p><a name="module_usePrivateChat"></a></p>
<h2 id="useprivatechat" tabindex="-1">usePrivateChat <a class="header-anchor" href="#useprivatechat" aria-hidden="true">#</a></h2>
<p>Basic private chat</p>
<hr />
<p><a name="module_useCrypto"></a></p>
<h2 id="usecrypto" tabindex="-1">useCrypto <a class="header-anchor" href="#usecrypto" aria-hidden="true">#</a></h2>
<p>SEA cryptography abstraction</p>
<ul>
<li><a href="#module_useCrypto" target="_blank">useCrypto</a>
<ul>
<li><em>static</em>
<ul>
<li><a href="#module_useCrypto.encFor" target="_blank">.encFor(data, sender, receiver)</a> \u21D2 <code>String</code></li>
<li><a href="#module_useCrypto.decFrom" target="_blank">.decFrom(data, sender, receiver)</a> \u21D2 <code>String</code></li>
<li><a href="#module_useCrypto.getShortHash" target="_blank">.getShortHash(text, seed)</a> \u21D2 <code>String</code></li>
</ul>
</li>
<li><em>inner</em>
<ul>
<li><a href="#module_useCrypto..Entity" target="_blank">~Entity</a> : <code>Object</code></li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="encfor-data-sender-receiver-\u21D2-string" tabindex="-1">encFor(data, sender, receiver) \u21D2 <code>String</code> <a class="header-anchor" href="#encfor-data-sender-receiver-\u21D2-string" aria-hidden="true">#</a></h3>
<p>Encrypt data for one receiver entity</p>
<ol>
<li>Generates encryption secret using bob's epub and current user pair</li>
<li>Enctypts data with this secret</li>
</ol>
<p><strong>Returns</strong>: <code>String</code> - Encrypted data string to be sent</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>data</td>
<td><code>String</code></td>
<td>Stringified data to be encrypted</td>
</tr>
<tr>
<td>sender</td>
<td><code>Entity</code></td>
<td>An object with <code>pub</code> and <code>epub</code> strings - the <a href="http://user.is" target="_blank">user.is</a> object of the reciever's account</td>
</tr>
<tr>
<td>receiver</td>
<td><code>SEAPair</code></td>
<td>SEA Pair of the sender \u2013 <code>epriv</code> key will be used to encrypt the data</td>
</tr>
</tbody>
</table>
<h3 id="decfrom-data-sender-receiver-\u21D2-string" tabindex="-1">decFrom(data, sender, receiver) \u21D2 <code>String</code> <a class="header-anchor" href="#decfrom-data-sender-receiver-\u21D2-string" aria-hidden="true">#</a></h3>
<p>Decrypt a private message from an entity</p>
<ol>
<li>Generates secret using senders <code>epub</code> and current user pair</li>
<li>Decrypts the data with this secret</li>
</ol>
<p><strong>Returns</strong>: <code>String</code> - Decrypted data</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>data</td>
<td><code>String</code></td>
<td>Encrypted private data</td>
</tr>
<tr>
<td>sender</td>
<td><code>Entity</code></td>
<td>An object with <code>pub</code> and <code>epub</code> strings - the <a href="http://user.is" target="_blank">user.is</a> object of the sender's account</td>
</tr>
<tr>
<td>receiver</td>
<td><code>SEAPair</code></td>
<td>SEA Pair of the receiver \u2013 <code>epriv</code> key will be used to encrypt the data</td>
</tr>
</tbody>
</table>
<h3 id="getshorthash-text-seed-\u21D2-string" tabindex="-1">getShortHash(text, seed) \u21D2 <code>String</code> <a class="header-anchor" href="#getshorthash-text-seed-\u21D2-string" aria-hidden="true">#</a></h3>
<p>Calculate a hex hash for any string data</p>
<p><strong>Returns</strong>: <code>String</code> - The hex encoded SHA-1 hash</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>text</td>
<td><code>String</code></td>
</tr>
<tr>
<td>seed</td>
<td><code>String</code></td>
</tr>
</tbody>
</table>
<h3 id="entity-object" tabindex="-1">Entity : <code>Object</code> <a class="header-anchor" href="#entity-object" aria-hidden="true">#</a></h3>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>pub</td>
<td><code>String</code></td>
<td>the public key</td>
</tr>
<tr>
<td>epub</td>
<td><code>String</code></td>
<td>the elliplic encryption epub</td>
</tr>
</tbody>
</table>
<hr />
<p><a name="module_useDictionary"></a></p>
<h2 id="usedictionary" tabindex="-1">useDictionary <a class="header-anchor" href="#usedictionary" aria-hidden="true">#</a></h2>
<ul>
<li><a href="#module_useDictionary" target="_blank">useDictionary</a>
<ul>
<li><a href="#module_useDictionary.useWords" target="_blank">.useWords()</a> \u21D2 <code>useWords</code></li>
<li><a href="#module_useDictionary.useDefs" target="_blank">.useDefs()</a> \u21D2 <code>useDefs</code></li>
</ul>
</li>
</ul>
<h3 id="usewords-\u21D2-usewords" tabindex="-1">useWords() \u21D2 <code>useWords</code> <a class="header-anchor" href="#usewords-\u21D2-usewords" aria-hidden="true">#</a></h3>
<p>Use filtrable words list</p>
<h3 id="usedefs-\u21D2-usedefs" tabindex="-1">useDefs() \u21D2 <code>useDefs</code> <a class="header-anchor" href="#usedefs-\u21D2-usedefs" aria-hidden="true">#</a></h3>
<p>Dictionary definitions browser</p>
<hr />
<p><a name="module_useFile"></a></p>
<h2 id="usefile" tabindex="-1">useFile <a class="header-anchor" href="#usefile" aria-hidden="true">#</a></h2>
<p>File handling functions</p>
<ul>
<li><a href="#module_useFile" target="_blank">useFile</a>
<ul>
<li><em>static</em>
<ul>
<li><a href="#module_useFile.downloadFile" target="_blank">.downloadFile(text, fileType, fileName)</a></li>
<li><a href="#module_useFile.uploadText" target="_blank">.uploadText(event, callback)</a></li>
<li><a href="#module_useFile.usePictureUpload" target="_blank">.usePictureUpload(Options)</a> \u21D2 <code>PictureUploadData</code></li>
</ul>
</li>
<li><em>inner</em>
<ul>
<li><a href="#module_useFile..PictureUploadOptions" target="_blank">~PictureUploadOptions</a> : <code>Object</code></li>
<li><a href="#module_useFile..PictureUploadData" target="_blank">~PictureUploadData</a> : <code>Object</code></li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="downloadfile-text-filetype-filename" tabindex="-1">downloadFile(text, fileType, fileName) <a class="header-anchor" href="#downloadfile-text-filetype-filename" aria-hidden="true">#</a></h3>
<p>A method to download any text as a file</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>text</td>
<td><code>String</code></td>
<td>the text to download</td>
</tr>
<tr>
<td>fileType</td>
<td><code>String</code></td>
<td>the file type like &quot;application/json&quot;</td>
</tr>
<tr>
<td>fileName</td>
<td><code>String</code></td>
<td>the full file name like &quot;myKey.json&quot;</td>
</tr>
</tbody>
</table>
<h3 id="uploadtext-event-callback" tabindex="-1">uploadText(event, callback) <a class="header-anchor" href="#uploadtext-event-callback" aria-hidden="true">#</a></h3>
<p>Upload and parse JSON keypair</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>event</td>
<td><code>Event</code></td>
<td><code>$event</code> from the <code>@change</code> handler</td>
</tr>
<tr>
<td>callback</td>
<td><code>function</code></td>
<td>a function to handle the loaded file from the reader</td>
</tr>
</tbody>
</table>
<h3 id="usepictureupload-options-\u21D2-pictureuploaddata" tabindex="-1">usePictureUpload(Options) \u21D2 <code>PictureUploadData</code> <a class="header-anchor" href="#usepictureupload-options-\u21D2-pictureuploaddata" aria-hidden="true">#</a></h3>
<p>Process an uploaded picture by rendering in into a canvas with given size. Returns a base64 encoded image to be stored and displayed as <code>img.src</code></p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>Options</td>
<td><code>PictureUploadOptions</code></td>
<td>uploader options</td>
</tr>
</tbody>
</table>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">src</span><span style="color: #C9D1D9"> </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">ref</span><span style="color: #C9D1D9">(</span><span style="color: #79C0FF">null</span><span style="color: #C9D1D9">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> {</span><span style="color: #79C0FF">state</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">handleUpload</span><span style="color: #C9D1D9">} </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">usePictureUpload</span><span style="color: #C9D1D9">({</span></span>
<span class="line"><span style="color: #C9D1D9"> preserveRatio: </span><span style="color: #79C0FF">true</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #C9D1D9">})</span></span>
<span class="line"></span>
<span class="line"><span style="color: #D2A8FF">watch</span><span style="color: #C9D1D9">(()</span><span style="color: #FF7B72">=&gt;</span><span style="color: #C9D1D9">state.output, </span><span style="color: #FFA657">file</span><span style="color: #C9D1D9"> </span><span style="color: #FF7B72">=&gt;</span><span style="color: #C9D1D9"> src.value </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> file.content)</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="pictureuploadoptions-object" tabindex="-1">PictureUploadOptions : <code>Object</code> <a class="header-anchor" href="#pictureuploadoptions-object" aria-hidden="true">#</a></h3>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>preserveRatio</td>
<td><code>Boolean</code></td>
<td>should we preserve the original picture aspect ratio? Default: <code>false</code></td>
</tr>
<tr>
<td>picSize</td>
<td><code>Number</code></td>
<td>width of the rendered picture</td>
</tr>
<tr>
<td>maxSize</td>
<td><code>Number</code></td>
<td>maximum size of an uploaded picture</td>
</tr>
</tbody>
</table>
<h3 id="pictureuploaddata-object" tabindex="-1">PictureUploadData : <code>Object</code> <a class="header-anchor" href="#pictureuploaddata-object" aria-hidden="true">#</a></h3>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>state</td>
<td><code>reactive</code></td>
<td>a reactive object with the state of the upload</td>
</tr>
<tr>
<td>handleUpload</td>
<td><code>function</code></td>
<td>handler function to use with <code>@change=&quot;handleUpload&quot;</code> on an <code>&lt;input type=&quot;file&quot;&gt;</code> element</td>
</tr>
</tbody>
</table>
<hr />
<p><a name="module_useMd"></a></p>
<h2 id="usemd" tabindex="-1">useMd <a class="header-anchor" href="#usemd" aria-hidden="true">#</a></h2>
<p>Handle Markdown files</p>
<ul>
<li><a href="#module_useMd" target="_blank">useMd</a>
<ul>
<li><em>static</em>
<ul>
<li><a href="#module_useMd.createMd" target="_blank">.createMd(md)</a> \u21D2</li>
<li><a href="#module_useMd.parseMd" target="_blank">.parseMd(file)</a> \u21D2 <code>Md</code></li>
</ul>
</li>
<li><em>inner</em>
<ul>
<li><a href="#module_useMd..Md" target="_blank">~Md</a> : <code>Object</code></li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="createmd-md-\u21D2" tabindex="-1">createMd(md) \u21D2 <a class="header-anchor" href="#createmd-md-\u21D2" aria-hidden="true">#</a></h3>
<p>Create markdown with frontmatter</p>
<p><strong>Returns</strong>: Markdown text file ready to download</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>md</td>
<td><code>Md</code></td>
<td>frontmatter,content</td>
</tr>
</tbody>
</table>
<h3 id="parsemd-file-\u21D2-md" tabindex="-1">parseMd(file) \u21D2 <code>Md</code> <a class="header-anchor" href="#parsemd-file-\u21D2-md" aria-hidden="true">#</a></h3>
<p>Parse text content of a markdown file into an object</p>
<p><strong>Returns</strong>: <code>Md</code> - - An object with md frontmatter and content</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>file</td>
<td><code>String</code></td>
<td>Text form of an uploaded file</td>
</tr>
</tbody>
</table>
<h3 id="md-object" tabindex="-1">Md : <code>Object</code> <a class="header-anchor" href="#md-object" aria-hidden="true">#</a></h3>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>frontmatter</td>
<td><code>Object</code></td>
</tr>
<tr>
<td>content</td>
<td><code>object</code></td>
</tr>
</tbody>
</table>
<hr />
<p><a name="module_useZip"></a></p>
<h2 id="usezip" tabindex="-1">useZip <a class="header-anchor" href="#usezip" aria-hidden="true">#</a></h2>
<p>Read and write zip files</p>
<p><strong>See</strong>: <a href="https://github.com/Stuk/jszip" target="_blank">https://github.com/Stuk/jszip</a></p>
<ul>
<li><a href="#module_useZip" target="_blank">useZip</a>
<ul>
<li><em>static</em>
<ul>
<li><a href="#module_useZip.useZip" target="_blank">.useZip()</a> \u21D2 <code>useZip</code>
<ul>
<li><a href="#module_useZip.useZip..addFile" target="_blank">~addFile(options)</a> \u21D2 <code>String</code></li>
<li><a href="#module_useZip.useZip..zipPost" target="_blank">~zipPost(post)</a></li>
</ul>
</li>
</ul>
</li>
<li><em>inner</em>
<ul>
<li><a href="#module_useZip..useZip" target="_blank">~useZip</a></li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="usezip-\u21D2-usezip" tabindex="-1">useZip() \u21D2 <code>useZip</code> <a class="header-anchor" href="#usezip-\u21D2-usezip" aria-hidden="true">#</a></h3>
<p>Zip file creation toolbox</p>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> {useZip} </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;@gun-vue/composables&#39;</span></span>
<span class="line"><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> { </span><span style="color: #79C0FF">zip</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">zipPost</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">addMd</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">addFile</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">downloadZip</span><span style="color: #C9D1D9"> } </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">useZip</span><span style="color: #C9D1D9">()</span></span>
<span class="line"></span></code></pre></div></code></pre>
<ul>
<li><a href="#module_useZip.useZip" target="_blank">.useZip()</a> \u21D2 <code>useZip</code>
<ul>
<li><a href="#module_useZip.useZip..addFile" target="_blank">~addFile(options)</a> \u21D2 <code>String</code></li>
<li><a href="#module_useZip.useZip..zipPost" target="_blank">~zipPost(post)</a></li>
</ul>
</li>
</ul>
<p><a name="module_useZip.useZip..addFile"></a></p>
<h4 id="addfile-options-\u21D2-string" tabindex="-1">addFile(options) \u21D2 <code>String</code> <a class="header-anchor" href="#addfile-options-\u21D2-string" aria-hidden="true">#</a></h4>
<p>Add a binary file to the zip</p>
<p><strong>Kind</strong>: inner method of <a href="#module_useZip.useZip" target="_blank"><code>useZip</code></a><br>
<strong>Returns</strong>: <code>String</code> - the resulting filename</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>options</td>
<td><code>Object</code></td>
</tr>
</tbody>
</table>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">if</span><span style="color: #C9D1D9"> (post.cover) { </span><span style="color: #8B949E">// a base64 encoded picture</span></span>
<span class="line"><span style="color: #C9D1D9">  </span><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">fileName</span><span style="color: #C9D1D9"> </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #FF7B72">await</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">addFile</span><span style="color: #C9D1D9">({</span></span>
<span class="line"><span style="color: #C9D1D9">    title: </span><span style="color: #A5D6FF">&quot;cover&quot;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #C9D1D9">    file: post.cover,</span></span>
<span class="line"><span style="color: #C9D1D9">    folder: post.title,</span></span>
<span class="line"><span style="color: #C9D1D9">  });</span></span>
<span class="line"><span style="color: #C9D1D9">  post.cover </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> fileName;</span></span>
<span class="line"><span style="color: #C9D1D9">}</span></span>
<span class="line"></span></code></pre></div></code></pre>
<p><a name="module_useZip.useZip..zipPost"></a></p>
<h4 id="zippost-post" tabindex="-1">zipPost(post) <a class="header-anchor" href="#zippost-post" aria-hidden="true">#</a></h4>
<p>Zips the whole post object</p>
<p><strong>Kind</strong>: inner method of <a href="#module_useZip.useZip" target="_blank"><code>useZip</code></a></p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>post</td>
<td><code>Object</code></td>
</tr>
</tbody>
</table>
<h3 id="usezip-1" tabindex="-1">useZip <a class="header-anchor" href="#usezip-1" aria-hidden="true">#</a></h3>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>zip</td>
<td><code>JSZip</code></td>
<td>a JSZip instance</td>
</tr>
<tr>
<td>zipPost</td>
<td><code>function</code></td>
<td>treats a post with md contents and cover and icon images and adds them to the zip</td>
</tr>
<tr>
<td>addMd</td>
<td><code>function</code></td>
<td>add a MD file to the zip</td>
</tr>
<tr>
<td>addFile</td>
<td><code>function</code></td>
<td>add a binary file to the zip</td>
</tr>
<tr>
<td>downloadZip</td>
<td><code>function</code></td>
<td>initiate the download of the zip file</td>
</tr>
</tbody>
</table>
<hr />
<p><a name="module_useGun"></a></p>
<h2 id="usegun" tabindex="-1">useGun <a class="header-anchor" href="#usegun" aria-hidden="true">#</a></h2>
<p>Gun DB initialization and basic methods</p>
<ul>
<li><a href="#module_useGun" target="_blank">useGun</a>
<ul>
<li><em>static</em>
<ul>
<li><a href="#module_useGun.gun" target="_blank">.gun</a></li>
<li><a href="#module_useGun.gun2" target="_blank">.gun2</a></li>
<li><a href="#module_useGun.useGun" target="_blank">.useGun(options)</a> \u21D2 <code>Gun</code></li>
<li><a href="#module_useGun.useGun2" target="_blank">.useGun2(options)</a> \u21D2 <code>Gun</code></li>
</ul>
</li>
<li><em>inner</em>
<ul>
<li><a href="#module_useGun..SEA" target="_blank">~SEA</a></li>
<li><a href="#module_useGun..soul" target="_blank">~soul()</a></li>
<li><a href="#module_useGun..genUUID" target="_blank">~genUUID()</a></li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="gun" tabindex="-1">gun <a class="header-anchor" href="#gun" aria-hidden="true">#</a></h3>
<p>The main Gun instance for database operations</p>
<h3 id="gun2" tabindex="-1">gun2 <a class="header-anchor" href="#gun2" aria-hidden="true">#</a></h3>
<p>Secondary Gun instance for key management</p>
<h3 id="usegun-options-\u21D2-gun" tabindex="-1">useGun(options) \u21D2 <code>Gun</code> <a class="header-anchor" href="#usegun-options-\u21D2-gun" aria-hidden="true">#</a></h3>
<p>Instantiate a Gun instance for DB manipulations</p>
<table localstorage:true="">
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>options</td>
<td><code>Object</code></td>
<td>options fot this gun instance, like</td>
</tr>
</tbody>
</table>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> { useGun } </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;@gun-vue/composables&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">gun</span><span style="color: #C9D1D9"> </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">useGun</span><span style="color: #C9D1D9">()</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="usegun2-options-\u21D2-gun" tabindex="-1">useGun2(options) \u21D2 <code>Gun</code> <a class="header-anchor" href="#usegun2-options-\u21D2-gun" aria-hidden="true">#</a></h3>
<p>get a secondary Gun instance for certificate management</p>
<table localstorage:true="">
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>options</td>
<td><code>object</code></td>
<td>options fot this gun instance, like</td>
</tr>
</tbody>
</table>
<h3 id="sea" tabindex="-1">SEA <a class="header-anchor" href="#sea" aria-hidden="true">#</a></h3>
<p>SEA library</p>
<h3 id="soul" tabindex="-1">soul() <a class="header-anchor" href="#soul" aria-hidden="true">#</a></h3>
<p><strong>Get a soul for any given node</strong><br>
A wrapper for <code>Gun.node.soul</code></p>
<h3 id="genuuid" tabindex="-1">genUUID() <a class="header-anchor" href="#genuuid" aria-hidden="true">#</a></h3>
<p><strong>Generate a random UUID</strong><br>
A wrapper for <code>Gun.text.random</code></p>
<hr />
<p><a name="module_useRelay"></a></p>
<h2 id="userelay" tabindex="-1">useRelay <a class="header-anchor" href="#userelay" aria-hidden="true">#</a></h2>
<p>Relay connection management</p>
<ul>
<li><a href="#module_useRelay" target="_blank">useRelay</a>
<ul>
<li><em>static</em>
<ul>
<li><a href="#module_useRelay.useRelay" target="_blank">.useRelay()</a> \u21D2 <code>useRelay</code></li>
</ul>
</li>
<li><em>inner</em>
<ul>
<li><a href="#module_useRelay..Relay" target="_blank">~Relay</a> : <code>reactive</code></li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="userelay-\u21D2-userelay" tabindex="-1">useRelay() \u21D2 <code>useRelay</code> <a class="header-anchor" href="#userelay-\u21D2-userelay" aria-hidden="true">#</a></h3>
<p>Peer server status monitor</p>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> { useRelay } </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;@gun-vue/composables&#39;</span><span style="color: #C9D1D9">;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> { </span><span style="color: #79C0FF">relay</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">setPeer</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">resetPeer</span><span style="color: #C9D1D9"> } </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">useRelay</span><span style="color: #C9D1D9">()</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="relay-reactive" tabindex="-1">Relay : <code>reactive</code> <a class="header-anchor" href="#relay-reactive" aria-hidden="true">#</a></h3>
<p>Peer server status reactive object</p>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>host</td>
<td><code>String</code></td>
<td>the current peer server URL</td>
</tr>
<tr>
<td>status</td>
<td><code>String</code></td>
<td>current connection status</td>
</tr>
<tr>
<td>started</td>
<td><code>Number</code></td>
<td>the timestamp of server started current session</td>
</tr>
<tr>
<td>pulse</td>
<td><code>Number</code></td>
<td>last received timestamp</td>
</tr>
<tr>
<td>lag</td>
<td><code>Number</code></td>
<td>drift of the timestamp in ms</td>
</tr>
<tr>
<td>diff</td>
<td><code>Number</code></td>
<td>age of the session in ms</td>
</tr>
<tr>
<td>age</td>
<td><code>String</code></td>
<td>age of the session in human readable format</td>
</tr>
<tr>
<td>blink</td>
<td><code>Boolean</code></td>
<td>a Boolean toggled every time the new pulse comes to drive animations</td>
</tr>
</tbody>
</table>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #C9D1D9">{</span></span>
<span class="line"><span style="color: #A5D6FF">&quot;peer&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;https://etogun.glitch.me/gun&quot;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #A5D6FF">&quot;host&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;6db1edbb5aae&quot;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #A5D6FF">&quot;status&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;running&quot;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #A5D6FF">&quot;started&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #79C0FF">1642666725795</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #A5D6FF">&quot;pulse&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #79C0FF">1642677007483</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #A5D6FF">&quot;lag&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #79C0FF">8</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #A5D6FF">&quot;diff&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #79C0FF">10281688</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #A5D6FF">&quot;age&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;3h&quot;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #A5D6FF">&quot;delay&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #79C0FF">22</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #A5D6FF">&quot;blink&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #79C0FF">true</span></span>
<span class="line"><span style="color: #C9D1D9">}</span></span>
<span class="line"></span></code></pre></div></code></pre>
<hr />
<p><a name="module_useRelays"></a></p>
<h2 id="userelays" tabindex="-1">useRelays <a class="header-anchor" href="#userelays" aria-hidden="true">#</a></h2>
<p>Loads the <a href="https://github.com/amark/gun/wiki/volunteer.dht" target="_blank">list of active volunteer DHT gun nodes</a>  and benchmarks ping for them</p>
<ul>
<li><a href="#module_useRelays" target="_blank">useRelays</a>
<ul>
<li><em>static</em>
<ul>
<li><a href="#module_useRelays.loadRelays" target="_blank">.loadRelays(loadRelaysOptions)</a> \u21D2 <code>relays</code></li>
<li><a href="#module_useRelays.useRelays" target="_blank">.useRelays()</a> \u21D2 <code>useRelays</code></li>
</ul>
</li>
<li><em>inner</em>
<ul>
<li><a href="#module_useRelays..useRelays" target="_blank">~useRelays</a> : <code>Object</code></li>
<li><a href="#module_useRelays..loadRelaysOptions" target="_blank">~loadRelaysOptions</a> : <code>Object</code></li>
<li><a href="#module_useRelays..Relays" target="_blank">~Relays</a> : <code>Array.&lt;Object&gt;</code></li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="loadrelays-loadrelaysoptions-\u21D2-relays" tabindex="-1">loadRelays(loadRelaysOptions) \u21D2 <code>relays</code> <a class="header-anchor" href="#loadrelays-loadrelaysoptions-\u21D2-relays" aria-hidden="true">#</a></h3>
<p>Load the list of the relays</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>loadRelaysOptions</td>
<td><code>Object</code></td>
</tr>
</tbody>
</table>
<h3 id="userelays-\u21D2-userelays" tabindex="-1">useRelays() \u21D2 <code>useRelays</code> <a class="header-anchor" href="#userelays-\u21D2-userelays" aria-hidden="true">#</a></h3>
<p>Gets the list of actual gun relays and tool to update the list</p>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> { useRelays } </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;@gun-vue/composables&#39;</span></span>
<span class="line"><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> { </span><span style="color: #79C0FF">relays</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">errors</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">loadRelays</span><span style="color: #C9D1D9"> } </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">useRelays</span><span style="color: #C9D1D9">()</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="userelays-object" tabindex="-1">useRelays : <code>Object</code> <a class="header-anchor" href="#userelays-object" aria-hidden="true">#</a></h3>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>Relays</td>
<td><code>Object</code></td>
</tr>
<tr>
<td>Errors</td>
<td><code>Object</code></td>
</tr>
<tr>
<td>loadRelays</td>
<td><code>function</code></td>
</tr>
</tbody>
</table>
<h3 id="loadrelaysoptions-object" tabindex="-1">loadRelaysOptions : <code>Object</code> <a class="header-anchor" href="#loadrelaysoptions-object" aria-hidden="true">#</a></h3>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>source</td>
<td><code>String</code></td>
</tr>
</tbody>
</table>
<h3 id="relays-array-object" tabindex="-1">Relays : <code>Array.&lt;Object&gt;</code> <a class="header-anchor" href="#relays-array-object" aria-hidden="true">#</a></h3>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>hostname</td>
<td><code>String</code></td>
</tr>
<tr>
<td>url</td>
<td><code>String</code></td>
</tr>
<tr>
<td>ping</td>
<td><code>Number</code></td>
</tr>
</tbody>
</table>
<hr />
<p><a name="module_useLog"></a></p>
<h2 id="uselog" tabindex="-1">useLog <a class="header-anchor" href="#uselog" aria-hidden="true">#</a></h2>
<p>Reactive version of <code>gun-util</code> Date tree</p>
<hr />
<p><a name="module_useWorker"></a></p>
<h2 id="useworker" tabindex="-1">useWorker <a class="header-anchor" href="#useworker" aria-hidden="true">#</a></h2>
<p>Worker wrapper for heavy functions</p>
<ul>
<li><a href="#module_useWorker" target="_blank">useWorker</a>
<ul>
<li><a href="#module_useWorker.newWorker" target="_blank">.newWorker</a></li>
<li><a href="#module_useWorker.sortByDate" target="_blank">.sortByDate(e)</a></li>
</ul>
</li>
</ul>
<h3 id="newworker" tabindex="-1">newWorker <a class="header-anchor" href="#newworker" aria-hidden="true">#</a></h3>
<p>Create a new worker for a function<br>
It should contain a <code>postMessage</code> method to reply to any incoming <code>postMessage</code> from the main script</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>funcObj</td>
<td><code>function</code></td>
</tr>
</tbody>
</table>
<h3 id="sortbydate-e" tabindex="-1">sortByDate(e) <a class="header-anchor" href="#sortbydate-e" aria-hidden="true">#</a></h3>
<p>Example sorter function for a dated list object</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>e</td>
<td><code>Object</code></td>
<td>the worker post event with a <code>data</code> object with a list of records to sort by the date keys</td>
</tr>
</tbody>
</table>
<hr />
<p><a name="module_usePost"></a></p>
<h2 id="usepost" tabindex="-1">usePost <a class="header-anchor" href="#usepost" aria-hidden="true">#</a></h2>
<p>Get and handle a particular post by it's tag and hash</p>
<ul>
<li><a href="#module_usePost" target="_blank">usePost</a>
<ul>
<li><em>static</em>
<ul>
<li><a href="#module_usePost.usePost" target="_blank">.usePost(options)</a> \u21D2 <code>Post</code></li>
<li><a href="#module_usePost.addPost" target="_blank">.addPost(tag, post)</a></li>
<li><a href="#module_usePost.downloadPost" target="_blank">.downloadPost(post)</a></li>
<li><a href="#module_usePost.parsePost" target="_blank">.parsePost(data)</a> \u21D2 <code>Object</code></li>
<li><a href="#module_usePost.usePostTimestamp" target="_blank">.usePostTimestamp()</a> \u21D2</li>
</ul>
</li>
<li><em>inner</em>
<ul>
<li><a href="#module_usePost..Post" target="_blank">~Post</a> : <code>Object</code></li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="usepost-options-\u21D2-post" tabindex="-1">usePost(options) \u21D2 <code>Post</code> <a class="header-anchor" href="#usepost-options-\u21D2-post" aria-hidden="true">#</a></h3>
<p>An interface to manage a post</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>options</td>
<td><code>Object</code></td>
</tr>
</tbody>
</table>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">post</span><span style="color: #C9D1D9"> </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">usePost</span><span style="color: #C9D1D9">({ tag: </span><span style="color: #A5D6FF">&#39;tag&#39;</span><span style="color: #C9D1D9">, hash: postHash })</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="addpost-tag-post" tabindex="-1">addPost(tag, post) <a class="header-anchor" href="#addpost-tag-post" aria-hidden="true">#</a></h3>
<p>Add a new post to a tag</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>tag</td>
<td><code>String</code></td>
</tr>
<tr>
<td>post</td>
<td><code>Object</code></td>
</tr>
</tbody>
</table>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> { addPost } </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;@gun-vue/composables&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #D2A8FF">addPost</span><span style="color: #C9D1D9">(</span><span style="color: #A5D6FF">&#39;MyTag&#39;</span><span style="color: #C9D1D9">, {</span></span>
<span class="line"><span style="color: #C9D1D9"> title: </span><span style="color: #A5D6FF">&#39;New post&#39;</span></span>
<span class="line"><span style="color: #C9D1D9">})</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="downloadpost-post" tabindex="-1">downloadPost(post) <a class="header-anchor" href="#downloadpost-post" aria-hidden="true">#</a></h3>
<p>Download the post as a zip file with MD contents and icon and cover pictures if present</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>post</td>
<td><code>Post</code></td>
</tr>
</tbody>
</table>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> { downloadPost, usePost } </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;@gun-vue/composables&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> {</span><span style="color: #79C0FF">post</span><span style="color: #C9D1D9">} </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">usePost</span><span style="color: #C9D1D9">( postTag, postHash )</span></span>
<span class="line"></span>
<span class="line"><span style="color: #D2A8FF">downloadPost</span><span style="color: #C9D1D9">(post)</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="parsepost-data-\u21D2-object" tabindex="-1">parsePost(data) \u21D2 <code>Object</code> <a class="header-anchor" href="#parsepost-data-\u21D2-object" aria-hidden="true">#</a></h3>
<p>Parse a post string from db</p>
<p><strong>Returns</strong>: <code>Object</code> - Post object</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>data</td>
<td><code>String</code></td>
<td>Stringified data from the hashed post</td>
</tr>
</tbody>
</table>
<h3 id="useposttimestamp-\u21D2" tabindex="-1">usePostTimestamp() \u21D2 <a class="header-anchor" href="#useposttimestamp-\u21D2" aria-hidden="true">#</a></h3>
<p>Get and update the timestamp of an immutable post</p>
<p timestamp,="" msTime,="" refresh=""><strong>Returns</strong>: -</p>
<table tag,="" hash="">
<thead>
<tr>
<th>Param</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="post-object" tabindex="-1">Post : <code>Object</code> <a class="header-anchor" href="#post-object" aria-hidden="true">#</a></h3>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>empty</td>
<td><code>Boolean</code></td>
<td>whether the post has contents</td>
</tr>
<tr>
<td>tag</td>
<td><code>String</code></td>
<td>the tag under which the post was published</td>
</tr>
<tr>
<td>hash</td>
<td><code>String</code></td>
<td>the hash of the contents</td>
</tr>
<tr>
<td>data</td>
<td><code>Object</code></td>
<td>the contents of the post</td>
</tr>
<tr>
<td>download</td>
<td><code>function</code></td>
<td>use this function to download the post as a Markdown file</td>
</tr>
</tbody>
</table>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #C9D1D9">{</span></span>
<span class="line"><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&quot;empty&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #79C0FF">false</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&quot;tag&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;ds&quot;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&quot;hash&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;C8trDBYNyvxVedHK4Q0IuUarc/k2/iiv8opPfoAU0xA=&quot;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&quot;data&quot;</span><span style="color: #C9D1D9">: {</span></span>
<span class="line"><span style="color: #C9D1D9">   </span><span style="color: #A5D6FF">&quot;cover&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;data:image/png;base64,..........&quot;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #C9D1D9">   </span><span style="color: #A5D6FF">&quot;icon&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;data:image/png;base64,..........&quot;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #C9D1D9">   </span><span style="color: #A5D6FF">&quot;title&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;OSS&quot;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #C9D1D9">   </span><span style="color: #A5D6FF">&quot;statement&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;New live album by tsoop&quot;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #C9D1D9">   </span><span style="color: #A5D6FF">&quot;youtube&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;K2MwpOd8vEI&quot;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #C9D1D9">   </span><span style="color: #A5D6FF">&quot;content&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;It&#39;s mostly op-z + op-1 with my own Unity visuals based on [Chromatone](https://chromatone.center) system.</span><span style="color: #79C0FF">\\n\\n</span><span style="color: #A5D6FF">### 2021</span><span style="color: #79C0FF">\\n</span><span style="color: #A5D6FF">First played live at April 20th **2021**.</span><span style="color: #79C0FF">\\n\\n</span><span style="color: #A5D6FF">### Into 2022</span><span style="color: #79C0FF">\\n</span><span style="color: #A5D6FF">It&#39;s an ongoing live album to be recorded throughout the **2022**.&quot;</span></span>
<span class="line"><span style="color: #C9D1D9">},</span></span>
<span class="line"><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&quot;timestamp&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #79C0FF">1642590655747</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&quot;lastUpdated&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;1d&quot;</span></span>
<span class="line"><span style="color: #C9D1D9">}</span></span>
<span class="line"></span></code></pre></div></code></pre>
<hr />
<p><a name="module_usePosts"></a></p>
<h2 id="useposts" tabindex="-1">usePosts <a class="header-anchor" href="#useposts" aria-hidden="true">#</a></h2>
<p>Get and handle a particular post by it's tag and hash</p>
<ul>
<li><a href="#module_usePosts" target="_blank">usePosts</a>
<ul>
<li><em>static</em>
<ul>
<li><a href="#module_usePosts.usePosts" target="_blank">.usePosts(tag, options)</a> \u21D2 <code>usePosts</code></li>
<li><a href="#module_usePosts.downloadFeed" target="_blank">.downloadFeed(tag, posts)</a></li>
<li><a href="#module_usePosts.uploadFeed" target="_blank">.uploadFeed(tag, files)</a></li>
</ul>
</li>
<li><em>inner</em>
<ul>
<li><a href="#module_usePosts..usePosts" target="_blank">~usePosts</a></li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="useposts-tag-options-\u21D2-useposts" tabindex="-1">usePosts(tag, options) \u21D2 <code>usePosts</code> <a class="header-anchor" href="#useposts-tag-options-\u21D2-useposts" aria-hidden="true">#</a></h3>
<p>Use a list of immutable data from a #tag</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>tag</td>
<td><code>String</code></td>
<td>A vue ref to watch - generated from props by <code>toRef(props,'tag')</code></td>
</tr>
<tr>
<td>options</td>
<td><code>Object</code></td>
<td>Options for the feed</td>
</tr>
</tbody>
</table>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> { usePosts } </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;@gun-vue/composables&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> { </span><span style="color: #79C0FF">posts</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">timestamps</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">count</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">uploadPosts</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">downloadPosts</span><span style="color: #C9D1D9">} </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">usePosts</span><span style="color: #C9D1D9">(</span><span style="color: #A5D6FF">&#39;MyTag&#39;</span><span style="color: #C9D1D9">)</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="downloadfeed-tag-posts" tabindex="-1">downloadFeed(tag, posts) <a class="header-anchor" href="#downloadfeed-tag-posts" aria-hidden="true">#</a></h3>
<p>Export a list of posts as a zip file</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>tag</td>
<td><code>String</code></td>
<td>Name of the tag</td>
</tr>
<tr>
<td>posts</td>
<td><code>Object</code></td>
<td>Posts to export</td>
</tr>
</tbody>
</table>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> {downloadFeed} </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;@gun-vue/components&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #D2A8FF">downloadFeed</span><span style="color: #C9D1D9">(</span><span style="color: #A5D6FF">&#39;myTag&#39;</span><span style="color: #C9D1D9">,posts)</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="uploadfeed-tag-files" tabindex="-1">uploadFeed(tag, files) <a class="header-anchor" href="#uploadfeed-tag-files" aria-hidden="true">#</a></h3>
<p>Upload zip files and add all the MD files from it to the tag</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>tag</td>
<td><code>String</code></td>
<td>a tag to add the posts to</td>
</tr>
<tr>
<td>files</td>
<td><code>FileList</code></td>
<td>File list from the input <code>@change</code> event</td>
</tr>
</tbody>
</table>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> { uploadFeed } </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;@gun-vue/composables&#39;</span></span>
<span class="line"></span></code></pre></div></code></pre>
<p><strong>Example</strong></p>
<pre><code class="language-html"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">html</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #C9D1D9">&lt;</span><span style="color: #7EE787">input</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">type</span><span style="color: #C9D1D9">=</span><span style="color: #A5D6FF">&quot;file&quot;</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">@change</span><span style="color: #C9D1D9">=</span><span style="color: #A5D6FF">&quot;uploadFeed( &#39;myTag&#39;, $event.target.files )&quot;</span><span style="color: #C9D1D9"> /&gt;</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="useposts-1" tabindex="-1">usePosts <a class="header-anchor" href="#useposts-1" aria-hidden="true">#</a></h3>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>posts</td>
<td><code>ref</code></td>
<td>the reactive list of hashed data</td>
</tr>
<tr>
<td>timestamps</td>
<td><code>ref</code></td>
<td>reactive timestamps list for all posts in a list</td>
</tr>
<tr>
<td>count</td>
<td><code>computed</code></td>
<td>the number of posts in a feed</td>
</tr>
<tr>
<td>downloadPosts</td>
<td><code>function</code></td>
<td>Download all posts in a zip file</td>
</tr>
<tr>
<td>uploadPosts</td>
<td><code>function</code></td>
<td>upload a zip file with posts</td>
</tr>
</tbody>
</table>
<hr />
<p><a name="module_useReaction"></a></p>
<h2 id="usereaction" tabindex="-1">useReaction <a class="header-anchor" href="#usereaction" aria-hidden="true">#</a></h2>
<p>React to posts with emojis</p>
<hr />
<p><a name="module_useReactions"></a></p>
<h2 id="usereactions" tabindex="-1">useReactions <a class="header-anchor" href="#usereactions" aria-hidden="true">#</a></h2>
<p>Reactions to posts with emojis</p>
<hr />
<p><a name="module_useTags"></a></p>
<h2 id="usetags" tabindex="-1">useTags <a class="header-anchor" href="#usetags" aria-hidden="true">#</a></h2>
<p>Get and handle a particular post by it's tag and hash</p>
<ul>
<li><a href="#module_useTags" target="_blank">useTags</a>
<ul>
<li><em>static</em>
<ul>
<li><a href="#module_useTags.useTagList" target="_blank">.useTagList()</a> \u21D2 <code>useTagList</code></li>
</ul>
</li>
<li><em>inner</em>
<ul>
<li><a href="#module_useTags..useTagList" target="_blank">~useTagList</a></li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="usetaglist-\u21D2-usetaglist" tabindex="-1">useTagList() \u21D2 <code>useTagList</code> <a class="header-anchor" href="#usetaglist-\u21D2-usetaglist" aria-hidden="true">#</a></h3>
<p>Toolkit to deal with the available tags</p>
<h3 id="usetaglist" tabindex="-1">useTagList <a class="header-anchor" href="#usetaglist" aria-hidden="true">#</a></h3>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>search</td>
<td><code>ref</code></td>
<td>a ref to bind to an input element</td>
</tr>
<tr>
<td>slug</td>
<td><code>computed</code></td>
<td>a slugified search query - url safe verion to be used as a tag</td>
</tr>
<tr>
<td>tags</td>
<td><code>Tags</code></td>
<td>the object to handle all the tags</td>
</tr>
<tr>
<td>addTag</td>
<td><code>function</code></td>
<td>add a slug tag to the list</td>
</tr>
</tbody>
</table>
<hr />
<p><a name="module_Projects"></a></p>
<h2 id="projects" tabindex="-1">Projects <a class="header-anchor" href="#projects" aria-hidden="true">#</a></h2>
<hr />
<p><a name="module_useRoom"></a></p>
<h2 id="useroom" tabindex="-1">useRoom <a class="header-anchor" href="#useroom" aria-hidden="true">#</a></h2>
<ul>
<li><a href="#module_useRoom" target="_blank">useRoom</a>
<ul>
<li><a href="#module_useRoom.useRoom" target="_blank">.useRoom()</a> \u21D2 <code>useRoom</code></li>
<li><a href="#module_useRoom.updateRoomProfile" target="_blank">.updateRoomProfile(field, content)</a></li>
<li><a href="#module_useRoom.createRoom" target="_blank">.createRoom()</a></li>
<li><a href="#module_useRoom.enterRoom" target="_blank">.enterRoom(pub)</a></li>
<li><a href="#module_useRoom.leaveRoom" target="_blank">.leaveRoom()</a></li>
</ul>
</li>
</ul>
<h3 id="useroom-\u21D2-useroom" tabindex="-1">useRoom() \u21D2 <code>useRoom</code> <a class="header-anchor" href="#useroom-\u21D2-useroom" aria-hidden="true">#</a></h3>
<p>Reactive room controls</p>
<h3 id="updateroomprofile-field-content" tabindex="-1">updateRoomProfile(field, content) <a class="header-anchor" href="#updateroomprofile-field-content" aria-hidden="true">#</a></h3>
<p>Update a profile field of a room</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>field</td>
<td><code>String</code></td>
<td>parameter to write to</td>
</tr>
<tr>
<td>content</td>
<td><code>String</code></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="createroom" tabindex="-1">createRoom() <a class="header-anchor" href="#createroom" aria-hidden="true">#</a></h3>
<p>Create a new room inside the current room</p>
<h3 id="enterroom-pub" tabindex="-1">enterRoom(pub) <a class="header-anchor" href="#enterroom-pub" aria-hidden="true">#</a></h3>
<p>The right way to come inside a room</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>pub</td>
<td><code>String</code></td>
</tr>
</tbody>
</table>
<h3 id="leaveroom" tabindex="-1">leaveRoom() <a class="header-anchor" href="#leaveroom" aria-hidden="true">#</a></h3>
<p>Leave the room</p>
<hr />
<p><a name="module_useSpace"></a></p>
<h2 id="usespace" tabindex="-1">useSpace <a class="header-anchor" href="#usespace" aria-hidden="true">#</a></h2>
<p>A 2D-space</p>
<ul>
<li><a href="#module_useSpace" target="_blank">useSpace</a>
<ul>
<li><em>static</em>
<ul>
<li><a href="#module_useSpace.useSpace" target="_blank">.useSpace()</a> \u21D2 <code>useSpace</code></li>
</ul>
</li>
<li><em>inner</em>
<ul>
<li><a href="#module_useSpace..useSpace" target="_blank">~useSpace</a> : <code>Object</code></li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="usespace-\u21D2-usespace" tabindex="-1">useSpace() \u21D2 <code>useSpace</code> <a class="header-anchor" href="#usespace-\u21D2-usespace" aria-hidden="true">#</a></h3>
<p>A space to navigate with mouse clicks</p>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> { </span><span style="color: #79C0FF">space</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">plane</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">links</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">width</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">height</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">guests</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">area</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">join</span><span style="color: #C9D1D9"> } </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">useSpace</span><span style="color: #C9D1D9">({</span></span>
<span class="line"><span style="color: #C9D1D9">TIMEOUT: </span><span style="color: #79C0FF">10000</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #C9D1D9">})</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="usespace-object" tabindex="-1">useSpace : <code>Object</code> <a class="header-anchor" href="#usespace-object" aria-hidden="true">#</a></h3>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>space</td>
<td><code>reactive</code></td>
<td>The main object</td>
</tr>
<tr>
<td>guests</td>
<td><code>reactive</code></td>
<td>Active guests</td>
</tr>
<tr>
<td>links</td>
<td><code>reactive</code></td>
<td>Links between active guests</td>
</tr>
<tr>
<td>plane</td>
<td><code>ref</code></td>
<td>The SVG element</td>
</tr>
<tr>
<td>area</td>
<td><code>ref</code></td>
<td>The rect element for mouse events capture</td>
</tr>
<tr>
<td>width</td>
<td><code>ref</code></td>
<td>Width of the plane</td>
</tr>
<tr>
<td>height</td>
<td><code>ref</code></td>
<td>Height of the plane</td>
</tr>
<tr>
<td>join</td>
<td><code>function</code></td>
<td>Join the space with the current user</td>
</tr>
</tbody>
</table>
<hr />
<p><a name="module_useColor"></a></p>
<h2 id="usecolor" tabindex="-1">useColor <a class="header-anchor" href="#usecolor" aria-hidden="true">#</a></h2>
<p>Deterministic colors derived from oub keys, hashes or any other string data</p>
<h3 id="usecolor-palette-\u21D2-colorhash" tabindex="-1">useColor(palette) \u21D2 <code>ColorHash</code> <a class="header-anchor" href="#usecolor-palette-\u21D2-colorhash" aria-hidden="true">#</a></h3>
<p>Get a color generator of a certain palette</p>
<p><strong>Returns</strong>: <code>ColorHash</code> - Color-Hash instance<br>
<strong>See</strong>: <a href="https://github.com/zenozeng/color-hash" target="_blank">https://github.com/zenozeng/color-hash</a></p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>palette</td>
<td><code>'light'</code> | <code>'regular'</code> | <code>'deep'</code> | <code>'dark'</code></td>
</tr>
</tbody>
</table>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> {useColor} </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;@gun-vue/composables&#39;</span></span>
<span class="line"><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">colorDeep</span><span style="color: #C9D1D9"> </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">useColor</span><span style="color: #C9D1D9">(</span><span style="color: #A5D6FF">&#39;deep&#39;</span><span style="color: #C9D1D9">)</span></span>
<span class="line"><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">color</span><span style="color: #C9D1D9"> </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> colorDeep.</span><span style="color: #D2A8FF">hex</span><span style="color: #C9D1D9">(</span><span style="color: #A5D6FF">&#39;any text data&#39;</span><span style="color: #C9D1D9">)</span></span>
<span class="line"><span style="color: #8B949E">// color == &#39;#e052ae&#39;</span></span>
<span class="line"></span></code></pre></div></code></pre>
<hr />
<p><a name="module_useMouse"></a></p>
<h2 id="usemouse" tabindex="-1">useMouse <a class="header-anchor" href="#usemouse" aria-hidden="true">#</a></h2>
<p>Handle mouse movement inside an SVG</p>
<ul>
<li><a href="#module_useMouse" target="_blank">useMouse</a>
<ul>
<li><em>static</em>
<ul>
<li><a href="#module_useMouse.useSvgMouse" target="_blank">.useSvgMouse()</a> \u21D2 <code>useMouse</code></li>
</ul>
</li>
<li><em>inner</em>
<ul>
<li><a href="#module_useMouse..useMouse" target="_blank">~useMouse</a> : <code>Object</code></li>
<li><a href="#module_useMouse..Mouse" target="_blank">~Mouse</a> : <code>reactive</code></li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="usesvgmouse-\u21D2-usemouse" tabindex="-1">useSvgMouse() \u21D2 <code>useMouse</code> <a class="header-anchor" href="#usesvgmouse-\u21D2-usemouse" aria-hidden="true">#</a></h3>
<p>Correct mouse position in an SVG space</p>
<h3 id="usemouse-object" tabindex="-1">useMouse : <code>Object</code> <a class="header-anchor" href="#usemouse-object" aria-hidden="true">#</a></h3>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>area</td>
<td><code>ref</code></td>
<td>an area to mount the mouse to</td>
</tr>
<tr>
<td>mouse</td>
<td><code>Mouse</code></td>
<td>the reactive mouse parameters</td>
</tr>
</tbody>
</table>
<h3 id="mouse-reactive" tabindex="-1">Mouse : <code>reactive</code> <a class="header-anchor" href="#mouse-reactive" aria-hidden="true">#</a></h3>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>x</td>
<td><code>Number</code></td>
<td>absolute X coordinate to place a marker to</td>
</tr>
<tr>
<td>y</td>
<td><code>Number</code></td>
<td>absolute Y coordinate to place a marker to</td>
</tr>
<tr>
<td>normX</td>
<td><code>Number</code></td>
<td>[0-1] relative X coordinate</td>
</tr>
<tr>
<td>normY</td>
<td><code>Number</code></td>
<td>[0-1] relative Y coordinate</td>
</tr>
<tr>
<td>pressed</td>
<td><code>Boolean</code></td>
<td>is mouse pressed?</td>
</tr>
<tr>
<td>inside</td>
<td><code>Boolean</code></td>
<td>is mouse inside the area?</td>
</tr>
</tbody>
</table>
<hr />
<p><a name="module_useMates"></a></p>
<h2 id="usemates" tabindex="-1">useMates <a class="header-anchor" href="#usemates" aria-hidden="true">#</a></h2>
<p>Connections between accounts</p>
<ul>
<li><a href="#module_useMates" target="_blank">useMates</a>
<ul>
<li><em>static</em>
<ul>
<li><a href="#module_useMates.useMates" target="_blank">.useMates(pub)</a> \u21D2 <code>useMates</code></li>
<li><a href="#module_useMates.getFirstEmoji" target="_blank">.getFirstEmoji(text)</a> \u21D2 <code>String</code></li>
<li><a href="#module_useMates.isEmoji" target="_blank">.isEmoji(text)</a> \u21D2 <code>Boolean</code></li>
<li><a href="#module_useMates.useMate" target="_blank">.useMate(pub)</a> \u21D2 <code>useMate</code></li>
</ul>
</li>
<li><em>inner</em>
<ul>
<li><a href="#module_useMates..useMates" target="_blank">~useMates</a> : <code>reactive</code></li>
<li><a href="#module_useMates..useMate" target="_blank">~useMate</a> : <code>Object</code></li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="usemates-pub-\u21D2-usemates" tabindex="-1">useMates(pub) \u21D2 <code>useMates</code> <a class="header-anchor" href="#usemates-pub-\u21D2-usemates" aria-hidden="true">#</a></h3>
<p>Get a reactive list of the user's mates</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>pub</td>
<td><code>String</code></td>
</tr>
</tbody>
</table>
<h3 id="getfirstemoji-text-\u21D2-string" tabindex="-1">getFirstEmoji(text) \u21D2 <code>String</code> <a class="header-anchor" href="#getfirstemoji-text-\u21D2-string" aria-hidden="true">#</a></h3>
<p>Break the string into graphemes and return the first one if it's an emoji</p>
<p><strong>Returns</strong>: <code>String</code> - Emoji</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>text</td>
<td><code>String</code></td>
</tr>
</tbody>
</table>
<h3 id="isemoji-text-\u21D2-boolean" tabindex="-1">isEmoji(text) \u21D2 <code>Boolean</code> <a class="header-anchor" href="#isemoji-text-\u21D2-boolean" aria-hidden="true">#</a></h3>
<p>Check if the text has emojis</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>text</td>
<td><code>String</code></td>
</tr>
</tbody>
</table>
<h3 id="usemate-pub-\u21D2-usemate" tabindex="-1">useMate(pub) \u21D2 <code>useMate</code> <a class="header-anchor" href="#usemate-pub-\u21D2-usemate" aria-hidden="true">#</a></h3>
<p>Make mates with some account by current user</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>pub</td>
<td><code>String</code></td>
</tr>
</tbody>
</table>
<h3 id="usemates-reactive" tabindex="-1">useMates : <code>reactive</code> <a class="header-anchor" href="#usemates-reactive" aria-hidden="true">#</a></h3>
<h3 id="usemate-object" tabindex="-1">useMate : <code>Object</code> <a class="header-anchor" href="#usemate-object" aria-hidden="true">#</a></h3>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>emoji</td>
<td><code>ref</code></td>
<td>change it in an input</td>
</tr>
<tr>
<td>isMate</td>
<td><code>ref</code></td>
<td>reactive state of connection</td>
</tr>
<tr>
<td>toggleMate</td>
<td><code>function</code></td>
<td>toggle the link with current <code>emoji</code> ref</td>
</tr>
</tbody>
</table>
<hr />
<p><a name="module_usePass"></a></p>
<h2 id="usepass" tabindex="-1">usePass <a class="header-anchor" href="#usepass" aria-hidden="true">#</a></h2>
<p>Manage user's password and credentials</p>
<ul>
<li><a href="#module_usePass" target="_blank">usePass</a>
<ul>
<li><em>static</em>
<ul>
<li><a href="#module_usePass.usePass" target="_blank">.usePass()</a> \u21D2 <code>usePass</code></li>
</ul>
</li>
<li><em>inner</em>
<ul>
<li><a href="#module_usePass..Pass" target="_blank">~Pass</a> : <code>reactive</code></li>
<li><a href="#module_usePass..usePass" target="_blank">~usePass</a> : <code>Object</code></li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="usepass-\u21D2-usepass" tabindex="-1">usePass() \u21D2 <code>usePass</code> <a class="header-anchor" href="#usepass-\u21D2-usepass" aria-hidden="true">#</a></h3>
<p>Manage password of a user</p>
<h3 id="pass-reactive" tabindex="-1">Pass : <code>reactive</code> <a class="header-anchor" href="#pass-reactive" aria-hidden="true">#</a></h3>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>safe</td>
<td><code>Object</code></td>
</tr>
<tr>
<td>dec</td>
<td><code>Object</code></td>
</tr>
</tbody>
</table>
<h3 id="usepass-object" tabindex="-1">usePass : <code>Object</code> <a class="header-anchor" href="#usepass-object" aria-hidden="true">#</a></h3>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>pass</td>
<td><code>Pass</code></td>
<td>the reactive password object</td>
</tr>
<tr>
<td>setPass</td>
<td><code>function</code></td>
<td></td>
</tr>
<tr>
<td>logWithPass</td>
<td><code>function</code></td>
<td></td>
</tr>
</tbody>
</table>
<hr />
<p><a name="module_useUser"></a></p>
<h2 id="useuser" tabindex="-1">useUser <a class="header-anchor" href="#useuser" aria-hidden="true">#</a></h2>
<p>Basic user management</p>
<ul>
<li><a href="#module_useUser" target="_blank">useUser</a>
<ul>
<li><em>static</em>
<ul>
<li><a href="#module_useUser.useUser" target="_blank">.useUser()</a> \u21D2 <code>useUser</code></li>
<li><a href="#module_useUser.auth" target="_blank">.auth(pair)</a></li>
<li><a href="#module_useUser.leave" target="_blank">.leave()</a></li>
<li><a href="#module_useUser.addProfileField" target="_blank">.addProfileField(name)</a></li>
<li><a href="#module_useUser.updateProfile" target="_blank">.updateProfile(field, data)</a></li>
<li><a href="#module_useUser.isPair" target="_blank">.isPair(pair)</a> \u21D2 <code>Boolean</code></li>
</ul>
</li>
<li><em>inner</em>
<ul>
<li><a href="#module_useUser..Account" target="_blank">~Account</a> : <code>Object</code></li>
<li><a href="#module_useUser..User" target="_blank">~User</a> : <code>Object</code></li>
<li><a href="#module_useUser..useUser" target="_blank">~useUser</a></li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="useuser-\u21D2-useuser" tabindex="-1">useUser() \u21D2 <code>useUser</code> <a class="header-anchor" href="#useuser-\u21D2-useuser" aria-hidden="true">#</a></h3>
<p>Get access to current logged in user</p>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> { useUser } </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;@gun-vue/composables&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> { </span><span style="color: #79C0FF">user</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">auth</span><span style="color: #C9D1D9">, </span><span style="color: #79C0FF">leave</span><span style="color: #C9D1D9"> } </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">useUser</span><span style="color: #C9D1D9">()</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="auth-pair" tabindex="-1">auth(pair) <a class="header-anchor" href="#auth-pair" aria-hidden="true">#</a></h3>
<p>Authenticate with a SEA key pair</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>pair</td>
<td><code>Object</code></td>
</tr>
</tbody>
</table>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> { auth, SEA } </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;@gun-vue/composables&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #FF7B72">async</span><span style="color: #C9D1D9"> </span><span style="color: #FF7B72">function</span><span style="color: #C9D1D9"> </span><span style="color: #D2A8FF">login</span><span style="color: #C9D1D9">() {</span></span>
<span class="line"><span style="color: #C9D1D9">   </span><span style="color: #FF7B72">const</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">pair</span><span style="color: #C9D1D9"> </span><span style="color: #FF7B72">=</span><span style="color: #C9D1D9"> </span><span style="color: #FF7B72">await</span><span style="color: #C9D1D9"> </span><span style="color: #79C0FF">SEA</span><span style="color: #C9D1D9">.</span><span style="color: #D2A8FF">pair</span><span style="color: #C9D1D9">()</span></span>
<span class="line"><span style="color: #C9D1D9">   </span><span style="color: #D2A8FF">auth</span><span style="color: #C9D1D9">(pair)</span></span>
<span class="line"><span style="color: #C9D1D9">}</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="leave" tabindex="-1">leave() <a class="header-anchor" href="#leave" aria-hidden="true">#</a></h3>
<p>Log out the user</p>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> { leave } </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;@gun-vue/composables&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #D2A8FF">leave</span><span style="color: #C9D1D9">()</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="addprofilefield-name" tabindex="-1">addProfileField(name) <a class="header-anchor" href="#addprofilefield-name" aria-hidden="true">#</a></h3>
<p>Add a field to the User profile</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>name</td>
<td><code>String</code></td>
</tr>
</tbody>
</table>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> { addProfileField } </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;@gun-vue/composables&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #D2A8FF">addProfileField</span><span style="color: #C9D1D9">( </span><span style="color: #A5D6FF">&#39;city&#39;</span><span style="color: #C9D1D9"> )</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="updateprofile-field-data" tabindex="-1">updateProfile(field, data) <a class="header-anchor" href="#updateprofile-field-data" aria-hidden="true">#</a></h3>
<p>Update a profile field</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>field</td>
<td><code>String</code></td>
</tr>
<tr>
<td>data</td>
<td><code>Any</code></td>
</tr>
</tbody>
</table>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #FF7B72">import</span><span style="color: #C9D1D9"> { updateProfile } </span><span style="color: #FF7B72">from</span><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&#39;@gun-vue/composables&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color: #D2A8FF">updateProfile</span><span style="color: #C9D1D9">( </span><span style="color: #A5D6FF">&#39;city&#39;</span><span style="color: #C9D1D9">, </span><span style="color: #A5D6FF">&#39;Moscow&#39;</span><span style="color: #C9D1D9"> )</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="ispair-pair-\u21D2-boolean" tabindex="-1">isPair(pair) \u21D2 <code>Boolean</code> <a class="header-anchor" href="#ispair-pair-\u21D2-boolean" aria-hidden="true">#</a></h3>
<p>Check if the object is a proper SEA pair</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>pair</td>
<td><code>Object</code></td>
<td>an object to check</td>
</tr>
</tbody>
</table>
<h3 id="account-object" tabindex="-1">Account : <code>Object</code> <a class="header-anchor" href="#account-object" aria-hidden="true">#</a></h3>
<p>the user account interface</p>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>pub</td>
<td><code>ref</code></td>
<td>The pub key used to build the account</td>
</tr>
<tr>
<td>color</td>
<td><code>computed</code></td>
<td>The user account color derived from the pub key</td>
</tr>
<tr>
<td>profile</td>
<td><code>Object</code></td>
<td>An object with all the <code>gun.user().get('profile')</code> data</td>
</tr>
<tr>
<td>pulse</td>
<td><code>Number</code></td>
<td>latest timestamp from the user. It's emitted every second. Offline timeout is set to 10 seconds.</td>
</tr>
<tr>
<td>blink</td>
<td><code>Boolean</code></td>
<td>A boolean that toggles on every timestamp received</td>
</tr>
<tr>
<td>lastSeen</td>
<td><code>Sting</code></td>
<td>Shows 'online' if recent pulse is less then 10s ago or a human readable time string</td>
</tr>
<tr>
<td>db</td>
<td><code>gun</code></td>
<td><code>gun.user(pub)</code> ref to query any additional user data</td>
</tr>
</tbody>
</table>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #C9D1D9">{</span></span>
<span class="line"><span style="color: #A5D6FF">&quot;pub&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc&quot;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #A5D6FF">&quot;color&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;#f55c3d&quot;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #A5D6FF">&quot;profile&quot;</span><span style="color: #C9D1D9">: {</span></span>
<span class="line"><span style="color: #C9D1D9">   </span><span style="color: #A5D6FF">&quot;name&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;Accord&quot;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #C9D1D9">   </span><span style="color: #A5D6FF">&quot;Message&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;Use your imagination!&quot;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #C9D1D9">   </span><span style="color: #A5D6FF">&quot;Money&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;$ 20000000000&quot;</span></span>
<span class="line"><span style="color: #C9D1D9">},</span></span>
<span class="line"><span style="color: #A5D6FF">&quot;pulse&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #79C0FF">1642077216809</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #A5D6FF">&quot;lastSeen&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;online&quot;</span><span style="color: #C9D1D9">,</span></span>
<span class="line"><span style="color: #A5D6FF">&quot;blink&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #79C0FF">true</span></span>
<span class="line"><span style="color: #C9D1D9">}</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="user-object" tabindex="-1">User : <code>Object</code> <a class="header-anchor" href="#user-object" aria-hidden="true">#</a></h3>
<p>An interface to the current gun user</p>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>initiated</td>
<td><code>Boolean</code></td>
<td><code>true</code> if useUser has been run at least once</td>
</tr>
<tr>
<td>is</td>
<td><code>Object</code></td>
<td>Reactive <code>gun.user().is</code></td>
</tr>
<tr>
<td>pub</td>
<td><code>String</code></td>
<td>Current user public key</td>
</tr>
<tr>
<td>color</td>
<td><code>String</code></td>
<td>a HEX color for the given pub</td>
</tr>
<tr>
<td>pulse</td>
<td><code>Number</code></td>
<td>Last received pulse timestamp</td>
</tr>
<tr>
<td>pulser</td>
<td><code>Number</code></td>
<td>An id for pulse <code>setInterval</code></td>
</tr>
<tr>
<td>blink</td>
<td><code>Boolean</code></td>
<td>Toggles with every pulse received</td>
</tr>
<tr>
<td>db</td>
<td><code>Object</code></td>
<td><code>gun.user()</code> reference</td>
</tr>
<tr>
<td>safe</td>
<td><code>Object</code></td>
<td>safe account indicators</td>
</tr>
<tr>
<td>pair</td>
<td><code>function</code></td>
<td>use <code>user.pair()</code> to get curent user key pair</td>
</tr>
</tbody>
</table>
<p><strong>Example</strong></p>
<pre><code class="language-js"><div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">js</div><pre class="shiki" style="background-color: #0d1117"><code><span class="line"><span style="color: #C9D1D9">{ </span></span>
<span class="line"><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&quot;initiated&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #79C0FF">true</span><span style="color: #C9D1D9">, </span></span>
<span class="line"><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&quot;is&quot;</span><span style="color: #C9D1D9">: { </span></span>
<span class="line"><span style="color: #C9D1D9">   </span><span style="color: #A5D6FF">&quot;pub&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc&quot;</span><span style="color: #C9D1D9">, </span></span>
<span class="line"><span style="color: #C9D1D9">   </span><span style="color: #A5D6FF">&quot;epub&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;wAvPlMAg4jvUvK4sPpVyF1CAWnRCMu1YpHnoDrVDg-o.l79QDmdPCLEiO0F_WkB3zYLpJt-lANtyhNmHSM4bTes&quot;</span><span style="color: #C9D1D9">, </span></span>
<span class="line"><span style="color: #C9D1D9">   </span><span style="color: #A5D6FF">&quot;alias&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc&quot;</span><span style="color: #C9D1D9"> </span></span>
<span class="line"><span style="color: #C9D1D9"> }, </span></span>
<span class="line"><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&quot;name&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;Accord&quot;</span><span style="color: #C9D1D9">, </span></span>
<span class="line"><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&quot;pub&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc&quot;</span><span style="color: #C9D1D9">, </span></span>
<span class="line"><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&quot;color&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;#f55c3d&quot;</span><span style="color: #C9D1D9">, </span></span>
<span class="line"><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&quot;pulse&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #79C0FF">1642708061615</span><span style="color: #C9D1D9">, </span></span>
<span class="line"><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&quot;pulser&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #79C0FF">12</span><span style="color: #C9D1D9">, </span></span>
<span class="line"><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&quot;blink&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #79C0FF">false</span><span style="color: #C9D1D9">, </span></span>
<span class="line"><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&quot;safe&quot;</span><span style="color: #C9D1D9">: { </span></span>
<span class="line"><span style="color: #C9D1D9">   </span><span style="color: #A5D6FF">&quot;saved&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #79C0FF">true</span><span style="color: #C9D1D9">, </span></span>
<span class="line"><span style="color: #C9D1D9">   </span><span style="color: #A5D6FF">&quot;password&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #79C0FF">null</span><span style="color: #C9D1D9">, </span></span>
<span class="line"><span style="color: #C9D1D9">   </span><span style="color: #A5D6FF">&quot;enc&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;SEA{</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">ct</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">:</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">E+6GViU9dTuidruOCNAoBITE+AlGNRgiABplSbL5fh4v1P+fhF33MuBwKd3ssBNi2kJ1sCzvS/YLmzivECA5ARZPGVbgXTSj8AE9kCz0Ac/8ushlsfBNdt8s3+a3OPVxMIevnT01uqcgr75Zp4TugIg/YuB5WltA9RHsgWEMlo+X+tRGaqG5rfw4sAmTSV0P8evMgM9rN/Un5t/WeDbvIPNXqZEmtxwAhMUZwOJWZckNZmNwpxnelFO0BwmauWfzkXuqGeSxNhMeaZi+VoRDMUvTjT68DLBnVoOhFhcdco+RW8AJfktZHZ4GF2IzFnQmTGpUd2LfvIY/Yn1eNJH7iQ5w41ChiYB/zhgQCOc5ur51PV6swAuN595vUNn7+0J1JRSNGzW2V/4j4YR4IEsAoqOtdn2Y21ga/CFdrE0=</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">,</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">iv</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">:</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">LtODTV+LBzhWHqUcptUO</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">,</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">s</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">:</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">XCL9Uj1YlPcV</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">}&quot;</span><span style="color: #C9D1D9">, </span></span>
<span class="line"><span style="color: #C9D1D9"> </span><span style="color: #A5D6FF">&quot;pass&quot;</span><span style="color: #C9D1D9">: </span><span style="color: #A5D6FF">&quot;SEA{</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">ct</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">:</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">8wNClMx/ebfou+gGWdf+bbx0TAgc9RU=</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">,</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">iv</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">:</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">NPgHkI+Ke+i/mw+3chlr</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">,</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">s</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">:</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">3VzGv06Y4fQ+</span><span style="color: #79C0FF">\\&quot;</span><span style="color: #A5D6FF">}&quot;</span><span style="color: #C9D1D9"> </span></span>
<span class="line"><span style="color: #C9D1D9"> } </span></span>
<span class="line"><span style="color: #C9D1D9">}</span></span>
<span class="line"></span></code></pre></div></code></pre>
<h3 id="useuser-1" tabindex="-1">useUser <a class="header-anchor" href="#useuser-1" aria-hidden="true">#</a></h3>
<p><strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>user</td>
<td><code>User</code></td>
<td>the user interface</td>
</tr>
<tr>
<td>auth</td>
<td><code>function</code></td>
<td>auth with a pair</td>
</tr>
<tr>
<td>leave</td>
<td><code>function</code></td>
<td>log out</td>
</tr>
</tbody>
</table>
<hr />
`;
};
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_Story = resolveComponent("Story");
  return openBlock(), createBlock(_component_Story, {
    title: "Composables",
    "docs-only": "",
    icon: "la:book-open",
    group: "docs"
  });
}
if (typeof block0 === "function")
  block0(_sfc_main);
_sfc_main.__file = "src/docs/Composables.story.vue";
var Composables_story = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b6a6c49c"], ["__file", "/Users/davay/Documents/\u0424\u0420\u0423\u041A\u0422/DeFUCC/gun-vue/components/src/docs/Composables.story.vue"]]);
export { Composables_story as default };
