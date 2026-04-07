export function callerMixin(stackTrace?: string) {
  if (!stackTrace) {
    return {};
  }
  let filePath = '';
  const callerTrace = stackTrace
    .split('\n')
    .at(-1)
    ?.match(/\(([^)]+)\)/)?.[1];

  const isFileLibs = callerTrace?.includes('libs');
  const isFileApps = callerTrace?.includes('apps');

  if (isFileLibs) {
    filePath = `${process.cwd()}/libs/${callerTrace?.split('libs/')[1]}`;
  } else if (isFileApps) {
    filePath = `${process.cwd()}/apps/${callerTrace?.split('apps/')[1]}`;
  }

  return {
    ...(filePath.length > 0 ? { logged_by: filePath } : {}),
  };
}
