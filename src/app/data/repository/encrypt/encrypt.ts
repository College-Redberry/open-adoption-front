import { Injectable } from '@angular/core';
import { EncryptRepo } from '../../../domain/encrypt/repository';
import { AsyncResult, Failure, Success } from '../../../utils/result';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptAsyncronousRepo implements EncryptRepo {
  public async encrypt(plaintext: string): AsyncResult<string> {
    try {
      const publicKey = await this.importPublicKey();
      const encodedMessage = new TextEncoder().encode(plaintext);

      const encrypted = await window.crypto.subtle.encrypt(
        {
          name: 'RSA-OAEP'
        },
        publicKey,
        encodedMessage
      );

      return Success(this.arrayBufferToBase64(encrypted));
    } catch(e) {
      return Failure(e);
    }
  }

  private async importPublicKey(): Promise<CryptoKey> {
    const b64 = environment.publicKey
      .replace(/-----BEGIN PUBLIC KEY-----/, '')
      .replace(/-----END PUBLIC KEY-----/, '')
      .replace(/\s/g, '');

      console.log(b64)
    
    const binaryDer = Uint8Array.from(atob(b64), c => c.charCodeAt(0));

    return window.crypto.subtle.importKey(
      'spki',          
      binaryDer.buffer,
      {
        name: 'RSA-OAEP',
        hash: 'SHA-256'
      },
      true,          
      ['encrypt']    
    );
  }

  private arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    bytes.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary);
  }
}
