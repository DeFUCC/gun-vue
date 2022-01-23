---
title: Blog
posts:
  - title: My previous gun + vue project review
    date: 2021-03-02
    youtube: U_sX0qwaeLk
  - title: Vite-gun starter
    date: 2021-11-27
    youtube: HC4MfirOPq0
  - title: Early setup video
    date: 2021-11-19
    youtube: 4hpVRgVQvsY
  - title: GunVue v.0.5.0 video overview
    date: 2022-01-12
    youtube: ALKkBhj1IIE
    text: |
      The project structure is pretty established to evolve transparently. Next need to polish the existing functionality before expanding use cases further.
  - title: GunVue v.0.6.0 release overview
    date: 2022-01-22
    youtube: oTZ7HVrxjLs
    text: |
      <p>We begin with final build stages and publish the v.0.6.0 of @gun-vue project live. Then there's an overview of some new and updated features of the app and all it's layers. We got `Stability +10` and great UI design improvements since v.0.5.0. I've added full zip-file support meaning you can upload and download zip-files with you posts and the app will easily handle them client-side. 

      <p>You'll see the more reliable version of the Space, fast and beautiful Feeds and some Users browsing experience. I try to make everything  as modular as I can, so you can imagine how you could combine all these blocks to create some fun p2p web-apps yourself. This power is just one import away!
---

## Blog

<Blog :posts="$frontmatter.posts" />

## To Do

- [ ] https://github.com/QVDev/GunPushToTalk
