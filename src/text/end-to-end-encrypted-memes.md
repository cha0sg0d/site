# End to End Encrypted Memes

_How we used cryptography to make the Internet spicier._

---

## Our Problem

At a family reunion last summer, we discovered that adding captions to photos of our family was surprisingly hilarious. A judge would send a photo to the group chat, then everyone else would write captions on a piece of paper and the judge would choose the winner.

We had so much fun playing this game that we decide to quit our software jobs and make a digital version — which we called `Memz`.

There was one major problem, however. To access the funniest, and most personal, photos, we needed to guarantee the safety of our players’ data.

Protecting sensitive data is a hard problem; an attack just needs to find one vulnerability whereas defenders must continuously protect against all possible attacks.

If companies with millions to spend on cybersecurity keep getting [hacked](https://www.csoonline.com/article/2130877/the-biggest-data-breaches-of-the-21st-century.html), how could two engineers fresh out of college do better?

---

## Our Solution

If we can’t view your data, neither can a hacker. To secure your data, we use a protocol for end to end encryption inspired by [Wormhole](https://wormhole.app), an encrypted file sharing service.

End to end encryption (E2EE) means that information is only viewable by the sender and the recipient; no intermediary that stores or passes the data along can access it. In our case, only the players of the game have access to the secret key to encrypt and decrypt the personal photos and captions.

To our server, the image of your dog looks like a random stream of gibberish. This means that if our server was compromised and all of the game data was leaked, an attacker would not be able to view your photos _because we don’t have a key to your data._

With Memz, we hope to demonstrate that E2EE not only respects users’ privacy, it also enables people to share more interesting information together online.

Read on for a technical explanation of the [Memz protocol](#memz-protocol) and some other security measures we take to ensure a fun, secure gaming experience. Our code is open-source and MIT licensed if you’d like to verify for yourself how we protect your data. Contributions are welcome to help us improve our security model.

---

## Memz Protocol

---

### Starting the Game

There are two potential user flows: the creator and invited players

**Game Creator**

1. Generate the main AES [symmetric `key`](https://en.wikipedia.org/wiki/Symmetric-key_algorithm) , a [random `salt`](<https://en.wikipedia.org/wiki/Salt_(cryptography)>) using the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API).
2. Use the main secret `key` and `salt` to derive more keys via HKDF SHA-256
   - Reader authorization token (`authToken`): A token for authenticating download requests (HMAC SHA-256)
3. Ask the server to create a “game”.
   1. Send the creator’s `username`, `authToken` , and `salt` to the server as part of the create game HTTP request.
   2. The server stores the `salt` publicly and the creates a game room with a unique `roomId`. It sends the `roomId` back to the creator. The server will require any subsequent modifications to the game state to include the `authToken` for verification
   3. The server also generates a [UUIDv4](https://www.rfc-editor.org/rfc/rfc4122.txt) `playerId` and sends it back to the creator. `playerIds` are used for authorizing in-game actions and identifying players.
4. Create a game invite link and send to friends

   1. With the room created and the `roomId` returned to the creator, they can now invite others. They craft an invite link with the following form:

   2. The `#<key>` section of the URL is called the `fragment`, which is traditionally used for jumping to a specific section on a page. The folks at Wormhole realized that the [fragments](https://en.wikipedia.org/wiki/URI_fragment) are stripped from URLs when browsers look u the IP address of a given url.
   3. So the user sees `https://memz.party/dkbd8#v94dfadfa0fjf` but the browser only performs a search for `https://memz.party/dkbd8`. This enables links to include information that is _never_ sent anywhere by the browser.
   4. The creator sends the invite link to any person or group they choose. They must understand that anyone with the link has access to their game.

**Invited Players**

1. Fetch the secret `key` from the URL fragment in the invite link.
   1. Fetch the `salt` for the specific `roomId` from the server.
   2. Use the `salt` + `key` to generate the `authToken`
2. Ask the server to join the game
   1. Send a `username` and `authToken` to verify that you know a key derived from the main `key`.
   2. The server stores the `username` , adds the player to the game, and sends back a unique `playerId` which authorizes future actions.

_**Note**: Everyone has now joined the game with the `key` never leaving the personal device of the players. The only risk is that the service used to send the invite link leaks the message, for example if you post the link on Twitter. However, if you use an end-to-end encrypted messaging service like Signal, iMessage, or WhatsApp, you have full control over who has access to the `key`, and thus the photos in the game._

---

### Playing the Game

There are two potential roles: judging or captioning. Each round, the judge chooses a photo from their device, and everyone else writes a caption for it.

**Judging**

1. Select an image from the personal device.
2. Encrypt the image
   1. This uses the `key` under the hood to _encrypt_ the image, which uses the [Wormhole-crypto](https://github.com/SocketDev/wormhole-crypto) implementation of HTTP Stream based encryption ([RFC 8188](https://datatracker.ietf.org/doc/html/rfc8188)).
3. Upload the image to the server.
   1. The server simply stores the encrypted bytes and has no way to view the actual image because it doesn’t have access to the `key`.
   2. Wait for captions to be submitted.
4. After captions have been submitted, download the encrypted captions from the server.
5. Decrypt the the captions using the `key`.
6. Choose the winning caption.

**Captioning**

1. Download the encrypted image from the server.
2. Decrypt the image using the `key`.
3. Write a caption for the image.
4. Encrypt the caption using the `key`.
5. Upload the encrypted caption to the sever.

---

### Authorization

Every player request to the server during a game is accompanied by their unique `playerId`. The `playerId` serves dual purposes of identifying and authorizing players. The only way a player can receive a `playerId` is by joining the game with the valid `authToken` originally submitted by the game creator.

The `playerId` is only sent to the specific player it refers to, so other players cannot impersonate others by using their `playerId`. In game, the `playerId` allows for additional validation, such as ensuring only the current judge can choose the winning caption.

---

## Additional Security Measures

1. Tired of `accept cookie?` pop ups? We are too, so we just don’t use cookies. The only identifying information we store is your unique `playerId` , which is randomly generated for each game of Memz you play.
2. We use a GDPR-compliant, anonymous analytics service called Plausible, which can be easily opted out of.
3. Did you know that even your fonts could be tracking you? We store our fonts in locally to make our website load even faster and avoid Google tracking the use of our fonts.
4. Our [server](https://observatory.mozilla.org/analyze/dank.memz.party) has a A+ security grade from Mozilla Observatory.

### Play Memz [here](https://memz.party)!
