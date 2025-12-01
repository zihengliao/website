---
title: "Cannot Trust AI"
date: "2025-12-02"
---

The other day I wanted to deploy this website I had just built and was trying to figure out a way to allow my server to access my database. Just for some quick context, the server I was using was Render and the database is MongoDB.

Now with MongoDB Atlas, you can specify permissions on who can and can't access your data. One of the first lines of defence is allowing users based off of their IP address. 

Render (on the free tier) rotates its IP address around because it spins down due to inactivity and spins back up when needed. 

To tackle the dynamically changing IP address problem I consulted good old ChatGPT. It had stated and I quote "You MUST use 0.0.0.0/0". I'm no networking expert but I immediately knew this was sus. There has to be a better way to connect Render to MongoDB without opening up possible connections from all over the world.

![ChatGPT Logs](/assets/blog/2025-12-02-cannot_trust_ai/chat_gpt.png)

And sure enough after a quick google search I can see that it immediately is not true. So I went a bit old school, scrolled through StackOverflow and quickly found the docs that explained the correct approach - https://render.com/docs/connect-to-mongodb-atlas

**Conclusion**
Everybody knows this by now but you can't and shouldn't trust AI to do your work for you. 
