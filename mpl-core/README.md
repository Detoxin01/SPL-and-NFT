# Week 1 — NFT with Metaplex Core

This project creates a Metaplex Core asset on **Solana Devnet**, then updates its name and metadata URI using the connected Phantom wallet as update authority.

## Assignment result

- Asset: **Builders Cohort NFT — Updated**
- Network: **Solana Devnet**
- Asset address: `28qEXU24W4FCRCF5ikyYnsVChEUJavEzbsK5SQHpGMfJ`
- Owner and update authority: `5pEwKzTio9HhSMPuBWr9znT21LkvHiLQq7j4f7rXr5f4`
- [View the NFT image and details in Metaplex Core Explorer](https://core.metaplex.com/explorer/28qEXU24W4FCRCF5ikyYnsVChEUJavEzbsK5SQHpGMfJ?env=devnet)
- [View the Core asset account in Solana Explorer](https://explorer.solana.com/address/28qEXU24W4FCRCF5ikyYnsVChEUJavEzbsK5SQHpGMfJ?cluster=devnet)

## Metadata files

- Initial metadata: [metadata.json](metadata.json)
- Updated metadata: [metadata-updated.json](metadata-updated.json)
- Current updated metadata URL: https://raw.githubusercontent.com/Detoxin01/SPL-and-NFT/main/mpl-core/metadata-v2.json
- NFT image: https://raw.githubusercontent.com/Detoxin01/SPL-and-NFT/main/mpl-core/My%20Canvas.png

## Run

1. Install Node.js 18 or newer and the Phantom browser extension.
2. Run `npm install`, then `npm run dev` in this folder.
3. Open the local address printed by Vite in the same browser profile that has Phantom.
4. Switch Phantom to **Devnet** and connect it.
5. Enter the public HTTPS URL of the metadata JSON and create the asset. Review the transaction in Phantom.
6. Use the returned asset address in the update form with the updated name and metadata URL. Review the update in Phantom.

The app only asks Phantom to sign after you press a transaction button. It never requests a seed phrase, private key, or exported keypair.

## What happened

- The Core asset was created with the connected wallet as owner and update authority.
- The update changes the asset name and metadata URI; only the update authority (or an authorized delegate) can make it.
- Updating metadata is different from transferring asset ownership.

## References

- [Metaplex Core: creating assets](https://www.metaplex.com/docs/smart-contracts/core/create-asset)
- [Metaplex Core: updating assets](https://www.metaplex.com/docs/smart-contracts/core/update)
- [Metaplex Core JavaScript SDK](https://www.metaplex.com/docs/smart-contracts/core/sdk/javascript)
