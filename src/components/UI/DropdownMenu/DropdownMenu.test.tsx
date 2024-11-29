import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from './DropdownMenu';

const OPEN_TEXT = 'Open';

const DropdownMenuTest = (props: React.ComponentProps<typeof DropdownMenu>) => (
  <DropdownMenu {...props}>
    <DropdownMenuTrigger>{OPEN_TEXT}</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>Item 1</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
const DropdownMenuCheckbox = (
  props: React.ComponentProps<typeof DropdownMenu>
) => (
  <DropdownMenu {...props}>
    <DropdownMenuTrigger>{OPEN_TEXT}</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuCheckboxItem checked>Checkbox Item</DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
const DropdownMenuRadio = (
  props: React.ComponentProps<typeof DropdownMenu>
) => (
  <DropdownMenu {...props}>
    <DropdownMenuTrigger>{OPEN_TEXT}</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuRadioGroup value="radio1">
        <DropdownMenuRadioItem value="radio1">
          Radio Item 1
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="radio2">
          Radio Item 2
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

describe('UI DropdownMenu', () => {
  let rendered: RenderResult;
  let trigger: HTMLElement;

  beforeAll(() => {
    window.PointerEvent = MouseEvent as typeof PointerEvent;
  });

  describe('После нажатия на триггерный элемент', () => {
    beforeEach(() => {
      rendered = render(<DropdownMenuTest />);
      trigger = rendered.getByText(OPEN_TEXT);
      fireEvent.pointerDown(trigger);
    });

    it('Отображает триггер раскрывающегося меню', () => {
      expect(screen.getByText(OPEN_TEXT)).toBeInTheDocument();
    });

    it('Пункта выпадающего меню', () => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });
  });

  describe('После нажатия на триггерный элемент с Checkbox', () => {
    beforeEach(() => {
      rendered = render(<DropdownMenuCheckbox />);
      trigger = rendered.getByText(OPEN_TEXT);
      fireEvent.pointerDown(trigger);
    });

    it('Отображает триггер раскрывающегося меню', () => {
      expect(screen.getByText(OPEN_TEXT)).toBeInTheDocument();
    });

    it('Пункта выпадающего меню с Checkbox', () => {
      expect(screen.getByText('Checkbox Item')).toBeInTheDocument();
    });
  });

  describe('После нажатия на триггерный элемент с Radio', () => {
    beforeEach(() => {
      rendered = render(<DropdownMenuRadio />);
      trigger = rendered.getByText(OPEN_TEXT);
      fireEvent.pointerDown(trigger);
    });

    it('Отображает триггер раскрывающегося меню', () => {
      expect(screen.getByText(OPEN_TEXT)).toBeInTheDocument();
    });

    it('Пункта выпадающего меню с Radio', () => {
      expect(screen.getByText('Radio Item 1')).toBeInTheDocument();
      expect(screen.getByText('Radio Item 2')).toBeInTheDocument();
    });
  });
});
