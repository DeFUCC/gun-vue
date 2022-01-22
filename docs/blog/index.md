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
    date: 2021-21-19
    youtube: 4hpVRgVQvsY
  - title: v.0.5.0 video review
    date: 2021-01-12
    youtube: ALKkBhj1IIE
    text: |
      The project structure is pretty established to evolve transparently
  - title: v.0.6.0 release review
    date: 2021-01-22
    youtube: oTZ7HVrxjLs
    text: |
      We'll begin with final build stages and publish the v.0.6.0 of @gun-vue project. Then there's a review of some new and updated features of the app and all the layers. We got Stability +10 and great ui design improvements since v.0.5.0. I've added full zip-file support meaning you can upload and download zip-files with you posts and the app will easily handle them client-side. 

      You'll see the more reliable version of the Space, fast and beautiful Feeds and some Users browsing experience. I try to make everything  as modular as I can, so you can imagine how you could combine all these blocks to create some fun p2p web-apps yourself. This power is just one import away!
---

## Blog

<Blog :posts="$frontmatter.posts" />
