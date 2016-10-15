# TA Help Queue Security Demo

**I really like our new help queue.  It works much better for passing off.  But there are some problems.**

This was built over the last four or five days to showcase a few issues I found with the help queue.  Specifically I hoped to help bring these issues to your attention in the hope that the queue can be improved.

It's fairly simple and could be published as a web app, but I chose to fork from Electron to make use of multiple windows for chat.

## Features

* Gets ***all*** the data available from the queue, including who is with which TA, how long they've been there, how long they waited, what their question is, as well as who is currently waiting, how long they've waited, and what their question is.

* Allows chat with anyone in the queue or currently in passoff.  Prompts you for a custom name to use when entering chat.  If the person you are chatting with is already in chat with a TA they are not notified that you have entered, and you can then read all messages sent by either party from that point forward.

## Other bugs not demonstrated

* Unsecured endpoint allows arbitrary removal from the queue.

* Unsecured endpoint allows viewing of any user's chat logs.
