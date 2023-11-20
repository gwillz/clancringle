
# Clan Cringle

https://gwillz.github.io/clancringle

A host-free secret santa generator with exclude rules. Great for families that want to share their cringles per couples.


### Prior Art

Before you say it - yes, I know these generators already exist. I looked at maybe five or more and they were either ugly, clunky, or wanted my email.

So, my requirements:

- No hosting
- Doesn't require an email
- An 'excludes' feature
- Mobile friendly
- Dark mode
- Boomer proof


Out of scope:

- Multiple games
- Wishlists
- Actually anything at all, it's perfect already.


### Tech

Vite, Crank.js, Typescript. Hacky and fun.


### Usage

1. Add players + rules
2. Submit: this performs the allocations


### Build

```sh
# dev
npm ci
npm run dev

# deploy
npm run deploy
```


### TODOs

The _only_ thing worth exploring here is a graph data structure instead of the chaotic iterative random allocator. With a graph it can be assured that there is one clean loop.
