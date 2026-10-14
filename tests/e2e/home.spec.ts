import { expect, test } from '@playwright/test';

test.describe('Página inicial', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('tem título, idioma e um único h1', async ({ page }) => {
    await expect(page).toHaveTitle(/Fabio Javarrotti/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  });

  test('exibe as seções principais como landmarks', async ({ page }) => {
    for (const name of [/Projetos que unem/, /Do conceito ao deploy/, /Código é o meio/, /Vamos criar algo/]) {
      await expect(page.getByRole('region', { name })).toBeAttached();
    }
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });

  test('lista todos os projetos com links externos seguros', async ({ page }) => {
    const cards = page.getByTestId('project-card');
    await expect(cards).toHaveCount(3);
    for (const link of await page.locator('a[target="_blank"]').all()) {
      await expect(link).toHaveAttribute('rel', /noopener/);
    }
  });

  test('CTA principal leva até os trabalhos', async ({ page }) => {
    await page.getByTestId('cta-projects').click();
    await expect(page).toHaveURL(/#trabalhos$/);
    await expect(page.locator('#trabalhos')).toBeInViewport();
  });

  test('link de pular conteúdo é o primeiro foco do teclado', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused();
  });

  test('todas as imagens têm texto alternativo definido', async ({ page }) => {
    for (const img of await page.locator('img').all()) {
      expect(await img.getAttribute('alt')).not.toBeNull();
    }
  });
});

test.describe('Menu de comandos', () => {
  test.skip(({ isMobile }) => isMobile, 'Atalho de teclado é exclusivo de desktop');

  test('abre com Ctrl+K, filtra, navega e fecha com Esc', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Control+k');
    const dialog = page.getByTestId('command-menu');
    await expect(dialog).toBeVisible();

    const input = page.getByRole('combobox', { name: 'Buscar' });
    await expect(input).toBeFocused();
    await input.fill('contato');
    await expect(page.getByRole('option', { name: /Contato/ })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });
});

test.describe('Navegação móvel', () => {
  test.skip(({ isMobile }) => !isMobile, 'Apenas em viewport móvel');

  test('abre o menu, navega e fecha', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByTestId('menu-toggle');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await page.getByRole('dialog', { name: 'Menu de navegação' }).getByRole('link', { name: /Serviços/ }).click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page).toHaveURL(/#servicos$/);
  });

  test('não há rolagem horizontal', async ({ page }) => {
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
