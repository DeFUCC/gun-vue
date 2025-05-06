## Public Chat

Public chat is happening in a particular room, that enables them. Any user with a certificate can start a topic. Then anyone can start writing into it. **General** is considered the starting point, but due to the nature of public chat it won't be useable in case there are thousands of random people. But going deeper with the topics is a way to expand the conversations and make them more productive.

- `room/chat` is a list of topics along with topicstarters via `title@user_pub: true` records. Topicstarter always can put `false` there to hide the topic from public list.
- `room/'chat/topic'` store records of corresponding chats, that are put there by guest in a `timestamp@user_pub: text` pattern. 


## --
Please review my code. If it is not well written, I will rewrite it. Thank you for your review.