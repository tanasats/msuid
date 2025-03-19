async function createSignature(header: string, payload: string, secret: string): Promise<string> {
    const data = `${header}.${payload}`;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );
    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
    return Buffer.from(signature).toString('base64url');
}

export async function validateJWT(jwt: string): Promise<boolean> {
    const parts = jwt.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
    }

    const [header, payload, signature] = parts;

    // ตรวจสอบ Signature
    const computedSignature = await createSignature(header, payload, process.env.SECRET_KEY||"");
    if (computedSignature !== signature) {
        console.log("JWT is invalid signature!!")
        return false;
    }

    // ตรวจสอบ Payload (เช่น expiration time)
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'));
    //console.log("decodePayload=",decodedPayload);
    if (decodedPayload.exp && Date.now() >= decodedPayload.exp * 1000) {
        console.log("JWT is Expired!!")
        return false; // Token หมดอายุ
    }

    return true;
}