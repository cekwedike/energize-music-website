/**
 * Small React components that make the blog editor look closer to the website:
 * coloured text shows in colour, fonts show in their font, and custom styles get their size.
 */
import type { BlockAnnotationProps, BlockDecoratorProps, BlockStyleProps } from 'sanity';
import { BLOG_FONTS, BLOG_TEXT_COLORS, BLOG_TEXT_SIZES, HEX_COLOR } from '../../../../packages/shared/src/blog/styleOptions';

interface TextColorValue {
  color?: string;
  customHex?: string;
}

interface TypographyValue {
  font?: string;
  size?: string;
  weight?: string;
  italic?: boolean;
  uppercase?: boolean;
}

export function resolveTextColor(value: TextColorValue | undefined): string | undefined {
  if (!value) return undefined;
  if (value.color === 'custom') return value.customHex && HEX_COLOR.test(value.customHex) ? value.customHex : undefined;
  return BLOG_TEXT_COLORS.find((option) => option.value === value.color)?.hex;
}

export function TextColorAnnotation(props: BlockAnnotationProps) {
  const color = resolveTextColor(props.value as TextColorValue);
  return <span style={{ color }}>{props.renderDefault(props)}</span>;
}

export function TypographyAnnotation(props: BlockAnnotationProps) {
  const value = props.value as TypographyValue;
  const font = BLOG_FONTS.find((option) => option.value === value.font)?.stack;
  const size = BLOG_TEXT_SIZES.find((option) => option.value === value.size)?.em;
  return (
    <span
      style={{
        fontFamily: font,
        fontSize: size ? `${size}em` : undefined,
        fontWeight: value.weight ? Number(value.weight) : undefined,
        fontStyle: value.italic ? 'italic' : undefined,
        textTransform: value.uppercase ? 'uppercase' : undefined,
        letterSpacing: value.uppercase ? '0.06em' : undefined,
      }}
    >
      {props.renderDefault(props)}
    </span>
  );
}

export function HighlightDecorator(props: BlockDecoratorProps) {
  return <mark style={{ background: '#fde68a', color: 'inherit', padding: '0 0.15em', borderRadius: 3 }}>{props.children}</mark>;
}

export function SuperscriptDecorator(props: BlockDecoratorProps) {
  return <sup>{props.children}</sup>;
}

export function SubscriptDecorator(props: BlockDecoratorProps) {
  return <sub>{props.children}</sub>;
}

export function LeadStyle(props: BlockStyleProps) {
  return <div style={{ fontSize: '1.25em', lineHeight: 1.5, opacity: 0.85 }}>{props.children}</div>;
}

export function SmallStyle(props: BlockStyleProps) {
  return <div style={{ fontSize: '0.85em', opacity: 0.75 }}>{props.children}</div>;
}

export function CenteredStyle(props: BlockStyleProps) {
  return <div style={{ textAlign: 'center' }}>{props.children}</div>;
}
