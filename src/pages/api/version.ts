import type { NextApiRequest, NextApiResponse } from 'next';

import { VersionResponse } from '@/types/api';

import packageJson from '../../../package.json';

const handler = (req: NextApiRequest, res: NextApiResponse<VersionResponse>) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ message: 'Method not allowed.' });
    return;
  }

  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA;
  const commit = commitSha ? commitSha.slice(0, 7) : undefined;

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    version: packageJson.version,
    ...(commit ? { commit } : {}),
  });
};

export default handler;
