
## Getting Started 

requirement: 
- Node.js v14+
- Metamask extension


To run this front locally, add local environment file `.env.local` , look at the `.env.example` 

> NEXT_PUBLIC_RINKEBY_ADDRESS=0x9cE0ed06D1d7093b97bdA7cDe649f12EA411e719

> NEXT_PUBLIC_POLYGON_ADDRESS=0x0646D535ee5EDb9FaFcceC2e42809Bf74A5A96b8


then install module and run (node.js version > 14)
> yarn && yarn dev

and BAM💥 you can see the Front UI in your localhost.

I will update again to run blockchain locally in another repository.
For information, the current source code still unclean, I myself can't believe it either, because I code it in hurry :(
TODO for finishing v1: 
- refactor 
- bugs fixing (I will create it on issue to make it more organized)
- unit testing

There's roadmap on my note ready for v2, v3, and v4. On v2 it will update the core mechanism that will `breaking change`, and v3 + v4 only adding some features


## bundlr

this project using ipfs and arweave, thanks to bundlr module to enable transaction with native token (polygon) and soon I will integrate it too with solana.
It is quite simple, I turn them into hooks `./src/helpers/hooks/useBundlr.ts` useBundlr will initate bundlr, and there is `./src/helpers/hooks/useFund.ts` useFund hooks to orchestrate with bundlr function like  add fund to bundlr, getting price and upload.

they are still can be refactor and simplify further 
