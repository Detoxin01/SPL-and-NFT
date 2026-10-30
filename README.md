# Q4 2026 Builders Cohort — Week 1

This repository contains two small Solana devnet projects for the Week 1 assignment.

## Projects

- [`spl-token/`](spl-token/README.md) — create an SPL Token mint, mint a supply, and transfer part to a second wallet.
- [`mpl-core/`](mpl-core/README.md) — create a Metaplex Core asset and update its name and metadata URI.

Both apps use Phantom for wallet signing and target **devnet**. Never enter or publish a recovery phrase, private key, or keypair. Review every transaction in Phantom before approving it.

## Public metadata

- [Initial Core asset metadata](mpl-core/metadata.json)
- [Updated Core asset metadata](mpl-core/metadata-updated.json)

Raw URLs used by the Core app:

- `https://raw.githubusercontent.com/Detoxin01/SPL-and-NFT/main/mpl-core/metadata.json`
- `https://raw.githubusercontent.com/Detoxin01/SPL-and-NFT/main/mpl-core/metadata-updated.json`

## Transaction proof

### SPL token

- Network: Solana Devnet
- Token: Detoxin (`DETOX`), supply 83, 9 decimals
- Mint address shown in the screenshot: `476Fn...yKskK` (shortened by the explorer)
- Phantom confirmed 10 DETOX sent to Account 2 (`BCVbmtvfUDAox7EzxnzqkJ8eaCCbErJLRHkuoVxhvrgU`)
- [View the successful, finalized transaction](https://explorer.solana.com/tx/4ArFSk4Y4iPDEA3LXTbnFZdEkFPkeN6dQiH1fsDuyoi1CNSCWnurPdX5PeAVRj9mt8AAMcJ7wH3Ss5MLUfQ0hVEG?cluster=devnet)

### Metaplex Core NFT

Add the asset address and create/update transaction links after completing the Core lab.

