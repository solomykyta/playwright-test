import { test, expect, request } from '@playwright/test';
import { API_ROUTES } from '../../config/routes';
import { ENV } from '../../config/env';

test.describe('auth API', () => {
    test('google login return access token', async ({ request }) => {
        const response = await request.post(`${ENV.API_URL}${API_ROUTES.LOGIN}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                provider_name: 'google',
                provider_id: '115296032587177509456',
                email: 'ewre3243ut@gmail.com',
            },
        });
        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body).toHaveProperty('accessToken');
        expect(body.accessToken).toBeTruthy();
        expect(typeof body.accessToken).toBe ('string');

        expect(body).toHaveProperty('tokenType');
        expect(body.tokenType).toBe("Bearer");
    });

    test('apple login return access token', async ({ request }) => {
        const response = await request.post(`${ENV.API_URL}${API_ROUTES.LOGIN}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                provider_name: 'apple',
                provider_id: '001433.1855c2c5f552453385e3c2ab31a66bb6.1106',
                email: 'm.soloviov+sandbox2@booknet.com',
            },
        });
        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body).toHaveProperty('accessToken');
        expect(body.accessToken).toBeTruthy();
        expect(typeof body.accessToken).toBe ('string');

        expect(body).toHaveProperty('tokenType');
        expect(body.tokenType).toBe("Bearer");
    });
})