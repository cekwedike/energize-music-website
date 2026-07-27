export async function mountHeroScene(container: HTMLElement): Promise<() => void> {
  const [{ createRoot }, { createElement }, { default: HeroScene }] = await Promise.all([
    import('react-dom/client'),
    import('react'),
    import('../../islands/HeroScene'),
  ]);

  const root = createRoot(container);
  root.render(createElement(HeroScene));

  return () => root.unmount();
}
