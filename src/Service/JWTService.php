<?php

namespace App\Service;

use DateTimeImmutable;

class JWTService {
    
    public function generate(array $header, array $payload, string $secret, int $validity = 10800): string
    {
        if($validity > 0) {
            $now = new DateTimeImmutable();
            $payload['iat'] = $now->getTimestamp();
            $payload['exp'] = $now->getTimestamp() + $validity;
        }
        elseif($validity < 0) {
            return '';
        }

        $base64Header = $this->encode($header);
        $base64Payload = $this->encode($payload);

        $secret = $this->encode($secret, false);
        $signature = hash_hmac('sha256', $base64Header . '.' . $base64Payload, $secret, true);
        $base64Signature = $this->encode($signature, false);

        $jwt = $base64Header . '.' . $base64Payload . '.' . $base64Signature;

        return $jwt;
    }

    public function encode($value, bool $to_json = true): string
    {
        if($to_json) {
            return $this->clean(base64_encode(json_encode($value)));
        }
        else {
            return $this->clean(base64_encode($value));
        } 
    }

    public function clean(string $str): string
    {
        return str_replace(['+', '/', '='], ['-', '_', ''], $str);
    }

    /**
     * @return array|string
     */
    public function decode($value, bool $from_json = true)
    {
        if($from_json) {
            return json_decode(base64_decode($value), true);
        }
        else {
            return base64_decode($value);
        } 
    }

    public function getHeader(string $token): array
    {
        $arr = explode('.', $token);

        return $this->decode($arr[0]);
    }

    public function getPayload(string $token): array
    {
        $arr = explode('.', $token);

        return $this->decode($arr[1]);
    }

    public function isValid(string $token, string $secret): bool
    {
        $isValid = $this->isFormatted($token);
        $isValid &= !$this->isExpired($token);
        $isValid &= $this->isValidSignatory($token, $secret);

        return boolval($isValid);
    }

    public function isFormatted($token): bool
    {
        return preg_match(
            '/^[a-zA-Z0-9\-\_]+\.[a-zA-Z0-9\-\_]+\.[a-zA-Z0-9\-\_]+$/',
            $token
        ) === 1;
    }

    public function isExpired(string $token): bool
    {
        $payload = $this->getPayload($token);
        $now = new DateTimeImmutable();

        return $payload['exp'] < $now->getTimestamp();
    }

    public function isValidSignatory(string $token, string $secret): bool
    {
        $header = $this->getHeader($token);
        $payload = $this->getPayload($token);

        return $this->generate($header, $payload, $secret, 0) === $token;
    }
}
