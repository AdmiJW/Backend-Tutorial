
# 🔌 1.0 - Websockets Introduction 🔌

* You've used live chat applications, played multiplayer games and maybe simply seen progress bar on websites before. Ever wondered how they work?

* In the past where __LAMP__ or __WAMP__ stack are dominant *(Linux/Windows, Apache, MySQL, PHP)*, to achieve something like live chatting, some techniques that possibly be deployed are:

    1. Manual Refreshing (Very Bad on UX)
    2. Manual AJAX (User has to click 'Update' button?)
    1.   Interval polling  (Client JS check on server every x interval)
    1. Long Polling (Sends a request to server, server doesn't respond until got new data)
    1. EventSource API (Server Sent Events)
    <br><br>

    However, these techniques utilize regular HTTP 1.0 request, which uses TCP/IP protocol. For regular websites, it is okay, but these request has to make request to the server quite often (Imagine multiplayer game), and as you know TCP/IP protocol needs to establish a 3-way handshake beforehand (SYC, SYN-ACK, ACK), which can be quite expensive if done frequently

* Some efforts had been done to mitigate the problem, especially with the establishing of HTTP 1.1 (which is commonly used nowadays), after the handshake process is completed and data is sent, one can choose not to immediately close the commection by setting the proper headers. 

* __HOWEVER__, although the connection remains open, only client can initiate a request; server still isn't able to  send data to the client with HTTP 1.1. Although performance is improved by not needing to go over the handshake process again and again, the polling technique might still need to be used, and client cannot get real time updates.

* __Websocket__, standardized in year 2011, provide a better way to remain connection between client and server. It is a bidirectional full-duplex connection, where client can send data to server, AND VICE-VERSA.

* Websocket is entirely different protocol, so when we use it, instead of http:// or https://, it uses

    ```
    ws://    or     wss://   (for websocket secure)
    ```

* How a websocket connection is established still starts from HTTP request. The client will send a HTTP 1.1 request to the server, but instead of regular request, it sends an `UPGRADE` request, which notifies the server that the client would like to initiate a websocket connection.

* The server will then respond with status code `101 - Switching Protocols`, informing the user that the connection is established and websocket is ready to use.

> (All of this is still very abstracted. You may choose to learn more on websocket technology.)

* Therefore, with websockets, creating live chat, live feed applications and multiplayer games may be ever easier than before, on browsers! Once again, the power of web has been elavated!