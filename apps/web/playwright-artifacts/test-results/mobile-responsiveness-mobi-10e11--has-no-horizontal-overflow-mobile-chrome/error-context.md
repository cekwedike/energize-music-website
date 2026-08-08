# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile-responsiveness.spec.ts >> mobile audit @ 375px >> /contact has no horizontal overflow
- Location: tests\mobile-responsiveness.spec.ts:114:7

# Error details

```
Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Energize Music" [ref=e5] [cursor=pointer]:
        - /url: /
      - button "Menu Toggle menu" [ref=e69] [cursor=pointer]:
        - generic [ref=e70]: Menu
        - generic [ref=e76]: Toggle menu
    - navigation "Primary mobile" [ref=e77]:
      - list [ref=e78]:
        - listitem [ref=e79]:
          - link "Home" [ref=e80] [cursor=pointer]:
            - /url: /
        - listitem [ref=e81]:
          - link "About Us" [ref=e82] [cursor=pointer]:
            - /url: /about
        - listitem [ref=e83]:
          - link "Artists" [ref=e84] [cursor=pointer]:
            - /url: /artists
        - listitem [ref=e85]:
          - link "Blogs" [ref=e86] [cursor=pointer]:
            - /url: /blogs
        - listitem [ref=e87]:
          - button "Initiatives" [ref=e88] [cursor=pointer]
        - listitem [ref=e92]:
          - link "Careers" [ref=e93] [cursor=pointer]:
            - /url: /careers
        - listitem [ref=e94]:
          - link "Contact" [ref=e95] [cursor=pointer]:
            - /url: /contact
  - main [ref=e96]:
    - generic [ref=e100]:
      - heading "Contact" [level=1] [ref=e101]
      - paragraph [ref=e102]: Tell us what you're reaching out about and we'll route it to the right team.
    - generic [ref=e104]:
      - generic [ref=e105]:
        - generic [ref=e106]: Name
        - textbox "Name" [ref=e107]
      - generic [ref=e108]:
        - generic [ref=e109]: Email
        - textbox "Email" [ref=e110]
      - generic [ref=e111]:
        - generic [ref=e112]: I'm reaching out about
        - combobox "I'm reaching out about" [ref=e113]:
          - option "A&R" [selected]
          - option "Press"
          - option "Partnership"
          - option "Booking"
          - option "General"
      - generic [ref=e114]:
        - generic [ref=e115]: Message
        - textbox "Message" [ref=e116]
      - button "Send message" [ref=e117]
      - status
  - contentinfo [ref=e118]:
    - generic [ref=e120]:
      - generic [ref=e121]: The Energy Different
      - generic [ref=e124]: The Energy Different
      - generic [ref=e127]: The Energy Different
      - generic [ref=e130]: The Energy Different
      - generic [ref=e133]: The Energy Different
      - generic [ref=e136]: The Energy Different
      - generic [ref=e139]: The Energy Different
      - generic [ref=e142]: The Energy Different
      - generic [ref=e145]: The Energy Different
      - generic [ref=e148]: The Energy Different
      - generic [ref=e151]: The Energy Different
      - generic [ref=e154]: The Energy Different
    - generic [ref=e157]:
      - generic [ref=e158]:
        - generic [ref=e159]:
          - link "Energize Music" [ref=e160] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e224]: The Energy Different
          - generic [ref=e225]:
            - paragraph [ref=e226]: Newsletter
            - form "Newsletter signup" [ref=e227]:
              - generic [ref=e228]: Email address
              - generic [ref=e229]:
                - textbox "Email address" [ref=e230]:
                  - /placeholder: you@example.com
                - button "Join" [ref=e231] [cursor=pointer]
            - paragraph [ref=e232]: Newsletter provider wires up in Phase 4.
          - list "Social media" [ref=e233]:
            - listitem [ref=e234]:
              - link "Instagram" [ref=e235] [cursor=pointer]:
                - /url: https://instagram.com/energizemusic
            - listitem [ref=e240]:
              - link "YouTube" [ref=e241] [cursor=pointer]:
                - /url: https://youtube.com/@energizemusic
            - listitem [ref=e245]:
              - link "Spotify" [ref=e246] [cursor=pointer]:
                - /url: https://open.spotify.com/artist/5dAPl80cZ4v2sTePGMbP2E
            - listitem [ref=e250]:
              - link "TikTok" [ref=e251] [cursor=pointer]:
                - /url: https://tiktok.com/@energizemusic
        - generic [ref=e256]:
          - navigation "Explore" [ref=e257]:
            - paragraph [ref=e258]: Explore
            - list [ref=e259]:
              - listitem [ref=e260]:
                - link "About Us" [ref=e261] [cursor=pointer]:
                  - /url: /about
              - listitem [ref=e263]:
                - link "Artists" [ref=e264] [cursor=pointer]:
                  - /url: /artists
              - listitem [ref=e266]:
                - link "Blogs" [ref=e267] [cursor=pointer]:
                  - /url: /blogs
              - listitem [ref=e269]:
                - link "Careers" [ref=e270] [cursor=pointer]:
                  - /url: /careers
              - listitem [ref=e272]:
                - link "Contact" [ref=e273] [cursor=pointer]:
                  - /url: /contact
          - navigation "Company" [ref=e275]:
            - paragraph [ref=e276]: Company
            - list [ref=e277]:
              - listitem [ref=e278]:
                - link "Privacy" [ref=e279] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e281]:
                - link "Terms" [ref=e282] [cursor=pointer]:
                  - /url: /terms
      - paragraph [ref=e286]:
        - generic [ref=e287]:
          - generic [ref=e288]: ©
          - generic [ref=e289]: "2026"
          - generic [ref=e290]: Energize Music
        - generic [ref=e291]: All rights reserved.
  - generic [ref=e294]:
    - button [ref=e295]
    - button [ref=e301]
    - button [ref=e305]
    - button [ref=e310]
```