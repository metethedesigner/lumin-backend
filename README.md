## Description

- Firestore bağlantısını yapabilmek için projenin en dış dizinine "firebase-admin-key.json" şeklinde bir json oluşturup içeriğine aşağıdaki kodu eklenmeli.
```bash
{
  "type": "service_account",
  "project_id": "lumflights-case",
  "private_key_id": "5b1dbe997c80c9afcf6f3dbe5131c01db9fbf36f",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCeToy78i+5k7t2\nY4lUO37eu6350Eqm6MsYu2ogPLBxSaTZqVd6cyuh2U1rptvT/ZTcNE501+OAGZmr\n4ktVmQ5lbPNlL8048I5NMW/v3MBdXgIk4R93p69KjQBFeexXLO9lN5LNxJlxFLkA\nZPYB0plEfrLoUC3+rqcKmfAPVo63CDBMXClP92K8nfb6i7LIJ9tPJNiQvab84biD\nY8Mzg+KykQYb77Dddm5rcqFQ0ntRhw10WKlJ3OFnqp6u92DdwQC+dTDI2ZoRnevs\n0KdVB/ELx/r9MI0Nh/tUoOriKceb4bdcpWwk4uGvJ/m7jSMs3auPOtFwQbiOiuZc\n9dQZXv8VAgMBAAECggEADNgdXbfDXNs6VTCzmRH6s+JRC051wB/DMA6EsyOOwqJR\nrcH/nFUb2oCMYjT3lmD3YvvGIdTNBee4gCmsKGsdWpKsbNlOsqqnNmbRyN8FpzhU\nFDSac6rh82UypcXEAeQIyGg/O6gSiwo+DbojUPfgAklasAlRXLNET6fjF7DTg3tr\nQbi22kagEKEq9VhJUCLcd1kZjakXGE/ITxEfCOlgSZ7Sne8clZGZlOCe/Y/FDhy6\nx91SyX9bq1b+kqO0Jis1glwE4W8t8X74n3cJAspgovZT0HQdVOVuoyHwMAyWAVKA\neaFVoaDCgwk4hABOfgG5ieGO09L8byMVM1xE57ShQQKBgQDO+R0HkemnJOiW+KLB\neaipOp4vyRLKyNDQr0PZG4qLSjNiyFiApCMu9NdyHo43aAmY5OSRMvhUtIqCTeId\n2S34aS+VpG6QKAzuZ9eNwhjdKr/FGPbrYhoMQFFSxSpNIU6uCAnWu6fqTjgRedd7\ns5seBvX2D59az8U5J1O5m1oMowKBgQDDzk4gDs0K15W/eB/0wK/jh83/f+a3KTUU\nj+IfygZAJ3Ian8Sk1D6/R6O6dA8+nzKQU7/XkYaUZryFMPUYbqbBUyTnhpDQXQE5\nrdDkdoap9gI8PbaHTVGE4Kwg4Ex5jWwtdu2HZyAQGkYjtFFky2qApgicNaqSBi11\nsZUfsW2I5wKBgC8AjaIhdcFadWOLlVKAsVe1EyVg8V6R2jH6C1trkLvvHtpJCygz\nnjXUrnShEcTtYHiTSoDa5WA/G9FZpIcIwhLOuFqwW9dq8PzXIjF0KbdYNPKqp7Bu\nt+GeXZmBYwjfDoIhGzLjrM9d8get9syFzi00gXjetV6nHm/LSY02BW4nAoGBAIpw\nUsxXqqD/y+CUDgP+OF2mpv7+byERAXaIRFg1fjXdrc8lJuNjLPoQrLInXJ/p7tYc\nYIcJXR2Phbql4qRjl4MYRf9sJPcsyrD9M7RUGOISDYKKH4OKJxjLwOd9rpRCaTm7\n3DTftMutx+l2lBWvvJ04xt2rE+4qb/nGlKjTyZ4BAoGAaljjptMoDNPtc9f7bgG/\nToIPzFJluPRawnhOixJtG2Ub/pE50xYfnfs5oIotk3lexdIMCzHmPHGOUTE/msYy\n+zf/o3H7olws8cq1TqvldWOqhzeKWBwRaFCsF+Lp8Cgi4plNqiAvT6fWvybm/OxO\nlWyd19bwEOPcBbEgrvfRzZI=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@lumflights-case.iam.gserviceaccount.com",
  "client_id": "106313835703850482166",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40lumflights-case.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
```

- npm install işlemi yapıldıktan sonra "npx ts-node src/scripts/seed.ts" komutu ile seed çalıştırarak firestore'a 1000 adet rezervasyon ve 10 adet kullanıcı ekliyoruz.
- .env-exapmle dosyası ".env" şeklinde güncellenmeli.

- Admin Hesabı için: admin-admin123
- Staff Hesapları için: staff1-staff1 şeklinde 9'a kadar giriş yapılabilir.



