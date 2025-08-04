import { DialogService } from './dialog.service';

export async function withConfirmation<T>(
  dialog: DialogService,
  options: { title?: string; message?: string },
  action: () => Promise<T> | T
): Promise<T | undefined> {
  const confirmed = await dialog.openConfirmation(options);
  if (confirmed) {
    return action();
  }
  return undefined;
} 