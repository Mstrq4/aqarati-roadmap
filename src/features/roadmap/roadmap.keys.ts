export const roadmapKeys = {
  all: ['roadmap'] as const,
  project: (slug: string) => ['roadmap', slug] as const,
}
