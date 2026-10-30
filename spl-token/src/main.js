import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createInitializeMint2Instruction,
  createMintToCheckedInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddressSync,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { clusterApiUrl, Connection, Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import './style.css';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const provider = () => window.phantom?.solana?.isPhantom ? window.phantom.solana : null;
const connectButton = document.querySelector('#connect');
const runButton = document.querySelector('#run');
const status = document.querySelector('#status');
const walletLine = document.querySelector('#wallet');
const result = document.querySelector('#result');
let payer = null;

function uiAmountToUnits(value, decimals) {
  if (!/^\d+(\.\d+)?$/.test(value)) throw new Error('Enter a valid positive token amount.');
  const [whole, fraction = ''] = value.split('.');
  if (fraction.length > decimals) throw new Error(`This token allows at most ${decimals} decimal places.`);
  return BigInt(whole) * (10n ** BigInt(decimals)) + BigInt((fraction + '0'.repeat(decimals)).slice(0, decimals) || '0');
}

connectButton.addEventListener('click', async () => {
  try {
    const wallet = provider();
    if (!wallet) throw new Error('Install or unlock Phantom, then reload this page.');
    const response = await wallet.connect();
    payer = response.publicKey;
    walletLine.textContent = `Connected: ${payer.toBase58()}`;
    connectButton.textContent = 'Phantom connected';
    runButton.disabled = false;
    status.textContent = 'Check that Phantom is set to devnet.';
  } catch (error) { status.textContent = error.message; }
});

document.querySelector('#mint-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!payer) return;
  runButton.disabled = true;
  result.hidden = true;
  try {
    const wallet = provider();
    if (!wallet?.publicKey?.equals(payer)) throw new Error('Wallet connection changed. Reconnect Phantom and try again.');
    const recipient = new PublicKey(document.querySelector('#recipient').value.trim());
    if (recipient.equals(payer)) throw new Error('Use a second wallet address as the recipient.');
    const mintAmountText = document.querySelector('#mint-amount').value;
    const transferAmountText = document.querySelector('#transfer-amount').value;
    const name = document.querySelector('#token-name').value.trim();
    const symbol = document.querySelector('#token-symbol').value.trim().toUpperCase();
    if (!name || !symbol) throw new Error('Enter a token name and symbol.');
    const decimals = 2;
    const mintAmount = uiAmountToUnits(mintAmountText, decimals);
    const transferAmount = uiAmountToUnits(transferAmountText, decimals);
    if (mintAmount <= 0n || transferAmount <= 0n || transferAmount > mintAmount) throw new Error('Amounts must be positive, and transfer cannot exceed the mint amount.');

    status.textContent = 'Preparing devnet transaction…';
    const mint = Keypair.generate();
    const sourceAta = getAssociatedTokenAddressSync(mint.publicKey, payer, false, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID);
    const destinationAta = getAssociatedTokenAddressSync(mint.publicKey, recipient, false, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID);
    const rent = await connection.getMinimumBalanceForRentExemption(MINT_SIZE);
    const tx = new Transaction().add(
      SystemProgram.createAccount({ fromPubkey: payer, newAccountPubkey: mint.publicKey, space: MINT_SIZE, lamports: rent, programId: TOKEN_PROGRAM_ID }),
      createInitializeMint2Instruction(mint.publicKey, decimals, payer, null, TOKEN_PROGRAM_ID),
    );
    if (!(await connection.getAccountInfo(sourceAta))) tx.add(createAssociatedTokenAccountInstruction(payer, sourceAta, payer, mint.publicKey, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID));
    if (!(await connection.getAccountInfo(destinationAta))) tx.add(createAssociatedTokenAccountInstruction(payer, destinationAta, recipient, mint.publicKey, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID));
    tx.add(
      createMintToCheckedInstruction(mint.publicKey, sourceAta, payer, mintAmount, decimals, [], TOKEN_PROGRAM_ID),
      createTransferCheckedInstruction(sourceAta, mint.publicKey, destinationAta, payer, transferAmount, decimals, [], TOKEN_PROGRAM_ID),
    );
    const latest = await connection.getLatestBlockhash('confirmed');
    tx.feePayer = payer;
    tx.recentBlockhash = latest.blockhash;
    tx.partialSign(mint);

    status.textContent = 'Review and approve the devnet transaction in Phantom…';
    const signed = await wallet.signTransaction(tx);
    const signature = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction({ signature, ...latest }, 'confirmed');
    const [supply, source, destination] = await Promise.all([
      connection.getTokenSupply(mint.publicKey, 'confirmed'),
      connection.getTokenAccountBalance(sourceAta, 'confirmed'),
      connection.getTokenAccountBalance(destinationAta, 'confirmed'),
    ]);
    const explorer = `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
    const details = {
      network: 'devnet', name, symbol, mint: mint.publicKey.toBase58(),
      payer: payer.toBase58(), recipient: recipient.toBase58(),
      supply: supply.value.uiAmountString, payerBalance: source.value.uiAmountString,
      recipientBalance: destination.value.uiAmountString, signature, explorer,
    };
    status.textContent = 'Confirmed on devnet.';
    result.hidden = false;
    result.innerHTML = `<h2>Transaction complete</h2><dl>${Object.entries(details).map(([key, value]) => `<dt>${key}</dt><dd>${key === 'explorer' ? `<a target="_blank" rel="noreferrer" href="${value}">View transaction</a>` : escapeHtml(value)}</dd>`).join('')}</dl>`;
    localStorage.setItem('week1-spl-result', JSON.stringify(details, null, 2));
  } catch (error) {
    status.textContent = error.message ?? String(error);
  } finally { runButton.disabled = false; }
});

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}
