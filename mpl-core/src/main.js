import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { generateSigner, publicKey } from '@metaplex-foundation/umi';
import { create, fetchAsset, hasAssetUpdateAuthority, mplCore, update } from '@metaplex-foundation/mpl-core';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import './style.css';

const DEVNET = 'https://api.devnet.solana.com';
const connectButton = document.querySelector('#connect');
const walletLine = document.querySelector('#wallet');
const status = document.querySelector('#status');
const result = document.querySelector('#result');
const createButton = document.querySelector('#create');
const updateButton = document.querySelector('#update');
let adapter;
let umi;

connectButton.addEventListener('click', async () => {
  try {
    adapter = new PhantomWalletAdapter();
    await adapter.connect();
    umi = createUmi(DEVNET).use(mplCore()).use(walletAdapterIdentity(adapter));
    walletLine.textContent = `Connected: ${adapter.publicKey.toBase58()}`;
    connectButton.textContent = 'Phantom connected';
    createButton.disabled = false;
    updateButton.disabled = false;
    status.textContent = 'Check that Phantom is set to devnet.';
  } catch (error) { status.textContent = error.message ?? String(error); }
});

createButton.addEventListener('click', async () => {
  createButton.disabled = true;
  try {
    const name = document.querySelector('#name').value.trim();
    const uri = requireHttpsUrl(document.querySelector('#uri').value.trim(), 'metadata URL');
    if (!name) throw new Error('Enter an NFT name.');
    const asset = generateSigner(umi);
    status.textContent = 'Review and approve the Core asset transaction in Phantom…';
    const sent = await create(umi, { asset, name, uri }).sendAndConfirm(umi);
    const details = {
      network: 'devnet', asset: asset.publicKey, name, uri,
      ownerAndUpdateAuthority: adapter.publicKey.toBase58(),
      signature: sent.signature,
      explorer: `https://explorer.solana.com/address/${asset.publicKey}?cluster=devnet`,
    };
    document.querySelector('#asset').value = asset.publicKey;
    showResult('Core asset created', details);
    localStorage.setItem('week1-core-asset', JSON.stringify(details, null, 2));
    status.textContent = 'Confirmed on devnet. Save the asset address for the update step.';
  } catch (error) { status.textContent = error.message ?? String(error); }
  finally { createButton.disabled = false; }
});

updateButton.addEventListener('click', async () => {
  updateButton.disabled = true;
  try {
    const assetAddress = document.querySelector('#asset').value.trim();
    const name = document.querySelector('#updated-name').value.trim();
    const uri = requireHttpsUrl(document.querySelector('#updated-uri').value.trim(), 'updated metadata URL');
    if (!assetAddress) throw new Error('Enter the asset address from the create step.');
    if (!name) throw new Error('Enter the updated NFT name.');
    const address = publicKey(assetAddress);
    const current = await fetchAsset(umi, address);
    if (!hasAssetUpdateAuthority(adapter.publicKey.toBase58(), current)) {
      throw new Error(`Connected wallet is not this asset’s update authority (${current.updateAuthority}).`);
    }
    status.textContent = 'Review and approve the metadata update in Phantom…';
    const sent = await update(umi, { asset: address, name, uri }).sendAndConfirm(umi);
    const after = await fetchAsset(umi, address);
    const details = {
      network: 'devnet', asset: assetAddress, updatedName: after.name, updatedUri: after.uri,
      updateAuthority: adapter.publicKey.toBase58(),
      signature: sent.signature,
      explorer: `https://explorer.solana.com/address/${assetAddress}?cluster=devnet`,
    };
    showResult('Core asset updated', details);
    localStorage.setItem('week1-core-update', JSON.stringify(details, null, 2));
    status.textContent = 'Update confirmed on devnet.';
  } catch (error) { status.textContent = error.message ?? String(error); }
  finally { updateButton.disabled = false; }
});

function requireHttpsUrl(value, label) {
  const parsed = new URL(value);
  if (parsed.protocol !== 'https:') throw new Error(`Use a public HTTPS ${label}.`);
  return parsed.toString();
}

function showResult(title, details) {
  result.hidden = false;
  result.innerHTML = `<h2>${title}</h2><dl>${Object.entries(details).map(([key, value]) => `<dt>${escapeHtml(key)}</dt><dd>${key === 'explorer' ? `<a target="_blank" rel="noreferrer" href="${escapeHtml(value)}">View on Solana Explorer</a>` : escapeHtml(value)}</dd>`).join('')}</dl>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}
