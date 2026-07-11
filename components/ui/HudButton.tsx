"use client";

import { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary: `
    border border-hud-cyan/45 bg-carbon/50 text-hud-cyan
    hover:border-hud-cyan hover:text-carbon
    hover:shadow-[0_0_18px_rgba(0,212,255,0.28)]
  `,
  secondary: `
    border border-arc-blue/25 bg-transparent text-arc-blue/80
    hover:border-hud-cyan/50 hover:text-hud-cyan
    hover:shadow-[0_0_14px_rgba(0,212,255,0.12)]
  `,
  ghost: `
    border border-transparent bg-transparent text-arc-blue/55
    hover:text-hud-cyan
  `,
};

interface BaseProps {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  disabled?: boolean;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

export type HudButtonProps = ButtonAsButton | ButtonAsLink;

export default function HudButton(props: HudButtonProps) {
  const {
    children,
    className = "",
    variant = "primary",
    disabled = false,
    ...rest
  } = props;

  const base = `
    group relative inline-flex items-center justify-center overflow-hidden
    px-7 py-3
    font-orbitron text-xs uppercase tracking-[0.16em] sm:text-sm sm:tracking-[0.18em]
    transition-all duration-300
    disabled:cursor-not-allowed disabled:opacity-50
    ${variantClasses[variant]}
    ${className}
  `;

  const sweep =
    variant === "primary" ? (
      <>
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-hud-cyan/80 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
        <span className="absolute inset-0 -translate-x-full bg-hud-cyan transition-transform duration-300 group-hover:translate-x-0" />
      </>
    ) : null;

  const labelClass =
    variant === "primary"
      ? "relative z-10 group-hover:text-carbon"
      : "relative z-10";

  if ("href" in props && props.href) {
    const { href, target, rel, onClick, ...anchorRest } =
      rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    const external = target === "_blank";
    return (
      <a
        href={href}
        target={target}
        rel={rel ?? (external ? "noopener noreferrer" : undefined)}
        onClick={onClick}
        className={base}
        {...anchorRest}
      >
        {sweep}
        <span className={labelClass}>{children}</span>
      </a>
    );
  }

  const { type = "button", onClick, ...buttonRest } =
    rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={base}
      {...buttonRest}
    >
      {sweep}
      <span className={labelClass}>{children}</span>
    </button>
  );
}
