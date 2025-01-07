import ito from '@ito-frontend/eslint-config';

export default ito({
  framework: 'react',
  tailwind: true,
  checkFile: { enabled: true, ignores: ['README.md', 'src/routes/**/*', 'src/App.tsx'] },
});
