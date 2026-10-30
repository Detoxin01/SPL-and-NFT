# Q4 2026 Builders Cohort — Week 1

This repository contains two Solana Devnet projects for the Week 1 assignment: an SPL token mint and transfer, and a Metaplex Core NFT creation and metadata update.

## Projects

- [SPL token project](spl-token/README.md) — create an SPL Token mint, mint a supply, and transfer tokens to a second wallet.
- [Metaplex Core project](mpl-core/README.md) — create a Core asset and update its name and metadata URI as the update authority.

Both apps use Phantom for wallet signing and target **Devnet**. Review every transaction in Phantom before approving it. Never enter or publish a recovery phrase, private key, or keypair.

## SPL token proof

- Network: Solana Devnet
- Token: Detoxin (`DETOX`), supply 83, 9 decimals
- Mint address: `476Fn...yKskK` (shortened in the screenshot)
- Transfer: 10 DETOX sent to Account 2 (`BCVbmtvfUDAox7EzxnzqkJ8eaCCbErJLRHkuoVxhvrgU`)
- [View the successful, finalized transfer transaction](https://explorer.solana.com/tx/4ArFSk4Y4iPDEA3LXTbnFZdEkFPkeN6dQiH1fsDuyoi1CNSCWnurPdX5PeAVRj9mt8AAMcJ7wH3Ss5MLUfQ0hVEG?cluster=devnet)

## Metaplex Core NFT proof

- Network: Solana Devnet
- Name: Builders Cohort NFT — Updated
- Asset address: `28qEXU24W4FCRCf5ikyYnsVChEUJavEzbsK5SQHpGMfJ`
- Owner and update authority: `5pEwKzTio9HhSMPuBWr9znT21LkvHiLQq7j4f7rXr5f4`
- [View the asset and image in Metaplex Core Explorer](https://core.metaplex.com/explorer/28qEXU24W4FCRCf5ikyYnsVChEUJavEzbsK5SQHpGMfJ?env=devnet)
- [View the asset account in Solana Explorer](https://explorer.solana.com/address/28qEXU24W4FCRCf5ikyYnsVChEUJavEzbsK5SQHpGMfJ?cluster=devnet)
- [Updated metadata JSON](https://raw.githubusercontent.com/Detoxin01/SPL-and-NFT/main/mpl-core/metadata-v2.json)
- [NFT image](https://raw.githubusercontent.com/Detoxin01/SPL-and-NFT/main/mpl-core/My%20Canvas.png)

## Repository contents

- [Initial NFT metadata](mpl-core/metadata.json)
- [Updated NFT metadata](mpl-core/metadata-updated.json)
- [Cache-busted updated NFT metadata](mpl-core/metadata-v2.json)
- [SPL token app](spl-token/)
- [Metaplex Core app](mpl-core/)

## Assignment submission

The SPL transfer and NFT creation/update are complete on Devnet. Add your public social post, thread, article, or tutorial link when you publish it.
