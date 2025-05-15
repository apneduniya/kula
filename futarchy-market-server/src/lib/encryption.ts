import { Keypair } from "@solana/web3.js";
import * as crypto from 'crypto';

export async function encryptKeypair(keypair: Keypair, encryptionKey: string): Promise<string> {
  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync(encryptionKey, 'salt', 32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const secretKey = Buffer.from(keypair.secretKey);
  
  let encrypted = cipher.update(secretKey);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  
  return JSON.stringify({
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex')
  });
} 