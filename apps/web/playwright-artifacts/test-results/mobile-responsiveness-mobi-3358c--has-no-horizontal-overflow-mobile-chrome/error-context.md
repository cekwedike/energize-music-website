# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile-responsiveness.spec.ts >> mobile audit @ 375px >> /releases has no horizontal overflow
- Location: tests\mobile-responsiveness.spec.ts:114:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Tearing down "context" exceeded the test timeout of 30000ms.
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
    - generic [ref=e98]:
      - paragraph [ref=e99]: Catalog
      - heading "Releases" [level=1] [ref=e100]
      - paragraph [ref=e101]: Browse every single, EP, and album on the Energize Music roster.
    - list [ref=e103]:
      - listitem [ref=e104]:
        - link [ref=e105] [cursor=pointer]:
          - /url: /releases/heaven-has-come
          - img "energize-release-heaven-has-come" [ref=e107]
          - generic [ref=e108]:
            - paragraph [ref=e109]: Heaven Has Come
            - paragraph [ref=e110]: Album · 2023
      - listitem [ref=e111]:
        - link [ref=e112] [cursor=pointer]:
          - /url: /releases/serving-a-god-energize-version
          - img "energize-release-serving-a-god" [ref=e114]
          - generic [ref=e115]:
            - paragraph [ref=e116]: Serving A God (Energize Version)
            - paragraph [ref=e117]: Single · 2022
      - listitem [ref=e118]:
        - link [ref=e119] [cursor=pointer]:
          - /url: /releases/energy
          - img "energize-release-energy" [ref=e121]
          - generic [ref=e122]:
            - paragraph [ref=e123]: Energy
            - paragraph [ref=e124]: EP · 2021
  - contentinfo [ref=e125]:
    - generic [ref=e127]:
      - generic [ref=e128]: The Energy Different
      - generic [ref=e131]: The Energy Different
      - generic [ref=e134]: The Energy Different
      - generic [ref=e137]: The Energy Different
      - generic [ref=e140]: The Energy Different
      - generic [ref=e143]: The Energy Different
      - generic [ref=e146]: The Energy Different
      - generic [ref=e149]: The Energy Different
      - generic [ref=e152]: The Energy Different
      - generic [ref=e155]: The Energy Different
      - generic [ref=e158]: The Energy Different
      - generic [ref=e161]: The Energy Different
    - generic [ref=e164]:
      - generic [ref=e165]:
        - generic [ref=e166]:
          - link "Energize Music" [ref=e167] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e231]: The Energy Different
          - generic [ref=e232]:
            - paragraph [ref=e233]: Newsletter
            - form "Newsletter signup" [ref=e234]:
              - generic [ref=e235]: Email address
              - generic [ref=e236]:
                - textbox "Email address" [ref=e237]:
                  - /placeholder: you@example.com
                - button "Join" [ref=e238] [cursor=pointer]
            - paragraph [ref=e239]: Newsletter provider wires up in Phase 4.
          - list "Social media" [ref=e240]:
            - listitem [ref=e241]:
              - link "Instagram" [ref=e242] [cursor=pointer]:
                - /url: https://instagram.com/energizemusic
            - listitem [ref=e247]:
              - link "YouTube" [ref=e248] [cursor=pointer]:
                - /url: https://youtube.com/@energizemusic
            - listitem [ref=e252]:
              - link "Spotify" [ref=e253] [cursor=pointer]:
                - /url: https://open.spotify.com/artist/5dAPl80cZ4v2sTePGMbP2E
            - listitem [ref=e257]:
              - link "TikTok" [ref=e258] [cursor=pointer]:
                - /url: https://tiktok.com/@energizemusic
        - generic [ref=e263]:
          - navigation "Explore" [ref=e264]:
            - paragraph [ref=e265]: Explore
            - list [ref=e266]:
              - listitem [ref=e267]:
                - link "About Us" [ref=e268] [cursor=pointer]:
                  - /url: /about
              - listitem [ref=e270]:
                - link "Artists" [ref=e271] [cursor=pointer]:
                  - /url: /artists
              - listitem [ref=e273]:
                - link "Blogs" [ref=e274] [cursor=pointer]:
                  - /url: /blogs
              - listitem [ref=e276]:
                - link "Careers" [ref=e277] [cursor=pointer]:
                  - /url: /careers
              - listitem [ref=e279]:
                - link "Contact" [ref=e280] [cursor=pointer]:
                  - /url: /contact
          - navigation "Company" [ref=e282]:
            - paragraph [ref=e283]: Company
            - list [ref=e284]:
              - listitem [ref=e285]:
                - link "Privacy" [ref=e286] [cursor=pointer]:
                  - /url: /privacy
              - listitem [ref=e288]:
                - link "Terms" [ref=e289] [cursor=pointer]:
                  - /url: /terms
      - paragraph [ref=e293]:
        - generic [ref=e294]:
          - generic [ref=e295]: ©
          - generic [ref=e296]: "2026"
          - generic [ref=e297]: Energize Music
        - generic [ref=e298]: All rights reserved.
  - generic [ref=e301]:
    - button [ref=e302]
    - button [ref=e308]
    - button [ref=e312]
    - button [ref=e320]
```