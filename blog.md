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
  - title: GunVue v.0.7.1. app rooms, certificates, immutable posts and bi-directional links between them
    date: 2022-02-09
    youtube: _SXVSMiIbvg
    text: |
      Today we present a new iteration on merging a reactive p2p database with a reactive UI framework together to form a toolbox for everyone to build upon. With v 0.7 we introduce the concept of rooms, that are separate SEA key pairs for use with certificates. Any logged in user can do create some records inside the app room based of a set of certificates, restricting the posting rules. Posts, spaces, users and even rooms are already easily addable to any room by any user. And anyone can create a new room to fill up as he/she wishes. It becomes more and more fun!
  - title: "Gun-Vue v0.7.8: Skynet Homescreen, swappable relays and private encrypted chat"
    date: 2022-03-26
    youtube: jnxwS4__8T4
    text: |
      Some nice progress going with Gun-Vue project development. It gets so much more reliable with the new SIA Skynet Homescreen publication and interchangeable relays. Yes, the volunteer list is still at the centralized GitHub, but it's such a small footprint that may be changed to any other way of delivering the list of available peers. We should share that in gun space too, as the gun-relays package already does.

      We also have some encrypted private chats and the new GUN v0.2020.1236 under the hood. More features to come!
  - title: "@gun-vue v.0.8.3 updates and move to a new room"
    date: 2022-04-13
    youtube: v=BFx7pIwTAMY
    text: |
      We'll go through the app features and change the app root room to a new one to update the data structure.  I've optimized the posts feature for them to form a tree, growing from any post hash.
  - title: Gift exchange platform build (in 3 parts)
    date: 2022-07-08
    youtube: z29qSr0YG2I
    text: |
      It's the first approach to build a gift exchange platform. So users can propose a donation to other user for them to approve the transaction. We start by creating routes and basic logic and proceed to building Gun lists with content-addressing and user signatures. We'll evaluate a couple of ideas and finally get a MVP of sending and receiving gift records. It's just the first steps as this system will grow into a public projects funding system. So the donations will be linked to projects and will have to be used to get them done. But we'll have to build the project management system too. That's going to be next.
---

## Blog

<Blog :posts="$frontmatter.posts" />

## To Do

- [ ] https://github.com/QVDev/GunPushToTalk
