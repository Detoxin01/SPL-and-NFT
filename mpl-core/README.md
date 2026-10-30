# Week 1 — NFT with Metaplex Core

This project creates a Metaplex Core asset on **Solana devnet**, then changes its on-chain name and metadata URI using the connected Phantom wallet as update authority. Devnet SOL and assets have no financial value.

## Prepare metadata

`metadata.json` and `metadata-updated.json` are included in this repository. Use their raw GitHub URLs in the create and update forms. The JSON describes the asset; the Core account stores its name and URI on-chain.

- Initial metadata: `https://raw.githubusercontent.com/Detoxin01/SPL-and-NFT/main/mpl-core/metadata.json`
- Updated metadata: `https://raw.githubusercontent.com/Detoxin01/SPL-and-NFT/main/mpl-core/metadata-updated.json`

## Run

1. Install Node.js 18 or newer and the Phantom browser extension.
2. Run `npm install`, then `npm run dev` in this folder.
3. Open the local address printed by Vite in the same browser profile that has Phantom.
4. Switch Phantom to **Devnet** and connect it.
5. Enter the public HTTPS URL of the metadata JSON and create the asset. Review the transaction in Phantom.
6. Use the returned asset address in the update form with the updated name and the second public metadata URL. Review that transaction in Phantom.
7. Save the transaction and explorer details for the assignment README.

The app only asks Phantom to sign after you press a transaction button. It never requests a seed phrase, private key, or exported keypair.

## What happened

- The Core asset was created with the connected wallet as owner and update authority.
- The update changes the name and metadata URI; only the update authority (or an authorized delegate) can make it.
- Updating metadata is different from transferring asset ownership.

## References

- [Metaplex Core: creating assets](https://www.metaplex.com/docs/smart-contracts/core/create-asset)
- [Metaplex Core: updating assets](https://www.metaplex.com/docs/smart-contracts/core/update)
- [Metaplex Core JavaScript SDK](https://www.metaplex.com/docs/smart-contracts/core/sdk/javascript)
