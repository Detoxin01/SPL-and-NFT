# Week 1 — SPL token mint and transfer

This project creates an SPL Token mint, mints a supply, and transfers some tokens to a second wallet on **Solana devnet**. Phantom signs the transaction. Devnet tokens have no financial value.

## Run

1. Install Node.js 18 or newer and the Phantom browser extension.
2. Run `npm install`, then `npm run dev` in this folder.
3. Open the local address printed by Vite in the same browser profile that has Phantom.
4. Switch Phantom to **Devnet**, connect it, paste the recipient's public wallet address, and choose the token name, symbol, and amounts.
5. Press **Mint and transfer** and review the network, mint, recipient, and fee in Phantom before approving.
6. Save the transaction link and result details for the assignment README.

Defaults mint 100 tokens with two decimal places and send 10 to the recipient. The app refuses to use a recipient equal to the payer. It stores only public transaction details in browser local storage and never reads a seed phrase or private key.

## What happened

- The mint account identifies the token and records supply and decimal precision. The display name and symbol in this demo are recorded in the result for your notes; the original SPL Token program does not store them on the mint.
- Associated token accounts hold each wallet's balance for the mint.
- The transaction creates the mint, creates token accounts if needed, mints the supply, and transfers the chosen amount.
- Minting increases total supply; the transfer only changes balances.

## References

- [Solana token quickstart](https://solana.com/docs/tokens/quickstart)
- [Create a token mint](https://solana.com/docs/tokens/basics/create-mint)
- [Mint tokens](https://solana.com/docs/tokens/basics/mint-tokens)
- [Transfer tokens](https://solana.com/docs/tokens/basics/transfer-tokens)
