import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should display login page and allow magic link request', async ({ page }) => {
    await page.goto('/login');

    // Verify UI renders correctly
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByPlaceholder('you@example.com')).toBeVisible();

    // Fill out form
    await page.getByPlaceholder('you@example.com').fill('testuser@example.com');
    await page.getByPlaceholder('••••••••').fill('securepassword123');
    await page.getByRole('button', { name: 'Create Account' }).click();

    // Check for the success message in the URL or DOM
    await expect(page.getByText('Check your email to confirm your account before logging in!')).toBeVisible();
  });
});
