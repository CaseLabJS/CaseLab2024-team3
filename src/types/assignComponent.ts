import { ElementType } from "react";

export type PropsOf<T extends ElementType> = React.ComponentPropsWithoutRef<T> &
  AsProps;

interface AsProps<T extends ElementType = ElementType> {
  as?: T;
}

export type OmitCommonProps<
  Target,
  OmitAdditionalProps extends keyof any = never
> = Omit<Target, "as" | OmitAdditionalProps>;

export type RightJoinProps<
  SourceProps extends object = {},
  OverrideProps extends object = {}
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

export type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = {},
  AsComponent extends ElementType = ElementType
> = (
  | RightJoinProps<ComponentProps, AdditionalProps>
  | RightJoinProps<AsProps, AdditionalProps>
) & {
  as?: AsComponent;
};

export type ComponentWithAs<
  Component extends ElementType,
  Props extends object = {}
> = {
  <AsComponent extends ElementType = Component>(
    props: MergeWithAs<
      React.ComponentProps<Component>,
      React.ComponentProps<AsComponent>,
      Props,
      AsComponent
    >
  ): JSX.Element;

  displayName?: string;
  propTypes?: React.WeakValidationMap<any>;
  contextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<any>;
  id?: string;
};

type Assign<T, U> = Omit<T, keyof U> & U;

export interface AssignComponent<T extends ElementType, P extends object = {}>
  extends ComponentWithAs<T, Assign<{}, P>> {}