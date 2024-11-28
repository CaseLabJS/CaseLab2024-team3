import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Sheet, SheetTrigger, SheetContent, SheetHeader } from './Sheet';
import { ReactNode } from 'react';

const OPEN_TEXT = 'Open';
const TITLE_TEXT = 'Title';
const CLOSE_TEXT = 'Close';

const DialogTest = (props: React.ComponentProps<typeof Sheet>) => (
  <Sheet {...props}>
    <SheetTrigger>{OPEN_TEXT}</SheetTrigger>
    <SheetContent>
      <SheetHeader>{TITLE_TEXT}</SheetHeader>
    </SheetContent>
  </Sheet>
);

const NoLabelDialogTest = (props: React.ComponentProps<typeof Sheet>) => (
  <Sheet {...props}>
    <SheetTrigger>{OPEN_TEXT}</SheetTrigger>
    <SheetContent></SheetContent>
  </Sheet>
);

function renderAndClickDialogTrigger(Dialog: unknown) {
  fireEvent.click(render(Dialog as ReactNode).getByText(OPEN_TEXT));
}

describe('UI Sheet', () => {
  let rendered: RenderResult;
  let trigger: HTMLElement;
  let closeButton: HTMLElement;

  beforeEach(() => {
    rendered = render(<DialogTest />);
    trigger = rendered.getByText(OPEN_TEXT);
  });

  describe('После нажатия на trigger', () => {
    beforeEach(() => {
      fireEvent.click(trigger);
      closeButton = rendered.getByRole('button', { name: CLOSE_TEXT });
    });

    describe('Когда заголовок не был указан', () => {
      beforeEach(() => {
        cleanup();
      });

      it('Должно отобразиться сообщение об ошибке в консоли', () => {
        renderAndClickDialogTrigger(<NoLabelDialogTest />);
      });
    });

    it('Следует открыть содержимое', () => {
      expect(closeButton).toBeVisible();
    });

    it('Следует сфокусировать кнопку закрытия', () => {
      expect(closeButton).toHaveFocus();
    });

    describe('При нажатии Escape', () => {
      beforeEach(() => {
        fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
      });

      it('Следует закрыть содержимое', () => {
        expect(closeButton).not.toBeInTheDocument();
      });
    });
  });
});
