import Prismic from '@prismicio/client';

export function getPrismicClient(req?: unknown) {
  const prismic = new Prismic.Client(
    String(process.env.PRISMIC_ACESS_TOKEN),
    {
      accessToken: String(process.env.PRISMIC_ACESS_TOKEN),
    }
  )

  return prismic;
}